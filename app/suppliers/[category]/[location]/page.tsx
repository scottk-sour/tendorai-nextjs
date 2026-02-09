import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { connectDB } from '@/lib/db/connection';
import { Vendor, VendorProduct } from '@/lib/db/models';
import VendorCard from '@/app/components/VendorCard';
import type { VendorCardData } from '@/app/components/VendorCard';
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

// Map raw MongoDB vendor to VendorCardData
function toVendorCardData(v: Record<string, unknown>): VendorCardData {
  const vendor = v as {
    _id: string;
    company?: string;
    services?: string[];
    location?: { city?: string; region?: string; coverage?: string[] };
    performance?: { rating?: number; reviewCount?: number };
    businessProfile?: { description?: string; yearsInBusiness?: number; accreditations?: string[] };
    brands?: string[];
    tier?: string;
    contactInfo?: { phone?: string; website?: string };
    listingStatus?: string;
    account?: { loginCount?: number };
    productCount: number;
  };

  const displayTier = getDisplayTier(vendor.tier);
  const hasPhone = !!(vendor.contactInfo?.phone);
  const hasRating = (vendor.performance?.rating || 0) > 0;
  const isPaid = displayTier !== 'free';
  const ls = (vendor.listingStatus || 'unclaimed').toLowerCase();
  const isClaimed = ls === 'claimed' || ls === 'verified' || hasPhone || isPaid || hasRating || (vendor.account?.loginCount || 0) > 0;

  return {
    id: vendor._id,
    company: vendor.company || '',
    services: vendor.services || [],
    location: {
      city: vendor.location?.city,
      region: vendor.location?.region,
      coverage: vendor.location?.coverage || [],
    },
    distance: null,
    rating: vendor.performance?.rating || 0,
    reviewCount: vendor.performance?.reviewCount || 0,
    tier: displayTier,
    description: vendor.businessProfile?.description,
    accreditations: vendor.businessProfile?.accreditations || [],
    yearsInBusiness: vendor.businessProfile?.yearsInBusiness,
    brands: vendor.brands || [],
    productCount: vendor.productCount || 0,
    website: vendor.contactInfo?.website,
    showPricing: canShowPricing(vendor.tier),
    accountClaimed: isClaimed,
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
      listingStatus: 1,
      'account.loginCount': 1,
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

  const allVendors = await fetchVendors(category, location);

  // Separate local from national vendors
  const localVendors = allVendors.filter((v) => {
    const city = (v.location?.city || '').toLowerCase().trim();
    return city !== 'uk' && city !== 'united kingdom' && city !== 'nationwide' && city !== '';
  });
  const nationalVendors = allVendors.filter((v) => {
    const city = (v.location?.city || '').toLowerCase().trim();
    return city === 'uk' || city === 'united kingdom' || city === 'nationwide' || city === '';
  });

  const localCards = localVendors.map((v) => toVendorCardData(v));
  const nationalCards = nationalVendors.map((v) => toVendorCardData(v));
  const totalCount = localVendors.length + nationalVendors.length;

  // Generate FAQs
  const faqs = generateFAQs(service.name, locationName, totalCount, category);

  // JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ItemList',
        name: `${service.name} Suppliers in ${locationName}`,
        description: `List of verified ${service.name.toLowerCase()} suppliers serving ${locationName}`,
        numberOfItems: totalCount,
        itemListElement: allVendors.slice(0, 10).map((vendor, index) => ({
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
      {
        '@type': 'Service',
        name: `${service.name} Suppliers in ${locationName}`,
        description: `Compare verified ${service.name.toLowerCase()} suppliers serving ${locationName}. Get quotes from ${totalCount} AI-vetted businesses.`,
        provider: {
          '@type': 'Organization',
          name: 'TendorAI',
          url: 'https://www.tendorai.com',
        },
        areaServed: {
          '@type': 'City',
          name: locationName,
          containedInPlace: { '@type': 'Country', name: 'United Kingdom' },
        },
        url: `https://www.tendorai.com/suppliers/${category}/${location}`,
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
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
              Compare {totalCount} verified {service.name.toLowerCase()} suppliers serving{' '}
              {locationName}. Get instant quotes from local businesses with transparent pricing.
            </p>
          </div>
        </section>

        {/* Results Summary */}
        <section className="bg-white border-b">
          <div className="section py-4">
            <p className="text-gray-600">
              <strong className="text-gray-900">{localVendors.length}</strong> local supplier{localVendors.length !== 1 ? 's' : ''}
              {nationalVendors.length > 0 && (
                <span>
                  {' '}and{' '}
                  <strong className="text-gray-900">{nationalVendors.length}</strong> national
                </span>
              )}
              {localCards.filter((v) => v.showPricing).length > 0 && (
                <span>
                  {' '}&bull;{' '}
                  <strong className="text-green-600">
                    {localCards.filter((v) => v.showPricing).length}
                  </strong>{' '}
                  with verified pricing
                </span>
              )}
            </p>
          </div>
        </section>

        {/* Vendor List */}
        <section className="section py-8">
          {totalCount > 0 ? (
            <>
              {/* Local vendors */}
              {localCards.length > 0 && (
                <div className="mb-8">
                  {nationalCards.length > 0 && (
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Local Suppliers</h2>
                  )}
                  <div className="space-y-4">
                    {localCards.map((vendor) => (
                      <VendorCard key={vendor.id} vendor={vendor} />
                    ))}
                  </div>
                </div>
              )}

              {/* National vendors */}
              {nationalCards.length > 0 && (
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h2 className="text-lg font-bold text-gray-900 mb-2">National Suppliers</h2>
                  <p className="text-sm text-gray-500 mb-4">
                    These suppliers operate nationwide and may serve {locationName}.
                  </p>
                  <div className="space-y-4">
                    {nationalCards.map((vendor) => (
                      <VendorCard key={vendor.id} vendor={vendor} />
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <EmptyState service={service.name} location={locationName} category={category} />
          )}
        </section>

        {/* FAQ Section */}
        <section className="bg-white py-12 mt-8">
          <div className="section max-w-4xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Frequently Asked Questions — {service.name} in {locationName}
            </h2>
            <div className="space-y-6">
              {faqs.map((faq, i) => (
                <div key={i} className="border-b border-gray-200 pb-6 last:border-0">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Vendor Acquisition CTA */}
        <section className="bg-purple-50 py-10">
          <div className="section text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Don&apos;t see your company listed?
            </h2>
            <p className="text-gray-600 mb-4">
              Join {totalCount > 0 ? `${totalCount}+ ` : ''}other {service.name.toLowerCase()} suppliers on TendorAI.
              Create your free listing in under 2 minutes and start appearing in AI-powered buyer searches.
            </p>
            <Link
              href="/for-vendors"
              className="inline-block px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
            >
              List Your Business — Free
            </Link>
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

// FAQ generator
function generateFAQs(serviceName: string, locationName: string, vendorCount: number, categorySlug: string) {
  const categoryTips: Record<string, string[]> = {
    photocopiers: [
      'Check for manufacturer accreditations (e.g. Konica Minolta, Ricoh, Canon authorised dealer)',
      'Compare lease vs purchase options for your print volume',
      'Ask about managed print services that include toner and maintenance',
      'Confirm response times for engineer callouts in your area',
    ],
    telecoms: [
      'Verify the provider supports your preferred system type (cloud VoIP, on-premise, hybrid)',
      'Check if they offer Teams or Zoom integration',
      'Ask about call recording and compliance features if required',
      'Confirm they provide local number porting and ongoing support',
    ],
    cctv: [
      'Look for NSI Gold or SSAIB accreditation for insurance compliance',
      'Check whether they offer remote monitoring and cloud storage',
      'Ask about analytics features like ANPR or people counting',
      'Confirm they handle both installation and ongoing maintenance',
    ],
    it: [
      'Verify their response time SLAs for critical issues',
      'Check if they offer both fully managed and co-managed options',
      'Ask about cybersecurity provisions (endpoint protection, backup, disaster recovery)',
      'Confirm they support your existing infrastructure (Microsoft 365, Google Workspace, etc.)',
    ],
    security: [
      'Check for NSI or SSAIB accreditation',
      'Ask about integrated systems (CCTV + access control + alarms)',
      'Verify monitoring station capabilities for 24/7 response',
      'Confirm maintenance contracts and response times',
    ],
    software: [
      'Ensure the provider offers training and onboarding support',
      'Check integration capabilities with your existing tools',
      'Ask about data migration and implementation timelines',
      'Verify ongoing support and update policies',
    ],
  };

  const tips = categoryTips[categorySlug] || categoryTips['it'] || [];

  return [
    {
      question: `How do I find the best ${serviceName.toLowerCase()} supplier in ${locationName}?`,
      answer: `TendorAI makes it easy to compare verified ${serviceName.toLowerCase()} suppliers serving ${locationName}. Each supplier is AI-vetted with an AI Visibility Score showing how established and active they are. You can compare services, check accreditations, and request quotes from multiple suppliers — all from one page.`,
    },
    {
      question: `How many ${serviceName.toLowerCase()} companies operate in ${locationName}?`,
      answer: `TendorAI currently lists ${vendorCount} verified ${serviceName.toLowerCase()} supplier${vendorCount !== 1 ? 's' : ''} serving the ${locationName} area, including both local businesses and national providers with coverage in ${locationName}.`,
    },
    {
      question: `What should I look for when choosing a ${serviceName.toLowerCase()} supplier in ${locationName}?`,
      answer: `When choosing a ${serviceName.toLowerCase()} supplier in ${locationName}, consider these key factors: ${tips.join('. ')}.`,
    },
    {
      question: `How much does ${serviceName.toLowerCase()} cost in ${locationName}?`,
      answer: `Pricing for ${serviceName.toLowerCase()} in ${locationName} varies depending on your specific requirements, the scale of your operation, and whether you choose a local or national supplier. The best way to get accurate pricing is to submit your requirements through TendorAI and receive tailored quotes from verified suppliers.`,
    },
    {
      question: `Can I get multiple quotes from ${serviceName.toLowerCase()} suppliers in ${locationName}?`,
      answer: `Yes — TendorAI lets you compare quotes from multiple verified suppliers in ${locationName}. Submit your requirements once and receive tailored proposals from suppliers that match your needs, location, and budget. It's completely free for buyers.`,
    },
  ];
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
      <div className="text-gray-400 text-5xl mb-4">&#128269;</div>
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
