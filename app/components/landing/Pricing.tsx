import Link from 'next/link';

/**
 * Shared pricing block — the single source of truth for pricing across the
 * homepage, the vertical and city landing pages, and /pricing.
 *
 * TendorAI sells one paid product: the AI Visibility Growth Programme at
 * £999/month on an initial three-month term, sold through a booking call
 * rather than a checkout. TendorAI is not VAT-registered, so no VAT is added.
 *
 * Nothing here may promise an AI outcome, a placement, a refund or a
 * delivery deadline. We promise the correctness of the work, not what an
 * assistant will say.
 */

interface Plan {
  name: string;
  price: string;
  period: string;
  description: string;
  popular: boolean;
  highlight: boolean;
  items: string[];
  itemsLabel?: string;
  cta: string;
  ctaStyle: string;
  href: string;
}

const plans: Plan[] = [
  {
    name: 'Free AI visibility report',
    price: '£0',
    period: ', permanently free',
    description:
      'A one-off measurement of whether AI assistants name your firm, what they say about you, and which of your public signals they can read. No card, no trial period.',
    popular: false,
    highlight: false,
    items: [
      'Whether AI assistants name your firm',
      'What they say about you',
      'Which of your public signals they can read',
    ],
    cta: 'Get your free report',
    ctaStyle: 'btn-secondary',
    href: '/ai-visibility-report',
  },
  {
    name: 'AI Visibility Growth Programme',
    price: '£999',
    period: '/month',
    description:
      'Initial three-month term. Currently solicitors only. A managed programme, not software you log into and run yourself.',
    popular: true,
    highlight: true,
    itemsLabel: 'Each month:',
    items: [
      'Measurement across ChatGPT, Google AI Overviews and Perplexity, on a prompt set fixed at onboarding and kept constant so month three is comparable with month one',
      'Diagnosis of what AI assistants can and can’t currently read about your firm',
      'Implementation — structured data, page and content changes, either by us or by your own web developer',
      'A written record of every change made, the date, and what we expected it to do',
      'Re-measurement against the same prompt set',
    ],
    cta: 'Book a 15-minute call',
    ctaStyle: 'btn-primary',
    href: '/contact',
  },
];

export default function Pricing() {
  return (
    <section id="pricing" aria-label="pricing" className="py-20 md:py-24 bg-[var(--surface)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="section-header">
          <h2>Pricing</h2>
          <p>
            The AI Visibility Growth Programme is &pound;999 per month, on an initial three-month
            term. TendorAI is not currently VAT-registered, so no VAT is added.
          </p>
        </div>

        <div className="grid md:grid-cols-2 max-w-3xl mx-auto gap-0 border border-[var(--border)] rounded-2xl overflow-hidden bg-white">
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              className={`relative p-7 flex flex-col h-full ${i > 0 ? 'border-t md:border-t-0 md:border-l border-[var(--border)]' : ''} ${plan.highlight ? 'bg-[#f8f6fd]' : ''}`}
            >
              {plan.popular && (
                <div
                  className="absolute -top-0 left-0 right-0 text-white text-center py-1.5 text-xs font-bold uppercase tracking-wider"
                  style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
                >
                  Solicitors only
                </div>
              )}

              <div className={`flex flex-col flex-1 ${plan.popular ? 'pt-6' : ''}`}>
                <h3 className="font-serif text-lg font-semibold text-[var(--text)] mb-3">{plan.name}</h3>

                <div className="mb-2">
                  <span className="text-3xl font-bold text-[var(--text)]">{plan.price}</span>
                  <span className="text-[var(--text2)] text-sm">{plan.period}</span>
                </div>

                <p className="text-xs text-[var(--text2)] mb-5">{plan.description}</p>

                {plan.itemsLabel && (
                  <p className="text-xs font-semibold text-[var(--text)] mb-2">{plan.itemsLabel}</p>
                )}
                <ul className="space-y-2.5 mb-7 flex-1">
                  {plan.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm">
                      <span className="text-purple-600 font-semibold mt-0.5 flex-shrink-0" aria-hidden>
                        &rarr;
                      </span>
                      <span className="text-[var(--text2)]">{item}</span>
                    </li>
                  ))}
                </ul>

                <Link href={plan.href} className={`${plan.ctaStyle} block text-center w-full`}>
                  {plan.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
