import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { connectDB } from '@/lib/db/connection';
import { Vendor, VendorProduct } from '@/lib/db/models';
import {
  SERVICES,
  MAJOR_LOCATIONS,
  getServiceFromSlug,
  SERVICE_KEYS,
  formatLocationName,
  getNearbyLocations,
  getDisplayTier,
  calculatePriorityScore,
  canShowPricing,
} from '@/lib/constants';

interface PageProps {
  params: Promise<{ category: string; location: string }>;
}

export const revalidate = 3600; // Revalidate every hour

// Generate all category/location combinations at build time
export async function generateStaticParams() {
  const params: { category: string; location: string }[] = [];

  for (const category of SERVICE_KEYS) {
    for (const location of MAJOR_LOCATIONS) {
      params.push({
        category,
        location: location.toLowerCase().replace(/\s+/g, '-'),
      });
    }
  }

  return params;
}

// Dynamic metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, location } = await params;
  const service = SERVICES[category as keyof typeof SERVICES];
  const locationName = formatLocationName(location);

  if (!service) {
    return { title: 'Not Found' };
  }

  const title = `${service.name} Suppliers in ${locationName}`;
  const description = `Find trusted ${service.name.toLowerCase()} suppliers in ${locationName}. Compare verified vendors, read reviews, and get instant quotes. Free service for UK businesses.`;

  return {
    title,
    description,
    keywords: [
      `${service.name.toLowerCase()} ${locationName.toLowerCase()}`,
      `${service.name.toLowerCase()} suppliers ${locationName.toLowerCase()}`,
      `office equipment ${locationName.toLowerCase()}`,
    ],
    openGraph: {
      title,
      description,
      url: `https://www.tendorai.com/suppliers/${category}/${location}`,
      type: 'website',
    },
    alternates: {
      canonical: `https://www.tendorai.com/suppliers/${category}/${location}`,
    },
  };
}

// Fetch vendors
async function fetchVendors(category: string, location: string) {
  await connectDB();

  const serviceName = getServiceFromSlug(category);
  if (!serviceName) return [];

  const normalizedLocation = location.replace(/-/g, ' ');

  const query = {
    'account.status': 'active',
    'account.verificationStatus': 'verified',
    services: serviceName,
    $or: [
      { 'location.coverage': { $regex: new RegExp(normalizedLocation, 'i') } },
      { 'location.city': { $regex: new RegExp(normalizedLocation, 'i') } },
      { 'location.region': { $regex: new RegExp(normalizedLocation, 'i') } },
      { postcodeAreas: { $regex: new RegExp(normalizedLocation.substring(0, 2), 'i') } },
    ],
  };

  const vendors = await Vendor.find(query)
    .select({
      company: 1,
      services: 1,
      location: 1,
      performance: 1,
      businessProfile: 1,
      brands: 1,
      tier: 1,
      contactInfo: 1,
      showPricing: 1,
    })
    .lean()
    .exec();

  // Get product counts
  const vendorIds = vendors.map((v) => v._id);
  const productCounts = await VendorProduct.aggregate([
    { $match: { vendorId: { $in: vendorIds }, isActive: { $ne: false } } },
    { $group: { _id: '$vendorId', count: { $sum: 1 } } },
  ]);

  const productCountMap: Record<string, number> = {};
  productCounts.forEach((p: { _id: { toString(): string }; count: number }) => {
    productCountMap[p._id.toString()] = p.count;
  });

  // Sort by priority
  return vendors
    .map((v) => ({
      ...v,
      _id: v._id.toString(),
      productCount: productCountMap[v._id.toString()] || 0,
      priorityScore: calculatePriorityScore({
        tier: v.tier,
        company: v.company,
        contactInfo: v.contactInfo,
        email: '',
        businessProfile: v.businessProfile,
        brands: v.brands,
        location: v.location,
        hasProducts: (productCountMap[v._id.toString()] || 0) > 0,
      }),
    }))
    .sort((a, b) => b.priorityScore - a.priorityScore);
}

