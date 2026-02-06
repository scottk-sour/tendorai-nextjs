'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import { hasTierAccess } from '@/app/components/dashboard/TierGate';

interface Product {
  _id: string;
  manufacturer: string;
  model: string;
  description?: string;
  category: string;
  speed?: number;
  isA3?: boolean;
  isColour?: boolean;
  features?: string[];
  minVolume?: number;
  maxVolume?: number;
  costs?: {
    machineCost?: number;
    installation?: number;
    profitMargin?: number;
    totalMachineCost?: number;
    cpcRates?: {
      A4Mono?: number;
      A4Colour?: number;
      A3Mono?: number;
      A3Colour?: number;
    };
  };
  leaseRates?: {
    term36?: number;
    term48?: number;
    term60?: number;
  };
  service?: {
    level?: string;
    responseTime?: string;
    quarterlyService?: number;
    includesToner?: boolean;
    includesPartsLabour?: boolean;
  };
  status: string;
}

interface ProductFormData {
  manufacturer: string;
  model: string;
  description: string;
  category: string;
  speed: number;
  isA3: boolean;
  isColour: boolean;
  features: string[];
  minVolume: number;
  maxVolume: number;
  machineCost: number;
  installation: number;
  profitMargin: number;
  cpcA4Mono: number;
  cpcA4Colour: number;
  cpcA3Mono: number;
  cpcA3Colour: number;
  lease36: number;
  lease48: number;
  lease60: number;
  serviceLevel: string;
  responseTime: string;
  quarterlyService: number;
  includesToner: boolean;
  includesPartsLabour: boolean;
}

const MANUFACTURERS = [
  'Canon', 'Konica Minolta', 'Xerox', 'Sharp', 'Ricoh', 'Brother',
  'Lexmark', 'HP', 'Epson', 'Kyocera', 'Develop', 'Toshiba', 'Other'
];

const CATEGORIES = [
  { value: 'A4 Printers', label: 'A4 Printers' },
  { value: 'A4 MFP', label: 'A4 MFP (Multifunction)' },
  { value: 'A3 MFP', label: 'A3 MFP (Multifunction)' },
  { value: 'SRA3 MFP', label: 'SRA3 MFP (Production)' },
];

const FEATURES = [
  'Scanning', 'Duplex', 'Stapling', 'Booklet Finisher',
  'Hole Punch', 'Fax', 'Wi-Fi', 'Cloud Print', 'Mobile Print',
  'OCR', 'Document Management', 'Secure Print'
];

const SERVICE_LEVELS = ['Basic', 'Standard', 'Premium'];
const RESPONSE_TIMES = ['4hr', '8hr', 'Next day'];

const API_URL = process.env.NEXT_PUBLIC_EXPRESS_BACKEND_URL ||
                'https://ai-procurement-backend-q35u.onrender.com';

const emptyFormData: ProductFormData = {
  manufacturer: '',
  model: '',
  description: '',
  category: 'A3 MFP',
  speed: 30,
  isA3: true,
  isColour: true,
  features: [],
  minVolume: 5000,
  maxVolume: 20000,
  machineCost: 2000,
  installation: 250,
  profitMargin: 250,
  cpcA4Mono: 0.005,
  cpcA4Colour: 0.045,
  cpcA3Mono: 0.007,
  cpcA3Colour: 0.065,
  lease36: 150,
  lease48: 120,
  lease60: 100,
  serviceLevel: 'Standard',
  responseTime: '8hr',
  quarterlyService: 75,
  includesToner: true,
  includesPartsLabour: true,
};

