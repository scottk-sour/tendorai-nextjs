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

const newDescription = "Check if AI recommends your business. TendorAI provides free AEO reports and structured data profiles for UK solicitors, accountants, mortgage advisors, estate agents, and office equipment suppliers. Get your AEO score in 60 seconds.";

export const metadata: Metadata = {
  title: { absolute: "TendorAI \u2014 AI Visibility Platform for UK Businesses | Free AEO Reports" },
  description: newDescription,
  keywords: 'AI visibility platform UK, get recommended by ChatGPT, AI visibility for solicitors, AI visibility for accountants, AI visibility for mortgage advisors, AI visibility for estate agents, structured data profiles, GEO audit, AEO report, free AEO score',
  alternates: {
    canonical: 'https://www.tendorai.com',
  },
  openGraph: {
    type: 'website',
    url: 'https://www.tendorai.com/',
    title: "TendorAI \u2014 AI Visibility Platform for UK Businesses | Free AEO Reports",
    description: newDescription,
    siteName: 'TendorAI',
    locale: 'en_GB',
    images: [{ url: '/logo.png', width: 575, height: 283, alt: 'TendorAI - AI Visibility Platform for UK Businesses' }],
  },
  twitter: {
    card: 'summary',
    title: "TendorAI \u2014 AI Visibility Platform for UK Businesses | Free AEO Reports",
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

// Keep only FAQ schema — Organization and WebSite are in layout.tsx
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is TendorAI?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "TendorAI is the UK's AI Visibility Platform. We help businesses get recommended by AI platforms like ChatGPT, Claude, and Perplexity through structured data profiles and AI visibility optimisation.",
      },
    },
    {
      '@type': 'Question',
      name: 'Is TendorAI free to use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes \u2014 free to be listed with a basic profile and a free AEO report. Paid tiers from \u00a3149/month give you priority ranking in AI results, pricing visibility, and weekly AI visibility reports.',
      },
    },
    {
      '@type': 'Question',
      name: 'What industries does TendorAI cover?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Solicitors (8,600+ firms), accountants (1,300+), mortgage advisors (5,000+), estate agents (20,000+), and office equipment suppliers (1,044). We cover conveyancing, family law, tax advisory, residential mortgages, and more.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is an AEO report?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'An AEO (Answer Engine Optimisation) report checks whether AI platforms like ChatGPT, Claude, and Perplexity recommend your business. TendorAI provides free AEO reports that show your AI visibility score in 60 seconds.',
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
      {/* FAQ Schema — Organization & WebSite schemas are in layout.tsx */}
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

        {/* How TendorAI Works — 3 steps */}
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

        {/* Browse by Service (SEO value) */}
        <ServiceCategories categoryCounts={categoryCounts} />

        {/* Final CTA */}
        <FinalCTA />
      </main>
    </>
  );
}