export default async function CategoryLocationPage({ params }: PageProps) {
  const { category, location } = await params;
  const service = SERVICES[category as keyof typeof SERVICES];
  const locationName = formatLocationName(location);

  if (!service) {
    notFound();
  }

  const vendors = await fetchVendors(category, location);

  // JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ItemList',
        name: `${service.name} Suppliers in ${locationName}`,
        description: `List of verified ${service.name.toLowerCase()} suppliers serving ${locationName}`,
        numberOfItems: vendors.length,
        itemListElement: vendors.slice(0, 10).map((vendor, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'LocalBusiness',
            name: vendor.company,
            description: vendor.businessProfile?.description || `${service.name} supplier`,
            address: {
              '@type': 'PostalAddress',
              addressLocality: vendor.location?.city || locationName,
              addressRegion: vendor.location?.region || 'Wales',
              addressCountry: 'GB',
            },
            ...(vendor.performance?.rating && {
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: vendor.performance.rating,
                reviewCount: vendor.performance.reviewCount || 1,
              },
            }),
            url: `https://www.tendorai.com/suppliers/profile/${vendor._id}`,
            areaServed: vendor.location?.coverage || [locationName],
          },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.tendorai.com' },
          { '@type': 'ListItem', position: 2, name: 'Suppliers', item: 'https://www.tendorai.com/suppliers' },
          { '@type': 'ListItem', position: 3, name: service.name, item: `https://www.tendorai.com/suppliers/${category}` },
          { '@type': 'ListItem', position: 4, name: locationName },
        ],
      },
    ],
  };

  const nearbyLocations = getNearbyLocations(location);
  const relatedCategories = Object.values(SERVICES)
    .filter((s) => s.slug !== category)
    .slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-gray-50">
        {/* Hero */}
        <section className="bg-brand-gradient text-white py-12">
          <div className="section">
            <nav className="text-sm mb-4 text-purple-200">
              <Link href="/" className="hover:text-white">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/suppliers" className="hover:text-white">Suppliers</Link>
              <span className="mx-2">/</span>
              <Link href={`/suppliers/${category}`} className="hover:text-white">{service.name}</Link>
              <span className="mx-2">/</span>
              <span className="text-white">{locationName}</span>
            </nav>

            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              {service.name} Suppliers in {locationName}
            </h1>
            <p className="text-lg text-purple-100 max-w-3xl">
              Compare {vendors.length} verified {service.name.toLowerCase()} suppliers serving{' '}
              {locationName}. Get instant quotes from local businesses with transparent pricing.
            </p>
          </div>
        </section>

        {/* Results Summary */}
        <section className="bg-white border-b">
          <div className="section py-4">
            <p className="text-gray-600">
              <strong className="text-gray-900">{vendors.length}</strong> suppliers found
              {vendors.filter((v) => canShowPricing(v.tier)).length > 0 && (
                <span>
                  {' '}•{' '}
                  <strong className="text-green-600">
                    {vendors.filter((v) => canShowPricing(v.tier)).length}
                  </strong>{' '}
                  with verified pricing
                </span>
              )}
            </p>
          </div>
        </section>

        {/* Vendor List */}
        <section className="section py-8">
          {vendors.length > 0 ? (
            <div className="space-y-4">
              {vendors.map((vendor) => (
                <VendorCard key={vendor._id} vendor={vendor} />
              ))}
            </div>
          ) : (
            <EmptyState service={service.name} location={locationName} category={category} />
          )}
        </section>

        {/* SEO Content */}
        <section className="bg-white py-12 mt-8">
          <div className="section max-w-4xl">
            <div className="prose prose-purple">
              <h2>Finding {service.name} Suppliers in {locationName}</h2>
              <p>
                TendorAI connects {locationName} businesses with trusted {service.name.toLowerCase()}{' '}
                suppliers across Wales and South West England. Our platform features {vendors.length}{' '}
                verified suppliers serving the {locationName} area, each vetted for reliability and
                service quality.
              </p>

              <h3>How to Choose a {service.name} Supplier</h3>
              <ul>
                <li>
                  <strong>Local presence:</strong> Suppliers with offices in {locationName} typically
                  offer faster response times and better ongoing support.
                </li>
                <li>
                  <strong>Verified pricing:</strong> Look for the &quot;Verified&quot; badge indicating
                  transparent pricing and active engagement with customers.
                </li>
                <li>
                  <strong>Service coverage:</strong> Confirm the supplier services your specific
                  postcode area before requesting a quote.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Related Searches */}
        <section className="bg-gray-100 py-8">
          <div className="section">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Related Searches</h3>
            <div className="flex flex-wrap gap-2">
              {nearbyLocations.map((loc) => (
                <Link
                  key={loc}
                  href={`/suppliers/${category}/${loc.toLowerCase().replace(/\s+/g, '-')}`}
                  className="px-4 py-2 bg-white rounded-full text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors"
                >
                  {service.name} in {loc}
                </Link>
              ))}
              {relatedCategories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/suppliers/${cat.slug}/${location}`}
                  className="px-4 py-2 bg-white rounded-full text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors"
                >
                  {cat.name} in {locationName}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

// Vendor Card Component
interface VendorCardProps {
  vendor: {
    _id: string;
    company: string;
    services?: string[];
    location?: {
      city?: string;
      region?: string;
      coverage?: string[];
    };
    performance?: {
      rating?: number;
      reviewCount?: number;
    };
    businessProfile?: {
      description?: string;
      yearsInBusiness?: number;
      accreditations?: string[];
    };
    brands?: string[];
    tier?: string;
    contactInfo?: {
      phone?: string;
      website?: string;
    };
    productCount: number;
  };
}

function VendorCard({ vendor }: VendorCardProps) {
  const displayTier = getDisplayTier(vendor.tier);
  const showPricing = canShowPricing(vendor.tier);

  return (
    <article
      className={`bg-white rounded-lg shadow-sm border-l-4 p-6 hover:shadow-md transition-shadow ${
        displayTier === 'verified'
          ? 'border-l-green-500'
          : displayTier === 'visible'
          ? 'border-l-blue-500'
          : 'border-l-transparent'
      }`}
      itemScope
      itemType="https://schema.org/LocalBusiness"
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-xl font-semibold text-gray-900" itemProp="name">
              <Link href={`/suppliers/profile/${vendor._id}`} className="hover:text-purple-600">
                {vendor.company}
              </Link>
            </h2>
            {displayTier !== 'free' && (
              <span
                className={`text-xs font-medium px-2 py-1 rounded-full ${
                  displayTier === 'verified'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-blue-100 text-blue-700'
                }`}
              >
                {displayTier === 'verified' ? 'Verified' : 'Listed'}
              </span>
            )}
          </div>

          {vendor.businessProfile?.description && (
            <p className="text-gray-600 text-sm mb-3 line-clamp-2" itemProp="description">
              {vendor.businessProfile.description}
            </p>
          )}

          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            {vendor.location?.city && (
              <span>
                {vendor.location.city}
                {vendor.location.region && `, ${vendor.location.region}`}
              </span>
            )}

            {vendor.performance?.rating && vendor.performance.rating > 0 && (
              <span>
                <span className="text-yellow-500">★</span> {vendor.performance.rating.toFixed(1)}
                <span className="text-gray-400"> ({vendor.performance.reviewCount || 0})</span>
              </span>
            )}

            {vendor.businessProfile?.yearsInBusiness && (
              <span>{vendor.businessProfile.yearsInBusiness}+ years</span>
            )}

            {vendor.productCount > 0 && <span>{vendor.productCount} products</span>}
          </div>

          {vendor.brands && vendor.brands.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1">
              {vendor.brands.slice(0, 4).map((brand) => (
                <span key={brand} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                  {brand}
                </span>
              ))}
              {vendor.brands.length > 4 && (
                <span className="text-xs text-gray-400">+{vendor.brands.length - 4} more</span>
              )}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2 md:items-end">
          <Link
            href={`/suppliers/profile/${vendor._id}`}
            className="btn-outline text-center"
          >
            View Profile
          </Link>
          {showPricing && (
            <Link
              href={`/suppliers/profile/${vendor._id}?quote=true`}
              className="btn-primary text-center"
            >
              Get Quote
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}

// Empty State Component
function EmptyState({
  service,
  location,
  category,
}: {
  service: string;
  location: string;
  category: string;
}) {
  const nearbyLocations = getNearbyLocations(location.toLowerCase().replace(/\s+/g, '-'));

  return (
    <div className="text-center py-12 bg-white rounded-lg">
      <div className="text-gray-400 text-5xl mb-4">🔍</div>
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        No {service} suppliers found in {location}
      </h2>
      <p className="text-gray-600 mb-6">
        We&apos;re expanding our network. Check nearby areas or browse all suppliers.
      </p>

      {nearbyLocations.length > 0 && (
        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-3">Try nearby locations:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {nearbyLocations.slice(0, 4).map((loc) => (
              <Link
                key={loc}
                href={`/suppliers/${category}/${loc.toLowerCase().replace(/\s+/g, '-')}`}
                className="px-4 py-2 bg-gray-100 rounded-full text-sm hover:bg-purple-100 hover:text-purple-700 transition-colors"
              >
                {loc}
              </Link>
            ))}
          </div>
        </div>
      )}

      <Link href="/suppliers" className="btn-primary">
        Browse All Suppliers
      </Link>
    </div>
  );
}
