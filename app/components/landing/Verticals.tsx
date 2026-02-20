const verticals = [
  {
    number: '1,044',
    title: 'Office Equipment',
    description: 'Photocopier dealers, telecoms providers, CCTV installers, and IT services across the UK.',
    status: 'Live',
    statusColor: 'bg-green-100 text-green-700',
  },
  {
    number: '8,600+',
    title: 'Solicitors',
    description: 'Conveyancing, family law, criminal law, commercial, wills & probate, immigration, and more.',
    status: 'Live',
    statusColor: 'bg-green-100 text-green-700',
  },
  {
    number: '1,300+',
    title: 'Accountants',
    description: 'Tax advisors, bookkeepers, payroll services, audit firms, and R&D tax credit specialists.',
    status: 'Live',
    statusColor: 'bg-green-100 text-green-700',
  },
  {
    number: '5,000+',
    title: 'Mortgage Advisors',
    description: 'FCA-authorised mortgage brokers, residential and commercial lending, protection advisors.',
    status: 'Live',
    statusColor: 'bg-green-100 text-green-700',
  },
  {
    number: '20,000+',
    title: 'Estate Agents',
    description: 'Residential and commercial estate agents, lettings agencies, and property managers.',
    status: 'Live',
    statusColor: 'bg-green-100 text-green-700',
  },
  {
    number: '30,000+',
    title: 'Recruitment',
    description: 'Recruitment agencies, headhunters, and staffing companies across all sectors.',
    status: 'Coming Soon',
    statusColor: 'bg-amber-100 text-amber-700',
  },
  {
    number: '\u221E',
    title: 'Any B2B Service',
    description: 'We\'re building the structured data layer for every B2B vertical in the UK.',
    status: '2026',
    statusColor: 'bg-purple-100 text-purple-700',
  },
];

export default function Verticals() {
  return (
    <section aria-label="supported industries" className="py-20 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="section-header">
          <h2>Built for every B2B vertical</h2>
          <p>
            We&apos;re building verified profiles for every UK business sector.
            If AI needs to recommend someone, we provide the data.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {verticals.map((v) => (
            <div
              key={v.title}
              className="rounded-xl border border-[var(--border)] p-6 bg-white hover:border-[var(--purple-start)] hover:-translate-y-1 hover:shadow-md transition-all duration-200 group"
            >
              <div className="gradient-text text-4xl font-bold mb-2">{v.number}</div>
              <h3 className="font-serif text-lg font-semibold text-[var(--text)] mb-2">{v.title}</h3>
              <p className="text-sm text-[var(--text2)] mb-4 leading-relaxed">{v.description}</p>
              <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${v.statusColor}`}>
                {v.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
