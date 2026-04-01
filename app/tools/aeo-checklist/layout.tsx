import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AEO Readiness Checklist \u2014 Is Your Firm Ready for AI Search? | TendorAI',
  description: 'Interactive checklist for UK solicitors, accountants, and mortgage advisers. Score your firm\u2019s AI visibility readiness out of 100 across directory presence, schema, content, and AI signals.',
  alternates: { canonical: '/tools/aeo-checklist' },
};

export default function AeoChecklistLayout({ children }: { children: React.ReactNode }) {
  return children;
}
