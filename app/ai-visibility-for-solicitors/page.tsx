import { Metadata } from 'next';
import Link from 'next/link';
import { CITIES } from '@/lib/constants/cities';

// ─── Page constants ───────────────────────────────────────────────────
const TITLE = 'AI Visibility for UK Solicitors';
const DESCRIPTION =
  'How SRA-registered solicitors get cited by ChatGPT, Perplexity, Claude, Gemini, Grok and Google AI Overviews — structured data, citation signals, worked £ example.';
const CANONICAL = 'https://www.tendorai.com/ai-visibility-for-solicitors';
const PUBLISHED = '2026-05-24';
const UPDATED = '2026-05-24';

const CTA_URL =
  '/aeo-report?utm_source=ai-visibility-for-solicitors&utm_medium=landing&utm_campaign=solicitors-cluster&utm_content=primary-cta';

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

// ─── FAQs (visible only — no FAQPage schema, per Section 5.7) ─────────
const faqs: Array<{ q: string; a: string }> = [
  {
    q: 'Does being SRA-registered automatically mean AI assistants will recommend my firm?',
    a: 'No. SRA registration is necessary but not sufficient. AI engines need the firm’s regulatory data structured and machine-readable on the firm’s own website, consistent with the SRA register and Companies House. The register itself is rarely cited directly by AI engines as a recommendation source.',
  },
  {
    q: 'Is AI visibility the same as Google SEO?',
    a: 'No. SEO improves where pages rank on a Google results page. AI visibility decides whether AI assistants name the firm in answers that contain no link list. The two disciplines share some inputs but reward different outcomes.',
  },
  {
    q: 'Which AI platforms cite UK solicitors most consistently in 2026?',
    a: 'Perplexity is the most active in citing specific UK firms by name in May 2026. ChatGPT and Claude follow. Google AI Overviews pulls heavily from Google Business Profile and on-site schema. Results shift between platforms and over time; a single test on a single platform is not a fixed property of any firm.',
  },
  {
    q: 'What if my firm’s name on the SRA register doesn’t match my trading name on the website?',
    a: 'Resolve the inconsistency. An SRA register entry under one trading name and a website under another reduces the engine’s confidence that you are a single firm. AI engines that cannot confidently resolve identity tend to name a competitor instead.',
  },
  {
    q: 'Does TendorAI guarantee my firm will be recommended by AI?',
    a: 'No. TendorAI is an AI visibility platform, not a source of legal advice and not an outcome guarantee. The platform installs the structured signals AI engines use, audits the gaps and tracks citation frequency — but AI engine behaviour is platform-specific and changes over time.',
  },
  {
    q: 'Can I implement this without using TendorAI?',
    a: 'Yes. Schema.org JSON-LD, a structured website, consistent SRA register and Companies House entries and an active citation programme can be implemented manually. TendorAI automates the work and tracks the outcome — the citation gains are available either way.',
  },
];

