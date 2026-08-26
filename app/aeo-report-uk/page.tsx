import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'AI Visibility Report UK — Free AI Visibility Audit for UK Businesses',
  description:
    'Get a free AI visibility report for your UK business. See how ChatGPT, Perplexity and Claude see your company. AI Visibility score, competitor analysis and actionable gaps in 60 seconds.',
  alternates: {
    canonical: 'https://www.tendorai.com/aeo-report-uk',
  },
  openGraph: {
    type: 'website',
    url: 'https://www.tendorai.com/aeo-report-uk',
    title: 'AI Visibility Report UK — Free AI Visibility Audit for UK Businesses',
    description:
      'Get a free AI visibility report for your UK business. See how ChatGPT, Perplexity and Claude see your company. AI Visibility score, competitor analysis and actionable gaps in 60 seconds.',
    siteName: 'TendorAI',
    locale: 'en_GB',
    images: [{ url: '/logo.png', width: 873, height: 873, alt: 'TendorAI AI Visibility Report UK' }],
  },
  twitter: {
    card: 'summary',
    title: 'AI Visibility Report UK — Free AI Visibility Audit for UK Businesses',
    description:
      'Get a free AI visibility report for your UK business. See how ChatGPT, Perplexity and Claude see your company.',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const faqs = [
  {
    q: 'What is an AI visibility report?',
    a: 'An AI visibility report measures how visible your business is to AI platforms like ChatGPT, Perplexity, and Claude. It analyses whether these AI assistants mention and recommend your company when potential customers ask for businesses in your category and location. Think of it as an SEO audit, but for the AI-powered search engines that are rapidly replacing traditional Google searches.',
  },
  {
    q: 'How do I get a free AI visibility report for my UK business?',
    a: 'Go to tendorai.com/ai-visibility-report, enter your company name, business category (e.g. solicitor, accountant, mortgage advisor), city, and email address. TendorAI queries six major AI platforms in real time and delivers your full AI visibility report in approximately 60 seconds. No signup or payment is required for the free report.',
  },
  {
    q: 'What does an AI visibility report measure?',
    a: 'An AI visibility report measures six key scoring areas: AI mentions (whether AI platforms name your business), position ranking (where you appear in AI recommendations), competitor analysis (who AI recommends instead of you), data completeness (how well AI understands your services), structured data quality (whether your website is optimised for AI crawlers), and overall online presence (your combined visibility across all AI platforms).',
  },
  {
    q: 'How is an AI visibility report different from an SEO audit?',
    a: 'SEO audits focus on Google rankings, backlinks, keyword optimisation, and technical website performance. AI visibility reports measure whether AI assistants like ChatGPT, Claude, and Perplexity can find and recommend your business. The data sources are different, the ranking factors are different, and the optimisation strategies are different. SEO targets search engine results pages; AI visibility targets AI-generated answers and recommendations.',
  },
  {
    q: 'Which UK businesses need an AI visibility report?',
    a: 'Any professional services firm that relies on clients finding them through search should get an AI visibility report. This includes solicitors, accountants, mortgage advisors, estate agents, IT providers, and telecoms companies. Essentially, if your potential clients might ask an AI assistant for recommendations in your industry, you need to know whether AI is recommending you or your competitors.',
  },
];

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'AI Visibility Report UK — Free AI Visibility Audit for UK Businesses',
  description:
    'Get a free AI visibility report for your UK business. See how ChatGPT, Perplexity and Claude see your company. AI Visibility score, competitor analysis and actionable gaps in 60 seconds.',
  url: 'https://www.tendorai.com/aeo-report-uk',
  datePublished: '2025-01-01',
  dateModified: new Date().toISOString().split('T')[0],
  publisher: {
    '@type': 'Organization',
    name: 'TendorAI',
    url: 'https://www.tendorai.com',
  },
};

