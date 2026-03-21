import { Metadata } from 'next';
import Link from 'next/link';
import { CITIES } from '@/lib/constants/cities';

const SLUG = 'ai-visibility-for-accountants';

export const metadata: Metadata = {
  title:
    'When Someone Asks ChatGPT for an Accountant — Will They Find You? | TendorAI',
  description:
    'TendorAI helps UK accounting firms appear in AI assistant recommendations from ChatGPT, Gemini and Perplexity. Built using ICAEW, ACCA and Companies House data.',
  alternates: { canonical: `/${SLUG}` },
  openGraph: {
    title:
      'When Someone Asks ChatGPT for an Accountant — Will They Find You?',
    description:
      'Make your accounting practice visible to ChatGPT, Gemini and Perplexity. Built using verified ICAEW, ACCA and Companies House data.',
    type: 'website',
    url: `https://www.tendorai.com/${SLUG}`,
    images: [
      { url: '/logo.png', width: 873, height: 873, alt: 'TendorAI' },
    ],
  },
  twitter: {
    card: 'summary',
    title:
      'When Someone Asks ChatGPT for an Accountant — Will They Find You?',
    description:
      'Make your accounting practice visible to ChatGPT, Gemini and Perplexity. Built using verified ICAEW, ACCA and Companies House data.',
    images: ['/logo.png'],
  },
};

const howItWorks = [
  {
    step: '1',
    title: 'We build your verified profile from public data',
    description:
      'Your practice gets a profile built automatically from ICAEW, ACCA and Companies House data — services offered, office locations, contact details and regulatory registration. This creates the baseline entity data AI systems need to recognise and recommend your firm.',
  },
  {
    step: '2',
    title: 'You add your pricing and service areas',
    description:
      'Add your fee ranges, qualifications, specialist areas and the types of clients you work with. This is the structured data AI systems use to match your firm to specific client queries.',
  },
  {
    step: '3',
    title: 'AI assistants can recommend your practice by name',
    description:
      'Your completed profile becomes machine-readable across ChatGPT, Gemini, Perplexity and other AI platforms. When someone asks for an accountant in your area or specialism, your firm becomes eligible for recommendation.',
  },
];

const services = [
  'Tax Advisory',
  'Audit & Assurance',
  'Bookkeeping',
  'Payroll Services',
  'Corporate Finance',
  'Business Advisory',
  'VAT Services',
  'Financial Planning',
  'Startup Accounting',
  'Management Accounts',
  'R&D Tax Credits',
  'Self Assessment',
];

const whoForList = [
  'Small business accountants',
  'Startup and scale-up specialist accountants',
  'Local and regional accountancy practices',
  'Cloud accounting firms (Xero, QuickBooks specialists)',
  'Specialist tax advisers',
  'Management accountants',
  'R&D tax credit specialists',
];

const aiSources = [
  'Professional body registers (ICAEW, ACCA, CIMA)',
  'Companies House business records',
  'Structured website data and schema markup',
  'Business directories and local listings',
  'Client review platforms',
  'Verified business profiles',
];

const comparisonRows = [
  { seo: 'Ranking in Google search results', ai: 'Being recommended by AI assistants' },
  { seo: 'Website keyword optimisation', ai: 'Structured business data' },
  { seo: 'Backlinks and domain authority', ai: 'Entity recognition and verification' },
  { seo: 'Search result clicks', ai: 'Direct AI recommendations' },
  { seo: 'Google algorithm signals', ai: 'Machine-readable service information' },
];

const plans = [
  {
    name: 'Free',
    price: '£0',
    period: '/forever',
    popular: false,
    highlight: false,
    features: [
      { text: 'Basic company profile', included: true },
      { text: 'Listed in TendorAI directory', included: true },
      { text: 'ICAEW/ACCA verified data', included: true },
      { text: 'Visible to AI crawlers', included: true },
      { text: 'Pricing visible to AI', included: false },
      { text: 'AI mention tracking', included: false },
      { text: 'AI Visibility reports', included: false },
      { text: 'Priority ranking', included: false },
    ],
    cta: 'Claim Your Free Profile',
    ctaStyle: 'btn-secondary',
    href: 'https://www.tendorai.com/vendor-signup?tier=free',
  },
  {
    name: 'Pro',
    price: '£299',
    period: '/month',
    popular: true,
    highlight: true,
    features: [
      { text: 'AI-optimised structured data installed on your website', included: true },
      { text: 'Your website and TendorAI stay in sync automatically', included: true },
      { text: 'AI mention tracking', included: true },
      { text: 'Weekly AI visibility reports', included: true },
      { text: 'TendorAI Verified badge', included: true },
      { text: 'Google Business Profile optimisation checklist', included: true },
      { text: 'Unlimited service areas', included: true },
      { text: 'Priority support', included: true },
    ],
    cta: 'Start Pro',
    ctaStyle: 'btn-primary',
    href: 'https://www.tendorai.com/vendor-signup?tier=pro',
  },
];