export default function ProductsPage() {
  const { getCurrentToken } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [tier, setTier] = useState('free');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<ProductFormData>(emptyFormData);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    const token = getCurrentToken();
    if (!token) return;

    setLoading(true);
    try {
      const [productsRes, profileRes] = await Promise.all([
        fetch(`${API_URL}/api/vendors/products`, {
          headers: { 'Authorization': `Bearer ${token}` },
        }),
        fetch(`${API_URL}/api/vendors/profile`, {
          headers: { 'Authorization': `Bearer ${token}` },
        }),
      ]);

      if (productsRes.ok) {
        const data = await productsRes.json();
        setProducts(data.data || data.products || []);
      }

      if (profileRes.ok) {
        const profileData = await profileRes.json();
        setTier(profileData.vendor?.tier || 'free');
      }
    } catch (err) {
      console.error('Failed to fetch products:', err);
    } finally {
      setLoading(false);
    }
  }, [getCurrentToken]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Tier-aware product limits: free=3, visible=10, verified=unlimited
  const getProductLimit = (t: string) => {
    const normalized = t?.toLowerCase() || 'free';
    if (['verified', 'managed'].includes(normalized)) return Infinity;
    if (['visible', 'basic'].includes(normalized)) return 10;
    return 3;
  };
  const productLimit = getProductLimit(tier);
  const hasReachedLimit = productLimit !== Infinity && products.length >= productLimit;
  const productsRemaining = productLimit === Infinity ? null : productLimit - products.length;

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

  // Open modal for new product
  const handleAddProduct = () => {
    if (hasReachedLimit) return;
    setEditingProduct(null);
    setFormData(emptyFormData);
    setError(null);
    setSuccess(null);
    setShowModal(true);
  };

  // Open modal for editing
  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      manufacturer: product.manufacturer || '',
      model: product.model || '',
      description: product.description || '',
      category: product.category || 'A3 MFP',
      speed: product.speed || 30,
      isA3: product.isA3 ?? true,
      isColour: product.isColour ?? true,
      features: product.features || [],
      minVolume: product.minVolume || 5000,
      maxVolume: product.maxVolume || 20000,
      machineCost: product.costs?.machineCost || 2000,
      installation: product.costs?.installation || 250,
      profitMargin: product.costs?.profitMargin || 250,
      cpcA4Mono: product.costs?.cpcRates?.A4Mono || 0.005,
      cpcA4Colour: product.costs?.cpcRates?.A4Colour || 0.045,
      cpcA3Mono: product.costs?.cpcRates?.A3Mono || 0.007,
      cpcA3Colour: product.costs?.cpcRates?.A3Colour || 0.065,
      lease36: product.leaseRates?.term36 || 150,
      lease48: product.leaseRates?.term48 || 120,
      lease60: product.leaseRates?.term60 || 100,
      serviceLevel: product.service?.level || 'Standard',
      responseTime: product.service?.responseTime || '8hr',
      quarterlyService: product.service?.quarterlyService || 75,
      includesToner: product.service?.includesToner ?? true,
      includesPartsLabour: product.service?.includesPartsLabour ?? true,
    });
    setError(null);
    setSuccess(null);
    setShowModal(true);
  };

  // Toggle product status
  const handleToggleStatus = async (product: Product) => {
    const token = getCurrentToken();
    if (!token) return;

    const newStatus = product.status === 'active' ? 'inactive' : 'active';

    try {
      const response = await fetch(`${API_URL}/api/vendors/products/${product._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        fetchProducts();
        setSuccess(`Product ${newStatus === 'active' ? 'activated' : 'deactivated'}`);
        setTimeout(() => setSuccess(null), 3000);
      }
    } catch (err) {
      console.error('Failed to toggle status:', err);
    }
  };

  // Handle form input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'number') {
      setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Handle feature toggle
  const handleFeatureToggle = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature],
    }));
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = getCurrentToken();
    if (!token) return;

    // Validate required fields
    if (!formData.manufacturer || !formData.model || !formData.category) {
      setError('Manufacturer, model, and category are required');
      return;
    }

    setSaving(true);
    setError(null);

    // Build product data matching backend schema
    const productData = {
      manufacturer: formData.manufacturer,
      model: formData.model,
      description: formData.description,
      category: formData.category,
      speed: formData.speed,
      isA3: formData.isA3,
      isColour: formData.isColour,
      features: formData.features,
      minVolume: formData.minVolume,
      maxVolume: formData.maxVolume,
      paperSizes: {
        primary: formData.isA3 ? 'A3' : 'A4',
        supported: formData.isA3 ? ['A3', 'A4'] : ['A4'],
      },
      costs: {
        machineCost: formData.machineCost,
        installation: formData.installation,
        profitMargin: formData.profitMargin,
        totalMachineCost: formData.machineCost + formData.installation + formData.profitMargin,
        cpcRates: {
          A4Mono: formData.cpcA4Mono,
          A4Colour: formData.cpcA4Colour,
          A3Mono: formData.cpcA3Mono,
          A3Colour: formData.cpcA3Colour,
        },
      },
      leaseRates: {
        term36: formData.lease36,
        term48: formData.lease48,
        term60: formData.lease60,
      },
      service: {
        level: formData.serviceLevel,
        responseTime: formData.responseTime,
        quarterlyService: formData.quarterlyService,
        includesToner: formData.includesToner,
        includesPartsLabour: formData.includesPartsLabour,
      },
      status: 'active',
    };

    try {
      const url = editingProduct
        ? `${API_URL}/api/vendors/products/${editingProduct._id}`
        : `${API_URL}/api/vendors/products`;

      const method = editingProduct ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
      });

      const data = await response.json();

      if (response.ok) {
        setShowModal(false);
        fetchProducts();
        const slots = data.remainingSlots;
        const slotsMsg = slots !== null && slots !== undefined ? ` (${slots} slot${slots !== 1 ? 's' : ''} remaining)` : '';
        setSuccess((editingProduct ? 'Product updated successfully' : 'Product created successfully') + slotsMsg);
        setTimeout(() => setSuccess(null), 5000);
      } else if (response.status === 403) {
        setError(data.message || 'Product limit reached. Upgrade your plan to add more products.');
      } else {
        setError(data.message || data.errors?.join(', ') || 'Failed to save product');
      }
    } catch (err) {
      console.error('Failed to save product:', err);
      setError('Failed to save product. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  // Delete product
  const handleDeleteProduct = async (product: Product) => {
    if (!confirm(`Are you sure you want to delete "${product.manufacturer} ${product.model}"?`)) {
      return;
    }

    const token = getCurrentToken();
    if (!token) return;

    try {
      const response = await fetch(`${API_URL}/api/vendors/products/${product._id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (response.ok) {
        fetchProducts();
        setSuccess('Product deleted');
        setTimeout(() => setSuccess(null), 3000);
      }
    } catch (err) {
      console.error('Failed to delete product:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Success/Error Messages */}
      {success && (
        <div className="p-4 bg-green-50 text-green-700 rounded-lg">{success}</div>
      )}

      {/* Tier Limit Warning */}
      {productLimit !== Infinity && (
        <div className={`p-4 rounded-lg ${hasReachedLimit ? 'bg-amber-50 border border-amber-200' : 'bg-blue-50 border border-blue-200'}`}>
          <div className="flex items-center justify-between">
            <div>
              {hasReachedLimit ? (
                <>
                  <p className="font-medium text-amber-800">Product limit reached ({productLimit} products)</p>
                  <p className="text-sm text-amber-600">
                    You&apos;ve used all {productLimit} product slots on your current plan. Upgrade to add more products.
                  </p>
                </>
              ) : (
                <>
                  <p className="font-medium text-blue-800">{productsRemaining} product slot{productsRemaining !== 1 ? 's' : ''} remaining</p>
                  <p className="text-sm text-blue-600">
                    {!hasTierAccess(tier, 'visible')
                      ? 'Upgrade to Visible for up to 10 products and AI visibility insights.'
                      : 'Upgrade to Verified for unlimited products and maximum AI ranking.'}
                  </p>
                </>
              )}
            </div>
            <Link
              href="/vendor-dashboard/settings?tab=subscription"
              className="btn-primary py-2 px-4 text-sm whitespace-nowrap"
            >
              Upgrade Now
            </Link>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600 mt-1">Manage your product catalog</p>
        </div>
        <button
          onClick={handleAddProduct}
          disabled={hasReachedLimit}
          className={`btn-primary py-2 px-4 ${hasReachedLimit ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
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
              <button onClick={handleAddProduct} className="btn-primary py-2 px-4 mt-4">
                Add Your First Product
              </button>
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
                <button
                  onClick={() => handleToggleStatus(product)}
                  className={`px-2 py-0.5 text-xs font-medium rounded-full cursor-pointer transition-colors ${
                    product.status === 'active'
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {product.status || 'active'}
                </button>
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
                {product.costs?.totalMachineCost && (
                  <div className="flex justify-between">
                    <span>Machine Cost:</span>
                    <span className="font-medium">£{product.costs.totalMachineCost.toLocaleString()}</span>
                  </div>
                )}
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => handleEditProduct(product)}
                  className="flex-1 btn-secondary py-1.5 text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteProduct(product)}
                  className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Product Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black/50" onClick={() => setShowModal(false)} />
          <div className="flex min-h-full items-start justify-center p-4 pt-16">
            <div className="relative bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[calc(100vh-8rem)] overflow-y-auto">
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between z-10">
                <h2 className="text-xl font-semibold text-gray-900">
                  {editingProduct ? 'Edit Product' : 'Add Product'}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Modal Body */}
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {error && (
                  <div className="p-4 bg-red-50 text-red-700 rounded-lg">{error}</div>
                )}

                {/* Basic Info */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Manufacturer <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="manufacturer"
                        value={formData.manufacturer}
                        onChange={handleInputChange}
                        className="input"
                        required
                      >
                        <option value="">Select manufacturer</option>
                        {MANUFACTURERS.map(m => (
                          <option key={m} value={m}>{m}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Model <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="model"
                        value={formData.model}
                        onChange={handleInputChange}
                        className="input"
                        placeholder="e.g. iR-ADV C5535i"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="input"
                        required
                      >
                        {CATEGORIES.map(c => (
                          <option key={c.value} value={c.value}>{c.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Speed (ppm)
                      </label>
                      <input
                        type="number"
                        name="speed"
                        value={formData.speed}
                        onChange={handleInputChange}
                        className="input"
                        min="1"
                        max="200"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="input"
                      rows={2}
                      placeholder="Brief description of the product..."
                    />
                  </div>
                  <div className="mt-4 flex gap-6">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="isColour"
                        checked={formData.isColour}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-purple-600 rounded"
                      />
                      <span className="text-sm text-gray-700">Colour capable</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="isA3"
                        checked={formData.isA3}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-purple-600 rounded"
                      />
                      <span className="text-sm text-gray-700">A3 capable</span>
                    </label>
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Features</h3>
                  <div className="flex flex-wrap gap-2">
                    {FEATURES.map(feature => (
                      <button
                        key={feature}
                        type="button"
                        onClick={() => handleFeatureToggle(feature)}
                        className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                          formData.features.includes(feature)
                            ? 'bg-purple-100 border-purple-300 text-purple-700'
                            : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {feature}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Volume Range */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Volume Range (pages/month)</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Minimum Volume
                      </label>
                      <input
                        type="number"
                        name="minVolume"
                        value={formData.minVolume}
                        onChange={handleInputChange}
                        className="input"
                        min="0"
                        step="1000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Maximum Volume
                      </label>
                      <input
                        type="number"
                        name="maxVolume"
                        value={formData.maxVolume}
                        onChange={handleInputChange}
                        className="input"
                        min="0"
                        step="1000"
                      />
                    </div>
                  </div>
                </div>

                {/* Machine Costs */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Machine Costs (£)</h3>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Machine Cost
                      </label>
                      <input
                        type="number"
                        name="machineCost"
                        value={formData.machineCost}
                        onChange={handleInputChange}
                        className="input"
                        min="0"
                        step="100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Installation
                      </label>
                      <input
                        type="number"
                        name="installation"
                        value={formData.installation}
                        onChange={handleInputChange}
                        className="input"
                        min="0"
                        step="50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Profit Margin
                      </label>
                      <input
                        type="number"
                        name="profitMargin"
                        value={formData.profitMargin}
                        onChange={handleInputChange}
                        className="input"
                        min="0"
                        step="50"
                      />
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Total: £{(formData.machineCost + formData.installation + formData.profitMargin).toLocaleString()}
                  </p>
                </div>

                {/* CPC Rates */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">CPC Rates (£ per click)</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        A4 Mono
                      </label>
                      <input
                        type="number"
                        name="cpcA4Mono"
                        value={formData.cpcA4Mono}
                        onChange={handleInputChange}
                        className="input"
                        min="0"
                        step="0.001"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        A4 Colour
                      </label>
                      <input
                        type="number"
                        name="cpcA4Colour"
                        value={formData.cpcA4Colour}
                        onChange={handleInputChange}
                        className="input"
                        min="0"
                        step="0.001"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        A3 Mono
                      </label>
                      <input
                        type="number"
                        name="cpcA3Mono"
                        value={formData.cpcA3Mono}
                        onChange={handleInputChange}
                        className="input"
                        min="0"
                        step="0.001"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        A3 Colour
                      </label>
                      <input
                        type="number"
                        name="cpcA3Colour"
                        value={formData.cpcA3Colour}
                        onChange={handleInputChange}
                        className="input"
                        min="0"
                        step="0.001"
                      />
                    </div>
                  </div>
                </div>

                {/* Lease Rates */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Quarterly Lease Rates (£)</h3>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        36 months
                      </label>
                      <input
                        type="number"
                        name="lease36"
                        value={formData.lease36}
                        onChange={handleInputChange}
                        className="input"
                        min="0"
                        step="10"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        48 months
                      </label>
                      <input
                        type="number"
                        name="lease48"
                        value={formData.lease48}
                        onChange={handleInputChange}
                        className="input"
                        min="0"
                        step="10"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        60 months
                      </label>
                      <input
                        type="number"
                        name="lease60"
                        value={formData.lease60}
                        onChange={handleInputChange}
                        className="input"
                        min="0"
                        step="10"
                      />
                    </div>
                  </div>
                </div>

                {/* Service */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Service Details</h3>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Service Level
                      </label>
                      <select
                        name="serviceLevel"
                        value={formData.serviceLevel}
                        onChange={handleInputChange}
                        className="input"
                      >
                        {SERVICE_LEVELS.map(level => (
                          <option key={level} value={level}>{level}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Response Time
                      </label>
                      <select
                        name="responseTime"
                        value={formData.responseTime}
                        onChange={handleInputChange}
                        className="input"
                      >
                        {RESPONSE_TIMES.map(time => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Quarterly Service (£)
                      </label>
                      <input
                        type="number"
                        name="quarterlyService"
                        value={formData.quarterlyService}
                        onChange={handleInputChange}
                        className="input"
                        min="0"
                        step="10"
                      />
                    </div>
                  </div>
                  <div className="mt-4 flex gap-6">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="includesToner"
                        checked={formData.includesToner}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-purple-600 rounded"
                      />
                      <span className="text-sm text-gray-700">Includes toner</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="includesPartsLabour"
                        checked={formData.includesPartsLabour}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-purple-600 rounded"
                      />
                      <span className="text-sm text-gray-700">Includes parts &amp; labour</span>
                    </label>
                  </div>
                </div>

                {/* Submit */}
                <div className="flex gap-3 justify-end pt-4 border-t">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="btn-secondary py-2 px-4"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="btn-primary py-2 px-6 disabled:opacity-50"
                  >
                    {saving ? 'Saving...' : editingProduct ? 'Update Product' : 'Add Product'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
