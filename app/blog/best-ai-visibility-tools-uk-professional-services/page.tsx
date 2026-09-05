import { Metadata } from 'next';
import Link from 'next/link';

const TITLE = 'Best AI Visibility Tools in the UK (2026 Comparison)';
const DESCRIPTION =
  'Compare the best AI visibility tools for UK businesses in 2026. TendorAI, Peec AI, OtterlyAI, Profound, SE Ranking, Semrush, and manual schema — ranked by UK relevance and whether they fix or just monitor.';
const CANONICAL = 'https://www.tendorai.com/blog/best-ai-visibility-tools-uk-professional-services';
const PUBLISHED = '2026-03-01';
const UPDATED = '2026-09-05';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: 'article',
    publishedTime: PUBLISHED,
    modifiedTime: UPDATED,
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
      'TendorAI is the only AI visibility platform built from UK regulatory register data \u2014 SRA, ICAEW, and FCA. For professional services firms, profiles are pre-built before sign-up. For general UK businesses, the platform installs AI-optimised schema markup on their website and measures visibility monthly across ChatGPT, Google AI Overviews and Perplexity.',
    differentiator:
      'The key differentiator is implementation. Every other tool on this list monitors AI visibility and tells you what is wrong. TendorAI installs the fix \u2014 schema markup on the website within 48 hours, auto-syncing every time the dashboard is updated, no developer required.',
    features: [
      'Schema installation on any website within 48 hours \u2014 done for you',
      'Auto-sync: dashboard update instantly updates website schema',
      'Weekly AI visibility scans across ChatGPT, Perplexity, Gemini, Claude, Grok, and Meta AI',
      'Pre-built profiles from SRA, ICAEW, and FCA register data for 12,793+ UK firms',
      'Free AI visibility report showing current AI Visibility Score and competitor data',
      'AI blog writer generating structured content automatically',
      'TendorAI Verified badge for website and profile',
    ],
    pricing: 'Free / Managed programme',
    ukFocus: 'Built specifically for UK regulated professional services. Regulatory data integration is unique to this platform.',
    verdict: 'The only UK-native AI visibility platform with done-for-you implementation. If you want AI to recommend your business without managing it yourself, this is the starting point.',
    bestFor: 'UK professional services firms and SMEs that want done-for-you AI visibility with regulatory data built in',
    color: 'purple',
  },
  {
    rank: 2,
    name: 'Peec AI',
    summary:
      'Peec AI monitors how often your brand appears in AI responses across a defined set of tracked prompts. You set the questions, it tracks whether you appear, at what position, and how your share of voice compares to competitors over time.',
    differentiator:
      'The dashboard is genuinely useful for businesses with a marketing resource that can act on the data. The gap is implementation \u2014 Peec AI tells you where you are not appearing but does not help you fix it.',
    features: [
      'Multi-platform AI mention tracking',
      'Custom prompt library',
      'Competitor benchmarking',
      'Share of voice trend data',
    ],
    pricing: 'From approximately $99/month \u2014 USD pricing, no UK-specific tier',
    ukFocus: 'No UK regulatory data integration. Generic tool built for any market.',
    verdict: 'Strong monitoring tool. Useful alongside TendorAI\u2019s implementation layer. Not a standalone solution for businesses that need to fix visibility gaps, not just track them.',
    bestFor: 'Marketing teams that want detailed prompt-level tracking across AI platforms',
    color: 'blue',
  },
  {
    rank: 3,
    name: 'OtterlyAI',
    summary:
      'OtterlyAI positions as the more accessible entry point to AI visibility monitoring. Simpler dashboard, lower price, aimed at smaller businesses without dedicated marketing teams. Tracks AI mentions and provides basic recommendations for improvement.',
    differentiator: null,
    features: [
      'AI mention monitoring across major platforms',
      'Basic competitor tracking',
      'Visibility score and simple reporting',
      'Lower price point than most competitors',
    ],
    pricing: 'Lower tier than most competitors \u2014 check otterly.ai for current pricing',
    ukFocus: 'No UK-specific data or regulatory integration. Generic platform.',
    verdict: 'Reasonable starting point for small businesses wanting basic monitoring. Does not implement anything. Useful for awareness, not for fixing the underlying problem.',
    bestFor: 'SMBs wanting accessible AI visibility monitoring at a lower price point',
    color: 'teal',
  },
  {
    rank: 4,
    name: 'Profound',
    summary:
      'Profound raised $96 million and targets Fortune 500 brands in the US. It is the most sophisticated AI visibility platform available \u2014 deep AI response analysis, enterprise-scale prompt libraries, brand perception tracking across hundreds of queries simultaneously.',
    differentiator: 'It is almost entirely irrelevant to a UK SME or professional services firm.',
    features: [
      'Enterprise AI response analysis',
      'Large-scale prompt monitoring',
      'Brand perception intelligence',
      'Competitive intelligence at scale',
    ],
    pricing: 'Enterprise \u2014 estimated five figures annually, not publicly disclosed',
    ukFocus: 'US-built, US-focused, US-priced. Not designed for UK market requirements.',
    verdict: 'The benchmark for enterprise AI visibility. Listed here because it appears in searches and comparisons \u2014 do not evaluate it for a UK SME or professional services context. Profound is chasing Nike and Salesforce. TendorAI is built for your market.',
    bestFor: 'Enterprise brands managing AI brand perception at scale',
    color: 'slate',
  },
  {
    rank: 5,
    name: 'SE Ranking',
    summary:
      'SE Ranking is primarily an SEO platform that has added AI visibility and GEO (Generative Engine Optimisation) features. If you already pay for SE Ranking, the AI features extend what you have without requiring a separate subscription.',
    differentiator: null,
    features: [
      'Traditional SEO rank tracking',
      'Google AI Overview monitoring',
      'Basic structured data audit',
      'Good UK keyword database',
    ],
    pricing: 'From approximately \u00a344/month for base plan',
    ukFocus: 'Partial \u2014 strong UK SEO database but AI visibility features are not UK-specific.',
    verdict: 'Worth using if you already subscribe. Not a specialist AI visibility tool \u2014 the GEO features are secondary to the core SEO product. Does not install anything on your website.',
    bestFor: 'Businesses already using SE Ranking for SEO that want to add basic AI visibility tracking',
    color: 'green',
  },
  {
    rank: 6,
    name: 'Semrush',
    summary:
      'Semrush has added AI visibility features to its existing platform \u2014 AI Overview tracking, brand monitoring, and content gap analysis for AI search. The AI toolkit is genuinely capable but it sits inside a broader platform that costs significantly more than AI-only tools.',
    differentiator: null,
    features: [
      'AI Overview position tracking in Google',
      'Brand mention monitoring',
      'Content gap analysis',
      'Established platform with large UK dataset',
    ],
    pricing: 'From \u00a399/month',
    ukFocus: 'Partial \u2014 strong UK SEO coverage but AI features not specifically built for UK market.',
    verdict: 'Expensive for what the AI-specific features deliver. The SEO tools are industry-leading but if AI visibility is your primary concern, you are paying for a lot of tools you do not need.',
    bestFor: 'Businesses with a full-time marketing resource managing SEO and content strategy',
    color: 'orange',
  },
  {
    rank: 7,
    name: 'Manual Schema Implementation',
    summary:
      'Implementing Schema.org markup manually without a platform is entirely viable. A developer adds the JSON-LD code to your website, AI crawlers pick it up, and your visibility improves over time. No monthly platform fee.',
    differentiator: null,
    features: [
      'One-off cost',
      'Full control over markup',
      'No ongoing platform subscription',
    ],
    pricing: 'Typically \u00a3500\u2013\u00a31,500 for initial implementation. Ongoing maintenance charged per update.',
    ukFocus: 'As UK-specific as your developer makes it \u2014 depends entirely on their knowledge of UK regulatory schema requirements.',
    verdict: 'Works for the initial installation. The problem is ongoing maintenance. Every time you add a service, update pricing, gain an accreditation, or change your fee structure, you need a developer. Every update that does not happen is a visibility gap opening up. TendorAI\u2019s auto-sync eliminates this problem entirely.',
    bestFor: 'Businesses with a developer on retainer who want full control over their structured data',
    color: 'rose',
  },
];

