import { Metadata } from 'next';
import Link from 'next/link';

const TITLE = 'AI Visibility Report: London Estate Agents 2026 — TendorAI Research';
const DESCRIPTION =
  'TendorAI tracks 580 estate agents in London. The UK\'s biggest property market — but AI doesn\'t read Rightmove. Here\'s who AI is actually recommending.';
const CANONICAL = 'https://www.tendorai.com/blog/ai-visibility-report-estate-agents-london';
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
  { city: 'Manchester', firms: '112', noWebsite: '14', rate: '13%' },
  { city: 'Birmingham', firms: '98', noWebsite: '13', rate: '13%' },
  { city: 'Leeds', firms: '64', noWebsite: '7', rate: '11%' },
  { city: 'Bristol', firms: '52', noWebsite: '5', rate: '10%' },
  { city: 'Liverpool', firms: '47', noWebsite: '6', rate: '13%' },
  { city: 'Edinburgh', firms: '44', noWebsite: '4', rate: '9%' },
];

const verticalData = [
  { vertical: 'Solicitors', firms: '8,625', noWebsite: '1,458', rate: '17%' },
  { vertical: 'Accountants', firms: '1,380', noWebsite: '21', rate: '2%' },
  { vertical: 'Estate Agents', firms: '1,620', noWebsite: '162', rate: '10%' },
  { vertical: 'Mortgage Advisors', firms: '1,100', noWebsite: '532', rate: '48%' },
  { vertical: 'Financial Advisors', firms: '525', noWebsite: '110', rate: '21%' },
];

