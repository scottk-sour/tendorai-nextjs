import { Metadata } from 'next';
import Link from 'next/link';
import SchemaCheckerClient from './SchemaCheckerClient';

const TITLE = 'Schema.org Checker for UK Solicitors, Accountants & Mortgage Advisers';
const DESCRIPTION =
  'Free tool to check if your professional services firm has the Schema.org structured data AI needs to recommend you. See which schema types are present and which are missing.';
const CANONICAL = 'https://www.tendorai.com/tools/schema-checker';

export const metadata: Metadata = {
  title: `${TITLE} | TendorAI`,
  description: DESCRIPTION,
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: CANONICAL,
    type: 'website',
    siteName: 'TendorAI',
    images: [{ url: '/logo.png', width: 873, height: 873 }],
  },
  twitter: { card: 'summary', title: TITLE, description: DESCRIPTION },
};

const faqs = [
  {
    q: 'What is Schema.org structured data?',
    a: 'Schema.org is a shared vocabulary of structured data types used by Google, Bing, and AI assistants to understand web pages. When a firm adds schema markup to their website, it tells AI systems exactly what the business is, what services it offers, and where it operates \u2014 in a format machines can read reliably.',
  },
  {
    q: 'Why does schema matter for AI visibility?',
    a: 'AI assistants like ChatGPT, Perplexity, and Google\u2019s AI Overviews build their answers from sources they can understand and trust. Firms without schema markup are harder for AI to classify, which means they are less likely to appear when a potential client asks \u201cfind me a solicitor in Cardiff\u201d or \u201cbest accountant for a small business in Manchester.\u201d',
  },
  {
    q: 'Which schema types do UK professional services firms need?',
    a: 'The most important types are: LegalService (for solicitors), AccountingService (for accountants), FinancialService (for mortgage advisers), and LocalBusiness (for all firms). Supporting types include FAQPage, BreadcrumbList, and Organization. TendorAI Pro installs and maintains all of these automatically.',
  },
  {
    q: 'What does it mean if my site has no schema?',
    a: 'It means AI tools and search engines are guessing what your firm does based on your page text alone. This makes it significantly harder to appear in AI-generated recommendations, local search results, and Google AI Overviews.',
  },
  {
    q: 'How do I fix missing schema on my website?',
    a: 'You can add schema manually by inserting JSON-LD code into your website\u2019s header \u2014 or use TendorAI Pro, which installs and auto-syncs the correct schema for your firm type automatically. No developer needed.',
  },
];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: { '@type': 'Answer', text: faq.a },
  })),
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.tendorai.com' },
    { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.tendorai.com/tools' },
    { '@type': 'ListItem', position: 3, name: 'Schema Checker', item: CANONICAL },
  ],
};

export default function SchemaCheckerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-gradient-to-br from-[#1B4F72] via-[#1a3d5c] to-[#2d1b4e] text-white py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <nav className="text-sm mb-6 text-blue-200">
              <Link href="/" className="hover:text-white">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-white">Schema Checker</span>
            </nav>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight text-white">
              Schema.org Checker for UK Professional Services Firms
            </h1>
            <p className="text-lg text-gray-200 leading-relaxed max-w-2xl mx-auto">
              Schema.org structured data tells AI assistants and search engines what a business does, where it is, and whether it can be trusted. Without it, AI tools cannot reliably recommend a firm when potential clients ask for a solicitor, accountant, or mortgage adviser.
            </p>
          </div>
        </section>

        {/* Tool */}
        <section className="py-12 md:py-16">
          <div className="max-w-2xl mx-auto px-4 sm:px-6">
            <SchemaCheckerClient />
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-gray-50 py-12 md:py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <details key={i} className="group bg-white border border-gray-200 rounded-lg">
                  <summary className="flex items-center justify-between cursor-pointer p-5 text-left">
                    <h3 className="font-medium text-gray-900 pr-4">{faq.q}</h3>
                    <svg className="w-5 h-5 text-gray-400 shrink-0 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-5 pb-5 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">{faq.a}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="bg-gradient-to-br from-[#1B4F72] to-[#2d1b4e] text-white rounded-2xl max-w-4xl mx-auto p-8 md:p-12 text-center mb-16 mx-4 sm:mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Get schema installed automatically</h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto">
            TendorAI Pro installs the correct Schema.org markup for your firm type and keeps it in sync with your profile &mdash; no developer required.
          </p>
          <Link
            href="/for-vendors"
            className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg text-lg"
          >
            See how TendorAI Pro works
          </Link>
        </section>
      </main>
    </>
  );
}
