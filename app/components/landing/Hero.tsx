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
            When someone asks ChatGPT for a solicitor in your city, your firm is either recommended &mdash; or it doesn&apos;t exist. AI selects a small number it can understand, verify, and cite with confidence.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 max-w-3xl mx-auto">
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 text-left flex flex-col gap-2">
            <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <h3 className="text-sm font-semibold text-[var(--text1)]">Structured Schema Markup</h3>
            <p className="text-xs text-[var(--text2)]">Installed on your website within 48 hours. Formatted exactly how AI models expect to read it.</p>
          </div>
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 text-left flex flex-col gap-2">
            <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <h3 className="text-sm font-semibold text-[var(--text1)]">Weekly AI Tracking</h3>
            <p className="text-xs text-[var(--text2)]">Scanned across ChatGPT, Perplexity, Claude, Gemini, Copilot, and Meta AI every week.</p>
          </div>
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 text-left flex flex-col gap-2">
            <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <h3 className="text-sm font-semibold text-[var(--text1)]">Built From Register Data</h3>
            <p className="text-xs text-[var(--text2)]">SRA, ICAEW, and FCA data. No developer needed. No ongoing maintenance.</p>
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
