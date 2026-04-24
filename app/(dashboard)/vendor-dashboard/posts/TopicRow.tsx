'use client';

import { useState } from 'react';
import type { LibraryTopic } from './contentLibraryTypes';

interface TopicRowProps {
  topic: LibraryTopic;
  topicIndex: number;
  pillarId: string;
  onGenerate: (pillarId: string, topicIndex: number, topic: LibraryTopic) => void;
}

function channelLabel(channel: string): string {
  if (channel === 'blog+linkedin') return 'Blog + LinkedIn';
  if (channel === 'blog') return 'Blog';
  return channel;
}

export default function TopicRow({ topic, topicIndex, pillarId, onGenerate }: TopicRowProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg hover:border-purple-200 transition-colors bg-white">
      <div className="flex items-start gap-3 p-3">
        <button
          onClick={() => setExpanded((v) => !v)}
          className="flex-1 text-left min-w-0"
          aria-expanded={expanded}
        >
          <div className="flex items-center gap-2">
            <svg
              className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform ${
                expanded ? 'rotate-90' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <h4 className="text-sm font-semibold text-gray-900">{topic.title}</h4>
          </div>
          <p className="text-xs text-gray-500 mt-1 ml-6">
            {topic.wordCount} words &middot; {channelLabel(topic.channel)}
          </p>
        </button>

        <button
          onClick={() => onGenerate(pillarId, topicIndex, topic)}
          className="flex-shrink-0 inline-flex items-center gap-1.5 text-xs font-medium bg-purple-600 text-white px-3 py-1.5 rounded-lg hover:bg-purple-700 transition-colors"
        >
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          Generate
        </button>
      </div>

      {expanded && (
        <div className="border-t border-gray-100 px-3 pb-3 pt-3 space-y-3 text-sm">
          <p className="italic text-gray-600">{topic.tactic}</p>

          {topic.mustInclude && topic.mustInclude.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1">
                Must include
              </p>
              <ul className="list-disc list-inside space-y-0.5 text-gray-700">
                {topic.mustInclude.map((item, i) => (
                  <li key={i} className="text-sm">{item}</li>
                ))}
              </ul>
            </div>
          )}

          {topic.namedEntities && topic.namedEntities.length > 0 && (
            <div>
              <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                Entities to name:{' '}
              </span>
              <span className="text-sm text-gray-700">
                {topic.namedEntities.join(', ')}
              </span>
            </div>
          )}

          {topic.primaryDataHook && (
            <blockquote className="border-l-4 border-purple-300 bg-purple-50/50 pl-3 py-2 text-sm text-gray-700">
              {topic.primaryDataHook}
            </blockquote>
          )}

          {topic.rationale && (
            <p className="text-xs text-gray-500">{topic.rationale}</p>
          )}
        </div>
      )}
    </div>
  );
}
