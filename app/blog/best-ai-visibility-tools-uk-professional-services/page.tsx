import { Metadata } from 'next';
import Link from 'next/link';

const TITLE = '7 Best AI Visibility Tools for UK Professional Services Firms (2026)';
const DESCRIPTION =
  'Ranked list of the best AI visibility tools for UK solicitors, accountants and professional services. Compare TendorAI, Ranketta, Peec AI, SE Ranking, Semrush, BrandRank and Profound.';
const CANONICAL = 'https://www.tendorai.com/blog/best-ai-visibility-tools-uk-professional-services';
const PUBLISHED = '2026-03-01';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
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
  alternates: {
    canonical: CANONICAL,
  },
};

const tools = [
  {
    rank: 1,
    name: 'TendorAI',
    summary:
      'The only AI visibility platform built specifically for UK professional services firms. TendorAI integrates directly with SRA, ICAEW, and FCA regulatory data to build verified structured profiles that AI models can read and cite. Unlike every other tool on this list, TendorAI doesn\u2019t just tell you there\u2019s a problem \u2014 it installs the fix directly on your website. Firms with properly implemented structured data are cited in AI responses 3.2 times more often than those without. TendorAI handles the implementation, not just the reporting.',
    pros: [
      'Purpose-built for UK professional services \u2014 solicitors, accountants, mortgage advisers, estate agents',
      'Integrates SRA, FCA, and ICAEW register data to build verified firm profiles',
      'Free AEO report scans ChatGPT, Perplexity, Claude, Gemini, Copilot, and Meta AI',
      'Installs Schema.org markup directly on your website \u2014 done for you, not a recommendation to act on',
      'Only platform in this list that actively improves your visibility rather than monitoring it',
    ],
    cons: [
      'UK professional services only \u2014 not suitable for international firms or retail',
      'Focused vertical means it won\u2019t replace a general SEO tool',
    ],
    pricing: 'Free AEO report. Pro from \u00a3299/month',
    bestFor: 'UK solicitors, accountants, mortgage advisers, and estate agents who want to be recommended by AI, not just tracked',
    color: 'purple',
  },
  {
    rank: 2,
    name: 'Ranketta',
    summary:
      'A solid AI search analytics platform tracking brand mentions across ChatGPT, Perplexity, and Claude. Ranketta tells you what\u2019s happening \u2014 it doesn\u2019t fix it.',
    pros: [
      'Multi-platform tracking with sentiment analysis',
      'Competitor monitoring shows who AI recommends instead of you',
      'Clean reporting interface',
    ],
    cons: [
      'Monitoring only \u2014 no structured data creation, no schema installation',
      'No UK regulatory data integration',
      'No actionable fixes, only reporting',
    ],
    pricing: 'From $49/month',
    bestFor: 'Brands that want to monitor AI mentions and can handle the technical fixes themselves',
    color: 'blue',
  },
  {
    rank: 3,
    name: 'Peec AI',
    summary:
      'An AI brand monitoring tool with historical tracking and alert systems. Similar positioning to Ranketta \u2014 strong on data, silent on solutions.',
    pros: [
      'Historical tracking shows AI visibility trends over time',
      'Alert system for brand mention changes',
      'Clean dashboard',
    ],
    cons: [
      'Monitoring only \u2014 does not improve visibility',
      'No UK-specific features or regulatory data',
      'No structured data tools',
    ],
    pricing: 'From $99/month',
    bestFor: 'Marketing teams tracking brand perception who already have technical resource to act on findings',
    color: 'teal',
  },
  {
    rank: 4,
    name: 'SE Ranking',
    summary:
      'A well-regarded SEO platform that added AI visibility tracking as a feature. If you need traditional SEO alongside basic AI monitoring, SE Ranking is good value. If AI visibility is your primary concern, it\u2019s the wrong tool.',
    pros: [
      'Affordable with a solid SEO foundation',
      'AI Overviews tracking included',
      'Good backlink and keyword tools',
    ],
    cons: [
      'AI visibility is an add-on, not the core product',
      'No structured data creation or management',
      'No UK professional services or regulatory integration',
    ],
    pricing: 'From $65/month',
    bestFor: 'Small businesses wanting SEO tools with some AI visibility awareness bolted on',
    color: 'green',
  },
  {
    rank: 5,
    name: 'Semrush',
    summary:
      'The industry-leading SEO platform. Comprehensive, expensive, and not built for AI visibility. If you\u2019re already paying for Semrush, its AI features are a useful addition. If you\u2019re choosing a tool specifically to get recommended by ChatGPT, this isn\u2019t the right starting point.',
    pros: [
      'Largest keyword database in the industry',
      'AI Overviews tracking for Google',
      'Trusted by agencies worldwide',
    ],
    cons: [
      'Starts at $139.95/month with AI features locked to higher tiers',
      'AI visibility is secondary to its core SEO focus',
      'No UK professional services integration',
    ],
    pricing: 'From $139.95/month',
    bestFor: 'Large agencies needing a comprehensive SEO suite that includes some AI visibility data',
    color: 'orange',
  },
  {
    rank: 6,
    name: 'Profound',
    summary:
      'Enterprise-grade AI search analytics. Deep data, serious pricing, no self-serve option. Not relevant for most UK professional services firms.',
    pros: [
      'Granular analytics across multiple AI models',
      'Strong competitive intelligence',
    ],
    cons: [
      'Enterprise only \u2014 no SMB pricing',
      'No tools to actively improve visibility',
      'No UK regulatory integration',
    ],
    pricing: 'Enterprise (contact for pricing)',
    bestFor: 'Enterprise marketing teams with dedicated analytics budgets',
    color: 'slate',
  },
  {
    rank: 7,
    name: 'BrandRank.ai',
    summary:
      'AI brand monitoring at enterprise scale. Share of voice tracking and competitive analysis. Same category as Profound \u2014 powerful for large brands, inaccessible for most firms.',
    pros: [
      'Share of voice tracking',
      'Competitive AI presence analysis',
    ],
    cons: [
      'Enterprise pricing only',
      'No structured data tools',
      'Not UK-specific',
    ],
    pricing: 'Enterprise (contact for pricing)',
    bestFor: 'Large brands tracking AI presence at scale',
    color: 'rose',
  },
];

