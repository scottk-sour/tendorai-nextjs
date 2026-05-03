import { Metadata } from 'next';
import Link from 'next/link';
import { CITIES } from '@/lib/constants/cities';

const TITLE = 'AI Visibility for UK Estate Agents 2026 — Get Recommended by ChatGPT';
const DESCRIPTION =
  'How UK estate agents get recommended by ChatGPT, Perplexity and Google AI Overviews in 2026. Ranked guide, FAQ, regulatory data from 12,793 firms.';
const CANONICAL = 'https://www.tendorai.com/ai-visibility-for-estate-agents';
const PUBLISHED = '2024-01-01';
const UPDATED = '2026-05-04';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: 'AI Visibility for UK Estate Agents — The Complete Guide (2026)',
    description: DESCRIPTION,
    url: CANONICAL,
    siteName: 'TendorAI',
    locale: 'en_GB',
    type: 'article',
    publishedTime: PUBLISHED,
    modifiedTime: UPDATED,
    authors: ['Scott Kingsley Davies'],
    images: [{ url: '/logo.png', width: 873, height: 873, alt: TITLE }],
  },
  twitter: {
    card: 'summary',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/logo.png'],
  },
};

const faqs = [
  {
    q: 'How do AI assistants like ChatGPT decide which estate agents to recommend?',
    a: 'AI assistants build their answers from structured data they can verify, third-party citations they can cross-reference, and the sources their training and retrieval pipelines treat as authoritative. For UK estate agents that means The Property Ombudsman or Property Redress Scheme membership, ARLA Propertymark accreditation where it applies, schema markup on the firm’s own website, consistent name, address and phone data across the web, and reviews on platforms the model already trusts. The firms that show up in answers are the firms easiest for an AI to verify.',
  },
  {
    q: 'Does my estate agency need to be on TendorAI to appear in ChatGPT?',
    a: 'No. AI assistants pull from many sources, and a well-structured website with TPO or PRS membership clearly displayed and reviews on a third-party platform can be cited without TendorAI. What TendorAI does is shorten the path: we publish your verified profile in the structured format AI engines parse most reliably, link it to your regulatory data, and make sure the schema on your own site stays current. If you do nothing else, fix your website schema and your review presence first — that alone moves the needle.',
  },
  {
    q: 'What schema markup do estate agents need for AI visibility?',
    a: 'At minimum: Organization, LocalBusiness and RealEstateAgent JSON-LD on your homepage and every branch location page. Add PostalAddress with a real UK postcode, areaServed mapped to the towns and postcodes you actually cover, sameAs links to your TPO or PRS register entry and your social profiles, and aggregateRating only when you have a verified review source to back it up. Use FAQPage schema on your sales, lettings and valuations pages where you answer common buyer and landlord questions. Don’t mark up content that isn’t visible — Google penalises hidden schema.',
  },
  {
    q: 'How long does it take for a UK estate agency to appear in ChatGPT recommendations?',
    a: 'Schema and NAP fixes show citation impact within four to eight weeks. Building third-party authority — Reddit answers in UK property subs, YouTube market commentary, earned mentions on local news sites — takes three to six months. Named-author content with consistent profiles across LinkedIn and Companies House compounds over six to twelve months. There is no overnight path. The estate agencies recommended consistently in 2026 are the ones who started fixing the basics in 2025.',
  },
  {
    q: 'Do client reviews affect AI recommendations for estate agents?',
    a: 'Yes — but only reviews on third-party platforms AI assistants already trust. Reviews on your own website are largely ignored because the model can’t verify them independently. Google reviews and reviews on accredited estate-agent platforms carry weight. So do mentions in property-press articles and earned coverage in local newspapers. Aim for a steady cadence of recent reviews — five reviews from the last six months beat fifty reviews from 2019. Quality and recency outweigh raw count.',
  },
  {
    q: 'How is AI visibility different from SEO for estate agents?',
    a: 'SEO targets Google’s ranking algorithm — keywords, backlinks, site speed, page authority. AI visibility targets retrieval-augmented generation across ChatGPT, Perplexity, Claude, Google AI Overviews and Meta AI, each of which has different citation patterns. A page that ranks first on Google for "estate agents in Bristol" can win zero AI citations if it lacks structured data, named-entity verification and third-party authority. Conversely, a smaller firm with strong schema and verified TPO membership can be cited by AI when a much larger competitor is ignored.',
  },
];

