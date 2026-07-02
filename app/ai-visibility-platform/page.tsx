import { Metadata } from 'next';
import Link from 'next/link';

const TITLE = 'AI Visibility Platform for UK Professional Services Firms | TendorAI';
const DESCRIPTION =
  'TendorAI is a UK AI visibility platform that gets regulated professional services firms recommended by ChatGPT, Perplexity, Claude, Gemini and Grok.';
const CANONICAL = 'https://www.tendorai.com/ai-visibility-platform';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: 'website',
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

const includedFeatures: Array<{ title: string; description: string }> = [
  {
    title: 'Directory listing on tendorai.com',
    description:
      'Schema-marked profile at your category and city URL, for example tendorai.com/suppliers/solicitors/cardiff. Crawlable 24/7 by every major AI engine.',
  },
  {
    title: 'AI Visibility Report',
    description:
      'Diagnostic across ChatGPT, Perplexity, Claude, Gemini, Google AI Overviews, and Grok. Score 0–100. Statistically robust scanning that controls for AI response variance. Updated weekly.',
  },
  {
    title: 'Schema installation on your website',
    description:
      'Structured data installed on your own domain by our engineering team — covering your firm, your services, your named partners, and your reviews. One-off setup, 1–2 working days.',
  },
  {
    title: 'Reconnaissance Agent',
    description:
      'Autonomous daily scan of all six AI platforms for mentions of your firm, your category, and your competitors. Tracks mention rate, citation rate, position in answer, and sentiment. Runs every morning before you start work.',
  },
  {
    title: 'Writer Agent — three articles per week',
    description:
      'Professionally-written, AI-citation-optimised content published under your byline. Monday, Wednesday, Friday. 144 articles per year. Every fact is verified or marked for your real data — nothing invented.',
  },
  {
    title: 'Detective Agent',
    description:
      "Diagnoses why your firm isn't being cited. Findings include severity, the platform affected, supporting evidence, and a specific recommended fix.",
  },
  {
    title: 'Listings Agent',
    description:
      'Audits the UK directories AI assistants cross-reference — Yell, FreeIndex, Trustpilot, Bing Places, Propertymark, ARLA, the Law Society register, the ICAEW register — shows you where your firm is missing, and flags where your name, address or phone number don’t match, so you can fix them.',
  },
  {
    title: 'Weekly Pro Report',
    description:
      'Dashboard summarising your week: AI Visibility Score with three-month trend, citations captured, agent activity, top findings, competitor moves, and what’s queued for next week. Branded, exportable, shareable with partners or your board.',
  },
  {
    title: 'Reviews Agent',
    description:
      'Monthly automation identifying recently-served customers and drafting personalised review requests for Google, Trustpilot, and Reviews.io. You approve before anything sends.',
  },
  {
    title: 'Guided onboarding',
    description:
      'A 30–45 minute setup that captures your firm’s key data once — years in business, specialisms, fee ranges, accreditations, named people. Your articles draw on this profile so you’re not filling the same details in every week.',
  },
];

const agentFleet: Array<{ agent: string; cadence: string; what: string }> = [
  {
    agent: 'Reconnaissance',
    cadence: 'Daily',
    what: 'Scans six AI platforms for your firm and competitors, every morning.',
  },
  {
    agent: 'Writer',
    cadence: 'Mon / Wed / Fri',
    what: 'Drafts three professionally-written articles per week under your byline.',
  },
  {
    agent: 'Detective',
    cadence: 'Daily',
    what: 'Diagnoses citation gaps and produces specific recommended fixes.',
  },
  {
    agent: 'Listings',
    cadence: 'Daily',
    what: 'Audits UK directories and sector-specific registers, and flags where your firm is missing or its details are inconsistent.',
  },
  {
    agent: 'Reporter',
    cadence: 'Daily',
    what: 'Generates the Weekly Pro Report from the week’s agent activity.',
  },
  {
    agent: 'Reviews',
    cadence: 'Monthly',
    what: 'Drafts personalised review requests for Google, Trustpilot, Reviews.io.',
  },
];

