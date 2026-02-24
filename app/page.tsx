import { Metadata } from 'next';
import Hero from './components/landing/Hero';
import ProblemSection from './components/landing/ProblemSection';
import AiShift from './components/landing/AiShift';
import Features from './components/landing/Features';
import SectorBenefits from './components/landing/SectorBenefits';
import AeoReportCTA from './components/landing/AeoReportCTA';
import ConversationDemo from './components/landing/ConversationDemo';
import AiTestimonials from './components/landing/AiTestimonials';
import SeoAeoGeo from './components/landing/SeoAeoGeo';
import Pricing from './components/landing/Pricing';
import Verticals from './components/landing/Verticals';
import ServiceCategories from './components/landing/ServiceCategories';
import FAQ from './components/landing/FAQ';
import FinalCTA from './components/landing/FinalCTA';
import { connectDB } from '@/lib/db/connection';
import { Vendor } from '@/lib/db/models';

export const revalidate = 3600; // Revalidate every hour

async function getCategoryCounts(): Promise<Record<string, number>> {
  await connectDB();

  const statusFilter = {
    $or: [
      { 'account.status': 'active', 'account.verificationStatus': 'verified' },
      { listingStatus: 'unclaimed' },
    ],
  };

  const [equipmentStats, solicitorStats, accountantCount, mortgageStats, estateStats] = await Promise.all([
    // Equipment: group by services field
    Vendor.aggregate([
      { $match: { ...statusFilter, vendorType: { $nin: ['solicitor', 'accountant', 'mortgage-advisor', 'estate-agent'] } } },
      { $unwind: '$services' },
      { $group: { _id: '$services', count: { $sum: 1 } } },
    ]),
    // Solicitors: group by practiceAreas
    Vendor.aggregate([
      { $match: { ...statusFilter, vendorType: 'solicitor' } },
      { $unwind: '$practiceAreas' },
      { $group: { _id: '$practiceAreas', count: { $sum: 1 } } },
    ]),
    // Accountants: total count (practiceAreas not populated yet)
    Vendor.countDocuments({ ...statusFilter, vendorType: 'accountant' }),
    // Mortgage advisors: group by practiceAreas
    Vendor.aggregate([
      { $match: { ...statusFilter, vendorType: 'mortgage-advisor' } },
      { $unwind: '$practiceAreas' },
      { $group: { _id: '$practiceAreas', count: { $sum: 1 } } },
    ]),
    // Estate agents: group by practiceAreas
    Vendor.aggregate([
      { $match: { ...statusFilter, vendorType: 'estate-agent' } },
      { $unwind: '$practiceAreas' },
      { $group: { _id: '$practiceAreas', count: { $sum: 1 } } },
    ]),
  ]);

  const counts: Record<string, number> = {};

  // Equipment
  equipmentStats.forEach((s: { _id: string; count: number }) => { counts[s._id] = s.count; });
  // Solicitors
  solicitorStats.forEach((s: { _id: string; count: number }) => { counts[s._id] = s.count; });
  // Accountants — apply total to each subcategory
  const accountantSubcategories = ['Tax Advisory', 'Audit & Assurance', 'Bookkeeping', 'Payroll', 'Corporate Finance', 'Business Advisory', 'VAT', 'Financial Planning'];
  accountantSubcategories.forEach((name) => { counts[name] = accountantCount; });
  // Mortgage advisors
  mortgageStats.forEach((s: { _id: string; count: number }) => { counts[s._id] = s.count; });
  // Estate agents
  estateStats.forEach((s: { _id: string; count: number }) => { counts[s._id] = s.count; });

  return counts;
}

async function getTotalVendorCount(): Promise<number> {
  await connectDB();
  return Vendor.countDocuments({
    $or: [
      { 'account.status': 'active', 'account.verificationStatus': 'verified' },
      { listingStatus: 'unclaimed' },
    ],
  });
}

const newDescription = "Check if AI recommends your business. Free AEO reports for UK solicitors, accountants, mortgage advisors & estate agents.";

