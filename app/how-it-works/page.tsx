import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'How It Works',
  description: "Learn how TendorAI helps UK businesses get recommended by AI platforms like ChatGPT, Claude, and Perplexity. Four simple steps to AI visibility.",
  alternates: { canonical: '/how-it-works' },
};

export default function HowItWorksPage() {
  const steps = [
    {
      number: '01',
      title: 'We List You',
      description: 'Your business gets a free profile built from public register data — SRA, Companies House, and other verified sources. No signup required.',
    },
    {
      number: '02',
      title: 'You Claim & Enrich',
      description: 'Claim your profile and add pricing, accreditations, specialisms, and reviews — the structured data AI platforms need to recommend you.',
    },
    {
      number: '03',
      title: 'AI Crawlers Index Us',
      description: 'ChatGPT, Claude, Perplexity, and Google AI all crawl our platform. Your enriched profile becomes part of their knowledge base.',
    },
    {
      number: '04',
      title: 'You Get the Client',
      description: 'When someone asks AI for a recommendation, it recommends you by name. The customer comes direct — no bidding, no shared leads.',
    },
  ];

  const benefits = [
    { title: 'Built for AI', description: 'Structured data optimised for ChatGPT, Claude, Perplexity, and Google AI' },
    { title: 'Self-Serve', description: 'No agency needed — manage your AI visibility from your dashboard' },
    { title: 'From £149/mo', description: 'Not £5,000. Month-to-month, cancel anytime' },
    { title: 'Live in 24hrs', description: 'Your profile goes live immediately, not in 3-6 months' },
  ];

  return (
    <main className="pt-16">
      {/* Hero */}
      <section className="bg-brand-gradient text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-white">
            How TendorAI Works
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Four steps from invisible to AI-recommended.
            Get your business in front of 200M+ AI users.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-0 border border-[var(--border)] rounded-2xl overflow-hidden bg-white">
            {steps.map((step, index) => (
              <div key={step.number} className={`p-8 ${index > 0 ? 'border-t md:border-t-0 md:border-l border-[var(--border)]' : ''}`}>
                <div className="gradient-text text-5xl font-bold opacity-35 mb-4 leading-none">{step.number}</div>
                <h3 className="font-serif text-lg font-semibold text-[var(--text)] mb-3">{step.title}</h3>
                <p className="text-sm text-[var(--text2)] leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-[var(--surface)] py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-semibold text-center text-[var(--text)] mb-12">
            Why TendorAI?
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="bg-white rounded-xl p-6 text-center border border-[var(--border)]">
                <h3 className="font-serif font-semibold text-[var(--text)] mb-2">{benefit.title}</h3>
                <p className="text-sm text-[var(--text2)]">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl font-semibold text-[var(--text)] mb-6">
            Check Your AI Visibility
          </h2>
          <p className="text-[var(--text2)] mb-8">
            Run a free AI visibility report — see exactly what ChatGPT, Claude, and Perplexity say about your business.
          </p>
          <Link href="/aeo-report" className="btn-primary">
            Check AI Visibility — Free
          </Link>
        </div>
      </section>
    </main>
  );
}
