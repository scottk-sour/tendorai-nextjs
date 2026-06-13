import Link from 'next/link';
import { Fragment } from 'react';

const loopStages = [
  {
    number: '01',
    title: 'Measure',
    oneLiner: 'See where AI assistants mention your firm.',
  },
  {
    number: '02',
    title: 'Diagnose',
    oneLiner: 'Identify why competitors are recommended instead.',
  },
  {
    number: '03',
    title: 'Fix',
    oneLiner: 'Content, schema and profile improvements prepared for your approval.',
  },
  {
    number: '04',
    title: 'Deploy',
    oneLiner: 'Approved changes go live automatically.',
  },
  {
    number: '05',
    title: 'Track',
    oneLiner: 'Weekly reporting and ongoing monitoring.',
  },
];

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How TendorAI gets your firm recommended by AI platforms',
  description:
    'TendorAI runs a continuous five-stage loop: measure, diagnose, fix, deploy, track.',
  totalTime: 'P90D',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Measure',
      text: 'See where AI assistants mention your firm.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Diagnose',
      text: 'Identify why competitors are recommended instead.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Fix',
      text: 'Content, schema and profile improvements prepared for your approval.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Deploy',
      text: 'Approved changes go live automatically.',
    },
    {
      '@type': 'HowToStep',
      position: 5,
      name: 'Track',
      text: 'Weekly reporting and ongoing monitoring.',
    },
  ],
};

