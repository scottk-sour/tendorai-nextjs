/**
 * EXP-001 (study_2026_07_exp001) post-deploy spot-check.
 *
 * Given one or more solicitor slugs, fetches the live profile page and
 * reports whether the EXP-001 LegalService JSON-LD block is present.
 * Compares that against data/exp001-assignment.json to catch any drift
 * between what was assigned and what actually ships.
 *
 * Usage:
 *   npx tsx scripts/verify-exp001.ts <slug> [<slug> ...]
 *   npx tsx scripts/verify-exp001.ts --sample 3   # 3 treatment + 3 control
 *
 * Environment:
 *   EXP001_BASE_URL   Base URL to fetch from. Defaults to
 *                     https://www.tendorai.com — set to a Vercel
 *                     preview URL to spot-check a preview deploy.
 *
 * Exit code is non-zero if any slug mismatches its expected group.
 */

import {
  EXP001_JSONLD_MARKER,
  getExp001TreatmentSlugs,
} from '../lib/experiments/exp001';
import assignmentJson from '../data/exp001-assignment.json';

interface AssignmentEntry {
  firmId?: string;
  slug: string;
  city?: string;
  group: 'treatment' | 'control';
}

interface AssignmentFile {
  firms: AssignmentEntry[];
}

const BASE_URL =
  process.env.EXP001_BASE_URL?.replace(/\/+$/, '') ||
  'https://www.tendorai.com';

async function checkSlug(slug: string): Promise<{
  slug: string;
  expected: 'treatment' | 'control' | 'unassigned';
  actual: 'treatment' | 'control';
  ok: boolean;
  httpStatus: number;
}> {
  const url = `${BASE_URL}/suppliers/vendor/${slug}`;
  const res = await fetch(url, { redirect: 'follow' });
  const httpStatus = res.status;
  const body = httpStatus === 200 ? await res.text() : '';
  const actual: 'treatment' | 'control' = body.includes(EXP001_JSONLD_MARKER)
    ? 'treatment'
    : 'control';

  const assignment = (assignmentJson as unknown as AssignmentFile).firms.find(
    (f) => f.slug === slug,
  );
  const expected = assignment?.group ?? 'unassigned';

  // Unassigned slugs must be control (no schema). Assigned slugs must
  // match their assignment group.
  const ok = expected === 'unassigned' ? actual === 'control' : actual === expected;

  return { slug, expected, actual, ok, httpStatus };
}

function pickSample(n: number): string[] {
  const treatments = getExp001TreatmentSlugs();
  const controls = (assignmentJson as unknown as AssignmentFile).firms
    .filter((f) => f.group === 'control')
    .map((f) => f.slug);
  const take = <T,>(arr: T[]) => arr.slice(0, n);
  return [...take(treatments), ...take(controls)];
}

async function main() {
  const args = process.argv.slice(2);
  let slugs: string[] = [];

  const sampleIx = args.indexOf('--sample');
  if (sampleIx !== -1) {
    const n = parseInt(args[sampleIx + 1] ?? '3', 10);
    slugs = pickSample(Number.isFinite(n) && n > 0 ? n : 3);
  } else {
    slugs = args.filter((a) => !a.startsWith('-'));
  }

  if (slugs.length === 0) {
    console.error(
      'Usage: npx tsx scripts/verify-exp001.ts <slug> [<slug> ...] | --sample N',
    );
    process.exit(2);
  }

  console.log(`[exp001] Verifying ${slugs.length} slug(s) against ${BASE_URL}`);
  console.log(`[exp001] Marker: ${EXP001_JSONLD_MARKER}`);
  console.log('');

  let allOk = true;
  for (const slug of slugs) {
    try {
      const r = await checkSlug(slug);
      const status = r.ok ? 'OK' : 'MISMATCH';
      console.log(
        `[${status}] ${r.slug}  expected=${r.expected}  actual=${r.actual}  http=${r.httpStatus}`,
      );
      if (!r.ok) allOk = false;
    } catch (err) {
      allOk = false;
      const msg = err instanceof Error ? err.message : String(err);
      console.log(`[ERROR] ${slug}  fetch failed: ${msg}`);
    }
  }

  console.log('');
  console.log(allOk ? '[exp001] All checks passed.' : '[exp001] One or more checks failed.');
  process.exit(allOk ? 0 : 1);
}

main().catch((err) => {
  console.error('[exp001] Unexpected error:', err);
  process.exit(2);
});
