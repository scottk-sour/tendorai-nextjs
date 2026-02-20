import { Metadata } from 'next';
import Hero from './components/landing/Hero';
import ProblemSection from './components/landing/ProblemSection';
import AiShift from './components/landing/AiShift';
import Features from './components/landing/Features';
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

export const metadata: Metadata = {
  title: { absolute: "TendorAI \u2014 The UK's AI Visibility Platform" },
  description: "TendorAI is the UK's AI visibility platform. Structured data profiles for solicitors, accountants, mortgage advisors, and estate agents. Free AEO reports and AI recommendation tracking.",
  keywords: 'AI visibility platform UK, get recommended by ChatGPT, AI visibility for solicitors, AI visibility for accountants, AI visibility for mortgage advisors, AI visibility for estate agents, structured data profiles, GEO audit, AEO report',
  alternates: {
    canonical: 'https://www.tendorai.com',
  },
  openGraph: {
    type: 'website',
    url: 'https://www.tendorai.com/',
    title: "TendorAI \u2014 The UK's AI Visibility Platform",
    description: "TendorAI is the UK's AI visibility platform. Structured data profiles for solicitors, accountants, mortgage advisors, and estate agents. Free AEO reports and AI recommendation tracking.",
    siteName: 'TendorAI',
    locale: 'en_GB',
    images: [{ url: '/logo.png', width: 575, height: 283, alt: 'TendorAI - Get Found by AI' }],
  },
  twitter: {
    card: 'summary',
    title: "TendorAI \u2014 The UK's AI Visibility Platform",
    description: "Get your business recommended by ChatGPT, Claude, and Perplexity. Free AI visibility reports for UK businesses.",
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

// JSON-LD Schema
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'TendorAI',
  url: 'https://www.tendorai.com',
  description: "The UK's AI visibility platform. Structured data profiles for solicitors, accountants, mortgage advisors, and estate agents.",
  foundingDate: '2025',
  areaServed: 'GB',
  sameAs: ['https://www.linkedin.com/company/tendorai'],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'TendorAI',
  url: 'https://www.tendorai.com',
  description: 'AI visibility platform for UK businesses. Free AEO reports, structured data profiles, and AI recommendation tracking.',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://www.tendorai.com/suppliers?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

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
        text: 'Free to be listed with a basic profile. Paid tiers from £149/month give you priority ranking in AI results, pricing visibility, and AI visibility reports.',
      },
    },
    {
      '@type': 'Question',
      name: 'What industries does TendorAI cover?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Solicitors (10,000+ firms), office equipment dealers (1,044), with accountants, estate agents, and recruitment agencies coming soon.',
      },
    },
  ],
};

export default async function HomePage() {
  const categoryCounts = await getCategoryCounts();

  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main>
        {/* Hero */}
        <Hero />

        {/* Problem — Cost comparison cards */}
        <ProblemSection />

        {/* AI Shift — Old vs New comparison */}
        <AiShift />

        {/* How It Works — 4 steps */}
        <Features />

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
