'use client';

import type { LibraryPillar, LibraryTopic } from './contentLibraryTypes';
import PillarCard from './PillarCard';

interface PillarLibraryGridProps {
  pillars: LibraryPillar[] | null;
  loading: boolean;
  error: string | null;
  unsupported: boolean;
  onGenerate: (pillarId: string, topicIndex: number, topic: LibraryTopic) => void;
}

function SkeletonCard() {
  return (
    <div className="card p-5 animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-2/3 mb-3" />
      <div className="h-3 bg-gray-100 rounded w-full mb-1.5" />
      <div className="h-3 bg-gray-100 rounded w-5/6 mb-4" />
      <div className="space-y-2">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-12 bg-gray-50 border border-gray-100 rounded-lg" />
        ))}
      </div>
    </div>
  );
}

export default function PillarLibraryGrid({
  pillars,
  loading,
  error,
  unsupported,
  onGenerate,
}: PillarLibraryGridProps) {
  if (unsupported) {
    return (
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
        <p className="text-sm text-gray-600">
          Content library for your vendor type is coming soon.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4">
        <p className="text-sm text-red-700">
          Couldn&apos;t load your content library. Refresh the page to try again.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center gap-2">
          <svg
            className="w-5 h-5 text-purple-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <h2 className="text-lg font-semibold text-gray-900">Your content pillars</h2>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          Six strategic themes, 24 topics tailored to your firm. Click any topic to
          generate a post with v7 AI optimisation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {loading || !pillars
          ? [0, 1, 2, 3, 4, 5].map((i) => <SkeletonCard key={i} />)
          : pillars.map((pillar) => (
              <PillarCard key={pillar.id} pillar={pillar} onGenerate={onGenerate} />
            ))}
      </div>
    </div>
  );
}
