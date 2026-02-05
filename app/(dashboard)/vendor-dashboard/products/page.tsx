'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/app/contexts/AuthContext';

interface Product {
  _id: string;
  manufacturer: string;
  model: string;
  category: string;
  speed?: number;
  minVolume?: number;
  maxVolume?: number;
  costs?: {
    cpcRates?: {
      A4Mono?: number;
      A4Colour?: number;
    };
  };
  status: string;
}

const API_URL = process.env.NEXT_PUBLIC_EXPRESS_BACKEND_URL ||
                'https://ai-procurement-backend-q35u.onrender.com';

export default function ProductsPage() {
  const { getCurrentToken } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const fetchProducts = useCallback(async () => {
    const token = getCurrentToken();
    if (!token) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/vendors/products`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setProducts(data.data || data.products || []);
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  }, [getCurrentToken]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Get unique categories
  const categories = [...new Set(products.map((p) => p.category))].filter(Boolean);

  // Filter and search
  const filteredProducts = products.filter((product) => {
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    const matchesSearch =
      !searchTerm ||
      product.manufacturer?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.model?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600 mt-1">Manage your product catalog</p>
        </div>
        <button className="btn-primary py-2 px-4">
          <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="card p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input"
            />
          </div>
          {categories.length > 0 && (
            <div>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="input w-full sm:w-48"
              >
                <option value="all">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold text-gray-900">{products.length}</div>
          <div className="text-sm text-gray-500">Total Products</div>
        </div>
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold text-green-600">
            {products.filter((p) => p.status === 'active').length}
          </div>
          <div className="text-sm text-gray-500">Active</div>
        </div>
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold text-gray-600">
            {products.filter((p) => p.status !== 'active').length}
          </div>
          <div className="text-sm text-gray-500">Inactive</div>
        </div>
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">{categories.length}</div>
          <div className="text-sm text-gray-500">Categories</div>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="card p-8 text-center text-gray-500">
          <svg className="w-12 h-12 mx-auto text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          {searchTerm || filterCategory !== 'all' ? (
            <p>No products match your search</p>
          ) : (
            <>
              <p>No products yet</p>
              <p className="text-sm mt-1">Add products to your catalog to get started</p>
            </>
          )}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <div key={product._id} className="card-hover p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">
                    {product.manufacturer} {product.model}
                  </h3>
                  <p className="text-sm text-gray-500">{product.category}</p>
                </div>
                <span
                  className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                    product.status === 'active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {product.status || 'active'}
                </span>
              </div>

              <div className="mt-3 space-y-1 text-sm text-gray-600">
                {product.speed && (
                  <div className="flex justify-between">
                    <span>Speed:</span>
                    <span className="font-medium">{product.speed} ppm</span>
                  </div>
                )}
                {product.minVolume && product.maxVolume && (
                  <div className="flex justify-between">
                    <span>Volume:</span>
                    <span className="font-medium">
                      {product.minVolume.toLocaleString()} - {product.maxVolume.toLocaleString()}
                    </span>
                  </div>
                )}
                {product.costs?.cpcRates?.A4Mono && (
                  <div className="flex justify-between">
                    <span>Mono CPC:</span>
                    <span className="font-medium">£{product.costs.cpcRates.A4Mono.toFixed(4)}</span>
                  </div>
                )}
              </div>

              <div className="mt-4 flex gap-2">
                <button className="flex-1 btn-secondary py-1.5 text-sm">Edit</button>
                <button className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
