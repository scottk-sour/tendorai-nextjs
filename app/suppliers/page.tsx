import Link from 'next/link';
import { Metadata } from 'next';
import { connectDB } from '@/lib/db/connection';
import { Vendor } from '@/lib/db/models';
import { SERVICES, MAJOR_LOCATIONS, SITE_CONFIG } from '@/lib/constants';
import VendorSearchBar from '@/app/components/VendorSearchBar';

export const metadata: Metadata = {
  title: 'Supplier Directory — Solicitors, Accountants & Office Equipment | TendorAI',
  description:
    'Browse verified UK suppliers on TendorAI. Find solicitors, accountants, and office equipment dealers including photocopiers, telecoms, CCTV, and IT services.',
  alternates: {
    canonical: 'https://www.tendorai.com/suppliers',
  },
};

export const revalidate = 3600;

async function getSupplierStats() {
  await connectDB();

  const statusFilter = {
    $or: [
      { 'account.status': 'active', 'account.verificationStatus': 'verified' },
      { listingStatus: 'unclaimed' },
    ],
  };

  const [totalCount, categoryStats, solicitorStats, accountantTotal] = await Promise.all([
    Vendor.countDocuments(statusFilter),
    Vendor.aggregate([
      { $match: statusFilter },
      { $unwind: '$services' },
      { $group: { _id: '$services', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]),
    // Get solicitor practice area counts
    Vendor.aggregate([
      { $match: { ...statusFilter, vendorType: 'solicitor' } },
      { $unwind: '$practiceAreas' },
      { $group: { _id: '$practiceAreas', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]),
    // Get total accountant count (practiceAreas not populated yet, so count all)
    Vendor.countDocuments({ ...statusFilter, vendorType: 'accountant' }),
  ]);

  const categoryCountMap: Record<string, number> = {};
  categoryStats.forEach((stat: { _id: string; count: number }) => {
    categoryCountMap[stat._id] = stat.count;
  });
  solicitorStats.forEach((stat: { _id: string; count: number }) => {
    categoryCountMap[stat._id] = stat.count;
  });
  // All accountant categories share the same pool until practiceAreas is populated
  const accountantServiceValues = [
    'Tax Advisory', 'Audit & Assurance', 'Bookkeeping', 'Payroll',
    'Corporate Finance', 'Business Advisory', 'VAT', 'Financial Planning',
  ];
  accountantServiceValues.forEach((val) => {
    categoryCountMap[val] = accountantTotal;
  });

  return { totalCount, categoryCountMap };
}

export default async function SuppliersIndexPage() {
  const { totalCount, categoryCountMap } = await getSupplierStats();

  const officeEquipment = Object.values(SERVICES).filter((s) => s.group === 'office-equipment');
  const solicitorCategories = Object.values(SERVICES).filter((s) => s.group === 'solicitor');
  const accountantCategories = Object.values(SERVICES).filter((s) => s.group === 'accountant');

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'UK Supplier Directory — Solicitors, Accountants & Office Equipment',
    description: 'Directory of verified UK suppliers including solicitors, accountants, and office equipment dealers',
    numberOfItems: totalCount,
    itemListElement: Object.values(SERVICES).map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': service.group === 'solicitor' ? 'LegalService' : service.group === 'accountant' ? 'AccountingService' : 'Service',
        name: service.name,
        description: service.description,
        url: `https://www.tendorai.com/suppliers/${service.slug}`,
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
              Browse {totalCount.toLocaleString()} verified suppliers across the UK. Find solicitors,
              accountants, or office equipment dealers by service type.
            </p>
            <VendorSearchBar />
          </div>
        </section>

        {/* Legal Services */}
        <section className="py-12">
          <div className="section">
            <h2 className="text-2xl font-bold mb-2">Legal Services</h2>
            <p className="text-gray-600 mb-8">SRA-regulated solicitor firms across England and Wales</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {solicitorCategories.map((service) => {
                const count = categoryCountMap[service.value] || 0;
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
                          {count.toLocaleString()} firms
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Accounting Services */}
        <section className="py-12 bg-white">
          <div className="section">
            <h2 className="text-2xl font-bold mb-2">Accounting Services</h2>
            <p className="text-gray-600 mb-8">ICAEW-regulated accountancy firms across England and Wales</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {accountantCategories.map((service) => {
                const count = categoryCountMap[service.value] || 0;
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
                          {count.toLocaleString()} firms
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Office Equipment */}
        <section className="py-12">
          <div className="section">
            <h2 className="text-2xl font-bold mb-2">Office Equipment</h2>
            <p className="text-gray-600 mb-8">Photocopiers, telecoms, CCTV, IT, and more</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {officeEquipment.map((service) => {
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
                          {count.toLocaleString()} suppliers
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
        <section className="py-12">
          <div className="section">
            <h2 className="text-2xl font-bold mb-8">Browse by Location</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {MAJOR_LOCATIONS.map((location) => (
                <Link
                  key={location}
                  href={`/suppliers/conveyancing/${location.toLowerCase().replace(/\s+/g, '-')}`}
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
        <section className="py-12 bg-white">
          <div className="section">
            <div className="card p-8 text-center bg-purple-50 border-purple-100">
              <h2 className="text-2xl font-bold mb-4">Check your AI visibility for free</h2>
              <p className="text-gray-600 mb-6">
                See how AI assistants like ChatGPT and Perplexity describe your business — and
                who they recommend instead.
              </p>
              <Link href="/aeo-report" className="btn-primary">
                Get Free AI Visibility Report
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
