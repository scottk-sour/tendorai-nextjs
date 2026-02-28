import { Metadata } from 'next';
import AeoReportClient from './AeoReportClient';

export const metadata: Metadata = {
  title: 'Free AI Visibility Tool — Is AI Recommending Your Business?',
  description:
    'Free AI visibility checker for UK businesses. Find out if ChatGPT, Perplexity and Claude recommend you. Instant AI visibility report — enter your company name and get results in 60 seconds.',
  alternates: {
    canonical: 'https://www.tendorai.com/aeo-report',
  },
  openGraph: {
    type: 'website',
    url: 'https://www.tendorai.com/aeo-report',
    title: 'Free AI Visibility Tool — Is AI Recommending Your Business?',
    description:
      'Free AI visibility checker for UK businesses. Find out if ChatGPT, Perplexity and Claude recommend you. Instant AI visibility report in 60 seconds.',
    siteName: 'TendorAI',
    locale: 'en_GB',
    images: [{ url: '/logo.png', width: 873, height: 873, alt: 'TendorAI AI Visibility Tool' }],
  },
  twitter: {
    card: 'summary',
    title: 'Free AI Visibility Tool — Is AI Recommending Your Business?',
    description:
      'Free AI visibility checker for UK businesses. Find out if ChatGPT, Perplexity and Claude recommend you.',
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
      name: 'What is AI Visibility (AEO)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'AI Visibility (AEO — Answer Engine Optimisation) is the process of optimising your business to appear in AI-generated answers from tools like ChatGPT, Perplexity, and Claude. As more people use AI instead of Google to find suppliers, AI Visibility (AEO) is becoming essential for business visibility.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I check if AI recommends my business?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Use TendorAI's free AI Visibility (AEO) Report tool. Enter your company name, category, and location, and we'll check whether AI assistants recommend your business when customers search for suppliers in your area.",
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
