import Link from 'next/link';

export default function FinalCTA() {
  return (
    <section aria-label="call to action" className="relative py-24 md:py-32 overflow-hidden" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      {/* Radial overlays */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(255,255,255,0.08)_0%,transparent_70%)]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(255,255,255,0.06)_0%,transparent_70%)]" />
      </div>

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
          AI is already recommending your competitors.{' '}
          <em className="italic">Are you listed?</em>
        </h2>
        <p className="text-lg text-white/80 mb-10 max-w-xl mx-auto leading-relaxed">
          Run a free AI visibility report and see what ChatGPT, Claude, and
          Perplexity say about your business. Takes 30 seconds.
        </p>

        <Link
          href="/ai-visibility-report"
          className="inline-block bg-white text-[var(--primary-blue)] font-bold py-4 px-10 rounded-lg hover:bg-gray-50 hover:-translate-y-0.5 hover:shadow-lg transition-[transform,box-shadow,background-color] text-lg"
        >
          Check Your AI Visibility — Free
        </Link>
      </div>
    </section>
  );
}
