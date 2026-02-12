import { Metadata } from 'next';
import { PLANS } from '@/lib/constants/plans';

export const metadata: Metadata = {
  title: 'For Vendors — Get Found by AI Assistants',
  description: 'AI assistants are already recommending your competitors. Join 1,000+ UK suppliers on TendorAI and start appearing in AI-powered recommendations from ChatGPT, Claude, and Perplexity.',
};

export default function ForVendorsPage() {
  const steps = [
    {
      step: '1',
      title: 'Create Your Profile',
      description: 'Add your company details, products, pricing, and coverage areas. Takes under 10 minutes.',
    },
    {
      step: '2',
      title: 'AI Finds You',
      description: 'When businesses ask ChatGPT, Claude, or Perplexity for suppliers, our data feeds your profile into their answers.',
    },
    {
      step: '3',
      title: 'Get Qualified Leads',
      description: 'Receive quote requests from businesses who already know what they need — no cold calling required.',
    },
    {
      step: '4',
      title: 'Track & Improve',
      description: 'See which AI platforms mention you, how often, and get tips to increase your visibility score.',
    },
  ];

  const faqs = [
    {
      q: 'Is there a free trial?',
      a: 'Yes — the Listed plan is free forever. You can list your company and up to 3 products at no cost. Upgrade to Visible or Verified when you\'re ready for more features and higher AI visibility.',
    },
    {
      q: 'How does AI find my company?',
      a: 'TendorAI structures your company data so it\'s accessible to AI assistants like ChatGPT, Claude, and Perplexity. When a business asks "who supplies photocopiers in Cardiff?", AI draws from our data to recommend you.',
    },
    {
      q: 'Why should I care about AI recommendations?',
      a: 'More businesses are asking AI for supplier recommendations instead of searching Google. If your company isn\'t in AI\'s data sources, you\'re invisible to these buyers. It\'s the same shift that happened with SEO — but for AI.',
    },
    {
      q: 'Can I cancel anytime?',
      a: 'Yes. No contracts, no lock-in. Cancel your subscription at any time from your dashboard and you\'ll keep access until the end of your billing period.',
    },
    {
      q: 'How is this different from Google Ads?',
      a: 'Google Ads targets people searching Google. TendorAI targets people asking AI assistants for recommendations — a rapidly growing channel. Think of it as GEO (Generative Engine Optimisation) vs SEO.',
    },
  ];

  return (
    <main className="pt-16">
      {/* Hero */}
      <section className="bg-brand-gradient text-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <span className="text-sm font-medium">1,000+ suppliers already listed</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            AI assistants are already<br />
            recommending your competitors.
          </h1>
          <p className="text-xl text-purple-100 max-w-2xl mx-auto mb-10">
            When businesses ask ChatGPT, Claude, or Perplexity for office equipment suppliers,
            will they hear your name — or your competitor&apos;s?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/vendor-signup?plan=free"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold bg-white text-purple-700 hover:bg-purple-50 transition-all shadow-lg text-lg"
            >
              Start Free Trial
            </a>
            <a
              href="#pricing"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold border-2 border-white/30 text-white hover:bg-white/10 transition-all text-lg"
            >
              See Pricing
            </a>
          </div>
        </div>
      </section>

      {/* Social Proof Bar */}
      <section className="bg-gray-900 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-8 text-center">
            <div>
              <span className="text-2xl font-bold text-white">1,000+</span>
              <span className="text-gray-400 text-sm ml-2">Suppliers listed</span>
            </div>
            <div className="hidden sm:block text-gray-600">|</div>
            <div>
              <span className="text-2xl font-bold text-white">4</span>
              <span className="text-gray-400 text-sm ml-2">Categories covered</span>
            </div>
            <div className="hidden sm:block text-gray-600">|</div>
            <div>
              <span className="text-gray-400 text-sm">Across the UK</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Four simple steps to start appearing in AI recommendations
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {steps.map((step) => (
              <div key={step.step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-700 font-bold text-xl flex items-center justify-center mx-auto mb-4">
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
      <section id="pricing" className="py-24 bg-gray-50">
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
            {PLANS.map((plan) => {
              const isPopular = plan.popular;
              const isVerified = plan.id === 'verified';

              return (
                <div
                  key={plan.id}
                  className={`relative ${isVerified ? '' : ''}`}
                >
                  {/* Verified glow effect */}
                  {isVerified && (
                    <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 rounded-3xl blur-lg opacity-50 animate-pulse" />
                  )}

                  <div
                    className={`relative rounded-2xl p-8 ${
                      isVerified
                        ? 'bg-gradient-to-b from-amber-50 via-white to-orange-50 border-2 border-amber-400 shadow-2xl transform md:-translate-y-6'
                        : isPopular
                          ? 'bg-gradient-to-b from-purple-50 to-white border-2 border-purple-200 shadow-lg transform md:-translate-y-4'
                          : 'bg-white border border-gray-200'
                    }`}
                  >
                    {/* Badge */}
                    {(isPopular || isVerified) && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                        <span
                          className={`text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wide ${
                            isVerified
                              ? 'bg-gradient-to-r from-amber-500 to-orange-500 shadow-lg'
                              : 'bg-purple-600'
                          }`}
                        >
                          {isVerified ? 'Best Value' : 'Popular'}
                        </span>
                      </div>
                    )}

                    <div className="text-center mb-6 pt-2">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                      <div className="mb-2">
                        <span
                          className={`text-4xl md:text-5xl font-bold ${
                            isVerified
                              ? 'bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent'
                              : isPopular
                                ? 'text-purple-600'
                                : 'text-gray-900'
                          }`}
                        >
                          {plan.price === 0 ? '£0' : `£${plan.price}`}
                        </span>
                        <span className="text-gray-500">/month</span>
                      </div>
                      <p className={`text-sm font-medium ${
                        isVerified ? 'text-amber-600' : isPopular ? 'text-purple-600' : 'text-gray-500'
                      }`}>
                        {plan.description}
                      </p>
                    </div>

                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start space-x-3">
                          {feature.included ? (
                            <svg
                              className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                                isVerified ? 'text-amber-500' : isPopular ? 'text-purple-500' : 'text-gray-400'
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          ) : (
                            <svg className="w-5 h-5 text-gray-300 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          )}
                          <span className={`text-sm ${feature.included ? 'text-gray-700' : 'text-gray-400'}`}>
                            {feature.text}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <a
                      href={`/vendor-signup?plan=${plan.id}`}
                      className={`block w-full text-center py-3.5 px-6 rounded-xl font-semibold transition-all ${
                        isVerified
                          ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                          : isPopular
                            ? 'bg-purple-600 text-white hover:bg-purple-700 shadow-md'
                            : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {plan.price === 0 ? 'Get Started Free' : `Start ${plan.name}`}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ROI callout */}
          <div className="mt-16 max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
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

      {/* FAQ */}
      <section className="py-20 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-gray-200 pb-6 last:border-0">
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
            Start Getting AI Mentions Today
          </h2>
          <p className="text-gray-400 mb-8 text-lg">
            Join 1,000+ UK suppliers already on TendorAI. Free to start, upgrade anytime.
          </p>
          <a
            href="/vendor-signup?plan=free"
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:from-purple-600 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl text-lg"
          >
            Start Free Trial
          </a>
        </div>
      </section>
    </main>
  );
}
