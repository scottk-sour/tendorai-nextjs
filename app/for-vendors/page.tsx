import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'For Vendors | TendorAI - Get Qualified Leads',
  description: 'Join TendorAI and get qualified leads from UK businesses looking for office equipment. AI-powered matching ensures you reach the right customers.',
};

export default function ForVendorsPage() {
  const benefits = [
    {
      icon: '🤖',
      title: 'AI Mentions Your Company',
      description: 'When businesses ask AI for suppliers, get recommended.',
    },
    {
      icon: '🎯',
      title: 'Qualified Leads',
      description: 'Receive leads with full requirements, not tyre kickers.',
    },
    {
      icon: '📊',
      title: 'Track Your Visibility',
      description: 'See how many times AI mentioned you this month.',
    },
  ];

  return (
    <main className="pt-16">
      {/* Hero */}
      <section className="bg-brand-gradient text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <span>🚀</span>
            <span className="text-sm font-medium">Join 70+ UK Suppliers</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Get Found by AI. Get Qualified Leads.
          </h1>
          <p className="text-xl text-purple-100 max-w-2xl mx-auto mb-8">
            When businesses ask ChatGPT, Claude, or Perplexity for office equipment suppliers,
            will they hear your name — or your competitor&apos;s?
          </p>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            SEO Gets You on Google.<br />
            <span className="text-purple-600">GEO Gets You in AI Answers.</span>
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            More businesses are asking AI assistants for supplier recommendations instead of searching Google.
            If your company isn&apos;t in AI&apos;s data sources, you&apos;re invisible to these buyers.
          </p>
          <p className="text-gray-600 text-lg">
            TendorAI is the data layer AI assistants query for UK office equipment suppliers.
            <strong className="text-gray-900"> Get listed, and AI starts recommending you.</strong>
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Vendors Choose TendorAI
          </h2>
          <div className="grid sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="text-center">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING - THE MAIN EVENT */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Start free. Upgrade when you&apos;re ready to dominate AI recommendations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">

            {/* FREE TIER */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8 relative">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Free</h3>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-gray-900">£0</span>
                  <span className="text-gray-500">/month</span>
                </div>
                <p className="text-sm text-gray-500">Get listed, AI knows you exist</p>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600 text-sm">Basic profile listing</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600 text-sm">Appear in search results</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600 text-sm">Company name visible</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600 text-sm">AI Visibility Score up to 70</span>
                </li>
              </ul>

              <a
                href="/vendor-signup?plan=free"
                className="block w-full text-center py-3 px-6 rounded-xl font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Get Started Free
              </a>
            </div>

            {/* VISIBLE TIER - £99 - POPS */}
            <div className="bg-gradient-to-b from-purple-50 to-white rounded-2xl border-2 border-purple-200 p-8 relative shadow-lg transform md:-translate-y-4">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="bg-purple-600 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wide">
                  Popular
                </span>
              </div>

              <div className="text-center mb-6 pt-2">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Visible</h3>
                <div className="mb-2">
                  <span className="text-5xl font-bold text-purple-600">£99</span>
                  <span className="text-gray-500">/month</span>
                </div>
                <p className="text-sm text-purple-600 font-medium">AI recommends you + direct leads</p>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700 text-sm">Everything in Free, plus:</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700 text-sm font-medium">Priority in AI recommendations</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700 text-sm font-medium">Direct quote requests</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700 text-sm">Contact details visible</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700 text-sm">AI Visibility Score up to 85</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700 text-sm">Full analytics dashboard</span>
                </li>
              </ul>

              <a
                href="/vendor-signup?plan=visible"
                className="block w-full text-center py-3.5 px-6 rounded-xl font-semibold bg-purple-600 text-white hover:bg-purple-700 transition-colors shadow-md"
              >
                Start Visible
              </a>

              <p className="text-center text-xs text-gray-500 mt-3">
                ~40-60 AI mentions/month estimated
              </p>
            </div>

            {/* VERIFIED TIER - £149 - REALLY POPS */}
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 rounded-3xl blur-lg opacity-50 animate-pulse"></div>

              <div className="relative bg-gradient-to-b from-amber-50 via-white to-orange-50 rounded-2xl border-2 border-amber-400 p-8 shadow-2xl transform md:-translate-y-6">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wide shadow-lg">
                    Best Value
                  </span>
                </div>

                <div className="text-center mb-6 pt-2">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Verified</h3>
                  <div className="mb-2">
                    <span className="text-5xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">£149</span>
                    <span className="text-gray-500">/month</span>
                  </div>
                  <p className="text-sm text-amber-600 font-medium">Top placement + qualified leads</p>
                </div>

                <ul className="space-y-3 mb-8">
                  <li className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700 text-sm">Everything in Visible, plus:</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700 text-sm font-semibold">#1 placement in ALL results</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700 text-sm font-semibold">Verified badge on profile</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700 text-sm font-semibold">Leads with full requirements</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700 text-sm">AI Visibility Score up to 100</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700 text-sm">Priority support</span>
                  </li>
                </ul>

                <a
                  href="/vendor-signup?plan=verified"
                  className="block w-full text-center py-4 px-6 rounded-xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Go Verified
                </a>

                <p className="text-center text-xs text-gray-500 mt-3">
                  ~80-120 AI mentions/month estimated
                </p>
              </div>
            </div>
          </div>

          {/* ROI callout */}
          <div className="mt-16 max-w-2xl mx-auto text-center">
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-2">The ROI Math</h3>
              <p className="text-gray-600">
                One copier deal = £3,000+ contract. At £149/month, you need
                <strong className="text-purple-600"> one deal every 20 months</strong> to break even.
                Most verified vendors close 2-3 deals per month.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gray-900 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Start Getting AI Mentions Today
          </h2>
          <p className="text-gray-400 mb-8">
            Join 70+ UK suppliers already on TendorAI. Free to start, upgrade anytime.
          </p>
          <a
            href="/vendor-signup?plan=free"
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:from-purple-600 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl"
          >
            Create Your Free Listing
          </a>
        </div>
      </section>
    </main>
  );
}
