'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const CATEGORIES = [
  { value: '', label: 'All Categories' },
  { value: 'photocopiers', label: 'Photocopiers & Printers' },
  { value: 'telecoms', label: 'Telecoms & Phone Systems' },
  { value: 'cctv', label: 'CCTV & Security' },
  { value: 'it-services', label: 'IT Services & Equipment' },
  { value: 'office-equipment', label: 'Office Equipment' },
];

const DISTANCES = [
  { value: '10', label: '10 miles' },
  { value: '25', label: '25 miles' },
  { value: '50', label: '50 miles' },
  { value: '100', label: '100 miles' },
  { value: '200', label: 'Nationwide' },
];

export default function HeroSearch() {
  const router = useRouter();
  const [postcode, setPostcode] = useState('');
  const [category, setCategory] = useState('');
  const [distance, setDistance] = useState('50');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const validatePostcode = (pc: string) => {
    const ukPostcodeRegex = /^[A-Z]{1,2}\d{1,2}[A-Z]?\s*\d[A-Z]{2}$/i;
    return ukPostcodeRegex.test(pc.trim());
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!postcode.trim()) {
      setError('Please enter your postcode');
      return;
    }

    if (!validatePostcode(postcode)) {
      setError('Please enter a valid UK postcode');
      return;
    }

    setIsLoading(true);

    try {
      const params = new URLSearchParams();
      params.set('postcode', postcode.trim().toUpperCase());
      if (category) params.set('category', category);
      params.set('distance', distance);

      router.push(`/suppliers?${params.toString()}`);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSearch} className="bg-white/95 backdrop-blur rounded-2xl p-2 shadow-2xl">
        <div className="flex flex-col md:flex-row gap-2">
          {/* Postcode Input */}
          <div className="flex-1 relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={postcode}
              onChange={(e) => {
                setPostcode(e.target.value.toUpperCase());
                setError('');
              }}
              placeholder="Enter postcode (e.g., CF10 1AA)"
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 text-base"
              maxLength={10}
            />
          </div>

          {/* Category Dropdown */}
          <div className="relative md:w-56">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-4 rounded-xl bg-gray-50 text-gray-900 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500 text-base"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Distance Dropdown */}
          <div className="relative md:w-36">
            <select
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              className="w-full px-4 py-4 rounded-xl bg-gray-50 text-gray-900 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500 text-base"
            >
              {DISTANCES.map((dist) => (
                <option key={dist.value} value={dist.value}>
                  {dist.label}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Search Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>Find Suppliers</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Error Message */}
      {error && (
        <div className="mt-3 text-red-200 text-sm text-center bg-red-500/20 py-2 px-4 rounded-lg">
          {error}
        </div>
      )}

      {/* Helper Text */}
      <p className="mt-4 text-purple-200 text-sm text-center">
        Enter your postcode to find verified suppliers near you
      </p>
    </div>
  );
}