const comparisonRows = [
  { tool: 'TendorAI', type: 'AI Visibility Platform', ukData: '\u2705 Yes', fixes: '\u2705 Yes', tracks: '\u2705 Yes', price: 'Free / \u00a31,499/mo' },
  { tool: 'Peec AI', type: 'Monitoring', ukData: '\u274c No', fixes: '\u274c No', tracks: '\u2705 Yes', price: '~$99/mo' },
  { tool: 'OtterlyAI', type: 'Monitoring', ukData: '\u274c No', fixes: '\u274c No', tracks: '\u2705 Yes', price: 'Lower tier' },
  { tool: 'Profound', type: 'Enterprise', ukData: '\u274c No', fixes: '\u274c No', tracks: '\u2705 Yes', price: 'Enterprise' },
  { tool: 'SE Ranking', type: 'SEO Tool', ukData: '\u26a0\ufe0f Partial', fixes: '\u274c No', tracks: '\u26a0\ufe0f Limited', price: 'From \u00a344/mo' },
  { tool: 'Semrush', type: 'SEO Suite', ukData: '\u26a0\ufe0f Partial', fixes: '\u274c No', tracks: '\u26a0\ufe0f Limited', price: 'From \u00a399/mo' },
  { tool: 'Manual Schema', type: 'DIY', ukData: '\u26a0\ufe0f Depends', fixes: '\u2705 Yes', tracks: '\u274c No', price: '\u00a3500\u2013\u00a31,500' },
];

