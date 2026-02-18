import Link from 'next/link';

const plans = [
  {
    name: 'Free',
    price: '£0',
    period: '/forever',
    description: 'Basic profile, ranked last',
    popular: false,
    highlight: false,
    features: [
      { text: 'Basic company profile', included: true },
      { text: 'Listed in directory', included: true },
      { text: 'Public register data', included: true },
      { text: 'No pricing visible to AI', included: true },
      { text: 'AI mention tracking', included: false },
      { text: 'AEO reports', included: false },
      { text: 'Priority ranking', included: false },
    ],
    cta: 'Claim Your Profile',
    ctaStyle: 'btn-secondary',
    href: '/vendor-signup?plan=free',
  },
  {
    name: 'Starter',
    price: '£149',
    originalPrice: '£299',
    period: '/month',
    description: 'Early Adopter Price',
    popular: false,
    highlight: false,
    features: [
      { text: 'Pricing visible to AI', included: true },
      { text: 'Ranked above free profiles', included: true },
      { text: 'Monthly AEO report', included: true },
      { text: 'AI visibility score', included: true },
      { text: 'Up to 10 products', included: true },
      { text: 'AI mention tracking', included: false },
      { text: 'Verified badge', included: false },
    ],
    cta: 'Start Starter',
    ctaStyle: 'btn-secondary',
    href: '/vendor-signup?plan=visible',
  },
  {
    name: 'Pro',
    price: '£299',
    originalPrice: '£499',
    period: '/month',
    description: 'Early Adopter Price',
    popular: true,
    highlight: true,
    features: [
      { text: 'Ranked first in AI results', included: true },
      { text: 'Full structured data to AI', included: true },
      { text: 'AI mention tracking', included: true },
      { text: 'Weekly AEO reports', included: true },
      { text: 'TendorAI Verified badge', included: true },
      { text: 'Unlimited products', included: true },
      { text: 'Priority support', included: true },
    ],
    cta: 'Start Pro',
    ctaStyle: 'btn-primary',
    href: '/vendor-signup?plan=verified',
  },
];

const comparisonRows = [
  { label: 'Monthly cost', agency: '£1,500–£8,000', tendorai: '£149–£299' },
  { label: 'Contract length', agency: '12 months', tendorai: 'Month-to-month' },
  { label: 'Time to go live', agency: '3–6 months', tendorai: 'Profile live in 24 hours' },
  { label: 'Self-service', agency: 'No', tendorai: 'Yes' },
  { label: 'Built for AI platforms', agency: '1–2 platforms', tendorai: 'All major AI' },
  { label: 'AI visibility score', agency: 'Manual audit', tendorai: 'Real-time dashboard' },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 md:py-24 bg-[var(--surface)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="section-header">
          <h2>Simple, transparent pricing</h2>
          <p>Start free. Upgrade when AI should recommend you first.</p>
        </div>

        {/* Pricing Grid */}
        <div className="grid md:grid-cols-3 gap-0 border border-[var(--border)] rounded-2xl overflow-hidden bg-white mb-16">
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              className={`relative p-7 ${i > 0 ? 'border-t lg:border-t-0 lg:border-l border-[var(--border)]' : ''} ${plan.highlight ? 'bg-[#f8f6fd]' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-0 left-0 right-0 bg-[var(--gradient-hero)] text-white text-center py-1.5 text-xs font-bold uppercase tracking-wider" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                  Most Popular
                </div>
              )}

              <div className={plan.popular ? 'pt-6' : ''}>
                <h3 className="font-serif text-lg font-semibold text-[var(--text)] mb-3">{plan.name}</h3>

                {plan.originalPrice && (
                  <div className="text-sm text-gray-400 line-through mb-0.5">{plan.originalPrice}</div>
                )}

                <div className="mb-1">
                  <span className="text-3xl font-bold text-[var(--text)]">{plan.price}</span>
                  <span className="text-[var(--text2)] text-sm">{plan.period}</span>
                </div>

                <p className="text-xs text-[var(--text2)] mb-5">{plan.description}</p>

                <ul className="space-y-2.5 mb-7">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm">
                      {f.included ? (
                        <svg className="w-4 h-4 text-[var(--purple-start)] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <span className="w-4 h-4 mt-0.5 flex-shrink-0 text-center text-gray-300 text-xs leading-4">—</span>
                      )}
                      <span className={f.included ? 'text-[var(--text)]' : 'text-gray-400'}>{f.text}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.href}
                  className={`${plan.ctaStyle} block text-center w-full`}
                >
                  {plan.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="max-w-3xl mx-auto">
          <h3 className="font-serif text-2xl font-semibold text-[var(--text)] text-center mb-8">TendorAI vs Agencies</h3>
          <div className="rounded-xl border border-[var(--border)] overflow-hidden bg-white">
            <table className="w-full">
              <thead>
                <tr className="bg-[var(--surface)]">
                  <th className="text-left py-3.5 px-5 text-sm font-semibold text-[var(--text2)]"></th>
                  <th className="text-center py-3.5 px-5 text-sm font-semibold text-[var(--text2)]">Agencies</th>
                  <th className="text-center py-3.5 px-5 text-sm font-semibold text-[var(--purple-start)]">TendorAI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {comparisonRows.map((row) => (
                  <tr key={row.label}>
                    <td className="py-3.5 px-5 text-sm font-medium text-[var(--text)]">{row.label}</td>
                    <td className="py-3.5 px-5 text-sm text-[var(--text2)] text-center">{row.agency}</td>
                    <td className="py-3.5 px-5 text-sm text-[var(--purple-start)] font-semibold text-center">{row.tendorai}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-[var(--text3)] text-center mt-4">
            Agency pricing based on UK market averages for GEO/AEO services, 2024-2025.
          </p>
        </div>
      </div>
    </section>
  );
}
