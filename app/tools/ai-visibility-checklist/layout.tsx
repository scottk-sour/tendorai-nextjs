import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Visibility Readiness Checklist \u2014 Is Your Firm Ready for AI Search? | TendorAI',
  description: 'Interactive checklist for UK solicitors, accountants, and mortgage advisers. Score your firm\u2019s AI visibility readiness out of 100 across directory presence, schema, content, and AI signals.',
  alternates: { canonical: '/tools/ai-visibility-checklist' },
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'TendorAI AI Visibility Checklist',
  applicationCategory: 'BusinessApplication',
  applicationSubCategory: 'AI Visibility Tool',
  description:
    'Interactive AI visibility readiness checklist for UK professional services firms — score your firm across directory presence, schema, content, and AI signals.',
  operatingSystem: 'Web',
  url: 'https://www.tendorai.com/tools/ai-visibility-checklist',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'GBP' },
  provider: { '@type': 'Organization', name: 'TendorAI Ltd', url: 'https://www.tendorai.com' },
  isPartOf: {
    '@type': 'SoftwareApplication',
    name: 'TendorAI',
    url: 'https://www.tendorai.com/ai-visibility-platform',
  },
};

export default function AeoChecklistLayout({ children }: { children: React.ReactNode }) {
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
