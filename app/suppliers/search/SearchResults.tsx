'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

interface Vendor {
  id: string;
  company: string;
  services: string[];
  location: {
    city?: string;
    region?: string;
    coverage?: string[];
  };
  rating: number;
  reviewCount: number;
  tier: string;
  description?: string;
  productCount: number;
}

interface SearchResponse {
  success: boolean;
  data: {
    vendors: Vendor[];
    pagination: {
      total: number;
      page: number;
      totalPages: number;
    };
  };
}

const CATEGORY_LABELS: Record<string, string> = {
  photocopiers: 'Photocopiers & Printers',
  telecoms: 'Telecoms & Phone Systems',
  cctv: 'CCTV & Security',
  'it-services': 'IT Services & Equipment',
  'office-equipment': 'Office Equipment',
  '': 'All Categories',
};

export default function SearchResults() {
  const searchParams = useSearchParams();
  const postcode = searchParams.get('postcode') || '';
  const category = searchParams.get('category') || '';
  const distance = searchParams.get('distance') || '50';

  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    async function fetchVendors() {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (category) params.set('category', category);
        params.set('limit', '50');

        const response = await fetch(`/api/public/vendors?${params.toString()}`);
        const data: SearchResponse = await response.json();

        if (data.success) {
          setVendors(data.data.vendors);
          setTotal(data.data.pagination.total);
        }
      } catch (error) {
        console.error('Failed to fetch vendors:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchVendors();
  }, [category]);

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
              <span className="bg-white/20 px-3 py-1 rounded-full">
                Postcode: {postcode}
              </span>
            )}
            {category && (
              <span className="bg-white/20 px-3 py-1 rounded-full">
                Category: {CATEGORY_LABELS[category]}
              </span>
            )}
            <span className="bg-white/20 px-3 py-1 rounded-full">
              Distance: {distance} miles
            </span>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12">
              <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Finding suppliers...</p>
            </div>
          ) : vendors.length > 0 ? (
            <>
              <div className="flex justify-between items-center mb-6">
                <p className="text-gray-600">
                  Found <strong>{total}</strong> supplier{total !== 1 ? 's' : ''}
                  {category && ` in ${CATEGORY_LABELS[category]}`}
                </p>
                <Link
                  href="/suppliers"
                  className="text-purple-600 hover:text-purple-700 font-medium"
                >
                  View all categories
                </Link>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vendors.map((vendor) => (
                  <Link
                    key={vendor.id}
                    href={`/suppliers/profile/${vendor.id}`}
                    className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-bold text-gray-900 text-lg">{vendor.company}</h3>
                      {vendor.tier !== 'free' && (
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          vendor.tier === 'verified'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-purple-100 text-purple-700'
                        }`}>
                          {vendor.tier === 'verified' ? 'Verified' : 'Visible'}
                        </span>
                      )}
                    </div>

                    {vendor.description && (
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {vendor.description}
                      </p>
                    )}

                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {vendor.services.slice(0, 3).map((service, idx) => (
                        <span
                          key={idx}
                          className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                        >
                          {service}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>
                        {vendor.location.city || vendor.location.region || 'UK'}
                      </span>
                      {vendor.productCount > 0 && (
                        <span>{vendor.productCount} products</span>
                      )}
                    </div>

                    {vendor.rating > 0 && (
                      <div className="flex items-center gap-1 mt-2">
                        <span className="text-yellow-500">★</span>
                        <span className="text-sm font-medium">{vendor.rating.toFixed(1)}</span>
                        <span className="text-xs text-gray-400">({vendor.reviewCount})</span>
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">No suppliers found</h2>
              <p className="text-gray-600 mb-6">
                We couldn&apos;t find any suppliers matching your search.
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
      {vendors.length > 0 && (
        <section className="py-12 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Refine Your Search
            </h2>
            <p className="text-gray-600 mb-6">
              Browse suppliers by category or location to find the perfect match.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Link
                href="/suppliers/photocopiers"
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Photocopiers
              </Link>
              <Link
                href="/suppliers/telecoms"
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Telecoms
              </Link>
              <Link
                href="/suppliers/cctv"
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                CCTV
              </Link>
              <Link
                href="/suppliers/it-services"
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                IT Services
              </Link>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
