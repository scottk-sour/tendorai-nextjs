import Link from 'next/link';

export default function AeoReportCTA() {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 bg-red-500/20 text-red-300 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
          <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
          Free AI Visibility Check
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Is AI Recommending Your Business?
        </h2>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
          200M+ people now use ChatGPT instead of Google to find suppliers.
          Find out if AI mentions your business &mdash; or just your competitors.
          Takes 30 seconds.
        </p>

        <Link
          href="/aeo-report"
          className="inline-flex items-center gap-2 px-8 py-4 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-purple-500/40 transition-all text-lg"
        >
          Run Free AEO Report
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>

        <p className="mt-4 text-sm text-gray-500">
          No login required. No credit card. Instant results.
        </p>
      </div>
    </section>
  );
}
