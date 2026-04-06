import { Metadata } from 'next';
import Link from 'next/link';

const TITLE = 'How to Get Your Accountancy Practice into AI Search Results (UK Guide)';
const DESCRIPTION =
  'Step-by-step guide for UK accountants on appearing in ChatGPT, Perplexity and Google AI Overviews. Covers ICAEW data, schema markup, and AI visibility for accountancy firms.';
const CANONICAL =
  'https://www.tendorai.com/blog/how-to-get-your-accountancy-practice-into-ai-search-results';
const PUBLISHED = '2026-04-06';

export const metadata: Metadata = {
  title: `${TITLE} | TendorAI`,
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
    q: 'Does being ICAEW or ACCA qualified guarantee AI will recommend me?',
    a: 'No. Professional qualification is necessary but not sufficient. AI models need your credentials to be structured and machine-readable on your own website and cross-referenced with authoritative sources.',
  },
  {
    q: 'Which AI tool recommends accountants most actively in the UK?',
    a: 'Perplexity currently cites specific UK accountancy firms most frequently by name. ChatGPT follows. Both respond well to schema markup and regulatory data.',
  },
  {
    q: 'My practice is small \u2014 does AI visibility matter for me?',
    a: 'It matters more for small practices than large ones. Large firms have brand recognition that AI models pick up from multiple sources. Small practices have no such advantage and need structured data to be discoverable at all.',
  },
  {
    q: 'How do I check if my practice appears in AI recommendations?',
    a: 'Ask ChatGPT or Perplexity directly: \u201cCan you recommend a chartered accountant in [your town] who specialises in [your specialism]?\u201d If you do not appear, your data is not structured for AI discovery. TendorAI\u2019s free profile scan shows you exactly what is missing.',
  },
  {
    q: 'What schema type should accountancy practices use?',
    a: 'AccountingService is the correct Schema.org type for UK accountancy practices. It should include your firm name, address, ICAEW or ACCA membership number as an identifier, sameAs links to your register entry, and a knowsAbout array listing your specific services.',
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

export default function AccountancyPracticeAiSearchResultsPage() {
  const today = new Date().toISOString().split('T')[0];

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': CANONICAL,
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
        width: 873,
        height: 873,
      },
    },
    datePublished: PUBLISHED,
    dateModified: today,
    url: CANONICAL,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': CANONICAL,
    },
    image: {
      '@type': 'ImageObject',
      url: 'https://www.tendorai.com/logo.png',
      width: 873,
      height: 873,
    },
    articleSection: 'AI Visibility',
    keywords: [
      'AI visibility for accountants',
      'accountancy practice AI search results',
      'ICAEW AI visibility',
      'ACCA AI visibility',
      'ChatGPT recommendations for accountants',
      'schema markup accountants',
      'AccountingService schema',
      'answer engine optimisation accountants',
    ],
    wordCount: 2200,
    inLanguage: 'en-GB',
    about: {
      '@type': 'Thing',
      name: 'AI Visibility for Accountancy Practices',
      description:
        'How UK accountancy practices can appear in AI search results including ChatGPT, Perplexity and Google AI Overviews',
    },
    mentions: [
      {
        '@type': 'Organization',
        name: 'Institute of Chartered Accountants in England and Wales',
        alternateName: 'ICAEW',
        url: 'https://www.icaew.com',
      },
      {
        '@type': 'Organization',
        name: 'Association of Chartered Certified Accountants',
        alternateName: 'ACCA',
        url: 'https://www.accaglobal.com',
      },
      {
        '@type': 'SoftwareApplication',
        name: 'ChatGPT',
        applicationCategory: 'AI Assistant',
        creator: { '@type': 'Organization', name: 'OpenAI' },
      },
      {
        '@type': 'SoftwareApplication',
        name: 'Perplexity',
        applicationCategory: 'AI Search Engine',
      },
      {
        '@type': 'SoftwareApplication',
        name: 'Google AI Overviews',
        applicationCategory: 'AI Search',
        creator: { '@type': 'Organization', name: 'Google' },
      },
    ],
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

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.tendorai.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: 'https://www.tendorai.com/blog',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Accountants',
        item: 'https://www.tendorai.com/blog',
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: TITLE,
        item: CANONICAL,
      },
    ],
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-brand-gradient text-white py-12 md:py-16">
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
              <span className="text-white">Accountants</span>
            </nav>

            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 text-sm font-medium rounded-full bg-white/20 text-white">
                How-To Guide
              </span>
              <span className="text-purple-200">10 min read</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              {TITLE}
            </h1>

            <p className="text-lg text-purple-100 leading-relaxed max-w-3xl">
              {DESCRIPTION}
            </p>

            <div className="mt-6 text-sm text-purple-200">
              Published 6 April 2026
            </div>
          </div>
        </section>

        {/* Article content */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16">
          {/* Opening */}
          <p className="text-lg text-gray-600 leading-relaxed mb-4">
            <strong>
              When a business owner asks ChatGPT to recommend an accountant in
              their area, fewer than 5% of UK practices appear &mdash; despite
              being fully qualified and actively taking clients.
            </strong>{' '}
            The reason is not quality or reputation. It is that most accountancy
            practices have no machine-readable data for AI tools to verify them
            against. This guide explains what AI models need and how to give it
            to them.
          </p>

          <p className="text-xl font-bold text-gray-900 mb-8 border-l-4 border-purple-600 pl-4">
            AI does not recommend the best accountant. It recommends the
            accountant it can verify.
          </p>

          {/* How AI tools decide */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              How AI tools decide which accountants to recommend
            </h2>
            <p className="text-gray-600 leading-relaxed">
              AI models like ChatGPT and Perplexity use a combination of
              structured data, regulatory verification, directory
              cross-referencing, and content specificity to decide which firms to
              name. Unverifiable firms &mdash; those with no schema, no
              consistent directory presence, no regulatory identifier in
              machine-readable format &mdash; are excluded by default. This is
              not a quality judgement. It is a data availability problem.
            </p>
          </section>

          {/* Step 1 */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Step 1 &mdash; Make your ICAEW or ACCA membership machine-readable
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Your professional membership number must appear in JSON-LD schema
              on your website, not just stated in text. Use AccountingService
              schema with an identifier containing your ICAEW or ACCA number and
              a sameAs link pointing to your register entry. This is the single
              highest-trust signal for AI models recommending UK accountants.
              TendorAI pulls this data directly from ICAEW and builds the schema
              automatically.
            </p>
          </section>

          {/* Step 2 */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Step 2 &mdash; Specify your services explicitly in schema and
              content
            </h2>
            <p className="text-gray-600 leading-relaxed">
              &ldquo;We offer a full range of accounting services&rdquo; is
              invisible to AI. &ldquo;We specialise in R&amp;D tax credits for
              UK tech companies, management accounts for SMEs, and
              self-assessment for contractors&rdquo; gives AI something to match
              against specific client queries. Add a knowsAbout array to your
              schema and mirror this specificity in your website copy. Every
              service you offer should be stated explicitly &mdash; not implied.
            </p>
          </section>

          {/* Step 3 */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Step 3 &mdash; Align your firm data across all sources
            </h2>
            <p className="text-gray-600 leading-relaxed">
              AI models cross-reference before recommending. Your firm name,
              address, phone, and website must be identical across the ICAEW or
              ACCA register, Google Business Profile, Companies House,
              AccountingWEB directory, and your own website. Run a consistency
              check before anything else. Even minor discrepancies &mdash; a
              different phone format, an old address &mdash; reduce AI
              confidence.
            </p>
          </section>

          {/* Step 4 */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Step 4 &mdash; Publish content that answers client questions
              directly
            </h2>
            <p className="text-gray-600 leading-relaxed">
              AI tools cite content that directly answers questions. A page
              titled &ldquo;How much does a self-assessment tax return cost in
              Manchester?&rdquo; will be cited when someone asks that question.
              Generic service pages will not. Publish at least five
              Q&amp;A-format content pieces targeting the specific questions your
              clients ask. Each should open with a direct answer in the first
              paragraph.
            </p>
          </section>

          {/* Step 5 */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Step 5 &mdash; Get verified on AI-indexed accountancy directories
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Certain directories carry more weight with AI models because they
              are authoritative and frequently crawled. ICAEW&apos;s Find a
              Chartered Accountant, AccountingWEB, and TendorAI&apos;s verified
              accountancy directory are pulled by AI tools when generating firm
              recommendations. Being listed on these with verified, consistent
              data adds independent trust signals.
            </p>
          </section>

          {/* Timeline */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              How long does it take for an accountancy practice to appear in AI
              results?
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Schema changes take 4 to 8 weeks to surface in most AI models.
              Perplexity is faster &mdash; it updates its index frequently and
              can reflect changes within days. Google AI Overviews reflects
              Google Business Profile changes quickly. Practices implementing all
              five steps typically see measurable AI visibility improvement
              within 60 days.
            </p>
          </section>

          {/* Comparison table */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              AI visibility comparison for accountancy practices
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-purple-700 text-white">
                    <th className="p-3 text-left font-semibold">Factor</th>
                    <th className="p-3 text-left font-semibold">
                      Without AI Visibility Setup
                    </th>
                    <th className="p-3 text-left font-semibold">
                      With AI Visibility Setup
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    [
                      'Schema markup',
                      'None',
                      'AccountingService JSON-LD with ICAEW/ACCA identifier',
                    ],
                    [
                      'Regulatory verification',
                      'Membership stated in text only',
                      'Machine-readable, cross-referenced',
                    ],
                    [
                      'Service specificity',
                      'Generic',
                      'Explicit specialisms and locations',
                    ],
                    [
                      'Directory consistency',
                      'Often mismatched',
                      'Identical NAP across all sources',
                    ],
                    [
                      'Content for AI citation',
                      'Generic service pages',
                      'Q&A format content targeting client queries',
                    ],
                    [
                      'AI recommendation rate',
                      'Near zero',
                      'Measurably higher within 60 days',
                    ],
                    [
                      'Setup time with TendorAI',
                      'N/A',
                      '48 hours',
                    ],
                  ].map(([factor, without, withSetup], i) => (
                    <tr
                      key={i}
                      className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                    >
                      <td className="p-3 font-medium text-gray-900">
                        {factor}
                      </td>
                      <td className="p-3 text-red-700">{without}</td>
                      <td className="p-3 text-green-700 font-medium">
                        {withSetup}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <FAQSection />
          </section>

          {/* Sources */}
          <section className="mb-12 border-t border-gray-200 pt-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Sources
            </h2>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>
                ICAEW Find a Chartered Accountant:{' '}
                <a
                  href="https://www.icaew.com/about-icaew/find-a-chartered-accountant"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 hover:text-purple-700 underline"
                >
                  icaew.com/about-icaew/find-a-chartered-accountant
                </a>
              </li>
              <li>
                ACCA Find an Accountant:{' '}
                <a
                  href="https://www.accaglobal.com/gb/en/member/find-an-accountant.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 hover:text-purple-700 underline"
                >
                  accaglobal.com/gb/en/member/find-an-accountant.html
                </a>
              </li>
              <li>
                Schema.org AccountingService:{' '}
                <a
                  href="https://schema.org/AccountingService"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 hover:text-purple-700 underline"
                >
                  schema.org/AccountingService
                </a>
              </li>
              <li>
                Companies House:{' '}
                <a
                  href="https://www.companieshouse.gov.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 hover:text-purple-700 underline"
                >
                  companieshouse.gov.uk
                </a>
              </li>
              <li>
                TendorAI AI Visibility for Accountants:{' '}
                <a
                  href="https://www.tendorai.com/ai-visibility-for-accountants"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 hover:text-purple-700 underline"
                >
                  tendorai.com/ai-visibility-for-accountants
                </a>
              </li>
            </ul>
          </section>

          {/* CTA Banner */}
          <section className="my-12 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-8 md:p-10 text-white text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Is your accountancy practice appearing when clients search by AI?
            </h2>
            <p className="text-gray-300 mb-6 max-w-lg mx-auto">
              TendorAI pulls your ICAEW or ACCA data, builds a machine-readable
              practice profile, and installs AI-optimised schema on your website
              within 48 hours.
            </p>
            <Link
              href="/for-vendors"
              className="inline-flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg px-8 py-4 text-lg transition-colors"
            >
              Claim your free profile
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
          </section>

          {/* Back to blog */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <Link
              href="/blog"
              className="text-sm text-purple-600 hover:text-purple-700 font-medium"
            >
              &larr; Back to Blog
            </Link>
          </div>
        </article>
      </main>
    </>
  );
}
