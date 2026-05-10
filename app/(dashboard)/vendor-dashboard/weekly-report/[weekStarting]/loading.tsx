// Skeleton shown during the Suspense boundary while the page mounts and
// hydrates. Mirrors the layout of the loaded page so there's minimal
// visual jank on transition.

export default function WeeklyReportLoading() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header skeleton */}
        <div className="mb-8 animate-pulse">
          <div className="h-9 w-2/3 bg-gray-200 rounded mb-3" />
          <div className="h-5 w-48 bg-gray-200 rounded mb-6" />
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="h-10 w-full sm:w-36 bg-gray-200 rounded-lg" />
            <div className="h-10 w-full sm:w-48 bg-gray-200 rounded-lg" />
            <div className="h-10 w-full sm:w-36 bg-gray-200 rounded-lg sm:ml-auto" />
          </div>
          <div className="h-3 w-64 bg-gray-200 rounded mt-4" />
        </div>

        {/* Three big-number boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 animate-pulse">
          {[0, 1, 2].map((i) => (
            <div key={i} className="card p-6">
              <div className="h-3 w-32 bg-gray-200 rounded mb-3" />
              <div className="h-12 w-24 bg-gray-200 rounded mb-3" />
              <div className="h-5 w-20 bg-gray-100 rounded" />
            </div>
          ))}
        </div>

        {/* Score history chart skeleton */}
        <div className="card p-6 mb-10 animate-pulse">
          <div className="h-5 w-56 bg-gray-200 rounded mb-4" />
          <div className="w-full bg-gray-100 rounded" style={{ aspectRatio: '720 / 280' }} />
        </div>

        {/* Per-engine bar chart skeleton */}
        <div className="mb-10 animate-pulse">
          <div className="h-8 w-80 bg-gray-200 rounded mb-6" />
          <div className="card p-6">
            <div className="w-full bg-gray-100 rounded" style={{ aspectRatio: '720 / 320' }} />
          </div>
        </div>
      </div>
    </main>
  );
}
