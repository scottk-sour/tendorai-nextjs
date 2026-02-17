import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { connectDB } from '@/lib/db/connection';
import { Vendor } from '@/lib/db/models';
import {
  SERVICES,
  MAJOR_LOCATIONS,
  SERVICE_KEYS,
  isSolicitorCategory,
  getPracticeAreaFromSlug,
  getServiceFromSlug,
} from '@/lib/constants';

interface PageProps {
  params: Promise<{ category: string }>;
}

export const revalidate = 3600;

export async function generateStaticParams() {
  return SERVICE_KEYS.map((category) => ({ category }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const service = SERVICES[category as keyof typeof SERVICES];

  if (!service) {
    return { title: 'Category Not Found' };
  }

  const isSolicitor = service.group === 'solicitor';
  const title = isSolicitor
    ? `${service.name} Solicitors UK | TendorAI`
    : `${service.name} Suppliers UK | TendorAI`;
  const description = isSolicitor
    ? `Find verified ${service.name.toLowerCase()} solicitors across the UK. SRA-regulated firms with reviews, accreditations, and pricing on TendorAI.`
    : `Find trusted ${service.name.toLowerCase()} suppliers across the UK. ${service.description}. Compare vendors and get instant quotes.`;

  return {
    title,
    description,
    openGraph: { title, description, url: `https://www.tendorai.com/suppliers/${category}` },
    alternates: { canonical: `https://www.tendorai.com/suppliers/${category}` },
  };
}

async function getCategoryData(category: string) {
  await connectDB();

  const service = SERVICES[category as keyof typeof SERVICES];
  if (!service) return null;

  const isSolicitor = service.group === 'solicitor';

  const statusFilter = {
    $or: [
      { 'account.status': 'active', 'account.verificationStatus': 'verified' },
      { listingStatus: 'unclaimed' },
    ],
  };

  let vendorFilter;
  if (isSolicitor) {
    const practiceArea = getPracticeAreaFromSlug(category);
    if (!practiceArea) return null;
    vendorFilter = { ...statusFilter, vendorType: 'solicitor', practiceAreas: practiceArea };
  } else {
    const serviceName = getServiceFromSlug(category);
    if (!serviceName) return null;
    vendorFilter = { ...statusFilter, services: serviceName };
  }

  const [vendorCount, locationStats] = await Promise.all([
    Vendor.countDocuments(vendorFilter),
    // For solicitors, group by city; for equipment, group by coverage
    isSolicitor
      ? Vendor.aggregate([
          { $match: vendorFilter },
          { $group: { _id: '$location.city', count: { $sum: 1 } } },
          { $match: { _id: { $nin: [null, ''] } } },
          { $sort: { count: -1 } },
          { $limit: 30 },
        ])
      : Vendor.aggregate([
          { $match: vendorFilter },
          { $unwind: '$location.coverage' },
          { $group: { _id: '$location.coverage', count: { $sum: 1 } } },
          { $sort: { count: -1 } },
          { $limit: 20 },
        ]),
  ]);

  return { vendorCount, locationStats, isSolicitor };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const service = SERVICES[category as keyof typeof SERVICES];

  if (!service) {
    notFound();
  }

  const data = await getCategoryData(category);
  if (!data) {
    notFound();
  }

  const { vendorCount, locationStats, isSolicitor } = data;
  const suffix = isSolicitor ? 'Solicitors' : 'Suppliers';

  const categoryFaqs = isSolicitor
    ? [
        {
          question: `How do I find ${service.name.toLowerCase()} solicitors near me?`,
          answer: `Use TendorAI to browse ${service.name.toLowerCase()} solicitors by location. Select your city from the list below to see SRA-regulated firms in your area.`,
        },
        {
          question: `How many ${service.name.toLowerCase()} solicitors are listed on TendorAI?`,
          answer: `TendorAI currently lists ${vendorCount.toLocaleString()} ${service.name.toLowerCase()} solicitor firms across England and Wales, sourced from the SRA register.`,
        },
        {
          question: `Are these solicitors regulated?`,
          answer: `Yes — all solicitor firms listed on TendorAI are authorised and regulated by the Solicitors Regulation Authority (SRA). Each listing links to the firm's SRA register entry for verification.`,
        },
      ]
    : [
        {
          question: `How do I find ${service.name.toLowerCase()} suppliers near me?`,
          answer: `Use TendorAI to browse ${service.name.toLowerCase()} suppliers by location. Select your city or town from the list below to see local and national suppliers serving your area.`,
        },
        {
          question: `How many ${service.name.toLowerCase()} suppliers are listed on TendorAI?`,
          answer: `TendorAI currently lists ${vendorCount} ${service.name.toLowerCase()} suppliers across the UK. New suppliers are added regularly as our network grows.`,
        },
        {
          question: `Is TendorAI free to use for finding ${service.name.toLowerCase()} suppliers?`,
          answer: `Yes — TendorAI is completely free for buyers. You can browse suppliers, compare services, and request quotes without any charge.`,
        },
      ];

  const schemaType = isSolicitor ? 'LegalService' : 'Service';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        name: `${service.name} ${suffix} UK`,
        description: `Find verified ${service.name.toLowerCase()} ${suffix.toLowerCase()} across the UK.`,
        url: `https://www.tendorai.com/suppliers/${category}`,
        isPartOf: { '@type': 'WebSite', url: 'https://www.tendorai.com' },
        about: {
          '@type': schemaType,
          name: `${service.name} ${suffix}`,
          description: service.description,
          ...(isSolicitor && { serviceType: service.name }),
          areaServed: { '@type': 'Country', name: 'United Kingdom' },
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.tendorai.com' },
          { '@type': 'ListItem', position: 2, name: 'Suppliers', item: 'https://www.tendorai.com/suppliers' },
          { '@type': 'ListItem', position: 3, name: `${service.name} ${suffix}` },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: categoryFaqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      },
    ],
  };

  // Split services for "Other Categories"
  const otherInGroup = Object.values(SERVICES)
    .filter((s) => s.slug !== category && s.group === service.group)
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
              <span className="text-white">{service.name}</span>
            </nav>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-5xl">{service.icon}</span>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                {service.name} {suffix}
              </h1>
            </div>
            <p className="text-lg text-purple-100 max-w-3xl">
              {service.description}. Browse {vendorCount.toLocaleString()} {suffix.toLowerCase()} across{' '}
              {isSolicitor ? 'England and Wales' : 'the UK'}.
            </p>
            {isSolicitor && (
              <p className="text-sm text-purple-300 mt-2">
                Data supplied by the{' '}
                <a href="https://www.sra.org.uk" className="underline hover:text-white" target="_blank" rel="noopener noreferrer">
                  SRA
                </a>
              </p>
            )}
          </div>
        </section>

        {/* Stats */}
        <section className="bg-white border-b">
          <div className="section py-4">
            <p className="text-gray-600">
              <strong className="text-gray-900">{vendorCount.toLocaleString()}</strong>{' '}
              {service.name.toLowerCase()} {suffix.toLowerCase()} available
            </p>
          </div>
        </section>

        {/* Locations Grid */}
        <section className="py-12">
          <div className="section">
            <h2 className="text-2xl font-bold mb-6">
              Find {service.name} {suffix} by Location
            </h2>

            {/* Popular locations from data */}
            {locationStats.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Popular Locations</h3>
                <div className="flex flex-wrap gap-3">
                  {locationStats.map((loc: { _id: string; count: number }) => (
                    <Link
                      key={loc._id}
                      href={`/suppliers/${category}/${loc._id.toLowerCase().replace(/\s+/g, '-')}`}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border hover:border-purple-300 hover:bg-purple-50 transition-colors"
                    >
                      <span className="font-medium text-gray-700">{loc._id}</span>
                      <span className="text-sm text-purple-600">({loc.count})</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* All major locations */}
            {!isSolicitor && (
              <>
                <h3 className="text-lg font-semibold text-gray-700 mb-4">All Locations</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {MAJOR_LOCATIONS.map((location) => (
                    <Link
                      key={location}
                      href={`/suppliers/${category}/${location.toLowerCase().replace(/\s+/g, '-')}`}
                      className="card-hover p-4 text-center group"
                    >
                      <span className="text-gray-700 group-hover:text-purple-600 transition-colors font-medium">
                        {location}
                      </span>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 bg-gray-50">
          <div className="section max-w-4xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Frequently Asked Questions — {service.name}
            </h2>
            <div className="space-y-6">
              {categoryFaqs.map((faq, i) => (
                <div key={i} className="border-b border-gray-200 pb-6 last:border-0">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Categories */}
        <section className="py-12 bg-white">
          <div className="section">
            <h2 className="text-2xl font-bold mb-6">
              Other {isSolicitor ? 'Practice Areas' : 'Service Categories'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {otherInGroup.map((otherService) => (
                <Link
                  key={otherService.slug}
                  href={`/suppliers/${otherService.slug}`}
                  className="card-hover p-6 group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{otherService.icon}</span>
                    <div>
                      <h3 className="font-semibold group-hover:text-purple-600 transition-colors">
                        {otherService.name}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-1">{otherService.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Vendor Acquisition CTA */}
        <section className="bg-purple-50 py-10">
          <div className="section text-center">
            {isSolicitor ? (
              <>
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  Is your firm listed here?
                </h2>
                <p className="text-gray-600 mb-4">
                  Claim your free profile to add pricing, accreditations, and rank higher in AI recommendations.
                </p>
                <Link
                  href="/vendor-signup"
                  className="inline-block px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Claim Your Profile — Free
                </Link>
              </>
            ) : (
              <>
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  Are you a {service.name.toLowerCase()} supplier?
                </h2>
                <p className="text-gray-600 mb-4">
                  List your business on TendorAI for free and start appearing in AI-powered buyer searches.
                </p>
                <Link
                  href="/for-vendors"
                  className="inline-block px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
                >
                  List Your Business — Free
                </Link>
              </>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
