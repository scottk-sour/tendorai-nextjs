#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const ALLOWLIST_PATH = path.join(ROOT, 'scripts', 'banned-copy-allowlist.txt');
const SCAN_ROOTS = ['app', 'lib', 'components', 'content', 'public', 'types'];
const SKIP_DIRS = new Set(['.next', 'node_modules', 'docs', 'research', 'data', 'scripts', 'tests']);

// Keep this registry in sync with the settled commercial-copy guard. Matching is case-insensitive.
// The £999/£1,499 + VAT rule is handled separately below: only a "+ VAT" occurrence within
// 40 characters of either current TendorAI price is a hit.
const REGISTRY = [
  '£299',
  '299/mo',
  '299 per month',
  '£299/month',
  '£299 per month',
  '299/month',
  '£399',
  'Monitor tier',
  'from £999',
  'spots taken',
  '3 of 50 spots',
  'early adopter',
  'Upgrade to Pro',
  'Pro plan',
  'Pro tier',
  'no contracts',
  'month-to-month',
  'month to month',
  'Cancel anytime',
  'cancel anytime',
  '90-day promise',
  '90-day',
  'six AI platforms',
  '6 AI platforms',
  'Grok',
  'Meta AI',
  '[FILL:',
];

const allowlist = loadAllowlist();
const files = [];
for (const root of SCAN_ROOTS) {
  const absolute = path.join(ROOT, root);
  if (fs.existsSync(absolute)) collectFiles(absolute);
}
files.sort();

const hits = [];
for (const file of files) {
  const relative = toPosix(path.relative(ROOT, file));
  if (relative.startsWith('public/research/') && relative.endsWith('.csv')) continue;

  let text;
  try {
    text = fs.readFileSync(file, 'utf8');
  } catch (error) {
    console.error(`ERROR: unable to read ${relative}: ${error.message}`);
    process.exitCode = 2;
    continue;
  }
  if (text.includes('\0')) continue; // binary asset

  const lines = text.split(/\r?\n/);
  for (let lineIndex = 0; lineIndex < lines.length; lineIndex += 1) {
    const line = lines[lineIndex];
    const matches = findMatches(line);
    for (const match of matches) {
      hits.push({
        path: relative,
        line: lineIndex + 1,
        phrase: match.phrase,
        text: line.trim(),
      });
    }
  }
}

hits.sort((a, b) => a.path.localeCompare(b.path) || a.line - b.line || a.phrase.localeCompare(b.phrase));

const counts = new Map();
for (const hit of hits) {
  const key = `${hit.path}\u0000${hit.phrase.toLowerCase()}`;
  counts.set(key, (counts.get(key) ?? 0) + 1);
}

const defects = [];
for (const hit of hits) {
  const key = `${hit.path}\u0000${hit.phrase.toLowerCase()}`;
  const entry = allowlist.find((item) => item.path === hit.path && item.phrase.toLowerCase() === hit.phrase.toLowerCase());
  const currentCount = counts.get(key);
  if (!entry || currentCount > entry.maxCount) {
    defects.push({ ...hit, currentCount, allowed: entry?.maxCount ?? null });
  }
}

if (defects.length > 0) {
  console.error(`BANNED COPY CHECK FAILED: ${defects.length} unallowlisted or over-limit hit(s)`);
  for (const defect of defects) {
    console.error(`${defect.path}:${defect.line} [${defect.phrase}] ${defect.text}`);
    if (defect.allowed !== null) console.error(`  allowlist max_count=${defect.allowed}; current_count=${defect.currentCount}`);
  }
  process.exit(1);
}

console.log(`BANNED COPY CHECK PASSED: ${hits.length} allowlisted hit(s) across ${files.length} scanned file(s).`);

function findMatches(line) {
  const matches = [];
  const lower = line.toLowerCase();

  // Find the longest registry phrase at each position so variants such as £299/month do not
  // generate duplicate £299 hits for the same occurrence.
  for (let i = 0; i < line.length; i += 1) {
    let best = null;
    for (const phrase of REGISTRY) {
      const candidate = phrase.toLowerCase();
      if (lower.startsWith(candidate, i) && (!best || candidate.length > best.phrase.length)) {
        best = { phrase, index: i, length: candidate.length };
      }
    }
    if (best) {
      matches.push({ phrase: best.phrase, index: best.index });
      i += best.length - 1;
    }
  }

  // Special VAT rule: only "+ VAT" within 40 characters of £999 or £1,499 is banned.
  const vatPattern = /\+\s*VAT/gi;
  let vatMatch;
  while ((vatMatch = vatPattern.exec(line)) !== null) {
    const before = line.slice(Math.max(0, vatMatch.index - 40), vatMatch.index + vatMatch[0].length + 40);
    if (/£(?:999|1,499)/i.test(before)) {
      matches.push({ phrase: '+ VAT', index: vatMatch.index });
    }
  }

  return matches.sort((a, b) => a.index - b.index || a.phrase.localeCompare(b.phrase));
}

function loadAllowlist() {
  if (!fs.existsSync(ALLOWLIST_PATH)) return [];
  const entries = [];
  const lines = fs.readFileSync(ALLOWLIST_PATH, 'utf8').split(/\r?\n/);
  for (const [index, raw] of lines.entries()) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    const parts = line.split('|');
    if (parts.length !== 4) {
      console.error(`ERROR: malformed allowlist line ${index + 1}: ${raw}`);
      process.exitCode = 2;
      continue;
    }
    const [filePath, phrase, maxCountText, reason] = parts;
    const maxCount = Number(maxCountText);
    if (!filePath || !phrase || !Number.isInteger(maxCount) || maxCount < 0 || !reason) {
      console.error(`ERROR: malformed allowlist line ${index + 1}: ${raw}`);
      process.exitCode = 2;
      continue;
    }
    entries.push({ path: toPosix(filePath), phrase, maxCount, reason });
  }
  if (process.exitCode === 2) process.exit(2);
  return entries;
}

function collectFiles(directory) {
  const entries = fs.readdirSync(directory, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name));
  for (const entry of entries) {
    if (entry.isDirectory() && SKIP_DIRS.has(entry.name)) continue;
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      collectFiles(absolute);
    } else if (entry.isFile()) {
      files.push(absolute);
    }
  }
}

function toPosix(value) {
  return value.split(path.sep).join('/');
}
