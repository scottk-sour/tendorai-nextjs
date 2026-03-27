import { Metadata } from 'next';
import Link from 'next/link';
import AIVisibilityCheckerClient from './AIVisibilityCheckerClient';
import { Suspense } from 'react';

const TITLE = 'AI Visibility Checker — Is AI Recommending Your Business?';
const DESCRIPTION =
  'Free AI visibility checker for UK businesses. Enter your company name, business type, and location to see if ChatGPT, Perplexity, Claude, and Gemini recommend you. Results in 60 seconds.';
const CANONICAL = 'https://www.tendorai.com/ai-visibility-checker';

export const metadata: Metadata = {
  title: `${TITLE} | TendorAI`,
  description: DESCRIPTION,
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: CANONICAL,
    type: 'website',
    siteName: 'TendorAI',
    locale: 'en_GB',
    images: [{ url: '/logo.png', width: 873, height: 873 }],
  },
  twitter: {
    card: 'summary',
    title: TITLE,
    description: DESCRIPTION,
  },
};

const softwareAppJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'TendorAI AI Visibility Checker',
  description: DESCRIPTION,
  url: CANONICAL,
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'GBP',
  },
  creator: {
    '@type': 'Organization',
    name: 'TendorAI',
    url: 'https://www.tendorai.com',
  },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.tendorai.com' },
    { '@type': 'ListItem', position: 2, name: 'AI Visibility Checker', item: CANONICAL },
  ],
};

const faqs = [
  {
    q: 'What does the AI visibility checker do?',
    a: 'It scans ChatGPT, Perplexity, Claude, Gemini, Grok, and Meta AI to see if they recommend your business when someone asks for your type of service in your area. You get a score out of 100 and a breakdown of what is helping and hurting your visibility.',
  },
  {
    q: 'Is it really free?',
    a: 'Yes. The AI visibility check is completely free with no credit card required. You get a full report showing your score, which AI platforms mention you, who they recommend instead, and what to fix.',
  },
  {
    q: 'How long does it take?',
    a: 'About 60 seconds. Enter your business name, type, and location, then we scan six AI platforms and generate your personalised report.',
  },
  {
    q: 'What businesses can use this?',
    a: 'Any UK professional services firm — solicitors, accountants, mortgage advisers, estate agents, and more. The checker works for any business that wants to know if AI is recommending them.',
  },
];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: { '@type': 'Answer', text: faq.a },
  })),
};

export default function AIVisibilityCheckerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-gradient-to-br from-[#1B4F72] via-[#1a3d5c] to-[#2d1b4e] text-white py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <nav className="text-sm mb-6 text-blue-200">
              <Link href="/" className="hover:text-white">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-white">AI Visibility Checker</span>
            </nav>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              Is AI Recommending Your Business?
            </h1>

            <p className="text-lg text-blue-100 leading-relaxed max-w-2xl mx-auto mb-2">
              Find out in 60 seconds. Enter your details below and we&apos;ll scan ChatGPT, Perplexity, Claude, Gemini, Grok, and Meta AI to see if they recommend you &mdash; or your competitors.
            </p>

            <p className="text-sm text-blue-200">Free. No credit card. No signup required.</p>
          </div>
        </section>

        {/* Form */}
        <section className="py-12 md:py-16">
          <div className="max-w-xl mx-auto px-4 sm:px-6">
            <Suspense>
              <AIVisibilityCheckerClient />
            </Suspense>
          </div>
        </section>

        {/* How it works */}
        <section className="bg-gray-50 py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">How the AI Visibility Check Works</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { num: '1', title: 'Enter your details', desc: 'Business name, type, and location. That is all we need.' },
                { num: '2', title: 'We scan 6 AI platforms', desc: 'ChatGPT, Perplexity, Claude, Gemini, Grok, and Meta AI are queried with prompts matching your business.' },
                { num: '3', title: 'Get your report', desc: 'A score out of 100, who AI recommends instead of you, and exactly what to fix.' },
              ].map((step) => (
                <div key={step.num} className="bg-white rounded-xl border border-gray-200 p-6 text-center">
                  <div className="w-10 h-10 rounded-full bg-[#1B4F72] flex items-center justify-center text-white font-bold mx-auto mb-3">
                    {step.num}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 md:py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <details
                  key={i}
                  className="group bg-white border border-gray-200 rounded-lg"
                >
                  <summary className="flex items-center justify-between cursor-pointer p-5 text-left">
                    <h3 className="font-medium text-gray-900 pr-4">{faq.q}</h3>
                    <svg
                      className="w-5 h-5 text-gray-400 shrink-0 transition-transform group-open:rotate-180"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-5 pb-5 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-br from-[#1B4F72] to-[#2d1b4e] text-white rounded-2xl max-w-4xl mx-auto mx-4 sm:mx-auto p-8 md:p-12 text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Want to fix your AI visibility?</h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto">
            TendorAI installs structured data on your website, writes AI-optimised content, and tracks your visibility across six platforms. From &pound;299/month.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/for-vendors#pricing"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#1B4F72] font-bold rounded-lg hover:bg-blue-50 transition-colors text-lg"
            >
              See Plans
            </Link>
            <Link
              href="/how-it-works"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors"
            >
              How It Works
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
