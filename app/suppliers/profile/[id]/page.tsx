import { Metadata } from 'next';
import Link from 'next/link';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { connectDB, withRetry } from '@/lib/db/connection';
import { Vendor, VendorProduct, Review } from '@/lib/db/models';
import {
  getDisplayTier,
  canShowPricing,
  canReceiveQuotes,
  TIER_CONFIG,
  POSTCODE_AREAS,
} from '@/lib/constants';
import { detectAISource } from '@/lib/ai-detection';
import VendorReviews from '@/app/components/VendorReviews';
import { buildVendorFaqs, buildFaqPageJsonLd } from '@/lib/utils/vendorFaqSchema';

const BACKEND_URL = process.env.NEXT_PUBLIC_EXPRESS_BACKEND_URL ||
  'https://ai-procurement-backend-q35u.onrender.com';

// ─── Extended postcode → location mapping ───────────────────────────
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

// ─── Service pill colours ───────────────────────────────────────────
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
  Conveyancing: 'bg-blue-100 text-blue-800',
  'Family Law': 'bg-amber-100 text-amber-800',
  'Criminal Law': 'bg-red-100 text-red-800',
  'Commercial Law': 'bg-slate-100 text-slate-800',
  'Employment Law': 'bg-teal-100 text-teal-800',
  'Wills & Probate': 'bg-purple-100 text-purple-800',
  Immigration: 'bg-emerald-100 text-emerald-800',
  'Personal Injury': 'bg-orange-100 text-orange-800',
};

const PRACTICE_AREA_TO_SLUG: Record<string, string> = {
  Conveyancing: 'conveyancing',
  'Family Law': 'family-law',
  'Criminal Law': 'criminal-law',
  'Commercial Law': 'commercial-law',
  'Employment Law': 'employment-law',
  'Wills & Probate': 'wills-and-probate',
  Immigration: 'immigration',
  'Personal Injury': 'personal-injury',
};

// ─── Helpers ────────────────────────────────────────────────────────

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

function getServingText(vendor: { location?: { city?: string; region?: string; coverage?: string[] } }): string {
  const parts: string[] = [];

  if (vendor.location?.region) {
    parts.push(vendor.location.region);
  } else if (vendor.location?.coverage?.length) {
    const { regions } = mapCoverageAreas(vendor.location.coverage);
    if (regions.length > 0) {
      parts.push(...regions.slice(0, 2));
    }
  }

  if (parts.length === 0 && vendor.location?.city) {
    return vendor.location.city;
  }

  return parts.join(' & ') || '';
}


// ─── Data fetching (unchanged) ──────────────────────────────────────

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ quote?: string }>;
}

export const revalidate = 3600;

async function getVendor(id: string) {
  return withRetry(async () => {
    await connectDB();

    try {
      const vendor = await Vendor.findById(id)
        .select({
          company: 1,
          name: 1,
          services: 1,
          location: 1,
          performance: 1,
          businessProfile: 1,
          brands: 1,
          tier: 1,
          contactInfo: 1,
          showPricing: 1,
          postcodeAreas: 1,
          listingStatus: 1,
          'account.status': 1,
          'account.verificationStatus': 1,
          vendorType: 1,
          practiceAreas: 1,
          sraNumber: 1,
          fcaNumber: 1,
          icaewFirmNumber: 1,
          propertymarkNumber: 1,
          regulatoryBody: 1,
          slug: 1,
          claimed: 1,
          fixedFees: 1,
          languages: 1,
          legalAid: 1,
          lenderPanels: 1,
          individualSolicitors: 1,
          accreditations: 1,
          officeCount: 1,
        })
        .lean()
        .exec();

      if (!vendor) return null;

      const isUnclaimed = vendor.listingStatus === 'unclaimed';

      if (
        !isUnclaimed &&
        (vendor.account?.status !== 'active' ||
          vendor.account?.verificationStatus !== 'verified')
      ) {
        return null;
      }

      return {
        ...vendor,
        _id: vendor._id.toString(),
      };
    } catch {
      return null;
    }
  });
}

