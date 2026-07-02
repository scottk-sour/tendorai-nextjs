import { Metadata } from 'next';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import mongoose from 'mongoose';
import { connectDB, withRetry } from '@/lib/db/connection';
import { Vendor, VendorPost, Review } from '@/lib/db/models';
import {
  SERVICES,
  POSTCODE_AREAS,
} from '@/lib/constants';
import { buildVendorFaqs, buildFaqPageJsonLd } from '@/lib/utils/vendorFaqSchema';
import { markdownExcerpt } from '@/lib/utils/markdown';
import AiReferralTracker from '@/app/components/tracking/AiReferralTracker';
import ProfileViewTracker from '@/app/components/tracking/ProfileViewTracker';
import ContactForm from '@/app/components/vendor/ContactForm';

const EXTENDED_POSTCODES: Record<string, { name: string; region: string }> = {
  B: { name: 'Birmingham', region: 'West Midlands' },
  M: { name: 'Manchester', region: 'Greater Manchester' },
  L: { name: 'Liverpool', region: 'Merseyside' },
  LS: { name: 'Leeds', region: 'West Yorkshire' },
  S: { name: 'Sheffield', region: 'South Yorkshire' },
  NE: { name: 'Newcastle', region: 'North East' },
  NG: { name: 'Nottingham', region: 'East Midlands' },
  LE: { name: 'Leicester', region: 'East Midlands' },
  CV: { name: 'Coventry', region: 'West Midlands' },
  OX: { name: 'Oxford', region: 'Oxfordshire' },
  CB: { name: 'Cambridge', region: 'Cambridgeshire' },
  SO: { name: 'Southampton', region: 'Hampshire' },
  PO: { name: 'Portsmouth', region: 'Hampshire' },
  BN: { name: 'Brighton', region: 'East Sussex' },
  RG: { name: 'Reading', region: 'Berkshire' },
  MK: { name: 'Milton Keynes', region: 'Buckinghamshire' },
  LU: { name: 'Luton', region: 'Bedfordshire' },
  ST: { name: 'Stoke-on-Trent', region: 'Staffordshire' },
  DE: { name: 'Derby', region: 'Derbyshire' },
  HU: { name: 'Hull', region: 'East Yorkshire' },
  YO: { name: 'York', region: 'North Yorkshire' },
  PR: { name: 'Preston', region: 'Lancashire' },
  WA: { name: 'Warrington', region: 'Cheshire' },
  CH: { name: 'Chester', region: 'Cheshire' },
  WR: { name: 'Worcester', region: 'Worcestershire' },
  HR: { name: 'Hereford', region: 'Herefordshire' },
  GU: { name: 'Guildford', region: 'Surrey' },
  SL: { name: 'Slough', region: 'Berkshire' },
  E: { name: 'East London', region: 'London' },
  EC: { name: 'Central London', region: 'London' },
  N: { name: 'North London', region: 'London' },
  NW: { name: 'North West London', region: 'London' },
  SE: { name: 'South East London', region: 'London' },
  SW: { name: 'South West London', region: 'London' },
  W: { name: 'West London', region: 'London' },
  WC: { name: 'Central London', region: 'London' },
  EH: { name: 'Edinburgh', region: 'Scotland' },
  G: { name: 'Glasgow', region: 'Scotland' },
  AB: { name: 'Aberdeen', region: 'Scotland' },
  DD: { name: 'Dundee', region: 'Scotland' },
  BT: { name: 'Belfast', region: 'Northern Ireland' },
  WV: { name: 'Wolverhampton', region: 'West Midlands' },
  WS: { name: 'Walsall', region: 'West Midlands' },
  DN: { name: 'Doncaster', region: 'South Yorkshire' },
  HD: { name: 'Huddersfield', region: 'West Yorkshire' },
  HG: { name: 'Harrogate', region: 'North Yorkshire' },
  LN: { name: 'Lincoln', region: 'Lincolnshire' },
  PE: { name: 'Peterborough', region: 'Cambridgeshire' },
  IP: { name: 'Ipswich', region: 'Suffolk' },
  NR: { name: 'Norwich', region: 'Norfolk' },
  NN: { name: 'Northampton', region: 'Northamptonshire' },
};

const SERVICE_COLORS: Record<string, string> = {
  Photocopiers: 'bg-purple-100 text-purple-800',
  Telecoms: 'bg-blue-100 text-blue-800',
  CCTV: 'bg-red-100 text-red-800',
  IT: 'bg-indigo-100 text-indigo-800',
  Security: 'bg-amber-100 text-amber-800',
  Software: 'bg-emerald-100 text-emerald-800',
  Solicitors: 'bg-green-100 text-green-800',
};

const PRACTICE_AREA_COLORS: Record<string, string> = {
  // Solicitor
  Conveyancing: 'bg-blue-100 text-blue-800',
  'Family Law': 'bg-pink-100 text-pink-800',
  'Criminal Law': 'bg-red-100 text-red-800',
  'Commercial Law': 'bg-indigo-100 text-indigo-800',
  'Employment Law': 'bg-amber-100 text-amber-800',
  'Wills & Probate': 'bg-purple-100 text-purple-800',
  Immigration: 'bg-teal-100 text-teal-800',
  'Personal Injury': 'bg-orange-100 text-orange-800',
  // Mortgage Advisor
  'Residential Mortgages': 'bg-blue-100 text-blue-800',
  'Buy-to-Let': 'bg-sky-100 text-sky-800',
  Remortgage: 'bg-cyan-100 text-cyan-800',
  'First-Time Buyer': 'bg-teal-100 text-teal-800',
  'Equity Release': 'bg-indigo-100 text-indigo-800',
  'Commercial Mortgages': 'bg-slate-100 text-slate-800',
  'Protection Insurance': 'bg-blue-50 text-blue-700',
  // Estate Agent
  Sales: 'bg-orange-100 text-orange-800',
  Lettings: 'bg-amber-100 text-amber-800',
  'Property Management': 'bg-yellow-100 text-yellow-800',
  'Block Management': 'bg-rose-100 text-rose-800',
  Auctions: 'bg-red-100 text-red-800',
  'Commercial Property': 'bg-amber-50 text-amber-700',
  Inventory: 'bg-pink-100 text-pink-800',
};

