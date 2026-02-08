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
  metadataBase: new URL('https://www.tendorai.com'),
  title: {
    default: 'TendorAI | AI-Powered Procurement for UK Businesses',
    template: '%s | TendorAI',
  },
  description:
    'Find and compare trusted office equipment suppliers across Wales and South West England. Get instant quotes for copiers, telecoms, CCTV, IT services, and security systems.',
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
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
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
    title: 'TendorAI | AI-Powered Procurement for UK Businesses',
    description:
      'Find and compare trusted office equipment suppliers across Wales and South West England. Get instant quotes for copiers, telecoms, CCTV, IT services, and security systems.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'TendorAI - AI-Powered Procurement',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TendorAI | AI-Powered Procurement for UK Businesses',
    description: 'Find and compare trusted office equipment suppliers across Wales and South West England.',
    creator: '@tendorai',
    images: ['/og-image.png'],
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
    canonical: 'https://www.tendorai.com',
  },
};

// JSON-LD for organisation
const organisationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'TendorAI',
  url: 'https://www.tendorai.com',
  logo: 'https://www.tendorai.com/logo.png',
  description: 'AI-powered procurement platform connecting UK businesses with office equipment suppliers.',
  areaServed: {
    '@type': 'GeoCircle',
    geoMidpoint: {
      '@type': 'GeoCoordinates',
      latitude: 51.4816,
      longitude: -3.1791,
    },
    geoRadius: '150 mi',
  },
  serviceArea: ['Wales', 'South West England', 'West of England'],
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
