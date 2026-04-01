import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Schema.org Checker \u2014 Check Any Website for Structured Data | TendorAI',
  description: 'Free tool to check if a website has the Schema.org structured data AI needs to recommend it. Detects LegalService, AccountingService, FAQPage, and more.',
  alternates: { canonical: '/tools/schema-checker' },
};

export default function SchemaCheckerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
