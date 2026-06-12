import Link from 'next/link';

/**
 * Lean conversion-focused homepage hero. Replaces the long-form Hero that
 * carried the five-stage loop diagram and stat row — that content now lives
 * on /ai-visibility-platform and /for-vendors. Reuses the existing radial
 * glow + serif + gradient-text styling for visual consistency.
 *
 * Scan input: the existing /aeo-report form (AeoReportClient.tsx) requires
 * 7 fields (company, website, category, custom industry, city, email, name,
 * source) and is tightly coupled to that page. It is not extractable as a
 * drop-in hero component without backend / form-state refactor.
 *
 * TODO: embed scan component in hero once extractable.
 */
export default function HomepageHero() {
  return (
    <section
      aria-label="hero"
      className="relative flex items-center justify-center text-center overflow-hidden bg-white"
    >
      {/* Radial glow backgrounds — same treatment as the rest of the marketing site. */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(102,126,234,0.08)_0%,transparent_70%)]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(118,75,162,0.06)_0%,transparent_70%)]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 py-24 md:py-32">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-gray-900 mb-6 leading-[1.15] tracking-tight">
          Control what AI says about{' '}
          <em
            className="gradient-text not-italic font-bold"
            style={{ fontStyle: 'italic' }}
          >
            your firm
          </em>
          .
        </h1>

        <p className="text-lg md:text-xl text-[var(--text2)] leading-relaxed max-w-2xl mx-auto mb-10">
          TendorAI helps solicitors, accountants, mortgage advisers and estate
          agents become easier for ChatGPT, Claude, Gemini, Perplexity and
          Google AI to understand, trust and recommend.
        </p>

        <Link
          href="/aeo-report"
          className="inline-block bg-[var(--primary-blue)] text-white font-bold py-4 px-10 rounded-lg hover:bg-[#1a3a8f] hover:-translate-y-0.5 hover:shadow-lg transition-[transform,box-shadow,background-color] text-base md:text-lg"
        >
          Check Your AI Visibility — Free
        </Link>
      </div>
    </section>
  );
}
