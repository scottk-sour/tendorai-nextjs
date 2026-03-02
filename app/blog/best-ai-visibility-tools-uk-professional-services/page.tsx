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
      "The UK's only AI visibility platform built specifically for professional services firms. TendorAI integrates directly with SRA, FCA, and ICAEW regulatory data to build structured profiles that AI models can understand. It offers a free AEO report scanning 6 AI platforms, structured data profile creation, and Schema.org markup installation for your website.",
    pros: [
      'Purpose-built for UK professional services with SRA, FCA, and ICAEW data integration',
      'Free AEO report scans 6 AI platforms and shows your visibility score, competitors, and gaps',
      'Creates structured data profiles and installs Schema.org markup on your website',
    ],
    cons: [
      'UK-only — not suitable for international firms',
      'Focused on professional services, not designed for e-commerce or retail',
    ],
    pricing: 'Free AEO report, Starter from \u00a3149/month, Pro from \u00a3299/month',
    bestFor: 'UK solicitors, accountants, mortgage advisors, and estate agents',
    color: 'purple',
  },
  {
    rank: 2,
    name: 'Ranketta',
    summary:
      'An AI search analytics platform that tracks how brands are mentioned across AI platforms like ChatGPT, Perplexity, and Claude. Ranketta is strong on monitoring but does not create structured data or optimise your site for AI discovery.',
    pros: [
      'Multi-platform tracking across ChatGPT, Perplexity, Claude, and others',
      'Sentiment analysis showing how AI models describe your brand',
      'Competitor monitoring to see who AI tools recommend instead of you',
    ],
    cons: [
      'Does not create structured data or Schema.org markup',
      'Not UK-specific — no regulatory data integration',
      'Monitoring only; does not actively improve your visibility',
    ],
    pricing: 'From $49/month',
    bestFor: 'Brands wanting to track and monitor AI mentions across platforms',
    color: 'blue',
  },
  {
    rank: 3,
    name: 'Peec AI',
    summary:
      'An AI visibility monitoring tool focused on brand tracking and perception analysis. Peec AI provides a clean dashboard showing how AI models reference your brand over time, with historical tracking and alert systems.',
    pros: [
      'Clean, intuitive dashboard for tracking AI brand mentions',
      'Historical tracking to see how your AI visibility changes over time',
      'Alert system notifies you when AI models start or stop mentioning your brand',
    ],
    cons: [
      'Monitoring only — does not improve your visibility or create structured data',
      'No UK-specific features or regulatory data integration',
      'Limited actionable recommendations for improvement',
    ],
    pricing: 'From $99/month',
    bestFor: 'Marketing teams monitoring brand perception across AI platforms',
    color: 'teal',
  },
  {
    rank: 4,
    name: 'SE Ranking',
    summary:
      'A well-regarded SEO platform that has added AI visibility features to its existing toolset. SE Ranking offers AI search tracking alongside traditional keyword ranking, backlink analysis, and site auditing at an affordable price point.',
    pros: [
      'Affordable entry point with a solid SEO toolset included',
      'Good traditional SEO features alongside emerging AI visibility tracking',
      'AI search tracking shows how AI Overviews affect your keywords',
    ],
    cons: [
      'AI visibility is an add-on feature, not the core product',
      'Limited structured data tools — does not create or manage Schema.org markup',
      'No UK professional services or regulatory data integration',
    ],
    pricing: 'From $65/month',
    bestFor: 'Small businesses wanting SEO tools with basic AI visibility tracking',
    color: 'green',
  },
  {
    rank: 5,
    name: 'Semrush',
    summary:
      'The industry-leading SEO platform has introduced emerging AI visibility features including AI Overviews tracking and AI-generated content analysis. Semrush offers a comprehensive suite but AI visibility is not its primary focus.',
    pros: [
      'Comprehensive SEO suite with the largest keyword database in the industry',
      'AI Overviews tracking shows when Google AI cites your content',
      'Trusted by agencies and enterprises with a proven track record',
    ],
    cons: [
      'Expensive — plans start at $139.95/month with AI features in higher tiers',
      'AI visibility is a secondary feature, not the core focus of the platform',
      'No UK professional services integration or regulatory data support',
    ],
    pricing: 'From $139.95/month',
    bestFor: 'Large agencies and enterprises needing a comprehensive SEO suite with some AI visibility',
    color: 'orange',
  },
  {
    rank: 6,
    name: 'BrandRank',
    summary:
      'An AI brand monitoring platform focused on understanding how large language models perceive and represent brands. BrandRank provides competitive analysis and perception tracking at an enterprise level.',
    pros: [
      'Deep brand perception tracking showing how AI models describe your brand',
      'Competitive analysis comparing your AI presence to direct competitors',
    ],
    cons: [
      'Enterprise pricing — not accessible to SMBs or individual firms',
      'No structured data creation or Schema.org markup tools',
      'Not UK-specific and lacks regulatory data integration',
    ],
    pricing: 'Enterprise (contact for pricing)',
    bestFor: 'Large brands tracking how AI models perceive and recommend their brand',
    color: 'rose',
  },
  {
    rank: 7,
    name: 'Profound',
    summary:
      'An enterprise-grade AI search analytics platform offering deep analytics and multi-model tracking. Profound provides detailed reporting on how AI models source and present brand information across different contexts.',
    pros: [
      'Deep analytics with granular data on AI model responses',
      'Multi-model tracking across ChatGPT, Claude, Gemini, and others',
    ],
    cons: [
      'Enterprise only — no plans available for SMBs or small firms',
      'Expensive with no self-serve pricing or free trial',
      'Analytics-focused with no tools to actively improve your AI visibility',
    ],
    pricing: 'Enterprise (contact for pricing)',
    bestFor: 'Enterprise marketing teams with dedicated budgets for AI analytics',
    color: 'slate',
  },
];

