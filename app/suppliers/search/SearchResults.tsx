'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import VendorCard, { VendorCardData } from '@/app/components/VendorCard';

const API_URL = process.env.NEXT_PUBLIC_EXPRESS_BACKEND_URL ||
  'https://ai-procurement-backend-q35u.onrender.com';

interface SearchResponse {
  success: boolean;
  data: {
    vendors: VendorCardData[];
    nationalVendors?: VendorCardData[];
    pagination: {
      total: number;
      page: number;
      totalPages: number;
      nationalCount?: number;
    };
    search?: {
      postcode: string;
      maxDistance: number;
      maxDistanceKm: number;
      region?: string;
    };
  };
}

const CATEGORY_LABELS: Record<string, string> = {
  photocopiers: 'Photocopiers & Printers',
  telecoms: 'Telecoms & Phone Systems',
  cctv: 'CCTV & Security',
  it: 'IT Services & Equipment',
  'office-equipment': 'Office Equipment',
  '': 'All Categories',
};

interface SearchResultsProps {
  postcode?: string;
  category?: string;
  distance?: string;
}

export default function SearchResults({
  postcode = '',
  category = '',
  distance = '50',
}: SearchResultsProps) {

  const [vendors, setVendors] = useState<VendorCardData[]>([]);
  const [nationalVendors, setNationalVendors] = useState<VendorCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [searchInfo, setSearchInfo] = useState<{
    postcode: string;
    maxDistance: number;
    region?: string;
  } | null>(null);

  useEffect(() => {
    async function fetchVendors() {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (category) params.set('category', category);
        if (postcode) params.set('postcode', postcode);
        if (distance) params.set('distance', distance);
        params.set('limit', '50');

        const response = await fetch(`${API_URL}/api/public/vendors?${params.toString()}`);
        const data: SearchResponse = await response.json();

        if (data.success) {
          setVendors(data.data.vendors);
          setNationalVendors(data.data.nationalVendors || []);
          setTotal(data.data.pagination.total);
          setSearchInfo(data.data.search || null);
        }
      } catch (error) {
        console.error('Failed to fetch vendors:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchVendors();
  }, [category, postcode, distance]);

  const hasResults = vendors.length > 0 || nationalVendors.length > 0;

  return (
    <main className="min-h-screen bg-gray-50 pt-16">
      {/* Header */}
      <section className="bg-brand-gradient text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm mb-4 text-purple-200">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/suppliers" className="hover:text-white">Suppliers</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Search Results</span>
          </nav>

          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {category ? CATEGORY_LABELS[category] || 'Suppliers' : 'All Suppliers'}
            {postcode && ` near ${postcode}`}
          </h1>

          <div className="flex flex-wrap gap-3 text-sm">
            {postcode && (
              <span className="bg-white/20 px-3 py-1.5 rounded-full">
                {postcode}
              </span>
            )}
            {category && (
              <span className="bg-white/20 px-3 py-1.5 rounded-full">
                {CATEGORY_LABELS[category]}
              </span>
            )}
            <span className="bg-white/20 px-3 py-1.5 rounded-full">
              Within {distance} miles
            </span>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-16">
              <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-600">Finding suppliers{postcode ? ` near ${postcode}` : ''}...</p>
            </div>
          ) : hasResults ? (
            <>
              {/* Results header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <div>
                  <p className="text-gray-600">
                    Found <strong className="text-gray-900">{total}</strong> local supplier{total !== 1 ? 's' : ''}
                    {nationalVendors.length > 0 && (
                      <> and <strong className="text-gray-900">{nationalVendors.length}</strong> national</>
                    )}
                    {category && ` in ${CATEGORY_LABELS[category]}`}
                  </p>
                  {searchInfo?.region && (
                    <p className="text-sm text-gray-400 mt-1">
                      Showing results within {searchInfo.maxDistance} miles of {searchInfo.postcode} ({searchInfo.region})
                    </p>
                  )}
                </div>
                <Link
                  href={`/get-quotes${category ? `?category=${category}` : ''}`}
                  className="inline-flex items-center px-5 py-2.5 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors text-sm"
                >
                  Get AI-Matched Quotes &rarr;
                </Link>
              </div>

              {/* Local suppliers */}
              {vendors.length > 0 && (
                <div className="mb-12">
                  {postcode && nationalVendors.length > 0 && (
                    <h2 className="text-lg font-bold text-gray-900 mb-4">
                      Local Suppliers
                    </h2>
                  )}
                  <div className="space-y-4">
                    {vendors.map((vendor) => (
                      <VendorCard key={vendor.id} vendor={vendor} />
                    ))}
                  </div>
                </div>
              )}

              {/* National suppliers */}
              {nationalVendors.length > 0 && (
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h2 className="text-lg font-bold text-gray-900 mb-2">
                    National Suppliers
                  </h2>
                  <p className="text-sm text-gray-500 mb-4">
                    These suppliers operate nationwide and may serve your area.
                  </p>
                  <div className="space-y-4">
                    {nationalVendors.map((vendor) => (
                      <VendorCard key={vendor.id} vendor={vendor} />
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">&#128269;</div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">No suppliers found</h2>
              <p className="text-gray-600 mb-6">
                We couldn&apos;t find any suppliers matching your search.
                {postcode && ' Try increasing the search radius or removing the category filter.'}
              </p>
              <Link
                href="/suppliers"
                className="inline-block bg-purple-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Browse All Suppliers
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Refine Search */}
      {hasResults && (
        <section className="py-12 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Refine Your Search
            </h2>
            <p className="text-gray-600 mb-6">
              Browse suppliers by category or location to find the perfect match.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Link href="/suppliers/photocopiers" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                Photocopiers
              </Link>
              <Link href="/suppliers/telecoms" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                Telecoms
              </Link>
              <Link href="/suppliers/cctv" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                CCTV
              </Link>
              <Link href="/suppliers/it" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                IT Services
              </Link>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