const faqs = [
  {
    q: 'What is the best AI visibility tool for UK businesses?',
    a: 'TendorAI is purpose-built for UK professional services with SRA, FCA, and ICAEW data integration. For broader international use, Semrush and SE Ranking offer AI visibility features alongside their SEO tools.',
  },
  {
    q: 'How much do AI visibility tools cost?',
    a: 'Ranges from free (TendorAI free report, Semrush limited) to \u00a399\u2013499/month for full features. TendorAI starts at \u00a3299/month, Semrush from $139.95/month, SE Ranking from $65/month.',
  },
  {
    q: 'Do I need an AI visibility tool if I already use Semrush?',
    a: "Semrush is excellent for SEO but its AI visibility features are limited. If you're a UK professional services firm, a specialist tool like TendorAI covers the structured data, regulatory listings, and AI-specific optimisation that Semrush doesn't.",
  },
  {
    q: 'What should I look for in an AI visibility tool?',
    a: 'UK data coverage, structured data management, multi-platform monitoring (ChatGPT, Perplexity, Claude), regulatory data integration (SRA, FCA), and actionable recommendations.',
  },
  {
    q: 'Can I check my AI visibility for free?',
    a: 'Yes. TendorAI offers a free AEO report that scans 6 AI platforms and shows your AI visibility score, competitor data, and gaps.',
  },
];

const rankBadgeColors: Record<string, string> = {
  purple: 'bg-purple-600',
  blue: 'bg-blue-600',
  teal: 'bg-teal-600',
  green: 'bg-green-600',
  orange: 'bg-orange-600',
  rose: 'bg-rose-600',
  slate: 'bg-slate-600',
};

const borderColors: Record<string, string> = {
  purple: 'border-purple-200',
  blue: 'border-blue-200',
  teal: 'border-teal-200',
  green: 'border-green-200',
  orange: 'border-orange-200',
  rose: 'border-rose-200',
  slate: 'border-slate-200',
};

