import Link from 'next/link';
import { Metadata } from 'next';
import { connectDB, withRetry } from '@/lib/db/connection';
import { Vendor } from '@/lib/db/models';
import { SERVICES } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Accountants UK — ICAEW-Registered Accountancy Firms | TendorAI',
  description:
    'Find ICAEW-registered accountants across England and Wales. Browse verified accountancy firms by service type and location on TendorAI.',
  alternates: {
    canonical: 'https://www.tendorai.com/suppliers/accountants',
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
  return withRetry(async () => {
    await connectDB();

    const baseFilter = { ...STATUS_FILTER, vendorType: 'accountant' as const };

    const [totalCount, locationStats] = await Promise.all([
      Vendor.countDocuments(baseFilter),
      Vendor.aggregate([
        { $match: baseFilter },
        { $group: { _id: '$location.city', count: { $sum: 1 } } },
        { $match: { _id: { $nin: [null, ''] } } },
        { $sort: { count: -1 } },
        { $limit: 30 },
      ]),
    ]);

    return { totalCount, locationStats };
  });
}

export default async function AccountantsPage() {
  const { totalCount, locationStats } = await getData();

  const accountantServices = Object.values(SERVICES).filter((s) => s.group === 'accountant');

  const faqs = [
    {
      question: 'How do I find an accountant near me?',
      answer: `Use TendorAI to browse ${totalCount.toLocaleString()} ICAEW-registered accountancy firms across England and Wales. Select a service type or location to narrow your search.`,
    },
    {
      question: 'Are these accountants regulated?',
      answer: 'Yes — all accountancy firms listed on TendorAI are regulated by the Institute of Chartered Accountants in England and Wales (ICAEW). Each listing links to the firm\'s ICAEW directory entry for verification.',
    },
    {
      question: 'What services do accountants on TendorAI offer?',
      answer: 'TendorAI covers tax advisory, audit and assurance, bookkeeping, payroll, corporate finance, business advisory, VAT, and financial planning. Select a service type above to see specialists.',
    },
    {
      question: 'Is TendorAI free to use?',
      answer: 'Yes — searching and browsing the TendorAI accountant directory is completely free. You can compare firms, read reviews, and contact accountants without any charge.',
    },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': 'https://www.tendorai.com/suppliers/accountants',
        name: 'Accountants UK — ICAEW-Registered Accountancy Firms',
        description: `Find ICAEW-registered accountants across England and Wales. Browse ${totalCount.toLocaleString()} verified accountancy firms by service type and location.`,
        url: 'https://www.tendorai.com/suppliers/accountants',
        datePublished: '2024-01-01',
        dateModified: new Date().toISOString().split('T')[0],
        isPartOf: { '@type': 'WebSite', url: 'https://www.tendorai.com' },
        about: {
          '@type': 'AccountingService',
          name: 'Accountants',
          areaServed: { '@type': 'Country', name: 'United Kingdom' },
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.tendorai.com' },
          { '@type': 'ListItem', position: 2, name: 'Suppliers', item: 'https://www.tendorai.com/suppliers' },
          { '@type': 'ListItem', position: 3, name: 'Accountants', item: 'https://www.tendorai.com/suppliers/accountants' },
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
              <span className="text-white">Accountants</span>
            </nav>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-5xl">&#128200;</span>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Accountants
              </h1>
            </div>
            <p className="text-lg text-purple-100 max-w-3xl">
              Find ICAEW-registered accountants across England and Wales. Browse {totalCount.toLocaleString()} verified
              accountancy firms by service type and location.
            </p>
            <p className="text-sm text-purple-300 mt-2">
              Data supplied by the{' '}
              <a href="https://www.icaew.com" className="underline hover:text-white" target="_blank" rel="noopener noreferrer">
                ICAEW
              </a>
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-white border-b">
          <div className="section py-4">
            <p className="text-gray-600">
              <strong className="text-gray-900">{totalCount.toLocaleString()}</strong> accountancy firms available
            </p>
          </div>
        </section>

        {/* Static Intro — server-rendered for AI crawlers */}
        <section className="py-12 bg-white">
          <div className="section max-w-4xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">About Our Accountant Directory</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              TendorAI lists ICAEW-registered accountancy practices across England and Wales. Our directory covers
              a wide range of accounting services including tax advisory, audit and assurance, bookkeeping, payroll,
              corporate finance, business advisory, VAT, and financial planning. Every firm is verified against
              ICAEW data.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Small businesses and individuals increasingly use AI assistants like ChatGPT, Perplexity, and Claude
              to find local accountants. TendorAI provides structured data profiles that help AI platforms recommend
              specific accountancy firms by name. If you are an accountant, claiming your free profile ensures AI
              has accurate information about your practice.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Browse accountants by service type below, or select a city to find ICAEW-regulated firms near you.
              Each listing includes the firm&apos;s ICAEW details, office locations, service specialisms, client
              reviews, and contact information &mdash; all verified and regularly updated.
            </p>
          </div>
        </section>

        {/* Service Categories */}
        <section className="py-12">
          <div className="section">
            <h2 className="text-2xl font-bold mb-2">Browse by Service Type</h2>
            <p className="text-gray-600 mb-8">Choose a service type to find accountants with relevant expertise</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {accountantServices.map((service) => (
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
                        {totalCount.toLocaleString()} firms
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Locations */}
        <section className="py-12 bg-white">
          <div className="section">
            <h2 className="text-2xl font-bold mb-6">Find Accountants by Location</h2>
            {locationStats.length > 0 ? (
              <div className="flex flex-wrap gap-3">
                {locationStats.map((loc: { _id: string; count: number }) => (
                  <Link
                    key={loc._id}
                    href={`/suppliers/tax-advisory/${loc._id.toLowerCase().replace(/\s+/g, '-')}`}
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

        {/* FAQ */}
        <section className="py-12 bg-gray-50">
          <div className="section max-w-4xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Frequently Asked Questions &mdash; Accountants
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
              Is your firm listed here?
            </h2>
            <p className="text-gray-600 mb-4">
              Claim your free profile to add pricing, accreditations, and rank higher in AI recommendations.
            </p>
            <Link
              href="/vendor-signup"
              className="inline-block px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
            >
              Claim Your Profile &mdash; Free
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