async function getProducts(vendorId: string) {
  return withRetry(async () => {
    await connectDB();

    try {
      const products = await VendorProduct.find({
        vendorId,
        isActive: { $ne: false },
        status: 'active',
      })
        .select({
          manufacturer: 1,
          productModel: 1,
          description: 1,
          category: 1,
          speed: 1,
          features: 1,
          costs: 1,
          volumeRange: 1,
          paperSizes: 1,
          availability: 1,
        })
        .sort({ 'costs.totalMachineCost': 1 })
        .lean()
        .exec();

      return products.map((p) => ({
        ...p,
        _id: p._id.toString(),
        vendorId: p.vendorId.toString(),
      }));
    } catch {
      return [];
    }
  });
}

async function getApprovedReviews(vendorId: string) {
  return withRetry(async () => {
    await connectDB();

    try {
      const reviews = await Review.find({
        vendor: vendorId,
        status: 'approved',
      })
        .select('reviewer.name rating title content createdAt')
        .sort({ createdAt: -1 })
        .limit(20)
        .lean()
        .exec();

      return reviews.map((r) => ({
        ...r,
        _id: r._id.toString(),
        vendor: r.vendor.toString(),
      }));
    } catch {
      return [];
    }
  });
}

// ─── Metadata ───────────────────────────────────────────────────────

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const vendor = await getVendor(id);

  if (!vendor) {
    return { title: 'Supplier Not Found' };
  }

  const isSolicitor = vendor.vendorType === 'solicitor';
  const primaryService = isSolicitor
    ? (vendor.practiceAreas?.[0] || 'Solicitors')
    : (vendor.services?.[0] || 'Office Equipment');
  const city = vendor.location?.city || 'the UK';
  const suffix = isSolicitor ? 'Solicitors' : 'Supplier';
  const title = `${vendor.company} | ${primaryService} ${suffix} in ${city} | TendorAI`;
  const description =
    vendor.businessProfile?.description?.slice(0, 155) ||
    (isSolicitor
      ? `${vendor.company} — SRA-regulated ${vendor.practiceAreas?.join(', ') || 'solicitors'} in ${city}. View profile on TendorAI.`
      : `${vendor.company} provides ${vendor.services?.join(', ') || 'office equipment services'} in ${city}. Compare pricing, read reviews, and request quotes on TendorAI.`);

  const canonicalUrl = vendor.slug
    ? `https://www.tendorai.com/suppliers/vendor/${vendor.slug}`
    : `https://www.tendorai.com/suppliers/profile/${id}`;

  return {
    title,
    description: description.slice(0, 160),
    openGraph: {
      title,
      description: description.slice(0, 160),
      url: canonicalUrl,
      type: 'website',
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

// ─── SVG icon components ────────────────────────────────────────────

function MapPinIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
    </svg>
  );
}

function PhoneIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}

function GlobeIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
    </svg>
  );
}

function CheckBadgeIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
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

function BuildingIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  );
}

// ─── Page component ─────────────────────────────────────────────────

