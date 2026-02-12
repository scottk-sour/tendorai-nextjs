import { Metadata } from 'next';
import { Suspense } from 'react';
import CompareView from './CompareView';

export const metadata: Metadata = {
  title: 'Compare Office Equipment Suppliers',
  description:
    'Compare quotes, pricing, and features from multiple office equipment suppliers side-by-side. Find the best deal for your business.',
  openGraph: {
    title: 'Compare Suppliers | TendorAI',
    description: 'Compare quotes from verified UK suppliers side-by-side.',
    url: 'https://tendorai.com/compare',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

function LoadingState() {
  return (
    <main className="min-h-screen bg-gray-50 pt-16">
      <section className="bg-brand-gradient text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-8 bg-white/20 rounded w-64 animate-pulse mb-4"></div>
          <div className="h-6 bg-white/20 rounded w-96 animate-pulse"></div>
        </div>
      </section>
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading comparison...</p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function ComparePage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <CompareView />
    </Suspense>
  );
}
