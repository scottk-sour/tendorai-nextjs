import Link from 'next/link';

const sectors = [
  {
    title: 'Solicitors',
    description:
      '8,600+ SRA-registered firms already listed. Conveyancing, family law, criminal law, commercial, and more. AI platforms use our structured data to recommend solicitors by name, practice area, and location.',
    cta: 'Find Solicitors',
    href: '/suppliers?vendorType=solicitor',
    comingSoon: false,
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    ),
    iconBg: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
  },
  {
    title: 'Accountants',
    description:
      '1,300+ ICAEW-registered firms with profiles covering tax advisory, audit, bookkeeping, payroll, and R&D tax credits. Structured data helps AI recommend the right accountant for each query.',
    cta: 'Find Accountants',
    href: '/suppliers?vendorType=accountant',
    comingSoon: false,
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
  },
  {
    title: 'Regulated Professional Services',
    description:
      '12,793+ regulatory profiles loaded from SRA, ICAEW, FCA and Propertymark/TPO registers. TendorAI tracks how AI engines respond to buyer queries about regulated UK firms \u2014 and tells you exactly what\u2019s missing from your firm\u2019s AI visibility.',
    cta: 'Find Firms',
    href: '/suppliers',
    comingSoon: false,
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
      </svg>
    ),
    iconBg: 'bg-slate-50',
    iconColor: 'text-slate-600',
  },
  {
    title: 'Mortgage Advisers',
    description:
      'FCA-authorised mortgage brokers across the UK. Residential, buy-to-let, remortgage, first-time buyer, and commercial lending. AI visibility for every type of mortgage advice.',
    cta: 'Find Mortgage Advisers',
    href: '/suppliers?vendorType=mortgage-advisor',
    comingSoon: false,
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    iconBg: 'bg-sky-50',
    iconColor: 'text-sky-600',
  },
  {
    title: 'Estate Agents',
    description:
      'Propertymark-registered estate agents across the UK. Residential sales, lettings, property management, and commercial property. Structured profiles for AI-driven property recommendations.',
    cta: 'Join Waitlist',
    href: '/vendor-signup',
    comingSoon: true,
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
  },
];

export default function SectorBenefits() {
  return (
    <section aria-label="sector benefits" className="py-20 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="section-header">
          <h2>Built for UK Professional Services and B2B Firms</h2>
          <p>
            Structured data profiles tailored to each sector &mdash; from regulated professions to office equipment suppliers. AI recommends the right firm for every query.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {sectors.map((sector) => (
            <div
              key={sector.title}
              className={`rounded-xl border border-[var(--border)] p-6 bg-white flex flex-col ${sector.comingSoon ? 'opacity-80' : 'hover:border-[var(--purple-start)] hover:-translate-y-1 hover:shadow-md transition-[transform,box-shadow,border-color]'}`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`${sector.iconBg} ${sector.iconColor} p-2.5 rounded-lg`}>
                  {sector.icon}
                </div>
                <h3 className="font-serif text-lg font-semibold text-[var(--text)]">{sector.title}</h3>
              </div>

              {sector.comingSoon && (
                <span className="inline-block self-start text-xs font-semibold px-3 py-1 rounded-full bg-amber-100 text-amber-700 mb-3">
                  Coming Soon
                </span>
              )}

              <p className="text-sm text-[var(--text2)] leading-relaxed flex-1 mb-5">
                {sector.description}
              </p>

              <Link
                href={sector.href}
                className={`text-sm font-semibold text-center py-2.5 rounded-lg transition-opacity ${
                  sector.comingSoon
                    ? 'bg-gray-100 text-[var(--text2)] hover:bg-gray-200'
                    : 'bg-[var(--purple-start)] text-white hover:opacity-90'
                }`}
              >
                {sector.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
