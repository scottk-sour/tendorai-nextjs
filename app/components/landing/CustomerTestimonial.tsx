import Link from 'next/link';

const SHORTENED_QUOTE = `Before TendorAI, when office managers asked ChatGPT 'best copier lease providers in South Wales,' we didn't appear. We had strong Google rankings and a decade of client relationships, but in AI search we were invisible. TendorAI audited our website, installed schema, listed us in their directory, and gave us weekly visibility reports across ChatGPT, Perplexity, Google AI and Gemini. Within 8 weeks, we went from zero mentions to appearing in the top 3 recommendations for 'copier lease providers in South Wales' and 'managed print services for SMEs.'`;

export default function CustomerTestimonial() {
  return (
    <section aria-label="customer testimonial" className="py-20 md:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="font-serif text-xs font-bold uppercase tracking-[0.2em] text-purple-600 mb-3">
            Real outcomes
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[var(--text)] leading-tight">
            From invisible to top 3 in 8 weeks
          </h2>
        </div>

        <div className="bg-white rounded-2xl border border-[var(--border)] shadow-sm hover:shadow-md transition-shadow p-8 md:p-12">
          <div
            aria-hidden
            className="font-serif text-6xl text-purple-600 opacity-20 leading-none -mt-2 mb-2 select-none"
          >
            &ldquo;
          </div>

          <blockquote className="text-lg md:text-xl text-[var(--text)] leading-relaxed">
            {SHORTENED_QUOTE}
          </blockquote>

          <div className="border-t border-[var(--border)] mt-8 pt-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-semibold text-[var(--text)]">Nathan</p>
              <p className="text-sm text-[var(--text2)]">Sales Manager, Ascari Office Ltd</p>
              <p className="text-xs text-[var(--text3)]">Caerphilly, UK</p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-600">
              <svg
                className="w-3.5 h-3.5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Verified Google Review
            </span>
          </div>
        </div>

        <div className="text-center mt-6">
          {/* TODO(scott): replace href="#" with the actual Google Maps review URL for Ascari Office Ltd */}
          <Link
            href="#"
            className="text-sm text-[var(--text3)] hover:text-purple-600 underline underline-offset-4 transition-colors"
          >
            Read the full review on Google &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
