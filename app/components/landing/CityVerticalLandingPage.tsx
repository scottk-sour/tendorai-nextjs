import Link from 'next/link';
import Pricing from './Pricing';
import { VerticalConfig } from '@/lib/constants/verticals';
import { CityConfig, CITIES } from '@/lib/constants/cities';

export interface CityStats {
  city: string;
  vendorType: string;
  count: number;
  claimedCount: number;
  paidCount: number;
  averageScore: number | null;
}

interface Props {
  config: VerticalConfig;
  city: CityConfig;
  stats: CityStats | null;
}

export default function CityVerticalLandingPage({ config, city, stats }: Props) {
  const faqItems = [
    {
      question: `How many ${config.name.toLowerCase()} in ${city.name} are on TendorAI?`,
      answer: stats && stats.count > 0
        ? `We\u2019ve profiled ${stats.count} ${config.name.toLowerCase()} firms in ${city.name} using ${config.regulatoryBody} data. ${stats.claimedCount} have claimed their profiles so far.`
        : `We\u2019re building our ${config.name.toLowerCase()} database in ${city.name}. Run a free report to be one of the first.`,
    },
    {
      question: `Is AI visibility important for ${config.name.toLowerCase()} in ${city.name}?`,
      answer: `Yes \u2014 when potential clients in ${city.name} ask ChatGPT or Perplexity for a ${config.nameSingular}, AI recommends 2\u20133 firms by name. If your firm isn\u2019t visible, those enquiries go to competitors who are.`,
    },
    ...config.faqs.slice(1, 4),
  ];

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  const webPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `https://www.tendorai.com/${config.slug}/${city.slug}`,
    name: `AI Visibility for ${config.name} in ${city.name}`,
    description: `AI visibility for ${config.name.toLowerCase()} in ${city.name}. Check your firm\u2019s AI Visibility score for free.`,
    url: `https://www.tendorai.com/${config.slug}/${city.slug}`,
    datePublished: '2024-01-01',
    dateModified: new Date().toISOString().split('T')[0],
    publisher: {
      '@type': 'Organization',
      name: 'TendorAI',
      url: 'https://www.tendorai.com',
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.tendorai.com' },
        { '@type': 'ListItem', position: 2, name: `AI Visibility for ${config.name}`, item: `https://www.tendorai.com/${config.slug}` },
        { '@type': 'ListItem', position: 3, name: city.name, item: `https://www.tendorai.com/${config.slug}/${city.slug}` },
      ],
    },
    about: {
      '@type': 'LocalBusiness',
      name: `${config.name} in ${city.name}`,
      address: {
        '@type': 'PostalAddress',
        addressLocality: city.name,
        addressRegion: city.region,
        addressCountry: 'GB',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: city.lat,
        longitude: city.lng,
      },
    },
  };

  return (
    <main className="pt-16">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />

      {/* Breadcrumb */}
      <nav className="bg-[var(--surface)] border-b border-[var(--border)]" aria-label="Breadcrumb">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <ol className="flex items-center gap-2 text-sm text-[var(--text2)]">
            <li><Link href="/" className="hover:text-purple-600 transition-colors">Home</Link></li>
            <li><span className="mx-1">/</span></li>
            <li><Link href={`/${config.slug}`} className="hover:text-purple-600 transition-colors">AI Visibility for {config.name}</Link></li>
            <li><span className="mx-1">/</span></li>
            <li className="text-[var(--text)] font-medium">{city.name}</li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-brand-gradient text-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {stats && stats.count > 0 && (
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <span className="text-sm font-medium">{stats.count} {config.name.toLowerCase()} profiled in {city.name}</span>
            </div>
          )}
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Is AI Recommending {config.name} in {city.name}?
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10">
            When someone in {city.name} asks ChatGPT for a {config.nameSingular}, AI recommends 2&ndash;3 firms by name. We checked &mdash; most {city.name} firms don&apos;t appear.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/ai-visibility-report"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold bg-white text-[var(--purple-start)] hover:bg-purple-50 transition-all shadow-lg text-lg"
            >
              Check Your {city.name} AI Visibility Score &mdash; Free
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

      {/* The Local Problem */}
      <section className="py-20 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text)] mb-6">
            {city.name} {config.name} and AI: The Numbers
          </h2>
          {stats && stats.count > 0 ? (
            <p className="text-lg text-[var(--text2)] leading-relaxed">
              TendorAI has profiled {stats.count} {config.name.toLowerCase()} firms in the {city.name} area using {config.regulatoryBody} data.
              {stats.averageScore !== null && (
                <> The average AI Visibility score is {stats.averageScore} out of 100. Top-performing firms score 70+. Most score under 30 &mdash; meaning AI doesn&apos;t recommend them at all.</>
              )}
            </p>
          ) : (
            <p className="text-lg text-[var(--text2)] leading-relaxed">
              We&apos;re building our {config.name.toLowerCase()} database in {city.name}. Run a free report to be one of the first firms profiled &mdash; and see exactly what AI says about your business.
            </p>
          )}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 lg:py-24 bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text)] mb-4">
              How It Works
            </h2>
            <p className="text-[var(--text2)] text-lg max-w-2xl mx-auto">
              From invisible to AI-recommended in three steps
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-purple-100 text-[var(--purple-start)] font-bold text-xl flex items-center justify-center mx-auto mb-4">1</div>
              <h3 className="font-semibold text-gray-900 mb-2">{config.howItWorks[0].title}</h3>
              <p className="text-sm text-gray-600">
                {stats && stats.count > 0
                  ? `Your firm is already on TendorAI \u2014 we\u2019ve profiled ${stats.count} ${config.name.toLowerCase()} in ${city.name} from ${config.regulatoryBody} data.`
                  : config.howItWorks[0].description}
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-purple-100 text-[var(--purple-start)] font-bold text-xl flex items-center justify-center mx-auto mb-4">2</div>
              <h3 className="font-semibold text-gray-900 mb-2">{config.howItWorks[1].title}</h3>
              <p className="text-sm text-gray-600">{config.howItWorks[1].description}</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-purple-100 text-[var(--purple-start)] font-bold text-xl flex items-center justify-center mx-auto mb-4">3</div>
              <h3 className="font-semibold text-gray-900 mb-2">{config.howItWorks[2].title}</h3>
              <p className="text-sm text-gray-600">
                When someone asks &ldquo;find me a {config.nameSingular} in {city.name}&rdquo;, AI recommends your firm by name.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why AI Visibility Matters Now */}
      <section className="py-20 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text)] mb-6 text-center">
            Why AI Visibility Matters Now
          </h2>
          <p className="text-lg text-[var(--text2)] leading-relaxed">
            {config.seoVsAi}
          </p>
        </div>
      </section>

      {/* Services Covered */}
      <section className="py-20 lg:py-24 bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text)] mb-4">
              Services We Cover for {config.name}
            </h2>
            <p className="text-[var(--text2)] text-lg max-w-2xl mx-auto">
              TendorAI structures your data across every service area so AI can recommend you for the right queries.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {config.services.map((service) => (
              <Link
                key={service.slug}
                href={`/suppliers/${service.slug}`}
                className="bg-white rounded-xl p-4 border border-[var(--border)] text-center hover:border-purple-300 hover:shadow-sm transition-all"
              >
                <span className="text-sm font-medium text-[var(--text)]">{service.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Local Competitor Context */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--text)] mb-6">
            {config.name} Already on TendorAI in {city.name}
          </h2>
          {stats && stats.count > 0 ? (
            <>
              <div className="flex flex-wrap justify-center gap-8 mb-6">
                <div>
                  <span className="text-3xl font-bold text-[var(--text)]">{stats.count}</span>
                  <p className="text-sm text-[var(--text2)]">Firms profiled</p>
                </div>
                <div>
                  <span className="text-3xl font-bold text-purple-600">{stats.claimedCount}</span>
                  <p className="text-sm text-[var(--text2)]">Claimed profiles</p>
                </div>
                <div>
                  <span className="text-3xl font-bold text-orange-500">{stats.paidCount}</span>
                  <p className="text-sm text-[var(--text2)]">On paid plans</p>
                </div>
              </div>
              <p className="text-[var(--text2)] leading-relaxed">
                Your competitors may already be optimising their AI visibility. Don&apos;t let them get ahead.
              </p>
            </>
          ) : (
            <p className="text-[var(--text2)] leading-relaxed">
              We&apos;re building our {config.name.toLowerCase()} directory in {city.name}. Claim your profile now to be first.
            </p>
          )}
        </div>
      </section>

      {/* Pricing */}
      <div id="pricing">
        <div className="text-center pt-20 pb-4 bg-[var(--surface)]">
          {stats && stats.count > 0 ? (
            <p className="text-[var(--text2)] text-lg">
              Join {stats.count} {config.name.toLowerCase()} firms in {city.name} already on TendorAI.
            </p>
          ) : (
            <p className="text-[var(--text2)] text-lg">
              Get your {city.name} {config.nameSingular} firm on TendorAI today.
            </p>
          )}
        </div>
        <Pricing />
      </div>

      {/* Final CTA */}
      <section className="bg-gray-900 py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Run Your Free AI Visibility Report for {city.name}
          </h2>
          <p className="text-gray-400 mb-8 text-lg">
            See what AI knows about your {config.nameSingular} firm in {city.name} &mdash; and what it doesn&apos;t.
          </p>
          <Link
            href="/ai-visibility-report"
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:from-purple-600 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl text-lg"
          >
            Check Your AI Visibility &mdash; Free
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
            {faqItems.map((faq, i) => (
              <div key={i} className="border-b border-[var(--border)] pb-6 last:border-0">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
