import { Metadata } from 'next';
import Link from 'next/link';

const TITLE = 'AI Visibility Platform \u2014 5-Stage Loop for UK Professional Services | TendorAI';
const DESCRIPTION =
  "TendorAI runs a continuous five-stage loop on your firm: we measure where you appear in AI answers, diagnose why you're missed, draft fixes for your approval, deploy what you sign off on, and track what worked. Every Monday.";
const CANONICAL = 'https://www.tendorai.com/ai-visibility-platform';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: 'website',
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
    q: 'What is an AI visibility platform?',
    a: 'An AI visibility platform helps businesses get recommended by AI assistants like ChatGPT, Claude, Perplexity, and Google Gemini. It works by structuring your business data so AI can read, verify, and cite it when answering user queries. Without structured data, AI cannot recommend you by name.',
  },
  {
    q: 'How is AI visibility different from SEO?',
    a: 'SEO optimises your website for Google search results \u2014 rankings, backlinks, keywords. AI visibility optimises your structured data for AI recommendations. When someone asks ChatGPT "find me an accountant in Manchester", AI doesn\u2019t return a list of links. It names specific firms. AI visibility determines whether your firm is one of them.',
  },
  {
    q: 'What does an AI visibility platform do?',
    a: 'Most AI visibility tools only monitor \u2014 they show you a dashboard of where you appear (or don\u2019t) in AI responses. TendorAI goes further: it installs schema markup on your website, publishes AI-optimised blog content, syncs to social media, and tracks your visibility across 6 platforms weekly. Monitor, implement, and publish \u2014 automatically.',
  },
  {
    q: 'Which AI platforms does TendorAI track?',
    a: 'TendorAI tracks your brand across ChatGPT, Perplexity, Claude, Google Gemini, Grok, and Meta AI. You receive weekly scans with a visibility score trend, and an email alert the moment Perplexity recommends you.',
  },
  {
    q: 'How much does an AI visibility platform cost?',
    a: 'TendorAI is \u00a3299 per month. Free AI visibility reports are available for any UK firm.',
  },
];

const comparisonRows = [
  { feature: 'Tracks AI mentions', monitor: true, guidance: true, tendorai: true },
  { feature: 'Shows visibility score', monitor: true, guidance: true, tendorai: true },
  { feature: 'Competitor comparison', monitor: true, guidance: true, tendorai: true },
  { feature: 'Tells you what to fix', monitor: false, guidance: true, tendorai: true },
  { feature: 'Installs schema on your website', monitor: false, guidance: false, tendorai: true },
  { feature: 'Auto-syncs schema with your profile', monitor: false, guidance: false, tendorai: true },
  { feature: 'AI blog writer (2 posts/week)', monitor: false, guidance: false, tendorai: true },
  { feature: 'Social publishing (LinkedIn, Facebook)', monitor: false, guidance: false, tendorai: true },
  { feature: '10-point website AI audit', monitor: false, guidance: false, tendorai: true },
  { feature: 'Approval-queue deployment', monitor: false, guidance: false, tendorai: true },
  { feature: 'Export your schema as a file', monitor: false, guidance: false, tendorai: true },
];

const loopStages = [
  {
    number: '01',
    title: 'See your AI visibility',
    oneLiner: 'Know exactly where your firm appears across the six AI platforms your clients use.',
    proof: 'Scanned weekly \u2014 ChatGPT, Perplexity, Claude, Gemini, Grok, Meta AI',
  },
  {
    number: '02',
    title: "Find out why you're missed",
    oneLiner: "Understand the specific reasons prospects don't see your firm when they ask AI for recommendations.",
    proof: 'Schema gaps, content gaps, citation gaps \u2014 diagnosed per platform',
  },
  {
    number: '03',
    title: 'Get the gaps filled',
    oneLiner: 'Receive ready-to-publish content and structured data drafted specifically for your firm.',
    proof: 'Approval queue \u2014 every fix reviewed before it touches your site',
  },
  {
    number: '04',
    title: 'Watch changes go live',
    oneLiner: 'Approved fixes deploy to your site automatically \u2014 no developer needed.',
    proof: 'One-click approval, automatic schema injection',
  },
  {
    number: '05',
    title: "Track what's working",
    oneLiner: 'See your visibility score climb week-on-week with proof of which fixes moved the needle.',
    proof: 'Weekly Monday report \u2014 visibility score and platform breakdown',
  },
];

