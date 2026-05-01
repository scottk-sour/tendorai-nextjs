import { Suspense } from 'react';
import { Metadata } from 'next';
import Hero from './components/landing/Hero';
import ProblemSection from './components/landing/ProblemSection';
import Features from './components/landing/Features';
import TrustBar from './components/landing/TrustBar';
import SectorBenefits from './components/landing/SectorBenefits';
import ConversationDemo from './components/landing/ConversationDemo';
import AiTestimonials from './components/landing/AiTestimonials';
import CustomerTestimonial from './components/landing/CustomerTestimonial';
import Pricing from './components/landing/Pricing';
import FinalCTA from './components/landing/FinalCTA';
import ProofSection from './components/homepage/ProofSection';
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

// HowTo schema — matches the 4 steps in Features.tsx
const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Get Your Business Recommended by AI',
  description: 'Four steps from invisible to AI-recommended',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Check Your AI Visibility', text: 'Your firm is already in our system — built from SRA, ICAEW, or FCA register data. Run a free AI Visibility report to see what ChatGPT, Claude, and Perplexity currently say about your business. Takes 60 seconds.' },
    { '@type': 'HowToStep', position: 2, name: 'Claim and Complete Your Profile', text: 'Add your fees, specialisms, accreditations, and services through a simple dashboard. This is the structured data AI needs to recommend you by name — not just mention you generically. 12,793 verified UK firms across SRA, ICAEW, and FCA registers.' },
    { '@type': 'HowToStep', position: 3, name: 'We Install AI Data on Your Website', text: 'Pro only — we log into your website and install schema markup using your dashboard data. You give us the login. We handle everything. No developer needed. Live within 48 hours.' },
    { '@type': 'HowToStep', position: 4, name: 'One Update. Everywhere in Sync.', text: 'Every time you update your dashboard, your TendorAI directory profile and your website schema update simultaneously. AI platforms crawl both. You do nothing technical. Ever.' },
  ],
};

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      <main>
        {/* Hero */}
        <Hero totalVendors={totalVendorCount} />

        {/* Problem — Cost comparison cards */}
        <ProblemSection />

        {/* How TendorAI Works — 4 steps */}
        <Features />

        {/* Trust Bar — verified UK data sources */}
        <TrustBar />

        {/* Sector Benefits — 4 vertical cards */}
        <SectorBenefits />

        {/* Conversation Demo */}
        <ConversationDemo />

        {/* Customer Testimonial — verified Google review from Nathan / Ascari Office Ltd */}
        <CustomerTestimonial />

        {/* What AI Platforms Say */}
        <AiTestimonials />

        {/* Proof — TendorAI's own AI visibility stats */}
        <Suspense fallback={<div className="py-8" />}>
          <ProofSection />
        </Suspense>

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
