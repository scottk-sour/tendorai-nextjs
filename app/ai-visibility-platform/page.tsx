import { Metadata } from 'next';
import Link from 'next/link';

const TITLE = 'AI Visibility Platform \u2014 Monitor, Implement and Publish | TendorAI';
const DESCRIPTION =
  'TendorAI is the AI visibility platform that installs schema markup, tracks 6 AI platforms, and publishes content automatically. Free report.';
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
    a: 'Monitoring-only tools like Otterly.ai start at $29/month. Enterprise tools like Profound start at $99/month. TendorAI \u2014 which monitors, implements, and publishes \u2014 is \u00a3299/month at the early adopter price (rising to \u00a3599). Free AI visibility reports are available for any business.',
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
  { feature: 'Done-for-you installation', monitor: false, guidance: false, tendorai: true },
  { feature: 'Export your schema as a file', monitor: false, guidance: false, tendorai: true },
];

const steps = [
  {
    number: '1',
    title: 'Run a Free AI Visibility Report',
    description:
      'See what ChatGPT, Claude, and Perplexity currently say about your business. Takes 60 seconds. No signup required.',
  },
  {
    number: '2',
    title: 'Claim and Complete Your Profile',
    description:
      'Add your fees, specialisms, accreditations, and services. This is the structured data AI needs to recommend you by name.',
  },
  {
    number: '3',
    title: 'We Install Schema on Your Website',
    description:
      'Give us your website login. We install AI-optimised schema markup within 48 hours. No developer needed.',
  },
  {
    number: '4',
    title: 'Content, Social, and Tracking \u2014 Automatic',
    description:
      'AI blog posts publish weekly. Schema auto-syncs. LinkedIn and Facebook update automatically. Weekly tracking emails land every Monday.',
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
      'AI visibility platform that installs schema markup, tracks 6 AI platforms, and publishes AI-optimised content automatically.',
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

  const aboutJsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'AI Visibility Platform \u2014 Monitor, Implement and Publish | TendorAI',
      description:
        'TendorAI is the UK AI visibility platform that installs schema markup, tracks brand mentions across 6 AI platforms, and publishes AI-optimised content automatically. Built for UK regulated professional services firms.',
      url: 'https://www.tendorai.com/ai-visibility-platform',
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
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is an AI visibility platform?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'An AI visibility platform helps businesses get recommended by AI assistants like ChatGPT, Claude, Perplexity, and Google Gemini. It works by structuring your business data so AI can read, verify, and cite it when answering user queries. Without structured data, AI cannot recommend you by name.',
          },
        },
        {
          '@type': 'Question',
          name: 'How is AI visibility different from SEO?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'SEO optimises your website for Google search results. AI visibility optimises your structured data for AI recommendations. When someone asks ChatGPT for an accountant, AI names specific firms \u2014 not a list of links. AI visibility determines whether your firm is one of them.',
          },
        },
        {
          '@type': 'Question',
          name: 'What does TendorAI do that other AI visibility tools do not?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Most AI visibility tools only monitor \u2014 they show a dashboard but do not fix the problem. TendorAI installs schema markup on your website, publishes AI-optimised blog content, syncs to LinkedIn and Facebook, and tracks visibility across 6 platforms weekly. No developer or agency required.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which AI platforms does TendorAI track?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'TendorAI tracks your brand across ChatGPT, Perplexity, Claude, Google Gemini, Grok, and Meta AI. Weekly scans with visibility score trends and email alerts when AI platforms recommend you.',
          },
        },
        {
          '@type': 'Question',
          name: 'How much does TendorAI cost?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'TendorAI Pro is \u00a3299 per month. A free AI visibility report is available for any UK business with no signup required.',
          },
        },
      ],
    },
  ];

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
              Monitor + Implement + Publish
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              The AI Visibility Platform That Does Everything Automatically
            </h1>

            <p className="text-lg md:text-xl text-purple-100 max-w-3xl mx-auto leading-relaxed mb-10">
              TendorAI is an AI visibility platform that installs schema markup on your website,
              tracks your brand across 6 AI platforms weekly, and publishes AI-optimised blog
              content automatically. No developer. No agency. No manual work.
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
                      Monitor Only
                      <span className="block text-xs font-normal text-gray-400 mt-0.5">Otterly, Peec AI</span>
                    </th>
                    <th className="text-center py-4 px-4 text-sm font-semibold text-gray-500">
                      Monitor + Guidance
                      <span className="block text-xs font-normal text-gray-400 mt-0.5">Profound</span>
                    </th>
                    <th className="text-center py-4 px-4 text-sm font-semibold text-purple-700">
                      Monitor + Implement + Publish
                      <span className="block text-xs font-normal text-purple-500 mt-0.5">TendorAI</span>
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

        {/* How it works */}
        <section className="py-16 md:py-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
                How It Works
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                From invisible to AI-recommended in four steps
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step) => (
                <div key={step.number} className="text-center">
                  <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 font-bold text-xl flex items-center justify-center mx-auto mb-4">
                    {step.number}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>

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
              Run a free AI visibility report. See your score across ChatGPT, Claude, and Perplexity. Takes 30 seconds.
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
