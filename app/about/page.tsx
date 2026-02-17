import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "About TendorAI — The UK's AI Visibility Platform",
  description: "TendorAI is the structured data layer between UK businesses and AI. When someone asks ChatGPT for a supplier, our data powers the answer.",
};

export default function AboutPage() {
  return (
    <main className="pt-16">
      {/* Hero */}
      <section className="bg-brand-gradient text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-white">
            About TendorAI
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            The UK&apos;s AI Visibility Platform
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="font-serif text-3xl font-semibold text-[var(--text)] mb-6">Our Mission</h2>
            <p className="text-[var(--text2)] mb-6">
              TendorAI is the UK&apos;s AI Visibility Platform &mdash; the structured data layer
              between UK businesses and AI.
            </p>
            <p className="text-[var(--text2)] mb-6">
              When someone asks ChatGPT, Claude, or Perplexity for a supplier
              recommendation, AI needs structured data to give a useful answer.
              TendorAI is that data.
            </p>
            <p className="text-[var(--text2)] mb-6">
              We build verified profiles for every UK solicitor firm, accountancy
              practice, and office equipment supplier &mdash; enriched with pricing,
              accreditations, specialisms, and reviews. AI crawlers index our platform.
              When someone asks AI for a recommendation, our data powers the answer.
            </p>
            <p className="text-[var(--text)] font-semibold text-xl mb-6">
              Listed free. Pay to rank first.
            </p>
            <p className="text-[var(--text2)]">
              Founded in Bristol, UK. Built for every B2B service vertical in the country.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[var(--surface)] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="gradient-text text-4xl font-bold mb-2">11,000+</div>
              <div className="text-[var(--text2)]">UK Businesses Listed</div>
            </div>
            <div>
              <div className="gradient-text text-4xl font-bold mb-2">6</div>
              <div className="text-[var(--text2)]">AI Platforms Tracked</div>
            </div>
            <div>
              <div className="gradient-text text-4xl font-bold mb-2">10,000+</div>
              <div className="text-[var(--text2)]">Solicitor Firms</div>
            </div>
            <div>
              <div className="gradient-text text-4xl font-bold mb-2">UK</div>
              <div className="text-[var(--text2)]">Wide Coverage</div>
            </div>
          </div>
        </div>
      </section>

      {/* How We're Different */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-semibold text-[var(--text)] mb-8 text-center">
            Why We&apos;re Different
          </h2>
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 border border-[var(--border)]">
              <h3 className="font-serif font-semibold text-[var(--text)] mb-2">Built for AI, Not Google</h3>
              <p className="text-[var(--text2)]">
                SEO agencies optimise your website for Google search. TendorAI optimises your
                structured data for AI platforms &mdash; ChatGPT, Claude, Perplexity, Google AI.
                Different technology, different audience, different results.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-[var(--border)]">
              <h3 className="font-serif font-semibold text-[var(--text)] mb-2">Self-Serve, Not Agency</h3>
              <p className="text-[var(--text2)]">
                No 12-month contracts. No £5,000/month retainers. TendorAI is a self-serve
                platform starting at £149/month. Your profile goes live in 24 hours, not 3-6 months.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-[var(--border)]">
              <h3 className="font-serif font-semibold text-[var(--text)] mb-2">Data-Driven Visibility</h3>
              <p className="text-[var(--text2)]">
                Every business gets a real-time AI visibility score, mention tracking across all
                major AI platforms, and actionable tips to improve. No guesswork &mdash; just data.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl font-bold text-white mb-6">
            Check Your AI Visibility
          </h2>
          <p className="text-white/80 mb-8 text-lg">
            Run a free AI visibility report &mdash; see what ChatGPT, Claude, and Perplexity say about your business.
          </p>
          <Link
            href="/aeo-report"
            className="btn-primary"
          >
            Check AI Visibility &mdash; Free
          </Link>
        </div>
      </section>
    </main>
  );
}
