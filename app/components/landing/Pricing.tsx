import Link from 'next/link';

const plans = [
  {
    name: 'Free',
    price: '£0',
    period: '/forever',
    description: 'Claim your profile. Get listed in the TendorAI directory and visible to AI crawlers with your basic SRA/FCA details.',
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
    cta: 'Claim Your Free Profile',
    ctaStyle: 'btn-secondary',
    href: 'https://www.tendorai.com/vendor-signup?tier=free',
  },
  {
    name: 'Starter',
    price: '£149',
    originalPrice: '£299',
    period: '/month',
    description: 'Stand out from unclaimed profiles. Add your pricing, specialisms, and services so AI can recommend you with detail. Includes monthly AEO visibility report.',
    popular: false,
    highlight: false,
    features: [
      { text: 'Pricing visible to AI', included: true },
      { text: 'Ranked above free profiles', included: true },
      { text: 'Monthly AEO report', included: true },
      { text: 'AI visibility score', included: true },
      { text: 'Unlimited products', included: true },
      { text: 'AI mention tracking', included: false },
      { text: 'Verified badge', included: false },
    ],
    cta: 'Start Starter',
    ctaStyle: 'btn-secondary',
    href: 'https://www.tendorai.com/vendor-signup?tier=starter',
  },
  {
    name: 'Pro',
    price: '£299',
    originalPrice: '£499',
    period: '/month',
    description: 'We install AI-optimised data on your website, track your AI mentions, and give you a Verified badge. Agencies charge £1,500+/month for this.',
    popular: true,
    highlight: true,
    features: [
      { text: 'We install AI visibility code on your website', included: true },
      { text: 'Your website and TendorAI stay in sync automatically', included: true },
      { text: 'AI mention tracking', included: true },
      { text: 'Weekly AI visibility reports', included: true },
      { text: 'TendorAI Verified badge', included: true },
      { text: 'GBP optimisation checklist', included: true },
      { text: 'Unlimited products', included: true },
      { text: 'Priority support', included: true },
    ],
    cta: 'Start Pro',
    ctaStyle: 'btn-primary',
    href: 'https://www.tendorai.com/vendor-signup?tier=pro',
  },
];

const comparisonRows = [
  { label: 'Monthly cost', agency: '£1,500–£8,000', tendorai: '£299 (early adopter)' },
  { label: 'Full price', agency: '—', tendorai: '£499/month' },
  { label: 'Contract', agency: '12 months minimum', tendorai: 'Month-to-month, cancel anytime' },
  { label: 'Time to go live', agency: '3–6 months', tendorai: 'Installed within 48 hours' },
  { label: 'You need to do', agency: 'Attend meetings, approve content', tendorai: 'Just give us your website login' },
  { label: 'What gets installed', agency: 'Manual audit, maybe some schema', tendorai: 'AI-optimised data that syncs with your profile' },
  { label: 'AI platforms covered', agency: 'Usually 1–2', tendorai: 'All major AI (ChatGPT, Gemini, Claude, Perplexity)' },
  { label: 'If you cancel', agency: 'You keep whatever they built', tendorai: 'AI visibility code stops — keeps you paying' },
  { label: 'Ongoing updates', agency: 'You pay for every change', tendorai: 'Automatic — update TendorAI, your website updates too' },
];

export default function Pricing() {
  return (
    <section id="pricing" aria-label="pricing" className="py-20 md:py-24 bg-[var(--surface)]">
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
          <h3 className="font-serif text-2xl font-semibold text-[var(--text)] text-center mb-8">How we compare to GEO agencies</h3>
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
