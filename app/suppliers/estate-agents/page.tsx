import Link from 'next/link';
import { Metadata } from 'next';
import { connectDB } from '@/lib/db/connection';
import { Vendor, VendorProduct } from '@/lib/db/models';
import VendorCard from '@/app/components/VendorCard';
import type { VendorCardData } from '@/app/components/VendorCard';
import { SERVICES, getDisplayTier, calculatePriorityScore, canShowPricing } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Estate Agents UK — Sales, Lettings & Property Management | TendorAI',
  description:
    'Find estate agents across the UK. Compare fees, portal listings, and reviews for residential sales, lettings, property management, and more.',
  alternates: {
    canonical: 'https://www.tendorai.com/suppliers/estate-agents',
  },
};

export const revalidate = 3600;

const STATUS_FILTER = {
  $or: [
    { 'account.status': 'active', 'account.verificationStatus': 'verified' },
    { listingStatus: 'unclaimed' },
  ],
};

async function getData() {
  await connectDB();

  const baseFilter = { ...STATUS_FILTER, vendorType: 'estate-agent' as const };

  const [totalCount, practiceAreaStats, locationStats, vendors] = await Promise.all([
    Vendor.countDocuments(baseFilter),
    Vendor.aggregate([
      { $match: baseFilter },
      { $unwind: '$practiceAreas' },
      { $group: { _id: '$practiceAreas', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]),
    Vendor.aggregate([
      { $match: baseFilter },
      { $group: { _id: '$location.city', count: { $sum: 1 } } },
      { $match: { _id: { $nin: [null, ''] } } },
      { $sort: { count: -1 } },
      { $limit: 30 },
    ]),
    Vendor.find(baseFilter)
      .select({
        company: 1, services: 1, location: 1, performance: 1, businessProfile: 1,
        brands: 1, tier: 1, contactInfo: 1, showPricing: 1, listingStatus: 1,
        'account.loginCount': 1, vendorType: 1, practiceAreas: 1, propertymarkNumber: 1, slug: 1,
      })
      .lean()
      .exec(),
  ]);

  // Get product counts for all vendors
  const vendorIds = vendors.map((v) => v._id);
  const productCounts = await VendorProduct.aggregate([
    { $match: { vendorId: { $in: vendorIds }, isActive: { $ne: false } } },
    { $group: { _id: '$vendorId', count: { $sum: 1 } } },
  ]);
  const productCountMap: Record<string, number> = {};
  productCounts.forEach((p: { _id: { toString(): string }; count: number }) => {
    productCountMap[p._id.toString()] = p.count;
  });

  // Map to VendorCardData and sort by priority
  const vendorCards: VendorCardData[] = vendors
    .map((v) => {
      const vendor = v as Record<string, unknown> & {
        _id: { toString(): string };
        company?: string; services?: string[]; vendorType?: string; practiceAreas?: string[];
        propertymarkNumber?: string; slug?: string;
        location?: { city?: string; region?: string; coverage?: string[]; postcode?: string };
        performance?: { rating?: number; reviewCount?: number };
        businessProfile?: { description?: string; yearsInBusiness?: number; accreditations?: string[] };
        brands?: string[]; tier?: string; contactInfo?: { phone?: string; website?: string };
        listingStatus?: string; account?: { loginCount?: number };
      };
      const displayTier = getDisplayTier(vendor.tier);
      const hasPhone = !!(vendor.contactInfo?.phone);
      const hasRating = (vendor.performance?.rating || 0) > 0;
      const isPaid = displayTier !== 'free';
      const ls = (vendor.listingStatus || 'unclaimed').toLowerCase();
      const isClaimed = ls === 'claimed' || ls === 'verified' || hasPhone || isPaid || hasRating || (vendor.account?.loginCount || 0) > 0;
      const pCount = productCountMap[vendor._id.toString()] || 0;

      return {
        card: {
          id: vendor._id.toString(),
          company: vendor.company || '',
          services: vendor.services || [],
          practiceAreas: vendor.practiceAreas || [],
          location: {
            city: vendor.location?.city,
            region: vendor.location?.region,
            coverage: vendor.location?.coverage || [],
            postcode: vendor.location?.postcode,
          },
          distance: null,
          rating: vendor.performance?.rating || 0,
          reviewCount: vendor.performance?.reviewCount || 0,
          tier: displayTier,
          description: vendor.businessProfile?.description,
          accreditations: vendor.businessProfile?.accreditations || [],
          yearsInBusiness: vendor.businessProfile?.yearsInBusiness,
          brands: vendor.brands || [],
          productCount: pCount,
          website: vendor.contactInfo?.website,
          showPricing: canShowPricing(vendor.tier),
          accountClaimed: isClaimed,
          vendorType: vendor.vendorType,
          propertymarkNumber: vendor.propertymarkNumber,
          slug: vendor.slug,
        } as VendorCardData,
        priorityScore: calculatePriorityScore({
          tier: vendor.tier, company: vendor.company, contactInfo: vendor.contactInfo, email: '',
          businessProfile: vendor.businessProfile, brands: vendor.brands, location: vendor.location,
          hasProducts: pCount > 0,
        }),
      };
    })
    .sort((a, b) => b.priorityScore - a.priorityScore)
    .map((v) => v.card);

  const practiceAreaCountMap: Record<string, number> = {};
  practiceAreaStats.forEach((stat: { _id: string; count: number }) => {
    practiceAreaCountMap[stat._id] = stat.count;
  });

  return { totalCount, practiceAreaCountMap, locationStats, vendorCards };
}

export default async function EstateAgentsPage() {
  const { totalCount, practiceAreaCountMap, locationStats, vendorCards } = await getData();

  const estateAgentServices = Object.values(SERVICES).filter((s) => s.group === 'estate-agent');

  const faqs = [
    {
      question: 'How do I find an estate agent near me?',
      answer: `Use TendorAI to browse ${totalCount.toLocaleString()} estate agents across England and Wales. Select a specialism or location to narrow your search.`,
    },
    {
      question: 'Are these estate agents accredited?',
      answer: 'TendorAI lists estate agents including those registered with Propertymark (NAEA/ARLA). Each listing shows the agent\'s accreditations so you can verify their credentials directly.',
    },
    {
      question: 'What is the difference between sole agency and multi-agency?',
      answer: 'Sole agency means one estate agent markets your property exclusively, typically at a lower fee (1–1.5% + VAT). Multi-agency means multiple agents market it simultaneously, usually at a higher fee (2.5–3% + VAT). TendorAI helps you compare agents and their fee structures.',
    },
    {
      question: 'How much do estate agents charge?',
      answer: 'Fees vary by agency and service. Sales fees are typically 1–3% + VAT of the sale price. Lettings tenant-find fees range from £400–£800 + VAT, and full management is usually 8–15% + VAT of monthly rent. Agents on TendorAI may display their fee structure on their profile.',
    },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        name: 'Estate Agents UK',
        description: 'Find estate agents across the UK.',
        url: 'https://www.tendorai.com/suppliers/estate-agents',
        isPartOf: { '@type': 'WebSite', url: 'https://www.tendorai.com' },
        about: {
          '@type': 'RealEstateAgent',
          name: 'Estate Agents',
          areaServed: { '@type': 'Country', name: 'United Kingdom' },
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.tendorai.com' },
          { '@type': 'ListItem', position: 2, name: 'Suppliers', item: 'https://www.tendorai.com/suppliers' },
          { '@type': 'ListItem', position: 3, name: 'Estate Agents' },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      },
    ],
  };

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
              <span className="text-white">Estate Agents</span>
            </nav>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-5xl">🏡</span>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Estate Agents
              </h1>
            </div>
            <p className="text-lg text-purple-100 max-w-3xl">
              Find estate agents across England and Wales. Compare fees, portal listings,
              and client reviews for {totalCount.toLocaleString()} agencies.
            </p>
            <p className="text-sm text-purple-300 mt-2">
              Data supplied by{' '}
              <a href="https://www.propertymark.co.uk" className="underline hover:text-white" target="_blank" rel="noopener noreferrer">
                Propertymark
              </a>
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-white border-b">
          <div className="section py-4">
            <p className="text-gray-600">
              <strong className="text-gray-900">{totalCount.toLocaleString()}</strong> estate
              agencies available
            </p>
          </div>
        </section>

        {/* Service Categories */}
        <section className="py-12">
          <div className="section">
            <h2 className="text-2xl font-bold mb-2">Browse by Service</h2>
            <p className="text-gray-600 mb-8">Choose a service to find estate agents with relevant expertise</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {estateAgentServices.map((service) => {
                const count = practiceAreaCountMap[service.value] || 0;
                return (
                  <Link
                    key={service.slug}
                    href={`/suppliers/${service.slug}`}
                    className="card-hover p-5 group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-3xl">{service.icon}</div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold mb-0.5 group-hover:text-purple-600 transition-colors">
                          {service.name}
                        </h3>
                        <p className="text-gray-500 text-xs mb-1.5 line-clamp-1">{service.description}</p>
                        <span className="text-sm text-purple-600 font-medium">
                          {count.toLocaleString()} agencies
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Locations */}
        <section className="py-12 bg-white">
          <div className="section">
            <h2 className="text-2xl font-bold mb-6">Find Estate Agents by Location</h2>
            {locationStats.length > 0 ? (
              <div className="flex flex-wrap gap-3">
                {locationStats.map((loc: { _id: string; count: number }) => (
                  <Link
                    key={loc._id}
                    href={`/suppliers/sales/${loc._id.toLowerCase().replace(/\s+/g, '-')}`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border hover:border-purple-300 hover:bg-purple-50 transition-colors"
                  >
                    <span className="font-medium text-gray-700">{loc._id}</span>
                    <span className="text-sm text-purple-600">({loc.count})</span>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">Location data is being populated. Check back soon.</p>
            )}
          </div>
        </section>

        {/* All Estate Agents */}
        <section className="py-12">
          <div className="section">
            <h2 className="text-2xl font-bold mb-2">All Estate Agents</h2>
            <p className="text-gray-600 mb-8">
              {vendorCards.length.toLocaleString()} estate agencies across the UK
            </p>
            {vendorCards.length > 0 ? (
              <div className="space-y-4">
                {vendorCards.map((vendor) => (
                  <VendorCard key={vendor.id} vendor={vendor} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg">
                <div className="text-gray-400 text-5xl mb-4">&#128269;</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  No estate agents found yet
                </h3>
                <p className="text-gray-600">
                  We&apos;re expanding our network. Check back soon.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 bg-gray-50">
          <div className="section max-w-4xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Frequently Asked Questions — Estate Agents
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

        {/* CTA */}
        <section className="bg-purple-50 py-10">
          <div className="section text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Is your agency listed here?
            </h2>
            <p className="text-gray-600 mb-4">
              Claim your free profile to add fees, portal listings, and rank higher in AI recommendations.
            </p>
            <Link
              href="/vendor-signup"
              className="inline-block px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
            >
              Claim Your Profile — Free
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
