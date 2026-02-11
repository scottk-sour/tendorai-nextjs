import { Metadata } from 'next';
import Link from 'next/link';
import { articles } from '@/lib/content/articles';

const TITLE = 'AI Visibility vs Traditional SEO: Why Your Business Needs Both in 2026';
const DESCRIPTION = 'Traditional SEO is no longer enough. With AI tools like ChatGPT and Gemini reshaping how buyers find suppliers, UK businesses need a new strategy. Here\'s how AI visibility works and what it means for your business.';
const SLUG = 'ai-visibility-vs-seo-agencies';
const PUBLISHED = '2026-02-09';
const CANONICAL = `https://tendorai.com/resources/${SLUG}`;

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

const faqs = [
  {
    q: 'What is AI visibility and how is it different from SEO?',
    a: 'SEO optimises your website to rank in traditional search engine results (Google, Bing). AI visibility ensures your business is mentioned and recommended when buyers use AI tools like ChatGPT, Gemini, Perplexity, and Copilot to find suppliers. SEO targets keyword rankings; AI visibility targets being part of the AI\'s knowledge and recommendations.',
  },
  {
    q: 'How do AI tools like ChatGPT decide which companies to recommend?',
    a: 'AI models build recommendations from structured data, reviews, directory listings, consistent NAP (name, address, phone) information, schema markup on your website, and mentions across trusted sources. Companies with clear, well-structured online presence are far more likely to be recommended.',
  },
  {
    q: 'Do I still need traditional SEO if I focus on AI visibility?',
    a: 'Yes. Traditional SEO and AI visibility complement each other. SEO drives traffic from Google searches, while AI visibility captures the growing segment of buyers using AI tools. Neglecting either means missing potential customers.',
  },
  {
    q: 'How quickly will I see results from AI visibility efforts?',
    a: 'AI models are updated periodically, not in real-time. Initial improvements can take 4-8 weeks to surface in AI recommendations. Consistent effort over 3-6 months typically shows strong, measurable results.',
  },
  {
    q: 'Can small local businesses benefit from AI visibility?',
    a: 'Absolutely. In fact, local businesses often benefit the most because AI tools try to give location-specific recommendations. A well-optimised local business can appear in AI results ahead of larger national competitors.',
  },
  {
    q: 'What does TendorAI actually do to improve my AI visibility?',
    a: 'TendorAI provides an AI Visibility Score showing where you stand, monitors your mentions across AI tools, runs GEO audits on your website, tests real-time AI search results for your category, and gives specific recommendations to improve your visibility. Think of it as a dashboard for your AI presence.',
  },
  {
    q: 'How much does it cost compared to hiring an SEO agency?',
    a: 'TendorAI plans start from free (Listed tier) up to £149/month (Verified tier). A typical SEO agency charges £500-£2,000/month. TendorAI focuses specifically on AI visibility, which most SEO agencies don\'t address at all.',
  },
  {
    q: 'Is AI search actually replacing Google?',
    a: 'Not replacing, but rapidly supplementing. Studies show 25-40% of B2B buyers now use AI tools during their research process. This percentage is growing quarter on quarter. Businesses that ignore AI visibility now will find it harder to catch up later.',
  },
  {
    q: 'What\'s a GEO audit and why do I need one?',
    a: 'A GEO (Generative Engine Optimisation) audit checks whether your website is structured in a way that AI tools can easily understand. It looks at schema markup, meta descriptions, headings, FAQ sections, and other factors that influence how AI models interpret your content.',
  },
];

function StatCard({ value, label, sublabel }: { value: string; label: string; sublabel?: string }) {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm text-center">
      <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">{value}</div>
      <div className="text-sm font-medium text-gray-900">{label}</div>
      {sublabel && <div className="text-xs text-gray-500 mt-1">{sublabel}</div>}
    </div>
  );
}

