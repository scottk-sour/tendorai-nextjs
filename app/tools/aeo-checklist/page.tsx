import { Metadata } from 'next';
import Link from 'next/link';
import AeoChecklistClient from './AeoChecklistClient';

const TITLE = 'AEO Readiness Checklist for UK Solicitors, Accountants & Mortgage Advisers';
const DESCRIPTION =
  'Free AEO checklist for UK professional services firms. Score your AI visibility readiness across directory presence, schema markup, content, and AI citation signals.';
const CANONICAL = 'https://www.tendorai.com/tools/aeo-checklist';

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
    q: 'What is Answer Engine Optimisation (AEO)?',
    a: 'AEO is the practice of structuring a business\u2019s online presence so that AI assistants can find, understand, and recommend it. Unlike traditional SEO, which targets search engine rankings, AEO focuses on appearing in AI-generated answers \u2014 the responses ChatGPT, Perplexity, Claude, and Google AI Overviews give when someone asks a question like \u201cfind me a solicitor in Bristol.\u201d',
  },
  {
    q: 'Why does AEO matter for solicitors and accountants?',
    a: 'Over 200 million people use ChatGPT monthly. Perplexity handles over 100 million queries per month. When a potential client asks one of these tools to recommend a local solicitor or accountant, firms with no AEO foundations simply do not appear. The firms that do appear are not necessarily the best \u2014 they are the ones the AI can find and trust.',
  },
  {
    q: 'What are the most important AEO signals for a UK professional services firm?',
    a: 'The four most important areas are: directory and entity presence, schema markup on your own website, content that answers the questions AI is asked, and active AI visibility tracking. TendorAI Pro addresses all four.',
  },
  {
    q: 'How is AEO different from SEO?',
    a: 'Traditional SEO optimises for search engine rankings. AEO optimises for AI retrieval \u2014 getting a firm cited or recommended in AI-generated answers. The two overlap but are not the same. A firm can rank well on Google and still be invisible to AI assistants.',
  },
  {
    q: 'How long does it take to improve AI visibility?',
    a: 'Most firms see measurable improvement in AI citation frequency within 60 to 90 days of implementing the core AEO foundations \u2014 schema installation, directory consistency, and targeted content. TendorAI tracks this automatically for Pro subscribers.',
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

export default function AeoChecklistPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-gradient-to-br from-[#1B4F72] via-[#1a3d5c] to-[#2d1b4e] text-white py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <nav className="text-sm mb-6 text-blue-200">
              <Link href="/" className="hover:text-white">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-white">AEO Checklist</span>
            </nav>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight text-white">
              AEO Readiness Checklist for UK Professional Services Firms
            </h1>
            <p className="text-lg text-gray-200 leading-relaxed max-w-2xl mx-auto">
              Answer Engine Optimisation (AEO) is the process of making a business visible in AI-generated answers from tools like ChatGPT, Perplexity, and Google AI Overviews. This checklist helps UK solicitors, accountants, mortgage advisers, and estate agents assess their current AI visibility across four key areas.
            </p>
          </div>
        </section>

        {/* Checklist */}
        <section className="py-12 md:py-16">
          <div className="max-w-2xl mx-auto px-4 sm:px-6">
            <AeoChecklistClient />
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
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Ready to fix your AI visibility?</h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto">
            TendorAI Pro installs your schema, lists your firm in our AI-optimised directory, and tracks your visibility across ChatGPT, Perplexity, Claude, and Google AI &mdash; all in one platform.
          </p>
          <Link
            href="/for-vendors"
            className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg text-lg"
          >
            Get started with TendorAI Pro
          </Link>
        </section>
      </main>
    </>
  );
}
