#!/usr/bin/env node
/**
 * Legacy-redirect guard.
 *
 * Articles in lib/content/articles.ts with no `href` are homed at
 * /resources/<slug>. app/blog/[slug]/page.tsx no longer generates them (that
 * fix removed 21 duplicate self-canonicalising pages), so their historical
 * /blog/<slug> URLs 404 unless next.config.js redirects them. AI assistants
 * and stale indexes still hold those URLs, so a missing redirect silently
 * throws away an earned citation.
 *
 * Fails the build if:
 *   1. any no-href article lacks a permanent /blog/<slug> -> /resources/<slug>
 *   2. any redirect points at a retired /blog/<slug> that no longer renders
 *   3. any redirect is a self-loop, or a chain that does not terminate
 *
 * SCOPE. Check 2 compares destinations against the retired no-href slug set
 * only. It does NOT resolve destinations against app/ or generateStaticParams,
 * so it cannot prove that every terminal destination is a live route — a
 * redirect to a slug that never existed still passes. Full route resolution is
 * a separate change.
 *
 * Node built-ins only — runs before `next build`, with no install step.
 *
 * Usage:  node scripts/check-legacy-redirects.mjs [--print]
 * Exit 0 = clean. Exit 1 = at least one failure.
 */

import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const require = createRequire(import.meta.url);
const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const nextConfig = require(path.join(repoRoot, 'next.config.js'));
const { noHrefSlugs } = require(path.join(repoRoot, 'lib', 'redirects', 'articleRedirects.cjs'));

const redirects = await nextConfig.redirects();
const retired = noHrefSlugs();
const bySource = new Map(redirects.map((r) => [r.source, r]));
const failures = [];

// 1. every no-href article has its legacy /blog/ redirect
const legacy = [];
for (const slug of [...retired].sort()) {
  const source = `/blog/${slug}`;
  const expected = `/resources/${slug}`;
  const redirect = bySource.get(source);
  if (!redirect) {
    failures.push(`missing legacy redirect: ${source} -> ${expected}`);
    continue;
  }
  if (redirect.destination !== expected) {
    failures.push(`wrong destination: ${source} -> ${redirect.destination} (expected ${expected})`);
    continue;
  }
  if (redirect.permanent !== true) {
    failures.push(`not permanent: ${source} -> ${redirect.destination}`);
    continue;
  }
  legacy.push(redirect);
}

// 2. nothing points at a retired /blog/ page
for (const redirect of redirects) {
  const match = /^\/blog\/([^/:*?]+)$/.exec(redirect.destination);
  if (match && retired.has(match[1])) {
    failures.push(`destination no longer renders: ${redirect.source} -> ${redirect.destination}`);
  }
}

// 3. no self-loops, and every chain terminates
for (const redirect of redirects) {
  if (redirect.source === redirect.destination) {
    failures.push(`self-loop: ${redirect.source}`);
    continue;
  }
  const seen = new Set([redirect.source]);
  let current = redirect.destination;
  let hops = 0;
  while (bySource.has(current)) {
    if (seen.has(current) || hops > 10) {
      failures.push(`redirect loop or over-long chain starting at ${redirect.source}`);
      break;
    }
    seen.add(current);
    current = bySource.get(current).destination;
    hops += 1;
  }
}

if (process.argv.includes('--print')) {
  console.log(`Retired (no-href) articles: ${retired.size}`);
  console.log(`Legacy /blog/ redirects generated: ${legacy.length}\n`);
  for (const r of legacy) console.log(`  ${r.source}  ->  ${r.destination}`);
  console.log(`\nTotal redirects in config: ${redirects.length}`);
}

if (failures.length) {
  console.error(`\nLegacy-redirect guard FAILED (${failures.length}):`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}

console.log(
  `Legacy-redirect guard passed: ${legacy.length} legacy /blog/ redirects, ` +
    `${redirects.length} redirects total, no destination is a retired /blog/ page, no loops.`,
);
console.log(
  'Scope: this guard does NOT resolve destinations against the filesystem, so it ' +
    'does not prove every terminal destination is a live route.',
);
