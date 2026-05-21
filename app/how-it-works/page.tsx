import { Metadata } from 'next';
import Link from 'next/link';

const TITLE = 'How TendorAI Works — The 5-Stage AI Visibility Loop | TendorAI';
const DESCRIPTION =
  'How TendorAI gets UK professional services firms recommended by ChatGPT, Perplexity, Claude, Gemini and Grok. The 5-stage loop, explained.';
const CANONICAL = 'https://www.tendorai.com/how-it-works';

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

// ── Page content ────────────────────────────────────────────────────────────

const loopStages: Array<{
  number: string;
  title: string;
  agent: string;
  cadence: string;
  body: string;
}> = [
  {
    number: '01',
    title: 'Measure',
    agent: 'Reconnaissance Agent',
    cadence: 'Daily',
    body:
      'Every morning before you start work, the Reconnaissance Agent runs the same questions a prospective client would ask — across ChatGPT, Perplexity, Claude, Gemini, Google AI Overviews, and Grok. It records whether your firm was named, where in the answer it appeared, what was said about you, and which competitors were cited alongside you. That becomes your AI Visibility Score for the day, the week, and the rolling quarter.',
  },
  {
    number: '02',
    title: 'Diagnose',
    agent: 'Detective Agent',
    cadence: 'Daily',
    body:
      "When you're not being cited, the Detective Agent works out why — per platform, per prompt. It distinguishes between gaps in structured data on your website, gaps in the third-party sources AI models trust, and gaps in your content coverage of the questions clients actually ask. Each finding ships with a severity rating, the supporting evidence, and one specific recommended fix. No vague reports.",
  },
  {
    number: '03',
    title: 'Fix',
    agent: 'Writer Agent',
    cadence: 'Mon / Wed / Fri',
    body:
      'The Writer Agent drafts three professionally-written articles every week — Monday, Wednesday, Friday — published under your byline. 144 articles per year. Every claim is either verifiable or pulled from the data you supplied at onboarding. In parallel, our engineering team installs the schema your site is missing. Everything sits in your approval queue until you sign it off.',
  },
  {
    number: '04',
    title: 'Deploy',
    agent: 'Listings Agent',
    cadence: 'Daily',
    body:
      'You approve. Approved articles publish to your TendorAI profile and your byline. Approved schema deploys to your website. The Listings Agent audits the UK directories and sector-specific registers AI assistants cross-reference — Yell, FreeIndex, Trustpilot, Bing Places, Propertymark, ARLA, the Law Society register, the ICAEW register — shows you where your firm is missing, and flags where your name, address or phone don’t match, so you can fix them.',
  },
  {
    number: '05',
    title: 'Track',
    agent: 'Reporter Agent',
    cadence: 'Daily',
    body:
      "Every day, the Reporter Agent rolls up what the other agents did into the Weekly Pro Report. You see your AI Visibility Score with a three-month trend, the citations captured this week, what the agents shipped, top findings, competitor moves, and what's queued for next week. Branded, exportable, shareable with partners or your board. The Reviews Agent runs the same loop monthly for review-request batches.",
  },
];

const yourWeek: Array<{ when: string; what: string }> = [
  {
    when: 'Monday morning',
    what: 'Reconnaissance scan completes overnight. Writer Agent publishes the week’s first article under your byline.',
  },
  {
    when: 'Wednesday',
    what: 'Writer Agent publishes the second article. Listings Agent has run two directory submissions by now.',
  },
  {
    when: 'Friday',
    what: 'Writer Agent publishes the third article. Detective Agent has logged any new findings worth your attention.',
  },
  {
    when: 'Sunday',
    what: 'Weekly Pro Report lands in your inbox. Roughly 10 minutes to read; 20 minutes to approve next week’s queue.',
  },
];