const faqs = [
  {
    question: 'Can AI assistants really recommend my accounting firm?',
    answer:
      'Yes — but only if your firm appears in structured datasets AI systems can access. Most firms only have websites, which AI systems rarely use directly. TendorAI creates machine-readable profiles using verified ICAEW, ACCA and Companies House data, making your firm eligible for AI recommendations.',
  },
  {
    question: 'How is AI visibility different from SEO?',
    answer:
      'SEO helps your firm rank in Google search results. AI visibility helps your firm get recommended by AI assistants like ChatGPT and Gemini. These systems use entirely different signals and data sources. A firm can rank well on Google and still be completely invisible to AI recommendations.',
  },
  {
    question: 'How long does it take to appear in AI recommendations?',
    answer:
      'Most practices begin appearing in AI datasets within 2 to 8 weeks of claiming and completing their profile, depending on how quickly structured data is indexed by AI platforms.',
  },
  {
    question: 'Do I need technical knowledge to use TendorAI?',
    answer:
      'No. TendorAI handles all the technical work. On the Pro plan we install structured data code directly on your website automatically — no developer required.',
  },
  {
    question: 'What information does TendorAI use to build my profile?',
    answer:
      'We use publicly available data from ICAEW, ACCA and Companies House to create your baseline profile — including your registered name, address, contact details and professional body membership. You then add your services, pricing ranges and specialisms to complete it.',
  },
];

