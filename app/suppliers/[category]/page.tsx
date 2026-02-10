import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { connectDB } from '@/lib/db/connection';
import { Vendor } from '@/lib/db/models';
import { SERVICES, MAJOR_LOCATIONS, getServiceFromSlug, SERVICE_KEYS } from '@/lib/constants';

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

  const title = `${service.name} Suppliers UK`;
  const description = `Find trusted ${service.name.toLowerCase()} suppliers across the UK. ${service.description}. Compare verified vendors and get instant quotes.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://www.tendorai.com/suppliers/${category}`,
    },
    alternates: {
      canonical: `https://www.tendorai.com/suppliers/${category}`,
    },
  };
}

async function getCategoryData(category: string) {
  await connectDB();

  const serviceName = getServiceFromSlug(category);
  if (!serviceName) return null;

  const [vendors, locationStats] = await Promise.all([
    Vendor.countDocuments({
      'account.status': 'active',
      'account.verificationStatus': 'verified',
      services: serviceName,
    }),
    Vendor.aggregate([
      {
        $match: {
          'account.status': 'active',
          'account.verificationStatus': 'verified',
          services: serviceName,
        },
      },
      { $unwind: '$location.coverage' },
      {
        $group: {
          _id: '$location.coverage',
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 20 },
    ]),
  ]);

  return { vendorCount: vendors, locationStats };
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

  const { vendorCount, locationStats } = data;

  const categoryFaqs = [
    {
      question: `How do I find ${service.name.toLowerCase()} suppliers near me?`,
      answer: `Use TendorAI to browse verified ${service.name.toLowerCase()} suppliers by location. Select your city or town from the list below to see local and national suppliers serving your area, complete with AI visibility scores and verified pricing.`,
    },
    {
      question: `How many ${service.name.toLowerCase()} suppliers are listed on TendorAI?`,
      answer: `TendorAI currently lists ${vendorCount} verified ${service.name.toLowerCase()} suppliers across the UK. New suppliers are added regularly as our network grows.`,
    },
    {
      question: `Is TendorAI free to use for finding ${service.name.toLowerCase()} suppliers?`,
      answer: `Yes — TendorAI is completely free for buyers. You can browse suppliers, compare AI visibility scores, and request quotes without any charge. Suppliers pay for enhanced listings, which means you only see businesses that are actively investing in serving customers.`,
    },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: `${service.name} Suppliers`,
        description: service.description,
        provider: {
          '@type': 'Organization',
          name: 'TendorAI',
          url: 'https://www.tendorai.com',
        },
        areaServed: ['United Kingdom'],
        url: `https://www.tendorai.com/suppliers/${category}`,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.tendorai.com' },
          { '@type': 'ListItem', position: 2, name: 'Suppliers', item: 'https://www.tendorai.com/suppliers' },
          { '@type': 'ListItem', position: 3, name: service.name },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: categoryFaqs.map((faq) => ({
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
              <Link href="/" className="hover:text-white">
                Home
              </Link>
              <span className="mx-2">/</span>
              <Link href="/suppliers" className="hover:text-white">
                Suppliers
              </Link>
              <span className="mx-2">/</span>
              <span className="text-white">{service.name}</span>
            </nav>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-5xl">{service.icon}</span>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                {service.name} Suppliers
              </h1>
            </div>
            <p className="text-lg text-purple-100 max-w-3xl">
              {service.description}. Find {vendorCount} verified suppliers across the UK.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-white border-b">
          <div className="section py-4">
            <p className="text-gray-600">
              <strong className="text-gray-900">{vendorCount}</strong> {service.name.toLowerCase()}{' '}
              suppliers available
            </p>
          </div>
        </section>

        {/* Locations Grid */}
        <section className="py-12">
          <div className="section">
            <h2 className="text-2xl font-bold mb-6">
              Find {service.name} Suppliers by Location
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
            <h2 className="text-2xl font-bold mb-6">Other Service Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.values(SERVICES)
                .filter((s) => s.slug !== category)
                .slice(0, 3)
                .map((otherService) => (
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
                        <p className="text-sm text-gray-600 line-clamp-1">
                          {otherService.description}
                        </p>
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
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Are you a {service.name.toLowerCase()} supplier?
            </h2>
            <p className="text-gray-600 mb-4">
              List your business on TendorAI for free and start appearing in AI-powered buyer searches.
              Paid plans unlock enhanced visibility and lead generation.
            </p>
            <Link
              href="/for-vendors"
              className="inline-block px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
            >
              List Your Business — Free
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