// Map service names to category slugs for linking
const SERVICE_TO_SLUG: Record<string, string> = {
  Photocopiers: 'photocopiers',
  Telecoms: 'telecoms',
  CCTV: 'cctv',
  IT: 'it',
  Security: 'security',
  Software: 'software',
};

// Map practice areas to category slugs
const PRACTICE_AREA_TO_SLUG: Record<string, string> = {
  // Solicitor
  Conveyancing: 'conveyancing',
  'Family Law': 'family-law',
  'Criminal Law': 'criminal-law',
  'Commercial Law': 'commercial-law',
  'Employment Law': 'employment-law',
  'Wills & Probate': 'wills-and-probate',
  Immigration: 'immigration',
  'Personal Injury': 'personal-injury',
  // Mortgage Advisor
  'Residential Mortgages': 'residential-mortgages',
  'Buy-to-Let': 'buy-to-let',
  Remortgage: 'remortgage',
  'First-Time Buyer': 'first-time-buyer',
  'Equity Release': 'equity-release',
  'Commercial Mortgages': 'commercial-mortgages',
  'Protection Insurance': 'protection-insurance',
  // Estate Agent
  Sales: 'sales',
  Lettings: 'lettings',
  'Property Management': 'property-management',
  'Block Management': 'block-management',
  Auctions: 'auctions',
  'Commercial Property': 'commercial-property',
  Inventory: 'inventory',
};

function postcodeToLocation(code: string): { name: string; region: string } | null {
  const upper = code.toUpperCase().trim();
  const pa = POSTCODE_AREAS as Record<string, { name: string; region: string }>;
  if (pa[upper]) return pa[upper];
  return EXTENDED_POSTCODES[upper] || null;
}

function mapCoverageAreas(coverage: string[]): { locations: string[]; regions: string[] } {
  const locations: string[] = [];
  const regionSet = new Set<string>();
  for (const code of coverage) {
    const mapped = postcodeToLocation(code);
    if (mapped) {
      if (!locations.includes(mapped.name)) locations.push(mapped.name);
      regionSet.add(mapped.region);
    }
  }
  return { locations, regions: Array.from(regionSet) };
}

// ─── Data fetching ──────────────────────────────────────────────────

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 3600;

async function getVendorBySlug(slug: string) {
  return withRetry(async () => {
    await connectDB();
    try {
      // Match the canonical slug, or any historical slug (PR #77 migration).
      const vendor = await Vendor.findOne({
        $or: [{ slug }, { previousSlugs: slug }],
      })
        .select({
          company: 1,
          email: 1,
          slug: 1,
          previousSlugs: 1,
          services: 1,
          location: 1,
          businessProfile: 1,
          brands: 1,
          tier: 1,
          listingStatus: 1,
          'account.status': 1,
          'account.verificationStatus': 1,
          vendorType: 1,
          practiceAreas: 1,
          sraNumber: 1,
          fcaNumber: 1,
          icaewFirmNumber: 1,
          accaNumber: 1,
          practiceCertificateNumber: 1,
          companyNumber: 1,
          propertymarkNumber: 1,
          propertymarkQualification: 1,
          regulatoryBody: 1,
          contactInfo: 1,
          claimed: 1,
          fixedFees: 1,
          languages: 1,
          legalAid: 1,
          noWinNoFee: 1,
          responseTime: 1,
          courtCoverageAreas: 1,
          lenderPanels: 1,
          individualSolicitors: 1,
          performance: 1,
          softwareUsed: 1,
          industrySpecialisms: 1,
          mtdCompliant: 1,
          rdTaxCreditsSpecialist: 1,
          feeStructureType: 1,
          minimumFeeThreshold: 1,
          wholeOfMarket: 1,
          numberOfLenders: 1,
          typicalCompletionTime: 1,
          feeModel: 1,
          maximumLoanSize: 1,
          propertyTypesHandled: 1,
          averageSaleTime: 1,
          achievedVsAskingPercent: 1,
          managementFeePercent: 1,
          tenantFindOrFullManagement: 1,
          epcAssessor: 1,
          leaseVsPurchase: 1,
          monthlyCostRange: 1,
          managedPrintService: 1,
          serviceCapabilities: 1,
        })
        .lean()
        .exec();

      if (!vendor) return null;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return {
        ...vendor,
        _id: vendor._id.toString(),
      } as any;
    } catch {
      return null;
    }
  });
}

async function getVendorPosts(vendorId: string) {
  return withRetry(async () => {
    await connectDB();
    try {
      const posts = await VendorPost.find({ vendor: new mongoose.Types.ObjectId(vendorId), status: 'published' })
        .sort({ createdAt: -1 })
        .limit(3)
        .select({ title: 1, slug: 1, body: 1, category: 1, createdAt: 1 })
        .lean()
        .exec();
      return posts.map((p) => ({
        title: p.title as string,
        slug: p.slug as string,
        body: p.body as string,
        category: p.category as string,
        createdAt: (p.createdAt as Date).toISOString(),
      }));
    } catch {
      return [];
    }
  });
}

