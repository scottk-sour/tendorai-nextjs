import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'How It Works | TendorAI - AI-Powered Procurement',
  description: 'Learn how TendorAI connects UK businesses with verified office equipment suppliers. Get instant AI-matched quotes in 3 simple steps.',
};

export default function HowItWorksPage() {
  const steps = [
    {
      number: '01',
      title: 'Tell Us What You Need',
      description: 'Enter your requirements for office equipment - photocopiers, telecoms, CCTV, or IT services. Include your location and any specific needs.',
      icon: '📝',
    },
    {
      number: '02',
      title: 'AI Matches You With Suppliers',
      description: 'Our AI analyses your requirements and matches you with the most suitable verified suppliers from our network, considering location, pricing, and specialisation.',
      icon: '🤖',
    },
    {
      number: '03',
      title: 'Compare & Choose',
      description: 'Review quotes from matched suppliers, compare pricing and features, and choose the best option for your business. No obligation, completely free.',
      icon: '✅',
    },
  ];

  const benefits = [
    { title: 'Save Time', description: 'Get multiple quotes in minutes, not days', icon: '⏱️' },
    { title: 'Save Money', description: 'Compare prices to find the best deals', icon: '💷' },
    { title: 'Verified Suppliers', description: 'All suppliers are vetted and rated', icon: '✓' },
    { title: 'Free Service', description: 'No cost to businesses for comparing quotes', icon: '🆓' },
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
            Get instant quotes from verified UK suppliers in three simple steps.
            Our AI does the hard work so you don&apos;t have to.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-purple-200 -translate-x-1/2" />
                )}
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 relative">
                  <div className="text-4xl mb-4">{step.icon}</div>
                  <div className="text-purple-600 font-bold text-sm mb-2">{step.number}</div>
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
            Why Use TendorAI?
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="bg-white rounded-xl p-6 text-center">
                <div className="text-3xl mb-3">{benefit.icon}</div>
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
            Ready to Get Started?
          </h2>
          <p className="text-gray-600 mb-8">
            Join thousands of UK businesses who save time and money with TendorAI&apos;s AI-powered procurement.
          </p>
          <Link
            href="/suppliers"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-medium px-8 py-4 rounded-lg transition-colors"
          >
            Browse Suppliers
          </Link>
        </div>
      </section>
    </main>
  );
}
