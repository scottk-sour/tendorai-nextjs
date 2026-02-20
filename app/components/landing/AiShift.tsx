const rows = [
  {
    label: 'Discovery',
    old: 'Google search, directories, word of mouth',
    now: '"Hey ChatGPT, find me a solicitor in Bristol"',
  },
  {
    label: 'Ranking',
    old: 'SEO, paid ads, review count',
    now: 'Structured data, AI-readable profiles, verified information',
  },
  {
    label: 'Decision',
    old: 'Visit 10 websites, compare manually',
    now: 'AI gives 3 recommendations with reasons',
  },
  {
    label: 'Cost',
    old: '£500–£8,000/mo for SEO and lead gen',
    now: 'From £149/mo for full AI visibility',
  },
  {
    label: 'What you need',
    old: 'Great website, backlinks, Google My Business',
    now: 'Structured data profile that AI can read',
  },
];

export default function AiShift() {
  return (
    <section aria-label="the AI shift" className="py-20 md:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="section-header">
          <h2>The shift has already happened</h2>
          <p>
            200M+ people now ask AI instead of searching Google. The way buyers
            find suppliers has fundamentally changed.
          </p>
        </div>

        <div className="grid md:grid-cols-[1fr_auto_1fr] gap-0 md:gap-6 items-stretch">
          {/* Old way */}
          <div className="rounded-xl border border-[var(--border)] overflow-hidden">
            <div className="bg-[var(--red)] text-white py-3 px-5 text-center font-semibold text-sm">
              How it used to work
            </div>
            <div className="divide-y divide-[var(--border)]">
              {rows.map((row) => (
                <div key={row.label} className="p-4">
                  <div className="text-xs font-semibold text-[var(--text3)] uppercase tracking-wider mb-1">{row.label}</div>
                  <p className="text-sm text-[var(--text2)]">{row.old}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Arrow */}
          <div className="flex items-center justify-center py-4 md:py-0">
            <div className="md:rotate-0 rotate-90 text-[var(--purple-start)]">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </div>

          {/* New way */}
          <div className="rounded-xl border-2 border-[var(--purple-start)] overflow-hidden bg-[#f0eef8]">
            <div className="bg-[var(--purple-start)] text-white py-3 px-5 text-center font-semibold text-sm">
              How it works now
            </div>
            <div className="divide-y divide-[#e0daf0]">
              {rows.map((row) => (
                <div key={row.label} className="p-4">
                  <div className="text-xs font-semibold text-[var(--purple-start)] uppercase tracking-wider mb-1">{row.label}</div>
                  <p className="text-sm text-[var(--text)]">{row.now}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
