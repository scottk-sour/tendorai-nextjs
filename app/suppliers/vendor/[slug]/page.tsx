import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { connectDB } from '@/lib/db/connection';
import { Vendor } from '@/lib/db/models';
import {
  SERVICES,
  POSTCODE_AREAS,
} from '@/lib/constants';

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
  Conveyancing: 'bg-blue-100 text-blue-800',
  'Family Law': 'bg-pink-100 text-pink-800',
  'Criminal Law': 'bg-red-100 text-red-800',
  'Commercial Law': 'bg-indigo-100 text-indigo-800',
  'Employment Law': 'bg-amber-100 text-amber-800',
  'Wills & Probate': 'bg-purple-100 text-purple-800',
  Immigration: 'bg-teal-100 text-teal-800',
  'Personal Injury': 'bg-orange-100 text-orange-800',
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
  Conveyancing: 'conveyancing',
  'Family Law': 'family-law',
  'Criminal Law': 'criminal-law',
  'Commercial Law': 'commercial-law',
  'Employment Law': 'employment-law',
  'Wills & Probate': 'wills-and-probate',
  Immigration: 'immigration',
  'Personal Injury': 'personal-injury',
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
  await connectDB();
  try {
    const vendor = await Vendor.findOne({ slug })
      .select({
        company: 1,
        slug: 1,
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
        regulatoryBody: 1,
        contactInfo: 1,
        claimed: 1,
      })
      .lean()
      .exec();

    if (!vendor) return null;

    return {
      ...vendor,
      _id: vendor._id.toString(),
    };
  } catch {
    return null;
  }
}

// ─── Metadata ───────────────────────────────────────────────────────

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const vendor = await getVendorBySlug(slug);

  if (!vendor) {
    return { title: 'Supplier Not Found | TendorAI' };
  }

  const isSolicitor = vendor.vendorType === 'solicitor';
  const primaryService = isSolicitor
    ? (vendor.practiceAreas?.[0] || 'Solicitors')
    : (vendor.services?.[0] || 'Office Equipment');
  const city = vendor.location?.city || 'the UK';
  const suffix = isSolicitor ? 'Solicitors' : 'Supplier';
  const title = `${vendor.company} | ${primaryService} ${suffix} in ${city} | TendorAI`;
  const description =
    vendor.businessProfile?.description?.slice(0, 140) ||
    (isSolicitor
      ? `${vendor.company} — SRA-regulated ${vendor.practiceAreas?.join(', ') || 'solicitors'} in ${city}. View profile on TendorAI.`
      : `${vendor.company} provides ${vendor.services?.join(', ') || 'office equipment services'} in ${city}. Compare suppliers and request quotes on TendorAI.`);

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

  const isSolicitor = vendor.vendorType === 'solicitor';

  // JSON-LD — LegalService for solicitors, LocalBusiness for equipment
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': isSolicitor ? 'LegalService' : 'LocalBusiness',
    '@id': `https://www.tendorai.com/suppliers/vendor/${slug}`,
    name: vendor.company,
    description:
      vendor.businessProfile?.description ||
      `${vendor.company} provides ${vendor.services?.join(', ') || 'office equipment services'}${city ? ` in ${city}` : ''}.`,
    url: `https://www.tendorai.com/suppliers/vendor/${slug}`,
    address: {
      '@type': 'PostalAddress',
      ...(city && { addressLocality: city }),
      ...(region && { addressRegion: region }),
      addressCountry: 'GB',
    },
    ...(coverageData?.locations?.length && {
      areaServed: coverageData.locations.map((loc) => ({
        '@type': 'City',
        name: loc,
      })),
    }),
    ...(establishedYear && { foundingDate: String(establishedYear) }),
    ...(vendor.brands?.length && {
      brand: vendor.brands.map((b: string) => ({ '@type': 'Brand', name: b })),
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
      },
    ],
  };

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
              {isSolicitor && (
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-green-500/80 text-white">
                  SRA Regulated
                </span>
              )}
            </div>

            {isSolicitor && vendor.sraNumber && (
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

            {city && (
              <div className="flex items-center gap-2 mt-3 text-purple-200">
                <MapPinIcon className="w-5 h-5 text-purple-300" />
                <span className="text-lg">
                  {city}
                  {region && `, ${region}`}
                </span>
              </div>
            )}

            {/* Practice areas for solicitors */}
            {isSolicitor && vendor.practiceAreas && vendor.practiceAreas.length > 0 && (
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
            {!isSolicitor && vendor.services && vendor.services.length > 0 && (
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
                  {isSolicitor && vendor.practiceAreas && vendor.practiceAreas.length > 0 && (
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

                  {!isSolicitor && vendor.services && vendor.services.length > 0 && (
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
                    {serviceLinks.map(({ name, slug: sSlug }) => (
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

              {/* Compare Quotes */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 text-center">
                <h2 className="text-xl font-bold text-gray-900 mb-3">
                  Looking for {vendor.services?.[0] || 'office equipment'} quotes?
                </h2>
                <p className="text-gray-600 mb-6">
                  Compare prices from trusted {vendor.services?.[0] || 'office equipment'} suppliers
                  {city ? ` in ${city}` : ''} and get the best deal for your business.
                </p>
                <Link
                  href={`/get-quotes${vendor.services?.[0] ? `?service=${vendor.services[0]}` : ''}`}
                  className="inline-block bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors"
                >
                  Compare Quotes
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