const loopStages: Array<{ number: string; title: string; oneLiner: string; proof: string }> = [
  {
    number: '01',
    title: 'Measure',
    oneLiner: 'Reconnaissance Agent scans six AI platforms daily and scores your visibility.',
    proof: 'ChatGPT, Perplexity, Claude, Gemini, Google AI Overviews, Grok',
  },
  {
    number: '02',
    title: 'Diagnose',
    oneLiner: 'Detective Agent identifies why you’re missed, per platform, per prompt.',
    proof: 'Findings with severity, evidence, and a specific fix',
  },
  {
    number: '03',
    title: 'Fix',
    oneLiner: 'Writer Agent drafts content; engineering updates schema. Everything held in your approval queue.',
    proof: 'You see every change before it ships',
  },
  {
    number: '04',
    title: 'Deploy',
    oneLiner: 'Approved fixes go live automatically — content to your profile, schema to your website.',
    proof: 'One-click approval, automatic deployment',
  },
  {
    number: '05',
    title: 'Track',
    oneLiner: 'Reporter Agent aggregates the week into a single dashboard. You see what moved.',
    proof: 'Weekly Pro Report — score, citations, agent activity, competitor moves',
  },
];

const audienceSegments: Array<{ vertical: string; regulator: string; count: string }> = [
  { vertical: 'Solicitors', regulator: 'SRA-regulated practices', count: '8,625 firms' },
  { vertical: 'Accountants', regulator: 'UK accountancy firms (Companies House)', count: '25,852 firms' },
  { vertical: 'Mortgage advisers', regulator: 'FCA-regulated', count: '8,083 firms' },
  { vertical: 'Estate agents', regulator: 'Propertymark, ARLA, and NAEA members', count: '19,158 firms' },
  { vertical: 'Office equipment suppliers', regulator: 'Photocopiers, IT, managed print', count: '1,049 firms' },
];

const comparisonRows: Array<{ option: string; cost: string; delivers: string; isUs?: boolean }> = [
  { option: 'DIY content marketing', cost: 'Time only — 15–25 hrs per article', delivers: 'Your time and your skill' },
  { option: 'Freelance B2B writer', cost: '£600–£1,500 / month', delivers: 'Writing only' },
  { option: 'Content agency', cost: '£1,500–£5,000 / month', delivers: 'Strategy plus writing' },
  { option: 'Monitor-only AI visibility tool', cost: '$49–$499 / month', delivers: 'Dashboard only — no fixes' },
  {
    option: 'TendorAI Pro',
    cost: '£299 / month',
    delivers: 'All ten features, six-agent fleet, schema install, weekly report',
    isUs: true,
  },
];

const timelinePhases: Array<{ phase: string; what: string }> = [
  {
    phase: 'Week 1–2',
    what: 'Profile set up. Schema installed on your website. Onboarding completed. First three articles published. Weekly Pro Report shows your baseline AI Visibility Score.',
  },
  {
    phase: 'Week 3–6',
    what: 'AI engines begin indexing your new content. Tracked prompts start surfacing your firm — first occasionally, then more frequently. Listings Agent audits the vertical directories AI assistants check and reports where your firm is missing or inconsistent.',
  },
  {
    phase: 'Week 7–12',
    what: 'Citations across multiple AI platforms become routine. Weekly report shows steady upward Share of Voice. New customer enquiries citing "I found you on ChatGPT" start arriving.',
  },
  {
    phase: 'Month 4 onwards',
    what: 'Your firm becomes the default AI answer for your category in your area. Cost-per-enquiry from AI channels typically 3–5× lower than equivalent Google Ads spend.',
  },
];

