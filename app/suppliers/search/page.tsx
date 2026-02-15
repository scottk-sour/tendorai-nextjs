import SearchResults from './SearchResults';

function SearchLoading() {
  return (
    <main className="min-h-screen bg-gray-50 pt-16">
      <section className="bg-brand-gradient text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-8 bg-white/20 rounded w-48 mb-4 animate-pulse"></div>
          <div className="h-12 bg-white/20 rounded w-96 mb-4 animate-pulse"></div>
        </div>
      </section>
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading search results...</p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default async function SearchResultsPage({
  searchParams,
}: {
  searchParams: Promise<{ postcode?: string; category?: string; distance?: string }>;
}) {
  const { postcode, category, distance } = await searchParams;
  return (
    <SearchResults
      postcode={postcode}
      category={category}
      distance={distance}
    />
  );
}
