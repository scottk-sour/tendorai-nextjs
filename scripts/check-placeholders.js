#!/usr/bin/env node
// Prebuild guard — fails the build if any file under app/ still contains a
// [FILL: …] placeholder. Dependency-free: only uses fs + path from Node.
// Wired into package.json "prebuild"; runs before `next build`.

const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.join(__dirname, '..', 'app');
const NEEDLE = '[FILL:';
const IGNORE_DIRS = new Set(['node_modules', '.next', '.git', 'dist', 'out']);

/** @type {Array<{file: string, line: number, snippet: string}>} */
const hits = [];

function walk(dir) {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    if (entry.name.startsWith('.') && entry.name !== '.well-known') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (IGNORE_DIRS.has(entry.name)) continue;
      walk(full);
      continue;
    }
    if (!entry.isFile()) continue;
    let content;
    try {
      content = fs.readFileSync(full, 'utf8');
    } catch {
      continue;
    }
    if (!content.includes(NEEDLE)) continue;
    const lines = content.split(/\r?\n/);
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes(NEEDLE)) {
        hits.push({
          file: path.relative(process.cwd(), full),
          line: i + 1,
          snippet: lines[i].trim().slice(0, 200),
        });
      }
    }
  }
}

walk(ROOT);

if (hits.length > 0) {
  process.stderr.write(
    `\n[check-placeholders] Build blocked — found ${hits.length} unresolved "${NEEDLE}" placeholder${hits.length === 1 ? '' : 's'} under app/:\n\n`,
  );
  for (const h of hits) {
    process.stderr.write(`  ${h.file}:${h.line}\n    ${h.snippet}\n\n`);
  }
  process.stderr.write(
    'Fill each placeholder with the real value before building. This guard is intentional.\n\n',
  );
  process.exit(1);
}

process.stdout.write('[check-placeholders] OK — no unresolved [FILL: …] placeholders under app/.\n');
