import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Schema.org Checker for UK Solicitors, Accountants & Mortgage Advisers | TendorAI',
  description: 'Free tool to check if your professional services firm has the Schema.org structured data AI needs to recommend you. See which schema types are present and which are missing.',
  alternates: { canonical: '/tools/schema-checker' },
};

export default function SchemaCheckerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
