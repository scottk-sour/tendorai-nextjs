import { Metadata } from 'next';
import Link from 'next/link';
import HomepageHero from './components/landing/HomepageHero';
import ConversationDemo from './components/landing/ConversationDemo';
import FinalCTA from './components/landing/FinalCTA';

export const revalidate = 3600; // Revalidate every hour

const newDescription =
  'TendorAI helps UK solicitors, accountants, mortgage advisers and estate agents become easier for ChatGPT, Claude, Gemini, Perplexity and Google AI to understand, trust and recommend.';

export const metadata: Metadata = {
  title: { absolute: 'TendorAI — AI Visibility for UK Professional Services' },
  description: newDescription,
  alternates: { canonical: 'https://www.tendorai.com' },
  openGraph: {
    type: 'website',
    url: 'https://www.tendorai.com/',
    title: 'TendorAI — AI Visibility for UK Professional Services',
    description: newDescription,
    siteName: 'TendorAI',
    locale: 'en_GB',
    images: [{ url: '/logo.png', width: 873, height: 873, alt: 'TendorAI — AI Visibility for UK Professional Services' }],
  },
  twitter: {
    card: 'summary',
    title: 'TendorAI — AI Visibility for UK Professional Services',
    description: newDescription,
    images: ['/logo.png'],
  },
  robots: { index: true, follow: true },
  other: {
    'geo.region': 'GB-WLS',
    'geo.placename': 'Cardiff, Wales',
    'geo.position': '51.4816;-3.1791',
  },
};

// Organization and LocalBusiness schemas are in layout.tsx — not duplicated here.

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://www.tendorai.com/#webpage',
  name: 'TendorAI — AI Visibility for UK Professional Services',
  url: 'https://www.tendorai.com/',
  datePublished: '2024-01-01',
  dateModified: new Date().toISOString().split('T')[0],
  description: newDescription,
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'TendorAI',
  applicationCategory: 'BusinessApplication',
  applicationSubCategory: 'AI Visibility',
  description: newDescription,
  operatingSystem: 'Web',
  url: 'https://www.tendorai.com',
  offers: {
    '@type': 'Offer',
    price: '299',
    priceCurrency: 'GBP',
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: '299',
      priceCurrency: 'GBP',
      billingDuration: 'P1M',
    },
  },
  provider: {
    '@type': 'Organization',
    name: 'TendorAI Ltd',
    url: 'https://www.tendorai.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Cwmbran',
      addressRegion: 'Wales',
      addressCountry: 'GB',
    },
    identifier: '16521860',
  },
};

const THREE_STEPS = [
  {
    title: 'See where AI mentions you',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
  {
    title: 'Fix the missing trust signals',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: 'Get recommended by name',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
      </svg>
    ),
  },
];

const WHAT_TENDORAI_DOES = [
  'Builds your AI-readable firm profile',
  'Adds schema and structured data',
  'Creates AI-citable content',
  'Tracks visibility against competitors',
  'Sends weekly improvement reports',
];

const VERTICALS = [
  {
    title: 'Solicitors',
    href: '/ai-visibility-for-solicitors',
    iconBg: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    ),
  },
  {
    title: 'Accountants',
    href: '/ai-visibility-for-accountants',
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'Mortgage advisers',
    href: '/ai-visibility-for-mortgage-advisors',
    iconBg: 'bg-sky-50',
    iconColor: 'text-sky-600',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    title: 'Estate agents',
    href: '/ai-visibility-for-estate-agents',
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
];

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
      />

      <main>
        {/* 1. HERO */}
        <HomepageHero />

        {/* 2. THREE STEPS */}
        <section aria-label="three steps" className="py-16 md:py-20 bg-[var(--surface,#f8fafc)]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <ol className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {THREE_STEPS.map((step, i) => (
                <li
                  key={step.title}
                  className="bg-white rounded-2xl border border-[var(--border,#e5e7eb)] p-6 flex items-start gap-4"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center">
                    {step.icon}
                  </div>
                  <div>
                    <p className="font-serif text-xs font-bold uppercase tracking-wide text-purple-600 mb-1">
                      Step {i + 1}
                    </p>
                    <p className="font-semibold text-[var(--text)] leading-snug">
                      {step.title}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 3. SHOW THE OUTCOME — reuse the existing AI-recommendation demo */}
        <ConversationDemo />
        <p className="text-center text-sm text-[var(--text2)] italic max-w-2xl mx-auto px-4 -mt-12 mb-20">
          This is the result TendorAI is built to improve.
        </p>

        {/* 4. WHAT TENDORAI DOES */}
        <section aria-label="what tendorai does" className="py-16 md:py-20 bg-[var(--surface,#f8fafc)]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-[var(--text)] text-center mb-10 leading-tight">
              What TendorAI does
            </h2>
            <ul className="space-y-3">
              {WHAT_TENDORAI_DOES.map((line) => (
                <li
                  key={line}
                  className="flex items-start gap-3 bg-white rounded-xl border border-[var(--border,#e5e7eb)] px-5 py-4"
                >
                  <svg
                    className="w-5 h-5 mt-0.5 text-purple-600 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[var(--text)] font-medium">{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 5. PRICE CONTRAST */}
        <section aria-label="price contrast" className="py-16 md:py-20 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="font-serif text-xl md:text-2xl lg:text-3xl font-bold text-[var(--text)] leading-snug">
              Agencies charge{' '}
              <span className="gradient-text not-italic">£1,500–£8,000/month</span>{' '}
              for AI visibility work. TendorAI gives regulated firms the core
              infrastructure from{' '}
              <span className="gradient-text not-italic">£299/month</span>.
            </p>
          </div>
        </section>

        {/* 6. WHO IT'S FOR — four verticals linking to existing Industries pages */}
        <section aria-label="who it's for" className="py-16 md:py-20 bg-[var(--surface,#f8fafc)]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-[var(--text)] text-center mb-10 leading-tight">
              Who it&apos;s for
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {VERTICALS.map((v) => (
                <Link
                  key={v.title}
                  href={v.href}
                  className="group bg-white rounded-2xl border border-[var(--border,#e5e7eb)] p-5 sm:p-6 flex flex-col items-start gap-3 hover:border-purple-300 hover:shadow-md transition-[border-color,box-shadow]"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${v.iconBg} ${v.iconColor}`}
                  >
                    {v.icon}
                  </div>
                  <h3 className="font-serif text-base sm:text-lg font-semibold text-[var(--text)] leading-snug">
                    {v.title}
                  </h3>
                  <span className="text-sm font-medium text-purple-600 group-hover:text-purple-700">
                    See what we do →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 7. FINAL CTA BAND */}
        <FinalCTA />
      </main>
    </>
  );
}