const faqSchema = {
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

export default function AeoReportUkPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="min-h-screen bg-white pt-16">
        {/* Hero */}
        <section className="bg-brand-gradient text-white py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <span className="text-sm font-medium">Free AI visibility report for UK businesses</span>
            </div>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              AI Visibility Report UK &mdash; Free AI Visibility Audit for UK Businesses
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10">
              Over 200 million people now use AI assistants instead of Google. Find out if
              ChatGPT, Perplexity, and Claude recommend your business &mdash; or your
              competitors. Free results in 60 seconds.
            </p>
            <Link
              href="/ai-visibility-report"
              className="inline-flex items-center justify-center bg-white text-[var(--purple-start)] px-8 py-4 rounded-lg font-bold hover:bg-purple-50 transition-all shadow-lg text-lg"
            >
              Get Your Free AI Visibility Report
            </Link>
          </div>
        </section>

        {/* Article content */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

          {/* What is an AI Visibility Report? */}
          <section className="mb-14">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              What Is an AI Visibility Report?
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              AI visibility stands for Answer Engine Optimisation. An AI visibility report is a comprehensive audit
              that measures how visible your business is to AI-powered platforms &mdash; the
              &quot;answer engines&quot; that are rapidly changing how people find and choose
              businesses in the UK.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Traditional SEO focused on getting your website to rank on Google&apos;s search
              results pages. That still matters, but the landscape has shifted dramatically. In
              2026, millions of UK consumers and business buyers are bypassing Google entirely.
              Instead, they ask AI assistants like ChatGPT, Perplexity, Google Gemini, Claude,
              Microsoft Copilot, and Meta AI direct questions:
            </p>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-6">
              <p className="text-gray-700 italic mb-3">&quot;Who are the best solicitors in Manchester?&quot;</p>
              <p className="text-gray-700 italic mb-3">&quot;Recommend an accountant for a small business in Birmingham&quot;</p>
              <p className="text-gray-700 italic">&quot;Which mortgage advisors have the best reviews in Leeds?&quot;</p>
            </div>
            <p className="text-gray-600 leading-relaxed mb-4">
              These AI platforms don&apos;t show ten blue links. They give direct answers, naming
              specific companies and explaining why they recommend them. If your business
              isn&apos;t part of that conversation, you&apos;re invisible to a fast-growing
              segment of potential clients.
            </p>
            <p className="text-gray-600 leading-relaxed">
              An AI visibility report tells you exactly where you stand. It queries multiple AI platforms
              using the same questions your potential customers are asking, and shows you whether
              AI mentions your business, how you rank against competitors, and what specific
              steps you can take to improve your AI visibility.
            </p>
          </section>

          {/* What Does TendorAI's AI Visibility Report Measure? */}
          <section className="mb-14">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              What Does TendorAI&apos;s AI Visibility Report Measure?
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              TendorAI&apos;s AI visibility report analyses your business across six key scoring
              categories, giving you a complete picture of your AI visibility in the UK market.
            </p>
            <div className="grid sm:grid-cols-2 gap-6 mb-6">
              <div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
                <h3 className="font-semibold text-purple-900 mb-2">AI Platform Mentions</h3>
                <p className="text-sm text-purple-700">
                  We check whether ChatGPT, Perplexity, Claude, Gemini, Copilot, and Meta AI
                  mention your business by name when users ask for recommendations in your
                  category and location. This is the most fundamental measure of AI visibility.
                </p>
              </div>
              <div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
                <h3 className="font-semibold text-purple-900 mb-2">Position in Recommendations</h3>
                <p className="text-sm text-purple-700">
                  Being mentioned is good, but position matters. We track where your business
                  appears in the list of recommendations &mdash; first, third, or buried at the
                  bottom. Higher positions mean more trust from AI and more clicks from users.
                </p>
              </div>
              <div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
                <h3 className="font-semibold text-purple-900 mb-2">Competitor Landscape</h3>
                <p className="text-sm text-purple-700">
                  Your AI visibility report reveals exactly which competitors AI platforms recommend
                  instead of (or alongside) you. Understanding who AI favours helps you
                  identify what they are doing right and where you can overtake them.
                </p>
              </div>
              <div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
                <h3 className="font-semibold text-purple-900 mb-2">Data Completeness</h3>
                <p className="text-sm text-purple-700">
                  AI platforms build their recommendations from data they can find about your
                  business. We identify gaps &mdash; missing service descriptions, incomplete
                  location data, absent accreditations &mdash; and show you exactly what to add.
                </p>
              </div>
              <div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
                <h3 className="font-semibold text-purple-900 mb-2">Structured Data Quality</h3>
                <p className="text-sm text-purple-700">
                  Schema markup and structured data are how AI understands your business at a
                  machine level. We audit whether your website has the right schema types,
                  correct formatting, and sufficient detail for AI crawlers to parse.
                </p>
              </div>
              <div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
                <h3 className="font-semibold text-purple-900 mb-2">Overall AI Visibility Score</h3>
                <p className="text-sm text-purple-700">
                  All of these factors roll up into a single AI Visibility score from 0 to 100.
                  This gives you a clear benchmark to track over time and compare against
                  competitors in your category and location.
                </p>
              </div>
            </div>
          </section>

          {/* How It Differs From a Traditional SEO Audit */}
          <section className="mb-14">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              How an AI Visibility Report Differs From a Traditional SEO Audit
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              SEO and AI visibility are complementary but fundamentally different disciplines. A
              traditional SEO audit examines your Google rankings, backlink profile, keyword
              targeting, site speed, and technical health. It tells you how well your website
              performs in conventional search engine results.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              An AI visibility report, by contrast, measures whether AI assistants can find, understand,
              and recommend your business. The data sources are different: AI models draw from
              structured data, directory listings, reviews, schema markup, and trusted references
              rather than just crawling web pages for keywords. The ranking factors are different
              too &mdash; backlinks matter for Google, but AI platforms weigh entity recognition,
              data consistency, and structured content far more heavily.
            </p>
            <div className="overflow-x-auto my-8">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="text-left py-3 px-4 bg-gray-50 text-sm font-semibold text-gray-700 rounded-tl-lg">Factor</th>
                    <th className="text-left py-3 px-4 bg-gray-50 text-sm font-semibold text-gray-700">SEO Audit</th>
                    <th className="text-left py-3 px-4 bg-purple-50 text-sm font-semibold text-purple-700 rounded-tr-lg">AI Visibility Report</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { factor: 'Focus', seo: 'Google rankings and organic traffic', aeo: 'AI recommendations and mentions' },
                    { factor: 'Key signals', seo: 'Backlinks, keywords, page speed', aeo: 'Structured data, reviews, schema markup' },
                    { factor: 'User behaviour', seo: 'Typed search queries', aeo: 'Conversational AI questions' },
                    { factor: 'Output', seo: 'Website position in search results', aeo: 'Named business recommendations' },
                    { factor: 'Growth trajectory', seo: 'Mature and competitive', aeo: 'Rapidly growing, early-mover advantage' },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                      <td className="py-3 px-4 text-sm font-medium text-gray-900 border-t border-gray-100">{row.factor}</td>
                      <td className="py-3 px-4 text-sm text-gray-600 border-t border-gray-100">{row.seo}</td>
                      <td className="py-3 px-4 text-sm text-purple-700 font-medium border-t border-gray-100">{row.aeo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Both matter. SEO drives traffic from Google; AI visibility captures the growing wave of
              users who ask AI for direct answers. The businesses that invest in both will
              dominate their categories. But AI visibility is where the growth is happening right now
              &mdash; and most UK businesses haven&apos;t started yet.
            </p>
          </section>

          {/* What You Get in the Free Report */}
          <section className="mb-14">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              What You Get in the Free AI Visibility Report
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              TendorAI&apos;s free AI visibility report gives you a detailed snapshot of your AI
              visibility, delivered in approximately 60 seconds with no signup required. Here
              is exactly what is included:
            </p>
            <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 sm:p-8">
              <ul className="space-y-4">
                {[
                  {
                    title: 'AI Visibility Score (0-100)',
                    desc: 'A single, clear score summarising how visible your business is across all major AI platforms.',
                  },
                  {
                    title: 'Which AI Platforms Mention You',
                    desc: 'See exactly which of the six AI platforms (ChatGPT, Claude, Perplexity, Gemini, Copilot, Meta AI) name your business in recommendations.',
                  },
                  {
                    title: 'Who AI Recommends Instead',
                    desc: 'Find out which competitors AI platforms recommend when customers search for businesses in your category and location.',
                  },
                  {
                    title: 'Specific Gaps and How to Fix Them',
                    desc: 'Actionable recommendations showing exactly what to improve — from missing structured data to incomplete business information.',
                  },
                  {
                    title: 'Downloadable PDF Report',
                    desc: 'Take your results offline. Share them with your team or marketing agency to align your AI visibility strategy.',
                  },
                  {
                    title: 'Results From 6 AI Platforms',
                    desc: 'We query ChatGPT, Claude, Perplexity, Gemini, Copilot, and Meta AI in real time — not cached or estimated results.',
                  },
                ].map((item) => (
                  <li key={item.title} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-3.5 h-3.5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">{item.title}</span>
                      <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* CTA */}
          <section className="mb-14">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 md:p-10 text-white text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                Find Out How AI Sees Your Business
              </h2>
              <p className="text-purple-100 mb-6 max-w-lg mx-auto">
                Enter your company name and get your free AI visibility report in 60 seconds. No signup.
                No payment. Just clear answers.
              </p>
              <Link
                href="/ai-visibility-report"
                className="inline-flex items-center justify-center bg-white text-purple-700 px-8 py-4 rounded-lg font-bold hover:bg-purple-50 transition-all shadow-lg text-lg"
              >
                Get Your Free AI Visibility Report
              </Link>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-14">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
              AI Visibility Report UK &mdash; Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {faqs.map((faq, i) => (
                <div key={i} className="border-b border-gray-200 pb-6 last:border-0">
                  <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Internal links */}
          <section className="border-t border-gray-200 pt-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Learn More About AI Visibility
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Explore more about how AI is changing the way UK businesses are found, and what you
              can do to stay ahead.
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              <Link
                href="/ai-visibility-platform"
                className="group p-5 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors border border-gray-100"
              >
                <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors mb-1">
                  For Firms
                </h3>
                <p className="text-sm text-gray-500">
                  See how TendorAI helps UK businesses get recommended by AI platforms.
                </p>
              </Link>
              <Link
                href="/blog"
                className="group p-5 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors border border-gray-100"
              >
                <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors mb-1">
                  Blog
                </h3>
                <p className="text-sm text-gray-500">
                  Read the latest on AI visibility, AI visibility strategy, and growing your business.
                </p>
              </Link>
              <Link
                href="/ai-visibility-uk"
                className="group p-5 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors border border-gray-100"
              >
                <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors mb-1">
                  AI Visibility Tool
                </h3>
                <p className="text-sm text-gray-500">
                  Check whether AI platforms recommend your business right now.
                </p>
              </Link>
            </div>
          </section>
        </article>
      </main>
    </>
  );
}
