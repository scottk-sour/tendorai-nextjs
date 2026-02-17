import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'How It Works',
  description: "Learn how TendorAI helps UK businesses get recommended by AI platforms like ChatGPT, Claude, and Perplexity. Four simple steps to AI visibility.",
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
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            How TendorAI Works
          </h1>
          <p className="text-xl text-purple-100 max-w-2xl mx-auto">
            Four steps from invisible to AI-recommended.
            Get your business in front of 200M+ AI users.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-purple-200 -translate-x-1/2" />
                )}
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 relative">
                  <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-700 font-bold flex items-center justify-center mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why TendorAI?
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="bg-white rounded-xl p-6 text-center">
                <h3 className="font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Check Your AI Visibility
          </h2>
          <p className="text-gray-600 mb-8">
            Run a free AI visibility report — see exactly what ChatGPT, Claude, and Perplexity say about your business.
          </p>
          <Link
            href="/aeo-report"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-medium px-8 py-4 rounded-lg transition-colors"
          >
            Check AI Visibility — Free
          </Link>
        </div>
      </section>
    </main>
  );
}