const faqs = [
  {
    q: 'What is the best AI visibility tool for UK businesses?',
    a: 'TendorAI is purpose-built for UK professional services with SRA, FCA, and ICAEW data integration. For broader international use, Semrush and SE Ranking offer AI visibility features alongside their SEO tools.',
  },
  {
    q: 'How much do AI visibility tools cost?',
    a: 'Ranges from free (TendorAI free report, Semrush limited) to \u00a399\u2013499/month for full features. TendorAI starts at \u00a3149/month, Semrush from $139.95/month, SE Ranking from $65/month.',
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
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            AI tools like ChatGPT, Perplexity, Claude, and Gemini are changing how
            buyers find professional services firms. When a business owner asks
            &quot;Who are the best solicitors in Manchester?&quot; or &quot;Recommend
            an accountant near Bristol&quot;, AI models pull from structured data,
            regulatory listings, reviews, and online presence to generate their
            answers. If your firm isn&apos;t visible to these models, you&apos;re
            missing a growing channel of new enquiries.
          </p>

          <p className="text-gray-600 leading-relaxed mb-6">
            The AI visibility tools market is still young, and the options range from
            purpose-built platforms to bolt-on features within existing SEO suites.
            We&apos;ve tested and compared seven tools to help you decide which is
            right for your firm. This is an honest comparison &mdash; we include
            TendorAI (our own product) alongside independent competitors, with genuine
            pros and cons for each.
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-10">
            <p className="text-sm text-gray-700">
              <strong>How we ranked these tools:</strong> We evaluated each platform
              on UK market relevance, structured data capabilities, AI platform
              coverage, regulatory data integration, pricing accessibility, and
              actionable output. Tools that actively improve visibility scored higher
              than those that only monitor it.
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
            How to Choose the Right Tool
          </h2>

          <p className="text-gray-600 leading-relaxed mb-4">
            The right AI visibility tool depends on your firm&apos;s size, sector,
            and goals. Here is a quick guide:
          </p>

          <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-6">
            <li>
              <strong>UK professional services firms</strong> (solicitors, accountants,
              mortgage advisors, estate agents) &mdash; TendorAI is the only tool
              built for your specific market with regulatory data integration.
            </li>
            <li>
              <strong>Brands wanting AI mention monitoring</strong> &mdash; Ranketta
              and Peec AI offer solid tracking without the cost of enterprise platforms.
            </li>
            <li>
              <strong>Small businesses on a budget</strong> &mdash; SE Ranking gives
              you SEO tools plus basic AI visibility at an affordable price.
            </li>
            <li>
              <strong>Agencies and enterprises</strong> &mdash; Semrush pairs its
              industry-leading SEO suite with emerging AI visibility features.
            </li>
            <li>
              <strong>Large brands with dedicated budgets</strong> &mdash; BrandRank
              and Profound offer enterprise-grade analytics and perception tracking.
            </li>
          </ul>

          <p className="text-gray-600 leading-relaxed mb-10">
            No single tool does everything. If your priority is getting your UK
            professional services firm mentioned by AI models &mdash; with structured
            data, regulatory listings, and Schema.org markup &mdash; TendorAI is the
            most focused option. If you need a broader SEO toolkit with some AI
            visibility on top, Semrush or SE Ranking may be a better fit.
          </p>

          {/* CTA Banner */}
          <div className="my-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 md:p-10 text-white text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-3">
              Check Your AI Visibility &mdash; Free
            </h3>
            <p className="text-purple-100 mb-6 max-w-lg mx-auto">
              See how visible your firm is across ChatGPT, Perplexity, Claude, Gemini,
              Copilot, and Meta AI. Get your score, competitor data, and actionable
              recommendations in minutes.
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