const faqs = [
  {
    q: 'What is the best AI visibility tool for UK businesses?',
    a: 'For UK businesses \u2014 particularly professional services firms \u2014 TendorAI is the most relevant option because it is the only platform built from UK regulatory register data and includes done-for-you schema installation. Monitoring tools like Peec AI and OtterlyAI are useful additions but do not fix visibility gaps on their own.',
  },
  {
    q: 'What is the difference between AI visibility and SEO?',
    a: 'SEO improves your ranking in Google\u2019s list of ten results. AI visibility determines whether you appear in the two or three recommendations an AI assistant gives when someone asks for a business recommendation. The mechanisms are different \u2014 SEO relies on backlinks and keyword relevance; AI visibility relies on structured data, entity verification, and regulatory credential confirmation.',
  },
  {
    q: 'Do UK businesses need a specialist AI visibility tool?',
    a: 'Yes, for professional services specifically. UK regulatory credentials \u2014 SRA numbers, ICAEW registrations, FCA authorisations \u2014 are the primary trust signals AI uses when recommending UK regulated firms. US-built tools do not track or understand these signals. A UK-native platform with regulatory data integration produces meaningfully better results for this audience.',
  },
  {
    q: 'How long does it take to start appearing in AI recommendations?',
    a: 'Structural fixes like schema installation typically take 4\u20138 weeks to be reflected in AI responses. Perplexity updates fastest \u2014 often within 2\u20133 weeks. ChatGPT takes longer. The improvement compounds over time \u2014 firms that complete their structured data profile see AI mention frequency increase significantly within 90 days according to TendorAI\u2019s tracking data.',
  },
  {
    q: 'Is AI visibility worth investing in for a small UK business?',
    a: 'Yes \u2014 and smaller businesses in less competitive markets benefit most. In major cities, AI recommendation competition is higher. In smaller towns and regional markets, fewer businesses have structured data in place, which means a complete profile stands out more clearly. The free AI visibility report at tendorai.com/ai-visibility-report shows exactly where any UK business stands right now \u2014 it takes 30 seconds and costs nothing.',
  },
  {
    q: 'What should I look for when choosing an AI visibility tool?',
    a: 'Four things: whether it installs structured data or only monitors it, whether it has UK-specific regulatory data, whether it tracks all major AI platforms (not just Google), and whether the price reflects what a UK SME can justify. A tool that costs $500/month and only tracks mentions is harder to justify than one that installs the fix.',
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

function ToolCard({ tool }: { tool: (typeof tools)[number] }) {
  return (
    <div className={`relative border-2 ${borderColors[tool.color]} rounded-xl p-6 md:p-8 bg-white`}>
      <div className={`absolute -top-4 left-6 ${rankBadgeColors[tool.color]} text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-sm`}>
        #{tool.rank}
      </div>
      <div className="mt-2">
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">{tool.name}</h3>
        <p className="text-sm text-purple-600 font-medium mb-4">Best for: {tool.bestFor}</p>
        <p className="text-gray-600 leading-relaxed mb-3">{tool.summary}</p>
        {tool.differentiator && (
          <p className="text-gray-600 leading-relaxed mb-5">{tool.differentiator}</p>
        )}

        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-2">Key Features</h4>
          <ul className="space-y-2">
            {tool.features.map((f, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                <svg className="w-4 h-4 text-green-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-100">
          <div className="flex-1">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Pricing</span>
            <p className="text-sm font-medium text-gray-900 mt-1">{tool.pricing}</p>
          </div>
          <div className="flex-1">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">UK Focus</span>
            <p className="text-sm font-medium text-gray-900 mt-1">{tool.ukFocus}</p>
          </div>
        </div>

        <div className="mt-4 bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-700"><strong>Verdict:</strong> {tool.verdict}</p>
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
            <svg className="w-5 h-5 text-gray-400 shrink-0 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

export default function BestAIVisibilityToolsPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: TITLE,
    description: DESCRIPTION,
    author: { '@type': 'Organization', name: 'TendorAI', url: 'https://www.tendorai.com' },
    publisher: { '@type': 'Organization', name: 'TendorAI', url: 'https://www.tendorai.com', logo: { '@type': 'ImageObject', url: 'https://www.tendorai.com/logo.png' } },
    datePublished: PUBLISHED,
    dateModified: UPDATED,
    url: CANONICAL,
    mainEntityOfPage: { '@type': 'WebPage', '@id': CANONICAL },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-brand-gradient text-white py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <nav className="text-sm mb-6 text-purple-200">
              <Link href="/" className="hover:text-white">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/blog" className="hover:text-white">Blog</Link>
              <span className="mx-2">/</span>
              <span className="text-white">AI Visibility Tools</span>
            </nav>

            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 text-sm font-medium rounded-full bg-white/20 text-white">Comparison</span>
              <span className="text-purple-200">15 min read</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">{TITLE}</h1>
            <p className="text-sm text-white/70 mb-6">Updated 05/09/2026: TendorAI pricing revised</p>

            <p className="text-lg text-purple-100 leading-relaxed max-w-3xl">
              When someone asks ChatGPT to find a business in the UK, AI picks two or three names and recommends them. Everyone else gets nothing. These are the tools that determine which side of that line you&rsquo;re on.
            </p>

            <div className="mt-6 text-sm text-purple-200">
              Published 1 March 2026 &middot; Updated 30 March 2026
            </div>
          </div>
        </section>

        {/* Article content */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          {/* Intro */}
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            AI search has changed how UK businesses get found. Google shows ten results. ChatGPT, Perplexity, and Gemini give a direct recommendation &mdash; two or three businesses, named, with a reason. That is a fundamentally different dynamic to anything that has existed before, and most UK businesses are completely unprepared for it.
          </p>
          <p className="text-gray-600 leading-relaxed mb-6">
            According to TendorAI&rsquo;s analysis of 12,793 UK professional services firms, fewer than 9% have the structured data in place for AI platforms to recommend them with confidence. The picture is no better for general UK SMEs. The businesses appearing in AI recommendations are not the best &mdash; they are the best-structured.
          </p>
          <p className="text-gray-600 leading-relaxed mb-10">
            This comparison covers every tool worth considering for UK businesses in 2026, ranked by relevance, UK focus, and whether they actually fix the problem or just report on it.
          </p>

          {/* Why UK needs different approach */}
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Why UK Businesses Need a Different Approach to AI Visibility</h2>
          <p className="text-gray-700 font-medium mb-4">The tools built for US enterprise brands are not built for UK businesses &mdash; and the difference matters.</p>
          <p className="text-gray-600 leading-relaxed mb-4">
            Most AI visibility platforms were built for Fortune 500 marketing teams in the US. They track brand mentions across AI platforms, produce dashboards showing share of voice, and charge five figures a year. That is useful if you are Nike or Salesforce. It is not useful if you are a Cardiff solicitor, a Manchester accountant, or a Bristol estate agent trying to appear when someone asks ChatGPT for a local recommendation.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            UK businesses have specific requirements that US-built tools do not address. Regulatory credentials &mdash; SRA numbers, ICAEW registrations, FCA authorisations &mdash; are the primary trust signals UK professional services AI looks for. Schema.org markup needs to reference UK-specific entity types. NAP consistency needs to match across UK directories, not US ones. Price transparency requirements differ by sector under UK regulatory frameworks.
          </p>
          <p className="text-gray-600 leading-relaxed mb-10">
            The tools below are assessed specifically for UK businesses, not adapted from US enterprise reviews.
          </p>

          {/* Tool cards */}
          <div className="space-y-10">
            {tools.map((tool) => (
              <ToolCard key={tool.rank} tool={tool} />
            ))}
          </div>

          {/* UK vs US section */}
          <h2 className="text-2xl font-bold text-gray-900 mt-14 mb-4">UK vs US AI Visibility Tools &mdash; Why It Matters</h2>
          <p className="text-gray-700 font-medium mb-4">A US-built tool that does not understand UK regulatory credentials is measuring the wrong thing.</p>
          <p className="text-gray-600 leading-relaxed mb-4">
            When ChatGPT recommends a UK solicitor, it looks for SRA registration, published fee transparency under SRA rules, practice area specificity, and local entity confirmation. When it recommends a UK accountant, it looks for ICAEW or ACCA credentials, MTD authorisation status, and software accreditations like Xero or QuickBooks.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            None of the US-built platforms in this list have any of this data. They track whether your brand name appears in AI responses &mdash; they do not understand what makes a UK professional services firm credible to AI in the first place.
          </p>
          <p className="text-gray-600 leading-relaxed mb-10">
            For general UK SMEs the gap is less critical but still present. UK business registration data, Companies House confirmation, UK-specific directory listings (Yell, Thomson Local, Checkatrade) &mdash; these are the entity signals that confirm to AI that a UK business is real and operating. US platforms do not track these.
          </p>

          {/* Comparison Table */}
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Comparison Table</h2>
          <div className="overflow-x-auto mb-10">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-purple-50">
                  <th className="text-left px-4 py-3 font-semibold text-purple-900 border border-purple-100">Tool</th>
                  <th className="text-left px-4 py-3 font-semibold text-purple-900 border border-purple-100">Type</th>
                  <th className="text-left px-4 py-3 font-semibold text-purple-900 border border-purple-100">UK Data</th>
                  <th className="text-left px-4 py-3 font-semibold text-purple-900 border border-purple-100">Fixes Visibility</th>
                  <th className="text-left px-4 py-3 font-semibold text-purple-900 border border-purple-100">Tracks AI</th>
                  <th className="text-left px-4 py-3 font-semibold text-purple-900 border border-purple-100">Price</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-3 font-medium text-gray-900 border border-gray-100">{row.tool}</td>
                    <td className="px-4 py-3 text-gray-600 border border-gray-100">{row.type}</td>
                    <td className="px-4 py-3 text-gray-600 border border-gray-100">{row.ukData}</td>
                    <td className="px-4 py-3 text-gray-600 border border-gray-100">{row.fixes}</td>
                    <td className="px-4 py-3 text-gray-600 border border-gray-100">{row.tracks}</td>
                    <td className="px-4 py-3 text-gray-600 border border-gray-100">{row.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* How to choose */}
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">How to Choose the Right Tool for Your UK Business</h2>
          <p className="text-gray-700 font-medium mb-4">The core question is whether you need monitoring, implementation, or both.</p>
          <p className="text-gray-600 leading-relaxed mb-6">
            Monitoring tells you where you stand. Implementation changes where you stand. Most businesses need implementation first &mdash; there is no value in knowing you are invisible if you cannot fix it.
          </p>
          <ul className="list-disc pl-6 space-y-3 text-gray-600 mb-10">
            <li><strong>If you are a UK professional services firm</strong> &mdash; solicitor, accountant, mortgage adviser, or estate agent &mdash; TendorAI is the only platform built for your specific regulatory context. Your profile may already exist in the system from SRA, ICAEW, or FCA data. Claim it, complete it, and let the schema installation do the work.</li>
            <li><strong>If you are a general UK SME</strong> &mdash; a retailer, a trades business, a consultant, a coach &mdash; TendorAI&rsquo;s free profile and AI visibility report gives you a starting point at no cost. Pro adds the schema installation and weekly tracking.</li>
            <li><strong>If you already have a marketing team</strong> &mdash; add Peec AI or OtterlyAI&rsquo;s monitoring alongside TendorAI&rsquo;s implementation layer. Use monitoring data to track what the implementation is achieving.</li>
            <li><strong>If you are already paying for SE Ranking or Semrush</strong> &mdash; use the AI features that come with your existing subscription, but do not rely on them for implementation. They track, they do not fix.</li>
          </ul>

          {/* CTA Banner */}
          <div className="my-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 md:p-10 text-white text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-3">Check Your AI Visibility &mdash; Free</h3>
            <p className="text-purple-100 mb-6 max-w-lg mx-auto">
              See how visible your business is across ChatGPT, Perplexity, Claude, Gemini, Copilot, and Meta AI. Get your score, competitor data, and actionable recommendations in minutes.
            </p>
            <Link href="/ai-visibility-report" className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-purple-700 font-semibold rounded-lg hover:bg-purple-50 transition-colors text-lg">
              Get Your Free AI Visibility Report
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* FAQ */}
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Frequently Asked Questions</h2>
          <FAQSection />

          {/* Closing */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>The businesses AI recommends in 2026 are not the best-known or the longest-established. They are the best-structured.</strong>
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Getting your credentials verified, your services structured, and your schema installed is the baseline for being found in the way clients now search. The tools above are the options available to UK businesses right now.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Check your current AI Visibility Score at{' '}
              <Link href="/ai-visibility-report" className="text-purple-600 hover:text-purple-700 underline">tendorai.com/ai-visibility-report</Link>
              {' '}&mdash; free, 30 seconds, no login required.
            </p>
            <p className="text-sm text-gray-400 italic">
              Sources: TendorAI analysis of 12,793 SRA, ICAEW, and FCA-registered firms, March 2026. Gartner forecast: 25% reduction in traditional search engine traffic by 2026. BrightLocal: 88% of consumers trust online reviews as much as personal recommendations.
            </p>
          </div>
        </article>
      </main>
    </>
  );
}
