import Link from 'next/link';
import { Metadata } from 'next';
import { connectDB } from '@/lib/db/connection';
import { Vendor } from '@/lib/db/models';
import { SERVICES, MAJOR_LOCATIONS, SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Supplier Directory',
  description:
    'Browse our directory of verified office equipment suppliers across the UK. Find copier, telecoms, CCTV, IT, and security suppliers in your area.',
  alternates: {
    canonical: 'https://tendorai.com/suppliers',
  },
};

export const revalidate = 3600; // Revalidate every hour

async function getSupplierStats() {
  await connectDB();

  const [totalCount, categoryStats] = await Promise.all([
    Vendor.countDocuments({
      'account.status': 'active',
      'account.verificationStatus': 'verified',
    }),
    Vendor.aggregate([
      {
        $match: {
          'account.status': 'active',
          'account.verificationStatus': 'verified',
        },
      },
      { $unwind: '$services' },
      {
        $group: {
          _id: '$services',
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]),
  ]);

  const categoryCountMap: Record<string, number> = {};
  categoryStats.forEach((stat: { _id: string; count: number }) => {
    categoryCountMap[stat._id] = stat.count;
  });

  return { totalCount, categoryCountMap };
}

export default async function SuppliersIndexPage() {
  const { totalCount, categoryCountMap } = await getSupplierStats();
  const services = Object.values(SERVICES);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Office Equipment Supplier Directory',
    description: 'Directory of verified office equipment suppliers across the UK',
    numberOfItems: totalCount,
    itemListElement: services.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name: service.name,
        description: service.description,
        url: `https://tendorai.com/suppliers/${service.slug}`,
      },
    })),
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
              <span className="text-white">Suppliers</span>
            </nav>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Supplier Directory
            </h1>
            <p className="text-lg text-purple-100 max-w-3xl">
              Browse {totalCount} verified office equipment suppliers across the UK. Find the right supplier for your business needs.
            </p>
          </div>
        </section>

        {/* Categories */}
        <section className="py-12">
          <div className="section">
            <h2 className="text-2xl font-bold mb-8">Browse by Service</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => {
                const count = categoryCountMap[service.value] || 0;
                return (
                  <Link
                    key={service.slug}
                    href={`/suppliers/${service.slug}`}
                    className="card-hover p-6 group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">{service.icon}</div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-1 group-hover:text-purple-600 transition-colors">
                          {service.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2">{service.description}</p>
                        <span className="text-sm text-purple-600 font-medium">
                          {count} suppliers →
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
            <h2 className="text-2xl font-bold mb-8">Browse by Location</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {MAJOR_LOCATIONS.map((location) => (
                <Link
                  key={location}
                  href={`/suppliers/photocopiers/${location.toLowerCase().replace(/\s+/g, '-')}`}
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

        {/* CTA */}
        <section className="py-12">
          <div className="section">
            <div className="card p-8 text-center bg-purple-50 border-purple-100">
              <h2 className="text-2xl font-bold mb-4">Can&apos;t find what you&apos;re looking for?</h2>
              <p className="text-gray-600 mb-6">
                Our AI can help match you with the right suppliers based on your specific
                requirements.
              </p>
              <Link href="/" className="btn-primary">
                Get AI Recommendations
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
