import Link from 'next/link';

interface FeatureRow {
  text: string;
  included: boolean;
}

interface LoopStage {
  verb: string;
  summary: string;
}

interface Plan {
  name: string;
  price: string;
  period: string;
  description: string;
  popular: boolean;
  highlight: boolean;
  features?: FeatureRow[];
  loopStages?: LoopStage[];
  loopFooter?: string;
  cta: string;
  ctaStyle: string;
  href: string;
}

const plans: Plan[] = [
  {
    name: 'Free',
    price: '£0',
    period: '/forever',
    description: 'Claim your profile. Get listed in the TendorAI directory and visible to AI crawlers with your verified SRA/FCA/ICAEW details.',
    popular: false,
    highlight: false,
    features: [
      { text: 'Basic company profile', included: true },
      { text: 'Listed in directory', included: true },
      { text: 'Public register data', included: true },
      { text: 'Visible to AI crawlers', included: true },
      { text: 'No pricing visible to AI', included: true },
      { text: 'No AI mention tracking', included: false },
      { text: 'No AI Visibility reports', included: false },
      { text: 'No priority ranking', included: false },
    ],
    cta: 'Claim Your Free Profile',
    ctaStyle: 'btn-secondary',
    href: '/vendor-signup?plan=free',
  },
  {
    name: 'Pro',
    price: '£299',
    period: '/month',
    description: 'TendorAI Pro runs a continuous system on your firm.',
    popular: true,
    highlight: true,
    loopStages: [
      { verb: 'Measure', summary: 'we check where you appear in AI answers every week' },
      { verb: 'Diagnose', summary: 'we work out why you’re being missed' },
      { verb: 'Fix', summary: 'we sort out what’s wrong' },
      { verb: 'Deploy', summary: 'we put fixes live on your website and across the web' },
      { verb: 'Track', summary: 'we measure whether it worked, then start again' },
    ],
    loopFooter: 'Every week. Forever. £299/month.',
    cta: 'Start Pro',
    ctaStyle: 'btn-primary',
    href: '/vendor-signup?plan=pro',
  },
];

const comparisonRows = [
  { label: 'Monthly cost', agency: '£1,500–£8,000', tendorai: '£299/month' },
  { label: 'Contract', agency: '12 months minimum', tendorai: 'Month-to-month, cancel anytime' },
  { label: 'Time to go live', agency: '3–6 months', tendorai: 'Installed within 48 hours' },
  { label: 'You need to do', agency: 'Attend meetings, approve content', tendorai: 'Just give us your website login' },
  { label: 'What gets installed', agency: 'Manual audit, maybe some schema', tendorai: 'AI-optimised data that syncs with your profile' },
  { label: 'AI platforms covered', agency: 'Usually 1–2', tendorai: 'ChatGPT, Perplexity, Claude, Gemini, Grok, and Google AI Overviews' },
  { label: 'If you cancel', agency: 'You keep whatever they built', tendorai: 'Download your schema file and self-host it — your data stays yours forever' },
  { label: 'Content & reputation', agency: 'Manual, £800–£2,000/month extra', tendorai: 'AI blog writer, social publishing, review collection — included' },
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
        <div className="grid md:grid-cols-2 max-w-3xl mx-auto gap-0 border border-[var(--border)] rounded-2xl overflow-hidden bg-white mb-16">
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              className={`relative p-7 ${i > 0 ? 'border-t md:border-t-0 md:border-l border-[var(--border)]' : ''} ${plan.highlight ? 'bg-[#f8f6fd]' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-0 left-0 right-0 bg-[var(--gradient-hero)] text-white text-center py-1.5 text-xs font-bold uppercase tracking-wider" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                  Most Popular
                </div>
              )}

              <div className={plan.popular ? 'pt-6' : ''}>
                <h3 className="font-serif text-lg font-semibold text-[var(--text)] mb-3">{plan.name}</h3>

                <div className="mb-0.5">
                  <span className="text-3xl font-bold text-[var(--text)]">{plan.price}</span>
                  <span className="text-[var(--text2)] text-sm">{plan.period}</span>
                </div>
                {plan.popular && (
                  <p className="text-[10px] text-gray-400 italic mb-1">Early-adopter pricing &mdash; first 50 customers lock in &pound;299/month.</p>
                )}

                <p className="text-xs text-[var(--text2)] mb-5">{plan.description}</p>

                {plan.loopStages ? (
                  <ul className="space-y-3 mb-7">
                    {plan.loopStages.map((stage) => (
                      <li key={stage.verb} className="flex items-start gap-3 text-sm">
                        <span className="text-purple-600 font-semibold mt-0.5 flex-shrink-0" aria-hidden>&rarr;</span>
                        <span className="text-[var(--text)]">
                          <span className="font-serif font-bold uppercase tracking-wide text-xs text-purple-700">{stage.verb}</span>
                          <span className="text-[var(--text2)]"> &mdash; {stage.summary}</span>
                        </span>
                      </li>
                    ))}
                    {plan.loopFooter && (
                      <li className="text-sm font-semibold text-[var(--text)] pt-3 mt-2 border-t border-[var(--border)]">
                        {plan.loopFooter}
                      </li>
                    )}
                  </ul>
                ) : (
                  <ul className="space-y-2.5 mb-7">
                    {(plan.features ?? []).map((f, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm">
                        {f.included ? (
                          <svg className="w-4 h-4 text-[var(--purple-start)] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <span className="w-4 h-4 mt-0.5 flex-shrink-0 text-center text-gray-300 text-xs leading-4">&mdash;</span>
                        )}
                        <span className={f.included ? 'text-[var(--text)]' : 'text-gray-400'}>{f.text}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <Link
                  href={plan.href}
                  className={`${plan.ctaStyle} block text-center w-full`}
                >
                  {plan.cta}
                </Link>
                {plan.popular && (
                  <p className="text-[11px] text-gray-400 text-center mt-3 leading-relaxed">
                    Your data is stored securely. TendorAI uses 256-bit SSL encryption. Payments handled by Stripe &mdash; we never store card details. Cancel any time from your dashboard.
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="max-w-3xl mx-auto">
          <h3 className="font-serif text-2xl font-semibold text-[var(--text)] text-center mb-8">How we compare to AI Visibility (AEO) agencies</h3>
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
            Agency pricing based on UK market averages for AI Visibility (AEO) services, 2024-2025.
          </p>
          <div className="text-center mt-3">
            <Link href="/ai-visibility-platform" className="text-xs text-[var(--purple-start)] hover:underline">
              See how TendorAI compares to monitoring-only tools &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
