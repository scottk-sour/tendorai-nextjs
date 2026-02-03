import { Suspense } from 'react';
import SearchResults from './SearchResults';

export default function SearchResultsPage() {
  return (
    <Suspense fallback={<SearchLoading />}>
      <SearchResults />
    </Suspense>
  );
}

function SearchLoading() {
  return (
    <main className="min-h-screen bg-gray-50 pt-16">
      <section className="bg-gradient-to-br from-blue-800 to-blue-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-8 bg-white/20 rounded w-48 mb-4 animate-pulse"></div>
          <div className="h-12 bg-white/20 rounded w-96 mb-4 animate-pulse"></div>
        </div>
      </section>
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading search results...</p>
          </div>
        </div>
      </section>
    </main>
  );
}