export const metadata: Metadata = {
  title: { absolute: "TendorAI \u2014 AI Visibility for UK Businesses" },
  description: newDescription,
  keywords: 'AI visibility platform UK, get recommended by ChatGPT, AI visibility for solicitors, AI visibility for accountants, AI visibility for mortgage advisors, AI visibility for estate agents, structured data profiles, GEO audit, AEO report, free AEO score',
  alternates: {
    canonical: 'https://www.tendorai.com',
  },
  openGraph: {
    type: 'website',
    url: 'https://www.tendorai.com/',
    title: "TendorAI \u2014 AI Visibility for UK Businesses",
    description: newDescription,
    siteName: 'TendorAI',
    locale: 'en_GB',
    images: [{ url: '/logo.png', width: 575, height: 283, alt: 'TendorAI - AI Visibility for UK Businesses' }],
  },
  twitter: {
    card: 'summary',
    title: "TendorAI \u2014 AI Visibility for UK Businesses",
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

// WebPage schema — homepage-specific dates
const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'TendorAI — AI Visibility for UK Businesses',
  url: 'https://www.tendorai.com/',
  datePublished: '2024-01-01',
  dateModified: '2026-02-24',
  description: 'Check if AI recommends your business. Free AEO reports for UK solicitors, accountants, mortgage advisors & estate agents.',
};

// HowTo schema — matches the 4 steps in Features.tsx
const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Get Your Business Recommended by AI',
  description: 'Four steps from invisible to AI-recommended',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Check Your AI Visibility', text: 'Run a free AEO report to see what ChatGPT, Claude, and Perplexity say about your business. Get your AI visibility score in 60 seconds.' },
    { '@type': 'HowToStep', position: 2, name: 'Claim Your Profile', text: 'Add your services, fees, accreditations, and specialisms. This is the data AI needs to recommend you ahead of competitors.' },
    { '@type': 'HowToStep', position: 3, name: 'We Install AI Data on Your Website', text: "Pro only — we log into your website and install a small piece of code that makes your business readable to AI. You don\u2019t touch anything. We do it for you." },
    { '@type': 'HowToStep', position: 4, name: 'AI Recommends You by Name', text: 'When someone asks ChatGPT for a solicitor in Bristol or an accountant in Manchester, AI recommends you by name. No bidding. No shared leads.' },
  ],
};

// FAQ schema — synced with the 6 questions in FAQ.tsx
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is AI visibility?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'AI visibility is how likely AI assistants like ChatGPT, Claude, and Perplexity are to recommend your business. TendorAI provides structured data profiles and AI visibility reports so AI platforms can find and recommend you by name.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which industries does TendorAI cover?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We currently cover solicitors, office equipment suppliers (photocopiers, telecoms, CCTV, IT), and are adding accountants soon. Our directory includes 10,000+ solicitor firms and 1,044 office equipment dealers across the UK.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is TendorAI free to use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Free AI visibility reports are available for any UK business. Basic directory listings are also free. Paid plans start at \u00a3149/month for full AI visibility with structured data profiles.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is this different from SEO?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "SEO optimises for Google search results. AI visibility (AEO/GEO) optimises for AI recommendations. When someone asks ChatGPT \u201cfind me a solicitor in Bristol\u201d, AI needs structured data to give a specific answer \u2014 that\u2019s what TendorAI provides.",
      },
    },
    {
      '@type': 'Question',
      name: 'What does a free AI visibility report show?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our free report scans how AI platforms currently see your business. It shows your AI visibility score (0-100), who AI recommends instead, gaps in your online presence, and specific steps to improve.',
      },
    },
    {
      '@type': 'Question',
      name: 'What areas does TendorAI cover?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'TendorAI covers all of England and Wales, including London, Birmingham, Manchester, Bristol, Cardiff, Leeds, Liverpool, Sheffield, Newcastle, and hundreds more cities and towns.',
      },
    },
  ],
};

export default async function HomePage() {
  const [categoryCounts, totalVendorCount] = await Promise.all([
    getCategoryCounts(),
    getTotalVendorCount(),
  ]);

  return (
    <>
      {/* JSON-LD schemas — Organization & WebSite schemas are in layout.tsx */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main>
        {/* Hero */}
        <Hero totalVendors={totalVendorCount} />

        {/* Problem — Cost comparison cards */}
        <ProblemSection />

        {/* AI Shift — Old vs New comparison */}
        <AiShift />

        {/* How TendorAI Works — 4 steps */}
        <Features />

        {/* Sector Benefits — 4 vertical cards */}
        <SectorBenefits />

        {/* AEO Report CTA */}
        <AeoReportCTA />

        {/* Conversation Demo */}
        <ConversationDemo />

        {/* What AI Platforms Say */}
        <AiTestimonials />

        {/* SEO vs AEO vs GEO */}
        <SeoAeoGeo />

        {/* Pricing */}
        <Pricing />

        {/* Verticals */}
        <Verticals />

        {/* FAQ */}
        <FAQ />

        {/* Browse by Service (SEO value) */}
        <ServiceCategories categoryCounts={categoryCounts} />

        {/* Final CTA */}
        <FinalCTA />
      </main>
    </>
  );
}
