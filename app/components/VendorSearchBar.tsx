'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface SearchResult {
  id: string;
  company: string;
  city: string;
  vendorType: string;
  slug: string | null;
}

const API_URL = process.env.NEXT_PUBLIC_EXPRESS_BACKEND_URL || 'https://ai-procurement-backend-q35u.onrender.com';

export default function VendorSearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [searched, setSearched] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Debounced search
  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      setSearched(false);
      setOpen(query.length > 0);
      return;
    }

    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `${API_URL}/api/public/vendors/search?q=${encodeURIComponent(query.trim())}&limit=20`
        );
        const json = await res.json();
        if (json.success) {
          setResults(json.data.vendors);
        } else {
          setResults([]);
        }
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
        setSearched(true);
        setOpen(true);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Close on click outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  function getProfileUrl(r: SearchResult) {
    if (r.slug) return `/suppliers/vendor/${r.slug}`;
    return `/suppliers/profile/${r.id}`;
  }

  const typeLabel: Record<string, string> = {
    solicitor: 'Solicitor',
    'office-equipment': 'Office Equipment',
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl mx-auto mt-6">
      {/* Search input */}
      <div className="relative">
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-purple-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => (query.length > 0) && setOpen(true)}
          placeholder="Search for a business by name..."
          className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/15 backdrop-blur text-white placeholder-purple-200 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40 focus:bg-white/20 transition text-lg"
        />
        {loading && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <div className="h-5 w-5 border-2 border-purple-200 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-50 mt-2 w-full bg-white rounded-xl shadow-xl border border-gray-200 max-h-96 overflow-y-auto">
          {query.trim().length < 2 && (
            <div className="px-4 py-3 text-sm text-gray-500">
              Type at least 2 characters
            </div>
          )}

          {query.trim().length >= 2 && loading && (
            <div className="px-4 py-3 text-sm text-gray-500 flex items-center gap-2">
              <div className="h-4 w-4 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />
              Searching...
            </div>
          )}

          {query.trim().length >= 2 && !loading && searched && results.length === 0 && (
            <div className="px-4 py-3 text-sm text-gray-500">
              No businesses found
            </div>
          )}

          {results.length > 0 && !loading && results.map((r) => (
            <Link
              key={r.id}
              href={getProfileUrl(r)}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between px-4 py-3 hover:bg-purple-50 transition border-b border-gray-100 last:border-b-0"
            >
              <div className="min-w-0">
                <div className="font-semibold text-gray-900 truncate">{r.company}</div>
                {r.city && (
                  <div className="text-sm text-gray-500">{r.city}</div>
                )}
              </div>
              <span className="ml-3 shrink-0 text-xs px-2 py-1 rounded-full bg-purple-50 text-purple-700 font-medium">
                {typeLabel[r.vendorType] || r.vendorType}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
