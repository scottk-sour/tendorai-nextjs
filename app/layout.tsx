import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Providers from './components/Providers';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://tendorai.com'),
  title: {
    default: 'TendorAI | AI-Powered Procurement for UK Businesses',
    template: '%s | TendorAI',
  },
  description:
    'Find and compare trusted office equipment suppliers across the UK. Get instant quotes for copiers, telecoms, CCTV, IT services, and security systems.',
  keywords: [
    'office equipment suppliers UK',
    'copier suppliers Wales',
    'telecoms providers Bristol',
    'CCTV installers Cardiff',
    'IT services South West',
    'business equipment procurement',
    'managed print services',
    'office technology suppliers',
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
    url: 'https://tendorai.com',
    siteName: 'TendorAI',
    title: 'TendorAI | AI-Powered Procurement for UK Businesses',
    description:
      'Find and compare trusted office equipment suppliers across the UK. Get instant quotes for copiers, telecoms, CCTV, IT services, and security systems.',
    images: [{ url: 'https://tendorai.com/logo.png', width: 575, height: 283, alt: 'TendorAI - AI-Powered Procurement' }],
  },
  twitter: {
    card: 'summary',
    title: 'TendorAI - AI-Powered Office Equipment Procurement',
    description: 'Compare copiers, telecoms, CCTV & IT suppliers. Get AI-matched quotes from verified UK vendors.',
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
    canonical: 'https://tendorai.com',
  },
};

// JSON-LD for organisation
const organisationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://tendorai.com/#organization',
  name: 'TendorAI',
  url: 'https://tendorai.com',
  logo: {
    '@type': 'ImageObject',
    url: 'https://tendorai.com/logo.png',
    width: 575,
    height: 283,
  },
  description: 'AI-powered procurement platform connecting UK businesses with office equipment suppliers.',
  areaServed: {
    '@type': 'Country',
    name: 'United Kingdom',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    email: 'support@tendorai.com',
    availableLanguage: 'English',
  },
  sameAs: ['https://linkedin.com/company/tendorai'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB" className={inter.variable}>
      <head>
        <meta name="theme-color" content="#667eea" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationJsonLd) }}
        />
      </head>
      <body className={`${inter.className} antialiased min-h-screen flex flex-col`}>
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