const cityBlogLinks = [
  { name: 'Cardiff', href: '/blog/ai-visibility-report-estate-agents-cardiff' },
  { name: 'Bristol', href: '/blog/ai-visibility-report-estate-agents-bristol' },
  { name: 'Manchester', href: '/blog/ai-visibility-report-estate-agents-manchester' },
  { name: 'Birmingham', href: '/blog/ai-visibility-report-estate-agents-birmingham' },
  { name: 'London', href: '/blog/ai-visibility-report-estate-agents-london' },
];

export default function EstateAgentsPillarPage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'AI Visibility for UK Estate Agents — The Complete Guide (2026)',
    description: DESCRIPTION,
    author: {
      '@type': 'Person',
      name: 'Scott Kingsley Davies',
      jobTitle: 'Founder',
      worksFor: { '@type': 'Organization', name: 'TendorAI', url: 'https://www.tendorai.com' },
    },
    publisher: {
      '@type': 'Organization',
      name: 'TendorAI',
      url: 'https://www.tendorai.com',
      logo: { '@type': 'ImageObject', url: 'https://www.tendorai.com/logo.png' },
    },
    datePublished: PUBLISHED,
    dateModified: UPDATED,
    mainEntityOfPage: { '@type': 'WebPage', '@id': CANONICAL },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  // Per CLAUDE.md: BreadcrumbList may include Home as the first item per Google guidance.
  // Spec for this page asks for no Home in breadcrumb — honouring spec.
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'AI Visibility', item: 'https://www.tendorai.com/ai-visibility-platform' },
      { '@type': 'ListItem', position: 2, name: 'Estate Agents', item: CANONICAL },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-brand-gradient text-white py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="text-sm mb-4 text-purple-200" aria-label="Breadcrumb">
              <Link href="/ai-visibility-platform" className="hover:text-white">AI Visibility</Link>
              <span className="mx-2">/</span>
              <span className="text-white">Estate Agents</span>
            </nav>
            <h1 className="font-serif text-3xl md:text-5xl font-bold mb-4 leading-tight">
              AI Visibility for UK Estate Agents — The Complete Guide (2026)
            </h1>
            <p className="text-sm text-purple-200">
              By Scott Kingsley Davies, Founder, TendorAI. Last updated: 4 May 2026.
            </p>
          </div>
        </section>

        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Direct-answer paragraph for AI extraction */}
          <p className="text-lg leading-relaxed text-[var(--text)] mb-8 font-medium">
            UK estate agents get recommended by ChatGPT, Perplexity and Google AI Overviews when their firm is verifiable, structured and cited by third parties. Based on TendorAI&rsquo;s analysis of 12,793 UK regulated firms, the estate agencies that win AI citations have three traits in common: visible Property Ombudsman or Property Redress Scheme membership, RealEstateAgent and LocalBusiness schema on every branch page, and recent reviews on platforms AI engines already trust.
          </p>

          <p className="text-[var(--text2)] leading-relaxed mb-6">
            Independent tracking by Searchable.com on 3 May 2026 showed UK estate agents cited zero out of three across ChatGPT, Perplexity and Google AI Overviews when prompted for property recommendations — the only vertical actively losing share. The fix is structural and well understood. The firms that act first will own the answers.
          </p>

          <h2 className="font-serif text-2xl md:text-3xl font-bold text-[var(--text)] mt-12 mb-6">
            The 12 things UK estate agents must do to get recommended by ChatGPT in 2026
          </h2>

          <h3 className="font-serif text-xl font-bold text-[var(--text)] mt-8 mb-3">
            1. Get listed in a verified UK estate agent directory with structured data
          </h3>
          <p className="text-[var(--text2)] leading-relaxed mb-6">
            AI assistants pull from sources they can cross-reference. A standalone agency website is one signal; a verified directory listing is a second, independent signal that confirms the firm exists, is active and matches the regulator records. Directories that publish JSON-LD profiles are read more reliably than those that don&rsquo;t. The firms that consistently appear in ChatGPT answers for &quot;best estate agent in Manchester&quot; are almost always present in at least two structured directories that AI engines can parse without guessing. Get your firm onto a directory that publishes verified, machine-readable profiles — one that links your TPO membership, your branch addresses and your covered postcodes in a single record.
          </p>

          <h3 className="font-serif text-xl font-bold text-[var(--text)] mt-8 mb-3">
            2. Install LocalBusiness + RealEstateAgent schema on your website
          </h3>
          <p className="text-[var(--text2)] leading-relaxed mb-6">
            Schema markup is the only language AI engines parse fluently. Without it, your homepage is prose to a human and noise to a model. The minimum stack for a UK estate agency is Organization, LocalBusiness and RealEstateAgent JSON-LD, with PostalAddress, areaServed mapped to real postcodes, and sameAs links to your regulator and social profiles. If you operate multiple branches, each branch page needs its own LocalBusiness block with the branch&rsquo;s specific address and phone. Generic site-wide schema is worse than no schema because it confuses the model. Install JSON-LD per branch, link it to your TPO or PRS register entry, and validate with Google&rsquo;s Rich Results Test.
          </p>

          <h3 className="font-serif text-xl font-bold text-[var(--text)] mt-8 mb-3">
            3. Display Property Ombudsman or Property Redress Scheme membership prominently
          </h3>
          <p className="text-[var(--text2)] leading-relaxed mb-6">
            Every UK estate agent must belong to{' '}
            <a href="https://www.tpos.co.uk" target="_blank" rel="noopener noreferrer" className="text-purple-600 underline">The Property Ombudsman</a>{' '}or the{' '}
            <a href="https://www.theprs.co.uk" target="_blank" rel="noopener noreferrer" className="text-purple-600 underline">Property Redress Scheme</a>{' '}— it&rsquo;s a regulatory requirement. AI engines treat these memberships as ground-truth verification. The problem is most agency websites bury the badge in the footer or omit it entirely from machine-readable markup. Place the membership scheme name and your member number visibly on your homepage, your About page and your contact page, and add it to your schema as an identifier or memberOf field. AI cross-references regulator registers; if your website doesn&rsquo;t match the public record, you lose the citation.
          </p>

          <h3 className="font-serif text-xl font-bold text-[var(--text)] mt-8 mb-3">
            4. Show client reviews on a third-party verified platform
          </h3>
          <p className="text-[var(--text2)] leading-relaxed mb-6">
            Reviews on your own website are not citation-grade for AI. The model can&rsquo;t verify them independently. Reviews on Google, Trustpilot, allAgents or industry-specific platforms are. Aim for a steady cadence — five recent reviews from the last six months are worth more than fifty reviews from 2019. AI engines weight recency heavily. The firms cited in 2026 ChatGPT answers for residential lettings or sales typically have at least 25 verified reviews from the last twelve months across one or two third-party platforms. Don&rsquo;t game it; ask every completed client for a review and make the link one click on your follow-up email.
          </p>

          <h3 className="font-serif text-xl font-bold text-[var(--text)] mt-8 mb-3">
            5. Maintain a Google Business Profile with up-to-date opening hours
          </h3>
          <p className="text-[var(--text2)] leading-relaxed mb-6">
            Google AI Overviews lean heavily on Google Business Profile data. An incomplete or stale profile pushes you out of local property recommendations entirely. The basics: complete every field, add photos of every branch, list opening hours including bank holiday variations, set the correct service area, and respond to every review within seven days. Add a Q&amp;A section answering common buyer and landlord questions. Update the profile whenever a branch moves or a phone number changes. Inconsistency between your Google Business Profile and your website is one of the most common reasons UK estate agents are skipped in AI answers.
          </p>

          <h3 className="font-serif text-xl font-bold text-[var(--text)] mt-8 mb-3">
            6. Publish location-specific pages for every area you cover
          </h3>
          <p className="text-[var(--text2)] leading-relaxed mb-6">
            A single &quot;Areas We Cover&quot; page listing fifty postcodes wins nothing. AI engines reward dedicated, substantive pages per area. If you cover ten Cardiff suburbs, write ten pages — each with the area&rsquo;s actual character, average sale price ranges from your own data, your branch contact for that area, and area-specific testimonials. Each page gets its own LocalBusiness schema with areaServed scoped to that postcode. This is also how you compete with corporate estate agency chains in AI answers — they have national content; you have a local depth they can&rsquo;t match. Publish ten genuine area pages over a quarter, not fifty thin ones in a week.
          </p>

          <h3 className="font-serif text-xl font-bold text-[var(--text)] mt-8 mb-3">
            7. Use FAQ schema on key service pages
          </h3>
          <p className="text-[var(--text2)] leading-relaxed mb-6">
            FAQPage JSON-LD is the highest-leverage on-page schema you can add for AI visibility. ChatGPT and Perplexity actively extract FAQ blocks as direct answers. Add eight to twelve real questions to your sales page, your lettings page and your valuations page — questions actual clients ask, with concise 60-100 word answers. Don&rsquo;t pad. Don&rsquo;t mark up content that isn&rsquo;t visible — Google penalises hidden FAQ schema. Topics that perform: &quot;how much does it cost to sell a house in [area]&quot;, &quot;what fees do estate agents charge in [area]&quot;, &quot;how long does conveyancing take in [area]&quot;. Every well-written FAQ block is a potential direct citation in an AI answer.
          </p>

          <h3 className="font-serif text-xl font-bold text-[var(--text)] mt-8 mb-3">
            8. Get cited in third-party &quot;best of&quot; lists
          </h3>
          <p className="text-[var(--text2)] leading-relaxed mb-6">
            Searchable.com data shows ranked-list content holds 20.8% of all AI citation share — the single highest-citing format. When ChatGPT answers &quot;best estate agents in Bristol&quot;, it&rsquo;s often quoting a list someone else published. Pitch local property journalists, allAgents, and regional business publications. Submit data — your own sold-price stats, time-on-market figures, average rental yields — that makes their list more accurate. Earned mentions on Tier 2 publications like the property pages of regional news outlets carry weight AI assistants can verify. One genuine third-party list inclusion is worth more than ten self-published &quot;why we&rsquo;re the best&quot; pages on your own site.
          </p>

          <h3 className="font-serif text-xl font-bold text-[var(--text)] mt-8 mb-3">
            9. Maintain consistent NAP (name, address, phone) across the web
          </h3>
          <p className="text-[var(--text2)] leading-relaxed mb-6">
            NAP must be byte-identical across your website, your TPO or PRS register entry, your Google Business Profile, Companies House, and every directory you appear on. AI treats inconsistency as ambiguity, and ambiguous entities don&rsquo;t get recommended. The most common breakage in estate agency: trading name on the website, registered name on Companies House, third name on Google Business Profile, fourth on a regulator listing. To a model, that&rsquo;s four different firms — none of them get cited. Pick one canonical name, address and phone format, audit every public listing, fix every variant, and audit again in 30 days.
          </p>

          <h3 className="font-serif text-xl font-bold text-[var(--text)] mt-8 mb-3">
            10. Publish original market data (sold prices, rental yields, time on market)
          </h3>
          <p className="text-[var(--text2)] leading-relaxed mb-6">
            AI engines cite content that contains specific, sourced data. &quot;Average time on market in Roath, Cardiff was 38 days in Q1 2026 (TendorAI sold-price analysis, n=412)&quot; is a Tier 0 data point. &quot;The market is buoyant&quot; is a vibe. Publish quarterly market reports with your own sold-price data, your own rental yield averages, your own time-on-market figures by postcode. Add the sample size, the date range and the methodology in one sentence after each number. This kind of original-data content gets cited by AI for years; opinion pieces don&rsquo;t. If you don&rsquo;t have your own data, partner with a local data source and credit them visibly.
          </p>

          <h3 className="font-serif text-xl font-bold text-[var(--text)] mt-8 mb-3">
            11. Build a presence on Reddit and YouTube
          </h3>
          <p className="text-[var(--text2)] leading-relaxed mb-6">
            Searchable.com&rsquo;s May 2026 data shows Reddit holds 5.9% of UK AI citation share and YouTube 5.8% — combined, more than 11% of the answers UK buyers see. AI engines treat Reddit as a high-trust source for local knowledge: r/HousingUK, r/UKPersonalFinance and city-specific subs are where prospective buyers and landlords actually ask questions. Answer genuinely, not promotionally. On YouTube, short market commentary videos (90 seconds, no production budget) get transcribed and cited. The estate agencies that show up in ChatGPT answers for niche queries — &quot;buy-to-let mortgage advisor in Leeds&quot;, &quot;estate agent for probate sale in Cardiff&quot; — are usually the ones with one Reddit answer and three YouTube clips ranking on the topic.
          </p>

          <h3 className="font-serif text-xl font-bold text-[var(--text)] mt-8 mb-3">
            12. Track AI visibility monthly using actual KPIs not SEO metrics
          </h3>
          <p className="text-[var(--text2)] leading-relaxed mb-6">
            Google rankings are the wrong metric for AI visibility. The right metrics are citation share (what % of AI answers for your core queries name your firm), share of voice (your citations vs the field), named-entity match rate (does AI describe you correctly), and platform breakdown (where you appear: ChatGPT, Perplexity, Claude, Google AI Overviews, Meta AI, Grok). Track these monthly, not weekly — AI models update on a longer cadence than search indexes. Don&rsquo;t track impressions or click-through rate; AI answers don&rsquo;t generate either. The firms beating the field in 2026 are the ones who switched their dashboards from SEO KPIs to AI visibility KPIs in 2025.
          </p>

          <h2 className="font-serif text-2xl md:text-3xl font-bold text-[var(--text)] mt-12 mb-6">
            Frequently asked questions
          </h2>

          {faqs.map((faq, i) => (
            <div key={i} className="mb-6">
              <h3 className="font-serif text-lg font-bold text-[var(--text)] mb-2">{faq.q}</h3>
              <p className="text-[var(--text2)] leading-relaxed">{faq.a}</p>
            </div>
          ))}

          {/* Sister pillars */}
          <div className="mt-12 border-t border-[var(--border)] pt-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-[var(--text3)] mb-3">
              AI visibility for other UK regulated services
            </p>
            <ul className="text-sm space-y-2 text-[var(--text2)]">
              <li>
                <Link href="/ai-visibility-for-solicitors" className="text-purple-600 hover:underline">
                  AI visibility for UK solicitors
                </Link>
              </li>
              <li>
                <Link href="/ai-visibility-for-accountants" className="text-purple-600 hover:underline">
                  AI visibility for UK accountants
                </Link>
              </li>
              <li>
                <Link href="/ai-visibility-for-mortgage-advisors" className="text-purple-600 hover:underline">
                  AI visibility for UK mortgage advisers
                </Link>
              </li>
            </ul>
          </div>

          {/* Estate agent city reports */}
          <div className="mt-10">
            <p className="text-sm font-semibold uppercase tracking-wide text-[var(--text3)] mb-3">
              Estate agent city reports
            </p>
            <ul className="text-sm space-y-2 text-[var(--text2)]">
              {cityBlogLinks.map((c) => (
                <li key={c.href}>
                  <Link href={c.href} className="text-purple-600 hover:underline">
                    AI visibility report — estate agents in {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </article>

        {/* CTA */}
        <section className="bg-purple-50 py-12 border-t border-[var(--border)]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-[var(--text)] mb-3">
              Get your estate agency&rsquo;s free AI visibility report
            </h2>
            <p className="text-[var(--text2)] leading-relaxed mb-6">
              See exactly which queries AI assistants are answering with your competitors&rsquo; names instead of yours, and the specific structural fixes that close the gap. Free, 60 seconds, no signup.
            </p>
            <Link
              href="/aeo-report"
              className="inline-block px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
            >
              Run the free AI visibility report
            </Link>
            <p className="mt-4 text-sm text-[var(--text3)]">
              Pricing for ongoing AI visibility tracking is available on{' '}
              <Link href="/for-vendors#pricing" className="text-purple-600 hover:underline">
                the Pro tier
              </Link>
              .
            </p>
          </div>
        </section>

        {/* City links grid */}
        <section className="py-16 bg-white border-t border-[var(--border)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--text)] mb-8 text-center">
              AI Visibility for Estate Agents by City
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 max-w-5xl mx-auto">
              {CITIES.map((city) => (
                <Link
                  key={city.slug}
                  href={`/ai-visibility-for-estate-agents/${city.slug}`}
                  className="text-sm text-[var(--text2)] hover:text-purple-600 hover:bg-purple-50 rounded-lg px-3 py-2 transition-colors text-center"
                >
                  Estate Agents in {city.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* External authority links */}
        <section className="bg-gray-50 py-10 border-t border-[var(--border)]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text3)] mb-3">
              Regulatory references
            </p>
            <ul className="text-sm text-[var(--text2)] space-y-2">
              <li>
                <a href="https://www.tpos.co.uk" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">The Property Ombudsman (tpos.co.uk)</a>
              </li>
              <li>
                <a href="https://www.theprs.co.uk" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">Property Redress Scheme (theprs.co.uk)</a>
              </li>
              <li>
                <a href="https://www.propertymark.co.uk" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">ARLA Propertymark (propertymark.co.uk)</a>
              </li>
            </ul>
            <p className="text-xs text-[var(--text3)] mt-6">
              Sources: TendorAI database of 12,793 UK regulated firms (May 2026). Searchable.com AI citation tracker, 3 May 2026 snapshot. The Property Ombudsman public register. Property Redress Scheme public register.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