const faqs: Array<{ q: string; a: string }> = [
  {
    q: 'What is TendorAI?',
    a: 'TendorAI is a UK AI visibility platform for regulated professional services firms — solicitors, accountants, mortgage advisers, estate agents. It gets your firm recommended by ChatGPT, Perplexity, Claude, Gemini, Grok, and Google AI Overviews through schema installation, three weekly articles, daily AI scanning, and directory submissions. £299/month, all in.',
  },
  {
    q: 'Who runs TendorAI?',
    a: 'TendorAI is built and operated by a team based in South Wales. The platform, agent fleet, and onboarding are all run in-house — no offshored support, no agency layer between you and the people building the product.',
  },
  {
    q: 'How is AI visibility different from SEO?',
    a: 'SEO optimises your website for Google search — rankings, backlinks, keywords. AI visibility optimises your structured data and content for AI recommendations. When someone asks ChatGPT "find me an accountant in Manchester", AI doesn’t return a list of links — it names specific firms. AI visibility determines whether your firm is one of them.',
  },
  {
    q: 'Which AI platforms does TendorAI track?',
    a: 'Six platforms: ChatGPT (OpenAI), Perplexity, Claude (Anthropic), Gemini (Google), Google AI Overviews, and Grok (xAI). Each tracked daily by the Reconnaissance Agent.',
  },
  {
    q: 'How much does TendorAI cost?',
    a: '£299 per month for the Pro tier. No setup fees. No annual contract. Cancel anytime. A free tier is available for any UK firm wanting to claim a basic listing and run an AI Visibility Report.',
  },
  {
    q: 'How long does it take to see results?',
    a: 'Onboarding completes in 1–2 working days. First articles arrive within a week. AI engines typically begin reindexing new content within 3–6 weeks. By month 4, Pro tier customers typically see consistent citations across multiple AI platforms.',
  },
  {
    q: 'Do I have to write anything?',
    a: 'No. The Writer Agent drafts every article professionally. You spend 5–15 minutes per article filling in three to five data points with your real business numbers — typical prices, case timelines, customer counts. Or you can publish the piece without your data and we substitute industry averages.',
  },
  {
    q: 'Where does the firm data come from?',
    a: 'Official regulatory registers — SRA (solicitors), ICAEW (accountants), FCA (mortgage advisers), Propertymark and Companies House SIC 68320 (estate agents). 63,406 UK firms indexed. Every firm has a profile waiting to be claimed.',
  },
  {
    q: 'What happens if I cancel?',
    a: 'You keep the schema installed on your website. You keep the articles published under your byline. You keep your TendorAI profile in the free tier. You lose the agent fleet, the Weekly Pro Report, and ongoing tracking.',
  },
  {
    q: 'Is TendorAI an agency?',
    a: 'No. TendorAI is a software platform with a six-agent autonomous fleet. There are no account managers, no project managers, no agency overheads. Direct contact with the team building the product — not a ticketing queue or offshored support desk. The £299 price reflects the actual delivery cost — not loss-leader pricing that jumps in 12 months.',
  },
  {
    q: 'What’s on the roadmap?',
    a: 'Q2 2026: 90-day content calendar view, pre-publish checklist, score history improvements. H2 2026: vendor-to-prospect cold outreach automation, named-partner profile automation, Welsh and Spanish language support.',
  },
];

const internalLinks: Array<{ title: string; href: string; description: string }> = [
  {
    title: 'AI Visibility for Solicitors',
    href: '/ai-visibility-for-solicitors',
    description: 'Conveyancing, family law, commercial — get recommended when clients ask AI for a solicitor.',
  },
  {
    title: 'AI Visibility for Accountants',
    href: '/ai-visibility-for-accountants',
    description: 'Tax, audit, bookkeeping — appear in AI answers when businesses search for an accountant.',
  },
  {
    title: 'AI Visibility for Mortgage Advisers',
    href: '/ai-visibility-for-mortgage-advisors',
    description: 'Residential, buy-to-let, remortgage — be the adviser AI recommends to homebuyers.',
  },
  {
    title: 'AI Visibility for Estate Agents',
    href: '/ai-visibility-for-estate-agents',
    description: 'Sales, lettings, property management — get found when sellers ask AI for an estate agent.',
  },
  {
    title: 'Free Schema Checker',
    href: '/tools/schema-checker',
    description: 'Paste any URL. See exactly which Schema.org types AI assistants can read on your site.',
  },
  {
    title: 'AI Crawler Checker',
    href: '/tools/robots-checker',
    description: 'See whether GPTBot, ClaudeBot, PerplexityBot and the others are allowed to crawl your site.',
  },
];

