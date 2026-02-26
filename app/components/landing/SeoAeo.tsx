import Link from 'next/link';

const cards = [
  {
    acronym: 'SEO',
    subtitle: 'Search Engine Optimisation',
    description:
      'Ranking on Google. Keywords, backlinks, reviews. Still essential — but no longer enough on its own.',
    status: 'Foundation',
    statusColor: 'bg-gray-100 text-gray-700',
    borderColor: 'border-[var(--border)]',
    accentColor: 'text-gray-900',
  },
  {
    acronym: 'AI Visibility (AEO)',
    subtitle: 'Answer Engine Optimisation',
    description:
      'Optimising your presence so AI recommends you first. Schema markup, structured data, verified profiles — TendorAI handles your Answer Engine Optimisation so you show up when businesses ask AI for help.',
    status: 'What We Do',
    statusColor: 'bg-[var(--purple-start)]/10 text-[var(--purple-start)]',
    borderColor: 'border-[var(--purple-start)]',
    accentColor: 'text-[var(--purple-start)]',
    cta: { label: 'Check Your Score — Free', href: '/aeo-report' },
  },
];

export default function SeoAeo() {
  return (
    <article aria-label="SEO vs AI Visibility (AEO)" className="py-20 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="section-header">
          <h2>SEO Got You Found on Google. AI Visibility (AEO) Gets You Recommended by AI.</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {cards.map((card) => (
            <div
              key={card.acronym}
              className={`rounded-2xl border-2 ${card.borderColor} p-6 md:p-7 flex flex-col`}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-2xl font-bold ${card.accentColor}`}>{card.acronym}</h3>
                <span
                  className={`text-xs font-medium px-2.5 py-1 rounded-full ${card.statusColor}`}
                >
                  {card.status}
                </span>
              </div>

              <p className="text-xs font-semibold text-[var(--text3)] uppercase tracking-wider mb-3">
                {card.subtitle}
              </p>

              <p className="text-sm leading-relaxed text-[var(--text2)] flex-1">
                {card.description}
              </p>

              {card.cta && (
                <Link
                  href={card.cta.href}
                  className="mt-5 inline-flex items-center justify-center w-full py-2.5 bg-[var(--purple-start)] text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity"
                >
                  {card.cta.label}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
