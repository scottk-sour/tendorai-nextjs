import Link from 'next/link';
import Pricing from './Pricing';
import { VerticalConfig } from '@/lib/constants/verticals';

export default function VerticalLandingPage({ config }: { config: VerticalConfig }) {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: config.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const webPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `https://www.tendorai.com/${config.slug}`,
    name: config.meta.title,
    description: config.meta.description,
    url: `https://www.tendorai.com/${config.slug}`,
    datePublished: '2024-01-01',
    dateModified: new Date().toISOString().split('T')[0],
    publisher: {
      '@type': 'Organization',
      name: 'TendorAI',
      url: 'https://www.tendorai.com',
    },
  };

  return (
    <main className="pt-16">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />

      {/* Hero */}
      <section className="bg-brand-gradient text-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <span className="text-sm font-medium">{config.hero.badge}</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {config.hero.h1}
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10">
            {config.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/aeo-report"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold bg-white text-[var(--purple-start)] hover:bg-purple-50 transition-all shadow-lg text-lg"
            >
              {config.hero.ctaText}
            </Link>
            <a
              href="#pricing"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold border-2 border-white/30 text-white hover:bg-white/10 transition-all text-lg"
            >
              See Pricing
            </a>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="py-20 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text)] mb-6">
            {config.problem.heading}
          </h2>
          <p className="text-lg text-[var(--text2)] leading-relaxed">
            {config.problem.body}
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 lg:py-24 bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text)] mb-4">
              How It Works
            </h2>
            <p className="text-[var(--text2)] text-lg max-w-2xl mx-auto">
              From invisible to AI-recommended in three steps
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {config.howItWorks.map((step) => (
              <div key={step.step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-purple-100 text-[var(--purple-start)] font-bold text-xl flex items-center justify-center mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why This Matters Now — SEO vs AI */}
      <section className="py-20 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text)] mb-6 text-center">
            Why AI Visibility Matters Now
          </h2>
          <p className="text-lg text-[var(--text2)] leading-relaxed">
            {config.seoVsAi}
          </p>
        </div>
      </section>

      {/* Services Covered */}
      <section className="py-20 lg:py-24 bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text)] mb-4">
              Services We Cover for {config.name}
            </h2>
            <p className="text-[var(--text2)] text-lg max-w-2xl mx-auto">
              TendorAI structures your data across every service area so AI can recommend you for the right queries.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {config.services.map((service) => (
              <Link
                key={service.slug}
                href={`/suppliers/${service.slug}`}
                className="bg-white rounded-xl p-4 border border-[var(--border)] text-center hover:border-purple-300 hover:shadow-sm transition-all"
              >
                <span className="text-sm font-medium text-[var(--text)]">{service.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Callout Strip */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="p-4">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Free</span>
              <p className="text-sm text-[var(--text2)] mt-2">{config.pricingCallout.free}</p>
            </div>
            <div className="p-4">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-600">Starter</span>
              <p className="text-sm text-[var(--text2)] mt-2">{config.pricingCallout.starter}</p>
            </div>
            <div className="p-4">
              <span className="text-xs font-bold uppercase tracking-wider text-orange-500">Pro</span>
              <p className="text-sm text-[var(--text2)] mt-2">{config.pricingCallout.pro}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Component */}
      <Pricing />

      {/* Final CTA */}
      <section className="bg-gray-900 py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Run Your Free AI Visibility Report
          </h2>
          <p className="text-gray-400 mb-8 text-lg">
            See exactly what ChatGPT, Claude, and Perplexity say about your business. Takes 30 seconds.
          </p>
          <Link
            href="/aeo-report"
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:from-purple-600 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl text-lg"
          >
            Check Your AI Visibility — Free
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 lg:py-24 bg-[var(--surface)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {config.faqs.map((faq, i) => (
              <div key={i} className="border-b border-[var(--border)] pb-6 last:border-0">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
