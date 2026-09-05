#!/usr/bin/env node
/**
 * Banned-copy guard.
 *
 * Fails the build if retired commercial claims reappear in customer-facing
 * copy: the discontinued £299 self-serve tier, "Pro" product naming,
 * no-contract language, the withdrawn 90-day promise, and platform-coverage
 * claims beyond the three platforms /pricing establishes.
 *
 * Deliberate exemptions live in scripts/banned-copy-allowlist.txt, one line
 * per file+phrase, with the count that is currently expected. A file that
 * grows past its allowed count fails, so an exemption cannot quietly widen.
 *
 * Node built-ins only — this runs before `next build`, with no install step.
 *
 * Usage:  node scripts/check-banned-copy.mjs
 * Exit 0 = clean. Exit 1 = at least one unallowlisted hit. Exit 2 = bad config.
 */

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, sep, posix } from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO_ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const ALLOWLIST_PATH = join(REPO_ROOT, 'scripts', 'banned-copy-allowlist.txt');

/** Directories scanned, relative to the repo root. */
const SCAN_ROOTS = ['app', 'lib', 'components', 'content', 'public', 'types'];

/**
 * Directory names never descended into. docs/, research/, data/, scripts/ and
 * tests/ are listed even though they sit outside SCAN_ROOTS, so the exclusion
 * still holds if a root is ever added.
 */
const SKIP_DIRS = new Set([
  '.next',
  'node_modules',
  '.git',
  'docs',
  'research',
  'data',
  'scripts',
  'tests',
]);

/** Exact repo-relative paths never descended into. */
const SKIP_PATHS = new Set(['public/research']);

const SCAN_EXTENSIONS = new Set([
  '.ts',
  '.tsx',
  '.js',
  '.jsx',
  '.mjs',
  '.cjs',
  '.md',
  '.mdx',
  '.txt',
  '.json',
  '.css',
]);

/**
 * The banned registry. Matching is case-insensitive, so case variants are
 * folded into one entry. HTML-entity forms are listed separately because a
 * literal search for "£299" does not find "&pound;299".
 */
const BANNED_PHRASES = [
  // Retired £299 self-serve tier
  '£299',
  '&pound;299',
  '299/mo',
  '299 per month',
  'from £299/mo',
  // Retired products and product naming
  '£399',
  '&pound;399',
  'monitor tier',
  'pro plan',
  'pro tier',
  'upgrade to pro',
  'start pro',
  // Contract language the three-month initial term retired
  'no contracts',
  'no annual contract',
  'no lock-in',
  'month-to-month',
  'cancel anytime',
  'cancel at any time',
  // Withdrawn promises and scarcity language
  '90-day',
  '90-day promise',
  'from £999',
  'spots taken',
  'early adopter',
  // Platform-coverage claims beyond the three /pricing establishes
  'six ai platforms',
  '6 ai platforms',
  'six-platform',
  'grok',
  'meta ai',
  // Unfilled template placeholders
  '[fill:',
];

/**
 * "+ VAT" is only banned near TendorAI's own prices — customer firms quote
 * their own fees with VAT legitimately. A hit counts only when £999 or £1,499
 * (literal or entity-escaped, with or without a space before VAT) appears
 * within PROXIMITY_CHARS either side.
 */
const VAT_PHRASE = '+ VAT (near £999 / £1,499)';
const VAT_RE = /\+\s?VAT/gi;
const PRICE_NEAR_VAT_RE = /(?:£|&pound;)(?:999|1,499)/i;
const PROXIMITY_CHARS = 40;

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** Compiled once; `lastIndex` is reset per use because of the /g flag. */
const PHRASE_MATCHERS = BANNED_PHRASES.map((phrase) => ({
  phrase,
  re: new RegExp(escapeRegExp(phrase), 'gi'),
}));

function toPosix(p) {
  return p.split(sep).join(posix.sep);
}

function walk(dir, out) {
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const entry of entries) {
    const full = join(dir, entry.name);
    const rel = toPosix(relative(REPO_ROOT, full));
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name) || SKIP_PATHS.has(rel)) continue;
      walk(full, out);
    } else if (entry.isFile()) {
      const dot = entry.name.lastIndexOf('.');
      if (dot === -1) continue;
      if (!SCAN_EXTENSIONS.has(entry.name.slice(dot))) continue;
      out.push(rel);
    }
  }
  return out;
}

/** Byte offset -> 1-indexed line number, via a prefix table built once. */
function lineIndexer(content) {
  const starts = [0];
  for (let i = 0; i < content.length; i += 1) {
    if (content[i] === '\n') starts.push(i + 1);
  }
  return (offset) => {
    let lo = 0;
    let hi = starts.length - 1;
    while (lo < hi) {
      const mid = (lo + hi + 1) >> 1;
      if (starts[mid] <= offset) lo = mid;
      else hi = mid - 1;
    }
    return lo + 1;
  };
}