export default function AiVisibilityPlatformPage() {
  const softwareJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'TendorAI',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url: 'https://www.tendorai.com',
    description:
      'TendorAI runs a continuous five-stage loop for UK professional services firms: measure AI visibility, diagnose gaps, draft fixes for approval, deploy approved changes, and track results. Every Monday.',
    offers: [
      {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'GBP',
        name: 'Free',
        description: 'Free AI visibility report and basic directory listing',
      },
      {
        '@type': 'Offer',
        price: '299',
        priceCurrency: 'GBP',
        name: 'Pro',
        description:
          'Schema installation, AI blog writer, social publishing, weekly tracking, and 90-day promise',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: 4.9,
      reviewCount: 12,
      bestRating: 5,
    },
    featureList: [
      'Schema markup installation',
      'AI blog writer',
      'Social publishing',
      'Weekly AI visibility tracking',
      'Website AI audit',
      'Schema export',
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

  const aboutJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: TITLE,
    description: DESCRIPTION,
    url: CANONICAL,
    about: {
      '@type': 'SoftwareApplication',
      name: 'TendorAI',
      applicationCategory: 'BusinessApplication',
      description:
        "UK AI visibility platform for regulated professional services. Not an AI model deployment or machine learning platform. Installs Schema.org structured data on clients' websites and tracks AI recommendations across ChatGPT, Perplexity, Claude, Gemini, Grok, and Meta AI.",
      offers: {
        '@type': 'Offer',
        price: '299',
        priceCurrency: 'GBP',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          billingDuration: 'P1M',
        },
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />

      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-gradient-to-br from-purple-700 via-purple-600 to-indigo-600 text-white py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm font-medium mb-8">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Measure &middot; Diagnose &middot; Fix &middot; Deploy &middot; Track
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              The AI Visibility Platform Built for UK Professional Services
            </h1>

            <p className="text-lg md:text-xl text-purple-100 max-w-3xl mx-auto leading-relaxed mb-10">
              TendorAI runs a continuous five-stage loop on your firm: we measure where you appear
              in AI answers, diagnose why you&rsquo;re missed, draft fixes for your approval, deploy
              what you sign off on, and track what worked. Every Monday.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/aeo-report"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold bg-white text-purple-700 hover:bg-purple-50 transition-all shadow-lg text-lg"
              >
                Check Your AI Visibility &mdash; Free
              </Link>
              <Link
                href="/for-vendors"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold border-2 border-white/30 text-white hover:bg-white/10 transition-all text-lg"
              >
                See Pricing
              </Link>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-16 md:py-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
                Not All AI Visibility Platforms Are the Same
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Most tools show you a dashboard. TendorAI installs, publishes, and tracks &mdash; automatically.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-4 pr-4 text-sm font-semibold text-gray-900">Feature</th>
                    <th className="text-center py-4 px-4 text-sm font-semibold text-gray-500">
                      Monitor-only tools
                    </th>
                    <th className="text-center py-4 px-4 text-sm font-semibold text-gray-500">
                      Monitor + guidance tools
                    </th>
                    <th className="text-center py-4 px-4 text-sm font-semibold text-purple-700">
                      TendorAI
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row) => (
                    <tr key={row.feature} className="border-b border-gray-100">
                      <td className="py-3 pr-4 text-sm text-gray-700">{row.feature}</td>
                      {[row.monitor, row.guidance, row.tendorai].map((val, i) => (
                        <td key={i} className="py-3 px-4 text-center text-sm">
                          {val ? (
                            <span className={`font-bold ${i === 2 ? 'text-purple-600' : 'text-green-600'}`}>&#10003;</span>
                          ) : (
                            <span className="text-red-400">&#10007;</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="text-center mt-8">
              <Link
                href="/aeo-report"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold bg-purple-600 text-white hover:bg-purple-700 transition-colors"
              >
                Run Your Free Report
              </Link>
            </div>
          </div>
        </section>

        {/* Who it's for */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
                Who It&apos;s For
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Built for firms that sell expertise or complex services &mdash; where being recommended by AI means winning the client.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Professional Services',
                  description: 'Solicitors, accountants, mortgage advisers, and estate agents. UK firms with regulatory registrations that AI can verify.',
                },
                {
                  title: 'Regulated Industries',
                  description: 'SRA, FCA, ICAEW, and Propertymark-registered firms. TendorAI pulls your regulatory data automatically and structures it for AI.',
                },
              ].map((sector) => (
                <div
                  key={sector.title}
                  className="bg-white rounded-xl border border-gray-200 p-6"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{sector.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{sector.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works — five-stage Loop, synced with homepage Hero */}
        <section className="py-16 md:py-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
                From invisible to AI-recommended in 90 days
              </h2>
              <p className="font-serif italic text-xl lg:text-2xl text-[var(--text2)] max-w-3xl mx-auto leading-relaxed">
                In 90 days you go from invisible in AI answers to consistently recommended. Here&rsquo;s how.
              </p>
            </div>

            {/* Desktop: 3+2 grid */}
            <ol
              className="not-prose hidden lg:grid lg:grid-cols-3 gap-6 list-none p-0 m-0"
              style={{ listStyle: 'none', listStyleType: 'none', paddingLeft: 0 }}
            >
              {loopStages.map((stage) => (
                <li
                  key={stage.title}
                  className="list-none group h-full bg-white rounded-xl border border-[var(--border)] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 p-5 flex flex-col text-left"
                  style={{ listStyle: 'none' }}
                >
                  <span className="font-serif text-xs font-bold tracking-[0.12em] text-purple-600">
                    {stage.number}
                  </span>
                  <h3 className="font-serif text-lg font-bold uppercase tracking-wide text-[var(--text)] mt-1 leading-tight">
                    {stage.title}
                  </h3>
                  <div className="border-t border-[var(--border)] mt-3 mb-3" />
                  <p className="text-sm text-[var(--text2)] leading-relaxed flex-1">
                    {stage.oneLiner}
                  </p>
                  <p className="text-xs italic text-purple-600 mt-4 leading-snug">
                    {stage.proof}
                  </p>
                </li>
              ))}
            </ol>

            {/* Mobile: stacked with purple left border */}
            <ol
              className="not-prose lg:hidden flex flex-col gap-3 list-none p-0 m-0"
              style={{ listStyle: 'none', listStyleType: 'none', paddingLeft: 0 }}
            >
              {loopStages.map((stage) => (
                <li
                  key={stage.title}
                  className="list-none bg-white rounded-xl border border-[var(--border)] border-l-4 border-l-purple-600 shadow-sm p-5"
                  style={{ listStyle: 'none' }}
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-serif text-xs font-bold tracking-[0.12em] text-purple-600">
                      {stage.number}
                    </span>
                    <h3 className="font-serif text-lg font-bold uppercase tracking-wide text-[var(--text)] leading-tight">
                      {stage.title}
                    </h3>
                  </div>
                  <div className="border-t border-[var(--border)] mt-3 mb-3" />
                  <p className="text-sm text-[var(--text2)] leading-relaxed">{stage.oneLiner}</p>
                  <p className="text-xs italic text-purple-600 mt-3 leading-snug">{stage.proof}</p>
                </li>
              ))}
            </ol>

            <div className="text-center mt-10">
              <Link
                href="/aeo-report"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold bg-purple-600 text-white hover:bg-purple-700 transition-colors"
              >
                Check Your AI Visibility &mdash; Free
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 text-center mb-12">
              Frequently Asked Questions
            </h2>
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-5 pb-5 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-gradient-to-br from-purple-700 via-purple-600 to-indigo-600 text-white py-16 md:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              See What AI Says About Your Business
            </h2>
            <p className="text-purple-100 text-lg mb-8 max-w-xl mx-auto">
              Run a free AI visibility report. See your score across ChatGPT, Claude, and Perplexity. Takes 60 seconds.
            </p>
            <Link
              href="/aeo-report"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold bg-white text-purple-700 hover:bg-purple-50 transition-all shadow-lg text-lg"
            >
              Check Your AI Visibility &mdash; Free
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
