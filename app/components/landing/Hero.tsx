import Link from 'next/link';

interface HeroProps {
  totalVendors?: number;
}

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
        <div className="mt-8 max-w-4xl mx-auto">
          {/* Desktop: horizontal row with arrows */}
          <div className="hidden md:flex items-center justify-between gap-1">
            {[
              {
                verb: 'Measure',
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                ),
              },
              {
                verb: 'Diagnose',
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v6a4 4 0 008 0V7a2 2 0 00-2-2h-2M7 11v3a4 4 0 008 0v-3m-4 7v3a3 3 0 003 3h0a3 3 0 003-3v-1.5m-3-1.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
                  </svg>
                ),
              },
              {
                verb: 'Fix',
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.7 6.3a4 4 0 105.656 5.656l-1.06 1.06-7.071 7.072a2 2 0 01-2.829 0l-1.414-1.414a2 2 0 010-2.829l7.071-7.071-1.06-1.06z M14.7 6.3l-3.535 3.536" />
                  </svg>
                ),
              },
              {
                verb: 'Deploy',
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.63 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.841" />
                  </svg>
                ),
              },
              {
                verb: 'Track',
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                ),
              },
            ].map((stage, idx, arr) => (
              <div key={stage.verb} className="flex items-center gap-1">
                <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 flex flex-col items-center gap-1 min-w-[100px]">
                  <div className="text-purple-600">{stage.icon}</div>
                  <span className="font-serif font-bold uppercase tracking-wide text-xs text-[var(--text)]">{stage.verb}</span>
                </div>
                {idx < arr.length - 1 && (
                  <svg className="w-4 h-4 text-gray-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7-7 7M3 12h18" />
                  </svg>
                )}
              </div>
            ))}
          </div>

          {/* Mobile: stacked column with arrows */}
          <div className="md:hidden flex flex-col items-stretch gap-1">
            {['Measure', 'Diagnose', 'Fix', 'Deploy', 'Track'].map((verb, idx, arr) => (
              <div key={verb} className="flex flex-col items-stretch gap-1">
                <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-center">
                  <span className="font-serif font-bold uppercase tracking-wide text-xs text-[var(--text)]">{verb}</span>
                </div>
                {idx < arr.length - 1 && (
                  <div className="flex justify-center text-gray-300" aria-hidden>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7-7-7m14-7l-7 7-7-7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-[var(--text3)] mt-3">Continues every Monday.</p>
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