function scanFile(relPath) {
  const content = readFileSync(join(REPO_ROOT, relPath), 'utf8');
  const lineAt = lineIndexer(content);
  const hits = [];

  for (const { phrase, re } of PHRASE_MATCHERS) {
    re.lastIndex = 0;
    let m;
    while ((m = re.exec(content)) !== null) {
      hits.push({ path: relPath, line: lineAt(m.index), phrase, text: m[0] });
      if (m.index === re.lastIndex) re.lastIndex += 1;
    }
  }

  VAT_RE.lastIndex = 0;
  let v;
  while ((v = VAT_RE.exec(content)) !== null) {
    const from = Math.max(0, v.index - PROXIMITY_CHARS);
    const to = Math.min(content.length, VAT_RE.lastIndex + PROXIMITY_CHARS);
    if (PRICE_NEAR_VAT_RE.test(content.slice(from, to))) {
      hits.push({ path: relPath, line: lineAt(v.index), phrase: VAT_PHRASE, text: v[0] });
    }
    if (v.index === VAT_RE.lastIndex) VAT_RE.lastIndex += 1;
  }

  return hits;
}

/** allowlist line format: path|phrase|max_count|reason */
function loadAllowlist() {
  if (!existsSync(ALLOWLIST_PATH)) return { map: new Map(), errors: [] };
  const map = new Map();
  const errors = [];
  const lines = readFileSync(ALLOWLIST_PATH, 'utf8').split('\n');

  lines.forEach((raw, i) => {
    const line = raw.trim();
    if (line === '' || line.startsWith('#')) return;
    const parts = line.split('|');
    if (parts.length < 4) {
      errors.push(`allowlist line ${i + 1}: expected path|phrase|max_count|reason`);
      return;
    }
    const [path, phrase, countRaw, ...reasonParts] = parts;
    const maxCount = Number.parseInt(countRaw.trim(), 10);
    if (!Number.isInteger(maxCount) || maxCount < 0) {
      errors.push(`allowlist line ${i + 1}: max_count must be a non-negative integer`);
      return;
    }
    const reason = reasonParts.join('|').trim();
    if (reason === '') {
      errors.push(`allowlist line ${i + 1}: reason is required`);
      return;
    }
    map.set(`${path.trim()}|${phrase.trim().toLowerCase()}`, { maxCount, reason, line: i + 1 });
  });

  return { map, errors };
}

function main() {
  const { map: allowlist, errors: allowlistErrors } = loadAllowlist();
  if (allowlistErrors.length > 0) {
    console.error('banned-copy: allowlist is malformed\n');
    for (const e of allowlistErrors) console.error(`  ${e}`);
    process.exit(2);
  }

  const files = [];
  for (const root of SCAN_ROOTS) {
    const abs = join(REPO_ROOT, root);
    if (existsSync(abs) && statSync(abs).isDirectory()) walk(abs, files);
  }
  files.sort();

  const hits = [];
  for (const f of files) hits.push(...scanFile(f));

  // Group by file+phrase so a hit is measured against its allowed count.
  const grouped = new Map();
  for (const hit of hits) {
    const key = `${hit.path}|${hit.phrase.toLowerCase()}`;
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key).push(hit);
  }

  const violations = [];
  const usedKeys = new Set();

  for (const [key, group] of grouped) {
    const allowed = allowlist.get(key);
    if (!allowed) {
      violations.push(...group);
      continue;
    }
    usedKeys.add(key);
    if (group.length > allowed.maxCount) {
      violations.push(
        ...group.map((h) => ({
          ...h,
          note: `${group.length} occurrences, allowlist permits ${allowed.maxCount}`,
        }))
      );
    }
  }

  violations.sort(
    (a, b) => a.path.localeCompare(b.path) || a.line - b.line || a.phrase.localeCompare(b.phrase)
  );

  const stale = [...allowlist.keys()].filter((k) => !usedKeys.has(k)).sort();

  console.log(`banned-copy: scanned ${files.length} files across ${SCAN_ROOTS.join(', ')}`);

  if (stale.length > 0) {
    console.log(`\nbanned-copy: ${stale.length} allowlist entr${stale.length === 1 ? 'y' : 'ies'} no longer match anything:`);
    for (const k of stale) {
      const [path, phrase] = k.split('|');
      console.log(`  ${path}  [${phrase}]  (line ${allowlist.get(k).line} of the allowlist)`);
    }
    console.log('  These are safe to delete. They do not fail the build.');
  }

  if (violations.length === 0) {
    console.log(`\nbanned-copy: PASS — no unallowlisted banned copy.`);
    process.exit(0);
  }

  console.error(`\nbanned-copy: FAIL — ${violations.length} unallowlisted hit${violations.length === 1 ? '' : 's'}:\n`);
  for (const v of violations) {
    const note = v.note ? `  (${v.note})` : '';
    console.error(`  ${v.path}:${v.line}  [${v.phrase}]  matched "${v.text}"${note}`);
  }
  console.error(
    `\nFix the copy, or — if this is a competitor claim, a historical record, or a` +
      `\nlandscape statement rather than a TendorAI claim — add a line to` +
      `\nscripts/banned-copy-allowlist.txt in the form:` +
      `\n\n  path|phrase|max_count|reason\n`
  );
  process.exit(1);
}

main();
