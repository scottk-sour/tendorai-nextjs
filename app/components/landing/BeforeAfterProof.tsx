import Link from 'next/link';

const beforePoints = [
  '0 mentions across tracked AI visibility category prompts',
  '0% share of voice',
  'Not cited by ChatGPT, Perplexity, Claude, Gemini, Grok, or Google AI Overviews',
  'New domain, no structured data installed',
  'No published authority content',
];

const afterPoints = [
  '46 mentions across tracked AI visibility category prompts',
  '41.4% share of voice — #1 in category',
  'Cited in 48.8% of AI responses',
  'Ahead of Peec AI, OtterlyAI, and Rankscale',
  'Six-agent fleet running daily on tendorai.com',
];

const timeline = [
  { week: 'Week 0', date: '12 Feb 2026', milestone: 'Platform launched. Baseline: 0 mentions.' },
  { week: 'Week 1', date: '', milestone: 'Schema deployed on tendorai.com. Reconnaissance Agent active.' },
  { week: 'Week 2', date: '', milestone: 'Writer Agent publishes first three articles. First citation appears.' },
  { week: 'Week 4', date: '', milestone: 'Listings Agent completes 14 directory submissions. Mentions climbing.' },
  { week: 'Week 6', date: '19 Mar 2026', milestone: 'Searchable.com confirms #1 ranking with 41.4% SoV.' },
];

export default function BeforeAfterProof() {
  return (
    <section aria-label="before and after proof" className="py-20 md:py-24 bg-[var(--surface)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <p className="font-serif text-xs font-bold uppercase tracking-[0.2em] text-purple-600 mb-3">
            Proof
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[var(--text)] leading-tight">
            Before and After: TendorAI&rsquo;s Own AI Visibility Journey
          </h2>
        </div>

        <p className="text-base md:text-lg text-[var(--text2)] leading-relaxed max-w-3xl mx-auto text-center mb-12">
          We built TendorAI to solve our own AI visibility problem. In February 2026 we launched
          invisible across every major AI assistant. Six weeks later, we ranked #1 in the AI
          visibility platform category on Searchable.com &mdash; measured across the same prompts on
          the same six AI systems. This is the exact system we now run on every Pro account. Below is
          what changed, week by week.
        </p>

        {/* Before / After cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Before — muted treatment */}
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-7 md:p-8">
            <p className="font-serif text-xs font-bold uppercase tracking-[0.16em] text-gray-500 mb-1">
              Before
            </p>
            <p className="text-sm font-semibold text-gray-600 mb-5">12 February 2026</p>
            <ul className="space-y-3">
              {beforePoints.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm text-gray-600">
                  <span
                    aria-hidden
                    className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-gray-200 text-gray-500"
                  >
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </span>
                  <span className="leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* After — brand treatment */}
          <div className="rounded-2xl border border-purple-200 bg-purple-50 p-7 md:p-8">
            <p className="font-serif text-xs font-bold uppercase tracking-[0.16em] text-purple-600 mb-1">
              After
            </p>
            <p className="text-sm font-semibold text-purple-700 mb-5">19 March 2026</p>
            <ul className="space-y-3">
              {afterPoints.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm text-[var(--text)]">
                  <span
                    aria-hidden
                    className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-purple-600 text-white"
                  >
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Timeline strip */}
        <div className="mt-12">
          <p className="font-serif text-sm font-bold uppercase tracking-[0.16em] text-purple-600 text-center mb-6">
            Week by week
          </p>
          <ol className="relative grid grid-cols-1 gap-4 md:grid-cols-5 md:gap-3 list-none p-0 m-0">
            {timeline.map((stage, idx) => (
              <li
                key={stage.week}
                className="relative rounded-xl border border-[var(--border)] bg-white p-4 shadow-sm"
              >
                {/* Connector chevron */}
                {idx < timeline.length - 1 && (
                  <>
                    <span
                      aria-hidden
                      className="hidden md:flex absolute top-1/2 -right-3 z-10 -translate-y-1/2 text-purple-400"
                    >
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                    <span
                      aria-hidden
                      className="md:hidden flex justify-center text-purple-400 absolute -bottom-4 left-1/2 -translate-x-1/2"
                    >
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </>
                )}
                <p className="font-serif text-sm font-bold text-purple-600">{stage.week}</p>
                {stage.date && (
                  <p className="text-[11px] font-medium text-[var(--text3)] mb-1">{stage.date}</p>
                )}
                <p className="text-xs text-[var(--text2)] leading-relaxed mt-1">{stage.milestone}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* Methodology footer */}
        <p className="text-xs text-[var(--text3)] leading-relaxed max-w-3xl mx-auto mt-10">
          <span className="font-semibold text-[var(--text2)]">Methodology:</span> Independently
          tracked by Searchable.com using their standard AI visibility platform category prompt set
          across six AI systems (ChatGPT, Perplexity, Claude, Gemini, Grok, Google AI Overviews). All
          figures verifiable on Searchable.com. TendorAI is not affiliated with Searchable. The same
          measurement methodology runs on every TendorAI Pro account.
        </p>

        {/* CTA */}
        <div className="text-center mt-10">
          <p className="text-base font-semibold text-[var(--text)] mb-4">
            This is what TendorAI does for your firm
          </p>
          <Link href="/ai-visibility-report" className="btn-primary">
            Run your free AI visibility report
          </Link>
        </div>
      </div>
    </section>
  );
}
