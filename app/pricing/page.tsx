import type { Metadata } from 'next';
import Link from 'next/link';
import Pricing from '@/app/components/landing/Pricing';

const CANONICAL = 'https://www.tendorai.com/pricing';
const TITLE = 'Pricing | TendorAI';
const DESCRIPTION =
  "TendorAI pricing for UK regulated firms. Free profile forever, or Pro at £299/month for weekly AI visibility monitoring and done-for-you fixes across ChatGPT, Perplexity, Claude, Gemini and Google AI Overviews. Month-to-month, cancel anytime.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: CANONICAL },
  robots: { index: true, follow: true },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: CANONICAL,
    siteName: 'TendorAI',
    locale: 'en_GB',
    type: 'website',
    images: [{ url: '/logo.png', width: 873, height: 873, alt: 'TendorAI pricing' }],
  },
  twitter: {
    card: 'summary',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/logo.png'],
  },
};

// Product / Offer JSON-LD carries the £299 figure in machine-readable form
// alongside the visible price rendered by the <Pricing /> component.
const productJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'TendorAI Pro',
  description:
    'Weekly AI visibility monitoring and done-for-you fixes for UK regulated firms — solicitors, accountants, mortgage advisers and estate agents. Installs schema markup on your website, tracks citations across ChatGPT, Perplexity, Claude, Gemini and Google AI Overviews, and publishes AI-optimised content.',
  brand: { '@type': 'Organization', name: 'TendorAI' },
  offers: [
    {
      '@type': 'Offer',
      name: 'Free',
      price: '0',
      priceCurrency: 'GBP',
      url: 'https://www.tendorai.com/vendor-signup?plan=free',
      availability: 'https://schema.org/InStock',
    },
    {
      '@type': 'Offer',
      name: 'Pro',
      price: '299',
      priceCurrency: 'GBP',
      url: 'https://www.tendorai.com/vendor-signup?plan=pro',
      availability: 'https://schema.org/InStock',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: '299',
        priceCurrency: 'GBP',
        billingDuration: 'P1M',
        billingIncrement: 1,
        unitCode: 'MON',
      },
    },
  ],
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.tendorai.com' },
    { '@type': 'ListItem', position: 2, name: 'Pricing', item: CANONICAL },
  ],
};

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Hero — server-rendered, £299 present in the initial HTML so
          crawlers see the primary price without waiting for anything. */}
      <section className="bg-brand-gradient text-white pt-24 pb-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <nav className="text-sm mb-6 text-purple-200">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Pricing</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
            Simple, transparent pricing
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Free profile forever, or Pro at <strong>&pound;299/month</strong> for weekly AI
            visibility monitoring and done-for-you fixes. Month-to-month, cancel anytime.
          </p>
        </div>
      </section>

      {/* Full pricing table — shared component, single source of truth. */}
      <Pricing />
    </>
  );
}
