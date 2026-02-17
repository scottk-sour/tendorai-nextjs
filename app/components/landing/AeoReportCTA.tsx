import Link from 'next/link';

export default function AeoReportCTA() {
  return (
    <section className="py-20 sm:py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 bg-red-500/20 text-red-300 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
          <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
          Free AI Visibility Check
        </div>

        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
          Is AI recommending your business?
        </h2>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10">
          200M+ people now use AI instead of Google to find suppliers.
          Run a free AI visibility report &mdash; see exactly what ChatGPT, Claude,
          and Perplexity say about your business.
        </p>

        <Link
          href="/aeo-report"
          className="inline-flex items-center gap-2 px-10 py-5 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-purple-500/40 transition-all text-xl"
        >
          Check Your AI Visibility — Free
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>

        <p className="mt-5 text-sm text-gray-400">
          No login. No credit card. 30-second results.
        </p>
      </div>
    </section>
  );
}