const faqs = [
  {
    q: 'Does my London estate agency appear when someone asks AI to recommend an agent?',
    a: 'If your agency has no website, no. If your agency has a website but no structured data, probably not. TendorAI offers a free AI Visibility Report that scans ChatGPT, Perplexity, and Gemini to show you exactly where you stand.',
  },
  {
    q: 'How many London estate agents are AI-visible?',
    a: 'TendorAI tracks 580 estate agents in London. 58 have no website. Of the remaining 522, the majority have no structured schema data — meaning even agencies with websites are likely invisible to AI recommendation engines.',
  },
  {
    q: 'My agency is on Rightmove and Zoopla — does that count as AI visibility?',
    a: 'No. Rightmove, Zoopla, and OnTheMarket are property listing portals — they showcase properties, not agents. AI engines looking to recommend an estate agent draw on structured firm-level data: schema markup, regulatory listings, and third-party citations. Portal presence does not translate to AI presence.',
  },
  {
    q: 'Is AI visibility different from SEO for estate agents?',
    a: 'Yes. Traditional SEO optimises for keyword ranking in link-based search results. AI visibility (AEO — Answer Engine Optimisation) optimises for entity recognition in conversational AI responses. The techniques overlap but the mechanisms are different.',
  },
  {
    q: 'Will AI recommendations replace Google for property queries?',
    a: 'For high-intent queries ("find me a good estate agent in Islington"), AI is already answering directly without returning links. According to industry data, AI Overviews now appear in over 60% of searches. Agencies not visible in AI responses are missing an increasing share of vendor and buyer enquiries.',
  },
  {
    q: 'How does TendorAI know which estate agents are AI-visible?',
    a: "TendorAI\u2019s platform runs structured scans across ChatGPT, Perplexity, and Gemini using borough- and service-specific prompts. Results are logged, scored, and reported back to the firm via the dashboard.",
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

export default function AIVisibilityReportLondonEstateAgents() {
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
      'AI visibility estate agents London',
      'London estate agents AI',
      'London estate agent AI recommendations',
      'ChatGPT estate agent London',
      'AI visibility report London',
      'estate agent AI discovery London',
    ],
    wordCount: 2600,
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
              <span className="text-white">London Estate Agents AI Visibility</span>
            </nav>

            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 text-sm font-medium rounded-full bg-white/20 text-white">
                AEO Research
              </span>
              <span className="text-blue-200">12 min read</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              AI Visibility Report: London Estate Agents 2026
            </h1>

            <p className="text-lg text-blue-100 leading-relaxed max-w-3xl">
              TendorAI tracks 580 estate agents in London. <strong>58 have no website &mdash; 10%</strong>. But the real problem is bigger: AI doesn&apos;t read Rightmove. Here&apos;s who AI is actually recommending.
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
              <div className="text-4xl font-bold text-[#1B4F72]">580</div>
              <div className="text-sm text-gray-500">estate agents in London</div>
            </div>
            <div className="h-px sm:h-12 sm:w-px bg-gray-200 w-full sm:w-auto" />
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600">58</div>
              <div className="text-sm text-gray-500">with no website</div>
            </div>
            <div className="h-px sm:h-12 sm:w-px bg-gray-200 w-full sm:w-auto" />
            <div className="text-center">
              <div className="text-4xl font-bold text-amber-600">10%</div>
              <div className="text-sm text-gray-500">completely invisible</div>
            </div>
          </div>
        </section>

        {/* Article content */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16">
          {/* Opening */}
          <section className="mb-12">
            <p className="text-lg text-gray-600 leading-relaxed mb-4">
              <strong className="text-gray-900">London is the UK&apos;s biggest property market. 580 estate agents compete for vendor instructions, buyer enquiries, and lettings mandates across 33 boroughs.</strong> 58 of those agencies &mdash; 10% &mdash; have no website at all, making them completely undetectable by ChatGPT, Gemini, and Perplexity.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-4">
              But the 10% figure understates the problem. Most London agents have a website. Most London agents are on Rightmove, Zoopla, and OnTheMarket. And most London agents assume that is enough.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              It is not. AI engines do not read property portals. They do not scrape Rightmove listings to work out which agent is good. When someone asks ChatGPT &ldquo;best estate agent in Hackney&rdquo; or &ldquo;recommend an estate agent for selling a flat in Wandsworth,&rdquo; the AI draws on structured, machine-readable data about the firm itself &mdash; not its property listings.
            </p>
          </section>

          {/* Module 1: The Invisibility Problem */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">The Invisibility Problem: London in Context</h2>

            <p className="text-gray-600 leading-relaxed mb-4">
              Of London&apos;s 580 estate agents tracked by TendorAI:
            </p>

            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                <span className="text-gray-700"><strong>522 agencies have a website</strong> &mdash; the minimum requirement to be detectable by AI</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                <span className="text-gray-700"><strong>58 agencies have no website at all</strong> &mdash; 10% of all London practices</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0" />
                <span className="text-gray-700">Nationally, <strong>10% of estate agents tracked by TendorAI have no web presence</strong></span>
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
                    <tr key={i} className={`${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'} ${row.city === 'London' ? 'ring-2 ring-[#1B4F72] ring-inset' : ''}`}>
                      <td className="p-3 text-gray-900 font-medium">{row.city === 'London' ? <strong>{row.city}</strong> : row.city}</td>
                      <td className="p-3 text-gray-700">{row.firms}</td>
                      <td className="p-3 text-red-600 font-medium">{row.noWebsite}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                          parseInt(row.rate) >= 25 ? 'bg-red-100 text-red-700' :
                          parseInt(row.rate) >= 12 ? 'bg-amber-100 text-amber-700' :
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
              Source: TendorAI database of UK estate agents, April 2026
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mt-6">
              <p className="text-sm text-blue-900">
                London&apos;s 10% invisibility rate looks low compared to other professions. But with 580 agents competing across 33 boroughs, the real question is not &ldquo;do you have a website?&rdquo; &mdash; it is &ldquo;can AI distinguish you from the other 521 agencies that also have one?&rdquo;
              </p>
            </div>
          </section>

          {/* Module 2: The Portal Illusion */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">The Portal Illusion: Why Rightmove Presence Does Not Equal AI Presence</h2>

            <p className="text-gray-600 leading-relaxed mb-6">
              London estate agents spend thousands of pounds per month on Rightmove, Zoopla, and OnTheMarket listings. These portals are designed for property discovery &mdash; buyers searching for homes, tenants searching for flats. They are not designed for agent discovery.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              When a potential vendor asks ChatGPT &ldquo;which estate agent should I use to sell my house in Clapham?&rdquo; or a relocating buyer asks Perplexity &ldquo;best estate agent in Canary Wharf for new-builds,&rdquo; the AI does not visit Rightmove. It draws on indexed, structured data it has already processed about the agent as a business entity.
            </p>

            <p className="text-gray-700 font-semibold mb-4">The agencies AI recommends share three characteristics:</p>

            <div className="grid sm:grid-cols-3 gap-4 mb-6">
              {[
                { num: '1', title: 'Crawlable web presence', desc: 'A website that AI engines can access and index — not a Rightmove branch page' },
                { num: '2', title: 'Structured data', desc: 'Schema markup declaring services, coverage areas, regulatory memberships, and credentials' },
                { num: '3', title: 'Third-party citations', desc: 'Directories, review platforms, and regulatory registers that validate the agency independently' },
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
                Your Rightmove spend gets your properties seen. It does not get your agency recommended. <strong className="text-white">AI recommendation is a separate channel &mdash; and right now, most London agents are not in it.</strong>
              </p>
            </div>
          </section>

          {/* Module 3: Borough-Level Competition */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Borough-Level Competition: 580 Agents, 33 Boroughs</h2>

            <p className="text-gray-600 leading-relaxed mb-6">
              London is not one market &mdash; it is 33 boroughs, each with its own price dynamics, housing stock, and competitive landscape. The average London house price exceeds &pound;530,000 (Land Registry, 2025), but borough-level variation is enormous: from under &pound;300,000 in Barking and Dagenham to over &pound;1.4 million in Kensington and Chelsea.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              AI queries reflect this specificity. Users do not ask &ldquo;best estate agent in London&rdquo; &mdash; they ask &ldquo;best estate agent in Brixton,&rdquo; &ldquo;good letting agent near King&apos;s Cross,&rdquo; or &ldquo;recommend an agent for selling a Victorian terrace in Dulwich.&rdquo;
            </p>

            <p className="text-gray-600 leading-relaxed mb-4">
              This means a London estate agent needs to be AI-visible at the borough and neighbourhood level &mdash; not just as a generic London business. The agencies winning these queries have:
            </p>

            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-[#1B4F72] rounded-full mt-2 flex-shrink-0" />
                <span className="text-gray-700"><strong>Borough-specific service pages</strong> with structured schema declaring coverage areas</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-[#1B4F72] rounded-full mt-2 flex-shrink-0" />
                <span className="text-gray-700"><strong>Local market knowledge</strong> surfaced as structured content, not buried in blog posts</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-[#1B4F72] rounded-full mt-2 flex-shrink-0" />
                <span className="text-gray-700"><strong>Consistent NAP data</strong> (name, address, phone) across Google Business Profile, Propertymark, and their own website</span>
              </li>
            </ul>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p className="text-sm text-amber-800">
                  <strong className="text-amber-900">With 580 agents competing across London, the window to establish AI visibility at borough level is closing fast.</strong> The first agencies to claim structured positions in each borough will be the hardest to displace.
                </p>
              </div>
            </div>
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
                    <tr key={i} className={`${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'} ${row.vertical === 'Estate Agents' ? 'ring-2 ring-[#1B4F72] ring-inset' : ''}`}>
                      <td className="p-3 text-gray-900 font-medium">{row.vertical === 'Estate Agents' ? <strong>{row.vertical}</strong> : row.vertical}</td>
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
              Estate agents have a better web presence than mortgage advisors (48% invisible) or financial advisors (21%), but a worse position than accountants (2%). The 10% headline rate masks the deeper issue: of the 522 London agencies with websites, the vast majority have no structured schema data, no AI-optimised content, and no mechanism for AI engines to verify their credentials or coverage areas.
            </p>

            <p className="text-gray-600 leading-relaxed">
              Client money protection, Propertymark or NAEA Propertymark membership, and compliance with the Estate Agents Act 1979 are trust signals that matter to consumers &mdash; and to AI. But only if they are declared in machine-readable format.
            </p>
          </section>

          {/* Module 5: What AI-Cited Agents Do Differently */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">What AI-Cited London Agencies Are Doing Differently</h2>

            <p className="text-gray-600 leading-relaxed mb-6">
              TendorAI&apos;s analysis of London estate agents that appear consistently in AI recommendation results identifies four common factors:
            </p>

            <div className="space-y-4">
              {[
                {
                  num: 1,
                  title: 'Declared credentials',
                  desc: 'Propertymark membership, NAEA qualifications, client money protection scheme membership, and HMLS registration are explicitly declared in structured data — not buried in a footer or compliance page.',
                },
                {
                  num: 2,
                  title: 'Borough-level specificity',
                  desc: 'Coverage areas are machine-readable at the borough and postcode level. "We cover South London" is useless to an AI engine. Structured address data with postcodes, boroughs, and specific neighbourhoods is not.',
                },
                {
                  num: 3,
                  title: 'Service clarity',
                  desc: 'Sales, lettings, property management, and valuations are listed as structured entities, not paragraph text. An AI cannot reliably extract "we handle lettings in Hackney" from a homepage. Schema-declared services are unambiguous.',
                },
                {
                  num: 4,
                  title: 'Third-party citation',
                  desc: 'The agency appears in authoritative directories that AI engines treat as trust signals. Google reviews, Trustpilot, the Propertymark register, The Property Ombudsman, and structured directories like TendorAI provide the external validation that moves an agency from "possible result" to "confident recommendation."',
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
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">What This Means for London Estate Agents in 2026</h2>

            <p className="text-gray-600 leading-relaxed mb-6">
              Three shifts are already underway that will accelerate AI&apos;s role in how vendors and buyers find estate agents in London:
            </p>

            <div className="space-y-6">
              <div className="border-l-4 border-[#1B4F72] pl-5">
                <h3 className="font-bold text-gray-900 mb-2">From portals to AI recommendations</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Rightmove, Zoopla, and OnTheMarket dominate property search. But agent selection is shifting. When a vendor needs to choose who to instruct, AI is increasingly the first place they ask. The agent recommended gets the valuation appointment. The agents not recommended are not considered.
                </p>
              </div>

              <div className="border-l-4 border-[#1B4F72] pl-5">
                <h3 className="font-bold text-gray-900 mb-2">Zero-click recommendations</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Queries like &ldquo;best estate agent in Islington for period properties&rdquo; increasingly return a direct recommendation rather than a list of links. The agency recommended gets the enquiry. The agencies not recommended are not seen.
                </p>
              </div>

              <div className="border-l-4 border-[#1B4F72] pl-5">
                <h3 className="font-bold text-gray-900 mb-2">AI advertising</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Perplexity has opened sponsored placements in the UK. ChatGPT&apos;s ad model is in development. London agencies with structured profiles already in place will be first in line. Agencies without structured data cannot buy their way into these placements &mdash; the infrastructure has to exist first.
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
              When a potential vendor asks AI to recommend an estate agent in Fulham, or a buyer asks for the best letting agent near Canary Wharf, TendorAI-listed agencies have declared their credentials, coverage areas, services, and regulatory memberships in machine-readable format. That is why they get recommended.
            </p>
          </section>

          {/* CTA */}
          <section className="bg-gradient-to-br from-[#1B4F72] to-[#2d1b4e] text-white rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Run Your Free AI Visibility Report</h2>
            <p className="text-blue-100 mb-8 max-w-xl mx-auto">
              See where your London agency stands in 60 seconds. We&apos;ll scan ChatGPT, Perplexity, and Gemini to show you exactly what AI knows about your estate agency.
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
            Data sourced from TendorAI&apos;s database of estate agents, Propertymark, and regulatory registers, April 2026. Firm counts reflect registered practices as of the most recent register import.
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
