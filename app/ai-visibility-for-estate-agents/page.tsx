import { Metadata } from 'next';
import Link from 'next/link';
import { CITIES } from '@/lib/constants/cities';

// ─── Page constants ───────────────────────────────────────────────────
const TITLE = 'AI Visibility for UK Estate Agents';
const DESCRIPTION =
  'How UK estate agents and letting agents get cited by ChatGPT, Perplexity, Claude, Gemini, Grok and Google AI Overviews — TPO/PRS/Propertymark data, structured signals, worked £ example.';
const CANONICAL = 'https://www.tendorai.com/ai-visibility-for-estate-agents';
const PUBLISHED = '2026-05-24';
const UPDATED = '2026-05-24';

const CTA_URL =
  '/aeo-report?utm_source=ai-visibility-for-estate-agents&utm_medium=landing&utm_campaign=estate-agents-cluster&utm_content=primary-cta';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: 'article',
    publishedTime: PUBLISHED,
    modifiedTime: UPDATED,
    authors: ['TendorAI'],
    url: CANONICAL,
    siteName: 'TendorAI',
    locale: 'en_GB',
    images: [{ url: '/logo.png', width: 873, height: 873, alt: TITLE }],
  },
  twitter: {
    card: 'summary',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/logo.png'],
  },
};

const faqs: Array<{ q: string; a: string }> = [
  {
    q: 'Does Propertymark, TPO or PRS membership automatically mean AI assistants will recommend my agency?',
    a: 'No. Membership of a redress scheme (TPO or PRS) and a professional body (Propertymark, NAEA for sales agents or ARLA for letting agents) is legally required and necessary, but not sufficient. AI engines need that membership data structured and machine-readable on the agency’s own website, consistent with each scheme’s register, Companies House and HMRC AML registration. The scheme registers themselves are rarely cited directly by AI engines as a recommendation source.',
  },
  {
    q: 'What’s the difference between an estate agent and a letting agent for AI visibility purposes?',
    a: 'An estate agent handles property sales between vendor and purchaser. A letting agent handles rentals between landlord and tenant. The two activities are regulated differently — letting agents must be in a government-backed redress scheme and (for client money) a Client Money Protection scheme; sales agents have separate obligations. For AI visibility, the agency should declare which activities it offers, and which scheme memberships cover them, in structured form on its website.',
  },
  {
    q: 'Is AI visibility the same as being on Rightmove or Zoopla?',
    a: 'No. Rightmove and Zoopla are property listing portals, not structured directories of agencies. AI engines build recommendations from structured data about the agency itself — services, scheme memberships, coverage area, fee transparency — not from individual property listings. Strong portal presence does not translate to AI visibility for the agency.',
  },
  {
    q: 'Which AI platforms cite UK estate agents most consistently in 2026?',
    a: 'Perplexity is the most active in citing specific UK firms by name in May 2026. ChatGPT and Claude follow. Google AI Overviews pulls heavily from Google Business Profile and on-site schema. Results shift between platforms and over time; a single test on a single platform is not a fixed property of any firm.',
  },
  {
    q: 'Does TendorAI guarantee my agency will be recommended by AI?',
    a: 'No. TendorAI is an AI visibility platform, not a source of property advice and not an outcome guarantee. The platform installs the structured signals AI engines use, audits the gaps and tracks citation frequency — but AI engine behaviour is platform-specific and changes over time.',
  },
  {
    q: 'Can I implement this without using TendorAI?',
    a: 'Yes. Schema.org JSON-LD, a structured website, consistent Propertymark, TPO/PRS, Companies House and HMRC AML entries and an active citation programme can be implemented manually. TendorAI automates the work and tracks the outcome — the citation gains are available either way.',
  },
];

