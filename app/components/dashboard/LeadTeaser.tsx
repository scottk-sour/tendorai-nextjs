'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

interface LeadTeaserData {
  searchCount: number;
  category: string;
  location: string;
}

interface LeadTeaserProps {
  token: string;
}

const API_URL = process.env.NEXT_PUBLIC_EXPRESS_BACKEND_URL ||
                'https://ai-procurement-backend-q35u.onrender.com';

export default function LeadTeaser({ token }: LeadTeaserProps) {
  const [data, setData] = useState<LeadTeaserData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchTeaser = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/ai-mentions/lead-teaser`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (json.success) {
        setData(json.data);
      }
    } catch {
      // Silent fail
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchTeaser();
  }, [fetchTeaser]);

  if (loading) {
    return (
      <div className="card p-6">
        <div className="animate-pulse space-y-3">
          <div className="h-5 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
        </div>
      </div>
    );
  }

  if (!data || data.searchCount === 0) return null;

  return (
    <div className="card p-6 bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
          <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-lg font-bold text-gray-900">
            {data.searchCount} buyer{data.searchCount !== 1 ? 's' : ''} searched for{' '}
            <span className="text-amber-700">{data.category}</span> in{' '}
            <span className="text-amber-700">{data.location}</span> this month
          </p>
          <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>Upgrade to receive lead notifications</span>
          </div>
          <Link
            href="/vendor-dashboard/settings?tab=subscription"
            className="inline-flex items-center mt-3 px-4 py-2 bg-amber-600 text-white text-sm font-medium rounded-lg hover:bg-amber-700 transition-colors"
          >
            Upgrade to Visible &mdash; &pound;99/mo
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