const timelinePhases: Array<{ phase: string; what: string }> = [
  {
    phase: 'Week 1–2',
    what:
      'Onboarding completes in a single 30–45 minute call. Schema goes live on your website. First three articles publish. Your baseline AI Visibility Score is set.',
  },
  {
    phase: 'Week 3–6',
    what:
      'AI engines reindex your new content. Tracked prompts start surfacing your firm — first occasionally, then more frequently. Listings Agent audits the vertical directories AI assistants check and reports where your firm is missing.',
  },
  {
    phase: 'Week 7–12',
    what:
      'Citations across multiple AI platforms become routine. Share of Voice climbs week-on-week. The first "I found you on ChatGPT" enquiries arrive.',
  },
  {
    phase: 'Month 4 onwards',
    what:
      'Your firm becomes the default AI answer for your category in your area. Cost-per-enquiry from AI channels typically 3–5× lower than equivalent Google Ads spend.',
  },
];

const youDont: Array<{ title: string; description: string }> = [
  {
    title: 'You don’t write',
    description:
      'The Writer Agent drafts every article. You spend 5–15 minutes per article filling in three to five data points with your real numbers — typical prices, case timelines, customer counts. Or publish without and we substitute industry averages.',
  },
  {
    title: 'You don’t manage agencies',
    description:
      'No account managers, no project managers, no agency layer. Direct contact with the team building the platform — not a ticketing queue or offshored support desk.',
  },
  {
    title: 'You don’t guess where you’re missing',
    description:
      'The Listings Agent audits the UK directories and sector-specific registers AI assistants cross-reference, shows where your firm is missing, and flags where your name, address or phone don’t match — so you know exactly what to fix.',
  },
  {
    title: 'You don’t guess if it’s working',
    description:
      'The Reconnaissance Agent tracks your AI Visibility Score daily. The Weekly Pro Report shows you exactly which platforms cited you, on which queries, and what changed since last week.',
  },
];

const faqs: Array<{ q: string; a: string }> = [
  {
    q: 'What exactly do the six agents do?',
    a: 'Reconnaissance scans six AI platforms for your firm daily. Detective diagnoses citation gaps with recommended fixes. Writer drafts three articles a week. Listings audits UK directories and flags where you’re missing. Reporter aggregates the Weekly Pro Report. Reviews drafts monthly review-request batches. You approve content and outgoing reviews — roughly 30 minutes a week.',
  },
  {
    q: 'How much of my time does it take?',
    a: 'Onboarding is a single 30–45 minute call. After that, roughly 30 minutes a week — read the Weekly Pro Report, approve articles for the next cycle, approve outgoing review requests. The agents handle scanning, drafting, schema, listings, and reporting autonomously.',
  },
  {
    q: 'When do I see the first results?',
    a: 'Schema is live and the first three articles publish within the first week. AI engines typically begin reindexing the new content within 3–6 weeks. By month 4, Pro tier customers usually see consistent citations across multiple AI platforms.',
  },
  {
    q: 'Who runs TendorAI?',
    a: 'TendorAI is built and operated by a team based in South Wales. The platform, the six-agent fleet, and onboarding are all run in-house — no offshored support, no agency layer between you and the people building the product.',
  },
  {
    q: 'What does Pro cost?',
    a: '£299 per month, all in. No setup fees. No tiers. No add-ons. No annual contract. Cancel anytime. A free tier is available for any UK firm wanting to claim a basic listing and run an AI Visibility Report.',
  },
];

const internalLinks: Array<{ title: string; href: string; description: string }> = [
  {
    title: 'AI Visibility Platform — full feature list',
    href: '/ai-visibility-platform',
    description: 'The spec sheet: every feature in the £299/month Pro tier, the six-agent fleet table, comparison vs alternatives.',
  },
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
    title: 'Pricing',
    href: '/for-vendors',
    description: 'Flat £299/month. Free tier available. No setup fees, no tiers, no annual lock-in.',
  },
];