async function getVendorReviews(vendorId: string) {
  return withRetry(async () => {
    await connectDB();
    try {
      const reviews = await Review.find({ vendor: new mongoose.Types.ObjectId(vendorId), status: 'approved' })
        .sort({ createdAt: -1 })
        .limit(5)
        .select({ 'reviewer.name': 1, rating: 1, content: 1, title: 1, createdAt: 1 })
        .lean()
        .exec();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return reviews.map((r: any) => ({
        reviewerName: r.reviewer?.name || 'Anonymous',
        rating: r.rating as number,
        content: r.content as string,
        title: r.title as string,
        createdAt: r.createdAt ? new Date(r.createdAt).toISOString().split('T')[0] : undefined,
      }));
    } catch {
      return [];
    }
  });
}

// ─── Metadata ───────────────────────────────────────────────────────

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const vendor = await getVendorBySlug(slug);

  if (!vendor) {
    return { title: 'Supplier Not Found | TendorAI' };
  }

  // Accessed via a historical slug — send metadata resolution to the
  // canonical URL so it never indexes the old slug.
  if (vendor.slug && vendor.slug !== slug) {
    redirect(`/suppliers/vendor/${vendor.slug}`);
  }

  const isProfessional = ['solicitor', 'accountant', 'mortgage-advisor', 'estate-agent'].includes(vendor.vendorType || '');
  const vendorTypeLabels: Record<string, string> = {
    solicitor: 'Solicitors',
    accountant: 'Accountants',
    'mortgage-advisor': 'Mortgage Advisors',
    'estate-agent': 'Estate Agents',
  };
  const vendorTypeLabel = vendorTypeLabels[vendor.vendorType || ''] || 'Supplier';
  const primaryService = isProfessional
    ? (vendor.practiceAreas?.[0] || vendorTypeLabel)
    : (vendor.services?.[0] || 'Office Equipment');
  const city = vendor.location?.city || 'the UK';
  const title = `${vendor.company} | ${primaryService} ${vendorTypeLabel} in ${city} | TendorAI`;

  const regulatoryLabels: Record<string, string> = {
    solicitor: `SRA-regulated ${vendor.practiceAreas?.join(', ') || 'solicitors'}`,
    accountant: `${vendor.practiceAreas?.join(', ') || 'accountants'}`,
    'mortgage-advisor': `FCA-authorised ${vendor.practiceAreas?.join(', ') || 'mortgage advisors'}`,
    'estate-agent': `${vendor.practiceAreas?.join(', ') || 'estate agents'}`,
  };

  const fallbackDescription = isProfessional
    ? `${vendor.company} is ${
        vendor.vendorType === 'solicitor'
          ? 'an SRA-registered solicitor'
          : vendor.vendorType === 'accountant'
          ? 'an ICAEW-registered accountant'
          : vendor.vendorType === 'mortgage-advisor'
          ? 'an FCA-authorised mortgage adviser'
          : 'a verified professional services firm'
      } in ${city}. View their AI visibility profile, fees, and accreditations on TendorAI.`
    : `${vendor.company} provides ${vendor.services?.join(', ') || 'office equipment services'} in ${city}. Compare suppliers and request quotes on TendorAI.`;

  const description =
    vendor.businessProfile?.description?.substring(0, 150) || fallbackDescription;

  return {
    title,
    description: description.slice(0, 160),
    openGraph: {
      title,
      description: description.slice(0, 160),
      url: `https://www.tendorai.com/suppliers/vendor/${slug}`,
      type: 'website',
      siteName: 'TendorAI',
    },
    alternates: {
      canonical: `https://www.tendorai.com/suppliers/vendor/${slug}`,
    },
    robots: {
      index: Boolean(vendor.sraNumber?.trim()) || Boolean(vendor.icaewFirmNumber?.trim()) || Boolean(vendor.fcaNumber?.trim()),
      follow: true,
    },
  };
}

// ─── SVG icons ──────────────────────────────────────────────────────

function MapPinIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
    </svg>
  );
}

function BuildingIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  );
}

function ClockIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

// ─── Page ───────────────────────────────────────────────────────────