export default function Hero() {
  const stats = [
    { value: '63,406+', label: 'UK Firms' },
    { value: '6', label: 'AI Platforms Tracked' },
    { value: '3', label: 'Regulatory Registers' },
    { value: 'Free', label: 'AI Visibility (AEO) Reports' },
  ];

  return (
    <section aria-label="hero" className="relative min-h-screen flex items-center justify-center text-center overflow-hidden bg-white">
      {/* Radial glow backgrounds */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(102,126,234,0.08)_0%,transparent_70%)]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(118,75,162,0.06)_0%,transparent_70%)]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-28 md:py-36">
        {/* Eyebrow */}
        <div className="flex justify-center py-4">
          <span className="rounded-full border border-purple-300 text-purple-600 text-xs font-medium px-3 py-1 inline-flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-purple-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-purple-600" />
            </span>
            Fewer than 1 in 10 UK solicitors appear consistently in AI recommendations
          </span>
        </div>

        {/* Title */}
        <div className="py-4">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-gray-900 mb-6 leading-[1.15] tracking-tight">
            Your firm is already listed.{' '}
            <em className="gradient-text not-italic font-bold" style={{ fontStyle: 'italic' }}>
              Claim it
            </em>{' '}
            and AI will recommend you by name.
          </h1>

          {/* Badge */}
          <div className="flex justify-center">
            <span className="inline-flex items-center gap-2 bg-[#1B4F72] text-white px-5 py-2 rounded-full text-sm font-semibold">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              The UK&apos;s AI Visibility Platform
            </span>
          </div>
        </div>

        {/* Subtitle */}
        <div className="py-4">
          <p className="text-lg text-[var(--text2)] max-w-2xl mx-auto leading-relaxed">
            Continuous AI visibility for UK regulated professional services. We measure where you appear in AI answers, fix the gaps, and track what worked. Every week.
          </p>
        </div>

        {/* What TendorAI Does — canonical definition paragraph. Near-verbatim
            from /ai-visibility-platform; the cross-page repetition is
            deliberate so AI assistants treat it as a verified entity fact. */}
        <div className="py-6 max-w-3xl mx-auto text-left">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-[var(--text)] mb-4 text-center">
            What TendorAI Does
          </h2>

          {/* Four scannable features. Bullet uses the same purple-check SVG
              the Free-tier features list in Pricing uses, so the icon set
              stays consistent with the rest of the page. */}
          <ul className="space-y-4">
            {[
              {
                lead: 'We build your AI profile',
                detail:
                  'Structured data, services, locations, FAQs and trust signals on your website.',
              },
              {
                lead: 'We create AI-citable content',
                detail:
                  "Three professionally-written articles every week under your firm's name.",
              },
              {
                lead: 'We monitor the market',
                detail:
                  'Daily tracking across ChatGPT, Claude, Gemini, Perplexity, Grok and Google AI Overviews.',
              },
              {
                lead: 'We report what changed',
                detail:
                  'A weekly report showing where your firm appeared, who was recommended, and what to do next.',
              },
            ].map((item) => (
              <li key={item.lead} className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-[var(--purple-start)] mt-0.5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-base md:text-lg leading-relaxed">
                  <span className="font-bold text-[var(--text)]">{item.lead}</span>
                  <span className="text-[var(--text2)]"> &mdash; {item.detail}</span>
                </p>
              </li>
            ))}
          </ul>

          <p className="mt-6 text-base md:text-lg font-semibold text-[var(--text)] text-center">
            &pound;299/month. No contracts.
          </p>
        </div>

        {/* HowTo JSON-LD — single source of truth for the Loop, lives with the visible content */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
        />

        {/* 90-day outcome line — leads into the Loop */}
        <p className="font-serif italic text-xl md:text-2xl text-[var(--text2)] text-center max-w-3xl mx-auto mt-4 mb-8 leading-relaxed">
          In 90 days you go from invisible in AI answers to consistently recommended. Here&rsquo;s how.
        </p>

        {/* The Loop — five-stage cycle */}
        <div className="mt-8 max-w-5xl mx-auto">
          <div className="relative rounded-2xl px-3 py-6 sm:px-4 sm:py-8 lg:px-6 lg:py-10">
            {/* Subtle gradient backdrop */}
            <div
              aria-hidden
              className="absolute inset-0 rounded-2xl pointer-events-none opacity-[0.05]"
              style={{ background: 'var(--gradient-hero)' }}
            />

            {/* Desktop: horizontal flow — five stages connected left-to-right by chevrons */}
            <ol
              className="not-prose relative hidden lg:flex items-stretch list-none p-0 m-0"
              style={{ listStyle: 'none', listStyleType: 'none', paddingLeft: 0 }}
            >
              {loopStages.map((stage, idx) => (
                <Fragment key={stage.title}>
                  <li
                    className="list-none group flex-1 min-w-0 bg-white rounded-xl border border-[var(--border)] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 p-4 flex flex-col text-left"
                    style={{ listStyle: 'none' }}
                  >
                    <span className="font-serif text-xs font-bold tracking-[0.12em] text-purple-600">
                      {stage.number}
                    </span>
                    <h3 className="font-serif text-base font-bold uppercase tracking-wide text-[var(--text)] mt-1 leading-tight">
                      {stage.title}
                    </h3>
                    <div className="border-t border-[var(--border)] mt-2.5 mb-2.5" />
                    <p className="text-xs text-[var(--text2)] leading-relaxed flex-1">
                      {stage.oneLiner}
                    </p>
                  </li>
                  {idx < loopStages.length - 1 && (
                    <div className="flex items-center px-1 text-purple-400" aria-hidden>
                      <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  )}
                </Fragment>
              ))}
            </ol>

            {/* Loop-back curve — visual cue that the five stages run as a continuous cycle */}
            <div className="relative hidden lg:block mt-3">
              <svg
                className="w-full h-12 text-purple-300"
                viewBox="0 0 1000 48"
                preserveAspectRatio="none"
                fill="none"
                stroke="currentColor"
                aria-hidden
              >
                <path
                  d="M 968 4 Q 968 42 500 42 Q 32 42 32 4"
                  strokeWidth="1.5"
                  strokeDasharray="5 5"
                />
                <path d="M 32 4 L 24 13 M 32 4 L 40 13" strokeWidth="2" />
              </svg>
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-xs font-semibold text-purple-600">
                Continuous loop. Every week.
              </span>
            </div>

            {/* Mobile / tablet: stacked cards with vertical connectors */}
            <ol
              className="not-prose relative lg:hidden flex flex-col gap-3 list-none p-0 m-0"
              style={{ listStyle: 'none', listStyleType: 'none', paddingLeft: 0 }}
            >
              {loopStages.map((stage, idx) => (
                <Fragment key={stage.title}>
                  <li
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
                  </li>
                  {idx < loopStages.length - 1 && (
                    <div className="flex justify-center text-purple-400" aria-hidden>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7-7-7" />
                      </svg>
                    </div>
                  )}
                </Fragment>
              ))}
            </ol>

            {/* Mobile loop-back cue — the five stages run as a continuous cycle */}
            <div className="lg:hidden mt-3 flex items-center justify-center gap-2 text-purple-600">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span className="text-xs font-semibold">Continuous loop. Every week.</span>
            </div>

            {/* Closing line — single clean line replacing the prior
                "the loop continues" eyebrow + "Runs every Monday..." footer.
                Free tools moved out of the Loop into their own section beneath
                Hero on /page.tsx (FreeTools.tsx). */}
            <p className="text-center text-base font-medium text-[var(--text2)] mt-6 lg:mt-3">
              Continuous improvement, managed for you.{' '}
              <span className="text-purple-600 font-bold">£299/month.</span>
            </p>
          </div>
        </div>

        {/* Stat line */}
        <p className="text-xs text-[var(--text3)] text-center mt-4 py-4">
          AI-optimised content published automatically. Schema live within 48 hours.
        </p>

        {/* CTA Buttons */}
        <div className="flex justify-center gap-4 flex-wrap mb-6">
          <Link href="/aeo-report" className="btn-primary">
            Check Your AI Visibility — Free
          </Link>
          <Link href="/vendor-signup" className="btn-secondary">
            Claim Your Profile
          </Link>
        </div>
        <div className="text-center mb-4">
          <Link href="/aeo-report" className="text-sm text-[var(--text3)] hover:text-[var(--purple-start)] transition-colors">
            Not sure where to start? &rarr; <span className="underline underline-offset-2">Run a free AI visibility check</span>
          </Link>
        </div>
        <div className="text-center mb-14">
          <Link href="/ai-visibility-platform" className="text-sm text-[var(--text3)] hover:text-[var(--purple-start)] underline underline-offset-2 transition-colors">
            See what an AI visibility platform actually does &rarr;
          </Link>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 max-w-3xl mx-auto">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`py-4 px-4 ${i > 0 ? 'border-l border-[var(--border)]' : ''} ${i >= 2 ? 'max-sm:border-t max-sm:border-[var(--border)]' : ''} ${i === 2 ? 'max-sm:border-l-0' : ''}`}
            >
              <div className="gradient-text text-2xl md:text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-xs md:text-sm text-[var(--text2)]">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
