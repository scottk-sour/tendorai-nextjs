import { Suspense } from 'react';
import { Metadata } from 'next';
import Hero from './components/landing/Hero';
import ProblemSection from './components/landing/ProblemSection';
import TrustBar from './components/landing/TrustBar';
import SectorBenefits from './components/landing/SectorBenefits';
import ConversationDemo from './components/landing/ConversationDemo';
import AiTestimonials from './components/landing/AiTestimonials';
import CustomerTestimonial from './components/landing/CustomerTestimonial';
import Pricing from './components/landing/Pricing';
import FinalCTA from './components/landing/FinalCTA';

export const revalidate = 3600; // Revalidate every hour

const newDescription = "TendorAI is an AI visibility platform for UK solicitors, accountants and mortgage advisers. Free AI visibility report \u2014 30-second results.";

export const metadata: Metadata = {
  title: { absolute: "TendorAI \u2014 AI Visibility for UK Professional Services" },
  description: newDescription,
  keywords: 'AI visibility platform UK, get recommended by ChatGPT, AI visibility for solicitors, AI visibility for accountants, AI visibility for mortgage advisors, AI visibility for estate agents, AI visibility for office equipment suppliers, AI visibility for B2B firms, structured data profiles, AI Visibility AEO audit, AI Visibility AEO report, free AI Visibility AEO score',
  alternates: {
    canonical: 'https://www.tendorai.com',
  },
  openGraph: {
    type: 'website',
    url: 'https://www.tendorai.com/',
    title: "TendorAI \u2014 AI Visibility for UK Professional Services",
    description: newDescription,
    siteName: 'TendorAI',
    locale: 'en_GB',
    images: [{ url: '/logo.png', width: 873, height: 873, alt: "TendorAI \u2014 AI Visibility for UK Professional Services" }],
  },
  twitter: {
    card: 'summary',
    title: "TendorAI \u2014 AI Visibility for UK Professional Services",
    description: newDescription,
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    'geo.region': 'GB-WLS',
    'geo.placename': 'Cardiff, Wales',
    'geo.position': '51.4816;-3.1791',
  },
};

// Organization and LocalBusiness schemas are in layout.tsx — not duplicated here

// WebPage schema — homepage-specific dates
const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://www.tendorai.com/#webpage',
  name: "TendorAI \u2014 AI Visibility for UK Professional Services",
  url: 'https://www.tendorai.com/',
  datePublished: '2024-01-01',
  dateModified: new Date().toISOString().split('T')[0],
  description: "The UK's AI Visibility Platform for professional services. Free AI Visibility reports for solicitors, accountants, mortgage advisors and estate agents.",
};

// SoftwareApplication schema — the canonical TendorAI product entity. Mirrors
// the offer and description used on /ai-visibility-platform.
const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'TendorAI',
  applicationCategory: 'BusinessApplication',
  applicationSubCategory: 'AI Visibility Platform',
  description:
    'UK AI visibility platform for regulated professional services firms. A six-agent autonomous fleet measures, diagnoses, and fixes AI visibility across ChatGPT, Perplexity, Claude, Gemini, Grok, and Google AI Overviews. 63,406 UK firms indexed from SRA, ICAEW, FCA, Propertymark, and Companies House.',
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

// HowTo schema for the Loop now lives in app/components/landing/Hero.tsx alongside the visible content.

export default function HomePage() {
  return (
    <>
      {/* JSON-LD schemas (Organization + LocalBusiness are in layout.tsx) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
      />

      <main>
        {/* Hero — includes the canonical definition + Five-Stage Loop */}
        <Hero />

        {/* Problem — Cost comparison cards */}
        <ProblemSection />

        {/* Trust Bar — verified UK data sources */}
        <TrustBar />

        {/* Sector Benefits — vertical cards */}
        <SectorBenefits />

        {/* Conversation Demo */}
        <ConversationDemo />

        {/* Case study — TendorAI's own Searchable.com proof */}
        <CustomerTestimonial />

        {/* What AI Platforms Say */}
        <AiTestimonials />

        {/* Pricing */}
        <Suspense fallback={<div className="py-8" />}>
          <Pricing />
        </Suspense>

        {/* Final CTA */}
        <Suspense fallback={<div className="py-8" />}>
          <FinalCTA />
        </Suspense>
      </main>
    </>
  );
}