export default async function VendorPublicProfilePage({ params }: PageProps) {
  const { slug } = await params;
  const vendor = await getVendorBySlug(slug);

  if (!vendor) {
    notFound();
  }

  // Accessed via a historical slug (PR #77 migration) → 307 redirect to
  // the canonical URL. Loop-safe: only redirects when the matched
  // vendor's canonical slug differs from the slug in the URL.
  if (vendor.slug && vendor.slug !== slug) {
    redirect(`/suppliers/vendor/${vendor.slug}`);
  }

  const [vendorPosts, vendorReviews] = await Promise.all([
    getVendorPosts(vendor._id),
    getVendorReviews(vendor._id),
  ]);
  const isPro = ['pro', 'managed', 'verified', 'enterprise'].includes((vendor.tier || '').toLowerCase());

  const city = vendor.location?.city || '';
  const region = vendor.location?.region || '';
  const coverageData = vendor.location?.coverage?.length
    ? mapCoverageAreas(vendor.location.coverage)
    : null;

  const establishedYear = vendor.businessProfile?.yearsInBusiness
    ? new Date().getFullYear() - vendor.businessProfile.yearsInBusiness
    : null;

  // Build category links from services
  const serviceLinks = (vendor.services || []).map((service: string) => ({
    name: service,
    slug: SERVICE_TO_SLUG[service] || service.toLowerCase(),
  }));

  // Build location link (lowercase, hyphenated)
  const locationSlug = city ? city.toLowerCase().replace(/\s+/g, '-') : null;

  const isProfessional = ['solicitor', 'accountant', 'mortgage-advisor', 'estate-agent'].includes(vendor.vendorType || '');

  // Schema.org type mapping
  const schemaTypeMap: Record<string, string> = {
    solicitor: 'LegalService',
    accountant: 'AccountingService',
    'mortgage-advisor': 'FinancialService',
    'estate-agent': 'RealEstateAgent',
  };
  const schemaType = schemaTypeMap[vendor.vendorType || ''] || 'LocalBusiness';

  // JSON-LD — full enriched schema for all vendor types
  const ensureHttps = (url: string) =>
    url.match(/^https?:\/\//i) ? url : `https://${url}`;

  const vendorWebsite = vendor.contactInfo?.website
    ? ensureHttps(vendor.contactInfo.website)
    : null;

  const sameAs: string[] = [];
  if (vendorWebsite) sameAs.push(vendorWebsite);
  if (vendor.contactInfo?.linkedIn) sameAs.push(vendor.contactInfo.linkedIn);
  if (vendor.sraNumber) sameAs.push(`https://www.sra.org.uk/consumers/register/organisation/?sraNumber=${vendor.sraNumber}`);
  if (vendor.icaewFirmNumber) sameAs.push(`https://www.icaew.com/about-icaew/find-a-chartered-accountant?id=${vendor.icaewFirmNumber}`);
  if (vendor.fcaNumber) sameAs.push(`https://register.fca.org.uk/s/firm?id=${vendor.fcaNumber}`);
  if (vendor.companyNumber) sameAs.push(`https://find-and-update.company-information.service.gov.uk/company/${vendor.companyNumber}`);

  // Build areaServed from coverage + courtCoverageAreas
  const areaServedNames = new Set<string>();
  (vendor.location?.coverage || []).forEach((loc: string) => areaServedNames.add(loc));
  if (vendor.vendorType === 'solicitor') {
    (vendor.courtCoverageAreas || []).forEach((area: string) => areaServedNames.add(area));
  }

  // Build identifiers
  const identifiers: Record<string, unknown>[] = [];
  if (vendor.sraNumber?.trim()) identifiers.push({ '@type': 'PropertyValue', name: 'SRA Number', value: vendor.sraNumber });
  if (vendor.icaewFirmNumber?.trim()) identifiers.push({ '@type': 'PropertyValue', name: 'ICAEW Firm Number', value: vendor.icaewFirmNumber });
  if (vendor.accaNumber?.trim()) identifiers.push({ '@type': 'PropertyValue', name: 'ACCA Number', value: vendor.accaNumber });
  if (vendor.practiceCertificateNumber?.trim()) identifiers.push({ '@type': 'PropertyValue', name: 'Practice Certificate Number', value: vendor.practiceCertificateNumber });
  if (vendor.fcaNumber?.trim()) identifiers.push({ '@type': 'PropertyValue', name: 'FCA Number', value: vendor.fcaNumber });
  if (vendor.propertymarkNumber?.trim()) identifiers.push({ '@type': 'PropertyValue', name: 'Propertymark Number', value: vendor.propertymarkNumber });
  if (vendor.companyNumber?.trim()) identifiers.push({ '@type': 'PropertyValue', name: 'Companies House Number', propertyID: 'https://find-and-update.company-information.service.gov.uk', value: vendor.companyNumber });

  // Build knowsAbout from practiceAreas + specializations + industrySpecialisms + softwareUsed + services
  const knowsAboutSet = new Set<string>();
  (vendor.practiceAreas || []).forEach((pa: string) => knowsAboutSet.add(pa));
  (vendor.businessProfile?.specializations || []).forEach((s: string) => knowsAboutSet.add(s));
  if (vendor.vendorType === 'accountant') {
    (vendor.industrySpecialisms || []).forEach((s: string) => knowsAboutSet.add(s));
    (vendor.softwareUsed || []).forEach((s: string) => knowsAboutSet.add(s));
  }
  if (vendor.vendorType === 'estate-agent') {
    (vendor.propertyTypesHandled || []).forEach((t: string) => knowsAboutSet.add(t));
  }
  if (!isProfessional) {
    (vendor.services || []).forEach((s: string) => knowsAboutSet.add(s));
  }
  const knowsAbout = [...knowsAboutSet].filter(Boolean);

  // Build hasCredential from accreditations + certifications
  const credentials: Record<string, unknown>[] = [];
  (vendor.businessProfile?.accreditations || []).forEach((a: string) => {
    if (a?.trim()) credentials.push({ '@type': 'EducationalOccupationalCredential', name: a });
  });
  (vendor.businessProfile?.certifications || []).forEach((c: string) => {
    if (c?.trim()) credentials.push({ '@type': 'EducationalOccupationalCredential', name: c });
  });

  // Build memberOf from lenderPanels
  const memberOf: Record<string, unknown>[] = [];
  (vendor.lenderPanels || []).forEach((p: string) => {
    if (p?.trim()) memberOf.push({ '@type': 'Organization', name: p });
  });

  // Build employee from individualSolicitors
  const employees: Record<string, unknown>[] = [];
  (vendor.individualSolicitors || []).forEach((s: { name?: string; role?: string }) => {
    if (s?.name?.trim()) employees.push({ '@type': 'Person', name: s.name, ...(s.role?.trim() && { jobTitle: s.role }) });
  });

  // Build hasOfferCatalog from fixedFees
  const feeOffers = (vendor.fixedFees || [])
    .filter((f: { service?: string; fee?: string }) => f?.service?.trim() && f?.fee?.trim())
    .map((f: { service: string; fee: string }) => ({
      '@type': 'Offer',
      name: f.service,
      price: f.fee.replace(/[^0-9.]/g, ''),
      priceCurrency: 'GBP',
    }));

  // Build additionalProperty array
  const additionalProperties: Record<string, unknown>[] = [];
  if (vendor.vendorType === 'solicitor') {
    if (vendor.legalAid) additionalProperties.push({ '@type': 'PropertyValue', name: 'Legal Aid', value: true });
    if (vendor.noWinNoFee) additionalProperties.push({ '@type': 'PropertyValue', name: 'No Win No Fee', value: true });
    if (vendor.responseTime?.trim()) additionalProperties.push({ '@type': 'PropertyValue', name: 'Response Time', value: vendor.responseTime });
  }
  if (vendor.vendorType === 'accountant') {
    if (vendor.mtdCompliant) additionalProperties.push({ '@type': 'PropertyValue', name: 'Making Tax Digital Compliant', value: true });
    if (vendor.rdTaxCreditsSpecialist) additionalProperties.push({ '@type': 'PropertyValue', name: 'R&D Tax Credits Specialist', value: true });
    if (vendor.feeStructureType?.trim()) additionalProperties.push({ '@type': 'PropertyValue', name: 'Fee Structure', value: vendor.feeStructureType });
    if (vendor.minimumFeeThreshold && vendor.minimumFeeThreshold > 0) additionalProperties.push({ '@type': 'PropertyValue', name: 'Minimum Fee', value: vendor.minimumFeeThreshold });
  }
  if (vendor.vendorType === 'mortgage-advisor') {
    if (vendor.wholeOfMarket !== undefined) additionalProperties.push({ '@type': 'PropertyValue', name: 'Whole of Market', value: vendor.wholeOfMarket });
    if (vendor.numberOfLenders && vendor.numberOfLenders > 0) additionalProperties.push({ '@type': 'PropertyValue', name: 'Number of Lenders', value: vendor.numberOfLenders });
    if (vendor.typicalCompletionTime?.trim()) additionalProperties.push({ '@type': 'PropertyValue', name: 'Typical Completion Time', value: vendor.typicalCompletionTime });
    if (vendor.feeModel?.trim()) additionalProperties.push({ '@type': 'PropertyValue', name: 'Fee Model', value: vendor.feeModel });
    if (vendor.maximumLoanSize && vendor.maximumLoanSize > 0) additionalProperties.push({ '@type': 'PropertyValue', name: 'Maximum Loan Size', value: vendor.maximumLoanSize });
  }
  if (vendor.vendorType === 'estate-agent') {
    if (vendor.averageSaleTime?.trim()) additionalProperties.push({ '@type': 'PropertyValue', name: 'Average Sale Time', value: vendor.averageSaleTime });
    if (vendor.achievedVsAskingPercent && vendor.achievedVsAskingPercent > 0) additionalProperties.push({ '@type': 'PropertyValue', name: 'Achieved vs Asking Price', value: `${vendor.achievedVsAskingPercent}%` });
    if (vendor.managementFeePercent && vendor.managementFeePercent > 0) additionalProperties.push({ '@type': 'PropertyValue', name: 'Management Fee', value: `${vendor.managementFeePercent}%` });
    if (vendor.tenantFindOrFullManagement?.trim()) additionalProperties.push({ '@type': 'PropertyValue', name: 'Lettings Service', value: vendor.tenantFindOrFullManagement });
    if (vendor.epcAssessor) additionalProperties.push({ '@type': 'PropertyValue', name: 'EPC Assessor', value: true });
  }
  if (!isProfessional) {
    if (vendor.leaseVsPurchase?.trim()) additionalProperties.push({ '@type': 'PropertyValue', name: 'Lease or Purchase', value: vendor.leaseVsPurchase });
    if (vendor.monthlyCostRange?.trim()) additionalProperties.push({ '@type': 'PropertyValue', name: 'Monthly Cost Range', value: vendor.monthlyCostRange });
    if (vendor.managedPrintService) additionalProperties.push({ '@type': 'PropertyValue', name: 'Managed Print Service', value: true });
  }

  // Vendor email — skip placeholders
  const vendorEmail = vendor.email && !vendor.email.includes('placeholder.tendorai.com') ? vendor.email : null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': schemaType,
    '@id': `https://www.tendorai.com/suppliers/vendor/${slug}`,
    name: vendor.company,
    description:
      vendor.businessProfile?.description ||
      `${vendor.company} provides ${vendor.services?.join(', ') || 'office equipment services'}${city ? ` in ${city}` : ''}.`,
    url: vendorWebsite || `https://www.tendorai.com/suppliers/vendor/${slug}`,
    ...(sameAs.length > 0 && { sameAs }),
    ...(vendor.contactInfo?.phone && { telephone: vendor.contactInfo.phone }),
    ...(vendorEmail && { email: vendorEmail }),
    isPartOf: { '@type': 'WebSite', name: 'TendorAI', url: 'https://www.tendorai.com' },
    address: {
      '@type': 'PostalAddress',
      ...(vendor.location?.address && { streetAddress: vendor.location.address }),
      ...(city && { addressLocality: city }),
      ...(region && { addressRegion: region }),
      ...(vendor.location?.postcode && { postalCode: vendor.location.postcode }),
      addressCountry: 'GB',
    },
    ...(areaServedNames.size > 0 && {
      areaServed: [...areaServedNames].map((loc) => ({ '@type': 'City', name: loc })),
    }),
    ...(vendor.performance?.rating && vendor.performance?.reviewCount && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: vendor.performance.rating,
        reviewCount: vendor.performance.reviewCount,
        bestRating: 5,
        worstRating: 1,
      },
    }),
    ...(establishedYear && { foundingDate: `${establishedYear}-01-01` }),
    ...(vendor.businessProfile?.numEmployees && vendor.businessProfile.numEmployees > 0 && {
      numberOfEmployees: { '@type': 'QuantitativeValue', value: vendor.businessProfile.numEmployees },
    }),
    ...(vendor.brands?.length && {
      brand: vendor.brands.map((b: string) => ({ '@type': 'Brand', name: b })),
    }),
    ...(knowsAbout.length > 0 && { knowsAbout }),
    ...(vendor.languages?.length && { knowsLanguage: vendor.languages }),
    ...(identifiers.length > 0 && { identifier: identifiers }),
    ...(credentials.length > 0 && { hasCredential: credentials }),
    ...(memberOf.length > 0 && { memberOf }),
    ...(employees.length > 0 && { employee: employees }),
    ...(feeOffers.length > 0 && {
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Fixed Fees',
        itemListElement: feeOffers,
      },
    }),
    ...(additionalProperties.length > 0 && { additionalProperty: additionalProperties }),
    ...(vendor.location?.coordinates?.latitude && vendor.location?.coordinates?.longitude && {
      geo: {
        '@type': 'GeoCoordinates',
        latitude: vendor.location.coordinates.latitude,
        longitude: vendor.location.coordinates.longitude,
      },
    }),
    ...(vendor.serviceCapabilities?.supportHours && (() => {
      const HOURS_MAP: Record<string, { days: string[]; opens: string; closes: string }> = {
        '9-5': { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '17:00' },
        '8-6': { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '18:00' },
        '24/7': { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], opens: '00:00', closes: '23:59' },
        'Extended hours': { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '07:00', closes: '21:00' },
      };
      const config = HOURS_MAP[vendor.serviceCapabilities.supportHours];
      if (!config) return false;
      return {
        openingHoursSpecification: config.days.map((day: string) => ({
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: day,
          opens: config.opens,
          closes: config.closes,
        })),
      };
    })()),
    potentialAction: {
      '@type': 'CommunicateAction',
      name: 'Request a Quote',
      target: `https://www.tendorai.com/suppliers/vendor/${slug}`,
      description: `Request a quote from ${vendor.company} via TendorAI`,
    },
    ...(vendorReviews.length > 0 && {
      review: vendorReviews.map((r) => ({
        '@type': 'Review',
        author: { '@type': 'Person', name: r.reviewerName },
        ...(r.createdAt && { datePublished: r.createdAt }),
        reviewRating: { '@type': 'Rating', ratingValue: r.rating, bestRating: 5 },
        ...(r.title && { name: r.title }),
        ...(r.content && { reviewBody: r.content }),
      })),
    }),
    ...(vendorPosts.length > 0 && {
      hasPart: vendorPosts.map((p) => ({
        '@type': 'BlogPosting',
        headline: p.title,
        url: `https://www.tendorai.com/posts/${p.slug}`,
        datePublished: p.createdAt,
      })),
    }),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.tendorai.com' },
      { '@type': 'ListItem', position: 2, name: 'Suppliers', item: 'https://www.tendorai.com/suppliers' },
      ...(serviceLinks.length > 0
        ? [{
            '@type': 'ListItem',
            position: 3,
            name: serviceLinks[0].name,
            item: `https://www.tendorai.com/suppliers/${serviceLinks[0].slug}`,
          }]
        : []),
      {
        '@type': 'ListItem',
        position: serviceLinks.length > 0 ? 4 : 3,
        name: vendor.company,
        item: `https://www.tendorai.com/suppliers/vendor/${slug}`,
      },
    ],
  };

  const vendorFaqs = buildVendorFaqs(vendor);
  const faqJsonLd = vendorFaqs.length > 0 ? buildFaqPageJsonLd(vendorFaqs) : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <AiReferralTracker vendorId={vendor._id} />
      <ProfileViewTracker vendorId={vendor._id} />
      <main className="min-h-screen bg-gray-50">
        {/* ═══ HERO ═══ */}
        <section className="bg-brand-gradient text-white py-10 md:py-14">
          <div className="section">
            {/* Breadcrumbs */}
            <nav className="text-sm mb-6 text-purple-200">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/suppliers" className="hover:text-white transition-colors">Suppliers</Link>
              {serviceLinks.length > 0 && (
                <>
                  <span className="mx-2">/</span>
                  <Link
                    href={`/suppliers/${serviceLinks[0].slug}`}
                    className="hover:text-white transition-colors"
                  >
                    {serviceLinks[0].name}
                  </Link>
                </>
              )}
              <span className="mx-2">/</span>
              <span className="text-white">{vendor.company}</span>
            </nav>

            <div className="flex items-center gap-3">
              <h1 className="text-3xl md:text-4xl font-bold">{vendor.company}</h1>
              {vendor.vendorType === 'solicitor' && (
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-green-500/80 text-white">
                  SRA Regulated
                </span>
              )}
              {vendor.vendorType === 'accountant' && vendor.icaewFirmNumber && (
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-green-500/80 text-white">
                  ICAEW Regulated
                </span>
              )}
              {vendor.vendorType === 'mortgage-advisor' && vendor.fcaNumber && (
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-500/80 text-white">
                  FCA Authorised
                </span>
              )}
              {vendor.vendorType === 'estate-agent' && vendor.propertymarkNumber && (
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-500/80 text-white">
                  Propertymark Member
                </span>
              )}
            </div>

            {vendor.vendorType === 'solicitor' && vendor.sraNumber && (
              <p className="text-sm text-purple-200 mt-1">
                SRA No:{' '}
                <a
                  href={`https://www.sra.org.uk/consumers/register/organisation/?sraNumber=${vendor.sraNumber}`}
                  className="underline hover:text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {vendor.sraNumber}
                </a>
              </p>
            )}

            {vendor.vendorType === 'mortgage-advisor' && vendor.fcaNumber && (
              <p className="text-sm text-purple-200 mt-1">
                FCA No:{' '}
                <a
                  href={`https://register.fca.org.uk/s/`}
                  className="underline hover:text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {vendor.fcaNumber}
                </a>
              </p>
            )}

            {vendor.vendorType === 'estate-agent' && vendor.propertymarkNumber && (
              <p className="text-sm text-purple-200 mt-1">
                Propertymark No:{' '}
                <a
                  href={`https://www.propertymark.co.uk/find-an-agent/`}
                  className="underline hover:text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {vendor.propertymarkNumber}
                </a>
              </p>
            )}

            {city && (
              <div className="flex items-center gap-2 mt-3 text-purple-200">
                <MapPinIcon className="w-5 h-5 text-purple-300" />
                <span className="text-lg">
                  {city}
                  {region && `, ${region}`}
                </span>
              </div>
            )}

            {/* Practice areas for professional services */}
            {isProfessional && vendor.practiceAreas && vendor.practiceAreas.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {vendor.practiceAreas.map((area: string) => (
                  <Link
                    key={area}
                    href={`/suppliers/${PRACTICE_AREA_TO_SLUG[area] || area.toLowerCase().replace(/\s+/g, '-')}`}
                    className="px-3 py-1 bg-white/15 backdrop-blur-sm rounded-full text-sm font-medium text-white hover:bg-white/25 transition-colors"
                  >
                    {area}
                  </Link>
                ))}
              </div>
            )}

            {/* Services for office equipment */}
            {!isProfessional && vendor.services && vendor.services.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {vendor.services.map((service: string) => (
                  <Link
                    key={service}
                    href={`/suppliers/${SERVICE_TO_SLUG[service] || service.toLowerCase()}`}
                    className="px-3 py-1 bg-white/15 backdrop-blur-sm rounded-full text-sm font-medium text-white hover:bg-white/25 transition-colors"
                  >
                    {service}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ═══ MAIN CONTENT ═══ */}
        <div className="section py-8 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* ─── SIDEBAR ─── */}
            <div className="order-1 lg:order-2 space-y-6">
              {/* At a Glance */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-5">At a Glance</h3>
                <div className="space-y-5">
                  {isProfessional && vendor.practiceAreas && vendor.practiceAreas.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                        {vendor.vendorType === 'estate-agent' ? 'Services' : vendor.vendorType === 'mortgage-advisor' ? 'Specialisms' : 'Practice Areas'}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {vendor.practiceAreas.map((area: string) => (
                          <span
                            key={area}
                            className={`px-2.5 py-1 rounded-full text-xs font-medium ${PRACTICE_AREA_COLORS[area] || 'bg-gray-100 text-gray-700'}`}
                          >
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {!isProfessional && vendor.services && vendor.services.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Services</p>
                      <div className="flex flex-wrap gap-1.5">
                        {vendor.services.map((service: string) => (
                          <span
                            key={service}
                            className={`px-2.5 py-1 rounded-full text-xs font-medium ${SERVICE_COLORS[service] || 'bg-gray-100 text-gray-700'}`}
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {city && (
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Location</p>
                      <p className="text-gray-700 text-sm">
                        {city}
                        {region && `, ${region}`}
                      </p>
                    </div>
                  )}

                  {coverageData && coverageData.locations.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Coverage Area</p>
                      <p className="text-gray-700 text-sm">
                        {coverageData.locations.slice(0, 8).join(', ')}
                        {coverageData.locations.length > 8 && (
                          <span className="text-gray-400"> +{coverageData.locations.length - 8} more</span>
                        )}
                      </p>
                    </div>
                  )}

                  {vendor.brands && vendor.brands.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Brands</p>
                      <div className="flex flex-wrap gap-1.5">
                        {vendor.brands.map((brand: string) => (
                          <span
                            key={brand}
                            className="px-2.5 py-1 bg-gray-50 text-gray-700 rounded-full text-xs font-medium border border-gray-200"
                          >
                            {brand}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {establishedYear && (
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Established</p>
                      <p className="text-gray-700 text-sm">Est. {establishedYear}</p>
                    </div>
                  )}

                  {vendor.businessProfile?.companySize && vendor.businessProfile.companySize !== '' && (
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Company Size</p>
                      <p className="text-gray-700 text-sm">{vendor.businessProfile.companySize}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Browse Categories */}
              {serviceLinks.length > 0 && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Browse by Category</h3>
                  <div className="space-y-2">
                    {serviceLinks.map(({ name, slug: sSlug }: { name: string; slug: string }) => (
                      <Link
                        key={sSlug}
                        href={`/suppliers/${sSlug}`}
                        className="block text-sm text-purple-600 hover:text-purple-800 font-medium transition-colors"
                      >
                        {name} suppliers {locationSlug ? `in ${city}` : 'near you'}
                      </Link>
                    ))}
                    {locationSlug && serviceLinks[0] && (
                      <Link
                        href={`/suppliers/${serviceLinks[0].slug}/${locationSlug}`}
                        className="block text-sm text-purple-600 hover:text-purple-800 font-medium transition-colors"
                      >
                        All {serviceLinks[0].name} suppliers in {city}
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* ─── MAIN CONTENT ─── */}
            <div className="order-2 lg:order-1 lg:col-span-2 space-y-6">
              {/* About */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">About {vendor.company}</h2>
                {vendor.businessProfile?.description ? (
                  <p className="text-gray-600 whitespace-pre-line leading-relaxed">
                    {vendor.businessProfile.description}
                  </p>
                ) : (
                  <p className="text-gray-500 text-sm">
                    {vendor.company} is a {vendor.services?.join(' and ') || 'office equipment'} supplier
                    {city ? ` based in ${city}` : ' in the UK'}.
                    {coverageData && coverageData.locations.length > 0 &&
                      ` They serve ${coverageData.locations.slice(0, 4).join(', ')}${coverageData.locations.length > 4 ? ' and more' : ''}.`}
                  </p>
                )}
              </div>

              {/* Published Fees */}
              {vendor.fixedFees && vendor.fixedFees.length > 0 && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Published Fees</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 pr-4 font-semibold text-gray-700">Service</th>
                          <th className="text-right py-3 pl-4 font-semibold text-gray-700">Fee</th>
                        </tr>
                      </thead>
                      <tbody>
                        {vendor.fixedFees.map((item: { service: string; fee: string }, i: number) => (
                          <tr key={i} className={i % 2 === 0 ? 'bg-gray-50/50' : ''}>
                            <td className="py-2.5 pr-4 text-gray-600">{item.service}</td>
                            <td className="py-2.5 pl-4 text-right font-medium text-gray-900 whitespace-nowrap">{item.fee}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-gray-400 mt-4">Fees are indicative and may vary depending on complexity. Contact the firm for a personalised quote.</p>
                </div>
              )}

              {/* Our Team */}
              {vendor.individualSolicitors && vendor.individualSolicitors.length > 0 && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Our Team</h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {vendor.individualSolicitors.map((sol: { name: string; role: string; specialisms: string; qualifications: string }, i: number) => (
                      <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                          <span className="text-purple-700 font-semibold text-sm">{sol.name?.charAt(0) || '?'}</span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">{sol.name}</p>
                          {sol.role && <p className="text-xs text-purple-600 font-medium">{sol.role}</p>}
                          {sol.specialisms && <p className="text-xs text-gray-500 mt-1">{Array.isArray(sol.specialisms) ? sol.specialisms.join(', ') : sol.specialisms}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Languages, Legal Aid & Lender Panels */}
              {((vendor.languages && vendor.languages.length > 0) || vendor.legalAid || (vendor.lenderPanels && vendor.lenderPanels.length > 0)) && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Additional Information</h2>
                  <dl className="space-y-4">
                    {vendor.languages && vendor.languages.length > 0 && (
                      <div>
                        <dt className="text-sm font-semibold text-gray-700 mb-1">Languages</dt>
                        <dd className="flex flex-wrap gap-2">
                          {vendor.languages.map((lang: string) => (
                            <span key={lang} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">{lang}</span>
                          ))}
                        </dd>
                      </div>
                    )}
                    {vendor.legalAid && (
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                          <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        <span className="text-sm font-medium text-gray-700">Legal Aid Available</span>
                      </div>
                    )}
                    {vendor.lenderPanels && vendor.lenderPanels.length > 0 && (
                      <div>
                        <dt className="text-sm font-semibold text-gray-700 mb-1">Lender Panels</dt>
                        <dd className="flex flex-wrap gap-2">
                          {vendor.lenderPanels.map((lender: string) => (
                            <span key={lender} className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-sm font-medium">{lender}</span>
                          ))}
                        </dd>
                      </div>
                    )}
                  </dl>
                </div>
              )}

              {/* Accreditations */}
              {vendor.businessProfile?.accreditations && vendor.businessProfile.accreditations.length > 0 && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Accreditations</h2>
                  <ul className="space-y-2.5">
                    {vendor.businessProfile.accreditations.map((acc: string) => (
                      <li key={acc} className="flex items-center gap-2.5 text-sm text-gray-700">
                        <span className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                          <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        {acc}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Latest Posts */}
              {vendorPosts.length > 0 && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Latest from {vendor.company}</h2>
                  <div className="space-y-4">
                    {vendorPosts.map((post) => (
                      <Link
                        key={post.slug}
                        href={`/posts/${post.slug}`}
                        className="block group p-4 rounded-xl border border-gray-100 hover:border-purple-200 hover:shadow-sm transition-all"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            post.category === 'news' ? 'bg-blue-100 text-blue-700' :
                            post.category === 'guide' ? 'bg-emerald-100 text-emerald-700' :
                            post.category === 'offer' ? 'bg-amber-100 text-amber-700' :
                            post.category === 'product' ? 'bg-purple-100 text-purple-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {post.category}
                          </span>
                          <span className="text-xs text-gray-400">
                            {new Date(post.createdAt).toLocaleDateString('en-GB', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </span>
                        </div>
                        <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors mb-1">
                          {post.title}
                        </h3>
                        <p className="text-sm text-gray-500 line-clamp-2">
                          {markdownExcerpt(post.body, 120)}
                        </p>
                        <span className="inline-block mt-2 text-sm text-purple-600 font-medium group-hover:translate-x-1 transition-transform">
                          Read more &rarr;
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Contact This Firm */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Contact {vendor.company}</h2>
                <ContactForm vendorId={vendor._id} vendorName={vendor.company} isPro={isPro} />
              </div>

              {/* Claim CTA */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 rounded-2xl p-8 md:p-10 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4">
                  <BuildingIcon className="w-8 h-8 text-amber-600" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                  Is this your business?
                </h2>
                <p className="text-gray-600 text-lg mb-6 max-w-lg mx-auto">
                  Claim your free profile to manage your listing, add products, respond to
                  leads, and boost your AI visibility score.
                </p>
                <Link
                  href="/vendor-signup"
                  className="inline-block bg-purple-600 text-white px-8 py-3.5 rounded-xl font-semibold text-lg hover:bg-purple-700 transition-colors shadow-lg shadow-purple-600/25"
                >
                  Claim This Profile &mdash; It&apos;s Free
                </Link>
                <p className="text-sm text-gray-400 mt-3">
                  Takes less than 2 minutes. No credit card required.
                </p>
              </div>

              {/* AI Visibility CTA */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 text-center">
                <h2 className="text-xl font-bold text-gray-900 mb-3">
                  Is AI recommending your {vendor.services?.[0] || 'business'}?
                </h2>
                <p className="text-gray-600 mb-6">
                  Find out if AI assistants recommend your business
                  {city ? ` in ${city}` : ''}. Get your free AI visibility report in 60 seconds.
                </p>
                <Link
                  href="/aeo-report"
                  className="inline-block bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors"
                >
                  Check AI Visibility
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
