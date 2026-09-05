import Link from 'next/link';
import { Fragment } from 'react';

interface HeroProps {
  totalVendors?: number;
}

// The Five-Stage AI Visibility Loop — single source of truth, matches /ai-visibility-platform.
const loopStages = [
  {
    number: '01',
    title: 'Measure',
    oneLiner:
      'Measures three AI platforms monthly and scores your visibility.',
    proof: 'ChatGPT, Google AI Overviews, Perplexity',
  },
  {
    number: '02',
    title: 'Diagnose',
    oneLiner:
      'Identifies why competitors are recommended instead.',
    proof: 'Findings with severity, evidence, and a specific fix',
  },
  {
    number: '03',
    title: 'Fix',
    oneLiner:
      'Content, schema and profile improvements prepared for your approval.',
    proof: 'You see every change before it ships',
  },
  {
    number: '04',
    title: 'Deploy',
    oneLiner:
      'Approved fixes go live automatically — content to your profile, schema to your website.',
    proof: 'One-click approval, automatic deployment',
  },
  {
    number: '05',
    title: 'Track',
    oneLiner:
      'Monthly reporting and ongoing monitoring.',
    proof: 'Monthly Report — score, citations, activity, competitor moves',
  },
];

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How the TendorAI Platform Works',
  description:
    'The TendorAI platform runs a continuous five-stage loop — Measure, Diagnose, Fix, Deploy, Track — to get UK regulated professional services firms recommended across ChatGPT, Perplexity, Claude, Gemini, Google AI Overviews, and Grok.',
  totalTime: 'P90D',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Measure',
      text: 'Measures three AI platforms monthly — ChatGPT, Google AI Overviews and Perplexity — and scores your visibility.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Diagnose',
      text: 'Identifies why competitors are recommended instead, per platform and per prompt, with severity, evidence, and a specific fix.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Fix',
      text: 'Content, schema and profile improvements are prepared for your approval. Every change is held in your approval queue so you see it before it ships.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Deploy',
      text: 'Approved fixes go live automatically — content to your profile, schema to your website. One-click approval, automatic deployment.',
    },
    {
      '@type': 'HowToStep',
      position: 5,
      name: 'Track',
      text: 'Monthly reporting and ongoing monitoring — the Monthly Report covers visibility score, citations, activity, and competitor moves.',
    },
  ],
};

export default function Hero({ totalVendors = 12793 }: HeroProps) {
  const stats = [
    { value: `${totalVendors.toLocaleString()}+`, label: 'UK Businesses' },
    { value: '6', label: 'AI Platforms Tracked' },
    { value: '6', label: 'Agents in the Fleet' },
    { value: 'Free', label: 'AI Visibility Reports' },
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
            The UK AI Visibility Platform for{' '}
            <em className="gradient-text not-italic font-bold" style={{ fontStyle: 'italic' }}>
              Regulated Professional Services Firms
            </em>
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

        {/* How Firms Get Recommended By AI */}
        <div className="py-6 max-w-3xl mx-auto text-left">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-[var(--text)] text-center mb-6">
            How Firms Get Recommended By AI
          </h2>
          <ul className="space-y-4">
            <li className="flex gap-3">
              <span className="text-purple-600 font-bold mt-1" aria-hidden>
                &bull;
              </span>
              <p className="text-[var(--text2)] leading-relaxed">
                <strong className="text-[var(--text)]">We build your AI profile</strong> — Structured data, services, locations, FAQs and trust signals on your website.
              </p>
            </li>
            <li className="flex gap-3">
              <span className="text-purple-600 font-bold mt-1" aria-hidden>
                &bull;
              </span>
              <p className="text-[var(--text2)] leading-relaxed">
                <strong className="text-[var(--text)]">We create AI-citable content</strong> — Three professionally-written articles every week under your firm&apos;s name.
              </p>
            </li>
            <li className="flex gap-3">
              <span className="text-purple-600 font-bold mt-1" aria-hidden>
                &bull;
              </span>
              <p className="text-[var(--text2)] leading-relaxed">
                <strong className="text-[var(--text)]">We monitor the market</strong> — Daily tracking across ChatGPT, Claude, Gemini, Perplexity, Grok and Google AI Overviews.
              </p>
            </li>
            <li className="flex gap-3">
              <span className="text-purple-600 font-bold mt-1" aria-hidden>
                &bull;
              </span>
              <p className="text-[var(--text2)] leading-relaxed">
                <strong className="text-[var(--text)]">We report what changed</strong> — A monthly report showing where your firm appeared, who was recommended, and what to do next.
              </p>
            </li>
          </ul>
          <p className="text-sm text-[var(--text2)] text-center mt-6 leading-relaxed">
            Everything runs continuously through TendorAI&apos;s AI visibility system. Available at <span className="text-purple-600 font-semibold">£1,499 per month</span>, on an initial three-month term. Founding rate of £999 per month for the first 3 solicitor firms.
          </p>
        </div>

        {/* HowTo JSON-LD — single source of truth for the Loop, lives with the visible content */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
        />

        {/* Loop intro line */}
        <p className="font-serif italic text-xl md:text-2xl text-[var(--text2)] text-center max-w-3xl mx-auto mt-4 mb-2 leading-relaxed">
          How the TendorAI Platform Works
        </p>
        <p className="text-sm text-[var(--text3)] text-center max-w-2xl mx-auto mb-8">
          The Five-Stage AI Visibility Loop. One platform.
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

            {/* Desktop: 3+2 grid layout — cards 01/02/03 on row 1, 04/05 left-aligned on row 2 */}
            <ol
              className="not-prose relative hidden lg:grid lg:grid-cols-3 gap-6 list-none p-0 m-0"
              style={{ listStyle: 'none', listStyleType: 'none', paddingLeft: 0 }}
            >
              {loopStages.map((stage) => (
                <li
                  key={stage.title}
                  className="list-none group h-full bg-white rounded-xl border border-[var(--border)] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 p-5 flex flex-col text-left"
                  style={{ listStyle: 'none' }}
                >
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
                </li>
              ))}
            </ol>

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
                    <p className="text-xs italic text-purple-600 mt-3 leading-snug">{stage.proof}</p>
                  </li>
                  {idx < loopStages.length - 1 && (
                    <div className="flex justify-center text-gray-400" aria-hidden>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7-7-7" />
                      </svg>
                    </div>
                  )}
                </Fragment>
              ))}
            </ol>

            {/* Closing line */}
            <div className="relative text-center mt-8 lg:mt-6">
              <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[var(--text3)] mb-2">
                the loop continues
              </p>
              <p className="text-base font-medium text-[var(--text2)]">
                Runs every Monday. Continues forever.
              </p>
              <p className="mt-3">
                <Link
                  href="/ai-visibility-platform"
                  className="text-sm text-[var(--text3)] hover:text-[var(--purple-start)] underline underline-offset-2 transition-colors"
                >
                  See the full platform &rarr;
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Stat line */}
        <p className="text-xs text-[var(--text3)] text-center mt-4 py-4">
          AI-optimised content published automatically. Schema live within 48 hours.
        </p>

        {/* CTA Buttons */}
        <div className="flex justify-center gap-4 flex-wrap mb-14">
          <Link href="/ai-visibility-report" className="btn-primary">
            Check Your AI Visibility — Free
          </Link>
          <Link href="/vendor-signup" className="btn-secondary">
            Claim Your Profile
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
