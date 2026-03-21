import { Metadata } from 'next';
import Hero from './components/landing/Hero';
import ProblemSection from './components/landing/ProblemSection';
import AiShift from './components/landing/AiShift';
import Features from './components/landing/Features';
import TrustBar from './components/landing/TrustBar';
import SectorBenefits from './components/landing/SectorBenefits';
import AeoReportCTA from './components/landing/AeoReportCTA';
import ConversationDemo from './components/landing/ConversationDemo';
import AiTestimonials from './components/landing/AiTestimonials';
import SeoAeo from './components/landing/SeoAeo';
import Pricing from './components/landing/Pricing';
import Verticals from './components/landing/Verticals';
import ServiceCategories from './components/landing/ServiceCategories';
import FAQ from './components/landing/FAQ';
import FinalCTA from './components/landing/FinalCTA';
import ProofSection from './components/homepage/ProofSection';
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
    // Accountants: try practiceAreas aggregation, fall back to total
    Vendor.aggregate([
      { $match: { ...statusFilter, vendorType: 'accountant' } },
      { $unwind: '$practiceAreas' },
      { $group: { _id: '$practiceAreas', count: { $sum: 1 } } },
    ]),
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
  // Accountants — use per-subcategory counts if practiceAreas populated, else total
  if (accountantCount.length > 0) {
    accountantCount.forEach((s: { _id: string; count: number }) => { counts[s._id] = s.count; });
  } else {
    // practiceAreas not populated — show total at parent level only via 'Accountants' key
    const totalAccountants = await Vendor.countDocuments({ ...statusFilter, vendorType: 'accountant' });
    counts['Accountants'] = totalAccountants;
  }
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

const newDescription = "TendorAI gets UK solicitors, accountants and mortgage advisers recommended by ChatGPT and Perplexity. Free AI visibility report \u2014 30-second results.";

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
    { '@type': 'HowToStep', position: 2, name: 'Claim and Complete Your Profile', text: 'Add your fees, specialisms, accreditations, and services through a simple dashboard. This is the structured data AI needs to recommend you by name — not just mention you generically.' },
    { '@type': 'HowToStep', position: 3, name: 'We Install AI Data on Your Website', text: 'Pro only — we log into your website and install schema markup using your dashboard data. You give us the login. We handle everything. No developer needed. Live within 48 hours.' },
    { '@type': 'HowToStep', position: 4, name: 'One Update. Everywhere in Sync.', text: 'Every time you update your dashboard, your TendorAI directory profile and your website schema update simultaneously. AI platforms crawl both. You do nothing technical. Ever.' },
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
        text: 'We cover solicitors (10,000+ SRA-registered firms), accountants (ICAEW-registered), mortgage advisers (FCA-regulated), and estate agents across England and Wales. Over 12,000 UK professional services firms are listed.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is TendorAI free to use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Free AI visibility reports are available for any UK business. Basic directory listings are also free. Paid plans start at \u00a3299/month for full AI visibility with structured data profiles.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is this different from SEO?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "SEO optimises for Google search results. AI Visibility (AEO) optimises for AI recommendations. When someone asks ChatGPT \u201cfind me a solicitor in Bristol\u201d, AI needs structured data to give a specific answer \u2014 that\u2019s what TendorAI provides.",
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
    {
      '@type': 'Question',
      name: 'What happens if I cancel TendorAI Pro?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'If you cancel, your TendorAI profile remains on the free tier \u2014 still listed and AI-crawlable. Your website schema stops auto-updating but continues to work until you remove it. You can also download your complete schema as a static JSON-LD file from your dashboard any time \u2014 self-host it and it keeps working forever. There is no lock-in.',
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
      {/* JSON-LD schemas (Organization + LocalBusiness are in layout.tsx) */}
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

        {/* Results timeline */}
        <div className="bg-gray-50 py-6">
          <p className="text-center text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-4">
            Most firms see their first AI recommendation within <strong className="text-gray-900">2&ndash;4 weeks</strong> of completing their profile.
          </p>
        </div>

        {/* Trust Bar — verified UK data sources */}
        <TrustBar />

        {/* Sector Benefits — 4 vertical cards */}
        <SectorBenefits />

        {/* AEO Report CTA */}
        <AeoReportCTA />

        {/* Conversation Demo */}
        <ConversationDemo />

        {/* What AI Platforms Say */}
        <AiTestimonials />

        {/* Proof — TendorAI's own AI visibility stats */}
        <ProofSection />

        {/* SEO vs AEO vs GEO */}
        <SeoAeo />

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
