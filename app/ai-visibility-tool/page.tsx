import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'AI Visibility Tool — Check If AI Recommends Your Business',
  description:
    'Free AI visibility tool for UK businesses. Track whether ChatGPT, Perplexity, and Claude recommend your business. Instant AI visibility report in 60 seconds.',
  alternates: {
    canonical: 'https://www.tendorai.com/ai-visibility-tool',
  },
  openGraph: {
    type: 'website',
    url: 'https://www.tendorai.com/ai-visibility-tool',
    title: 'AI Visibility Tool — Check If AI Recommends Your Business',
    description:
      'Free AI visibility tool for UK businesses. Track whether ChatGPT, Perplexity, and Claude recommend your business. Instant AI visibility report in 60 seconds.',
    siteName: 'TendorAI',
    locale: 'en_GB',
    images: [{ url: '/logo.png', width: 873, height: 873, alt: 'TendorAI AI Visibility Tool' }],
  },
  twitter: {
    card: 'summary',
    title: 'AI Visibility Tool — Check If AI Recommends Your Business',
    description:
      'Free AI visibility tool for UK businesses. Check if ChatGPT, Perplexity, and Claude recommend you.',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const faqs = [
  {
    q: 'What is an AI visibility tool?',
    a: 'An AI visibility tool checks whether AI platforms like ChatGPT, Perplexity, and Claude recommend your business when potential customers ask for suppliers. TendorAI\'s free AI visibility tool queries multiple AI platforms and shows you exactly where you stand.',
  },
  {
    q: 'How do I check my AI visibility?',
    a: 'Enter your company name, category, and location into our free AI visibility checker. We query ChatGPT, Perplexity, Claude, and other AI platforms in real time and show you whether they recommend your business, your competitors, or neither.',
  },
  {
    q: 'Is the AI visibility tool free?',
    a: 'Yes. The instant AI visibility report is completely free — no signup required. You get a one-off snapshot of how AI sees your business. For ongoing AI visibility tracking with weekly reports and mention alerts, see our paid plans starting at £299/month (3 of 50 early adopter spots taken).',
  },
  {
    q: 'Which AI platforms does TendorAI track?',
    a: 'We track six major AI platforms: ChatGPT (OpenAI), Claude (Anthropic), Perplexity, Google Gemini, Microsoft Copilot, and Meta AI. These are the platforms your customers are using instead of Google to find suppliers.',
  },
  {
    q: 'How can I improve my AI visibility score?',
    a: 'Structured data is the biggest factor. AI platforms recommend businesses that have clear, machine-readable information about their services, location, pricing, and accreditations. TendorAI structures this data for you — claim your free profile to start, or upgrade for full AI optimisation.',
  },
];

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'AI Visibility Tool — Check If AI Recommends Your Business',
  description:
    'Free AI visibility tool for UK businesses. Track whether ChatGPT, Perplexity, and Claude recommend your business.',
  url: 'https://www.tendorai.com/ai-visibility-tool',
  publisher: {
    '@type': 'Organization',
    name: 'TendorAI',
    url: 'https://www.tendorai.com',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.a,
    },
  })),
};

