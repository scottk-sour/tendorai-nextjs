import Link from 'next/link';

export default function AeoReportCTA() {
  return (
    <section className="py-20 md:py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-[#2d1b4e]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 bg-red-500/15 text-red-300 px-4 py-1.5 rounded-full text-sm font-medium mb-8">
          <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
          Free AI Visibility Check
        </div>

        <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
          Is AI recommending your business?
        </h2>
        <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
          200M+ people now use AI instead of Google to find suppliers.
          Run a free AI visibility report — see exactly what ChatGPT, Claude,
          and Perplexity say about your business.
        </p>

        <Link href="/aeo-report" className="btn-primary !text-lg !py-4 !px-10">
          Check Your AI Visibility — Free
        </Link>

        <p className="mt-5 text-sm text-gray-500">
          No login. No credit card. 30-second results.
        </p>
      </div>
    </section>
  );
}
