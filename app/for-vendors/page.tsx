import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "For Vendors — AI is Recommending Your Competitors. We Fix That.",
  description: "200M people now ask ChatGPT instead of Google. Get your business recommended by AI platforms. Free profile, paid tiers from £149/month. No agency required.",
  alternates: { canonical: '/for-vendors' },
};

export default function ForVendorsPage() {
  const faqs = [
    {
      q: 'Is there a free option?',
      a: "Yes — every business gets a free profile built from public register data. It's live already. Claim it to control what AI says about you. Upgrade when you're ready for priority ranking and full AI visibility features.",
    },
    {
      q: 'How does AI find my company?',
      a: "TendorAI structures your company data so it's accessible to AI assistants like ChatGPT, Claude, and Perplexity. When someone asks \"who's the best solicitor in Bristol?\", AI draws from our structured data to recommend you.",
    },
    {
      q: 'Why should I care about AI recommendations?',
      a: "200M+ people now use AI instead of Google to find suppliers. If your company isn't in AI's data sources, you're invisible to these buyers. It's the same shift that happened with SEO — but for AI.",
    },
    {
      q: 'Can I cancel anytime?',
      a: "Yes. Month-to-month, no contracts, no lock-in. Cancel your subscription at any time from your dashboard and you'll keep access until the end of your billing period.",
    },
    {
      q: 'How is this different from SEO agencies?',
      a: "SEO agencies optimise your website for Google. TendorAI optimises your structured data for AI platforms — ChatGPT, Claude, Perplexity, Google AI. Different technology, different audience. And we cost £149/month, not £5,000.",
    },
  ];

  return (
    <main className="pt-16">
      {/* Hero */}
      <section className="bg-brand-gradient text-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <span className="text-sm font-medium">11,000+ businesses already listed</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            AI is recommending your competitors.<br />
            We fix that.
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10">
            200M people now ask ChatGPT instead of Google. When they ask for a solicitor,
            accountant, or copier dealer &mdash; is AI recommending you?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/aeo-report"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold bg-white text-[var(--purple-start)] hover:bg-purple-50 transition-all shadow-lg text-lg"
            >
              Run Your Free AI Visibility Report
            </Link>
            <a
              href="#pricing"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold border-2 border-white/30 text-white hover:bg-white/10 transition-all text-lg"
            >
              See Pricing
            </a>
          </div>
          <p className="mt-6 text-sm text-white/70">
            Your free profile is already live. Claim it to control what AI says about you.
          </p>
        </div>
      </section>

      {/* Social Proof Bar */}
      <section className="bg-gray-900 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-8 text-center">
            <div>
              <span className="text-2xl font-bold text-white">11,000+</span>
              <span className="text-gray-400 text-sm ml-2">Businesses listed</span>
            </div>
            <div className="hidden sm:block text-gray-600">|</div>
            <div>
              <span className="text-2xl font-bold text-white">6</span>
              <span className="text-gray-400 text-sm ml-2">AI platforms tracked</span>
            </div>
            <div className="hidden sm:block text-gray-600">|</div>
            <div>
              <span className="text-gray-400 text-sm">Self-serve. No agency.</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text)] mb-4">
              How It Works
            </h2>
            <p className="text-[var(--text2)] text-lg max-w-2xl mx-auto">
              From invisible to AI-recommended in four steps
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { step: '1', title: 'We list you', description: 'Your business gets a free profile built from public register data (SRA, Companies House).' },
              { step: '2', title: 'You claim & enrich', description: 'Add pricing, accreditations, and specialisms — the structured data AI needs.' },
              { step: '3', title: 'AI crawlers index us', description: 'ChatGPT, Claude, Perplexity, and Google AI all crawl your enriched profile.' },
              { step: '4', title: 'You get the client', description: 'AI recommends you by name. Customer comes direct. No bidding. No shared leads.' },
            ].map((step) => (
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

      {/* Pricing */}
      <section id="pricing" className="py-24 bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text)] mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-[var(--text2)] text-lg max-w-2xl mx-auto">
              Start free. Upgrade when AI should recommend you first.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-start">
            {/* Free */}
            <div className="bg-white rounded-2xl p-8 border border-[var(--border)]">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Free</h3>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-gray-900">£0</span>
                  <span className="text-gray-500">/forever</span>
                </div>
                <p className="text-sm text-gray-500">Claim your profile. Get listed in the TendorAI directory and visible to AI crawlers with your basic SRA/FCA details.</p>
              </div>
              <ul className="space-y-3 mb-8">
                {['Basic company profile', 'Listed in directory', 'Public register data', 'No pricing visible to AI'].map((f, i) => (
                  <li key={i} className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-gray-700">{f}</span>
                  </li>
                ))}
              </ul>
              <Link href="https://www.tendorai.com/vendor-signup?tier=free" className="block w-full text-center py-3.5 px-6 rounded-xl font-semibold border border-gray-300 text-gray-700 hover:bg-[var(--surface)] transition-all">
                Claim Your Free Profile
              </Link>
            </div>

            {/* Starter */}
            <div className="bg-white rounded-2xl p-8 border border-[var(--border)]">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Starter</h3>
                <div className="mb-1">
                  <span className="text-sm text-gray-400 line-through">£299</span>
                </div>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-gray-900">£149</span>
                  <span className="text-gray-500">/month</span>
                </div>
                <p className="text-xs font-medium text-purple-600">Early adopter price</p>
              </div>
              <p className="text-sm text-gray-500 text-center mb-6">Stand out from unclaimed profiles. Add your pricing, specialisms, and services so AI can recommend you with detail. Includes monthly AEO visibility report.</p>
              <ul className="space-y-3 mb-8">
                {['Pricing visible to AI', 'Ranked above free profiles', 'Monthly AEO report', 'AI visibility score', 'Up to 10 products'].map((f, i) => (
                  <li key={i} className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-gray-700">{f}</span>
                  </li>
                ))}
              </ul>
              <Link href="https://www.tendorai.com/vendor-signup?tier=starter" className="block w-full text-center py-3.5 px-6 rounded-xl font-semibold bg-purple-600 text-white hover:bg-purple-700 shadow-md transition-all">
                Start Starter
              </Link>
            </div>

            {/* Pro — MOST POPULAR */}
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 rounded-3xl blur-lg opacity-50 animate-pulse" />
              <div className="relative bg-gradient-to-b from-amber-50 via-white to-orange-50 rounded-2xl p-8 border-2 border-amber-400 shadow-2xl transform md:-translate-y-6">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wide bg-gradient-to-r from-amber-500 to-orange-500 shadow-lg">
                    Most Popular
                  </span>
                </div>
                <div className="text-center mb-6 pt-2">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Pro</h3>
                  <div className="mb-1">
                    <span className="text-sm text-gray-400 line-through">£499</span>
                  </div>
                  <div className="mb-2">
                    <span className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">£299</span>
                    <span className="text-gray-500">/month</span>
                  </div>
                  <p className="text-xs font-medium text-amber-600">Early adopter price</p>
                </div>
                <p className="text-sm text-gray-500 text-center mb-6">Get recommended first. Full structured data, weekly AEO reports, AI mention tracking, TendorAI Verified badge, and priority ranking in AI results.</p>
                <ul className="space-y-3 mb-8">
                  {['Ranked first in AI results', 'Full structured data to AI', 'AI mention tracking', 'Weekly AEO reports', 'TendorAI Verified badge', 'Unlimited products', 'Priority support'].map((f, i) => (
                    <li key={i} className="flex items-start space-x-3">
                      <svg className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-gray-700">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href="https://www.tendorai.com/vendor-signup?tier=pro" className="block w-full text-center py-3.5 px-6 rounded-xl font-semibold bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all">
                  Start Pro
                </Link>
              </div>
            </div>

          </div>

          {/* Comparison Table: TendorAI vs Agencies */}
          <div className="mt-20 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">TendorAI vs Agencies</h3>
            <div className="bg-white rounded-2xl border border-[var(--border)] overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-[var(--surface)]">
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600"></th>
                    <th className="text-center py-4 px-6 text-sm font-semibold text-gray-600">Agencies</th>
                    <th className="text-center py-4 px-6 text-sm font-semibold text-[var(--purple-start)]">TendorAI</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    ['Monthly cost', '£1,500–£8,000', '£149–£299'],
                    ['Contract length', '12 months', 'Month-to-month'],
                    ['Time to go live', '3–6 months', 'Profile live in 24 hours'],
                    ['Self-service', 'No', 'Yes'],
                    ['Built for AI platforms', '1–2 platforms', 'All major AI'],
                    ['AI visibility score', 'Manual audit', 'Real-time dashboard'],
                  ].map(([label, agency, tendorai], i) => (
                    <tr key={i}>
                      <td className="py-4 px-6 text-sm font-medium text-gray-900">{label}</td>
                      <td className="py-4 px-6 text-sm text-gray-500 text-center">{agency}</td>
                      <td className="py-4 px-6 text-sm text-[var(--purple-start)] font-semibold text-center">{tendorai}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* What to Expect */}
          <div className="mt-12 max-w-3xl mx-auto bg-purple-50/60 border border-purple-100 rounded-xl px-6 py-5">
            <h3 className="font-semibold text-gray-900 text-sm mb-2">What to Expect</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              TendorAI structures your data so AI recommends you to potential clients. Can you get leads
              and enquiries from this? Absolutely. But this isn&apos;t pay-per-lead &mdash; it&apos;s building your AI
              presence for the long term. Think of it like SEO in 2005. The businesses that invested
              early dominated for years. AI search is that same moment, right now.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-[var(--border)] pb-6 last:border-0">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
    </main>
  );
}
