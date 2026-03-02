import { Metadata } from 'next';
import Link from 'next/link';

const TITLE = 'How to Get Your Law Firm Visible to AI Assistants (2026 Guide)';
const DESCRIPTION =
  'Step-by-step guide to getting your law firm recommended by ChatGPT, Perplexity and Claude. Covers Google Business Profile, schema markup, SRA listing, reviews and FAQ content.';
const CANONICAL =
  'https://www.tendorai.com/blog/how-to-get-your-law-firm-visible-to-ai-assistants';
const PUBLISHED = '2026-03-01';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: 'article',
    publishedTime: PUBLISHED,
    authors: ['TendorAI'],
    url: CANONICAL,
    siteName: 'TendorAI',
    images: [{ url: '/logo.png', width: 873, height: 873 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
};

const faqs = [
  {
    q: 'How do I get my law firm recommended by ChatGPT?',
    a: 'You need structured data AI can read: your SRA number, practice areas, office locations, and specialisms. TendorAI creates this data and installs it on your website.',
  },
  {
    q: 'Does my SRA listing affect AI visibility?',
    a: 'Yes. AI platforms like Perplexity and ChatGPT cross-reference the SRA Solicitors Register. Keeping your SRA listing accurate and complete helps AI verify and recommend your firm.',
  },
  {
    q: 'How long does it take for a solicitor to appear in AI recommendations?',
    a: 'Most firms see improvements in 2-4 weeks after setting up structured data profiles. AI platforms update continuously, so the sooner you start, the sooner you appear.',
  },
  {
    q: "What's the best structured data for law firms?",
    a: 'LocalBusiness and LegalService Schema.org types with practice areas, office addresses, SRA numbers, and review data. TendorAI handles this automatically for Pro plan subscribers.',
  },
  {
    q: 'Can small law firms compete with large firms in AI recommendations?',
    a: "Absolutely. AI doesn't rank by firm size — it ranks by data quality. A small firm with complete structured data will appear above a large firm with poor data.",
  },
];

const steps = [
  {
    number: 1,
    title: 'Claim and Complete Your Google Business Profile',
    content:
      'Your Google Business Profile (GBP) is one of the first data sources AI assistants check when recommending local businesses. If you have not claimed yours, do so immediately at business.google.com. Once claimed, complete every field: primary category (Solicitor), secondary categories (e.g. Conveyancing Service, Immigration Attorney), a detailed business description that includes your key practice areas and locations, office photos, opening hours, phone number, and website URL. Add all your office locations if you have more than one. AI tools like Gemini and Google AI Overviews pull directly from GBP data, so a half-finished profile means half the visibility. Make sure your firm name on GBP matches your SRA register name exactly \u2014 inconsistencies between platforms reduce AI confidence in your data.',
  },
  {
    number: 2,
    title: 'Add LegalService Schema Markup to Your Website',
    content:
      'Schema.org markup is structured code added to your website that tells AI exactly what your firm does. For law firms, the most important schema type is LegalService. Your markup should include your firm name, SRA number, practice areas (conveyancing, family law, commercial litigation, immigration, employment, wills and probate), office addresses with postcodes, opening hours, aggregate review data, and a sameAs property linking to your SRA register entry and other authoritative profiles. This markup is invisible to visitors \u2014 it sits in your page code \u2014 but it is the single most important signal for AI platforms. Without it, AI tools have to guess what your firm does based on unstructured text, and they often guess wrong or skip you entirely. If you do not have a developer, TendorAI Pro installs this markup on your website automatically as part of the subscription.',
  },
  {
    number: 3,
    title: 'Audit Your NAP Consistency Across SRA, Google, and Directories',
    content:
      'NAP stands for Name, Address, and Phone number. AI tools cross-reference your business details across multiple sources \u2014 your website, Google Business Profile, SRA Solicitors Register, directories, social media profiles, and review platforms. If your firm name is \u201cSmith & Jones Solicitors\u201d on your website but \u201cSmith and Jones Solicitors LLP\u201d on Google and \u201cS&J Legal\u201d on LinkedIn, AI tools cannot confidently match these as the same entity. Audit every platform where your firm appears and ensure the name, address format, and phone number are identical. Check your SRA listing, Google Business Profile, ReviewSolicitors, Law Society Find a Solicitor, Trustpilot, and any local directories. Even small differences such as \u201cSt.\u201d versus \u201cStreet\u201d or a missing postcode can cause problems. Inconsistent NAP data is one of the most common reasons law firms are invisible to AI assistants.',
  },
  {
    number: 4,
    title: 'Claim Your TendorAI Profile',
    content:
      'TendorAI creates AI-readable structured data profiles specifically for UK professional services firms. Claim your free profile and fill in every detail: your SRA number, practice areas, specialisms, office locations, fee ranges, and client types. Unlike a standard website, which AI has to interpret from unstructured text, a TendorAI profile presents your firm\u2019s data in a format AI tools are built to consume. TendorAI pulls directly from SRA regulatory data, so your profile starts with verified information that AI platforms already trust. Include your client sectors (individuals, SMEs, corporates), languages spoken, and any accreditations such as Lexcel or Conveyancing Quality Scheme. The free profile gets you listed; the paid plans add schema markup installation on your website and weekly AI mention tracking so you can monitor which platforms recommend you.',
  },
  {
    number: 5,
    title: 'Publish FAQ Content That Answers Real Client Questions',
    content:
      'AI assistants answer questions \u2014 so your website needs to contain the answers. Write FAQ pages that match how real people phrase queries to AI tools. Instead of generic headings like \u201cOur Services\u201d, write specific questions your clients actually ask: \u201cWhat does a conveyancing solicitor do?\u201d, \u201cHow much does a divorce solicitor cost in 2026?\u201d, \u201cDo I need a solicitor to buy a house?\u201d, \u201cHow long does probate take in England and Wales?\u201d. Mark up your FAQs with FAQPage schema so AI tools can parse them directly. This content serves double duty: it helps your traditional SEO and feeds directly into AI-generated answers. Aim for at least one FAQ page per practice area, with five to ten questions each. Write in plain English that a member of the public would understand \u2014 not legal jargon.',
  },
  {
    number: 6,
    title: 'Add Pricing or Fee Structure Information to Your Service Pages',
    content:
      'AI platforms strongly favour businesses that are transparent about pricing. When someone asks ChatGPT \u201cHow much does conveyancing cost in Bristol?\u201d, AI looks for firms that publish fee information. Add clear pricing or fee ranges to each practice area page on your website: fixed fees for conveyancing, hourly rates for litigation, estimated costs for divorce proceedings, and disbursement breakdowns where relevant. You do not need to publish exact figures if that does not suit your practice \u2014 fee ranges and \u201cstarting from\u201d prices are effective. Include pricing in your Schema.org markup using the priceRange property. SRA transparency rules already require solicitors to publish pricing for certain services (conveyancing, employment tribunals, immigration, probate, motoring offences, debt recovery), so this aligns with your regulatory obligations. Firms that publish fees are consistently recommended more often by AI assistants than those that require a phone call to discuss costs.',
  },
];

function FAQSection() {
  return (
    <div className="space-y-4">
      {faqs.map((faq, i) => (
        <details
          key={i}
          className="group bg-white border border-gray-200 rounded-lg"
        >
          <summary className="flex items-center justify-between cursor-pointer p-5 text-left">
            <h3 className="font-medium text-gray-900 pr-4">{faq.q}</h3>
            <svg
              className="w-5 h-5 text-gray-400 shrink-0 transition-transform group-open:rotate-180"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </summary>
          <div className="px-5 pb-5 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
            {faq.a}
          </div>
        </details>
      ))}
    </div>
  );
}

export default function HowToGetYourLawFirmVisiblePage() {
  const today = new Date().toISOString().split('T')[0];

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: TITLE,
    description: DESCRIPTION,
    author: {
      '@type': 'Organization',
      name: 'TendorAI',
      url: 'https://www.tendorai.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'TendorAI',
      url: 'https://www.tendorai.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.tendorai.com/logo.png',
      },
    },
    datePublished: PUBLISHED,
    dateModified: today,
    url: CANONICAL,
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-gradient-to-br from-purple-700 via-purple-600 to-indigo-600 text-white py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <nav className="text-sm mb-6 text-purple-200">
              <Link href="/" className="hover:text-white">
                Home
              </Link>
              <span className="mx-2">/</span>
              <Link href="/blog" className="hover:text-white">
                Blog
              </Link>
              <span className="mx-2">/</span>
              <span className="text-white">Law Firm AI Visibility</span>
            </nav>

            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 text-sm font-medium rounded-full bg-white/20 text-white">
                How-To Guide
              </span>
              <span className="text-purple-200">7 min read</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              {TITLE}
            </h1>

            <p className="text-lg text-purple-100 leading-relaxed max-w-3xl">
              {DESCRIPTION}
            </p>

            <div className="mt-6 text-sm text-purple-200">
              Published 1 March 2026
            </div>
          </div>
        </section>

        {/* Article content */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16">
          {/* Opening paragraph */}
          <p className="text-lg text-gray-600 leading-relaxed mb-4">
            AI assistants are the new front door for legal enquiries. When
            someone asks ChatGPT &quot;Who are the best conveyancing solicitors
            near me?&quot; or tells Perplexity &quot;Recommend a family law firm
            in Manchester&quot;, the AI does not show ten blue links. It names
            specific firms. If your law firm is not one of them, you are losing
            instructions to competitors who may be smaller, newer, or less
            experienced — but whose data is better structured.
          </p>

          <p className="text-gray-600 leading-relaxed mb-8">
            The good news: getting visible to AI assistants is not complicated,
            and most law firms have not started yet. This guide walks you through
            the six steps that matter most in 2026. Each one is actionable, and
            several are free.
          </p>

          {/* Steps */}
          <div className="space-y-10">
            {steps.map((step) => (
              <section key={step.number}>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-lg shrink-0 mt-1">
                    {step.number}
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                      {step.title}
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                      {step.content}
                    </p>
                  </div>
                </div>
              </section>
            ))}
          </div>

          {/* Summary */}
          <div className="mt-12 bg-gray-50 border border-gray-200 rounded-xl p-6 md:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Quick Summary: The 6-Step Checklist
            </h2>
            <ol className="space-y-3">
              {steps.map((step) => (
                <li key={step.number} className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-purple-600 mt-0.5 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-gray-700 text-sm font-medium">
                    {step.title}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          {/* CTA Banner */}
          <div className="my-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 md:p-10 text-white text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Check Your Law Firm&apos;s AI Visibility — Free
            </h2>
            <p className="text-purple-100 mb-6 max-w-lg mx-auto">
              Run a free AI visibility report for your law firm&apos;s website.
              See how AI assistants perceive your firm and get specific steps to
              improve your recommendations.
            </p>
            <Link
              href="/aeo-report"
              className="inline-flex items-center justify-center bg-white text-purple-700 font-semibold rounded-lg px-8 py-4 text-lg hover:bg-purple-50 transition-colors"
            >
              Get Your Free Report
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <FAQSection />
          </section>

          {/* Internal links */}
          <section className="border-t border-gray-200 pt-8 mt-12">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Related Pages
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              <Link
                href="/for-vendors"
                className="group p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <h3 className="font-medium text-gray-900 group-hover:text-purple-600 transition-colors">
                  For Vendors
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  See how TendorAI helps UK firms get recommended by AI
                  platforms.
                </p>
              </Link>
              <Link
                href="/blog"
                className="group p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <h3 className="font-medium text-gray-900 group-hover:text-purple-600 transition-colors">
                  Blog
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  More guides on AI visibility, AEO, and structured data for
                  professional services.
                </p>
              </Link>
              <Link
                href="/ai-visibility-uk"
                className="group p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <h3 className="font-medium text-gray-900 group-hover:text-purple-600 transition-colors">
                  AI Visibility UK
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  The complete guide to AI visibility for UK businesses in 2026.
                </p>
              </Link>
            </div>
          </section>
        </article>
      </main>
    </>
  );
}
