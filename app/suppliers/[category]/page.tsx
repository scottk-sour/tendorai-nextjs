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
  const description = `Find trusted ${service.name.toLowerCase()} suppliers across Wales and South West England. ${service.description}. Compare verified vendors and get instant quotes.`;

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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${service.name} Suppliers`,
    description: service.description,
    provider: {
      '@type': 'Organization',
      name: 'TendorAI',
    },
    areaServed: ['Wales', 'South West England'],
    url: `https://www.tendorai.com/suppliers/${category}`,
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
              {service.description}. Find {vendorCount} verified suppliers across Wales and South
              West England.
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
      </main>
    </>
  );
}
