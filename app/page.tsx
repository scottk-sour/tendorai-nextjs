import { Metadata } from 'next';
import Hero from './components/landing/Hero';
import Features from './components/landing/Features';
import ServiceCategories from './components/landing/ServiceCategories';
import Stats from './components/landing/Stats';
import CoverageAreas from './components/landing/CoverageAreas';
import FAQ from './components/landing/FAQ';
import FinalCTA from './components/landing/FinalCTA';
import AeoReportCTA from './components/landing/AeoReportCTA';
import { connectDB } from '@/lib/db/connection';
import { Vendor } from '@/lib/db/models';

export const revalidate = 3600; // Revalidate every hour

async function getCategoryCounts(): Promise<Record<string, number>> {
  await connectDB();
  const stats = await Vendor.aggregate([
    {
      $match: {
        'account.status': 'active',
        'account.verificationStatus': 'verified',
      },
    },
    { $unwind: '$services' },
    {
      $group: {
        _id: '$services',
        count: { $sum: 1 },
      },
    },
  ]);

  const counts: Record<string, number> = {};
  stats.forEach((stat: { _id: string; count: number }) => {
    counts[stat._id] = stat.count;
  });
  return counts;
}

export const metadata: Metadata = {
  title: { absolute: "TendorAI \u2014 The UK's AI Visibility Platform" },
  description: "Get your business recommended by AI. Free AI visibility reports and structured data profiles for UK solicitors, accountants, and office equipment suppliers.",
  keywords: 'AI visibility platform UK, get recommended by ChatGPT, AI visibility for solicitors, AI visibility for suppliers, structured data profiles, GEO audit, AEO report',
  alternates: {
    canonical: 'https://www.tendorai.com',
  },
  openGraph: {
    type: 'website',
    url: 'https://www.tendorai.com/',
    title: "TendorAI \u2014 The UK's AI Visibility Platform",
    description: "Get your business recommended by AI. Free AI visibility reports and structured data profiles for UK solicitors, accountants, and office equipment suppliers.",
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
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://www.tendorai.com/#business',
  name: 'TendorAI',
  description: "TendorAI is the UK's AI Visibility Platform. We help businesses get recommended by ChatGPT, Claude, and Perplexity through structured data profiles and AI visibility optimisation. 11,000+ UK businesses listed.",
  url: 'https://www.tendorai.com',
  image: 'https://www.tendorai.com/logo.png',
  address: {
    '@type': 'PostalAddress',
    addressRegion: 'Wales',
    addressCountry: 'GB',
  },
  areaServed: [
    {
      '@type': 'Country',
      name: 'United Kingdom',
    },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'AI Visibility Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI Visibility Profiles' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AEO Reports' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI Mention Tracking' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'GEO Audit' } },
    ],
  },
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'TendorAI',
  url: 'https://www.tendorai.com',
  description: "The UK's AI Visibility Platform — helping businesses get recommended by ChatGPT, Claude, and Perplexity",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
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
        {/* Hero Section */}
        <Hero />

        {/* Stats Bar */}
        <Stats />

        {/* How It Works */}
        <Features />

        {/* AI Visibility CTA — Prominent Position */}
        <AeoReportCTA />

        {/* Browse by Service */}
        <ServiceCategories categoryCounts={categoryCounts} />

        {/* Coverage Areas */}
        <CoverageAreas />

        {/* FAQ Section */}
        <FAQ />

        {/* Final CTA with Newsletter */}
        <FinalCTA />
      </main>
    </>
  );
}
