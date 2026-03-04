import Link from 'next/link';
import { Metadata } from 'next';
import { connectDB, withRetry } from '@/lib/db/connection';
import { Vendor } from '@/lib/db/models';
import { SERVICES } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Solicitors UK — SRA-Registered Law Firms | TendorAI',
  description:
    'Find SRA-registered solicitors across England and Wales. Browse over 10,000 verified law firms by practice area and location on TendorAI.',
  alternates: {
    canonical: 'https://www.tendorai.com/suppliers/solicitors',
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

    const baseFilter = { ...STATUS_FILTER, vendorType: 'solicitor' as const };

    const [totalCount, practiceAreaStats, locationStats] = await Promise.all([
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
    ]);

    const practiceAreaCountMap: Record<string, number> = {};
    practiceAreaStats.forEach((stat: { _id: string; count: number }) => {
      practiceAreaCountMap[stat._id] = stat.count;
    });

    return { totalCount, practiceAreaCountMap, locationStats };
  });
}

export default async function SolicitorsPage() {
  const { totalCount, practiceAreaCountMap, locationStats } = await getData();

  const solicitorServices = Object.values(SERVICES).filter((s) => s.group === 'solicitor');

  const faqs = [
    {
      question: 'How do I find a solicitor near me?',
      answer: `Use TendorAI to browse ${totalCount.toLocaleString()} SRA-registered solicitor firms across England and Wales. Select a practice area or location to narrow your search.`,
    },
    {
      question: 'Are these solicitors regulated?',
      answer: 'Yes — all solicitor firms listed on TendorAI are authorised and regulated by the Solicitors Regulation Authority (SRA). Each listing links to the firm\'s SRA register entry for verification.',
    },
    {
      question: 'What practice areas are covered?',
      answer: 'TendorAI covers conveyancing, family law, criminal law, commercial law, employment law, wills and probate, immigration, and personal injury. Select a practice area above to see specialists.',
    },
    {
      question: 'Is TendorAI free to use?',
      answer: 'Yes — searching and browsing the TendorAI solicitor directory is completely free. You can compare firms, read reviews, and contact solicitors without any charge.',
    },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': 'https://www.tendorai.com/suppliers/solicitors',
        name: 'Solicitors UK — SRA-Registered Law Firms',
        description: `Find SRA-registered solicitors across England and Wales. Browse over ${totalCount.toLocaleString()} verified law firms by practice area and location.`,
        url: 'https://www.tendorai.com/suppliers/solicitors',
        datePublished: '2024-01-01',
        dateModified: new Date().toISOString().split('T')[0],
        isPartOf: { '@type': 'WebSite', url: 'https://www.tendorai.com' },
        about: {
          '@type': 'LegalService',
          name: 'Solicitors',
          areaServed: { '@type': 'Country', name: 'United Kingdom' },
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.tendorai.com' },
          { '@type': 'ListItem', position: 2, name: 'Suppliers', item: 'https://www.tendorai.com/suppliers' },
          { '@type': 'ListItem', position: 3, name: 'Solicitors', item: 'https://www.tendorai.com/suppliers/solicitors' },
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
              <span className="text-white">Solicitors</span>
            </nav>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-5xl">&#9878;&#65039;</span>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Solicitors
              </h1>
            </div>
            <p className="text-lg text-purple-100 max-w-3xl">
              Find SRA-registered solicitors across England and Wales. Browse {totalCount.toLocaleString()} verified
              law firms by practice area and location.
            </p>
            <p className="text-sm text-purple-300 mt-2">
              Data supplied by the{' '}
              <a href="https://www.sra.org.uk" className="underline hover:text-white" target="_blank" rel="noopener noreferrer">
                SRA
              </a>
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-white border-b">
          <div className="section py-4">
            <p className="text-gray-600">
              <strong className="text-gray-900">{totalCount.toLocaleString()}</strong> solicitor firms available
            </p>
          </div>
        </section>

        {/* Static Intro — server-rendered for AI crawlers */}
        <section className="py-12 bg-white">
          <div className="section max-w-4xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">About Our Solicitor Directory</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              TendorAI lists over 10,000 SRA-registered solicitor firms across England and Wales. Every firm in our
              directory is verified against the Solicitors Regulation Authority register, covering practice areas
              including conveyancing, family law, criminal law, commercial law, employment law, wills and probate,
              immigration, and personal injury.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              AI platforms like ChatGPT, Perplexity, and Claude are changing how people find legal services. Instead
              of scrolling through search results, users ask AI to recommend a solicitor by name. TendorAI provides
              structured data profiles that help AI platforms recommend your firm ahead of competitors. If you are a
              solicitor, claiming your free profile is the first step to AI visibility.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Browse solicitors by practice area below, or select a city to find SRA-regulated firms near you. Each
              listing includes the firm&apos;s SRA number, office locations, practice areas, client reviews, and
              contact details &mdash; all verified and kept up to date.
            </p>
          </div>
        </section>

        {/* Practice Areas */}
        <section className="py-12">
          <div className="section">
            <h2 className="text-2xl font-bold mb-2">Browse by Practice Area</h2>
            <p className="text-gray-600 mb-8">Choose a practice area to find solicitors with relevant expertise</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {solicitorServices.map((service) => {
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

        {/* Locations */}
        <section className="py-12 bg-white">
          <div className="section">
            <h2 className="text-2xl font-bold mb-6">Find Solicitors by Location</h2>
            {locationStats.length > 0 ? (
              <div className="flex flex-wrap gap-3">
                {locationStats.map((loc: { _id: string; count: number }) => (
                  <Link
                    key={loc._id}
                    href={`/suppliers/conveyancing/${loc._id.toLowerCase().replace(/\s+/g, '-')}`}
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
              Frequently Asked Questions &mdash; Solicitors
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
