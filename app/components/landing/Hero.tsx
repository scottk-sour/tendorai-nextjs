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
        <p className="text-xs md:text-sm text-[var(--text3)] mb-6 max-w-2xl mx-auto leading-relaxed">
          Fewer than 1 in 10 UK solicitors appear consistently in AI recommendations &mdash; according to TendorAI&apos;s weekly scans across ChatGPT, Perplexity, and Gemini.
        </p>

        {/* Title */}
        <h1 className="font-serif text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-gray-900 mb-6 leading-[1.15] tracking-tight">
          Your firm is already listed.{' '}
          <em className="gradient-text not-italic font-bold" style={{ fontStyle: 'italic' }}>
            Claim it
          </em>{' '}
          and AI will recommend you by name.
        </h1>

        {/* Badge */}
        <div className="flex justify-center mb-8">
          <span className="inline-flex items-center gap-2 bg-[#1B4F72] text-white px-5 py-2 rounded-full text-sm font-semibold">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            The UK&apos;s AI Visibility Platform
          </span>
        </div>

        {/* Subtitle */}
        <p className="text-base md:text-lg text-gray-700 mb-4 max-w-2xl mx-auto leading-relaxed font-medium">
          When someone asks ChatGPT for a solicitor in your city, your firm is either recommended &mdash; or it doesn&apos;t exist. AI doesn&apos;t rank firms like Google. It selects a small number it can understand, verify, and cite with confidence.
        </p>
        <p className="text-sm md:text-base text-[var(--text2)] mb-2 max-w-2xl mx-auto leading-relaxed">
          To appear in AI recommendations, a firm needs three things:
        </p>
        <ol className="text-sm md:text-base text-[var(--text2)] max-w-md mx-auto mb-4 space-y-1 text-left list-decimal list-inside">
          <li>A crawlable website</li>
          <li>Structured schema markup</li>
          <li>Third-party citations &mdash; directories, reviews, regulatory registers</li>
        </ol>
        <p className="text-sm md:text-base text-[var(--text2)] mb-2 max-w-2xl mx-auto leading-relaxed font-semibold">
          TendorAI installs all three automatically.
        </p>
        <p className="text-sm md:text-base text-[var(--text3)] mb-10 max-w-2xl mx-auto leading-relaxed">
          Schema markup on your website within 48 hours. Weekly tracking across 6 AI platforms. AI-optimised content published automatically. Built from SRA, ICAEW, and FCA register data. No developer needed. No ongoing maintenance.
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
