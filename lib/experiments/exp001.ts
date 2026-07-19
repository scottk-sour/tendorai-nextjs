/**
 * EXP-001 (study_2026_07_exp001) — solicitor-profile JSON-LD experiment.
 *
 * Half the solicitor firms in the sample receive an additional
 * LegalService JSON-LD block on their public profile page. The other
 * half are the control and get no change. Assignment is authored in
 * the backend repo (scottk-sour/tendorai-backend:data/exp001-assignment.json)
 * and copied byte-for-byte to data/exp001-assignment.json in this repo.
 *
 * Loader design notes:
 *   - JSON is imported statically so the assignment is baked into the
 *     bundle at build time — no per-request filesystem read.
 *   - Fail-closed: any firm slug not explicitly present with
 *     group: "treatment" is treated as control (no schema injected).
 *     This matters because the placeholder assignment shipped on this
 *     branch is empty until Scott overwrites it with the real backend
 *     file before merge; even then, an omitted slug must never
 *     accidentally get the treatment.
 *   - The build-time Set gives O(1) treatment lookups from the profile
 *     page render path.
 */

import assignmentJson from '@/data/exp001-assignment.json';

export type Exp001Group = 'treatment' | 'control';

export interface Exp001FirmAssignment {
  firmId: string;
  slug: string;
  city?: string;
  group: Exp001Group;
}

interface Exp001AssignmentFile {
  study?: string;
  firms: Exp001FirmAssignment[];
}

const assignment = assignmentJson as unknown as Exp001AssignmentFile;

// Build the treatment-slug set once at module load. Slug comparisons are
// case-insensitive to match how the profile page normalises its param.
const TREATMENT_SLUGS: ReadonlySet<string> = new Set(
  (Array.isArray(assignment.firms) ? assignment.firms : [])
    .filter((f) => f && f.group === 'treatment' && typeof f.slug === 'string')
    .map((f) => f.slug.toLowerCase()),
);

export function isExp001Treatment(slug: string | null | undefined): boolean {
  if (!slug) return false;
  return TREATMENT_SLUGS.has(slug.toLowerCase());
}

// Exposed for the verification script and any admin diagnostics — this
// is the exact set the profile page will inject schema for.
export function getExp001TreatmentSlugs(): string[] {
  return Array.from(TREATMENT_SLUGS).sort();
}

export const EXP001_STUDY_ID = 'study_2026_07_exp001';

// Marker embedded in the JSON-LD block. Lets the post-deploy verification
// script (scripts/verify-exp001.ts) grep for a stable string rather than
// parsing every ld+json script on the page. Present ONLY on treatment
// pages; absence proves control.
export const EXP001_JSONLD_MARKER = 'study_2026_07_exp001';

/**
 * Minimal firm shape the EXP-001 schema builder needs. Kept independent
 * of the full Mongoose vendor type so the builder can be reused from
 * verification tooling without dragging the DB layer in.
 */
export interface Exp001SchemaFirm {
  slug: string;
  company: string;
  sraNumber?: string | null;
  website?: string | null;
  location?: {
    address?: string | null;
    city?: string | null;
    region?: string | null;
    postcode?: string | null;
    coverage?: string[] | null;
  } | null;
  courtCoverageAreas?: string[] | null;
  practiceAreas?: string[] | null;
}

/**
 * Build the EXP-001 LegalService JSON-LD block. Fields are drawn from
 * the firm's own profile data and any that are missing are simply
 * omitted — nothing is invented. Returns null when the firm has no SRA
 * number (the primary identifier for a solicitor) so we don't emit an
 * empty half-schema that would muddy the experiment signal.
 */
export function buildExp001LegalServiceJsonLd(
  firm: Exp001SchemaFirm,
): Record<string, unknown> | null {
  const sraNumber = firm.sraNumber?.trim();
  if (!sraNumber) return null;

  const canonicalUrl = `https://www.tendorai.com/suppliers/vendor/${firm.slug}`;
  const website = firm.website?.trim();
  const url = website && /^https?:\/\//i.test(website) ? website : canonicalUrl;

  const address: Record<string, string> = { '@type': 'PostalAddress', addressCountry: 'GB' };
  if (firm.location?.city?.trim()) address.addressLocality = firm.location.city.trim();
  if (firm.location?.region?.trim()) address.addressRegion = firm.location.region.trim();
  if (firm.location?.postcode?.trim()) address.postalCode = firm.location.postcode.trim();

  const areaServedSet = new Set<string>();
  (firm.location?.coverage || []).forEach((v) => v?.trim() && areaServedSet.add(v.trim()));
  (firm.courtCoverageAreas || []).forEach((v) => v?.trim() && areaServedSet.add(v.trim()));

  const knowsAbout = (firm.practiceAreas || [])
    .map((p) => (typeof p === 'string' ? p.trim() : ''))
    .filter(Boolean);

  const block: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    // '@id' distinct from the primary block so search engines see them
    // as separate nodes referencing the same firm. Suffix carries the
    // study id, which is also the verification marker.
    '@id': `${canonicalUrl}#${EXP001_JSONLD_MARKER}`,
    name: firm.company,
    url,
    address,
    identifier: [
      {
        '@type': 'PropertyValue',
        name: 'SRA Number',
        value: sraNumber,
      },
    ],
    sameAs: [`https://www.sra.org.uk/consumers/register/organisation/?sraNumber=${sraNumber}`],
  };

  if (areaServedSet.size > 0) {
    block.areaServed = Array.from(areaServedSet).map((name) => ({ '@type': 'City', name }));
  }
  if (knowsAbout.length > 0) {
    block.knowsAbout = knowsAbout;
  }

  return block;
}

