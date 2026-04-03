import { Metadata } from 'next';
import Link from 'next/link';

const TITLE = 'AI Visibility Report: Birmingham Estate Agents 2026 — TendorAI Research';
const DESCRIPTION =
  'TendorAI tracks 78 estate agents in Birmingham. AI doesn\'t pull from Rightmove or Zoopla — most Birmingham agents are invisible to AI assistants.';
const CANONICAL = 'https://www.tendorai.com/blog/ai-visibility-report-estate-agents-birmingham';
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
  { city: 'London', firms: '1,245', noWebsite: '162', rate: '13%' },
  { city: 'Manchester', firms: '134', noWebsite: '19', rate: '14%' },
  { city: 'Birmingham', firms: '78', noWebsite: '10', rate: '13%' },
  { city: 'Leeds', firms: '92', noWebsite: '12', rate: '13%' },
  { city: 'Bristol', firms: '67', noWebsite: '7', rate: '10%' },
  { city: 'Liverpool', firms: '58', noWebsite: '9', rate: '16%' },
  { city: 'Sheffield', firms: '45', noWebsite: '6', rate: '13%' },
];

const verticalData = [
  { vertical: 'Estate Agents', firms: '3,840', noWebsite: '499', rate: '13%' },
  { vertical: 'Solicitors', firms: '8,625', noWebsite: '1,458', rate: '17%' },
  { vertical: 'Accountants', firms: '1,380', noWebsite: '21', rate: '2%' },
  { vertical: 'Mortgage Advisors', firms: '1,100', noWebsite: '532', rate: '48%' },
  { vertical: 'Financial Advisors', firms: '525', noWebsite: '110', rate: '21%' },
];