export default function Page() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'AI Visibility for Accountants',
    serviceType: 'AI Visibility Optimisation',
    description:
      'TendorAI helps UK accounting firms appear in AI assistant recommendations from ChatGPT, Gemini and Perplexity using verified ICAEW, ACCA and Companies House data.',
    provider: {
      '@type': 'Organization',
      name: 'TendorAI',
      url: 'https://www.tendorai.com',
    },
    areaServed: {
      '@type': 'Country',
      name: 'United Kingdom',
    },
    audience: {
      '@type': 'Audience',
      audienceType: 'Accountants and Accountancy Practices',
    },
    offers: [
      {
        '@type': 'Offer',
        name: 'Pro',
        price: '299',
        priceCurrency: 'GBP',
        billingIncrement: 'month',
        description:
          'AI-optimised structured data installed on your website with mention tracking and verified badge',
      },
    ],
  };

  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'TendorAI',
    url: 'https://www.tendorai.com',
    logo: 'https://www.tendorai.com/logo.png',
    description:
      'AI visibility platform helping UK professional services firms appear in AI assistant recommendations from ChatGPT, Gemini and Perplexity.',
    foundingDate: '2024',
    areaServed: 'United Kingdom',
    sameAs: [
      'https://www.linkedin.com/company/tendorai',
      'https://www.producthunt.com/products/tendorai',
    ],
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.tendorai.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'AI Visibility for Accountants',
        item: `https://www.tendorai.com/${SLUG}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <main className="pt-16">
        {/* Hero */}
        <section className="bg-brand-gradient text-white py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <span className="text-sm font-medium">
                12,000+ businesses already listed
              </span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              When Someone Asks ChatGPT for an Accountant — Will They Find You?
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto mb-6">
              Make your practice visible to ChatGPT, Gemini and Perplexity —
              the AI tools millions of business owners now use to find
              accountants directly, without ever visiting Google.
            </p>
            <p className="text-base text-white/70 max-w-2xl mx-auto mb-10">
              Over 100 million people use ChatGPT every week. A growing number
              are using it to find accountants directly — asking questions like
              &ldquo;who&rsquo;s the best accountant for a small business near
              me?&rdquo; and acting on the first answer they receive. If your
              practice isn&rsquo;t in the data sources AI systems rely on, it
              cannot be recommended.
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
          </div>
        </section>

        {/* Problem */}
        <section className="py-20 lg:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text)] mb-6">
              Why Most Accounting Firms Are Invisible to AI Assistants
            </h2>
            <div className="text-lg text-[var(--text2)] leading-relaxed space-y-4">
              <p>
                When a business owner asks ChatGPT or Gemini for an accountant,
                the AI doesn&rsquo;t search websites. It draws on structured
                datasets, professional directories, company registers and
                verified business profiles.
              </p>
              <p>
                Most accounting firms only have a website. AI assistants have no
                structured information to work with — so they recommend
                competitors who do.
              </p>
              <p>
                Firms with complete, machine-readable profiles are the ones
                being recommended by name. Firms without them are being skipped
                entirely.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 lg:py-24 bg-[var(--surface)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--text)] mb-4">
                How TendorAI Makes Your Practice Visible to AI
              </h2>
              <p className="text-[var(--text2)] text-lg max-w-2xl mx-auto">
                From invisible to AI-recommended in three steps
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {howItWorks.map((step) => (
                <div key={step.step} className="text-center">
                  <div className="w-12 h-12 rounded-full bg-purple-100 text-[var(--purple-start)] font-bold text-xl flex items-center justify-center mx-auto mb-4">
                    {step.step}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why AI Visibility Matters — with comparison table */}
        <section className="py-20 lg:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text)] mb-6 text-center">
              AI Search Is Changing How Clients Find Accountants
            </h2>
            <div className="text-lg text-[var(--text2)] leading-relaxed space-y-4 mb-12">
              <p>
                Traditional SEO was about ranking your website in Google search
                results. AI visibility is about something different — being
                recommended directly by AI assistants when potential clients ask
                for help.
              </p>
              <p>
                These are entirely separate systems with different data sources
                and different signals. A firm can rank well on Google and still
                be completely invisible to AI recommendations.
              </p>
              <p>
                The firms investing in AI visibility now are building an
                advantage that will compound over years — similar to the firms
                that invested in SEO in 2005 while competitors ignored it.
              </p>
            </div>

            {/* Comparison table */}
            <div className="rounded-xl border border-[var(--border)] overflow-hidden bg-white">
              <table className="w-full">
                <thead>
                  <tr className="bg-[var(--surface)]">
                    <th className="text-left py-3.5 px-5 text-sm font-semibold text-[var(--text2)]">
                      Traditional SEO
                    </th>
                    <th className="text-left py-3.5 px-5 text-sm font-semibold text-[var(--purple-start)]">
                      AI Visibility
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  {comparisonRows.map((row, i) => (
                    <tr key={i}>
                      <td className="py-3.5 px-5 text-sm text-[var(--text2)]">
                        {row.seo}
                      </td>
                      <td className="py-3.5 px-5 text-sm text-[var(--purple-start)] font-semibold">
                        {row.ai}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Services Covered */}
        <section className="py-20 lg:py-24 bg-[var(--surface)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--text)] mb-4">
                Accounting Services TendorAI Structures for AI Visibility
              </h2>
              <p className="text-[var(--text2)] text-lg max-w-2xl mx-auto">
                TendorAI structures your data across every service area so AI
                can recommend you for the right queries.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {services.map((service) => (
                <div
                  key={service}
                  className="bg-white rounded-xl p-4 border border-[var(--border)] text-center hover:border-purple-300 hover:shadow-sm transition-all"
                >
                  <span className="text-sm font-medium text-[var(--text)]">
                    {service}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Who This Is For */}
        <section className="py-20 lg:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text)] mb-4 text-center">
              Who TendorAI Is Built For
            </h2>
            <p className="text-lg text-[var(--text2)] text-center mb-8">
              TendorAI is built specifically for UK accounting firms that want
              to appear in AI assistant recommendations.
            </p>
            <ul className="space-y-3 max-w-xl mx-auto">
              {whoForList.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-[var(--purple-start)] mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-[var(--text2)]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* How AI Finds Accountants */}
        <section className="py-20 lg:py-24 bg-[var(--surface)]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text)] mb-6 text-center">
              How AI Assistants Find and Recommend Accountants
            </h2>
            <p className="text-lg text-[var(--text2)] leading-relaxed mb-6">
              When someone asks ChatGPT, Gemini or Perplexity to recommend an
              accountant, the AI draws on multiple structured sources to build
              its answer:
            </p>
            <ul className="space-y-3 mb-6">
              {aiSources.map((source) => (
                <li key={source} className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-[var(--purple-start)] mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-[var(--text2)]">{source}</span>
                </li>
              ))}
            </ul>
            <p className="text-lg text-[var(--text2)] leading-relaxed mb-4">
              If your firm appears consistently across these sources with
              accurate, machine-readable information, AI systems can recommend
              you with confidence. If those signals are weak or missing, your
              firm is passed over regardless of how good your service is.
            </p>
            <p className="text-lg text-[var(--text2)] leading-relaxed">
              TendorAI ensures your practice appears in these sources with the
              structured data AI systems require — using verified ICAEW, ACCA
              and Companies House records as the foundation.
            </p>
          </div>
        </section>

        {/* Pricing */}
        <section
          id="pricing"
          aria-label="pricing"
          className="py-20 md:py-24 bg-[var(--surface)]"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="section-header">
              <h2>Simple, Transparent Pricing</h2>
              <p>
                Start free. Upgrade when AI should be recommending you first.
              </p>
            </div>

            <div className="grid md:grid-cols-2 max-w-3xl mx-auto gap-0 border border-[var(--border)] rounded-2xl overflow-hidden bg-white mb-16">
              {plans.map((plan, i) => (
                <div
                  key={plan.name}
                  className={`relative p-7 ${i > 0 ? 'border-t lg:border-t-0 lg:border-l border-[var(--border)]' : ''} ${plan.highlight ? 'bg-[#f8f6fd]' : ''}`}
                >
                  {plan.popular && (
                    <div
                      className="absolute -top-0 left-0 right-0 text-white text-center py-1.5 text-xs font-bold uppercase tracking-wider"
                      style={{
                        background:
                          'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      }}
                    >
                      Most Popular
                    </div>
                  )}

                  <div className={plan.popular ? 'pt-6' : ''}>
                    <h3 className="font-serif text-lg font-semibold text-[var(--text)] mb-3">
                      {plan.name}
                    </h3>

                    {plan.popular && (
                      <div className="mb-0.5">
                        <s className="text-sm text-gray-400 font-semibold">£599/month</s>
                      </div>
                    )}
                    <div className="mb-0.5">
                      <span className="text-3xl font-bold text-[var(--text)]">
                        {plan.price}
                      </span>
                      <span className="text-[var(--text2)] text-sm">
                        {plan.period}
                      </span>
                      {plan.popular && <span className="ml-2 text-xs font-semibold text-purple-600">3 of 50 spots taken</span>}
                    </div>
                    {plan.popular && (
                      <p className="text-[10px] text-gray-400 italic">The first 50 firms lock in at &pound;299/month forever. 3 spots taken &mdash; 47 remaining.</p>
                    )}

                    <ul className="space-y-2.5 mb-7 mt-5">
                      {plan.features.map((f, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm">
                          {f.included ? (
                            <svg
                              className="w-4 h-4 text-[var(--purple-start)] mt-0.5 flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          ) : (
                            <span className="w-4 h-4 mt-0.5 flex-shrink-0 text-center text-gray-300 text-xs leading-4">
                              &mdash;
                            </span>
                          )}
                          <span
                            className={
                              f.included
                                ? 'text-[var(--text)]'
                                : 'text-gray-400'
                            }
                          >
                            {f.text}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={plan.href}
                      className={`${plan.ctaStyle} block text-center w-full`}
                    >
                      {plan.cta}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-gray-900 py-16 lg:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Check Whether AI Is Recommending Your Accounting Firm
            </h2>
            <p className="text-gray-400 mb-8 text-lg">
              Run a free AI Visibility Report to see whether your practice
              currently appears in ChatGPT, Gemini, Perplexity and three other
              AI platforms — and the exact gaps preventing you from being
              recommended.
            </p>
            <Link
              href="/aeo-report"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:from-purple-600 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl text-lg"
            >
              Run Your Free AI Visibility Report
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
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="border-b border-[var(--border)] pb-6 last:border-0"
                >
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* City Links */}
        <section className="py-16 bg-white border-t border-[var(--border)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--text)] mb-8 text-center">
              AI Visibility for Accountants by City
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 max-w-5xl mx-auto">
              {CITIES.map((city) => (
                <Link
                  key={city.slug}
                  href={`/${SLUG}/${city.slug}`}
                  className="text-sm text-[var(--text2)] hover:text-purple-600 hover:bg-purple-50 rounded-lg px-3 py-2 transition-colors text-center"
                >
                  Accountants in {city.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
