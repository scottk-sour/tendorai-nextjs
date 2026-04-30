import Link from 'next/link';
import { Fragment } from 'react';

interface HeroProps {
  totalVendors?: number;
}

const loopStages = [
  {
    number: '01',
    title: 'Measure',
    oneLiner: 'We check where your firm appears across the AI platforms your clients use.',
    proof: '6 platforms scanned weekly: ChatGPT, Perplexity, Claude, Gemini, Grok, Meta AI',
  },
  {
    number: '02',
    title: 'Diagnose',
    oneLiner: "We work out why you're being missed when prospects ask AI for recommendations.",
    proof: 'Schema gaps, content gaps, citation gaps — identified per platform',
  },
  {
    number: '03',
    title: 'Fix',
    oneLiner: 'We draft new content and structured data to fill the gaps holding your firm back.',
    proof: 'Approval queue — every fix reviewed before it touches your site',
  },
  {
    number: '04',
    title: 'Deploy',
    oneLiner: 'We put fixes live on your website and across the directories AI tools cite.',
    proof: 'Schema installed, content published, listings submitted — handled for you',
  },
  {
    number: '05',
    title: 'Track',
    oneLiner: "We measure whether last week's work moved the needle, then start again.",
    proof: 'Week-on-week visibility score — see what changed, see why',
  },
];

export default function Hero({ totalVendors = 11000 }: HeroProps) {
  const stats = [
    { value: `${totalVendors.toLocaleString()}+`, label: 'UK Businesses' },
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

        {/* The Loop — five-stage cycle */}
        <div className="mt-8 max-w-5xl mx-auto">
          <div className="relative rounded-2xl px-3 py-6 sm:px-4 sm:py-8 lg:px-6 lg:py-10">
            {/* Subtle gradient backdrop */}
            <div
              aria-hidden
              className="absolute inset-0 rounded-2xl pointer-events-none opacity-[0.05]"
              style={{ background: 'var(--gradient-hero)' }}
            />

            {/* Desktop: 5 cards in a row with chevron connectors */}
            <div className="relative hidden lg:flex items-stretch justify-center gap-2">
              {loopStages.map((stage, idx) => (
                <Fragment key={stage.title}>
                  <div className="group flex-1 max-w-[200px] bg-white rounded-xl border border-[var(--border)] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 p-5 flex flex-col text-left">
                    <span className="font-serif text-xs font-bold tracking-[0.12em] text-purple-600">
                      {stage.number}
                    </span>
                    <h3 className="font-serif text-lg font-bold uppercase tracking-wide text-[var(--text)] mt-1 leading-tight">
                      {stage.title}
                    </h3>
                    <div className="border-t border-[var(--border)] mt-3 mb-3" />
                    <p className="text-sm text-[var(--text2)] leading-relaxed flex-1">
                      {stage.oneLiner}
                    </p>
                    <p className="text-xs italic text-purple-600 mt-4 leading-snug">
                      {stage.proof}
                    </p>
                  </div>
                  {idx < loopStages.length - 1 && (
                    <div className="flex items-center text-[var(--border2)] flex-shrink-0" aria-hidden>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  )}
                </Fragment>
              ))}
            </div>

            {/* Loop-back dashed line (desktop only) */}
            <div className="relative hidden lg:block mt-5 px-8" aria-hidden>
              <svg
                className="w-full h-10 text-[var(--border2)]"
                viewBox="0 0 1000 40"
                preserveAspectRatio="none"
                fill="none"
                stroke="currentColor"
              >
                <path
                  d="M 970 4 Q 970 34 500 34 Q 30 34 30 4"
                  strokeWidth="1"
                  strokeDasharray="5 5"
                />
                <path d="M 30 4 L 22 12 M 30 4 L 38 12" strokeWidth="1.5" />
              </svg>
            </div>

            {/* Mobile / tablet: stacked cards with vertical connectors */}
            <div className="relative lg:hidden flex flex-col gap-3">
              {loopStages.map((stage, idx) => (
                <Fragment key={stage.title}>
                  <div className="bg-white rounded-xl border border-[var(--border)] border-l-4 border-l-purple-600 shadow-sm p-5">
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
                  </div>
                  {idx < loopStages.length - 1 && (
                    <div className="flex justify-center text-gray-400" aria-hidden>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7-7-7" />
                      </svg>
                    </div>
                  )}
                </Fragment>
              ))}
            </div>

            {/* Closing line */}
            <div className="relative text-center mt-6 lg:mt-3">
              <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[var(--text3)] mb-2">
                the loop continues
              </p>
              <p className="text-base font-medium text-[var(--text2)]">
                Runs every Monday. Continues forever.{' '}
                <span className="text-purple-600 font-bold">£299/month.</span>
              </p>
            </div>
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
