import { Metadata } from 'next';
import { Suspense } from 'react';
import QuoteFlow from './QuoteFlow';

export const metadata: Metadata = {
  title: 'Get Quotes | TendorAI',
  description:
    'Get instant quotes from verified UK office equipment suppliers. Compare pricing for photocopiers, printers, telecoms, CCTV, and IT services.',
  openGraph: {
    title: 'Get Quotes | TendorAI',
    description: 'Compare quotes from verified UK suppliers. Free, instant, no obligation.',
    url: 'https://tendorai.com/get-quotes',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

function LoadingState() {
  return (
    <main className="min-h-screen bg-gray-50 pt-16">
      <section className="bg-brand-gradient text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-8 bg-white/20 rounded w-48 animate-pulse mb-4"></div>
          <div className="h-6 bg-white/20 rounded w-96 animate-pulse"></div>
        </div>
      </section>
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function GetQuotesPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <QuoteFlow />
    </Suspense>
  );
}
