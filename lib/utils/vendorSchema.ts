// lib/utils/vendorSchema.ts
// Single source of truth for vendor JSON-LD schema.
// Used by both the dashboard SchemaGeneratorCard and the public profile page.

export const VENDOR_TYPE_MAP: Record<string, string> = {
  solicitor: 'LegalService',
  accountant: 'AccountingService',
  'mortgage-advisor': 'FinancialService',
  'estate-agent': 'RealEstateAgent',
};

export interface VendorSchemaInput {
  vendorId: string;
  company: string;
  slug?: string;
  vendorType?: string;
  description?: string;
  website?: string;
  phone?: string;
  city?: string;
  region?: string;
  postcode?: string;
  address?: string;
  linkedIn?: string;
  services?: string[];
  practiceAreas?: string[];
  specializations?: string[];
  sraNumber?: string;
  fcaNumber?: string;
  icaewFirmNumber?: string;
  propertymarkNumber?: string;
  accreditations?: string[];
  certifications?: string[];
  yearsInBusiness?: number;
  rating?: number;
  reviewCount?: number;
  brands?: string[];
  coverage?: string[];  // resolved city names, not postcodes
  tier?: string;
}

const VERIFIED_TIERS = ['managed', 'pro', 'verified', 'gold', 'enterprise'];

export function stripEmpty(obj: unknown): unknown {
  if (Array.isArray(obj)) {
    const filtered = obj.map(stripEmpty).filter(v => v !== null && v !== undefined);
    return filtered.length > 0 ? filtered : undefined;
  }
  if (obj && typeof obj === 'object') {
    const cleaned: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj)) {
      const v = stripEmpty(value);
      if (v !== null && v !== undefined && v !== '' &&
          !(Array.isArray(v) && v.length === 0) &&
          !(typeof v === 'object' && !Array.isArray(v) && Object.keys(v as object).length === 0)) {
        cleaned[key] = v;
      }
    }
    return Object.keys(cleaned).length > 0 ? cleaned : undefined;
  }
  return obj;
}

function buildDescriptionFallback(v: VendorSchemaInput): string {
  if (v.description?.trim()) return v.description;
  const areas = v.practiceAreas?.filter(Boolean).join(', ');
  const city = v.city || 'the UK';
  switch (v.vendorType) {
    case 'solicitor':
      return `${v.company} is an SRA-authorised solicitor firm based in ${city}.${areas ? ` Practice areas include ${areas}.` : ''}`;
    case 'accountant':
      return `${v.company} is a UK accountancy practice based in ${city}.${areas ? ` Services include ${areas}.` : ''}`;
    case 'mortgage-advisor':
      return `${v.company} is an FCA-regulated mortgage adviser based in ${city}.${areas ? ` Services include ${areas}.` : ''}`;
    case 'estate-agent':
      return `${v.company} is a property agent based in ${city}.${areas ? ` Services include ${areas}.` : ''}`;
    default:
      return `${v.company} is a business based in ${city}.`;
  }
}