export default function AiVisibilityPlatformPage() {
  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'AI Visibility Platform for UK Professional Services',
    serviceType: 'AI Visibility Platform',
    description: DESCRIPTION,
    provider: {
      '@type': 'Organization',
      name: 'TendorAI',
      url: 'https://www.tendorai.com',
    },
    areaServed: { '@type': 'Country', name: 'United Kingdom' },
    audience: {
      '@type': 'BusinessAudience',
      audienceType: 'UK regulated professional services firms — solicitors (SRA), accountants (ICAEW/ACCA), mortgage advisers (FCA), estate agents (Propertymark/ARLA/NAEA)',
    },
    offers: {
      '@type': 'Offer',
      price: '299',
      priceCurrency: 'GBP',
      availability: 'https://schema.org/InStock',
      url: CANONICAL,
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: '299',
        priceCurrency: 'GBP',
        billingDuration: 'P1M',
      },
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'TendorAI Pro — what’s included',
      itemListElement: includedFeatures.map((f) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: f.title, description: f.description },
      })),
    },
  };

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'TendorAI',
    legalName: 'TendorAI Ltd',
    url: 'https://www.tendorai.com',
    logo: 'https://www.tendorai.com/logo.png',
    description:
      "TendorAI is the UK's AI visibility platform for regulated professional services firms. We install Schema.org structured data on firms' own websites and run a six-agent fleet that scans, diagnoses, writes, publishes, and tracks AI citations on every Pro account.",
    areaServed: { '@type': 'Country', name: 'United Kingdom' },
    sameAs: [
      'https://www.linkedin.com/company/tendorai',
      'https://x.com/AiTendor95471',
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.tendorai.com' },
      { '@type': 'ListItem', position: 2, name: 'AI Visibility Platform', item: CANONICAL },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-gradient-to-br from-purple-700 via-purple-600 to-indigo-600 text-white py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm font-medium mb-8">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Built and run by a team in South Wales
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              AI Visibility Platform for UK Professional Services Firms
            </h1>

            <p className="text-lg md:text-xl text-purple-100 max-w-3xl mx-auto leading-relaxed mb-6">
              TendorAI is a UK AI visibility platform that gets regulated professional services firms recommended by
              ChatGPT, Perplexity, Claude, Gemini, Grok and Google AI Overviews. £299 per month, all in.
            </p>
            <p className="text-base md:text-lg text-purple-100 max-w-3xl mx-auto leading-relaxed mb-10">
              Built around a six-agent fleet that scans, diagnoses, writes, publishes, and tracks AI citations on every
              Pro account — autonomously, every day. 63,406 UK firms indexed from official regulatory registers —
              SRA, ICAEW, FCA, Propertymark, and Companies House.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/ai-visibility-report"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold bg-white text-purple-700 hover:bg-purple-50 transition-all shadow-lg text-lg"
              >
                Check Your AI Visibility — Free
              </Link>
              <Link
                href="/for-vendors"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold border-2 border-white/30 text-white hover:bg-white/10 transition-all text-lg"
              >
                See Pricing
              </Link>
            </div>
          </div>
        </section>

        {/* What TendorAI Does — direct-answer paragraph */}
        <section className="py-16 md:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-6">
              What TendorAI Does — In One Paragraph
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              When a prospect asks ChatGPT &ldquo;best conveyancing solicitor in Cardiff&rdquo; or Perplexity
              &ldquo;recommend an ICAEW accountant in Bristol&rdquo;, AI assistants return named firms — not a list of
              links. TendorAI is the platform that gets your firm named. We install AI-readable structured data on your
              website, publish three professionally-written articles per week under your byline, audit the UK
              directories AI assistants cross-reference and flag where your details don’t match, monitor six AI
              platforms daily, and deliver a Weekly Pro Report showing exactly which AI assistants cited you and why.
            </p>
          </div>
        </section>

        {/* What's Included */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
                What&rsquo;s Included at £299/Month
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Ten features, one price. No tiers, no add-ons, no setup fees.
              </p>
            </div>

            <ol className="grid sm:grid-cols-2 gap-6 list-none p-0">
              {includedFeatures.map((feature, i) => (
                <li
                  key={feature.title}
                  className="bg-white rounded-xl border border-gray-200 p-6 flex gap-4"
                >
                  <span className="font-bold text-purple-600 text-lg shrink-0 w-7">{i + 1}.</span>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Six-Agent Fleet table */}
        <section className="py-16 md:py-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
                The Six-Agent Fleet
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Six autonomous systems running on every Pro account. Roughly 18 distinct agent runs per week per
                customer. You don&rsquo;t manage any of them — they report up through the Weekly Pro Report.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-4 pr-4 text-sm font-semibold text-gray-900">Agent</th>
                    <th className="text-left py-4 px-4 text-sm font-semibold text-gray-900">Cadence</th>
                    <th className="text-left py-4 px-4 text-sm font-semibold text-gray-900">What it does</th>
                  </tr>
                </thead>
                <tbody>
                  {agentFleet.map((row) => (
                    <tr key={row.agent} className="border-b border-gray-100 align-top">
                      <td className="py-4 pr-4 text-sm font-semibold text-purple-700">{row.agent}</td>
                      <td className="py-4 px-4 text-sm text-gray-700 whitespace-nowrap">{row.cadence}</td>
                      <td className="py-4 px-4 text-sm text-gray-700 leading-relaxed">{row.what}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-8 text-sm text-gray-600 max-w-3xl mx-auto text-center leading-relaxed">
              Your job is to review the report, approve articles, and approve outgoing reviews. Roughly 30 minutes of
              your time per week.
            </p>
          </div>
        </section>

        {/* Five-Stage Loop */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
                The Five-Stage AI Visibility Loop
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Every Pro account runs through the same continuous loop.
              </p>
            </div>

            {/* Desktop: 5-column grid */}
            <ol
              className="not-prose hidden lg:grid lg:grid-cols-5 gap-4 list-none p-0 m-0"
              style={{ listStyle: 'none', listStyleType: 'none', paddingLeft: 0 }}
            >
              {loopStages.map((stage) => (
                <li
                  key={stage.title}
                  className="list-none h-full bg-white rounded-xl border border-[var(--border)] shadow-sm p-5 flex flex-col text-left"
                  style={{ listStyle: 'none' }}
                >
                  <span className="font-serif text-xs font-bold tracking-[0.12em] text-purple-600">
                    {stage.number}
                  </span>
                  <h3 className="font-serif text-lg font-bold uppercase tracking-wide text-[var(--text)] mt-1 leading-tight">
                    {stage.title}
                  </h3>
                  <div className="border-t border-[var(--border)] mt-3 mb-3" />
                  <p className="text-sm text-[var(--text2)] leading-relaxed flex-1">{stage.oneLiner}</p>
                  <p className="text-xs italic text-purple-600 mt-4 leading-snug">{stage.proof}</p>
                </li>
              ))}
            </ol>

            {/* Mobile: stacked */}
            <ol
              className="not-prose lg:hidden flex flex-col gap-3 list-none p-0 m-0"
              style={{ listStyle: 'none', listStyleType: 'none', paddingLeft: 0 }}
            >
              {loopStages.map((stage) => (
                <li
                  key={stage.title}
                  className="list-none bg-white rounded-xl border border-[var(--border)] border-l-4 border-l-purple-600 shadow-sm p-5"
                  style={{ listStyle: 'none' }}
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-serif text-xs font-bold tracking-[0.12em] text-purple-600">
                      {stage.number}
                    </span>
                    <h3 className="font-serif text-lg font-bold uppercase tracking-wide text-[var(--text)] leading-tight">
                      {stage.title}
                    </h3>
                  </div>
                  <div className="border-t border-[var(--border)] mt-3 mb-3" />
                  <p className="text-sm text-[var(--text2)] leading-relaxed">{stage.oneLiner}</p>
                  <p className="text-xs italic text-purple-600 mt-3 leading-snug">{stage.proof}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Who It's For */}
        <section className="py-16 md:py-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">Who It&rsquo;s For</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Built for UK firms with regulatory registrations that AI assistants can verify.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {audienceSegments.map((s) => (
                <div key={s.vertical} className="bg-white rounded-xl border border-gray-200 p-6">
                  <p className="text-xs font-semibold uppercase tracking-wide text-purple-600 mb-2">{s.count}</p>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{s.vertical}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{s.regulator}</p>
                </div>
              ))}
            </div>

            <p className="mt-10 text-sm text-gray-600 max-w-3xl mx-auto text-center leading-relaxed">
              Total platform directory: 63,406 UK firms, imported from official regulatory registers and Companies
              House — not scraped from the web.
            </p>
          </div>
        </section>

        {/* Comparison */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
                How TendorAI Compares to the Alternatives
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Monitor-only tools tell you the building is on fire. Agencies put the fire out at £1,500–£8,000 per
                month. TendorAI does both at £299.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-4 pr-4 text-sm font-semibold text-gray-900">Approach</th>
                    <th className="text-left py-4 px-4 text-sm font-semibold text-gray-900">Cost</th>
                    <th className="text-left py-4 px-4 text-sm font-semibold text-gray-900">What you get</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row) => (
                    <tr
                      key={row.option}
                      className={`border-b border-gray-100 align-top ${row.isUs ? 'bg-purple-50' : ''}`}
                    >
                      <td className={`py-4 pr-4 text-sm ${row.isUs ? 'font-bold text-purple-700' : 'font-medium text-gray-900'}`}>
                        {row.option}
                      </td>
                      <td className={`py-4 px-4 text-sm ${row.isUs ? 'font-semibold text-purple-700' : 'text-gray-700'} whitespace-nowrap`}>
                        {row.cost}
                      </td>
                      <td className={`py-4 px-4 text-sm leading-relaxed ${row.isUs ? 'text-purple-900' : 'text-gray-700'}`}>
                        {row.delivers}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 90-Day Timeline */}
        <section className="py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">Honest 90-Day Timeline</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                What actually happens, week by week.
              </p>
            </div>

            <ol className="relative border-l-2 border-purple-200 ml-3 space-y-8 list-none p-0">
              {timelinePhases.map((phase) => (
                <li key={phase.phase} className="pl-6 relative list-none">
                  <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-purple-600 border-4 border-white" />
                  <h3 className="font-semibold text-gray-900 mb-2">{phase.phase}</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">{phase.what}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* What We Don't Promise */}
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
              What We Don&rsquo;t Promise
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                We don&rsquo;t promise specific revenue numbers — every firm&rsquo;s conversion rate from AI enquiry to
                paying customer differs.
              </p>
              <p>
                We don&rsquo;t promise top-of-page-one Google rankings — that&rsquo;s a different system.
              </p>
              <p>
                We don&rsquo;t promise instant results — AI engines need 3–6 weeks to incorporate new content.
              </p>
              <p className="font-semibold text-gray-900">
                What we do promise: the platform, the volume, the measurement, and the support to make AI visibility
                work for your firm.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 text-center mb-12">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <details
                  key={i}
                  className="group bg-white border border-gray-200 rounded-lg"
                  open={i === 0}
                >
                  <summary className="flex items-center justify-between cursor-pointer p-5 text-left">
                    <h3 className="font-medium text-gray-900 pr-4">{faq.q}</h3>
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
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-gradient-to-br from-purple-700 via-purple-600 to-indigo-600 text-white py-16 md:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-2xl md:text-4xl font-bold mb-4">Run Your Free AI Visibility Report</h2>
            <p className="text-purple-100 text-lg mb-8 max-w-xl mx-auto">
              See where you appear across ChatGPT, Claude, Perplexity, Gemini, Grok, and Google AI Overviews. Takes 60
              seconds. No card required.
            </p>
            <Link
              href="/ai-visibility-report"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold bg-white text-purple-700 hover:bg-purple-50 transition-all shadow-lg text-lg"
            >
              Check Your AI Visibility — Free
            </Link>
          </div>
        </section>

        {/* Internal links */}
        <section className="py-16 md:py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 text-center mb-8">
              Explore more
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {internalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group bg-white rounded-xl border border-gray-200 p-5 hover:border-purple-300 hover:shadow-md transition-all"
                >
                  <h3 className="font-semibold text-gray-900 group-hover:text-purple-700 mb-2 transition-colors">
                    {link.title} →
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{link.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
