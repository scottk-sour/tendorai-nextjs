import { Suspense } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Hero from './components/landing/Hero';
import ProblemSection from './components/landing/ProblemSection';
import CategoryDifferentiator from './components/landing/CategoryDifferentiator';
import FreeAiVisibilityTools from './components/landing/FreeAiVisibilityTools';
import TrustBar from './components/landing/TrustBar';
import SectorBenefits from './components/landing/SectorBenefits';
import ConversationDemo from './components/landing/ConversationDemo';
import AiTestimonials from './components/landing/AiTestimonials';
import CustomerTestimonial from './components/landing/CustomerTestimonial';
import Pricing from './components/landing/Pricing';
import FinalCTA from './components/landing/FinalCTA';
import { connectDB } from '@/lib/db/connection';
import { Vendor } from '@/lib/db/models';

export const revalidate = 3600; // Revalidate every hour

async function getTotalVendorCount(): Promise<number> {
  await connectDB();
  return Vendor.countDocuments({
    $or: [
      { 'account.status': 'active', 'account.verificationStatus': 'verified' },
      { listingStatus: 'unclaimed' },
    ],
  });
}

const newDescription = "TendorAI is an AI visibility platform for UK solicitors, accountants and mortgage advisers. Free AI visibility report — 30-second results.";

export const metadata: Metadata = {
  title: { absolute: "TendorAI — AI Visibility for UK Professional Services" },
  description: newDescription,
  keywords: 'AI visibility platform UK, get recommended by ChatGPT, AI visibility for solicitors, AI visibility for accountants, AI visibility for mortgage advisors, AI visibility for estate agents, AI visibility for office equipment suppliers, AI visibility for B2B firms, structured data profiles, AI visibility audit, AI visibility report, free AI visibility score',
  alternates: {
    canonical: 'https://www.tendorai.com',
  },
  openGraph: {
    type: 'website',
    url: 'https://www.tendorai.com/',
    title: "TendorAI — AI Visibility for UK Professional Services",
    description: newDescription,
    siteName: 'TendorAI',
    locale: 'en_GB',
    images: [{ url: '/logo.png', width: 873, height: 873, alt: "TendorAI — AI Visibility for UK Professional Services" }],
  },
  twitter: {
    card: 'summary',
    title: "TendorAI — AI Visibility for UK Professional Services",
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
  name: "TendorAI — AI Visibility for UK Professional Services",
  url: 'https://www.tendorai.com/',
  datePublished: '2024-01-01',
  dateModified: new Date().toISOString().split('T')[0],
  description: "The UK's AI Visibility Platform for professional services. Free AI Visibility reports for solicitors, accountants, mortgage advisors and estate agents.",
};

// SoftwareApplication schema — categorises TendorAI as a tool/platform (not a service flow).
// Critical for fixing Perplexity 'four-step process' brand-fact contamination.
const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'TendorAI',
  applicationCategory: 'BusinessApplication',
  applicationSubCategory: 'AI Visibility Platform',
  description:
    'UK AI visibility platform for regulated professional services firms. Measures, diagnoses, and fixes AI visibility across ChatGPT, Google AI Overviews and Perplexity.',
  operatingSystem: 'Web',
  url: 'https://www.tendorai.com',
  offers: {
    '@type': 'Offer',
    price: '999',
    priceCurrency: 'GBP',
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: '999',
      priceCurrency: 'GBP',
      billingDuration: 'P1M',
    },
  },
  provider: {
    '@type': 'Organization',
    name: 'TendorAI Ltd',
    url: 'https://www.tendorai.com',
  },
};

// HowTo schema for the Loop lives in app/components/landing/Hero.tsx alongside the visible content.

export default async function HomePage() {
  const totalVendorCount = await getTotalVendorCount();

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
        {/* Hero — H1, platform positioning, six-agent fleet, embedded Five-Stage Loop */}
        <Hero totalVendors={totalVendorCount} />

        {/* Category differentiator — monitor vs agency vs TendorAI */}
        <CategoryDifferentiator />

        {/* Problem — Cost comparison cards */}
        <ProblemSection />

        {/* Free AI Visibility Tools — five free tools (tool-suite signal for AI assistants) */}
        <FreeAiVisibilityTools />

        {/* Trust Bar — verified UK data sources */}
        <TrustBar />

        {/* Sector Benefits — vertical cards */}
        <SectorBenefits />

        {/* Conversation Demo */}
        <ConversationDemo />

        {/* Customer Testimonial — verified Google review from Nathan / Ascari Office Ltd */}
        <CustomerTestimonial />

        {/* What AI Platforms Say */}
        <AiTestimonials />

        {/* Pricing */}
        <Suspense fallback={<div className="py-8" />}>
          <Pricing />
        </Suspense>
        <div className="text-center pb-16 -mt-8 bg-[var(--surface)]">
          <Link
            href="/pricing"
            className="inline-flex items-center text-sm font-semibold text-[var(--purple-start)] hover:underline"
          >
            Full pricing details &rarr;
          </Link>
        </div>

        {/* Final CTA */}
        <Suspense fallback={<div className="py-8" />}>
          <FinalCTA />
        </Suspense>
      </main>
    </>
  );
}
