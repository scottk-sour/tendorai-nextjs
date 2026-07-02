import { Metadata } from 'next';
import Link from 'next/link';

const TITLE = 'AI Visibility Report: Cardiff Estate Agents 2026 — TendorAI Research';
const DESCRIPTION =
  'TendorAI tracks 52 estate agents in Cardiff. Most rely on Rightmove and Zoopla — but AI assistants don\'t pull from portals. Here\'s what the data shows.';
const CANONICAL = 'https://www.tendorai.com/blog/ai-visibility-report-estate-agents-cardiff';
const PUBLISHED = '2026-04-03';

export const metadata: Metadata = {
  title: `${TITLE} | TendorAI`,
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

const nationalCityData = [
  { city: 'London', firms: '580', noWebsite: '58', rate: '10%' },
  { city: 'Manchester', firms: '95', noWebsite: '12', rate: '13%' },
  { city: 'Birmingham', firms: '78', noWebsite: '10', rate: '13%' },
  { city: 'Bristol', firms: '64', noWebsite: '7', rate: '11%' },
  { city: 'Cardiff', firms: '52', noWebsite: '6', rate: '12%' },
  { city: 'Leeds', firms: '56', noWebsite: '7', rate: '13%' },
  { city: 'Newcastle', firms: '38', noWebsite: '5', rate: '13%' },
];

const verticalData = [
  { vertical: 'Solicitors', firms: '8,625', noWebsite: '1,458', rate: '17%' },
  { vertical: 'Accountants', firms: '1,380', noWebsite: '21', rate: '2%' },
  { vertical: 'Mortgage Advisors', firms: '1,100', noWebsite: '532', rate: '48%' },
  { vertical: 'Office Equipment', firms: '1,048', noWebsite: '602', rate: '57%' },
  { vertical: 'Financial Advisors', firms: '525', noWebsite: '110', rate: '21%' },
];

const faqs = [
  {
    q: 'Does my Cardiff estate agency appear when someone asks AI for an agent recommendation?',
    a: 'If your agency has no website, no. If your agency has a website but no structured data, probably not. AI assistants like ChatGPT, Gemini, and Perplexity do not pull from Rightmove, Zoopla, or OnTheMarket. TendorAI offers a free AI Visibility Report that scans these platforms to show you exactly where you stand.',
  },
  {
    q: 'How many Cardiff estate agents are AI-visible?',
    a: 'TendorAI tracks 52 estate agents in Cardiff. 6 have no website. Of the remaining 46, the majority have no structured schema data — meaning even agencies with websites are likely invisible to AI recommendation engines.',
  },
  {
    q: 'Why doesn\'t Rightmove or Zoopla visibility help with AI?',
    a: 'AI assistants do not scrape portal listings. ChatGPT, Gemini, and Perplexity build their responses from structured data, authoritative directories, and verified citations — not from property portal results. An agency with 500 Rightmove listings but no schema markup is invisible to AI.',
  },
  {
    q: 'Is AI visibility different from SEO for estate agents?',
    a: 'Yes. Traditional SEO optimises for keyword ranking in link-based search results. AI visibility optimises for entity recognition in conversational AI responses. The techniques overlap but the mechanisms are different.',
  },
  {
    q: 'Will AI recommendations replace Rightmove for finding estate agents?',
    a: 'For high-intent queries like "best estate agent in Cardiff" or "who should I use to sell my house in Pontcanna," AI is already answering directly without returning portal links. According to industry data, AI Overviews now appear in over 60% of searches. Agents not visible in AI responses are missing an increasing share of vendor instructions.',
  },
  {
    q: 'How does TendorAI know which estate agents are AI-visible?',
    a: 'TendorAI\'s platform runs structured scans across ChatGPT, Perplexity, and Gemini using city- and service-specific prompts. Results are logged, scored, and reported back to the firm via the dashboard.',
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

export default function AIVisibilityReportCardiffEstateAgents() {
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
      logo: { '@type': 'ImageObject', url: 'https://www.tendorai.com/logo.png', width: 873, height: 873 },
    },
    datePublished: PUBLISHED,
    dateModified: today,
    url: CANONICAL,
    mainEntityOfPage: { '@type': 'WebPage', '@id': CANONICAL },
    image: { '@type': 'ImageObject', url: 'https://www.tendorai.com/logo.png', width: 873, height: 873 },
    articleSection: 'Research',
    keywords: [
      'AI visibility estate agents Cardiff',
      'Cardiff estate agents AI',
      'Cardiff estate agent AI recommendations',
      'ChatGPT estate agent Cardiff',
      'AI visibility report Cardiff',
      'estate agent AI discovery Cardiff',
    ],
    wordCount: 2400,
    inLanguage: 'en-GB',
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

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.tendorai.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.tendorai.com/blog' },
      { '@type': 'ListItem', position: 3, name: TITLE, item: CANONICAL },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-gradient-to-br from-[#1B4F72] via-[#1a3d5c] to-[#2d1b4e] text-white py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <nav className="text-sm mb-6 text-blue-200">
              <Link href="/" className="hover:text-white">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/blog" className="hover:text-white">Blog</Link>
              <span className="mx-2">/</span>
              <span className="text-white">Cardiff Estate Agents AI Visibility</span>
            </nav>

            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 text-sm font-medium rounded-full bg-white/20 text-white">
                AI Visibility Research
              </span>
              <span className="text-blue-200">10 min read</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              AI Visibility Report: Cardiff Estate Agents 2026
            </h1>

            <p className="text-lg text-blue-100 leading-relaxed max-w-3xl">
              Most Cardiff estate agents rely on Rightmove.<br />
              AI doesn&apos;t read Rightmove.
            </p>

            <div className="mt-6 flex items-center gap-4 text-sm text-blue-200">
              <span>By TendorAI</span>
              <span>&middot;</span>
              <span>Published {new Date(PUBLISHED).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            </div>
          </div>
        </section>

        {/* Key stat callouts */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 -mt-6">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 flex flex-col sm:flex-row items-center gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#1B4F72]">52</div>
              <div className="text-sm text-gray-500">estate agents in Cardiff</div>
            </div>
            <div className="h-px sm:h-12 sm:w-px bg-gray-200 w-full sm:w-auto" />
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600">6</div>
              <div className="text-sm text-gray-500">with no website</div>
            </div>
            <div className="h-px sm:h-12 sm:w-px bg-gray-200 w-full sm:w-auto" />
            <div className="text-center">
              <div className="text-4xl font-bold text-amber-600">12%</div>
              <div className="text-sm text-gray-500">completely invisible</div>
            </div>
          </div>
        </section>

        {/* Article content */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16">
          {/* The Data */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">The Data</h2>
            <p className="text-gray-700 mb-2">TendorAI tracks 52 estate agents in Cardiff.</p>
            <ul className="space-y-1 mb-4">
              <li className="text-gray-700">&bull; 46 firms have a website</li>
              <li className="text-gray-700">&bull; 6 firms have no website</li>
            </ul>
            <p className="text-gray-700 mb-2">That&apos;s an 88% web presence rate.</p>
            <p className="text-gray-700 mb-2">On the surface, that looks reasonable.</p>
            <p className="text-gray-900 font-semibold">It isn&apos;t.</p>
          </section>

          {/* The Portal Trap */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">The Portal Trap</h2>
            <p className="text-gray-700 mb-4">Most Cardiff estate agents rely on Rightmove, Zoopla, and OnTheMarket.</p>
            <p className="text-gray-700 mb-2">AI does not read any of them.</p>
            <p className="text-gray-700 mb-2">That means:</p>
            <ul className="space-y-1 mb-4">
              <li className="text-gray-700">&bull; AI cannot identify the agency from a Rightmove listing</li>
              <li className="text-gray-700">&bull; Zoopla &ldquo;featured agent&rdquo; status has zero influence on AI responses</li>
              <li className="text-gray-700">&bull; OnTheMarket presence does not create an entity AI can reference</li>
            </ul>
            <p className="text-gray-700 mb-2">An agency with hundreds of portal listings but no structured data on its own website is invisible to AI.</p>
            <p className="text-gray-700">Achieved vs asking price data, client money protection status, Propertymark/NAEA membership &mdash; none of this reaches AI unless it is declared in machine-readable format on the agency&apos;s own domain.</p>
          </section>

          {/* Cardiff in Context */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Cardiff in Context</h2>
            <p className="text-gray-700 mb-4">This is not a Cardiff-only issue.</p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-[#1B4F72] text-white">
                    <th className="p-3 text-left font-semibold">City</th>
                    <th className="p-3 text-left font-semibold">Firms Tracked</th>
                    <th className="p-3 text-left font-semibold">No Website</th>
                    <th className="p-3 text-left font-semibold">No-Website Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {nationalCityData.map((row, i) => (
                    <tr key={i} className={`${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'} ${row.city === 'Cardiff' ? 'ring-2 ring-[#1B4F72] ring-inset' : ''}`}>
                      <td className="p-3 text-gray-900 font-medium">{row.city === 'Cardiff' ? <strong>{row.city}</strong> : row.city}</td>
                      <td className="p-3 text-gray-700">{row.firms}</td>
                      <td className="p-3 text-red-600 font-medium">{row.noWebsite}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                          parseInt(row.rate) >= 15 ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'
                        }`}>
                          {row.rate}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-gray-500 text-sm italic mb-4">Source: TendorAI database, April 2026</p>
            <p className="text-gray-700 mb-2">Across England and Wales, estate agents have moderate web presence rates.</p>
            <p className="text-gray-900 font-semibold">But presence is not visibility.</p>
          </section>

          {/* How AI Chooses */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">How AI Chooses Which Estate Agent to Recommend</h2>
            <p className="text-gray-700 mb-2">When someone asks:</p>
            <p className="text-gray-900 font-medium italic mb-4">&ldquo;Best estate agent in Cardiff to sell my house&rdquo;</p>
            <p className="text-gray-700 mb-2">AI systems do not browse Rightmove.</p>
            <p className="text-gray-700 mb-4">They rely on structured, pre-processed data.</p>
            <p className="text-gray-700 mb-2">Firms that get recommended consistently have:</p>
            <div className="space-y-3 mb-4">
              <div className="flex gap-3">
                <span className="font-bold text-[#1B4F72]">1.</span>
                <div><strong className="text-gray-900">Crawlable website</strong> <span className="text-gray-600">&mdash; Accessible and indexable &mdash; portal listings do not count</span></div>
              </div>
              <div className="flex gap-3">
                <span className="font-bold text-[#1B4F72]">2.</span>
                <div><strong className="text-gray-900">Structured schema data</strong> <span className="text-gray-600">&mdash; Services, coverage areas, and credentials clearly defined</span></div>
              </div>
              <div className="flex gap-3">
                <span className="font-bold text-[#1B4F72]">3.</span>
                <div><strong className="text-gray-900">Third-party validation</strong> <span className="text-gray-600">&mdash; Listings and citations across trusted sources</span></div>
              </div>
            </div>
            <p className="text-gray-700">Most Cardiff agencies only satisfy the first.</p>
          </section>

          {/* The Hidden Gap */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">The Hidden Gap</h2>
            <p className="text-gray-700 mb-4">TendorAI&apos;s wider dataset shows:</p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-[#1B4F72] text-white">
                    <th className="p-3 text-left font-semibold">Vertical</th>
                    <th className="p-3 text-left font-semibold">Firms</th>
                    <th className="p-3 text-left font-semibold">No Website</th>
                    <th className="p-3 text-left font-semibold">Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {verticalData.slice(0, 3).map((row, i) => (
                    <tr key={i} className={`${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'} ${row.vertical === 'Mortgage Advisors' ? '' : ''}`}>
                      <td className="p-3 text-gray-900 font-medium">{row.vertical}</td>
                      <td className="p-3 text-gray-700">{row.firms}</td>
                      <td className="p-3 text-red-600 font-medium">{row.noWebsite}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${parseInt(row.rate) >= 15 ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>{row.rate}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-gray-700 mb-2">Estate agents appear digitally moderate compared to accountants.</p>
            <p className="text-gray-700">In reality, they are missing the next layer &mdash; machine-readable structure &mdash; and the portal trap masks the problem.</p>
          </section>

          {/* What AI-Recommended Agents Are Doing Differently */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">What AI-Recommended Agents Are Doing Differently</h2>
            <p className="text-gray-700 mb-4">Analysis of firms appearing in AI recommendations shows consistent patterns:</p>
            <div className="space-y-4">
              <div className="flex gap-3">
                <span className="font-bold text-[#1B4F72]">1.</span>
                <div><strong className="text-gray-900">Declared credentials</strong> <span className="text-gray-600">&mdash; Propertymark/NAEA membership, client money protection status, and years of trading structured clearly</span></div>
              </div>
              <div className="flex gap-3">
                <span className="font-bold text-[#1B4F72]">2.</span>
                <div><strong className="text-gray-900">Coverage areas as entities</strong> <span className="text-gray-600">&mdash; Pontcanna, Canton, Roath, Penylan &mdash; declared as structured data, not paragraph text</span></div>
              </div>
              <div className="flex gap-3">
                <span className="font-bold text-[#1B4F72]">3.</span>
                <div><strong className="text-gray-900">Service clarity</strong> <span className="text-gray-600">&mdash; Sales, lettings, valuations, property management &mdash; defined as entities, not buried in homepage copy</span></div>
              </div>
              <div className="flex gap-3">
                <span className="font-bold text-[#1B4F72]">4.</span>
                <div><strong className="text-gray-900">External validation</strong> <span className="text-gray-600">&mdash; Consistent citations across trusted platforms</span></div>
              </div>
            </div>
            <p className="text-gray-700 mt-4">These signals allow AI to move from:<br /><span className="text-gray-900 font-semibold">&ldquo;possible result&rdquo; &rarr; &ldquo;confident recommendation&rdquo;</span></p>
          </section>

          {/* What This Means */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">What This Means for Cardiff Estate Agents</h2>
            <p className="text-gray-700 mb-4">Three shifts are already underway:</p>
            <div className="space-y-4">
              <div className="flex gap-3">
                <span className="font-bold text-[#1B4F72]">1.</span>
                <div><strong className="text-gray-900">From portals to entities</strong> <span className="text-gray-600">&mdash; AI ranks agencies on declared identity, not Rightmove position</span></div>
              </div>
              <div className="flex gap-3">
                <span className="font-bold text-[#1B4F72]">2.</span>
                <div><strong className="text-gray-900">Zero-click recommendations</strong> <span className="text-gray-600">&mdash; AI returns a small number of named agencies directly</span></div>
              </div>
              <div className="flex gap-3">
                <span className="font-bold text-[#1B4F72]">3.</span>
                <div><strong className="text-gray-900">AI advertising</strong> <span className="text-gray-600">&mdash; Sponsored placements require structured profiles to exist first</span></div>
              </div>
            </div>
          </section>

          {/* The Opportunity */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">The Opportunity</h2>
            <p className="text-gray-700 mb-2">Out of 52 Cardiff estate agents:</p>
            <p className="text-gray-900 font-semibold mb-4">Almost all are currently invisible to AI recommendation systems.</p>
            <p className="text-gray-700 mb-2">This creates a short-term window where:</p>
            <ul className="space-y-1 mb-4">
              <li className="text-gray-700">&bull; Early adopters gain disproportionate visibility</li>
              <li className="text-gray-700">&bull; AI begins reinforcing the same agencies repeatedly</li>
              <li className="text-gray-700">&bull; Late adopters struggle to catch up</li>
            </ul>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <FAQSection />
          </section>

          {/* TendorAI Position */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">The TendorAI Position</h2>
            <p className="text-gray-700 mb-4">TendorAI maintains a structured database of 12,793 regulated UK firms, sourced from SRA, ICAEW, FCA, and Propertymark registers.</p>
            <p className="text-gray-700 mb-4">Each firm has a machine-readable profile.</p>
            <p className="text-gray-700 mb-2">For Pro firms:</p>
            <ul className="space-y-1 mb-4">
              <li className="text-gray-700">&bull; Structured data is installed on their website</li>
              <li className="text-gray-700">&bull; Data remains synchronised automatically</li>
              <li className="text-gray-700">&bull; AI systems can verify and cross-reference information</li>
            </ul>
            <p className="text-gray-700">This enables consistent inclusion in AI-generated recommendations.</p>
          </section>

          {/* CTA */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Check Your Position</h2>
            <p className="text-gray-700 mb-2">If you are an estate agent in Cardiff, the question is simple:</p>
            <p className="text-gray-900 font-semibold text-lg mb-6">Are you being recommended &mdash; or not?</p>
            <Link
              href="/ai-visibility-report"
              className="inline-flex items-center justify-center px-8 py-4 bg-[#1B4F72] text-white font-bold rounded-lg hover:bg-[#164060] transition-colors text-lg"
            >
              Run Your Free AI Visibility Report
            </Link>
          </section>

          {/* Source note */}
          <div className="mt-8 text-xs text-gray-400 italic">
            Data sourced from TendorAI&apos;s database of estate agents, Propertymark registers, and regulatory records, April 2026. Firm counts reflect registered practices as of the most recent register import.
          </div>

          {/* Author / date */}
          <div className="mt-8 pt-8 border-t border-gray-200 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Published {new Date(PUBLISHED).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} by TendorAI
            </p>
            <Link href="/blog" className="text-sm text-purple-600 hover:text-purple-700 font-medium">
              &larr; Back to Blog
            </Link>
          </div>
        </article>
      </main>
    </>
  );
}
