import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Crawler Access Checker — Is Your Site Blocking ChatGPT and Claude? | TendorAI',
  description:
    "Free check: see whether ChatGPT, Claude, Perplexity and Gemini can reach your website. If AI platforms can't crawl you, they can't cite you.",
  alternates: { canonical: '/tools/robots-checker' },
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'TendorAI AI Crawler Checker',
  applicationCategory: 'BusinessApplication',
  applicationSubCategory: 'AI Visibility Tool',
  description:
    'Free check of whether AI crawlers — GPTBot, ClaudeBot, PerplexityBot and others — are allowed to reach and read a website.',
  operatingSystem: 'Web',
  url: 'https://www.tendorai.com/tools/robots-checker',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'GBP' },
  provider: { '@type': 'Organization', name: 'TendorAI Ltd', url: 'https://www.tendorai.com' },
  isPartOf: {
    '@type': 'SoftwareApplication',
    name: 'TendorAI',
    url: 'https://www.tendorai.com/ai-visibility-platform',
  },
};

export default function RobotsCheckerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
      />
      {children}
    </>
  );
}
