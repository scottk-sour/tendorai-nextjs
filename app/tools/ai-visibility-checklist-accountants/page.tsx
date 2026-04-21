import { Metadata } from 'next';
import Link from 'next/link';
import AccountantChecklistClient from './AccountantChecklistClient';

const TITLE = 'UK Accountancy Firm AI Visibility Checklist';
const DESCRIPTION = 'A free checklist for UK accountancy practices to audit their AI visibility across ChatGPT, Perplexity and Google AI Overviews. Covers schema, regulatory data, directories and content.';
const CANONICAL = 'https://www.tendorai.com/tools/ai-visibility-checklist-accountants';

export const metadata: Metadata = {
  title: `${TITLE} | TendorAI`,
  description: DESCRIPTION,
  alternates: { canonical: CANONICAL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: CANONICAL, type: 'website', siteName: 'TendorAI', images: [{ url: '/logo.png', width: 873, height: 873 }] },
  twitter: { card: 'summary', title: TITLE, description: DESCRIPTION },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.tendorai.com' },
    { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.tendorai.com/tools' },
    { '@type': 'ListItem', position: 3, name: TITLE, item: CANONICAL },
  ],
};

const webPageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: TITLE,
  description: DESCRIPTION,
  url: CANONICAL,
  publisher: { '@type': 'Organization', name: 'TendorAI', url: 'https://www.tendorai.com' },
};

export default function AccountantChecklistPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }} />

      <main className="min-h-screen bg-gray-50 pt-16">
        {/* Hero */}
        <section className="bg-brand-gradient text-white py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="text-sm mb-6 text-purple-200">
              <Link href="/" className="hover:text-white">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/tools/aeo-checklist" className="hover:text-white">Tools</Link>
              <span className="mx-2">/</span>
              <span className="text-white">Accountancy Checklist</span>
            </nav>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{TITLE}</h1>
            <p className="text-lg text-purple-100 max-w-2xl">
              <strong className="text-white">Most UK accountancy practices are invisible to ChatGPT and Perplexity</strong> &mdash; not because of poor reputation, but because their data is not structured for AI to read. Use this checklist to audit your practice&apos;s AI visibility across five key areas.
            </p>
          </div>
        </section>

        {/* Checklist */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <AccountantChecklistClient />
        </section>

        {/* CTA */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="bg-gradient-to-r from-[#1B4F72] to-[#2d1b4e] rounded-2xl p-8 md:p-10 text-white text-center">
            <h2 className="text-2xl font-bold mb-3">Not sure where to start?</h2>
            <p className="text-blue-100 mb-6 max-w-lg mx-auto">
              TendorAI audits your accountancy practice against all 24 checklist items automatically. We pull your ICAEW or ACCA data, fix your schema, and get you listed in the right directories &mdash; within 48 hours.
            </p>
            <Link href="/for-vendors" className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg text-lg">
              Get your free AI visibility audit
            </Link>
            <p className="text-sm text-blue-200 mt-4">
              Already have a profile? <Link href="/vendor-login" className="underline hover:text-white">Log in to see your full checklist score</Link>
            </p>
          </div>

          {/* Internal links */}
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link href="/ai-visibility-for-accountants" className="text-sm text-purple-600 hover:underline">AI Visibility for Accountants</Link>
            <Link href="/blog/how-to-get-your-accountancy-practice-into-ai-search-results" className="text-sm text-purple-600 hover:underline">How to Get Your Accountancy Practice into AI Search Results</Link>
            <Link href="/tools/schema-checker" className="text-sm text-purple-600 hover:underline">Schema Checker</Link>
            <Link href="/tools/robots-checker" className="text-sm text-purple-600 hover:underline">AI Crawler Checker</Link>
          </div>
        </section>
      </main>
    </>
  );
}