function FAQSection() {
  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <details key={i} className="group bg-white border border-gray-200 rounded-lg">
          <summary className="flex items-center justify-between cursor-pointer p-5 text-left">
            <span className="font-medium text-gray-900 pr-4">{faq.q}</span>
            <svg
              className="w-5 h-5 text-gray-400 shrink-0 transition-transform group-open:rotate-180"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
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

// ─── Page ─────────────────────────────────────────────────────────────
export default function SolicitorsAiVisibilityPage() {
  // JSON-LD: Article + Organization + LegalService (no FAQPage, no HowTo).
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
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.tendorai.com/logo.png',
        width: 873,
        height: 873,
      },
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

  const legalServiceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: 'AI Visibility Coverage for UK Solicitors',
    description:
      'AI visibility platform for UK SRA-registered solicitors — Schema.org JSON-LD on the firm’s website, structured content drafted under the firm’s byline, directory and citation auditing, and tracking across ChatGPT, Perplexity, Claude, Gemini, Grok and Google AI Overviews.',
    provider: { '@type': 'Organization', name: 'TendorAI', url: 'https://www.tendorai.com' },
    serviceType: 'AI visibility for SRA-registered solicitors',
    areaServed: { '@type': 'Country', name: 'United Kingdom' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(legalServiceJsonLd) }} />

      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-brand-gradient text-white py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-xs uppercase tracking-[0.2em] text-white/80 mb-3">UK Solicitors · SRA-registered</p>
            <h1
              className="text-3xl md:text-5xl font-bold leading-tight"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              {TITLE}
            </h1>
            <p className="mt-4 text-lg md:text-xl text-white/90 max-w-3xl">
              Get your SRA-registered firm cited by ChatGPT, Perplexity, Claude, Gemini, Grok and Google AI
              Overviews when prospective clients ask for a solicitor — by name, by practice area, by city.
            </p>
          </div>
        </section>

        {/* Intro — Section 25 (44.2% rule): 4 standalone passages */}
        <section className="py-12 md:py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-lg text-gray-700 leading-relaxed">
            <p>
              AI visibility for SRA-registered solicitors is the process of making a firm’s regulatory data,
              services and citations structured and verifiable so AI assistants — ChatGPT, Perplexity,
              Claude, Gemini, Grok and Google AI Overviews — name the firm when a prospective client asks
              for a solicitor recommendation. It is a separate discipline from Google SEO. Search rankings
              decide which links appear on a results page; AI visibility decides which firm names an AI
              assistant says out loud in the answer it gives.
            </p>
            <p>
              As of 23 May 2026, TendorAI&rsquo;s independently tracked AI visibility score reached 61.1%,
              up from 22.2% four days earlier (Searchable.com). The signal that moved the score was the
              same signal AI assistants use to decide which solicitor firms to name: structured, dated,
              verifiable content cross-referenced against the SRA register and Companies House.
            </p>
            <p>
              For an SRA-registered firm in England or Wales, the buyer-side consequence is direct. A
              prospective client asking an AI for a &ldquo;conveyancing solicitor in Cardiff&rdquo; or a
              &ldquo;wills and probate solicitor in Bristol&rdquo; is returned two or three named firms.
              Firms outside those two or three slots are not lower-ranked — they are absent from the
              answer, with no second page to scroll to.
            </p>
            <p>
              A four-partner SRA-registered firm that converts two AI-driven enquiries per month at an
              illustrative £1,200 average conveyancing matter would add roughly £28,800 in fee income over
              twelve months — against £3,588 for a year of TendorAI Pro. The figures are illustrative, not
              a guarantee; the worked example with assumptions sits below.
            </p>
          </div>
        </section>

        {/* H2-1 What is AI visibility for solicitors? */}
        <section className="py-10 md:py-14 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5 text-gray-700 leading-relaxed">
            <h2
              className="text-2xl md:text-3xl font-bold text-gray-900"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              What is AI visibility for solicitors?
            </h2>
            <p>
              AI visibility for solicitors is the discipline of making an SRA-registered firm&rsquo;s
              regulatory identity, practice areas and credible citations machine-readable, so AI assistants
              name the firm in answers to recommendation queries. The firms cited consistently in 2026
              share the same three signals: Schema.org JSON-LD on the firm&rsquo;s own website, identity
              consistency across the SRA register and Companies House, and citations from sources AI
              engines treat as authoritative for legal information.
            </p>
            <p>
              AI assistants do not return ranked link lists. They return short, confident answers naming
              one to three firms by name, then move on. When a user asks ChatGPT, Perplexity, Claude,
              Gemini, Grok or Google AI Overviews for a &ldquo;conveyancing solicitor in Cardiff&rdquo;,
              the engine retrieves what it can verify and chooses which names to put in front of the user.
            </p>
            <p>
              The structured signals that decide whether an SRA-registered firm is named include
              Schema.org JSON-LD declaring LegalService, regulated individuals and practice areas;
              consistency between the website, the SRA register, Companies House and the major directories
              AI engines cross-reference; and citations from sources the engine treats as authoritative —
              the SRA, the Law Society Gazette, Solicitors Journal, Legal Futures, and reported decisions.
            </p>
            <p>
              Conveyancing, family law, wills and probate, immigration and personal injury are the
              highest-volume recommendation queries in the legal vertical. Firms that match the
              structured-data, consistency and citation signals on those queries are the firms AI
              assistants are confident enough to name. The two disciplines — SEO and AI visibility —
              share some inputs
              but reward different outcomes: SEO improves the order of links, AI visibility decides
              whether your firm is named at all.
            </p>
          </div>
        </section>

        {/* H2-2 Why are most SRA-registered firms invisible in AI answers? */}
        <section className="py-10 md:py-14">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5 text-gray-700 leading-relaxed">
            <h2
              className="text-2xl md:text-3xl font-bold text-gray-900"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              Why are most SRA-registered firms invisible in AI answers?
            </h2>
            <p>
              On TendorAI&rsquo;s own AI visibility score — independently tracked by Searchable.com — the
              move from 22.2% to 61.1% in four days (19 to 23 May 2026) was driven by structured, dated
              content. Most SRA-registered firms are missing that structured layer entirely.
            </p>
            <p>
              The single most common cause is the absence of machine-readable schema on the firm&rsquo;s
              own website. A polished site with five practice-area pages and partner biographies in plain
              prose is not the same as a site that declares LegalService schema with SRA number, regulated
              individuals and practice areas in JSON-LD. AI engines cannot reliably extract entity claims
              from prose; they read structured data first.
            </p>
            <p>
              The second common cause is identity inconsistency. When a firm&rsquo;s trading name on the
              website, its SRA register entry, its Companies House record and its Google Business Profile
              do not match, the engine cannot resolve the firm as a single entity. AI engines that cannot
              confidently identify a firm tend to name a competitor with cleaner signals instead.
            </p>
            <p>
              The third cause is citation deficit. AI engines treat the SRA register as ground truth for
              who is authorised to practise. They also weight legal-specific sources — the Law Society
              Gazette, Solicitors Journal, Legal Futures, Companies House — more heavily than generic
              directory listings. Firms with no presence on these sources have nothing for the engine to
              cross-reference, and the engine declines to name them.
            </p>
            <p>
              None of these gaps reflect quality of legal work. They reflect how findable, verifiable and
              consistent the firm&rsquo;s identity is across the public web.
            </p>
          </div>
        </section>

        {/* H2-3 How does TendorAI get a solicitor cited? */}
        <section className="py-10 md:py-14 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5 text-gray-700 leading-relaxed">
            <h2
              className="text-2xl md:text-3xl font-bold text-gray-900"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              How does TendorAI get a solicitor cited?
            </h2>
            <p>
              TendorAI&rsquo;s six-agent fleet runs daily on every Pro account with a single outcome
              metric: AI citation frequency. The platform is not a source of legal advice; it is a
              visibility platform built around the citation signals AI engines actually use.
            </p>
            <p>
              Reconnaissance scans six AI platforms — ChatGPT, Perplexity, Claude, Gemini, Grok and
              Google AI Overviews — for the firm&rsquo;s practice-area-and-city queries every day and
              records citation frequency. Detective diagnoses why the firm is missed, per platform, per
              prompt, with a specific recommended fix.
            </p>
            <p>
              Writer drafts three professionally-written articles per week under the firm&rsquo;s byline.
              Each article is structured for passage-level retrieval: every H2 opens with a direct answer,
              claims are dated, and regulatory references — the SRA, Companies House, the Law Society
              Gazette — are linked. Articles publish to the firm&rsquo;s TendorAI profile and are
              formatted to deploy on the firm&rsquo;s own website.
            </p>
            <p>
              Engineering installs Schema.org JSON-LD — LegalService, Person entries for regulated
              individuals, practice-area Service entries and fee transparency — on the firm&rsquo;s
              website. Listings audits the UK directories AI assistants cross-reference and flags where
              the firm is missing, or where its name, address or phone do not match.
            </p>
            <p>
              Reporter aggregates the week into a single Weekly Pro Report: visibility score, citations
              captured, missed queries, competitor moves and queued actions. Every change ships through an
              approval queue — the firm sees and approves every article and every schema change before it
              goes live.
            </p>
          </div>
        </section>

        {/* H2-4 How long does it take to get AI-recommended? */}
        <section className="py-10 md:py-14">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5 text-gray-700 leading-relaxed">
            <h2
              className="text-2xl md:text-3xl font-bold text-gray-900"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              How long does it take to get AI-recommended?
            </h2>
            <p>
              It typically takes four to eight weeks for an SRA-registered firm with no prior structured
              data to appear in AI recommendations after deployment, and twelve to sixteen weeks to be
              cited consistently. The timeline depends on starting point — a firm with a clean SRA
              register entry and a crawlable website moves faster than one fixing inconsistent details
              first.
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
                  <tr><td className="py-3 px-4">Schema deployment</td><td className="py-3 px-4 whitespace-nowrap">24–48 hours</td><td className="py-3 px-4">JSON-LD goes live on the firm&rsquo;s website</td></tr>
                  <tr><td className="py-3 px-4">First AI crawl</td><td className="py-3 px-4 whitespace-nowrap">1–2 weeks</td><td className="py-3 px-4">ChatGPT, Perplexity and Claude crawlers index it</td></tr>
                  <tr><td className="py-3 px-4">Citation appearance</td><td className="py-3 px-4 whitespace-nowrap">4–8 weeks</td><td className="py-3 px-4">Firm starts appearing on target queries</td></tr>
                  <tr><td className="py-3 px-4">Consistent citation</td><td className="py-3 px-4 whitespace-nowrap">12–16 weeks</td><td className="py-3 px-4">Cited consistently on main buyer queries</td></tr>
                  <tr><td className="py-3 px-4">Compounding authority</td><td className="py-3 px-4 whitespace-nowrap">6+ months</td><td className="py-3 px-4">Citations reinforce each other</td></tr>
                </tbody>
              </table>
            </div>
            <p>
              AI engine responses shift between runs and over time. The figures above are a snapshot, not
              a fixed property of any firm; results depend on platform behaviour and the firm&rsquo;s
              existing data quality.
            </p>
          </div>
        </section>

        {/* H2-5 Worked £ example */}
        <section className="py-10 md:py-14 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5 text-gray-700 leading-relaxed">
            <h2
              className="text-2xl md:text-3xl font-bold text-gray-900"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              What this looks like for a four-partner SRA-registered firm
            </h2>
            <p>
              A four-partner SRA-registered conveyancing firm in South Wales running TendorAI Pro at
              £299 per month — £3,588 per year — that converts two additional AI-driven enquiries per
              month at an illustrative £1,200 average matter value would add approximately £28,800 in fee
              income over twelve months.
            </p>
            <p>
              The figures above are illustrative, not a guarantee. Actual outcomes depend on the
              firm&rsquo;s fee structure, conversion rate from enquiry to instructed matter, complexity
              mix, and the AI platforms used by the firm&rsquo;s target buyers. Many factors decide
              whether an enquiry becomes a matter.
            </p>
            <p>
              The shape of the example matters more than the exact figures. Two additional matters per
              month at £1,200 is the conservative end of the conveyancing fee scale; wills and probate
              and family law matters generally carry higher average values and would change the worked
              total upward. Personal injury and dispute resolution carry different fee structures still.
              The cost anchor — £3,588 per year — is fixed regardless of practice area.
            </p>
            <p>
              Against that £3,588 annual cost, the break-even point in this example is approximately
              three additional matters per year. Anything above that is contribution, not cost. The point
              of the example is the order of magnitude: the cost of being absent from AI answers is
              measured in lost matters, not in software fees.
            </p>
          </div>
        </section>

        {/* H2-6 FAQ */}
        <section className="py-10 md:py-14">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2
              className="text-2xl md:text-3xl font-bold text-gray-900 mb-6"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              Frequently asked questions
            </h2>
            <FAQSection />
          </div>
        </section>

        {/* Single CTA — one sentence + one verb link, after the FAQ (Section 16) */}
        <section className="py-12 md:py-16 bg-brand-gradient text-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <p className="text-lg md:text-xl text-white/95">
              See where your firm appears across ChatGPT, Perplexity, Claude, Gemini, Grok and Google AI
              Overviews — the report runs in 60 seconds.
            </p>
            <Link
              href={CTA_URL}
              className="inline-flex items-center px-6 py-3 rounded-lg bg-white text-purple-700 font-semibold hover:bg-gray-100 transition-colors"
            >
              Run your free AI visibility report
            </Link>
          </div>
        </section>

        {/* Internal links — blog, platform, comparison */}
        <section className="py-10 bg-white border-t border-gray-200">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 grid sm:grid-cols-3 gap-4 text-sm">
            <Link
              href="/blog/how-to-get-your-solicitor-firm-recommended-by-chatgpt"
              className="text-purple-700 hover:underline"
            >
              How to get your solicitor firm recommended by ChatGPT &rarr;
            </Link>
            <Link href="/ai-visibility-platform" className="text-purple-700 hover:underline">
              How the TendorAI platform works &rarr;
            </Link>
            <Link
              href="/best-ai-visibility-tools-uk-solicitors"
              className="text-purple-700 hover:underline"
            >
              Compare TendorAI vs Rank4AI, MLT Digital, Peec AI, Searchable &rarr;
            </Link>
          </div>
        </section>

        {/* By-city grid (existing pattern preserved) */}
        <section className="py-14 bg-white border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
              AI Visibility for Solicitors by City
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 max-w-5xl mx-auto">
              {CITIES.map((city) => (
                <Link
                  key={city.slug}
                  href={`/ai-visibility-for-solicitors/${city.slug}`}
                  className="text-sm text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg px-3 py-2 transition-colors text-center"
                >
                  Solicitors in {city.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Compliance footer */}
        <section className="py-8 bg-gray-50 border-t border-gray-200">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-xs text-gray-500">
              TendorAI is an AI visibility platform. It is not a source of legal advice. No outcome
              guarantees are made or implied.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
