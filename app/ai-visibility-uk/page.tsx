import { Metadata } from 'next';
import Link from 'next/link';

const TITLE = 'AI Visibility UK — Get Recommended by ChatGPT, Perplexity & Claude';
const DESCRIPTION =
  'Improve your AI visibility in the UK. TendorAI helps professional services firms get recommended by ChatGPT, Perplexity, Claude and Google AI. Free AI visibility report.';
const CANONICAL = 'https://www.tendorai.com/ai-visibility-uk';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: CANONICAL,
    images: [{ url: '/logo.png', width: 873, height: 873 }],
  },
  twitter: {
    card: 'summary',
    title: TITLE,
    description: DESCRIPTION,
  },
};

const faqs = [
  {
    q: 'What is AI visibility?',
    a: 'AI visibility is how likely AI assistants like ChatGPT, Perplexity and Claude are to recommend your business when users ask relevant questions. It is different from traditional SEO. AI visibility is measured by the quality of your structured data, how well AI platforms recognise your business as an entity, and how consistently you appear across AI platform responses.',
  },
  {
    q: 'Which AI platforms matter for UK businesses?',
    a: 'The key platforms are ChatGPT (with over 200 million monthly users), Perplexity (the fastest growing AI search engine), Claude (increasingly popular for professional and research queries), Google AI Overviews (shown directly in Google search results), Gemini (Google\'s AI assistant), and Grok (growing rapidly with X/Twitter integration). Each platform pulls data differently, so a multi-platform strategy is essential.',
  },
  {
    q: 'How do I improve my AI visibility in the UK?',
    a: 'Start by creating structured data profiles that AI platforms can easily read. Install Schema.org markup on your website, maintain consistent NAP (name, address, phone) data across the web, get listed on verified directories like TendorAI, and ensure your business information is presented in an AI-readable format. For UK-regulated industries, having your SRA, FCA, or ICAEW details properly structured also helps.',
  },
  {
    q: "What's the difference between SEO and AI visibility?",
    a: 'SEO optimises your website for Google search rankings using keywords and backlinks. AI visibility optimises for AI recommendations using structured data and entity recognition. SEO gets you found on Google; AI visibility gets you recommended by ChatGPT, Perplexity, Claude and other AI assistants. Both matter, but AI visibility is the growth area that most businesses are not yet addressing.',
  },
  {
    q: 'How long does it take to improve AI visibility?',
    a: 'Most businesses see improvements in 2 to 4 weeks after setting up structured data and optimising their online presence. AI platforms continuously update their knowledge bases, so consistency and data quality matter more than speed. The businesses that start now will establish themselves in AI recommendations before their competitors realise it is important.',
  },
];

