/**
 * Draft-body placeholder helpers.
 *
 * Drafts emitted by the Writer agent sometimes carry unresolved
 * placeholder tokens the firm has to fill in — e.g.
 *   [FIRM_DATA: transactionCountLastYear | Cases handled last year]
 *   [SRA_NUMBER: firm registration number]
 *
 * The pattern is broader than the legacy FIRM_DATA marker parsed by
 * PlaceholderEditor: any `[CAPS_TOKEN: text]` bracketed pair counts.
 * These helpers give every draft-body surface (admin detail, vendor
 * detail, vendor placeholder editor, vendor list) one place to
 * detect, count and highlight them consistently.
 */

// [CAPS_TOKEN: text]. Colon is required so bare `[UK]` / `[SRA]` in prose
// don't false-match. First char is A-Z; underscores and digits allowed
// inside the token name.
export const PLACEHOLDER_RE = /\[([A-Z][A-Z0-9_]*)\s*:\s*([^\]]+)\]/g;

/**
 * Count distinct placeholder tokens in a body string. De-duplicated by the
 * full matched token so the same `[FIRM_DATA: key | label]` referenced
 * twice counts once — one "detail still needed".
 */
export function countPlaceholders(text: string | null | undefined): number {
  if (!text) return 0;
  const seen = new Set<string>();
  for (const m of text.matchAll(PLACEHOLDER_RE)) {
    seen.add(m[0].trim());
  }
  return seen.size;
}

// Sentinels used to hand placeholder tokens off to a ReactMarkdown `code`
// override, so the shared HighlightedMarkdown can render them as a
// highlighted <mark> without pulling in a custom AST walker. Mirrors the
// scheme PlaceholderEditor already uses (⟦ … ⟧) so both surfaces render
// identically.
export const PLACEHOLDER_MARK_OPEN = '⟦';
export const PLACEHOLDER_MARK_CLOSE = '⟧';

/**
 * Wrap each placeholder in the sentinel-bracketed inline-code form so a
 * ReactMarkdown `code` renderer can spot and highlight them. The visible
 * label (the text after the colon) is kept; the token key is dropped for
 * display since the label is the human-readable part.
 */
export function markPlaceholdersForHighlight(text: string): string {
  return text.replace(PLACEHOLDER_RE, (_match, _key, label) => {
    return `\`${PLACEHOLDER_MARK_OPEN}${String(label).trim()}${PLACEHOLDER_MARK_CLOSE}\``;
  });
}

/**
 * True when a string is a sentinel-wrapped placeholder — i.e. produced by
 * markPlaceholdersForHighlight and about to be handed to the highlight
 * renderer. Everything else is a real inline-code span and passes through.
 */
export function isPlaceholderMark(text: string): boolean {
  return (
    text.length > 2 &&
    text.startsWith(PLACEHOLDER_MARK_OPEN) &&
    text.endsWith(PLACEHOLDER_MARK_CLOSE)
  );
}

/**
 * Strip the sentinels off a placeholder mark, revealing the underlying
 * label to show inside <mark>.
 */
export function extractPlaceholderLabel(text: string): string {
  return text.slice(1, -1);
}

// Legacy body-embedded firm-data markers: [FIRM_DATA: key | label].
// Narrower than PLACEHOLDER_RE — only these can be substituted with a
// saved value because only these carry a stable key that maps onto
// approval.firmData.
const FIRM_DATA_RE = /\[FIRM_DATA:\s*([^|\]]+?)\s*\|\s*[^\]]+?\s*\]/g;

/**
 * Replace `[FIRM_DATA: key | label]` markers in body text with their
 * saved values from `values` (keyed by the placeholder key). Markers
 * whose key has no non-empty value are left in place so the amber
 * highlight still renders for them via HighlightedMarkdown. Everything
 * that isn't a FIRM_DATA marker passes through unchanged — including
 * any broader `[CAPS_TOKEN: text]` placeholders, which don't have a
 * saved-value analogue and always render as amber "needed" pills.
 */
export function substituteFirmDataValues(
  text: string,
  values: Record<string, string> | null | undefined,
): string {
  if (!text) return text;
  if (!values) return text;
  return text.replace(FIRM_DATA_RE, (match, key) => {
    const v = values[String(key).trim()];
    return typeof v === 'string' && v.trim() ? v : match;
  });
}
