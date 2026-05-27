import Image from 'next/image';

// Searchable.com proof screenshots — relocated here from the former
// ProofSection so all third-party verification sits with the case study.
const proofImages = [
  {
    src: '/images/proof-visibility-ranking.jpg',
    alt: 'TendorAI ranked #1 in AI visibility platform category on Searchable.com, 19 March 2026',
    caption: 'Industry ranking — TendorAI #1 with 46 mentions',
  },
  {
    src: '/images/proof-share-of-voice.jpg',
    alt: 'TendorAI 41.4% share of voice in AI responses, ahead of Peec AI, OtterlyAI, and Rankscale',
    caption: 'Share of voice — 41.4% vs all competitors',
  },
  {
    src: '/images/proof-source-domains.jpg',
    alt: 'TendorAI cited in 48.8% of AI responses in category, third highest cited domain globally',
    caption: 'Source domains — tendorai.com cited in 48.8% of responses',
  },
];

export default function CustomerTestimonial() {
  return (
    <section aria-label="case study" className="py-20 md:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="font-serif text-xs font-bold uppercase tracking-[0.2em] text-purple-600 mb-3">
            Case study
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[var(--text)] leading-tight">
            Case Study: From Invisible to #1 in Six Weeks
          </h2>
          <p className="text-sm font-semibold text-[var(--text2)] mt-2">
            TendorAI Ltd &mdash; Cwmbran, Wales
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[var(--border)] shadow-sm p-8 md:p-12">
          <p className="text-lg md:text-xl text-[var(--text)] leading-relaxed">
            In February 2026, TendorAI launched with zero AI visibility &mdash; invisible across
            ChatGPT, Perplexity, Claude, Gemini, Grok, and Google AI Overviews for every query in the
            AI visibility category. Six weeks later, on 19 March 2026, TendorAI ranked #1 in the AI
            visibility platform category on Searchable.com &mdash; ahead of Peec AI, OtterlyAI, and
            Rankscale &mdash; with 41.4% share of voice and citations in 48.8% of AI responses in our
            category. The platform you&rsquo;re looking at is the system we built to do this. We run
            it on ourselves. It works.
          </p>

          <div className="border-t border-[var(--border)] mt-8 pt-6">
            <p className="font-semibold text-[var(--text)]">
              Scott Davies, Founder, TendorAI Ltd &middot; Companies House 16521860
            </p>
          </div>

          {/* Text-equivalent of the proof screenshots — AI crawlers can't read
              images, so the same facts are stated in extractable prose. */}
          <p className="text-sm text-[var(--text2)] leading-relaxed mt-8">
            Independently verified by Searchable.com on 19 March 2026: TendorAI ranks #1 in AI
            visibility platform category for the period tracked with 46 mentions across the prompts
            monitored, holds 41.4% share of voice ahead of Peec AI, OtterlyAI, and Rankscale, and
            appears in 48.8% of AI responses &mdash; the third highest cited domain globally in the
            category.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {proofImages.map((img) => (
              <div
                key={img.src}
                className="rounded-xl overflow-hidden border border-[var(--border)] shadow-sm"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  title={img.alt}
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
                <p className="text-xs text-[var(--text3)] p-3 bg-gray-50">{img.caption}</p>
              </div>
            ))}
          </div>

          <p className="text-xs text-[var(--text3)] mt-3">
            Independently tracked by Searchable.com. Screenshots taken 19 March 2026. TendorAI is not
            affiliated with Searchable.
          </p>
        </div>
      </div>
    </section>
  );
}
