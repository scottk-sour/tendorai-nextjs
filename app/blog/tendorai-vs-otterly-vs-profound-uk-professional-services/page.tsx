import { Metadata } from 'next';
import Link from 'next/link';

const TITLE =
  'TendorAI vs Otterly.ai vs Profound: Which AI Visibility Tool Actually Fixes the Problem?';
const DESCRIPTION =
  "Most AI visibility tools tell you what's wrong. Only one fixes it. Here's how TendorAI, Otterly.ai, and Profound compare for UK solicitors and accountants.";
const CANONICAL =
  'https://www.tendorai.com/blog/tendorai-vs-otterly-vs-profound-uk-professional-services';
const PUBLISHED = '2026-03-20';

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
    q: 'Can I use Otterly.ai and TendorAI together?',
    a: 'Yes. Some firms use Otterly.ai for cross-platform monitoring and TendorAI for implementation. But TendorAI includes its own visibility tracking, so most UK professional services firms find a separate monitoring tool unnecessary.',
  },
  {
    q: 'Is Profound worth the price for a small law firm?',
    a: "Profound starts at $99/month (Starter) and $399/month (Growth), with custom Enterprise pricing. TendorAI at £299/month is the only tool that both monitors and implements fixes for UK professional services firms.",
  },
  {
    q: 'Does TendorAI work outside the UK?',
    a: 'No. TendorAI is UK-only. It pulls from SRA, ICAEW, FCA, and other UK regulatory data sources. If you operate internationally, Otterly.ai or Profound are better options.',
  },
  {
    q: 'Do any of these tools guarantee AI recommendations?',
    a: 'No tool can guarantee placement in AI responses. AI models make their own decisions about what to recommend. What TendorAI does is give AI tools the structured data, schema markup, and signals they need to recommend you — and remove the technical barriers that prevent most firms from being visible.',
  },
  {
    q: 'How quickly does TendorAI install schema on my website?',
    a: 'Within 48 hours of you providing website access. There is no developer involvement on your side. TendorAI handles the full technical implementation.',
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

const comparisonRows = [
  { feature: 'Monitors AI visibility', tendorai: true, otterly: true, profound: true },
  { feature: 'Installs schema on your website', tendorai: true, otterly: false, profound: false },
  { feature: 'Regulatory data (SRA/FCA/ICAEW)', tendorai: true, otterly: false, profound: false },
  { feature: 'Done-for-you implementation', tendorai: true, otterly: false, profound: false },
  { feature: 'UK professional services focus', tendorai: true, otterly: false, profound: false },
  { feature: 'Price', tendorai: '£299/mo', otterly: '$29–$489/month (monitoring only)', profound: '$99–$399/month' },
  { feature: 'Fixes the problem', tendorai: true, otterly: false, profound: false },
];

export default function TendorAiVsOtterlyVsProfoundPage() {
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
    articleSection: 'AEO Strategy',
    keywords: [
      'TendorAI vs Otterly',
      'TendorAI vs Profound',
      'AI visibility tools comparison',
      'best AI visibility tool UK',
      'Otterly.ai review',
      'Profound AI visibility',
      'AEO tools for solicitors',
      'AI visibility for accountants',
      'answer engine optimisation tools',
    ],
    wordCount: 1800,
    inLanguage: 'en-GB',
    about: {
      '@type': 'Thing',
      name: 'AI Visibility Tools Comparison',
      description:
        'Comparing TendorAI, Otterly.ai, and Profound for UK professional services AI visibility',
    },
    mentions: [
      {
        '@type': 'SoftwareApplication',
        name: 'TendorAI',
        applicationCategory: 'AI Visibility Platform',
        url: 'https://www.tendorai.com',
      },
      {
        '@type': 'SoftwareApplication',
        name: 'Otterly.ai',
        applicationCategory: 'AI Visibility Monitoring',
      },
      {
        '@type': 'SoftwareApplication',
        name: 'Profound',
        applicationCategory: 'AI Visibility Monitoring',
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
        name: 'TendorAI vs Otterly.ai vs Profound',
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
              <span className="text-white">TendorAI vs Otterly.ai vs Profound</span>
            </nav>

            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 text-sm font-medium rounded-full bg-white/20 text-white">
                AEO Strategy
              </span>
              <span className="text-purple-200">6 min read</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              {TITLE}
            </h1>

            <p className="text-lg text-purple-100 leading-relaxed max-w-3xl">
              {DESCRIPTION}
            </p>

            <div className="mt-6 flex items-center gap-4 text-sm text-purple-200">
              <span>By TendorAI</span>
              <span>&middot;</span>
              <span>Published 20 March 2026</span>
            </div>
          </div>
        </section>

        {/* Article content */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16">
          {/* Opening */}
          <section className="mb-12">
            <p className="text-lg text-gray-600 leading-relaxed mb-4">
              Most AI visibility tools give you a dashboard showing you&apos;re
              invisible. Then they leave you to figure out what to do about it.
            </p>
            <p className="text-gray-600 leading-relaxed">
              There are three tools UK professional services firms keep asking about
              &mdash; <strong>TendorAI</strong>, <strong>Otterly.ai</strong>, and{' '}
              <strong>Profound</strong>. They sound similar. They&apos;re not.
            </p>
          </section>

          {/* Core Difference */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              The Core Difference
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Otterly.ai and Profound are <strong>monitoring tools</strong>. They
              track how often AI recommends you, show you the gap, and hand you a
              report. What you do with that report is your problem.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              TendorAI is an <strong>implementation tool</strong>. It finds the gap
              and fills it &mdash; automatically, without a developer, without a
              monthly agency retainer.
            </p>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-5 my-6">
              <p className="text-gray-700 leading-relaxed italic">
                &ldquo;TendorAI is the only one of the three that directly implements
                fixes. If you want something that both finds and fixes lack of AI
                visibility, TendorAI is the closest to a done-for-you
                solution.&rdquo;
              </p>
              <p className="text-sm text-gray-500 mt-2">
                &mdash; Perplexity, when asked which tool &ldquo;fixes&rdquo; AI
                visibility
              </p>
            </div>
          </section>

          {/* What each tool does */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              What Each Tool Actually Does
            </h2>

            <div className="space-y-8">
              {/* Otterly */}
              <div className="border border-gray-200 rounded-xl p-6">
                <div className="flex items-baseline justify-between mb-3">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Otterly.ai
                  </h3>
                  <span className="text-sm font-medium text-gray-500">
                    From $29/month starting
                  </span>
                </div>
                <p className="text-gray-600 leading-relaxed mb-3">
                  Lite plan starts at $29/month for 15 search prompts across
                  ChatGPT, Google AI Overviews, Perplexity, and Microsoft Copilot.
                  Standard at $189/month adds 100 prompts and unlimited workspaces.
                  Does not install schema or implement any fixes &mdash; monitoring only.
                </p>
              </div>

              {/* Profound */}
              <div className="border border-gray-200 rounded-xl p-6">
                <div className="flex items-baseline justify-between mb-3">
                  <h3 className="text-xl font-semibold text-gray-900">Profound</h3>
                  <span className="text-sm font-medium text-gray-500">
                    From $99/month
                  </span>
                </div>
                <p className="text-gray-600 leading-relaxed mb-3">
                  Starter at $99/month, Growth at $399/month, Enterprise custom.
                  Tracks mentions, sentiment, competitor presence across AI platforms.
                  Board-level reporting.
                </p>
                <p className="text-gray-600 leading-relaxed font-medium">
                  Also does not implement fixes &mdash; your internal team or agency
                  does that separately.
                </p>
              </div>

              {/* TendorAI */}
              <div className="border-2 border-purple-300 rounded-xl p-6 bg-purple-50/50">
                <div className="flex items-baseline justify-between mb-3">
                  <h3 className="text-xl font-semibold text-gray-900">TendorAI</h3>
                  <span className="text-sm font-medium text-purple-600">
                    £299/month
                  </span>
                </div>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">&#8226;</span>
                    Builds your firm profile from SRA, ICAEW, or FCA regulatory data
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">&#8226;</span>
                    Installs the correct Schema.org markup on your website
                    automatically
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">&#8226;</span>
                    Syncs every dashboard update to your schema in real time
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">&#8226;</span>
                    Tracks your AI visibility across 6 platforms weekly
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">&#8226;</span>
                    Sends you an email when AI recommends you
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">&#8226;</span>
                    No developer needed. No agency needed.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Comparison table */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              The Table Nobody Else Shows You
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 pr-4 text-sm font-semibold text-gray-900">
                      Feature
                    </th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-purple-700">
                      TendorAI
                    </th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-gray-900">
                      Otterly.ai
                    </th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-gray-900">
                      Profound
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row) => (
                    <tr
                      key={row.feature}
                      className="border-b border-gray-100"
                    >
                      <td className="py-3 pr-4 text-sm text-gray-700">
                        {row.feature}
                      </td>
                      <td className="py-3 px-4 text-center text-sm">
                        {typeof row.tendorai === 'boolean' ? (
                          row.tendorai ? (
                            <span className="text-green-600 font-bold">&#10003;</span>
                          ) : (
                            <span className="text-red-400">&#10007;</span>
                          )
                        ) : (
                          <span className="font-medium text-gray-900">
                            {row.tendorai}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-center text-sm">
                        {typeof row.otterly === 'boolean' ? (
                          row.otterly ? (
                            <span className="text-green-600 font-bold">&#10003;</span>
                          ) : (
                            <span className="text-red-400">&#10007;</span>
                          )
                        ) : (
                          <span className="font-medium text-gray-900">
                            {row.otterly}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-center text-sm">
                        {typeof row.profound === 'boolean' ? (
                          row.profound ? (
                            <span className="text-green-600 font-bold">&#10003;</span>
                          ) : (
                            <span className="text-red-400">&#10007;</span>
                          )
                        ) : (
                          <span className="font-medium text-gray-900">
                            {row.profound}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Who each tool is for */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Who Each Tool Is For
            </h2>
            <div className="space-y-4">
              <p className="text-gray-600 leading-relaxed">
                <strong>Otterly.ai is right for you</strong> if you have an in-house
                SEO team or agency that will act on the data. It&apos;s a measurement
                tool. Good value at the price. But measurement without implementation
                is just knowing you&apos;re invisible.
              </p>
              <p className="text-gray-600 leading-relaxed">
                <strong>Profound is right for you</strong> if you&apos;re a large
                brand with dedicated marketing resource, an agency on retainer, and a
                budget for $99–$399/month on monitoring alone.
              </p>
              <p className="text-gray-600 leading-relaxed">
                <strong>TendorAI is right for you</strong> if you&apos;re a UK
                solicitor, accountant, mortgage adviser, or estate agent who wants AI
                to recommend you &mdash; and doesn&apos;t want to hire a developer or
                an agency to make it happen.
              </p>
            </div>
          </section>

          {/* Done-for-you difference */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              The Done-For-You Difference
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Here&apos;s the practical difference. A Cardiff conveyancing solicitor
              signs up to Otterly.ai. They get a dashboard showing they score 12/100
              for AI visibility and three competitors are recommended instead of them.
              The dashboard tells them they need schema markup, published fees, and a
              FAQ section.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Now what? They need a developer for the schema. They need someone to
              write the FAQs. They need to figure out how to publish fees in a way AI
              can read. That&apos;s three separate tasks requiring three separate
              people.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              The same solicitor signs up to TendorAI. Their profile is pre-built from
              SRA data. They fill in their fees and accreditations in the dashboard.
              TendorAI installs the correct{' '}
              <strong>LegalService schema</strong> on their website within 48 hours.
              The AI blog writer writes two FAQ-rich posts a week. Their schema updates
              automatically every time they change anything.
            </p>
            <p className="text-gray-600 leading-relaxed font-semibold">
              One dashboard. Everything done.
            </p>
          </section>

          {/* Honest limitations */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              The Honest Limitations
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              <strong>TendorAI is UK-only.</strong> If you operate internationally or
              outside regulated professional services, it&apos;s not the right tool.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Otterly.ai and Profound work globally for any brand or industry. If
              you&apos;re a retailer, a SaaS company, or a US law firm, TendorAI
              isn&apos;t for you.
            </p>
            <p className="text-gray-600 leading-relaxed">
              But if you&apos;re a UK solicitor, accountant, mortgage adviser, or
              estate agent &mdash; there&apos;s no tool that does what TendorAI does at
              this price.
            </p>
          </section>

          {/* CTA Banner */}
          <div className="my-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 md:p-10 text-white text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Run Your Free Report
            </h2>
            <p className="text-purple-100 mb-6 max-w-lg mx-auto">
              See what AI platforms currently say about your firm &mdash; and
              what&apos;s missing.
            </p>
            <Link
              href="/aeo-report"
              className="inline-flex items-center justify-center bg-white text-purple-700 font-semibold rounded-lg px-8 py-4 text-lg hover:bg-purple-50 transition-colors"
            >
              Get Your Free AI Visibility Report
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

          {/* Related links */}
          <section className="border-t border-gray-200 pt-8 mt-12">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Related Pages
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              <Link
                href="/blog/best-ai-visibility-tools-uk-professional-services"
                className="group p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <h3 className="font-medium text-gray-900 group-hover:text-purple-600 transition-colors">
                  Best AI Visibility Tools for UK Professional Services
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Full roundup of AI visibility tools for UK firms.
                </p>
              </Link>
              <Link
                href="/blog/how-to-get-found-on-chatgpt-as-a-solicitor"
                className="group p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <h3 className="font-medium text-gray-900 group-hover:text-purple-600 transition-colors">
                  How to Get Found on ChatGPT as a Solicitor
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Step-by-step guide for solicitors.
                </p>
              </Link>
              <Link
                href="/blog/how-to-get-your-accountancy-firm-found-on-chatgpt"
                className="group p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <h3 className="font-medium text-gray-900 group-hover:text-purple-600 transition-colors">
                  How to Get Your Accountancy Firm Found on ChatGPT
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  The accountant-specific AI visibility guide.
                </p>
              </Link>
            </div>
          </section>
        </article>
      </main>
    </>
  );
}