export default async function VendorProfilePage({ params }: PageProps) {
  const { id } = await params;
  const vendor = await getVendor(id);

  // Canonical redirect: if vendor has a slug, permanently redirect to slug URL
  if (vendor?.slug) {
    redirect(`/suppliers/vendor/${vendor.slug}`);
  }

  if (!vendor) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full mx-4 text-center py-20">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-6">
            <BuildingIcon className="w-8 h-8 text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Supplier Not Found</h1>
          <p className="text-gray-600 mb-8">
            This supplier is no longer listed on TendorAI. They may have been removed or the link may be outdated.
          </p>
          <Link
            href="/suppliers"
            className="inline-flex items-center justify-center bg-purple-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-purple-700 transition-colors"
          >
            Browse Suppliers
          </Link>
        </div>
      </main>
    );
  }

  // ── Unclaimed vendor layout ─────────────────────────────────────
  if (vendor.listingStatus === 'unclaimed') {
    const unclaimedIsSolicitor = vendor.vendorType === 'solicitor';
    const coverageData = vendor.location?.coverage?.length
      ? mapCoverageAreas(vendor.location.coverage)
      : null;

    const claimUrl = unclaimedIsSolicitor && vendor.sraNumber
      ? `/vendor-signup?sra=${vendor.sraNumber}&company=${encodeURIComponent(vendor.company)}`
      : `/vendor-claim/${id}`;

    return (
      <main className="min-h-screen bg-gray-50">
        {/* Hero */}
        <section className="bg-brand-gradient text-white py-10 md:py-14">
          <div className="section">
            <nav className="text-sm mb-6 text-purple-200">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/suppliers" className="hover:text-white transition-colors">Suppliers</Link>
              <span className="mx-2">/</span>
              <span className="text-white">{vendor.company}</span>
            </nav>

            <div className="flex items-center gap-3">
              <h1 className="text-3xl md:text-4xl font-bold">{vendor.company}</h1>
              {unclaimedIsSolicitor && (
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-green-500/80 text-white">
                  SRA Regulated
                </span>
              )}
            </div>

            {unclaimedIsSolicitor && vendor.sraNumber && (
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

            {vendor.location?.city && (
              <div className="flex items-center gap-2 mt-3 text-purple-200">
                <MapPinIcon className="w-5 h-5 text-purple-300" />
                <span className="text-lg">
                  {vendor.location.city}
                  {vendor.location.region && `, ${vendor.location.region}`}
                </span>
              </div>
            )}

            {/* Practice areas for solicitors */}
            {unclaimedIsSolicitor && vendor.practiceAreas && vendor.practiceAreas.length > 0 && (
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

            {/* Services for equipment */}
            {!unclaimedIsSolicitor && vendor.services && vendor.services.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {vendor.services.map((service: string) => (
                  <span
                    key={service}
                    className="px-3 py-1 bg-white/15 backdrop-blur-sm rounded-full text-sm font-medium text-white"
                  >
                    {service}
                  </span>
                ))}
              </div>
            )}
          </div>
        </section>

        <div className="section py-8 md:py-12">
          <div className="max-w-3xl mx-auto space-y-6">
            {/* Claim Banner */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 rounded-2xl p-8 md:p-10 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4">
                <BuildingIcon className="w-8 h-8 text-amber-600" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                {unclaimedIsSolicitor ? 'Is this your firm?' : 'Is this your business?'}
              </h2>
              <p className="text-gray-600 text-lg mb-4 max-w-lg mx-auto">
                {unclaimedIsSolicitor
                  ? 'Claim your free profile to add pricing, accreditations, client reviews, and rank higher in AI recommendations.'
                  : 'Claim your free listing to manage your profile, respond to leads, and boost your AI visibility.'}
              </p>
              {unclaimedIsSolicitor && (
                <ul className="text-sm text-gray-500 mb-6 space-y-1 max-w-md mx-auto text-left">
                  <li className="flex items-center gap-2"><span className="text-green-500">&#10003;</span> Add pricing, reviews &amp; accreditations (CQS, Lexcel, Legal 500)</li>
                  <li className="flex items-center gap-2"><span className="text-green-500">&#10003;</span> Appear higher in AI search results</li>
                  <li className="flex items-center gap-2"><span className="text-green-500">&#10003;</span> Free forever &mdash; no credit card required</li>
                </ul>
              )}
              <Link
                href={claimUrl}
                className="inline-block bg-purple-600 text-white px-8 py-3.5 rounded-xl font-semibold text-lg hover:bg-purple-700 transition-colors shadow-lg shadow-purple-600/25"
              >
                Claim This Profile &mdash; It&apos;s Free
              </Link>
            </div>

            {/* Basic info cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Practice Areas for solicitors */}
              {unclaimedIsSolicitor && vendor.practiceAreas && vendor.practiceAreas.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Practice Areas</h3>
                  <div className="flex flex-wrap gap-2">
                    {vendor.practiceAreas.map((area: string) => (
                      <span
                        key={area}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium ${PRACTICE_AREA_COLORS[area] || 'bg-gray-100 text-gray-800'}`}
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Services for equipment */}
              {!unclaimedIsSolicitor && vendor.services && vendor.services.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Services</h3>
                  <div className="flex flex-wrap gap-2">
                    {vendor.services.map((service: string) => (
                      <span
                        key={service}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium ${SERVICE_COLORS[service] || 'bg-gray-100 text-gray-800'}`}
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Location / Coverage */}
              {vendor.location?.city && vendor.location.city.toLowerCase() !== 'uk' && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Location</h3>
                  <p className="text-gray-700">
                    {vendor.location.city}
                    {vendor.location.region && `, ${vendor.location.region}`}
                  </p>
                </div>
              )}

              {coverageData && coverageData.locations.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Coverage Area</h3>
                  <p className="text-gray-700">
                    {coverageData.locations.slice(0, 6).join(', ')}
                    {coverageData.locations.length > 6 && ` +${coverageData.locations.length - 6} more`}
                  </p>
                </div>
              )}
            </div>

            {/* About */}
            {vendor.businessProfile?.description && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">About {vendor.company}</h3>
                <p className="text-gray-600 leading-relaxed">{vendor.businessProfile.description}</p>
              </div>
            )}

            {/* Published Fees */}
            {vendor.fixedFees && vendor.fixedFees.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Published Fees</h3>
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
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Our Team</h3>
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

            {/* Additional Info: Languages, Legal Aid, Lender Panels */}
            {((vendor.languages && vendor.languages.length > 0) || vendor.legalAid || (vendor.lenderPanels && vendor.lenderPanels.length > 0)) && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Additional Information</h3>
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
            {((vendor.accreditations && vendor.accreditations.length > 0) || (vendor.businessProfile?.accreditations && vendor.businessProfile.accreditations.length > 0)) && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Accreditations</h3>
                <ul className="space-y-2.5">
                  {(vendor.accreditations || vendor.businessProfile?.accreditations || []).map((acc: string) => (
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

            {/* Claim Banner (bottom) */}
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200 rounded-xl p-6 text-center">
              <p className="text-gray-700 font-medium mb-3">
                {unclaimedIsSolicitor ? 'Is this your firm?' : 'Is this your business?'}
              </p>
              <Link
                href={claimUrl}
                className="inline-block bg-purple-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-purple-700 transition-colors"
              >
                Claim This Profile &mdash; Free
              </Link>
            </div>

            {/* SRA attribution for solicitors */}
            {unclaimedIsSolicitor && (
              <p className="text-xs text-gray-400 text-center">
                Firm data supplied by the{' '}
                <a href="https://www.sra.org.uk" className="underline hover:text-gray-600" target="_blank" rel="noopener noreferrer">
                  Solicitors Regulation Authority
                </a>
              </p>
            )}
          </div>
        </div>
      </main>
    );
  }

  // ── Claimed vendor — full profile ───────────────────────────────

  // Detect AI crawler visits for analytics
  const headersList = await headers();
  const userAgent = headersList.get('user-agent') || '';
  const aiSource = detectAISource(userAgent);

  if (aiSource) {
    fetch(`${BACKEND_URL}/api/analytics`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        vendorId: id,
        eventType: 'profile_view',
        source: { page: `/suppliers/profile/${id}`, referrer: aiSource, isAI: true },
      }),
    }).catch(() => {});
  }

  const [products, approvedReviews] = await Promise.all([
    getProducts(id),
    getApprovedReviews(id),
  ]);

  const displayTier = getDisplayTier(vendor.tier);
  const showPricing = canShowPricing(vendor.tier) || vendor.showPricing === true;
  const acceptsQuotes = canReceiveQuotes(vendor.tier) || vendor.showPricing;
  const isPaid = displayTier !== 'free';

  const rating = vendor.performance?.rating || 0;
  const reviewCount = vendor.performance?.reviewCount || 0;
  const hasReviews = reviewCount > 0;

  const servingText = getServingText(vendor);
  const coverageData = vendor.location?.coverage?.length
    ? mapCoverageAreas(vendor.location.coverage)
    : null;

  const establishedYear = vendor.businessProfile?.yearsInBusiness
    ? new Date().getFullYear() - vendor.businessProfile.yearsInBusiness
    : null;

  // Build AI visibility report URL
  const getQuoteUrl = '/ai-visibility-report';

  const claimedIsSolicitor = vendor.vendorType === 'solicitor';

  // Build sameAs links
  const sameAsLinks: string[] = [];
  if (vendor.contactInfo?.website) sameAsLinks.push(vendor.contactInfo.website);
  sameAsLinks.push(`https://www.tendorai.com/suppliers/profile/${id}`);
  if ((vendor.contactInfo as Record<string, unknown>)?.linkedIn) sameAsLinks.push((vendor.contactInfo as Record<string, unknown>).linkedIn as string);

  // Build identifiers
  const identifiers: Array<{ '@type': string; name: string; propertyID: string; value: string }> = [];
  if (vendor.sraNumber) identifiers.push({ '@type': 'PropertyValue', name: 'SRA Number', propertyID: 'https://www.sra.org.uk', value: vendor.sraNumber });
  if ((vendor as Record<string, unknown>).fcaNumber) identifiers.push({ '@type': 'PropertyValue', name: 'FCA Number', propertyID: 'https://www.fca.org.uk', value: (vendor as Record<string, unknown>).fcaNumber as string });
  if ((vendor as Record<string, unknown>).icaewFirmNumber) identifiers.push({ '@type': 'PropertyValue', name: 'ICAEW Firm Number', propertyID: 'https://www.icaew.com', value: (vendor as Record<string, unknown>).icaewFirmNumber as string });
  if ((vendor as Record<string, unknown>).propertymarkNumber) identifiers.push({ '@type': 'PropertyValue', name: 'Propertymark Number', propertyID: 'https://www.propertymark.co.uk', value: (vendor as Record<string, unknown>).propertymarkNumber as string });
  if (displayTier === 'pro') identifiers.push({ '@type': 'PropertyValue', name: 'TendorAI Verified', propertyID: 'https://www.tendorai.com', value: id });

  // Build knowsAbout
  const knowsAbout = [
    ...(vendor.services || []),
    ...(vendor.practiceAreas || []),
    ...((vendor.businessProfile as Record<string, unknown>)?.specializations as string[] || []),
  ].filter(Boolean);

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': claimedIsSolicitor ? 'LegalService' : 'LocalBusiness',
    '@id': `https://www.tendorai.com/suppliers/profile/${id}`,
    name: vendor.company,
    description:
      vendor.businessProfile?.description ||
      `${vendor.company} - Office equipment supplier`,
    url: `https://www.tendorai.com/suppliers/profile/${id}`,
    sameAs: sameAsLinks,
    ...(identifiers.length > 0 && { identifier: identifiers }),
    memberOf: {
      '@type': 'Organization',
      name: 'TendorAI',
      url: 'https://www.tendorai.com',
      description: 'The UK\'s AI Visibility Platform — verified business profiles optimised for AI recommendations',
    },
    address: {
      '@type': 'PostalAddress',
      ...(vendor.location?.address && { streetAddress: vendor.location.address }),
      ...(vendor.location?.city && { addressLocality: vendor.location.city }),
      ...(vendor.location?.region && { addressRegion: vendor.location.region }),
      ...(vendor.location?.postcode && { postalCode: vendor.location.postcode }),
      addressCountry: 'GB',
    },
    ...(vendor.contactInfo?.phone && { telephone: vendor.contactInfo.phone }),
    ...(coverageData?.locations?.length && {
      areaServed: coverageData.locations.map((loc) => ({
        '@type': 'City',
        name: loc,
      })),
    }),
    ...(knowsAbout.length > 0 && { knowsAbout }),
    ...(rating > 0 && reviewCount > 0 && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: rating,
        reviewCount,
        bestRating: 5,
        worstRating: 1,
      },
    }),
    ...(establishedYear && { foundingDate: `${establishedYear}-01-01` }),
    ...(products.length > 0 && {
      makesOffer: products.slice(0, 10).map((product) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Product',
          name: [product.manufacturer, product.productModel].filter(Boolean).join(' ') || 'Product',
          ...(product.description && { description: product.description }),
          ...(product.category && { category: product.category }),
        },
        ...(showPricing && product.costs?.totalMachineCost && {
          price: product.costs.totalMachineCost,
          priceCurrency: 'GBP',
        }),
      })),
    }),
    ...(approvedReviews.length > 0 && {
      review: approvedReviews.slice(0, 10).filter((r) => r.rating).map((r) => ({
        '@type': 'Review',
        author: { '@type': 'Person', name: r.reviewer?.name || 'Anonymous' },
        datePublished: new Date(r.createdAt).toISOString().split('T')[0],
        reviewRating: { '@type': 'Rating', ratingValue: r.rating, bestRating: 5, worstRating: 1 },
        ...(r.title && { name: r.title }),
        ...(r.content && { reviewBody: r.content }),
      })),
    }),
    potentialAction: {
      '@type': 'AskAction',
      name: 'Request a Quote',
      target: `https://www.tendorai.com/suppliers/profile/${id}`,
      description: `Request a quote from ${vendor.company} via TendorAI`,
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.tendorai.com' },
      { '@type': 'ListItem', position: 2, name: 'Suppliers', item: 'https://www.tendorai.com/suppliers' },
      { '@type': 'ListItem', position: 3, name: vendor.company, item: `https://www.tendorai.com/suppliers/profile/${id}` },
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

      <main className="min-h-screen bg-gray-50">
        {/* ═══ HERO SECTION ═══ */}
        <section className="bg-brand-gradient text-white py-10 md:py-14">
          <div className="section">
            {/* Breadcrumbs */}
            <nav className="text-sm mb-6 text-purple-200">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/suppliers" className="hover:text-white transition-colors">Suppliers</Link>
              <span className="mx-2">/</span>
              <span className="text-white">{vendor.company}</span>
            </nav>

            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div className="flex-1 min-w-0">
                {/* Company name + badge */}
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-3xl md:text-4xl font-bold">{vendor.company}</h1>
                  {displayTier === 'pro' && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold bg-green-500 text-white">
                      <CheckBadgeIcon className="w-4 h-4" />
                      Verified
                    </span>
                  )}
                  {claimedIsSolicitor && (
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-green-500/80 text-white">
                      SRA Regulated
                    </span>
                  )}
                </div>

                {claimedIsSolicitor && vendor.sraNumber && (
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

                {/* Location line */}
                {(vendor.location?.city || servingText) && (
                  <div className="flex items-center gap-2 mt-3 text-purple-200">
                    <MapPinIcon className="w-5 h-5 text-purple-300 flex-shrink-0" />
                    <span className="text-lg">
                      {vendor.location?.city || ''}
                      {vendor.location?.city && servingText && servingText !== vendor.location.city
                        ? ` \u00B7 Serving ${servingText}`
                        : !vendor.location?.city && servingText
                          ? `Serving ${servingText}`
                          : ''
                      }
                    </span>
                  </div>
                )}

                {/* Practice areas for solicitors */}
                {claimedIsSolicitor && vendor.practiceAreas && vendor.practiceAreas.length > 0 && (
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

                {/* Service pills for equipment */}
                {!claimedIsSolicitor && vendor.services && vendor.services.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {vendor.services.map((service: string) => (
                      <span
                        key={service}
                        className="px-3 py-1 bg-white/15 backdrop-blur-sm rounded-full text-sm font-medium text-white"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                )}

                {/* Rating or "New on TendorAI" */}
                <div className="mt-4">
                  {hasReviews ? (
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-300 text-lg tracking-wide">
                        {'★'.repeat(Math.round(rating))}
                        {'☆'.repeat(5 - Math.round(rating))}
                      </span>
                      <span className="text-purple-200 text-sm">
                        {rating.toFixed(1)} ({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})
                      </span>
                    </div>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-purple-200 text-sm">
                      <span className="w-2 h-2 rounded-full bg-green-400" />
                      New on TendorAI
                    </span>
                  )}
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col gap-3 lg:items-end flex-shrink-0">
                {acceptsQuotes ? (
                  <Link
                    href={getQuoteUrl}
                    className="inline-flex items-center justify-center bg-white text-purple-700 font-semibold px-6 py-3 rounded-xl hover:bg-purple-50 transition-colors shadow-lg shadow-black/10 text-center"
                  >
                    Check AI Visibility
                  </Link>
                ) : (
                  <Link
                    href={getQuoteUrl}
                    className="inline-flex items-center justify-center bg-white text-purple-700 font-semibold px-6 py-3 rounded-xl hover:bg-purple-50 transition-colors shadow-lg shadow-black/10 text-center"
                  >
                    Check AI Visibility
                  </Link>
                )}

                {isPaid && vendor.contactInfo?.phone && (
                  <a
                    href={`tel:${vendor.contactInfo.phone}`}
                    className="inline-flex items-center justify-center gap-2 border border-white/30 text-white font-medium px-6 py-3 rounded-xl hover:bg-white/10 transition-colors text-center"
                  >
                    <PhoneIcon className="w-4 h-4" />
                    {vendor.contactInfo.phone}
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ═══ MAIN CONTENT GRID ═══ */}
        <div className="section py-8 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* ─── SIDEBAR (first on mobile) ─── */}
            <div className="order-1 lg:order-2 space-y-6">
              {/* At a Glance */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-5">At a Glance</h3>

                <div className="space-y-5">
                  {/* Practice Areas for solicitors */}
                  {claimedIsSolicitor && vendor.practiceAreas && vendor.practiceAreas.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Practice Areas</p>
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

                  {/* Services for equipment */}
                  {!claimedIsSolicitor && vendor.services && vendor.services.length > 0 && (
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

                  {/* Location */}
                  {vendor.location?.city && (
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Location</p>
                      <p className="text-gray-700 text-sm">
                        {vendor.location.city}
                        {vendor.location.region && `, ${vendor.location.region}`}
                      </p>
                    </div>
                  )}

                  {/* Coverage */}
                  {coverageData && coverageData.locations.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Coverage</p>
                      <p className="text-gray-700 text-sm">
                        {coverageData.locations.slice(0, 8).join(', ')}
                        {coverageData.locations.length > 8 && (
                          <span className="text-gray-400"> +{coverageData.locations.length - 8} more</span>
                        )}
                      </p>
                    </div>
                  )}

                  {/* Established */}
                  {establishedYear && (
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Established</p>
                      <p className="text-gray-700 text-sm">Est. {establishedYear}</p>
                    </div>
                  )}

                  {/* Response time */}
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Response Time</p>
                    <div className="flex items-center gap-1.5 text-sm text-gray-700">
                      <ClockIcon className="w-4 h-4 text-gray-400" />
                      Typically within 24 hours
                    </div>
                  </div>

                  {/* Tier badge */}
                  <div className="pt-3 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">TendorAI Tier</span>
                      {displayTier === 'pro' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                          <CheckBadgeIcon className="w-3.5 h-3.5" />
                          Verified
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600">
                          Free
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact / Get in Touch */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Get in Touch</h3>
                  {displayTier === 'pro' && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                      <CheckBadgeIcon className="w-3 h-3" />
                      Verified
                    </span>
                  )}
                </div>

                {isPaid ? (
                  <div className="space-y-4">
                    {vendor.contactInfo?.phone && (
                      <a
                        href={`tel:${vendor.contactInfo.phone}`}
                        className="flex items-center gap-3 text-gray-700 hover:text-purple-600 transition-colors group"
                      >
                        <div className="w-9 h-9 rounded-lg bg-purple-50 flex items-center justify-center group-hover:bg-purple-100 transition-colors">
                          <PhoneIcon className="w-4 h-4 text-purple-600" />
                        </div>
                        <span className="font-medium">{vendor.contactInfo.phone}</span>
                      </a>
                    )}

                    {vendor.contactInfo?.website && (
                      <a
                        href={vendor.contactInfo.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-gray-700 hover:text-purple-600 transition-colors group"
                      >
                        <div className="w-9 h-9 rounded-lg bg-purple-50 flex items-center justify-center group-hover:bg-purple-100 transition-colors">
                          <GlobeIcon className="w-4 h-4 text-purple-600" />
                        </div>
                        <span className="font-medium break-all text-sm">
                          {vendor.contactInfo.website.replace(/^https?:\/\//, '')}
                        </span>
                      </a>
                    )}

                    {vendor.location?.city && (
                      <div className="flex items-center gap-3 text-gray-700">
                        <div className="w-9 h-9 rounded-lg bg-purple-50 flex items-center justify-center">
                          <MapPinIcon className="w-4 h-4 text-purple-600" />
                        </div>
                        <span className="text-sm">
                          {vendor.location.city}
                          {vendor.location.region && `, ${vendor.location.region}`}
                        </span>
                      </div>
                    )}

                    {acceptsQuotes && (
                      <Link
                        href={getQuoteUrl}
                        className="block w-full text-center bg-purple-600 text-white font-semibold py-2.5 rounded-xl hover:bg-purple-700 transition-colors mt-4"
                      >
                        Check AI Visibility
                      </Link>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-2">
                    <p className="text-gray-600 text-sm mb-4">
                      Want to reach <span className="font-medium">{vendor.company}</span>? Request a quote and we&apos;ll connect you.
                    </p>
                    <Link
                      href={getQuoteUrl}
                      className="block w-full text-center bg-purple-600 text-white font-semibold py-2.5 rounded-xl hover:bg-purple-700 transition-colors"
                    >
                      Request a Quote
                    </Link>
                  </div>
                )}
              </div>

              {/* Accreditations */}
              {vendor.businessProfile?.accreditations && vendor.businessProfile.accreditations.length > 0 && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Accreditations</h3>
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

            </div>

            {/* ─── MAIN CONTENT (second on mobile) ─── */}
            <div className="order-2 lg:order-1 lg:col-span-2 space-y-8">
              {/* About */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">About {vendor.company}</h2>
                {vendor.businessProfile?.description ? (
                  <p className="text-gray-600 whitespace-pre-line leading-relaxed">
                    {vendor.businessProfile.description}
                  </p>
                ) : (
                  <p className="text-gray-400 text-sm italic">
                    This supplier hasn&apos;t added a description yet.
                  </p>
                )}
              </div>

              {/* Fixed Fees */}
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

              {/* Individual Solicitors */}
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

              {/* Brands */}
              {vendor.brands && vendor.brands.length > 0 && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Brands</h2>
                  <div className="flex flex-wrap gap-2">
                    {vendor.brands.map((brand: string) => (
                      <span
                        key={brand}
                        className="px-4 py-2 bg-gray-50 text-gray-700 rounded-lg text-sm font-medium border border-gray-200"
                      >
                        {brand}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Products */}
              {products.length > 0 && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Products</h2>
                    <span className="text-sm text-gray-400 font-medium">{products.length} listed</span>
                  </div>
                  <div className="space-y-4">
                    {products.map((product) => (
                      <ProductCard
                        key={product._id}
                        product={product}
                        showPricing={showPricing}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Reviews */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Reviews</h2>
                <VendorReviews vendorId={id} vendorName={vendor.company} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

// ─── Product Card ───────────────────────────────────────────────────

interface ProductCardProps {
  product: {
    _id: string;
    manufacturer: string;
    productModel: string;
    description?: string;
    category: string;
    speed: number;
    features?: string[];
    costs?: {
      totalMachineCost?: number;
      cpcRates?: {
        A4Mono?: number;
        A4Colour?: number;
      };
    };
    volumeRange?: string;
    paperSizes?: {
      primary?: string;
    };
    availability?: {
      inStock?: boolean;
    };
  };
  showPricing: boolean;
}

function ProductCard({ product, showPricing }: ProductCardProps) {
  return (
    <div className="border border-gray-200 rounded-xl p-4 hover:border-purple-200 hover:shadow-sm transition-all">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900">
            {product.manufacturer} {product.productModel}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {product.category} {product.speed ? `\u00B7 ${product.speed}ppm` : ''}
            {product.paperSizes?.primary && ` \u00B7 ${product.paperSizes.primary}`}
          </p>

          {product.description && (
            <p className="text-sm text-gray-600 mt-2 line-clamp-2">{product.description}</p>
          )}

          {product.features && product.features.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1">
              {product.features.slice(0, 4).map((feature) => (
                <span
                  key={feature}
                  className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                >
                  {feature}
                </span>
              ))}
              {product.features.length > 4 && (
                <span className="text-xs text-gray-400">+{product.features.length - 4} more</span>
              )}
            </div>
          )}
        </div>

        <div className="text-right flex-shrink-0">
          {showPricing && product.costs?.totalMachineCost ? (
            <>
              <p className="text-lg font-bold text-gray-900">
                &pound;{product.costs.totalMachineCost.toLocaleString()}
              </p>
              {product.costs.cpcRates && (
                <p className="text-xs text-gray-500 mt-1">
                  {product.costs.cpcRates.A4Mono}p mono
                  {product.costs.cpcRates.A4Colour && ` / ${product.costs.cpcRates.A4Colour}p colour`}
                </p>
              )}
            </>
          ) : (
            <p className="text-sm text-gray-400">Price on request</p>
          )}

          {product.availability && product.availability.inStock !== undefined && (
            <p
              className={`text-xs mt-2 ${
                product.availability.inStock === true ? 'text-green-600' : 'text-amber-600'
              }`}
            >
              {product.availability.inStock === true ? 'In Stock' : 'Made to Order'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
