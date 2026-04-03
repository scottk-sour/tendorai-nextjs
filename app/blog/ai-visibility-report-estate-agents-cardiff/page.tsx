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
    a: 'Yes. Traditional SEO optimises for keyword ranking in link-based search results. AI visibility (AEO — Answer Engine Optimisation) optimises for entity recognition in conversational AI responses. The techniques overlap but the mechanisms are different.',
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
                AEO Research
              </span>
              <span className="text-blue-200">10 min read</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              AI Visibility Report: Cardiff Estate Agents 2026
            </h1>

            <p className="text-lg text-blue-100 leading-relaxed max-w-3xl">
              TendorAI tracks 52 estate agents in Cardiff. <strong>12% have no website</strong> &mdash; but the real problem is bigger. AI assistants don&apos;t pull from Rightmove or Zoopla, so most agents are invisible. Here&apos;s the data.
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
          {/* Opening */}
          <section className="mb-12">
            <p className="text-lg text-gray-600 leading-relaxed mb-4">
              <strong className="text-gray-900">Cardiff has 52 estate agents tracked by TendorAI. 6 of them &mdash; 12% &mdash; have no website.</strong> Every single one of those agencies is completely undetectable by ChatGPT, Gemini, and Perplexity.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-4">
              But that only tells half the story. AI assistants do not pull from Rightmove, Zoopla, or OnTheMarket. An agency with hundreds of portal listings but no structured data on its own website is just as invisible as one with no website at all.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              When a potential vendor asks ChatGPT &ldquo;best estate agent in Cardiff to sell my house,&rdquo; the AI does not browse portal results. It draws on structured, machine-readable data &mdash; and most Cardiff agents have none.
            </p>
          </section>

          {/* Module 1: The Invisibility Problem */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">The Invisibility Problem: Cardiff in Context</h2>

            <p className="text-gray-600 leading-relaxed mb-4">
              Of Cardiff&apos;s 52 tracked estate agents:
            </p>

            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                <span className="text-gray-700"><strong>46 agencies have a website</strong> &mdash; the minimum requirement to be detectable by AI</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                <span className="text-gray-700"><strong>6 agencies have no website at all</strong> &mdash; 12% of Cardiff agents</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0" />
                <span className="text-gray-700">Even among the 46 with websites, <strong>the vast majority have no structured schema data</strong> &mdash; making them functionally invisible to AI</span>
              </li>
            </ul>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-[#1B4F72] text-white">
                    <th className="p-3 text-left font-semibold">City</th>
                    <th className="p-3 text-left font-semibold">Firms Tracked</th>
                    <th className="p-3 text-left font-semibold">No Website</th>
                    <th className="p-3 text-left font-semibold">Invisibility Rate</th>
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
                          parseInt(row.rate) >= 25 ? 'bg-red-100 text-red-700' :
                          parseInt(row.rate) >= 20 ? 'bg-amber-100 text-amber-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {row.rate}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-gray-500 text-sm italic">
              Source: TendorAI database, April 2026
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mt-6">
              <p className="text-sm text-blue-900">
                Cardiff&apos;s 12% invisibility rate is in line with the national average for estate agents &mdash; but having a website is the floor, not the ceiling. A website with no structured data is only marginally better than no website at all. AI engines cannot extract reliable information from unstructured content.
              </p>
            </div>
          </section>

          {/* Module 2: How AI Selects */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">How AI Selects Which Cardiff Estate Agent to Recommend</h2>

            <p className="text-gray-600 leading-relaxed mb-6">
              When a potential vendor asks ChatGPT &ldquo;best estate agent in Cardiff for selling a house,&rdquo; the AI does not browse Rightmove or check Zoopla rankings. It draws on indexed, structured data it has already processed.
            </p>

            <p className="text-gray-700 font-semibold mb-4">The agencies it recommends share three characteristics:</p>

            <div className="grid sm:grid-cols-3 gap-4 mb-6">
              {[
                { num: '1', title: 'Crawlable web presence', desc: 'A website that AI engines can access and index — portal listings do not count' },
                { num: '2', title: 'Structured data', desc: 'Schema markup declaring services, location, areas covered, and credentials explicitly' },
                { num: '3', title: 'Third-party citations', desc: 'Directories, review platforms, and professional body listings that validate the agency' },
              ].map((item) => (
                <div key={item.num} className="bg-white border border-gray-200 rounded-xl p-5">
                  <div className="w-8 h-8 rounded-full bg-[#1B4F72] flex items-center justify-center text-white font-bold text-sm mb-3">
                    {item.num}
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm mb-1">{item.title}</h3>
                  <p className="text-xs text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="bg-gray-900 text-white rounded-xl p-6">
              <p className="text-sm leading-relaxed text-gray-200">
                Agencies without all three are skipped &mdash; regardless of how many properties they have listed on Rightmove, how strong their local reputation is, or how many years they have been trading. <strong className="text-white">This is the structural problem TendorAI was built to solve.</strong>
              </p>
            </div>
          </section>

          {/* Module 3: The Portal Trap */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">The Portal Trap: Why Rightmove and Zoopla Don&apos;t Help</h2>

            <p className="text-gray-600 leading-relaxed mb-6">
              Most Cardiff estate agents invest heavily in Rightmove, Zoopla, and OnTheMarket. These portals dominate traditional property search &mdash; but they are irrelevant to AI visibility.
            </p>

            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">&times;</span>
                <span className="text-gray-700">AI assistants <strong>do not scrape Rightmove listings</strong> to build recommendations</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">&times;</span>
                <span className="text-gray-700">Zoopla&apos;s &ldquo;featured agent&rdquo; status <strong>has zero influence</strong> on ChatGPT or Gemini responses</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">&times;</span>
                <span className="text-gray-700">OnTheMarket presence <strong>does not create an entity</strong> that AI can reference</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">&#10003;</span>
                <span className="text-gray-700">Your <strong>own website with structured schema data</strong> is what AI engines actually index</span>
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed">
              An agency spending thousands per month on portal subscriptions but neglecting its own website&apos;s structured data is investing in a channel that AI completely ignores. The achieved vs asking price data, client money protection status, Propertymark/NAEA membership &mdash; none of this reaches AI unless it is declared in machine-readable format on the agency&apos;s own domain.
            </p>
          </section>

          {/* Module 4: Scale of Opportunity */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">The Scale of the Opportunity (and the Risk)</h2>

            <p className="text-gray-600 leading-relaxed mb-6">
              TendorAI&apos;s data across all regulated professions reveals a pattern:
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-[#1B4F72] text-white">
                    <th className="p-3 text-left font-semibold">Vertical</th>
                    <th className="p-3 text-left font-semibold">Firms Tracked</th>
                    <th className="p-3 text-left font-semibold">No Website</th>
                    <th className="p-3 text-left font-semibold">Invisibility Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {verticalData.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="p-3 text-gray-900 font-medium">{row.vertical}</td>
                      <td className="p-3 text-gray-700">{row.firms}</td>
                      <td className="p-3 text-red-600 font-medium">{row.noWebsite}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                          parseInt(row.rate) >= 40 ? 'bg-red-100 text-red-700' :
                          parseInt(row.rate) >= 15 ? 'bg-amber-100 text-amber-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {row.rate}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-gray-500 text-sm italic mb-6">
              Source: TendorAI database, April 2026
            </p>

            <p className="text-gray-600 leading-relaxed mb-4">
              Estate agents sit in the middle of the pack &mdash; better than mortgage advisors and office equipment suppliers, but far behind accountants. The critical point is this: even the 46 Cardiff agencies with websites largely lack the structured data that AI engines require. A website without schema markup declaring your services, coverage areas, Propertymark membership, and client money protection status is little more than a digital brochure that AI cannot parse.
            </p>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p className="text-sm text-amber-800">
                  <strong className="text-amber-900">Having a Rightmove listing in 2026 is the equivalent of having a Yellow Pages advert in 2005.</strong> It is necessary for traditional property search. It is completely irrelevant to AI discovery.
                </p>
              </div>
            </div>
          </section>

          {/* Module 5: What AI-Cited Agents Do Differently */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">What AI-Cited Cardiff Agents Are Doing Differently</h2>

            <p className="text-gray-600 leading-relaxed mb-6">
              TendorAI&apos;s analysis of estate agents across South Wales that appear consistently in AI recommendation results identifies four common factors:
            </p>

            <div className="space-y-4">
              {[
                {
                  num: 1,
                  title: 'Declared credentials',
                  desc: 'Propertymark/NAEA membership, client money protection status, Trading Standards approved status, and years of operation are explicitly declared in structured data — not buried in an About page or footer.',
                },
                {
                  num: 2,
                  title: 'Location specificity',
                  desc: 'City, postcode, and coverage areas are machine-readable. "We cover Cardiff and the Vale of Glamorgan" is useless to an AI engine. Structured address data with postcodes for each branch and declared coverage areas (Pontcanna, Canton, Roath, Penylan) is not.',
                },
                {
                  num: 3,
                  title: 'Service clarity',
                  desc: 'Services are listed as structured entities, not paragraph text. An AI cannot reliably extract "we offer sales, lettings, and property management" from a homepage. Schema-declared services — residential sales, lettings, property valuations, achieved vs asking price data — are unambiguous.',
                },
                {
                  num: 4,
                  title: 'Third-party citation',
                  desc: 'The agency appears in authoritative directories that AI engines treat as trust signals. Google reviews, Trustpilot, Propertymark\'s agent finder, and structured directories like TendorAI provide the external validation that moves an agency from "possible result" to "confident recommendation."',
                },
              ].map((item) => (
                <div key={item.num} className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#1B4F72] flex items-center justify-center text-white font-bold">
                      {item.num}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600 leading-relaxed text-sm">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Module 6: What Changes in 2026 */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">What This Means for Cardiff Estate Agents in 2026</h2>

            <p className="text-gray-600 leading-relaxed mb-6">
              Three shifts are already underway that will accelerate AI&apos;s role in how homeowners and buyers find estate agents in Cardiff:
            </p>

            <div className="space-y-6">
              <div className="border-l-4 border-[#1B4F72] pl-5">
                <h3 className="font-bold text-gray-900 mb-2">From portals to entities</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  AI engines rank agencies based on declared identity &mdash; who they are, what services they offer, which areas they cover, what credentials they hold &mdash; not Rightmove ranking or Zoopla featured status. Propertymark membership and client money protection are emerging as primary trust signals for estate agents in AI responses.
                </p>
              </div>

              <div className="border-l-4 border-[#1B4F72] pl-5">
                <h3 className="font-bold text-gray-900 mb-2">Zero-click recommendations</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Queries like &ldquo;best estate agent in Pontcanna Cardiff&rdquo; increasingly return a direct recommendation rather than a list of links. The agency recommended gets the vendor instruction. The agencies not recommended are not seen.
                </p>
              </div>

              <div className="border-l-4 border-[#1B4F72] pl-5">
                <h3 className="font-bold text-gray-900 mb-2">AI advertising</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Perplexity has opened sponsored placements in the UK. ChatGPT&apos;s ad model is in development. Cardiff agencies with structured profiles already in place will be first in line. Agencies without structured data cannot buy their way into these placements &mdash; the infrastructure has to exist first.
                </p>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <FAQSection />
          </section>

          {/* TendorAI Position */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">The TendorAI Position</h2>

            <p className="text-gray-600 leading-relaxed mb-4">
              TendorAI maintains the UK&apos;s largest structured database of regulated professional services firms &mdash; 12,793 businesses across solicitors, accountants, mortgage advisors, financial advisors, and office equipment suppliers, all sourced directly from SRA, ICAEW, and FCA registers.
            </p>

            <p className="text-gray-600 leading-relaxed mb-4">
              Every firm in the database has a structured profile. Pro firms have that profile extended to their own website via an automatically maintained schema installation &mdash; no developer required, no quarterly audits, no schema drift.
            </p>

            <p className="text-gray-600 leading-relaxed">
              When a potential vendor asks AI to recommend an estate agent in Cardiff, TendorAI-listed agencies have declared their credentials, coverage areas, services, and professional memberships in machine-readable format. That is why they get recommended.
            </p>
          </section>

          {/* CTA */}
          <section className="bg-gradient-to-br from-[#1B4F72] to-[#2d1b4e] text-white rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Run Your Free AI Visibility Report</h2>
            <p className="text-blue-100 mb-8 max-w-xl mx-auto">
              See where your Cardiff agency stands in 60 seconds. We&apos;ll scan ChatGPT, Perplexity, and Gemini to show you exactly what AI knows about your estate agency.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/aeo-report"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#1B4F72] font-bold rounded-lg hover:bg-blue-50 transition-colors text-lg"
              >
                Run Your Free Report
              </Link>
              <Link
                href="/for-vendors#pricing"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors"
              >
                See TendorAI Pro
              </Link>
            </div>
          </section>

          {/* Source note */}
          <div className="mt-8 text-xs text-gray-400 italic">
            Data sourced from TendorAI&apos;s database of regulated professional services firms, April 2026. Firm counts reflect registered practices as of the most recent register import.
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