function ComparisonTable() {
  const rows = [
    {
      factor: 'What it targets',
      seo: 'Google search result rankings',
      aeo: 'AI assistant recommendations',
    },
    {
      factor: 'Data sources',
      seo: 'Web pages, backlinks, anchor text',
      aeo: 'Structured data, entity graphs, directory listings',
    },
    {
      factor: 'Optimisation method',
      seo: 'Keywords, meta tags, link building',
      aeo: 'Schema markup, structured profiles, consistent NAP data',
    },
    {
      factor: 'Timeframe',
      seo: '3-6 months for meaningful results',
      aeo: '2-4 weeks for initial AI mentions',
    },
    {
      factor: 'Measurement',
      seo: 'Google Search Console, keyword rankings',
      aeo: 'AI mention tracking, visibility scores, recommendation frequency',
    },
    {
      factor: 'Who it\'s for',
      seo: 'Any business that wants Google traffic',
      aeo: 'Businesses that want to be recommended by AI assistants',
    },
  ];

  return (
    <div className="overflow-x-auto my-8">
      <table className="w-full border-collapse border border-gray-200 rounded-lg">
        <thead>
          <tr>
            <th className="text-left py-3 px-4 bg-gray-50 text-sm font-semibold text-gray-700 border-b border-gray-200">
              Factor
            </th>
            <th className="text-left py-3 px-4 bg-gray-50 text-sm font-semibold text-gray-700 border-b border-gray-200">
              Traditional SEO
            </th>
            <th className="text-left py-3 px-4 bg-purple-50 text-sm font-semibold text-purple-700 border-b border-gray-200">
              AI Visibility
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}
            >
              <td className="py-3 px-4 text-sm font-medium text-gray-900 border-b border-gray-100">
                {row.factor}
              </td>
              <td className="py-3 px-4 text-sm text-gray-600 border-b border-gray-100">
                {row.seo}
              </td>
              <td className="py-3 px-4 text-sm text-purple-700 font-medium border-b border-gray-100">
                {row.aeo}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

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

export default function AIVisibilityUKPage() {
  const today = new Date().toISOString().split('T')[0];

  const webPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: TITLE,
    url: CANONICAL,
    description: DESCRIPTION,
    datePublished: '2025-01-01',
    dateModified: today,
    publisher: {
      '@type': 'Organization',
      name: 'TendorAI',
      url: 'https://www.tendorai.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.tendorai.com/logo.png',
      },
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-gradient-to-br from-purple-700 via-purple-600 to-indigo-600 text-white py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <p className="text-purple-200 text-sm font-medium uppercase tracking-wide mb-4">
              AI Visibility for UK Businesses
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              AI Visibility UK — Get Recommended by ChatGPT, Perplexity &amp; Claude
            </h1>
            <p className="text-lg md:text-xl text-purple-100 leading-relaxed max-w-3xl mx-auto mb-8">
              The way UK businesses get found is changing. Over 200 million people now use
              ChatGPT every month. When they ask for a solicitor, accountant, or mortgage
              advisor — will your firm be recommended?
            </p>
            <Link
              href="/ai-visibility-report"
              className="inline-flex items-center justify-center bg-white text-purple-700 font-semibold rounded-lg px-8 py-4 text-lg hover:bg-purple-50 transition-colors"
            >
              Check Your AI Visibility — Free
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
        </section>

        {/* Article content */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16">
          {/* Section 1: What AI Visibility Means for UK Businesses in 2026 */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              What AI Visibility Means for UK Businesses in 2026
            </h2>

            <p className="text-gray-600 leading-relaxed mb-4">
              For two decades, getting found online meant ranking on Google. UK professional
              services firms invested heavily in SEO agencies, Google Ads, and content marketing
              to climb the search results. That approach still matters, but the landscape has
              fundamentally shifted.
            </p>

            <p className="text-gray-600 leading-relaxed mb-4">
              Today, a growing number of people looking for professional services skip Google
              entirely. They open ChatGPT and ask &quot;Who are the best solicitors in
              Manchester?&quot; or &quot;Recommend a financial advisor in London for pension
              planning.&quot; ChatGPT alone has over 200 million monthly active users. Perplexity,
              the AI-powered search engine, is the fastest growing search tool in the market.
              Google itself now shows AI Overviews at the top of many search results, answering
              questions directly instead of showing traditional links.
            </p>

            <p className="text-gray-600 leading-relaxed mb-4">
              For UK businesses in regulated industries, this shift carries an important nuance.
              AI platforms draw on structured data to make recommendations, and in the UK, that
              means your SRA registration details (for solicitors), FCA authorisation data (for
              financial services), and ICAEW membership (for accountants) all feed into how AI
              models understand and recommend your firm. If that data is not structured and
              accessible, AI tools may overlook you entirely — even if you have an excellent
              reputation and a strong Google ranking.
            </p>

            <p className="text-gray-600 leading-relaxed">
              AI visibility is the measure of how likely these AI platforms are to mention and
              recommend your business. It is not the same as SEO. It requires a different
              strategy, different data, and different tools.
            </p>
          </section>

          {/* Section 2: Which AI Platforms Matter */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Which AI Platforms Matter for UK Businesses
            </h2>

            <p className="text-gray-600 leading-relaxed mb-6">
              Not all AI platforms are equal, and each one discovers and recommends businesses
              differently. Here are the six platforms that matter most for UK professional
              services firms in 2026.
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-purple-50 rounded-lg p-5 border border-purple-100">
                <h3 className="font-semibold text-purple-900 mb-2">ChatGPT</h3>
                <p className="text-sm text-purple-700">
                  The largest AI assistant with over 200 million monthly users. ChatGPT draws on
                  a vast training dataset and increasingly uses real-time web browsing to make
                  business recommendations. It is the most common tool people use when asking
                  for professional service recommendations.
                </p>
              </div>
              <div className="bg-purple-50 rounded-lg p-5 border border-purple-100">
                <h3 className="font-semibold text-purple-900 mb-2">Perplexity</h3>
                <p className="text-sm text-purple-700">
                  The fastest growing AI search engine, purpose-built for research queries.
                  Perplexity cites its sources, making it popular with users who want
                  transparency. It actively crawls the web for current information, so having
                  well-structured online data directly impacts whether your firm appears.
                </p>
              </div>
              <div className="bg-purple-50 rounded-lg p-5 border border-purple-100">
                <h3 className="font-semibold text-purple-900 mb-2">Claude</h3>
                <p className="text-sm text-purple-700">
                  Anthropic&apos;s AI assistant is increasingly popular for professional and
                  research-grade queries. Claude is favoured by users in legal, financial, and
                  consulting sectors, making it especially relevant for UK professional services
                  firms targeting sophisticated clients.
                </p>
              </div>
              <div className="bg-purple-50 rounded-lg p-5 border border-purple-100">
                <h3 className="font-semibold text-purple-900 mb-2">Google AI Overviews</h3>
                <p className="text-sm text-purple-700">
                  Google now shows AI-generated summaries at the top of many search results. These
                  overviews answer questions directly and often recommend specific businesses.
                  Even users who start on Google may never scroll past the AI Overview to see
                  traditional search results.
                </p>
              </div>
              <div className="bg-purple-50 rounded-lg p-5 border border-purple-100">
                <h3 className="font-semibold text-purple-900 mb-2">Gemini</h3>
                <p className="text-sm text-purple-700">
                  Google&apos;s dedicated AI assistant is deeply integrated with Google Search,
                  Google Maps, and the wider Google ecosystem. Gemini pulls from Google&apos;s
                  knowledge graph, so having accurate Google Business Profile data and strong
                  local SEO signals directly supports your Gemini visibility.
                </p>
              </div>
              <div className="bg-purple-50 rounded-lg p-5 border border-purple-100">
                <h3 className="font-semibold text-purple-900 mb-2">Grok</h3>
                <p className="text-sm text-purple-700">
                  Built by xAI and integrated into X (formerly Twitter), Grok is growing rapidly
                  and combines real-time social data with broader web knowledge. For businesses
                  with active social profiles and thought leadership content, Grok represents an
                  emerging channel for AI-driven discovery.
                </p>
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed">
              Each platform uses different data sources and algorithms. A business that is
              visible on ChatGPT may be invisible on Perplexity. That is why a comprehensive AI
              visibility strategy needs to address all major platforms, not just one.
            </p>
          </section>

          {/* Section 3: How TendorAI Measures and Improves AI Visibility */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              How TendorAI Measures and Improves AI Visibility
            </h2>

            <p className="text-gray-600 leading-relaxed mb-6">
              TendorAI is built specifically to help UK professional services firms become
              visible to AI platforms. The platform takes a data-first approach: rather than
              chasing keywords and backlinks, TendorAI focuses on making your business data
              structured, consistent, and AI-readable.
            </p>

            <div className="space-y-4 mb-8">
              {[
                {
                  title: 'Structured Data Profiles',
                  desc: 'TendorAI creates rich, structured profiles for your firm with Schema.org markup, service taxonomies, regulatory details, and location data. This is the foundation that AI platforms use to understand and recommend businesses.',
                },
                {
                  title: 'Schema.org Markup Installation',
                  desc: 'Your website needs proper schema markup for AI tools to parse your services, reviews, contact details, and FAQs. TendorAI audits your existing markup and provides specific recommendations through our GEO Audit tool.',
                },
                {
                  title: 'Structured Directory Profile',
                  desc: 'Being listed on a verified, structured directory gives AI platforms a trusted source to draw from. TendorAI\'s directory is purpose-built for AI readability, with consistent data formats that AI models prefer.',
                },
                {
                  title: 'AI Visibility Monitoring',
                  desc: 'TendorAI tracks how often AI platforms mention your firm across real user queries. The AI Mention Tracking feature scans multiple AI platforms weekly, showing you exactly where you stand and how your visibility is changing over time.',
                },
                {
                  title: 'Free AI Visibility Report',
                  desc: 'The starting point for any business. TendorAI\'s free AI visibility report analyses your website and online presence, scoring your AI readiness across 10 key factors and providing actionable recommendations to improve.',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg"
                >
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center shrink-0 mt-0.5">
                    <svg
                      className="w-4 h-4 text-purple-600"
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
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-gray-600 leading-relaxed">
              The approach is straightforward: make your business data clean, structured, and
              available in the formats that AI platforms consume. Then monitor the results and
              iterate. Most firms see measurable improvements in AI mentions within 2 to 4
              weeks of setting up their TendorAI profile.
            </p>
          </section>

          {/* Section 4: SEO vs AI Visibility */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              SEO vs AI Visibility: What&apos;s the Difference?
            </h2>

            <p className="text-gray-600 leading-relaxed mb-4">
              SEO and AI visibility are complementary strategies, not replacements for each
              other. Traditional SEO optimises your website for Google&apos;s search algorithm.
              AI visibility optimises your business data for AI recommendation engines. Both
              matter, but AI visibility is the growth area that most UK businesses have not yet
              addressed.
            </p>

            <p className="text-gray-600 leading-relaxed mb-4">
              The key distinction: SEO helps people find your website through search engines. AI
              visibility helps AI assistants recommend your business directly to users —
              often before they visit any website at all.
            </p>

            <ComparisonTable />

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-5 my-8">
              <div className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-amber-500 mt-0.5 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <p className="text-sm font-medium text-amber-800">
                    Both strategies matter
                  </p>
                  <p className="text-sm text-amber-700 mt-1">
                    Do not abandon SEO in favour of AI visibility. The smartest approach is to
                    maintain your existing SEO while adding AI visibility as a growth channel.
                    Businesses that address both will capture customers from traditional search
                    and AI recommendations.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: FAQ */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions About AI Visibility in the UK
            </h2>

            <FAQSection />
          </section>

          {/* CTA Banner */}
          <section className="my-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 md:p-10 text-white text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Find Out If AI Is Recommending Your Business
            </h2>
            <p className="text-purple-100 mb-6 max-w-lg mx-auto">
              Run a free AI visibility report for your website. See your score, find out which
              AI platforms know about your business, and get specific steps to improve.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/ai-visibility-report"
                className="inline-flex items-center justify-center bg-white text-purple-700 font-semibold rounded-lg px-8 py-4 text-lg hover:bg-purple-50 transition-colors"
              >
                Check Your AI Visibility — Free
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
          </section>

          {/* Internal links */}
          <section className="border-t border-gray-200 pt-8 mt-12">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Learn More
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              <Link
                href="/for-vendors"
                className="group p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <h3 className="font-medium text-gray-900 group-hover:text-purple-600 transition-colors">
                  For Firms
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  See how TendorAI helps UK firms get recommended by AI platforms.
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
                  Read the latest on AI visibility, AI visibility, and structured data strategy.
                </p>
              </Link>
              <Link
                href="/aeo-report-uk"
                className="group p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <h3 className="font-medium text-gray-900 group-hover:text-purple-600 transition-colors">
                  AI Visibility Report UK
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Get a free AI visibility audit for your UK business website.
                </p>
              </Link>
            </div>
          </section>
        </article>
      </main>
    </>
  );
}
