const SHORTENED_QUOTE = `Seeing exactly how ChatGPT and Perplexity respond when prospects search for solicitors in our area was a wake-up call. Within weeks of fixing our schema and content, we started appearing in the AI answers we were missing.`;

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

          <div className="border-t border-[var(--border)] mt-8 pt-6">
            <p className="font-semibold text-[var(--text)]">Managing Partner, Cardiff conveyancing firm</p>
            <p className="text-xs text-[var(--text3)] mt-1">Identity withheld pending publication consent</p>
          </div>
        </div>
      </div>
    </section>
  );
}