const faqs = [
  {
    q: 'Does my Birmingham estate agency appear when someone asks AI to recommend an agent?',
    a: 'If your agency has no website, no. If your agency has a website but no structured data, probably not. AI assistants do not pull from Rightmove or Zoopla — they rely on structured data they can verify independently. TendorAI offers a free AI Visibility Report that scans ChatGPT, Perplexity, and Gemini to show you exactly where you stand.',
  },
  {
    q: 'How many Birmingham estate agents are AI-visible?',
    a: 'TendorAI tracks 78 estate agents in Birmingham. 10 have no website. Of the remaining 68, the majority have no structured schema data — meaning even agencies with websites are likely invisible to AI recommendation engines.',
  },
  {
    q: 'Why doesn\'t AI pull listings from Rightmove or Zoopla?',
    a: 'Rightmove and Zoopla are property listing portals, not structured directories of estate agents. AI engines need machine-readable data about the agency itself — services offered, location, credentials, client reviews — not individual property listings. Portal presence does not translate to AI visibility.',
  },
  {
    q: 'Is AI visibility different from SEO for estate agents?',
    a: 'Yes. Traditional SEO optimises for keyword ranking in link-based search results. AI visibility (AEO — Answer Engine Optimisation) optimises for entity recognition in conversational AI responses. When a potential vendor asks ChatGPT "best estate agent in Birmingham," the AI does not return a list of links — it recommends specific agencies based on structured, verified data.',
  },
  {
    q: 'Do Propertymark or NAEA memberships help with AI visibility?',
    a: 'Membership alone does not create AI visibility, but declaring your Propertymark or NAEA Propertymark membership in structured schema data provides a trust signal that AI engines can verify. TendorAI automatically connects your regulatory and membership data to your structured profile.',
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

export default function AIVisibilityReportBirminghamEstateAgents() {
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
      'AI visibility estate agents Birmingham',
      'Birmingham estate agents AI',
      'Birmingham estate agency AI recommendations',
      'ChatGPT estate agent Birmingham',
      'AI visibility report Birmingham',
      'estate agent AI discovery Birmingham',
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
              <span className="text-white">Birmingham Estate Agents AI Visibility</span>
            </nav>

            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 text-sm font-medium rounded-full bg-white/20 text-white">
                AEO Research
              </span>
              <span className="text-blue-200">10 min read</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              AI Visibility Report: Birmingham Estate Agents 2026
            </h1>

            <p className="text-lg text-blue-100 leading-relaxed max-w-3xl">
              TendorAI tracks 78 estate agents in Birmingham. <strong>13% have no website</strong> &mdash; and AI doesn&apos;t pull from Rightmove or Zoopla. Most Birmingham agents are invisible to AI assistants.
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
              <div className="text-4xl font-bold text-[#1B4F72]">78</div>
              <div className="text-sm text-gray-500">estate agents in Birmingham</div>
            </div>
            <div className="h-px sm:h-12 sm:w-px bg-gray-200 w-full sm:w-auto" />
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600">10</div>
              <div className="text-sm text-gray-500">with no website</div>
            </div>
            <div className="h-px sm:h-12 sm:w-px bg-gray-200 w-full sm:w-auto" />
            <div className="text-center">
              <div className="text-4xl font-bold text-amber-600">13%</div>
              <div className="text-sm text-gray-500">completely invisible</div>
            </div>
          </div>
        </section>

        {/* Article content */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16">
          {/* Opening */}
          <section className="mb-12">
            <p className="text-lg text-gray-600 leading-relaxed mb-4">
              <strong className="text-gray-900">Birmingham has 78 estate agents tracked by TendorAI. 10 of them &mdash; 13% &mdash; have no website.</strong> Every single one of those agencies is completely undetectable by ChatGPT, Gemini, and Perplexity.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-4">
              But the bigger problem is this: AI does not pull from Rightmove or Zoopla. It does not scrape property portals. When a potential vendor or buyer asks an AI assistant to recommend an estate agent in Birmingham, the AI draws on structured, machine-readable data about the agency itself &mdash; not its property listings.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              According to TendorAI&apos;s database of 3,840 estate agents across England and Wales, even agencies with strong portal presences are invisible to AI if they lack structured data on their own websites.
            </p>
          </section>

          {/* Module 1: The Invisibility Problem */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">The Invisibility Problem: Birmingham in Context</h2>

            <p className="text-gray-600 leading-relaxed mb-4">
              Of Birmingham&apos;s 78 tracked estate agents:
            </p>

            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                <span className="text-gray-700"><strong>68 agencies have a website</strong> &mdash; the minimum requirement to be detectable by AI</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                <span className="text-gray-700"><strong>10 agencies have no website at all</strong> &mdash; 13% of all Birmingham agents</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0" />
                <span className="text-gray-700">Nationally, <strong>13% of estate agents have no web presence</strong></span>
              </li>
            </ul>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-[#1B4F72] text-white">
                    <th className="p-3 text-left font-semibold">City</th>
                    <th className="p-3 text-left font-semibold">Estate Agents Tracked</th>
                    <th className="p-3 text-left font-semibold">No Website</th>
                    <th className="p-3 text-left font-semibold">Invisibility Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {nationalCityData.map((row, i) => (
                    <tr key={i} className={`${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'} ${row.city === 'Birmingham' ? 'ring-2 ring-[#1B4F72] ring-inset' : ''}`}>
                      <td className="p-3 text-gray-900 font-medium">{row.city === 'Birmingham' ? <strong>{row.city}</strong> : row.city}</td>
                      <td className="p-3 text-gray-700">{row.firms}</td>
                      <td className="p-3 text-red-600 font-medium">{row.noWebsite}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                          parseInt(row.rate) >= 25 ? 'bg-red-100 text-red-700' :
                          parseInt(row.rate) >= 15 ? 'bg-amber-100 text-amber-700' :
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
              Source: TendorAI database of estate agents, April 2026
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mt-6">
              <p className="text-sm text-blue-900">
                Having a website is the floor, not the ceiling. A Rightmove profile does not make you AI-visible. AI engines need structured data about your agency &mdash; your services, coverage area, regulatory memberships, and client money protection status &mdash; declared in machine-readable format on your own website.
              </p>
            </div>
          </section>

          {/* Module 2: How AI Selects */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">How AI Selects Which Birmingham Estate Agent to Recommend</h2>

            <p className="text-gray-600 leading-relaxed mb-6">
              When a potential vendor asks ChatGPT &ldquo;best estate agent in Birmingham for selling a house,&rdquo; the AI does not browse Rightmove. It does not check Zoopla. It draws on indexed, structured data it has already processed.
            </p>

            <p className="text-gray-700 font-semibold mb-4">The agencies it recommends share three characteristics:</p>

            <div className="grid sm:grid-cols-3 gap-4 mb-6">
              {[
                { num: '1', title: 'Crawlable web presence', desc: 'A website that AI engines can access and index — portal listings do not count' },
                { num: '2', title: 'Structured data', desc: 'Schema markup declaring services, location, and credentials explicitly' },
                { num: '3', title: 'Third-party citations', desc: 'Directories, review platforms, and membership bodies that validate the agency' },
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
                Agencies without all three are skipped &mdash; regardless of how many properties they have on Rightmove or how long they have been trading on the high street. <strong className="text-white">Portal dominance does not equal AI visibility. This is the structural problem TendorAI was built to solve.</strong>
              </p>
            </div>
          </section>

          {/* Module 3: Scale of Opportunity */}
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
              Estate agents sit in the middle of the pack &mdash; better than mortgage advisors, worse than accountants. But the critical insight is that estate agents have a unique blind spot: they assume portal presence equals digital visibility. It does not. Rightmove and Zoopla are property search engines, not agency directories. AI engines treat them as listing platforms, not as authoritative sources of information about individual agencies.
            </p>

            <p className="text-gray-600 leading-relaxed mb-4">
              Of the 68 Birmingham agencies with websites, the vast majority have no structured schema data, no machine-readable service declarations, and no mechanism for AI engines to verify their Propertymark membership, client money protection status, or coverage areas.
            </p>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p className="text-sm text-amber-800">
                  <strong className="text-amber-900">A Rightmove profile in 2026 is the equivalent of a Yellow Pages listing in 2005.</strong> It is necessary for property listings. It is useless for AI visibility.
                </p>
              </div>
            </div>
          </section>

          {/* Module 4: What AI-Cited Agencies Do Differently */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">What AI-Cited Birmingham Agencies Are Doing Differently</h2>

            <p className="text-gray-600 leading-relaxed mb-6">
              TendorAI&apos;s analysis of estate agents across the West Midlands that appear consistently in AI recommendation results identifies four common factors:
            </p>

            <div className="space-y-4">
              {[
                {
                  num: 1,
                  title: 'Declared credentials',
                  desc: 'Propertymark membership, NAEA Propertymark qualification, client money protection scheme details, and years of trading are explicitly declared in structured data — not buried in an About page or a Rightmove profile.',
                },
                {
                  num: 2,
                  title: 'Location specificity',
                  desc: 'City, postcode, and coverage area are machine-readable. "We cover the West Midlands" is useless to an AI engine. Structured address data with postcode, locality, and specific coverage postcodes is not.',
                },
                {
                  num: 3,
                  title: 'Service clarity',
                  desc: 'Services are listed as structured entities, not paragraph text. An AI cannot reliably extract "we handle sales, lettings, and property management" from a homepage. Schema-declared services are unambiguous.',
                },
                {
                  num: 4,
                  title: 'Third-party citation',
                  desc: 'The agency appears in authoritative directories that AI engines treat as trust signals. Google reviews, Trustpilot, The Property Ombudsman register, and structured directories like TendorAI provide the external validation that moves an agency from "possible result" to "confident recommendation."',
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

          {/* Module 5: What Changes in 2026 */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">What This Means for Birmingham Estate Agents in 2026</h2>

            <p className="text-gray-600 leading-relaxed mb-6">
              Three shifts are already underway that will accelerate AI&apos;s role in how vendors and buyers find estate agents in Birmingham:
            </p>

            <div className="space-y-6">
              <div className="border-l-4 border-[#1B4F72] pl-5">
                <h3 className="font-bold text-gray-900 mb-2">From portals to entities</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  AI engines rank agencies based on declared identity &mdash; who they are, what they do, where they operate, what credentials they hold &mdash; not how many listings they have on Rightmove. Propertymark membership and client money protection registration are emerging as primary trust signals for Birmingham estate agents.
                </p>
              </div>

              <div className="border-l-4 border-[#1B4F72] pl-5">
                <h3 className="font-bold text-gray-900 mb-2">Zero-click recommendations</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Queries like &ldquo;estate agent Birmingham to sell my house&rdquo; increasingly return a direct recommendation rather than a list of links. The agency recommended gets the enquiry. The agencies not recommended are not seen. The Birmingham property market is competitive enough without being invisible to an entire channel.
                </p>
              </div>

              <div className="border-l-4 border-[#1B4F72] pl-5">
                <h3 className="font-bold text-gray-900 mb-2">AI advertising</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Perplexity has opened sponsored placements in the UK. ChatGPT&apos;s ad model is in development. Birmingham agencies with structured profiles already in place will be first in line. Agencies without structured data cannot buy their way into these placements &mdash; the infrastructure has to exist first.
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
              TendorAI maintains the UK&apos;s largest structured database of regulated professional services firms &mdash; 12,793 businesses across solicitors, accountants, mortgage advisors, financial advisors, and estate agents, all sourced directly from SRA, ICAEW, FCA, and Propertymark registers.
            </p>

            <p className="text-gray-600 leading-relaxed mb-4">
              Every firm in the database has a structured profile. Pro firms have that profile extended to their own website via an automatically maintained schema installation &mdash; no developer required, no quarterly audits, no schema drift.
            </p>

            <p className="text-gray-600 leading-relaxed">
              When a potential vendor asks AI to recommend an estate agent in Birmingham, TendorAI-listed agencies have declared their credentials, location, services, and memberships in machine-readable format. That is why they get recommended.
            </p>
          </section>

          {/* CTA */}
          <section className="bg-gradient-to-br from-[#1B4F72] to-[#2d1b4e] text-white rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Run Your Free AI Visibility Report</h2>
            <p className="text-blue-100 mb-8 max-w-xl mx-auto">
              See where your Birmingham agency stands in 60 seconds. We&apos;ll scan ChatGPT, Perplexity, and Gemini to show you exactly what AI knows about your estate agency.
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
            Data sourced from TendorAI&apos;s database of estate agents, Propertymark registers, and The Property Ombudsman listings, April 2026. Firm counts reflect registered practices as of the most recent register import.
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
