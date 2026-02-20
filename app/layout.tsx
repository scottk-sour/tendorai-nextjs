import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Fraunces } from 'next/font/google';
import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Providers from './components/Providers';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  weight: ['400', '500', '600', '700', '800'],
});

const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.tendorai.com'),
  title: {
    default: "TendorAI \u2014 The UK's AI Visibility Platform | Free AEO Reports",
    template: '%s | TendorAI',
  },
  description:
    "Check if AI recommends your business. TendorAI provides free AI visibility reports and structured data profiles for UK solicitors, accountants, mortgage advisors, estate agents, and office equipment suppliers. Get your AEO score in 60 seconds.",
  keywords: [
    'AI visibility platform UK',
    'get recommended by ChatGPT',
    'AI visibility for solicitors',
    'AI visibility for accountants',
    'AI visibility for suppliers',
    'structured data profiles',
    'GEO audit',
    'AEO report',
  ],
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  manifest: '/manifest.json',
  authors: [{ name: 'TendorAI' }],
  creator: 'TendorAI',
  publisher: 'TendorAI',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://www.tendorai.com',
    siteName: 'TendorAI',
    title: "TendorAI \u2014 The UK's AI Visibility Platform",
    description:
      "TendorAI is the UK's AI visibility platform. Structured data profiles for solicitors, accountants, mortgage advisors, and estate agents. Free AEO reports and AI recommendation tracking.",
    images: [{ url: 'https://www.tendorai.com/logo.png', width: 575, height: 283, alt: "TendorAI - The UK's AI Visibility Platform" }],
  },
  twitter: {
    card: 'summary',
    title: "TendorAI \u2014 The UK's AI Visibility Platform",
    description: "Get your business recommended by ChatGPT, Claude, and Perplexity. Free AI visibility reports for UK businesses.",
    creator: '@tendorai',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
  alternates: {
    canonical: '/',
  },
};

// JSON-LD schemas
const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'TendorAI',
  description: "The UK's AI Visibility Platform. Free AEO reports and structured data profiles for solicitors, accountants, mortgage advisors, estate agents, and office equipment suppliers \u2014 so AI recommends them by name.",
  url: 'https://www.tendorai.com/',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://www.tendorai.com/suppliers?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
};

const organisationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'TendorAI',
  legalName: 'TendorAI Ltd',
  description: 'AI visibility platform helping UK businesses get recommended by ChatGPT, Claude, Perplexity, and other AI platforms. Structured data profiles for solicitors, accountants, mortgage advisors, estate agents, and office equipment suppliers.',
  url: 'https://www.tendorai.com/',
  logo: {
    '@type': 'ImageObject',
    url: 'https://www.tendorai.com/tendorai.png',
    width: 575,
    height: 283,
  },
  foundingDate: '2024',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    email: 'scott.davies@tendorai.com',
    availableLanguage: 'en',
  },
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'GB',
    addressLocality: 'Bristol',
    addressRegion: 'England',
  },
  areaServed: {
    '@type': 'Country',
    name: 'United Kingdom',
  },
};

const softwareAppJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'TendorAI AEO Report',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  description: 'Free AI visibility reports for UK businesses. Check if ChatGPT, Claude, and Perplexity recommend your business. Structured data profiles, GEO audits, and AI mention tracking.',
  url: 'https://www.tendorai.com/',
  offers: [
    {
      '@type': 'Offer',
      name: 'Free',
      price: '0',
      priceCurrency: 'GBP',
      description: 'Free AEO report and basic directory listing',
    },
    {
      '@type': 'Offer',
      name: 'Starter',
      price: '149',
      priceCurrency: 'GBP',
      description: 'AI visibility with pricing visible to AI platforms and monthly AEO reports',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: '149',
        priceCurrency: 'GBP',
        billingDuration: 'P1M',
      },
    },
    {
      '@type': 'Offer',
      name: 'Pro',
      price: '299',
      priceCurrency: 'GBP',
      description: 'Priority ranking in AI responses with full structured data and weekly AEO reports',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: '299',
        priceCurrency: 'GBP',
        billingDuration: 'P1M',
      },
    },
  ],
};

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'AI Visibility Platform',
  provider: { '@type': 'Organization', name: 'TendorAI' },
  areaServed: { '@type': 'Country', name: 'United Kingdom' },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'UK Business Verticals',
    itemListElement: [
      { '@type': 'OfferCatalog', name: 'Solicitors', description: 'Conveyancing, Family Law, Criminal Law, Commercial, Employment, Wills & Probate, Immigration, Personal Injury' },
      { '@type': 'OfferCatalog', name: 'Office Equipment', description: 'Photocopiers, Telecoms, CCTV, IT Services' },
      { '@type': 'OfferCatalog', name: 'Accountants', description: 'Tax, Bookkeeping, Payroll, Advisory, Audit, R&D Tax Credits' },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB" className={`${plusJakarta.variable} ${fraunces.variable}`}>
      <head>
        <meta name="theme-color" content="#667eea" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
        />
      </head>
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
