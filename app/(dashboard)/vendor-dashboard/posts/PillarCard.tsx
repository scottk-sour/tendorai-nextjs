'use client';

import type { LibraryPillar, LibraryTopic } from './contentLibraryTypes';
import TopicRow from './TopicRow';

interface PillarCardProps {
  pillar: LibraryPillar;
  onGenerate: (pillarId: string, topicIndex: number, topic: LibraryTopic) => void;
}

export default function PillarCard({ pillar, onGenerate }: PillarCardProps) {
  return (
    <div className="card p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="mb-4">
        <h3 className="text-base font-bold text-gray-900">{pillar.name}</h3>
        <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">
          {pillar.whyItMatters}
        </p>
      </div>

      <div className="space-y-2">
        {pillar.topics.map((topic, idx) => (
          <TopicRow
            key={topic.id || `${pillar.id}-${idx}`}
            topic={topic}
            topicIndex={idx}
            pillarId={pillar.id}
            onGenerate={onGenerate}
          />
        ))}
      </div>
    </div>
  );
}