function FAQSection() {
  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <details key={i} className="group bg-white border border-gray-200 rounded-lg">
          <summary className="flex items-center justify-between cursor-pointer p-5 text-left">
            <span className="font-medium text-gray-900 pr-4">{faq.q}</span>
            <svg className="w-5 h-5 text-gray-400 shrink-0 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="px-5 pb-5 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">{faq.a}</div>
        </details>
      ))}
    </div>
  );
}

export default function EstateAgentsAiVisibilityPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: TITLE,
    description: DESCRIPTION,
    datePublished: PUBLISHED,
    dateModified: UPDATED,
    author: { '@type': 'Organization', name: 'TendorAI', url: 'https://www.tendorai.com' },
    publisher: {
      '@type': 'Organization',
      name: 'TendorAI',
      url: 'https://www.tendorai.com',
      logo: { '@type': 'ImageObject', url: 'https://www.tendorai.com/logo.png', width: 873, height: 873 },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': CANONICAL },
    image: 'https://www.tendorai.com/logo.png',
    inLanguage: 'en-GB',
  };

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://www.tendorai.com/#organization',
    name: 'TendorAI',
    url: 'https://www.tendorai.com',
    logo: 'https://www.tendorai.com/logo.png',
    areaServed: { '@type': 'Country', name: 'United Kingdom' },
  };

  const realEstateAgentJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: 'AI Visibility Coverage for UK Estate Agents',
    description:
      'AI visibility platform for UK estate agents and letting agents — Schema.org JSON-LD on the agency’s website, structured content drafted under the agency’s byline, directory and citation auditing, and tracking across ChatGPT, Perplexity, Claude, Gemini, Grok and Google AI Overviews.',
    provider: { '@type': 'Organization', name: 'TendorAI', url: 'https://www.tendorai.com' },
    serviceType: 'AI visibility for UK estate agents and letting agents',
    areaServed: { '@type': 'Country', name: 'United Kingdom' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(realEstateAgentJsonLd) }} />

      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-brand-gradient text-white py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-xs uppercase tracking-[0.2em] text-white/80 mb-3">UK Estate Agents · Propertymark · TPO · PRS</p>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight" style={{ fontFamily: 'var(--font-serif)' }}>
              {TITLE}
            </h1>
            <p className="mt-4 text-lg md:text-xl text-white/90 max-w-3xl">
              Get your sales or letting agency cited by ChatGPT, Perplexity, Claude, Gemini, Grok and Google AI Overviews when prospective vendors, purchasers, landlords and tenants ask for an agent — by name, by service, by city.
            </p>
          </div>
        </section>

        {/* Intro — Section 25 */}
        <section className="py-12 md:py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-lg text-gray-700 leading-relaxed">
            <p>
              AI visibility for UK estate agents is the process of making an agency&rsquo;s redress-scheme, professional-body and trading data structured and verifiable so AI assistants — ChatGPT, Perplexity, Claude, Gemini, Grok and Google AI Overviews — name the agency when a prospective vendor, purchaser, landlord or tenant asks for an estate agent or letting agent. It is a separate discipline from Google SEO. Search rankings decide which links appear on a results page; AI visibility decides which agency names an AI assistant says out loud in the answer it gives.
            </p>
            <p>
              As of 23 May 2026, TendorAI&rsquo;s independently tracked AI visibility score reached 61.1%, up from 22.2% four days earlier (Searchable.com). The signal that moved the score was the same signal AI assistants use to decide which agencies to name: structured, dated, verifiable content cross-referenced against Propertymark, TPO, PRS, Companies House and HMRC anti-money-laundering (AML) registrations.
            </p>
            <p>
              For a UK independent agency, the buyer-side consequence is direct. A prospective vendor asking an AI for an &ldquo;estate agent in Cardiff to value my house&rdquo; or a tenant asking for a &ldquo;letting agent in Bristol for a two-bed flat&rdquo; is returned two or three named agencies. Agencies outside those two or three slots are not lower-ranked — they are absent from the answer, with no second page to scroll to.
            </p>
            <p>
              An independent sales agency that wins one additional AI-driven instruction per month — and converts it to a completed sale — at an illustrative £4,500 average commission (1.2% on a £375,000 sale) would add roughly £54,000 in commission income over twelve months — against £3,588 for a year of TendorAI Pro. The figures are illustrative, not a guarantee; the worked example with assumptions sits below.
            </p>
          </div>
        </section>

        {/* H2-1 What is AI visibility for estate agents? */}
        <section className="py-10 md:py-14 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5 text-gray-700 leading-relaxed">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-serif)' }}>
              What is AI visibility for estate agents?
            </h2>
            <p>
              AI visibility for estate agents is the discipline of making an agency&rsquo;s scheme memberships, services and credible citations machine-readable, so AI assistants name the agency in answers to recommendation queries. The agencies cited consistently in 2026 share the same three signals: Schema.org JSON-LD on the agency&rsquo;s own website, identity consistency across Propertymark, TPO or PRS, Companies House and HMRC AML registration, and citations from sources AI engines treat as authoritative for UK property information.
            </p>
            <p>
              UK estate-agency regulation is fragmented across several bodies. Every agent must belong to a government-backed redress scheme — The Property Ombudsman (TPO) or the Property Redress Scheme (PRS). Most reputable firms are also members of Propertymark — through NAEA Propertymark for sales agents or ARLA Propertymark for letting agents. Firms handling client money must hold Client Money Protection. Estate-agency businesses must register with HMRC for anti-money-laundering supervision. National Trading Standards Estate and Letting Agency Team (NTSELAT) provides national guidance. AI engines that find consistent data across these sources have something to verify; agencies that don&rsquo;t are skipped.
            </p>
            <p>
              AI assistants do not return ranked link lists. They return short, confident answers naming one to three agencies by name, then move on. When a user asks ChatGPT, Perplexity, Claude, Gemini, Grok or Google AI Overviews for an &ldquo;estate agent in Newport to sell my flat&rdquo;, the engine retrieves what it can verify and chooses which names to put in front of the user.
            </p>
            <p>
              Residential sales, lettings, property management, block management, commercial and new homes are the highest-volume recommendation categories in this vertical. Agencies that match the structured-data, consistency and citation signals on those queries are the agencies AI assistants are confident enough to name. SEO and AI visibility share some inputs but reward different outcomes — SEO improves the order of links, AI visibility decides whether your agency is named at all.
            </p>
          </div>
        </section>

        {/* H2-2 Why are most agencies invisible? */}
        <section className="py-10 md:py-14">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5 text-gray-700 leading-relaxed">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-serif)' }}>
              Why are most UK estate agents invisible in AI answers?
            </h2>
            <p>
              On TendorAI&rsquo;s own AI visibility score — independently tracked by Searchable.com — the move from 22.2% to 61.1% in four days (19 to 23 May 2026) was driven by structured, dated content. Most UK independent agencies are missing that structured layer entirely.
            </p>
            <p>
              The single most common cause is the absence of machine-readable schema on the agency&rsquo;s own website. A polished site full of property listings and area guides in plain prose is not the same as a site that declares RealEstateAgent schema with scheme memberships, named branch managers, services offered and coverage postcodes in JSON-LD. AI engines cannot reliably extract entity claims from prose; they read structured data first.
            </p>
            <p>
              The second common cause is identity inconsistency across the fragmented regulatory map. When an agency&rsquo;s trading name on the website, its Propertymark entry, its TPO or PRS listing, its Companies House record and its HMRC AML registration do not match exactly, the engine cannot resolve the agency as a single entity. AI engines that cannot confidently identify an agency tend to name a competitor with cleaner signals instead.
            </p>
            <p>
              The third cause is citation deficit. AI engines weight UK-specific property sources — Propertymark, TPO, Estate Agent Today, Property Industry Eye, Companies House — more heavily than generic directory listings or property portals. Portal listings (Rightmove, Zoopla) are about individual properties, not about the agency itself, so they do little to verify the agency as an entity. Agencies with no presence on the agency-level sources have nothing for the engine to cross-reference.
            </p>
            <p>
              None of these gaps reflect quality of service. They reflect how findable, verifiable and consistent the agency&rsquo;s identity is across the public web.
            </p>
          </div>
        </section>

        {/* H2-3 How does TendorAI get an estate agent cited? */}
        <section className="py-10 md:py-14 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5 text-gray-700 leading-relaxed">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-serif)' }}>
              How does TendorAI get an estate agent cited?
            </h2>
            <p>
              TendorAI&rsquo;s six-agent fleet runs daily on every Pro account with a single outcome metric: AI citation frequency. The platform is not a source of property advice; it is a visibility platform built around the citation signals AI engines actually use.
            </p>
            <p>
              Reconnaissance scans six AI platforms — ChatGPT, Perplexity, Claude, Gemini, Grok and Google AI Overviews — for the agency&rsquo;s service-and-postcode queries every day and records citation frequency. Detective diagnoses why the agency is missed, per platform, per prompt, with a specific recommended fix.
            </p>
            <p>
              Writer drafts three professionally-written articles per week under the agency&rsquo;s byline. Each article is structured for passage-level retrieval: every H2 opens with a direct answer, claims are dated, and references — Propertymark, TPO/PRS, Estate Agent Today, Property Industry Eye, Companies House — are linked. Articles publish to the agency&rsquo;s TendorAI profile and are formatted to deploy on the agency&rsquo;s own website.
            </p>
            <p>
              Engineering installs Schema.org JSON-LD — RealEstateAgent, Person entries for named valuers and branch managers, Service entries for sales, lettings and property management, and PostalAddress entries for each branch — on the agency&rsquo;s website. Listings audits the UK directories AI assistants cross-reference and flags where the agency is missing, or where its name, address or phone do not match.
            </p>
            <p>
              Reporter aggregates the week into a single Weekly Pro Report: visibility score, citations captured, missed queries, competitor moves and queued actions. Every change ships through an approval queue — the agency sees and approves every article and every schema change before it goes live.
            </p>
          </div>
        </section>

        {/* H2-4 Timeframe table */}
        <section className="py-10 md:py-14">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5 text-gray-700 leading-relaxed">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-serif)' }}>
              How long does it take to get AI-recommended?
            </h2>
            <p>
              It typically takes four to eight weeks for a UK independent agency with no prior structured data to appear in AI recommendations after deployment, and twelve to sixteen weeks to be cited consistently. The timeline depends on starting point — an agency with clean Propertymark and TPO or PRS entries and a crawlable website moves faster than one fixing inconsistent details across several schemes first.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-50">
                  <tr className="text-left">
                    <th className="py-3 px-4 font-semibold text-gray-900">Stage</th>
                    <th className="py-3 px-4 font-semibold text-gray-900">Timeframe</th>
                    <th className="py-3 px-4 font-semibold text-gray-900">What happens</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr><td className="py-3 px-4">Schema deployment</td><td className="py-3 px-4 whitespace-nowrap">24–48 hours</td><td className="py-3 px-4">JSON-LD goes live on the agency&rsquo;s website</td></tr>
                  <tr><td className="py-3 px-4">First AI crawl</td><td className="py-3 px-4 whitespace-nowrap">1–2 weeks</td><td className="py-3 px-4">ChatGPT, Perplexity and Claude crawlers index it</td></tr>
                  <tr><td className="py-3 px-4">Citation appearance</td><td className="py-3 px-4 whitespace-nowrap">4–8 weeks</td><td className="py-3 px-4">Agency starts appearing on target queries</td></tr>
                  <tr><td className="py-3 px-4">Consistent citation</td><td className="py-3 px-4 whitespace-nowrap">12–16 weeks</td><td className="py-3 px-4">Cited consistently on main buyer queries</td></tr>
                  <tr><td className="py-3 px-4">Compounding authority</td><td className="py-3 px-4 whitespace-nowrap">6+ months</td><td className="py-3 px-4">Citations reinforce each other</td></tr>
                </tbody>
              </table>
            </div>
            <p>
              AI engine responses shift between runs and over time. The figures above are a snapshot, not a fixed property of any agency; results depend on platform behaviour and the agency&rsquo;s existing data quality.
            </p>
          </div>
        </section>

        {/* H2-5 Worked £ example */}
        <section className="py-10 md:py-14 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5 text-gray-700 leading-relaxed">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-serif)' }}>
              What this looks like for an independent UK sales agency
            </h2>
            <p>
              An independent UK estate agency running TendorAI Pro at £299 per month — £3,588 per year — that wins one additional AI-driven instruction per month and converts it to a completed sale, at an illustrative £4,500 average commission (1.2% on a £375,000 sale), would add approximately £54,000 in commission income over twelve months.
            </p>
            <p>
              The figures above are illustrative, not a guarantee. Actual outcomes depend on the agency&rsquo;s commission structure, instruction-to-completion conversion rate, average sale price in the local market, and the AI platforms used by the agency&rsquo;s target vendors. Many factors decide whether an instruction reaches completion.
            </p>
            <p>
              The shape of the example matters more than the exact figures. Higher-value markets — central London, prime regional towns — would change the worked total upward. Lower-value markets would change it downward. The cost anchor — £3,588 per year — is fixed regardless of average sale price.
            </p>
            <p>
              Against that £3,588 annual cost, the break-even point in this example is approximately one additional completion per year at the £4,500 commission level. Anything above that is contribution, not cost. The point of the example is the order of magnitude: the cost of being absent from AI answers is measured in lost instructions, not in software fees.
            </p>
          </div>
        </section>

        {/* H2-6 FAQ */}
        <section className="py-10 md:py-14">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'var(--font-serif)' }}>
              Frequently asked questions
            </h2>
            <FAQSection />
          </div>
        </section>

        {/* Single CTA */}
        <section className="py-12 md:py-16 bg-brand-gradient text-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <p className="text-lg md:text-xl text-white/95">
              See where your agency appears across ChatGPT, Perplexity, Claude, Gemini, Grok and Google AI Overviews — the report runs in 60 seconds.
            </p>
            <Link href={CTA_URL} className="inline-flex items-center px-6 py-3 rounded-lg bg-white text-purple-700 font-semibold hover:bg-gray-100 transition-colors">
              Run your free AI visibility report
            </Link>
          </div>
        </section>

        {/* Internal links */}
        <section className="py-10 bg-white border-t border-gray-200">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 grid sm:grid-cols-3 gap-4 text-sm">
            <Link href="/blog/how-to-get-estate-agency-recommended-by-chatgpt" className="text-purple-700 hover:underline">
              How to get your estate agency recommended by ChatGPT &rarr;
            </Link>
            <Link href="/ai-visibility-platform" className="text-purple-700 hover:underline">
              How the TendorAI platform works &rarr;
            </Link>
            <Link href="/best-ai-visibility-tools-uk-solicitors" className="text-purple-700 hover:underline">
              Compare TendorAI to other AI visibility tools &rarr;
            </Link>
          </div>
        </section>

        {/* By-city grid */}
        <section className="py-14 bg-white border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
              AI Visibility for Estate Agents by City
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 max-w-5xl mx-auto">
              {CITIES.map((city) => (
                <Link
                  key={city.slug}
                  href={`/ai-visibility-for-estate-agents/${city.slug}`}
                  className="text-sm text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg px-3 py-2 transition-colors text-center"
                >
                  Estate agents in {city.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Compliance footer */}
        <section className="py-8 bg-gray-50 border-t border-gray-200">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-xs text-gray-500">
              TendorAI is an AI visibility platform. It is not a source of property advice. No outcome guarantees are made or implied.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