export default function HowItWorksPage() {
  const howToJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How TendorAI Gets UK Professional Services Firms Recommended by AI',
    description:
      'The 5-stage AI visibility loop TendorAI runs on every Pro account — measure, diagnose, fix, deploy, track — driven by a six-agent autonomous fleet.',
    totalTime: 'P90D',
    step: loopStages.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.title,
      text: s.body,
    })),
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
      { '@type': 'ListItem', position: 2, name: 'How It Works', item: CANONICAL },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

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
              How TendorAI Works
            </h1>

            <p className="text-lg md:text-xl text-purple-100 max-w-3xl mx-auto leading-relaxed mb-10">
              A five-stage AI visibility loop, driven by a six-agent autonomous fleet. The agents do the
              scanning, drafting, schema, listings, and reporting. You approve. £299 per month, all in.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/aeo-report"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold bg-white text-purple-700 hover:bg-purple-50 transition-all shadow-lg text-lg"
              >
                Check Your AI Visibility — Free
              </Link>
              <Link
                href="/ai-visibility-platform"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold border-2 border-white/30 text-white hover:bg-white/10 transition-all text-lg"
              >
                See Full Feature List
              </Link>
            </div>
          </div>
        </section>

        {/* Direct-answer opener */}
        <section className="py-16 md:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              When a prospective client asks ChatGPT or Perplexity for a recommendation in your category, AI assistants
              return named firms — not a list of links. TendorAI&rsquo;s job is to get your firm on that named list and
              keep it there. Every Pro account runs through the same five-stage loop, every week. Here&rsquo;s what
              each stage does, who runs it, and what you see at the end.
            </p>
          </div>
        </section>

        {/* The 5-Stage Loop */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
                The Five-Stage AI Visibility Loop
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Measure → Diagnose → Fix → Deploy → Track. Every week. On every Pro account.
              </p>
            </div>

            <ol className="space-y-6 list-none p-0 m-0">
              {loopStages.map((stage) => (
                <li
                  key={stage.title}
                  className="list-none bg-white rounded-xl border border-gray-200 border-l-4 border-l-purple-600 shadow-sm p-6 md:p-8"
                >
                  <div className="flex flex-wrap items-baseline gap-3 mb-3">
                    <span className="font-serif text-xs font-bold tracking-[0.12em] text-purple-600">
                      {stage.number}
                    </span>
                    <h3 className="font-serif text-xl md:text-2xl font-bold uppercase tracking-wide text-gray-900 leading-tight">
                      {stage.title}
                    </h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                      {stage.agent}
                    </span>
                    <span className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                      {stage.cadence}
                    </span>
                  </div>
                  <p className="text-base text-gray-700 leading-relaxed">{stage.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* What your week looks like */}
        <section className="py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
                What Your Week Actually Looks Like
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Roughly 30 minutes of your time per week. The agents handle the rest.
              </p>
            </div>

            <ol className="relative border-l-2 border-purple-200 ml-3 space-y-8 list-none p-0">
              {yourWeek.map((row) => (
                <li key={row.when} className="pl-6 relative list-none">
                  <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-purple-600 border-4 border-white" />
                  <h3 className="font-semibold text-gray-900 mb-1">{row.when}</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">{row.what}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 90-day timeline */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
                From Invisible to AI-Recommended in 90 Days
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                What actually happens, week by week. No promises about specific revenue numbers — but a realistic
                view of when citations start to land.
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

        {/* What you don't have to do */}
        <section className="py-16 md:py-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
                What You Don&rsquo;t Have to Do
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Most of the work an AI visibility programme would normally need from you — the agents handle.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {youDont.map((item) => (
                <div key={item.title} className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing pointer */}
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              £299 per month. All in.
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
              No setup fees. No tiers. No add-ons. No annual contract. Cancel anytime. The price reflects the actual
              delivery cost — not loss-leader pricing that jumps in twelve months. A free tier is available for any UK
              firm wanting to claim a basic listing and run an AI Visibility Report.
            </p>
            <Link
              href="/for-vendors"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold bg-purple-600 text-white hover:bg-purple-700 transition-colors"
            >
              See pricing in detail
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 text-center mb-12">
              How TendorAI Works — FAQ
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
            <h2 className="text-2xl md:text-4xl font-bold mb-4">Check Your AI Visibility</h2>
            <p className="text-purple-100 text-lg mb-8 max-w-xl mx-auto">
              Run a free AI visibility report. See where you appear across ChatGPT, Claude, Perplexity, Gemini, Grok,
              and Google AI Overviews. Takes 60 seconds. No card required.
            </p>
            <Link
              href="/aeo-report"
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