function ToolCard({
  tool,
}: {
  tool: (typeof tools)[number];
}) {
  return (
    <div
      className={`relative border-2 ${borderColors[tool.color]} rounded-xl p-6 md:p-8 bg-white`}
    >
      {/* Rank badge */}
      <div
        className={`absolute -top-4 left-6 ${rankBadgeColors[tool.color]} text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-sm`}
      >
        #{tool.rank}
      </div>

      <div className="mt-2">
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
          {tool.name}
        </h3>
        <p className="text-gray-600 leading-relaxed mb-5">{tool.summary}</p>

        {/* Pros */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-2">
            Pros
          </h4>
          <ul className="space-y-2">
            {tool.pros.map((pro, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-green-700">
                <svg
                  className="w-4 h-4 text-green-500 mt-0.5 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                {pro}
              </li>
            ))}
          </ul>
        </div>

        {/* Cons */}
        <div className="mb-5">
          <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-2">
            Cons
          </h4>
          <ul className="space-y-2">
            {tool.cons.map((con, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-orange-700">
                <svg
                  className="w-4 h-4 text-orange-500 mt-0.5 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01"
                  />
                </svg>
                {con}
              </li>
            ))}
          </ul>
        </div>

        {/* Pricing + Best for */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-100">
          <div className="flex-1">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Pricing
            </span>
            <p className="text-sm font-medium text-gray-900 mt-1">{tool.pricing}</p>
          </div>
          <div className="flex-1">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Best for
            </span>
            <p className="text-sm font-medium text-gray-900 mt-1">{tool.bestFor}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function FAQSection() {
  return (
    <div className="space-y-4">
      {faqs.map((faq, i) => (
        <details key={i} className="group bg-white border border-gray-200 rounded-lg">
          <summary className="flex items-center justify-between cursor-pointer p-5 text-left">
            <span className="font-medium text-gray-900 pr-4">{faq.q}</span>
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

export default function BestAIVisibilityToolsPage() {
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
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': CANONICAL,
    },
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
              <span className="text-white">AI Visibility Tools</span>
            </nav>

            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 text-sm font-medium rounded-full bg-white/20 text-white">
                Ranked List
              </span>
              <span className="text-purple-200">8 min read</span>
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
        <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          {/* Intro */}
          <div className="bg-gray-900 text-white rounded-xl p-6 mb-8">
            <p className="text-sm leading-relaxed text-gray-200">
              <strong className="text-white">TendorAI analysed 8,625 SRA-registered solicitors across the UK.</strong> Average AI visibility score: 28 out of 100. Not a single firm above 60.
            </p>
          </div>

          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            When a business owner asks ChatGPT &ldquo;recommend a solicitor in Birmingham&rdquo; or &ldquo;best accountant near me&rdquo;, AI models pull from structured data, regulatory listings, and verified online presence to generate their answer. For most UK professional services firms, that answer doesn&apos;t include them.
          </p>

          <p className="text-gray-600 leading-relaxed mb-6">
            The AI visibility tools market has grown quickly, but most tools were built for global brands and marketing teams &mdash; not for FCA-regulated mortgage advisers or SRA-registered solicitors. This comparison covers seven tools honestly, including TendorAI (our own product), with genuine pros and cons for each.
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-10">
            <p className="text-sm text-gray-700">
              <strong>How we ranked these tools:</strong> UK market relevance, structured data capabilities, regulatory data integration, whether the tool actively fixes visibility or only monitors it, and value for professional services firms specifically.
            </p>
          </div>

          {/* Ranked list */}
          <div className="space-y-10">
            {tools.map((tool) => (
              <ToolCard key={tool.rank} tool={tool} />
            ))}
          </div>

          {/* Summary comparison */}
          <h2 className="text-2xl font-bold text-gray-900 mt-14 mb-6">
            How to Choose
          </h2>

          <ul className="list-disc pl-6 space-y-3 text-gray-600 mb-6">
            <li>
              <strong>If you&apos;re a UK solicitor, accountant, mortgage adviser, or estate agent:</strong> TendorAI is the only tool built for your market. Every other tool on this list was built for global brands and adapted to include AI visibility as a feature. TendorAI was built from the SRA, FCA, and ICAEW registers up.
            </li>
            <li>
              <strong>If you want AI mention monitoring without structured data implementation:</strong> Ranketta or Peec AI give you solid tracking at accessible pricing.
            </li>
            <li>
              <strong>If you need traditional SEO alongside basic AI awareness:</strong> SE Ranking or Semrush depending on your budget.
            </li>
            <li>
              <strong>If you have enterprise budget and need deep analytics:</strong> Profound or BrandRank.ai.
            </li>
          </ul>

          <p className="text-gray-600 leading-relaxed mb-10">
            The critical distinction for UK professional services firms is this: monitoring tools tell you that AI isn&apos;t recommending you. TendorAI fixes it. Our analysis of 8,625 UK solicitors found that firms with verified structured data profiles are cited in AI responses 3.2 times more often than those without. The tool you choose should be doing that work, not just reporting on the problem.
          </p>

          {/* CTA Banner */}
          <div className="my-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 md:p-10 text-white text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-3">
              Check Your AI Visibility &mdash; Free
            </h3>
            <p className="text-purple-100 mb-6 max-w-lg mx-auto">
              TendorAI scans ChatGPT, Perplexity, Claude, Gemini, Copilot, and Meta AI and shows you exactly where your firm stands. Free report, no card required.
            </p>
            <Link
              href="/aeo-report"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-purple-700 font-semibold rounded-lg hover:bg-purple-50 transition-colors text-lg"
            >
              Get Your Free AEO Report
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
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">
            Frequently Asked Questions
          </h2>

          <FAQSection />
        </article>
      </main>
    </>
  );
}
