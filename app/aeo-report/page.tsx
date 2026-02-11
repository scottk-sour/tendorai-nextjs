import { Metadata } from 'next';
import AeoReportClient from './AeoReportClient';

export const metadata: Metadata = {
  title: 'Free AEO Report — Is AI Recommending Your Business? | TendorAI',
  description:
    'Find out if ChatGPT, Perplexity and Claude recommend your business when customers search for suppliers. Free instant AI visibility report for UK businesses.',
  alternates: {
    canonical: 'https://tendorai.com/aeo-report',
  },
  openGraph: {
    type: 'website',
    url: 'https://tendorai.com/aeo-report',
    title: 'Free AEO Report — Is AI Recommending Your Business?',
    description:
      'Find out if ChatGPT, Perplexity and Claude recommend your business. Free instant AI visibility report for UK businesses.',
    siteName: 'TendorAI',
    locale: 'en_GB',
    images: [{ url: '/logo.png', width: 575, height: 283, alt: 'TendorAI AEO Report' }],
  },
  twitter: {
    card: 'summary',
    title: 'Free AEO Report — Is AI Recommending Your Business?',
    description:
      'Find out if ChatGPT, Perplexity and Claude recommend your business. Free AI visibility check.',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is AEO (Answer Engine Optimisation)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'AEO is the process of optimising your business to appear in AI-generated answers from tools like ChatGPT, Perplexity, and Claude. As more people use AI instead of Google to find suppliers, AEO is becoming essential for business visibility.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I check if AI recommends my business?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Use TendorAI's free AEO Report tool. Enter your company name, category, and location, and we'll check whether AI assistants recommend your business when customers search for suppliers in your area.",
      },
    },
    {
      '@type': 'Question',
      name: 'Why is my business not showing up in AI answers?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "AI tools recommend businesses based on structured data, verified profiles, and authoritative sources. If your business doesn't have optimised, structured data on platforms AI tools reference, you won't appear in AI-generated recommendations.",
      },
    },
  ],
};

export default function AeoReportPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AeoReportClient />
    </>
  );
}
