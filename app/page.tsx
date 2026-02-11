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
  title: 'Compare Office Equipment Quotes from UK Suppliers | TendorAI',
  description: 'Free AI-powered supplier directory for UK businesses. Compare photocopier, telecoms, CCTV, IT, and security quotes from 1,000+ verified suppliers.',
  keywords: 'photocopier suppliers Cardiff, office equipment Bristol, telecoms suppliers Wales, CCTV installation South Wales, IT equipment Swansea, business phone systems Bristol',
  alternates: {
    canonical: 'https://tendorai.com',
  },
  openGraph: {
    type: 'website',
    url: 'https://tendorai.com/',
    title: 'Compare Office Equipment Quotes from Local Suppliers | TendorAI',
    description: 'Find photocopier, telecoms, CCTV and IT equipment suppliers across the UK. Compare quotes from 1,000+ verified businesses. Free to use.',
    siteName: 'TendorAI',
    locale: 'en_GB',
    images: [{ url: '/logo.png', width: 575, height: 283, alt: 'TendorAI - AI-Powered Procurement' }],
  },
  twitter: {
    card: 'summary',
    title: 'TendorAI - AI-Powered Office Equipment Procurement',
    description: 'Compare copiers, telecoms, CCTV & IT suppliers. Get AI-matched quotes from verified UK vendors.',
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
  name: 'TendorAI',
  description: 'TendorAI is a free AI-powered comparison platform that helps UK businesses find office equipment suppliers. Browse 1,000+ verified suppliers for photocopiers, telecoms, CCTV, and IT equipment across the UK.',
  url: 'https://tendorai.com',
  priceRange: 'Free',
  address: {
    '@type': 'PostalAddress',
    addressRegion: 'Wales',
    addressCountry: 'GB',
  },
  areaServed: [
    {
      '@type': 'Place',
      name: 'South Wales',
      containsPlace: ['Cardiff', 'Newport', 'Swansea', 'Bridgend', 'Caerphilly'],
    },
    {
      '@type': 'Place',
      name: 'South West England',
      containsPlace: ['Bristol', 'Bath', 'Gloucester', 'Cheltenham', 'Exeter', 'Plymouth'],
    },
  ],
  serviceType: ['Office Equipment Comparison', 'Supplier Directory', 'Quote Requests'],
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
  url: 'https://tendorai.com',
  description: 'AI-powered office equipment supplier directory for UK businesses',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://tendorai.com/suppliers?postcode={search_term_string}',
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
