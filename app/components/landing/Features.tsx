const steps = [
  {
    number: '01',
    title: 'We list you',
    description: 'Your business gets a free profile built from public register data (SRA, Companies House).',
  },
  {
    number: '02',
    title: 'You claim and enrich',
    description: 'Add pricing, accreditations, and specialisms — the structured data AI needs.',
  },
  {
    number: '03',
    title: 'AI crawlers index us',
    description: 'ChatGPT, Claude, Perplexity, and Google AI all crawl your enriched profile.',
  },
  {
    number: '04',
    title: 'You get the client',
    description: 'AI recommends you by name. Customer comes direct. No bidding. No shared leads.',
  },
];

export default function Features() {
  return (
    <section className="py-20 md:py-24 bg-[var(--surface)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="section-header">
          <h2>How it works</h2>
          <p>Four steps from invisible to AI-recommended</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 border border-[var(--border)] rounded-2xl overflow-hidden bg-white">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className={`p-7 ${i > 0 ? 'border-t lg:border-t-0 lg:border-l border-[var(--border)]' : ''} ${i === 2 ? 'max-lg:border-l-0' : ''}`}
            >
              <div className="gradient-text text-5xl font-bold opacity-35 mb-4 leading-none">{step.number}</div>
              <h3 className="font-serif text-lg font-semibold text-[var(--text)] mb-2">{step.title}</h3>
              <p className="text-sm text-[var(--text2)] leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