export function buildVendorSchema(v: VendorSchemaInput): Record<string, unknown> {
  const profileUrl = v.slug
    ? `https://www.tendorai.com/suppliers/vendor/${v.slug}`
    : `https://www.tendorai.com/suppliers/profile/${v.vendorId}`;

  // @id and url anchor to the vendor's OWN domain when known, profile otherwise.
  const canonicalUrl = v.website || profileUrl;
  const schemaType = VENDOR_TYPE_MAP[v.vendorType || ''] || 'LocalBusiness';

  // sameAs: OUTWARD references only. Never include @id/url itself.
  const sameAsSet = new Set<string>();
  if (v.website) sameAsSet.add(v.website);
  if (v.linkedIn) sameAsSet.add(v.linkedIn);
  if (v.sraNumber) sameAsSet.add(`https://www.sra.org.uk/consumers/register/organisation/?sraNumber=${v.sraNumber}`);
  if (v.fcaNumber) sameAsSet.add(`https://register.fca.org.uk/s/firm?id=${v.fcaNumber}`);
  if (v.icaewFirmNumber) sameAsSet.add(`https://find.icaew.com/`);
  if (v.propertymarkNumber) sameAsSet.add(`https://www.propertymark.co.uk/find-an-expert.html`);
  // If the vendor has its own website, the TendorAI profile is a valid outward
  // reference. If the profile IS the canonical url, do not self-reference.
  if (v.website) sameAsSet.add(profileUrl);
  sameAsSet.delete(canonicalUrl); // safety: never let sameAs contain @id/url
  const sameAs = [...sameAsSet];

  const knowsAbout = [...new Set([
    ...(v.services || []),
    ...(v.practiceAreas || []),
    ...(v.specializations || []),
  ].filter(Boolean))];

  const identifiers: Array<Record<string, string>> = [];
  if (v.sraNumber) identifiers.push({ '@type': 'PropertyValue', name: 'SRA Number', propertyID: 'https://www.sra.org.uk', value: v.sraNumber });
  if (v.fcaNumber) identifiers.push({ '@type': 'PropertyValue', name: 'FCA Number', propertyID: 'https://www.fca.org.uk', value: v.fcaNumber });
  if (v.icaewFirmNumber) identifiers.push({ '@type': 'PropertyValue', name: 'ICAEW Firm Number', propertyID: 'https://www.icaew.com', value: v.icaewFirmNumber });
  if (v.propertymarkNumber) identifiers.push({ '@type': 'PropertyValue', name: 'Propertymark Number', propertyID: 'https://www.propertymark.co.uk', value: v.propertymarkNumber });
  if (VERIFIED_TIERS.includes(v.tier || '')) identifiers.push({ '@type': 'PropertyValue', name: 'TendorAI Verified', propertyID: 'https://www.tendorai.com', value: v.vendorId });

  const credentials = [
    ...(v.accreditations || []),
    ...(v.certifications || []),
  ].filter(Boolean).map(c => ({ '@type': 'EducationalOccupationalCredential', name: c }));

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': schemaType,
    '@id': canonicalUrl,
    name: v.company,
    description: buildDescriptionFallback(v),
    url: canonicalUrl,
    telephone: v.phone || undefined,
    isPartOf: { '@type': 'WebSite', name: 'TendorAI', url: 'https://www.tendorai.com' },
    address: {
      '@type': 'PostalAddress',
      streetAddress: v.address || undefined,
      addressLocality: v.city || undefined,
      addressRegion: v.region || undefined,
      postalCode: v.postcode || undefined,
      addressCountry: 'GB',
    },
    ...(sameAs.length > 0 && { sameAs }),
    identifier: identifiers.length > 0 ? identifiers : undefined,
    ...(credentials.length > 0 && { hasCredential: credentials }),
    memberOf: {
      '@type': 'Organization',
      name: 'TendorAI',
      url: 'https://www.tendorai.com',
      description: "The UK's AI Visibility Platform — verified business profiles optimised for AI recommendations",
    },
    knowsAbout: knowsAbout.length > 0 ? knowsAbout : undefined,
    ...(v.yearsInBusiness && { foundingDate: String(new Date().getFullYear() - v.yearsInBusiness) }),
    ...(v.brands && v.brands.length > 0 && { brand: v.brands.map(b => ({ '@type': 'Brand', name: b })) }),
    ...(v.rating && v.rating > 0 && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: v.rating,
        reviewCount: v.reviewCount || 1,
        bestRating: 5,
        worstRating: 1,
      },
    }),
    areaServed: v.coverage?.map(name => ({ '@type': 'City', name })),
    potentialAction: {
      '@type': 'CommunicateAction',
      name: 'Request a Quote',
      target: profileUrl,  // quote action always routes through TendorAI
      description: `Request a quote from ${v.company} via TendorAI`,
    },
  };

  return stripEmpty(schema) as Record<string, unknown>;
}
