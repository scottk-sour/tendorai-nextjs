// Backend-emitted aeoSignal keys → human-readable labels. Any key not in
// the override map falls through to a humaniser (camelCase / snake_case
// → Title Case).

const SIGNAL_LABEL_OVERRIDES: Record<string, string> = {
  // Identity / regulation
  sraNumber: 'SRA Number',
  icaewAccaNumber: 'ICAEW / ACCA Firm Number',
  fcaNumber: 'FCA Number',
  propertymarkNumber: 'Propertymark Number',

  // Credentials
  accreditations: 'Accreditations',
  practiceAreas: 'Practice Areas',
  specialisms: 'Specialisms',
  softwarePartnerStatus: 'Software Partner Status',
  mtdCompliant: 'MTD Compliance',
  wholeOfMarket: 'Whole-of-Market Status',
  lenderCount: 'Lender Count',
  redressScheme: 'Redress Scheme',
  clientMoneyProtection: 'Client Money Protection',
  serviceTypes: 'Service Types',
  coveragePostcodes: 'Coverage Postcodes',
  legalAidAvailable: 'Legal Aid Availability',

  // Commercial
  pricing: 'Pricing Details',
  pricingModel: 'Pricing Model',
  feeType: 'Fee Type',
  feeAmountGBP: 'Fee Amount',
  feePercentage: 'Fee Percentage',

  // Content
  description: 'Description',
  serviceType: 'Service Type',
  areaServed: 'Area Served',
  faqs: 'FAQ Section',
  faqSection: 'FAQ Section',

  // Schema / visibility
  schemaJsonLd: 'Schema Markup',
  structuredData: 'Structured Data',
};

const ACRONYMS = new Set(['SRA', 'FCA', 'ICAEW', 'ACCA', 'MTD', 'FAQ', 'GBP', 'AI', 'URL']);

export function humaniseSignalKey(key: string): string {
  const override = SIGNAL_LABEL_OVERRIDES[key];
  if (override) return override;
  const spaced = key
    .replace(/_/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\s+/g, ' ')
    .trim();
  return spaced
    .split(' ')
    .filter(Boolean)
    .map((word) => {
      const upper = word.toUpperCase();
      if (ACRONYMS.has(upper)) return upper;
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
}

// Extract the list of missing aeoSignal keys from whatever shape the backend
// emits. Tolerant to:
//   - { missing: string[], present?: string[] }
//   - Record<string, boolean>           (falsy = missing)
//   - Record<string, string|null|...>   (falsy / empty = missing)
export function extractMissingSignals(aeoSignals: unknown): string[] {
  if (!aeoSignals || typeof aeoSignals !== 'object') return [];

  const obj = aeoSignals as Record<string, unknown>;

  // Shape A: explicit missing array
  if (Array.isArray(obj.missing)) {
    return obj.missing.filter((k): k is string => typeof k === 'string');
  }

  // Shape B/C: per-key presence
  const missing: string[] = [];
  for (const [key, value] of Object.entries(obj)) {
    if (key === 'present' || key === 'missing') continue;
    const isPresent =
      value === true ||
      (typeof value === 'string' && value.trim() !== '') ||
      (typeof value === 'number' && value !== 0) ||
      (Array.isArray(value) && value.length > 0) ||
      (value !== null && typeof value === 'object' && Object.keys(value as object).length > 0);
    if (!isPresent) missing.push(key);
  }
  return missing;
}
