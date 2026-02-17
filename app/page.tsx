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
  description: 'TendorAI is a free AI-powered comparison platform that helps UK businesses find office equipment suppliers. Browse 1,000+ verified suppliers for photocopiers, telecoms, CCTV, and IT equipment across the UK.',
  url: 'https://www.tendorai.com',
  image: 'https://www.tendorai.com/logo.png',
  address: {
    '@type': 'PostalAddress',
    addressRegion: 'Wales',
    addressCountry: 'GB',
  },
  areaServed: [
    {
      '@type': 'Place',
      name: 'South Wales',
    },
    {
      '@type': 'Place',
      name: 'South West England',
    },
    {
      '@type': 'Country',
      name: 'United Kingdom',
    },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Office Equipment Categories',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Photocopiers & Printers' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Telecoms & Phone Systems' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'CCTV & Security Systems' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'IT Equipment & Support' } },
    ],
  },
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'TendorAI',
  url: 'https://www.tendorai.com',
  description: 'AI-powered office equipment supplier directory for UK businesses',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://www.tendorai.com/suppliers?postcode={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What areas does TendorAI cover?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'TendorAI lists 1,000+ office equipment suppliers across the UK. Our directory covers all major cities and regions nationwide, helping businesses find trusted local and national suppliers.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is TendorAI free to use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, TendorAI is completely free for businesses looking for office equipment. You can browse our supplier directory, view company profiles, and request quotes without any charge.',
      },
    },
    {
      '@type': 'Question',
      name: 'What types of office equipment can I find suppliers for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our directory covers four main categories: photocopiers and multifunction printers, telecoms and business phone systems, CCTV and security systems, and IT equipment.',
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
        {/* Hero Section with Postcode Search */}
        <Hero />

        {/* Features Section */}
        <Features />

        {/* Service Categories */}
        <ServiceCategories categoryCounts={categoryCounts} />

        {/* Stats Section with Animated Counters */}
        <Stats />

        {/* Coverage Areas */}
        <CoverageAreas />

        {/* FAQ Section */}
        <FAQ />

        {/* AEO Report CTA */}
        <AeoReportCTA />

        {/* Final CTA with Newsletter */}
        <FinalCTA />
      </main>
    </>
  );
}
