/**
 * Display labels for the AI Visibility Report category enum.
 *
 * The form (app/ai-visibility-report/AeoReportClient.tsx CATEGORY_GROUPS) posts a
 * machine-friendly enum value such as `sales` or `wills-and-probate`. The
 * report page used to interpolate those raw values directly into sentences,
 * producing broken English ("asks ChatGPT for a sales right now"). This
 * module is the single source of truth that maps each enum to a
 * professional-role noun phrase the customer actually recognises.
 *
 * Display-only. Stored and API category values are not modified — every
 * helper here exists to translate the wire enum at the render boundary.
 */

/**
 * Singular, lowercase professional-role noun phrase per form category value.
 * Keys mirror the `value` field of every option in CATEGORY_GROUPS. Extra
 * catch-all keys (`solicitor`, `accountant`, `mortgage-advisor`,
 * `mortgage-adviser`, `estate-agent`) are included because older saved
 * reports and the REGULATED_CATEGORIES list in AeoReportDisplay reference
 * them.
 */
export const CATEGORY_LABELS: Record<string, string> = {
  // Legal Services (SRA)
  conveyancing: 'conveyancing solicitor',
  'family-law': 'family law solicitor',
  'criminal-law': 'criminal defence solicitor',
  'commercial-law': 'commercial solicitor',
  'employment-law': 'employment solicitor',
  'wills-and-probate': 'wills and probate solicitor',
  immigration: 'immigration solicitor',
  'personal-injury': 'personal injury solicitor',
  solicitor: 'solicitor',

  // Accountancy (ICAEW)
  'tax-advisory': 'tax adviser',
  'audit-assurance': 'auditor',
  bookkeeping: 'bookkeeper',
  payroll: 'payroll specialist',
  'corporate-finance': 'corporate finance adviser',
  'business-advisory': 'business adviser',
  'vat-services': 'VAT specialist',
  'financial-planning': 'financial planner',
  accountant: 'accountant',

  // Mortgage (FCA)
  'residential-mortgages': 'mortgage adviser',
  'buy-to-let': 'buy-to-let mortgage adviser',
  remortgage: 'mortgage adviser',
  'first-time-buyer': 'first-time buyer mortgage adviser',
  'equity-release': 'equity release adviser',
  'commercial-mortgages': 'commercial mortgage adviser',
  'protection-insurance': 'protection insurance adviser',
  'mortgage-advisor': 'mortgage adviser',
  'mortgage-adviser': 'mortgage adviser',

  // Estate Agents (Propertymark)
  sales: 'estate agent',
  lettings: 'letting agent',
  'property-management': 'property management agent',
  'block-management': 'block management agent',
  auctions: 'property auctioneer',
  'commercial-property': 'commercial property agent',
  inventory: 'inventory clerk',
  'estate-agent': 'estate agent',

  // Office Equipment
  copiers: 'managed print supplier',
  telecoms: 'telecoms supplier',
  cctv: 'security systems supplier',
  it: 'IT support provider',
};

const FALLBACK_SINGULAR = 'business';
const FALLBACK_PLURAL = 'businesses';

/**
 * Singular display label for a form category, e.g. `sales` → `estate agent`.
 * Unknown / missing categories fall back to `business` — never the raw value.
 */
export function getCategoryLabel(category: string | null | undefined): string {
  if (!category) return FALLBACK_SINGULAR;
  return CATEGORY_LABELS[category] ?? FALLBACK_SINGULAR;
}

/**
 * Plural form for search-query phrasing, e.g. `sales` → `estate agents`. All
 * current labels pluralise cleanly with a trailing `s`; revisit if a future
 * label needs an irregular plural.
 */
export function getCategoryLabelPlural(category: string | null | undefined): string {
  if (!category) return FALLBACK_PLURAL;
  const singular = CATEGORY_LABELS[category];
  if (!singular) return FALLBACK_PLURAL;
  return `${singular}s`;
}

/**
 * Title-case form of getCategoryLabel — used in the report heading where the
 * label sits next to the city name rather than inside a sentence.
 * Capitalises each whitespace-separated word; preserves all-caps initialisms
 * like `VAT` and `IT` because they're already upper-case in the source map.
 */
export function getCategoryLabelTitle(category: string | null | undefined): string {
  const label = getCategoryLabel(category);
  return label.replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Indefinite article for a noun phrase — `aOrAn('estate agent')` → `an`,
 * `aOrAn('solicitor')` → `a`. Vowel-letter test, not vowel-sound: good
 * enough for the labels in CATEGORY_LABELS, including initialisms
 * (`IT support provider` → `an`, because `I` is a vowel letter).
 */
export function aOrAn(phrase: string): 'a' | 'an' {
  if (!phrase) return 'a';
  const first = phrase.trim().charAt(0).toLowerCase();
  return 'aeiou'.includes(first) ? 'an' : 'a';
}
