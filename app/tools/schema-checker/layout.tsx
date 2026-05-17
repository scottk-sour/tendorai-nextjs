import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Schema.org Checker for UK Solicitors, Accountants & Mortgage Advisers | TendorAI',
  description: 'Free tool to check if your professional services firm has the Schema.org structured data AI needs to recommend you. See which schema types are present and which are missing.',
  alternates: { canonical: '/tools/schema-checker' },
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'TendorAI Schema Checker',
  applicationCategory: 'BusinessApplication',
  applicationSubCategory: 'AI Visibility Tool',
  description:
    'Free tool to check whether a professional services website has the Schema.org structured data AI assistants need to recommend the firm.',
  operatingSystem: 'Web',
  url: 'https://www.tendorai.com/tools/schema-checker',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'GBP' },
  provider: { '@type': 'Organization', name: 'TendorAI Ltd', url: 'https://www.tendorai.com' },
  isPartOf: {
    '@type': 'SoftwareApplication',
    name: 'TendorAI',
    url: 'https://www.tendorai.com/ai-visibility-platform',
  },
};

export default function SchemaCheckerLayout({ children }: { children: React.ReactNode }) {
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
