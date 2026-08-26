import { Metadata } from 'next';
import { Suspense } from 'react';
import AeoReportClient from './AeoReportClient';

export const metadata: Metadata = {
  title: 'Free AI Visibility Tool — Is AI Recommending Your Business?',
  description:
    'Free AI visibility checker for UK businesses. Find out if ChatGPT, Perplexity and Claude recommend you. Instant AI visibility report — enter your company name and get results in 60 seconds.',
  alternates: {
    canonical: 'https://www.tendorai.com/ai-visibility-report',
  },
  openGraph: {
    type: 'website',
    url: 'https://www.tendorai.com/ai-visibility-report',
    title: 'Free AI Visibility Tool — Is AI Recommending Your Business?',
    description:
      'Free AI visibility checker for UK businesses. Find out if ChatGPT, Perplexity and Claude recommend you. Instant AI visibility report in 60 seconds.',
    siteName: 'TendorAI',
    locale: 'en_GB',
    images: [{ url: '/logo.png', width: 873, height: 873, alt: 'TendorAI AI Visibility Tool' }],
  },
  twitter: {
    card: 'summary',
    title: 'Free AI Visibility Tool — Is AI Recommending Your Business?',
    description:
      'Free AI visibility checker for UK businesses. Find out if ChatGPT, Perplexity and Claude recommend you.',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is AI Visibility?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'AI Visibility is the process of optimising your business to appear in AI-generated answers from tools like ChatGPT, Perplexity, and Claude. As more people use AI instead of Google to find suppliers, AI Visibility is becoming essential for business visibility.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I check if AI recommends my business?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Use TendorAI's free AI Visibility Report tool. Enter your company name, category, and location, and we'll check whether AI assistants recommend your business when customers search for suppliers in your area.",
      },
    },
    {
      '@type': 'Question',
      name: 'Why is my business not showing up in AI answers?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "AI tools recommend businesses based on structured data, verified profiles, and authoritative sources. If your business doesn't have optimised, structured data on platforms AI tools reference, you won't appear in AI-generated recommendations.",
      },
    },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'TendorAI AI Visibility Report',
  applicationCategory: 'BusinessApplication',
  applicationSubCategory: 'AI Visibility Tool',
  description:
    'Free AI visibility checker — see whether ChatGPT, Perplexity, Claude, Gemini, Grok, and Google AI Overviews recommend your UK business.',
  operatingSystem: 'Web',
  url: 'https://www.tendorai.com/ai-visibility-report',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'GBP',
  },
  provider: {
    '@type': 'Organization',
    name: 'TendorAI Ltd',
    url: 'https://www.tendorai.com',
  },
  isPartOf: {
    '@type': 'SoftwareApplication',
    name: 'TendorAI',
    url: 'https://www.tendorai.com/ai-visibility-platform',
  },
};

export default function AeoReportPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
      />

      {/* Server-rendered shell — all static content sits in the initial HTML so
          crawlers (including AI crawlers) see the H1 + overview without waiting
          for the client bundle. The client-only form + loading UX is islanded
          inside <Suspense>. Wrapper is a <div> because the app layout already
          renders a <main>; one <main> per page. */}
      <div className="pt-16 min-h-screen bg-gray-50">
        {/* Hero */}
        <section className="bg-brand-gradient text-white py-16 sm:py-24 relative overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl" />
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-block bg-white/15 backdrop-blur border border-white/30 text-white px-6 py-2 rounded-full text-sm font-semibold mb-8 shadow-lg">
              Free AI Visibility Check
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
              Is AI Recommending{' '}
              <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                Your Business?
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
              Get your free AI visibility score. See who AI recommends instead of you,
              what gaps are holding you back, and how to fix it.
            </p>
          </div>
        </section>

        {/* Factual overview */}
        <section className="py-8 bg-white border-b border-gray-200">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-gray-600 text-base leading-relaxed">
              TendorAI&apos;s AI visibility report queries AI assistants with live web search
              to check whether they recommend your business when potential customers ask for
              supplier recommendations. The report covers UK professional services including
              solicitors, accountants, mortgage advisors, and estate agents, and identifies
              gaps in your structured data that may prevent AI systems from understanding
              and citing your business.
            </p>
          </div>
        </section>

        {/* Form + info cards */}
        <section className="py-12 sm:py-16">
          <div className="max-w-xl mx-auto px-4 sm:px-6">
            {/* Client island — form + loading UX. Under Suspense because the
                client uses useSearchParams(), which triggers Next 15's
                BAILOUT_TO_CLIENT_SIDE_RENDERING pattern. */}
            <Suspense>
              <AeoReportClient />
            </Suspense>

            {/* Server-rendered content that stays visible under the form
                during loading too. */}
            <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="font-semibold text-gray-900 mb-3">Your report includes:</h2>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 font-bold mt-0.5">1.</span>
                  <span><strong>AI Visibility Score</strong> &mdash; 0&ndash;100 rating with 6 sub-scores</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 font-bold mt-0.5">2.</span>
                  <span><strong>What AI Knows</strong> &mdash; checklist of what AI can find about you</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 font-bold mt-0.5">3.</span>
                  <span><strong>Who AI Recommends Instead</strong> &mdash; your competitors with website links</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 font-bold mt-0.5">4.</span>
                  <span><strong>Your Visibility Gaps</strong> &mdash; specific reasons you&apos;re not showing up</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 font-bold mt-0.5">5.</span>
                  <span><strong>Downloadable PDF</strong> &mdash; share with your team or management</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="font-semibold text-gray-900 mb-2">What is AI Visibility?</h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                <strong>AI visibility</strong> is the new SEO. As more people use AI
                assistants instead of Google, businesses that aren&apos;t in AI&apos;s training data become
                invisible. 200M+ people use ChatGPT monthly. 100M+ use Perplexity. Is your business
                showing up?
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
