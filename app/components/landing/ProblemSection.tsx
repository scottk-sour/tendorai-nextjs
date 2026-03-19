const costCards = [
  {
    color: 'border-t-[var(--red)]',
    bg: 'bg-red-50/50',
    title: 'GEO Agencies',
    price: '£1,500–£8,000',
    period: '/month',
    items: ['12-month contracts', '3-6 months to go live', 'Manual audits only', 'Limited to 1-2 AI platforms'],
  },
  {
    color: 'border-t-[var(--amber)]',
    bg: 'bg-amber-50/50',
    title: 'Lead Generation',
    price: '£5–£100',
    period: '/per lead',
    items: ['Shared with competitors', 'No control over quality', 'Pay-per-click model', 'No AI visibility'],
  },
  {
    color: 'border-t-[var(--blue-comp)]',
    bg: 'bg-blue-50/50',
    title: 'SEO Agencies',
    price: '£500–£2,000',
    period: '/month',
    items: ['Google only', 'Doesn\'t reach AI platforms', 'Results take 6+ months', 'No structured data for AI'],
  },
];

export default function ProblemSection() {
  return (
    <section aria-label="cost comparison" className="py-20 md:py-24 bg-[var(--surface)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="section-header">
          <h2>The current options are expensive,<br className="hidden md:block" /> slow, or built for Google — not AI</h2>
          <p>
            Most businesses are paying thousands for visibility solutions that don&apos;t address
            how 200M+ people now find suppliers — through AI.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {costCards.map((card) => (
            <div
              key={card.title}
              className={`${card.bg} rounded-xl border border-[var(--border)] ${card.color} border-t-4 p-7`}
            >
              <h3 className="font-serif text-lg font-semibold text-[var(--text)] mb-1">{card.title}</h3>
              <div className="mb-4">
                <span className="text-2xl font-bold text-[var(--text)]">{card.price}</span>
                <span className="text-[var(--text2)] text-sm">{card.period}</span>
              </div>
              <ul className="space-y-2.5">
                {card.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-[var(--text2)]">
                    <svg className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Trustpilot comparison callout */}
        <div className="max-w-2xl mx-auto text-center bg-white rounded-xl border border-[var(--border)] p-6">
          <p className="text-[var(--text2)] text-sm leading-relaxed">
            Even Trustpilot charges <strong className="text-[var(--text)]">£299/month</strong> just
            for review management — and that doesn&apos;t include AI visibility, structured data,
            or ranking in AI results. TendorAI Pro is <s className="text-gray-400">£599/month</s>{' '}
            <strong className="text-[var(--text)]">£299/month</strong> at our early adopter price.
          </p>
        </div>
      </div>
    </section>
  );
}
