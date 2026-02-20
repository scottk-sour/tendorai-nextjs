import Link from 'next/link';

interface HeroProps {
  totalVendors?: number;
}

export default function Hero({ totalVendors = 11000 }: HeroProps) {
  const stats = [
    { value: `${totalVendors.toLocaleString()}+`, label: 'UK Businesses' },
    { value: '5', label: 'AI Platforms Connected' },
    { value: '3', label: 'Regulatory Registers' },
    { value: 'Free', label: 'AEO Reports' },
  ];

  return (
    <section aria-label="hero" className="relative min-h-screen flex items-center justify-center text-center overflow-hidden bg-white">
      {/* Radial glow backgrounds */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(102,126,234,0.08)_0%,transparent_70%)]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(118,75,162,0.06)_0%,transparent_70%)]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-28 md:py-36">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-[#f0eef8] text-[var(--purple-start)] px-5 py-2 rounded-full text-sm font-semibold mb-8 border border-[#e0daf0]">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          The UK&apos;s AI Visibility Platform
        </div>

        {/* Title */}
        <h1 className="font-serif text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-[var(--text)] mb-6 leading-[1.15] tracking-tight">
          The database AI uses to{' '}
          <em className="gradient-text not-italic font-bold" style={{ fontStyle: 'italic' }}>
            find and recommend
          </em>{' '}
          UK businesses
        </h1>

        {/* Subtitle — long-tail keywords */}
        <p className="text-base md:text-lg text-[var(--text2)] mb-10 max-w-2xl mx-auto leading-relaxed">
          When someone asks ChatGPT for a solicitor in Cardiff or a mortgage advisor in Bristol,
          AI needs structured data to answer. TendorAI provides AI visibility for UK solicitors,
          accountants, mortgage advisors, and estate agents &mdash; so AI recommends you by name.
        </p>

        {/* CTA Buttons */}
        <div className="flex justify-center gap-4 flex-wrap mb-14">
          <Link href="/aeo-report" className="btn-primary">
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
