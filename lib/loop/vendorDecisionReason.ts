import type { Approval } from './types';

/**
 * Vendor-facing decisionReason sanitiser.
 *
 * The Writer's legal-check pipeline can leave admin-facing decisionReason
 * strings starting with "Legal review failed …" or "Legal verification did
 * not complete …" — useful diagnostic detail for the admin queue, but not
 * something a customer should ever read (it reads as an unresolved failure
 * even when the draft that ended up in front of them is the corrected,
 * verified one).
 *
 * For vendor pages we strip that text. If the approval is still approved
 * and metadata shows the check identified issues (that were subsequently
 * fixed), we substitute a positive line naming the count. Otherwise we
 * return null and the caller hides the whole reason row.
 *
 * Admin pages must not use this — they need the raw diagnostic string.
 */

const LEGAL_REVIEW_PREFIXES: readonly RegExp[] = [
  /^\s*legal review failed/i,
  /^\s*legal verification did not complete/i,
];

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Sum of suggestedFixes.length and claimVerification.issues.length off
 * approval.metadata. Missing / malformed fields count as zero.
 */
function issueCountFromMetadata(metadata: unknown): number {
  if (!isPlainObject(metadata)) return 0;
  let count = 0;
  if (Array.isArray(metadata.suggestedFixes)) {
    count += metadata.suggestedFixes.length;
  }
  const cv = metadata.claimVerification;
  if (isPlainObject(cv) && Array.isArray(cv.issues)) {
    count += cv.issues.length;
  }
  return count;
}

function looksLikeLegalReviewFailure(reason: string): boolean {
  return LEGAL_REVIEW_PREFIXES.some((rx) => rx.test(reason));
}

/**
 * Returns the text to render as the vendor-facing "Reason" line, or null
 * to hide the row entirely.
 *
 * - If the raw reason is empty → null.
 * - If it doesn't start with a legal-review failure prefix → pass through
 *   unchanged (existing safe reasons like "Manual approval by admin" show
 *   as-is).
 * - If it does, and the draft is now approved with a positive issue count
 *   on metadata → substitute the fix-count line.
 * - Otherwise → null. Better silent than a scary raw failure string.
 */
export function sanitiseVendorDecisionReason(
  approval: Approval,
): string | null {
  const raw = approval.decisionReason?.trim();
  if (!raw) return null;
  if (!looksLikeLegalReviewFailure(raw)) return raw;

  if (approval.status === 'approved') {
    const n = issueCountFromMetadata(approval.metadata);
    if (n > 0) {
      return `Our legal review identified ${n} issue${n === 1 ? '' : 's'} in the original draft. They were corrected and verified before this draft was approved for your review.`;
    }
  }

  return null;
}
