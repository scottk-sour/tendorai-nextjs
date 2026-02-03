import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'For Vendors | TendorAI - Get Qualified Leads',
  description: 'Join TendorAI and get qualified leads from UK businesses looking for office equipment. AI-powered matching ensures you reach the right customers.',
};

export default function ForVendorsPage() {
  const tiers = [
    {
      name: 'Free',
      price: '£0',
      period: '/month',
      description: 'Get listed and let AI know you exist',
      features: [
        'Basic profile listing',
        'Appear in AI search results',
        'Company name and location visible',
        'AI Visibility Score up to 70',
      ],
      cta: 'Get Started',
      highlighted: false,
    },
    {
      name: 'Visible',
      price: '£99',
      period: '/month',
      description: 'AI recommends you in "best companies" queries',
      features: [
        'Everything in Free, plus:',
        'Priority placement in results',
        'Direct quote requests from customers',
        'Contact details visible on profile',
        'AI Visibility Score up to 85',
        'Full analytics dashboard',
      ],
      cta: 'Start Visible',
      highlighted: false,
    },
    {
      name: 'Verified',
      price: '£149',
      period: '/month',
      description: 'AI includes you in quote recommendation flows',
      features: [
        'Everything in Visible, plus:',
        'Top placement in all results',
        'Verified badge on profile',
        'Qualified leads with full requirements',
        'AI Visibility Score up to 100',
        'Priority support',
      ],
      cta: 'Go Verified',
      highlighted: true,
    },
  ];

  const benefits = [
    {
      title: 'AI-Powered Leads',
      description: 'When businesses ask AI for supplier recommendations, your company gets mentioned.',
      icon: '🤖',
    },
    {
      title: 'Qualified Prospects',
      description: 'Every lead includes requirements, location, and contact details. No tyre kickers.',
      icon: '🎯',
    },
    {
      title: 'Track Your Visibility',
      description: 'See exactly how many times AI mentioned your company and what searches led to you.',
      icon: '📊',
    },
    {
      title: 'Control Your Profile',
      description: 'Update your services, coverage areas, and products anytime from your dashboard.',
      icon: '⚙️',
    },
  ];

  return (
    <main className="pt-16">
      {/* Hero */}
      <section className="bg-gradient-to-br from-purple-600 to-indigo-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Get Found by AI. Get Qualified Leads.
          </h1>
          <p className="text-xl text-purple-100 max-w-2xl mx-auto mb-8">
            When businesses ask ChatGPT, Claude, or Perplexity for office equipment suppliers,
            will they hear your name — or your competitor&apos;s?
          </p>
          <a
            href="https://www.tendorai.com/vendor-signup"
            className="inline-block bg-white text-purple-600 font-medium px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Join TendorAI Free
          </a>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            SEO Gets You on Google. GEO Gets You in AI Answers.
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            More businesses are asking AI assistants for supplier recommendations instead of searching Google.
            If your company isn&apos;t in AI&apos;s data sources, you&apos;re invisible to these buyers.
          </p>
          <p className="text-gray-600 text-lg">
            TendorAI is the data layer AI assistants query for UK office equipment suppliers.
            Get listed, and AI starts recommending you.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Vendors Choose TendorAI
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="bg-white rounded-xl p-6">
                <div className="text-3xl mb-4">{benefit.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Start free. Upgrade when you&apos;re ready for more leads and visibility.
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`rounded-2xl p-8 ${
                  tier.highlighted
                    ? 'bg-purple-600 text-white ring-4 ring-purple-600 ring-offset-4'
                    : 'bg-white border border-gray-200'
                }`}
              >
                <h3 className={`text-xl font-bold mb-2 ${tier.highlighted ? 'text-white' : 'text-gray-900'}`}>
                  {tier.name}
                </h3>
                <div className="mb-4">
                  <span className={`text-4xl font-bold ${tier.highlighted ? 'text-white' : 'text-gray-900'}`}>
                    {tier.price}
                  </span>
                  <span className={tier.highlighted ? 'text-purple-200' : 'text-gray-500'}>
                    {tier.period}
                  </span>
                </div>
                <p className={`text-sm mb-6 ${tier.highlighted ? 'text-purple-200' : 'text-gray-600'}`}>
                  {tier.description}
                </p>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature) => (
                    <li key={feature} className={`text-sm flex items-start ${tier.highlighted ? 'text-purple-100' : 'text-gray-600'}`}>
                      <svg className={`w-5 h-5 mr-2 flex-shrink-0 ${tier.highlighted ? 'text-purple-300' : 'text-purple-600'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href="https://www.tendorai.com/vendor-signup"
                  className={`block text-center py-3 px-6 rounded-lg font-medium transition-colors ${
                    tier.highlighted
                      ? 'bg-white text-purple-600 hover:bg-gray-100'
                      : 'bg-purple-600 text-white hover:bg-purple-700'
                  }`}
                >
                  {tier.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-900 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Start Getting AI Mentions Today
          </h2>
          <p className="text-gray-400 mb-8">
            Join 70+ UK suppliers already on TendorAI. Free to start, upgrade anytime.
          </p>
          <a
            href="https://www.tendorai.com/vendor-signup"
            className="inline-block bg-purple-600 text-white font-medium px-8 py-4 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Create Free Account
          </a>
        </div>
      </section>
    </main>
  );
}