function ComparisonTable() {
  const rows = [
    { factor: 'Primary goal', seo: 'Rank on Google page 1', aeo: 'Get recommended by AI tools' },
    { factor: 'How users search', seo: '"copier supplier Cardiff"', aeo: '"Who\'s the best copier supplier near Cardiff?"' },
    { factor: 'Traffic source', seo: 'Google/Bing organic clicks', aeo: 'AI-generated answers with citations' },
    { factor: 'Key ranking factors', seo: 'Backlinks, keywords, site speed', aeo: 'Structured data, reviews, mentions, schema' },
    { factor: 'Time to results', seo: '3-6 months', aeo: '4-8 weeks for initial mentions' },
    { factor: 'Typical agency cost', seo: '£500-£2,000/month', aeo: '£0-£149/month with TendorAI' },
    { factor: 'Measurability', seo: 'Google Search Console, rankings', aeo: 'AI mention tracking, visibility scores' },
    { factor: 'Competition awareness', seo: 'Keyword difficulty scores', aeo: 'Most businesses aren\'t doing this yet' },
  ];

  return (
    <div className="overflow-x-auto my-8">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="text-left py-3 px-4 bg-gray-50 text-sm font-semibold text-gray-700 rounded-tl-lg">Factor</th>
            <th className="text-left py-3 px-4 bg-gray-50 text-sm font-semibold text-gray-700">Traditional SEO</th>
            <th className="text-left py-3 px-4 bg-purple-50 text-sm font-semibold text-purple-700 rounded-tr-lg">AI Visibility (AEO)</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
              <td className="py-3 px-4 text-sm font-medium text-gray-900 border-t border-gray-100">{row.factor}</td>
              <td className="py-3 px-4 text-sm text-gray-600 border-t border-gray-100">{row.seo}</td>
              <td className="py-3 px-4 text-sm text-purple-700 font-medium border-t border-gray-100">{row.aeo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PricingCards() {
  const plans = [
    {
      name: 'Listed',
      price: 'Free',
      priceLabel: 'forever',
      features: ['Basic vendor profile', 'AI Visibility Score', '1 GEO Audit', 'Category listing'],
      highlighted: false,
    },
    {
      name: 'Visible',
      price: '£99',
      priceLabel: '/month',
      features: ['Enhanced profile', 'AI Mention Tracking', 'Weekly GEO Audits', 'Live AI Search Tests', 'Product listings (10)', 'Quote request notifications'],
      highlighted: false,
    },
    {
      name: 'Verified',
      price: '£149',
      priceLabel: '/month',
      features: ['Everything in Visible', 'Unlimited products', 'Priority AI indexing', 'Competitor analysis', 'Verified badge', 'Priority support'],
      highlighted: true,
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6 my-8">
      {plans.map((plan) => (
        <div
          key={plan.name}
          className={`rounded-xl p-6 ${
            plan.highlighted
              ? 'border-2 border-purple-500 bg-purple-50/50 relative'
              : 'border border-gray-200 bg-white'
          }`}
        >
          {plan.highlighted && (
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
              Recommended
            </span>
          )}
          <h4 className="text-lg font-semibold text-gray-900">{plan.name}</h4>
          <div className="mt-2 mb-4">
            <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
            <span className="text-sm text-gray-500 ml-1">{plan.priceLabel}</span>
          </div>
          <ul className="space-y-2">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-sm text-gray-600">
                <svg className="w-4 h-4 text-green-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {feature}
              </li>
            ))}
          </ul>
          <Link
            href={plan.highlighted ? '/vendor-signup?plan=verified' : plan.price === 'Free' ? '/vendor-signup' : '/vendor-signup?plan=visible'}
            className={`block text-center mt-6 py-2.5 px-4 rounded-lg text-sm font-medium transition-colors ${
              plan.highlighted
                ? 'bg-purple-600 text-white hover:bg-purple-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Get Started
          </Link>
        </div>
      ))}
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
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

function RelatedArticles() {
  const related = articles
    .filter(a => a.slug !== SLUG)
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <div className="border-t border-gray-200 pt-8 mt-12">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">More Resources</h3>
      <div className="grid md:grid-cols-3 gap-6">
        {related.map((article) => (
          <Link
            key={article.slug}
            href={`/resources/${article.slug}`}
            className="group p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <span className="inline-block px-2 py-0.5 text-xs font-medium rounded-full mb-2 bg-indigo-100 text-indigo-700">
              {article.category}
            </span>
            <h4 className="font-medium text-gray-900 group-hover:text-purple-600 transition-colors line-clamp-2">
              {article.title}
            </h4>
            <p className="text-sm text-gray-500 mt-1">{article.readTime} min read</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function AIVisibilityVsSEOPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: TITLE,
    description: DESCRIPTION,
    author: {
      '@type': 'Organization',
      name: 'TendorAI',
      url: 'https://tendorai.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'TendorAI',
      url: 'https://tendorai.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://tendorai.com/logo.png',
      },
    },
    datePublished: PUBLISHED,
    dateModified: PUBLISHED,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': CANONICAL,
    },
    articleSection: 'AI & Visibility',
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://tendorai.com' },
      { '@type': 'ListItem', position: 2, name: 'Resources', item: 'https://tendorai.com/resources' },
      { '@type': 'ListItem', position: 3, name: TITLE },
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-brand-gradient text-white py-12 md:py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <nav className="text-sm mb-6 text-purple-200">
              <Link href="/" className="hover:text-white">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/resources" className="hover:text-white">Resources</Link>
              <span className="mx-2">/</span>
              <span className="text-white">AI &amp; Visibility</span>
            </nav>

            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 text-sm font-medium rounded-full bg-indigo-100 text-indigo-700">
                AI &amp; Visibility
              </span>
              <span className="text-purple-200">12 min read</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              {TITLE}
            </h1>

            <p className="text-lg text-purple-100 leading-relaxed">
              {DESCRIPTION}
            </p>

            <div className="mt-6 text-sm text-purple-200">
              Published 9 February 2026
            </div>
          </div>
        </section>

        {/* Stat cards */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 -mt-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard value="40%" label="of B2B buyers" sublabel="now use AI tools to research suppliers" />
            <StatCard value="0%" label="of SMEs" sublabel="are optimising for AI visibility" />
            <StatCard value="£0" label="to get started" sublabel="with TendorAI's free tier" />
            <StatCard value="5 min" label="to check" sublabel="your AI Visibility Score" />
          </div>
        </section>

        {/* Article content */}
        <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12">

          {/* Intro */}
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            Something fundamental has changed in how businesses find their suppliers. A growing number of procurement managers, office managers, and business owners are no longer starting their search on Google. Instead, they&apos;re asking AI tools like ChatGPT, Gemini, Perplexity, and Microsoft Copilot questions like:
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-8">
            <p className="text-gray-700 italic mb-3">&quot;Who are the best photocopier suppliers near Cardiff?&quot;</p>
            <p className="text-gray-700 italic mb-3">&quot;Recommend a business telecoms provider in South Wales&quot;</p>
            <p className="text-gray-700 italic">&quot;What CCTV companies should I consider for my warehouse?&quot;</p>
          </div>

          <p className="text-gray-600 leading-relaxed mb-8">
            If your business doesn&apos;t appear in these AI-generated answers, you&apos;re invisible to a fast-growing segment of buyers. Traditional SEO won&apos;t fix this. You need a different approach—and most of your competitors haven&apos;t figured this out yet.
          </p>

          {/* Section: The Shift */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
            The Shift: From Search Engines to Answer Engines
          </h2>

          <p className="text-gray-600 leading-relaxed mb-4">
            For 20 years, getting found online meant one thing: rank on Google. Businesses paid SEO agencies hundreds or thousands of pounds per month to climb the search results. And it worked—because Google was where everyone searched.
          </p>

          <p className="text-gray-600 leading-relaxed mb-4">
            That&apos;s no longer the full picture. AI tools don&apos;t show ten blue links. They give direct answers, complete with company names, comparisons, and recommendations. When someone asks ChatGPT for a copier supplier, it doesn&apos;t link to websites—it <strong>names specific companies</strong>.
          </p>

          <p className="text-gray-600 leading-relaxed mb-8">
            The question is simple: <strong>is your company one of the ones being named?</strong>
          </p>

          {/* Section: What SEO agencies do */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
            What Traditional SEO Agencies Actually Do
          </h2>

          <p className="text-gray-600 leading-relaxed mb-4">
            A good SEO agency focuses on getting your website to rank highly in Google&apos;s search results. Their typical services include:
          </p>

          <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
            <li><strong>Keyword research</strong> — finding terms your customers search for</li>
            <li><strong>On-page optimisation</strong> — improving title tags, headings, content structure</li>
            <li><strong>Technical SEO</strong> — site speed, mobile-friendliness, crawlability</li>
            <li><strong>Link building</strong> — getting other websites to link to yours</li>
            <li><strong>Local SEO</strong> — Google Business Profile, local citations, reviews</li>
            <li><strong>Content creation</strong> — blog posts, landing pages targeting keywords</li>
          </ul>

          <p className="text-gray-600 leading-relaxed mb-8">
            This still matters. Google isn&apos;t going anywhere. But here&apos;s the problem: <strong>almost no SEO agency is optimising for AI tools</strong>. They&apos;re fighting the last war. When your potential customer asks ChatGPT for recommendations, your Google ranking is irrelevant.
          </p>

          {/* Section: What AI visibility means */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
            What AI Visibility Actually Means
          </h2>

          <p className="text-gray-600 leading-relaxed mb-4">
            AI visibility (sometimes called Answer Engine Optimisation or AEO) is about ensuring your business appears when AI tools generate recommendations. This requires a fundamentally different approach:
          </p>

          <div className="grid md:grid-cols-2 gap-4 my-6">
            <div className="bg-purple-50 rounded-lg p-5 border border-purple-100">
              <h4 className="font-semibold text-purple-900 mb-2">Structured Data &amp; Schema</h4>
              <p className="text-sm text-purple-700">AI models rely heavily on structured data to understand what your business does, where you operate, and what you offer. Schema markup is essential.</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-5 border border-purple-100">
              <h4 className="font-semibold text-purple-900 mb-2">Consistent Online Presence</h4>
              <p className="text-sm text-purple-700">Your business name, address, phone number, and services must be consistent across directories, social profiles, and your website.</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-5 border border-purple-100">
              <h4 className="font-semibold text-purple-900 mb-2">Reviews &amp; Reputation</h4>
              <p className="text-sm text-purple-700">AI tools weigh reviews and ratings heavily when deciding which businesses to recommend. More reviews with higher ratings = more mentions.</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-5 border border-purple-100">
              <h4 className="font-semibold text-purple-900 mb-2">Clear, Structured Content</h4>
              <p className="text-sm text-purple-700">FAQ sections, service descriptions, pricing information, and location details help AI models understand and recommend your business accurately.</p>
            </div>
          </div>

          {/* Comparison table */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
            SEO vs AI Visibility: Side-by-Side Comparison
          </h2>

          <p className="text-gray-600 leading-relaxed mb-4">
            Here&apos;s how the two approaches differ across every key factor:
          </p>

          <ComparisonTable />

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-5 my-8">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <div>
                <p className="text-sm font-medium text-amber-800">The early-mover advantage is real</p>
                <p className="text-sm text-amber-700 mt-1">
                  Right now, almost no UK SMEs are optimising for AI visibility. The businesses that start now will establish themselves in AI recommendations before their competitors even realise it&apos;s important.
                </p>
              </div>
            </div>
          </div>

          {/* Section: Why you need both */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
            Why You Need Both (Not One or the Other)
          </h2>

          <p className="text-gray-600 leading-relaxed mb-4">
            This isn&apos;t about abandoning SEO. Google still drives the majority of web traffic, and a strong search presence matters. But relying <em>only</em> on SEO is like having a shop on the high street while ignoring the new shopping centre opening next door.
          </p>

          <p className="text-gray-600 leading-relaxed mb-4">
            The smart strategy for 2026:
          </p>

          <ol className="list-decimal pl-6 space-y-3 text-gray-600 mb-8">
            <li><strong>Maintain your SEO basics</strong> — keep your website technically sound, content fresh, and Google Business Profile updated</li>
            <li><strong>Add AI visibility</strong> — ensure your business is structured for AI tools to find, understand, and recommend</li>
            <li><strong>Monitor both channels</strong> — track Google rankings AND AI mentions to see where your customers are coming from</li>
            <li><strong>Move fast</strong> — the AI visibility space is wide open. Your competitors likely aren&apos;t doing this yet</li>
          </ol>

          {/* Section: What TendorAI does */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
            How TendorAI Helps You Get Visible to AI
          </h2>

          <p className="text-gray-600 leading-relaxed mb-6">
            TendorAI is built specifically for UK B2B suppliers who want to appear when AI tools recommend companies in their category. Here&apos;s what the platform provides:
          </p>

          <div className="space-y-4 mb-8">
            {[
              { title: 'AI Visibility Score', desc: 'A single score (0-100) showing how visible your business is to AI tools, with specific tips to improve.' },
              { title: 'AI Mention Tracking', desc: 'See how often AI tools mention your company when users ask about your category and location. Weekly scans across multiple AI models.' },
              { title: 'Live AI Search Test', desc: 'Run real-time queries against AI tools to see exactly what they say about your business category in your area.' },
              { title: 'GEO Audit', desc: 'A technical audit of your website checking 10 factors that influence AI visibility, from schema markup to content structure.' },
              { title: 'Competitor Analysis', desc: 'See which competitors are being mentioned by AI tools and what they\'re doing differently.' },
              { title: 'Actionable Recommendations', desc: 'Specific, prioritised steps you can take to improve your AI visibility score and mentions.' },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{item.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Pricing */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
            Plans &amp; Pricing
          </h2>

          <p className="text-gray-600 leading-relaxed mb-4">
            TendorAI is a fraction of the cost of a traditional SEO agency, and it addresses the channel that most agencies completely ignore.
          </p>

          <PricingCards />

          {/* CTA Banner */}
          <div className="my-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 md:p-10 text-white text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-3">
              Check Your AI Visibility Score — Free
            </h3>
            <p className="text-purple-100 mb-6 max-w-lg mx-auto">
              Find out if AI tools are recommending your business. Get your visibility score, see where you stand, and get tips to improve.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/vendor-signup"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-purple-700 font-semibold rounded-lg hover:bg-purple-50 transition-colors"
              >
                Get Started Free
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/aeo-report"
                className="inline-flex items-center justify-center px-6 py-3 bg-purple-500/30 text-white font-semibold rounded-lg hover:bg-purple-500/40 transition-colors border border-purple-400/30"
              >
                Try Free AEO Report
              </Link>
            </div>
          </div>

          {/* FAQ */}
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">
            Frequently Asked Questions
          </h2>

          <FAQSection />

          {/* Related */}
          <RelatedArticles />
        </article>
      </main>
    </>
  );
}
