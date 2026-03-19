'use client';

import { useState, useEffect } from 'react';

const API_URL = process.env.NEXT_PUBLIC_EXPRESS_BACKEND_URL ||
                'https://ai-procurement-backend-q35u.onrender.com';

interface ScoreWeek {
  score: number;
  weekStarting: string;
}

interface ScoreTrendCardProps {
  token: string;
}

export default function ScoreTrendCard({ token }: ScoreTrendCardProps) {
  const [history, setHistory] = useState<ScoreWeek[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    fetch(`${API_URL}/api/visibility/history?weeks=8`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(r => r.json())
      .then(data => {
        if (data.success && data.history?.length > 0) {
          setHistory(data.history);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [token]);

  if (loading || history.length === 0) return null;

  const latest = history[history.length - 1];
  const previous = history.length >= 2 ? history[history.length - 2] : null;
  const diff = previous ? latest.score - previous.score : 0;

  // Last 4 weeks for badge display
  const last4 = history.slice(-4);

  return (
    <div className="card p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-gray-900">Score Trend</h3>
        {diff > 0 ? (
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-green-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
            Up {diff} points this week
          </span>
        ) : diff < 0 ? (
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-red-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            Down {Math.abs(diff)} points this week
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-gray-400">
            &mdash; No change this week
          </span>
        )}
      </div>

      {last4.length >= 2 && (
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-gray-500">{last4.length} weeks:</span>
          {last4.map((w, i) => (
            <span key={i} className="flex items-center gap-1.5">
              <span className={`inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold rounded ${
                i === last4.length - 1
                  ? 'bg-purple-100 text-purple-700'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {w.score}
              </span>
              {i < last4.length - 1 && (
                <span className="text-gray-300 text-xs">&rarr;</span>
              )}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