export default function AiVisibilityToolPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="pt-16">
        {/* Hero */}
        <section className="bg-brand-gradient text-white py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <span className="text-sm font-medium">Free AI visibility check</span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              The AI Visibility Tool That Shows<br />
              If AI Recommends You
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10">
              200M people now ask ChatGPT instead of Google. Find out if AI recommends your
              business &mdash; or your competitors. Free instant report in 60 seconds.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/aeo-report"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold bg-white text-[var(--purple-start)] hover:bg-purple-50 transition-all shadow-lg text-lg"
              >
                Check Your AI Visibility &mdash; Free
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

        {/* Factual overview */}
        <section className="py-8 bg-white border-b border-[var(--border)]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-gray-600 text-base leading-relaxed">
              TendorAI is a UK AI visibility platform that tracks whether AI assistants
              &mdash; including ChatGPT, Perplexity, Google AI Overviews, and Claude &mdash;
              recommend your business when potential customers ask for supplier recommendations.
              The platform covers UK professional services including solicitors, accountants,
              mortgage advisors, and estate agents, and provides structured data optimisation
              to improve how AI systems understand and cite your business.
            </p>
          </div>
        </section>

        {/* Social Proof Bar */}
        <section className="bg-gray-900 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-8 text-center">
              <div>
                <span className="text-2xl font-bold text-white">12,000+</span>
                <span className="text-gray-400 text-sm ml-2">Businesses listed</span>
              </div>
              <div className="hidden sm:block text-gray-600">|</div>
              <div>
                <span className="text-2xl font-bold text-white">6</span>
                <span className="text-gray-400 text-sm ml-2">AI platforms tracked</span>
              </div>
              <div className="hidden sm:block text-gray-600">|</div>
              <div>
                <span className="text-2xl font-bold text-white">60s</span>
                <span className="text-gray-400 text-sm ml-2">Instant results</span>
              </div>
              <div className="hidden sm:block text-gray-600">|</div>
              <div>
                <span className="text-gray-400 text-sm">No signup required</span>
              </div>
            </div>
          </div>
        </section>

        {/* What the AI Visibility Tool Checks */}
        <section className="py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--text)] mb-4">
                What the AI Visibility Tool Checks
              </h2>
              <p className="text-[var(--text2)] text-lg max-w-2xl mx-auto">
                We query the AI platforms your customers are using and show you exactly what they say
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {[
                {
                  title: 'AI Recommendations',
                  description: 'See if ChatGPT, Claude, Perplexity, and Gemini recommend your business when customers search for suppliers.',
                  icon: (
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                    </svg>
                  ),
                },
                {
                  title: 'Structured Data',
                  description: 'We check if your online presence has the machine-readable data AI needs to understand and recommend your business.',
                  icon: (
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
                    </svg>
                  ),
                },
                {
                  title: 'Competitor Comparison',
                  description: 'See which competitors AI recommends instead of you, and understand why they rank higher.',
                  icon: (
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                    </svg>
                  ),
                },
                {
                  title: 'Visibility Score',
                  description: 'Get a clear score showing your overall AI visibility, with actionable tips to improve it.',
                  icon: (
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                    </svg>
                  ),
                },
              ].map((feature) => (
                <div key={feature.title} className="text-center">
                  <div className="w-14 h-14 rounded-xl bg-purple-100 text-[var(--purple-start)] flex items-center justify-center mx-auto mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 lg:py-24 bg-[var(--surface)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--text)] mb-4">
                How the AI Visibility Checker Works
              </h2>
              <p className="text-[var(--text2)] text-lg max-w-2xl mx-auto">
                Three steps. Sixty seconds. No signup required.
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                {
                  step: '1',
                  title: 'Enter your details',
                  description: 'Tell us your company name, category (e.g. solicitor, accountant), and location. That\'s all we need.',
                },
                {
                  step: '2',
                  title: 'We query AI platforms',
                  description: 'We ask ChatGPT, Claude, Perplexity, and other AI platforms the questions your customers are asking.',
                },
                {
                  step: '3',
                  title: 'Get your report',
                  description: 'See exactly which AI platforms recommend you, who they recommend instead, and what to do about it.',
                },
              ].map((s) => (
                <div key={s.step} className="text-center">
                  <div className="w-12 h-12 rounded-full bg-purple-100 text-[var(--purple-start)] font-bold text-xl flex items-center justify-center mx-auto mb-4">
                    {s.step}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{s.title}</h3>
                  <p className="text-sm text-gray-600">{s.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AI Visibility Tracker */}
        <section className="py-20 lg:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--text)] mb-4">
                AI Visibility Tracker &mdash; Ongoing Monitoring
              </h2>
            </div>
            <div className="bg-white rounded-2xl border border-[var(--border)] p-8 sm:p-10">
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-600 text-lg leading-relaxed mb-4">
                  The free AI visibility tool gives you a one-off snapshot. But AI recommendations
                  change every week &mdash; new competitors appear, AI models update, and your
                  visibility can shift overnight.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  TendorAI&apos;s AI visibility tracker monitors your position across all major AI
                  platforms on an ongoing basis. You get:
                </p>
                <ul className="space-y-2 mb-6">
                  {[
                    'Weekly AI visibility reports delivered to your dashboard',
                    'AI mention tracking \u2014 see every time AI talks about your business',
                    'Competitor tracking \u2014 know when competitors overtake you',
                    'Actionable tips to improve your visibility score',
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-700">
                      <svg className="w-5 h-5 text-purple-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-gray-600 leading-relaxed">
                  Ongoing AI visibility tracking is available on Pro (weekly reports, <strong>£299/month</strong> — 3 of 50 early adopter spots taken).
                </p>
              </div>
              <div className="mt-8 text-center">
                <Link
                  href="/for-vendors#pricing"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold bg-purple-600 text-white hover:bg-purple-700 transition-all shadow-md"
                >
                  View Plans
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Who It's For */}
        <section className="py-20 lg:py-24 bg-[var(--surface)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--text)] mb-4">
                Who Uses Our AI Visibility Tool
              </h2>
              <p className="text-[var(--text2)] text-lg max-w-2xl mx-auto">
                Professional services businesses across the UK use TendorAI to get recommended by AI
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                { title: 'Solicitors', href: '/ai-visibility-for-solicitors', description: 'Conveyancing, family law, commercial \u2014 get recommended when clients ask AI for a solicitor.' },
                { title: 'Accountants', href: '/ai-visibility-for-accountants', description: 'Tax, audit, bookkeeping \u2014 appear in AI answers when businesses search for an accountant.' },
                { title: 'Mortgage Advisors', href: '/ai-visibility-for-mortgage-advisors', description: 'Residential, buy-to-let, remortgage \u2014 be the advisor AI recommends to homebuyers.' },
                { title: 'Estate Agents', href: '/ai-visibility-for-estate-agents', description: 'Sales, lettings, property management \u2014 get found when sellers ask AI for an estate agent.' },
              ].map((vertical) => (
                <Link
                  key={vertical.title}
                  href={vertical.href}
                  className="bg-white rounded-2xl p-6 border border-[var(--border)] hover:border-purple-200 hover:shadow-md transition-all group"
                >
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-[var(--purple-start)] transition-colors">
                    {vertical.title}
                  </h3>
                  <p className="text-sm text-gray-600">{vertical.description}</p>
                  <span className="inline-flex items-center text-sm font-medium text-[var(--purple-start)] mt-3">
                    Learn more
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 lg:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              AI Visibility Tool &mdash; FAQ
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
        <section id="pricing" className="bg-gray-900 py-16 lg:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Check Your AI Visibility &mdash; Free
            </h2>
            <p className="text-gray-400 mb-8 text-lg">
              See exactly what ChatGPT, Claude, and Perplexity say about your business. Takes 60 seconds. No signup required.
            </p>
            <Link
              href="/aeo-report"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:from-purple-600 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl text-lg"
            >
              Run Your Free AI Visibility Report
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
