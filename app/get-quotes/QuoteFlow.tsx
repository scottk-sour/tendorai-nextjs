'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

// Types
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
  brands?: string[];
  yearsInBusiness?: number;
  accreditations?: string[];
  website?: string;
  showPricing: boolean;
}

interface Product {
  id: string;
  vendorId: string;
  vendorName: string;
  manufacturer: string;
  model: string;
  category: string;
  speed: number;
  isA3: boolean;
  features: string[];
  minVolume: number;
  maxVolume: number;
  costs?: {
    cpcRates: {
      A4Mono: number;
      A4Colour: number;
      A3Mono?: number;
      A3Colour?: number;
    };
  };
  leaseRates?: {
    term36?: number;
    term48?: number;
    term60?: number;
  };
  matchScore?: number;
  savings?: {
    annual: number;
    percentage: number;
    formatted: string;
  };
}

interface FormData {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  postcode: string;
  message: string;
  timeline: string;
}

interface FormErrors {
  companyName?: string;
  contactName?: string;
  email?: string;
  phone?: string;
  postcode?: string;
}

// Constants
const CATEGORIES = [
  { value: 'photocopiers', label: 'Photocopiers & Printers', icon: '🖨️' },
  { value: 'telecoms', label: 'Telecoms & Phone Systems', icon: '📞' },
  { value: 'cctv', label: 'CCTV & Security', icon: '📹' },
  { value: 'it-services', label: 'IT Services', icon: '💻' },
];

const VOLUME_OPTIONS = [
  { value: '3000', label: 'Up to 3,000 pages/month', range: '0-6k' },
  { value: '10000', label: '3,000 - 10,000 pages/month', range: '6k-13k' },
  { value: '20000', label: '10,000 - 20,000 pages/month', range: '13k-20k' },
  { value: '35000', label: '20,000 - 35,000 pages/month', range: '20k-40k' },
  { value: '50000', label: '35,000+ pages/month', range: '40k+' },
];

const STAGES = [
  { id: 1, name: 'Browse', description: 'View supplier directory' },
  { id: 2, name: 'Filter', description: 'Refine your search' },
  { id: 3, name: 'Compare', description: 'View products & pricing' },
  { id: 4, name: 'Quote', description: 'Get personalised quotes' },
];

const BACKEND_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://ai-procurement-backend-q35u.onrender.com';

export default function QuoteFlow() {
  // Stage management
  const [currentStage, setCurrentStage] = useState(1);
  const [maxUnlockedStage, setMaxUnlockedStage] = useState(1);

  // Filters
  const [category, setCategory] = useState('');
  const [postcode, setPostcode] = useState('');
  const [monthlyVolume, setMonthlyVolume] = useState('');
  const [needsColour, setNeedsColour] = useState<boolean | null>(null);
  const [needsA3, setNeedsA3] = useState<boolean | null>(null);

  // Data
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedVendors, setSelectedVendors] = useState<string[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  // Loading/error states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mobile sidebar
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Quote form
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    postcode: '',
    message: '',
    timeline: 'soon',
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  // Fetch vendors
  const fetchVendors = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      if (category) params.set('category', category);
      params.set('limit', '50');

      const response = await fetch(`/api/public/vendors?${params.toString()}`);
      const data = await response.json();

      if (data.success) {
        setVendors(data.data.vendors);
      } else {
        setError('Failed to load suppliers');
      }
    } catch (err) {
      console.error('Failed to fetch vendors:', err);
      setError('Failed to load suppliers. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [category]);

  // Fetch products via AI query
  const fetchProducts = useCallback(async () => {
    if (!category || category !== 'photocopiers') {
      setProducts([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Build query string for AI
      let query = 'photocopier';
      if (monthlyVolume) {
        query += ` ${parseInt(monthlyVolume).toLocaleString()} pages per month`;
      }
      if (needsColour === true) query += ' colour';
      if (needsColour === false) query += ' mono only';
      if (needsA3 === true) query += ' A3';
      if (needsA3 === false) query += ' A4';

      const response = await fetch(`${BACKEND_URL}/api/ai-query`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query,
          postcode: postcode || undefined,
          limit: 20,
        }),
      });
      const data = await response.json();

      if (data.success && data.vendors) {
        const formattedProducts: Product[] = data.vendors.map(
          (vendor: {
            id: string;
            company: string;
            product: {
              name: string;
              category: string;
              speed: number;
              isA3: boolean;
              isColour?: boolean;
              features: string[];
            };
            pricing?: {
              cpcMono?: string;
              cpcColour?: string;
              estimatedMonthly?: string;
              breakdown?: {
                lease?: string;
                cpc?: string;
                service?: string;
              };
            };
            matchScore: number;
            savings?: {
              annual: number;
              percentage: number;
              formatted: string;
            };
          }) => {
            // Parse product name into manufacturer and model
            const productNameParts = vendor.product.name.split(' ');
            const manufacturer = productNameParts[0];
            const model = productNameParts.slice(1).join(' ');

            // Parse CPC rates from strings like "0.5p"
            const parseCpc = (cpc?: string) => cpc ? parseFloat(cpc.replace('p', '')) : 0;

            return {
              id: `${vendor.id}-${vendor.product.name.replace(/\s+/g, '-')}`,
              vendorId: vendor.id,
              vendorName: vendor.company,
              manufacturer,
              model,
              category: vendor.product.category,
              speed: vendor.product.speed,
              isA3: vendor.product.isA3,
              features: vendor.product.features || [],
              minVolume: 0,
              maxVolume: 0,
              costs: {
                cpcRates: {
                  A4Mono: parseCpc(vendor.pricing?.cpcMono),
                  A4Colour: parseCpc(vendor.pricing?.cpcColour),
                },
              },
              leaseRates: vendor.pricing?.breakdown?.lease ? {
                term48: parseFloat(vendor.pricing.breakdown.lease.replace('£', '')) * 3,
              } : undefined,
              matchScore: vendor.matchScore,
              savings: vendor.savings,
            };
          }
        );
        setProducts(formattedProducts);
      } else {
        setProducts([]);
      }
    } catch (err) {
      console.error('Failed to fetch products:', err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [category, postcode, monthlyVolume, needsColour, needsA3]);

  // Effects
  useEffect(() => {
    fetchVendors();
  }, [fetchVendors]);

  useEffect(() => {
    if (currentStage >= 3 && category === 'photocopiers') {
      fetchProducts();
    }
  }, [currentStage, fetchProducts, category]);

  // Stage progression
  useEffect(() => {
    // Unlock stage 2 when category is selected
    if (category && maxUnlockedStage < 2) {
      setMaxUnlockedStage(2);
    }

    // Unlock stage 3 when we have filters
    if (category && (postcode || monthlyVolume) && maxUnlockedStage < 3) {
      setMaxUnlockedStage(3);
    }

    // Unlock stage 4 when products are selected or at stage 3
    if (currentStage >= 3 && maxUnlockedStage < 4) {
      setMaxUnlockedStage(4);
    }
  }, [category, postcode, monthlyVolume, currentStage, maxUnlockedStage]);

  // Handlers
  const handleCategorySelect = (cat: string) => {
    setCategory(cat);
    setCurrentStage(2);
    setSidebarOpen(false);
  };

  const handleApplyFilters = () => {
    setCurrentStage(3);
    setSidebarOpen(false);
  };

  const handleVendorSelect = (vendorId: string) => {
    setSelectedVendors((prev) =>
      prev.includes(vendorId) ? prev.filter((id) => id !== vendorId) : [...prev, vendorId]
    );
  };

  const handleProductSelect = (productId: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const validatePostcode = (pc: string) => {
    return /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i.test(pc.trim());
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {};

    if (!formData.companyName.trim()) {
      errors.companyName = 'Company name is required';
    }
    if (!formData.contactName.trim()) {
      errors.contactName = 'Contact name is required';
    }
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email';
    }
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^[\d\s+()-]{10,}$/.test(formData.phone)) {
      errors.phone = 'Please enter a valid phone number';
    }
    if (formData.postcode && !validatePostcode(formData.postcode)) {
      errors.postcode = 'Please enter a valid UK postcode';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmitQuote = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setFormSubmitting(true);

    try {
      // Get selected vendors from products if any selected
      const vendorIds =
        selectedProducts.length > 0
          ? [...new Set(products.filter((p) => selectedProducts.includes(p.id)).map((p) => p.vendorId))]
          : selectedVendors.length > 0
            ? selectedVendors
            : vendors.slice(0, 3).map((v) => v.id);

      // Submit lead to each vendor
      for (const vendorId of vendorIds) {
        await fetch(`${BACKEND_URL}/api/vendor-leads`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            vendorId,
            service: category === 'photocopiers' ? 'Photocopiers' : category,
            companyName: formData.companyName.trim(),
            contactName: formData.contactName.trim(),
            email: formData.email.trim().toLowerCase(),
            phone: formData.phone.trim(),
            postcode: formData.postcode.trim().toUpperCase() || postcode || undefined,
            message: formData.message.trim() || undefined,
            timeline: formData.timeline,
            monthlyVolume: monthlyVolume || undefined,
            requirements: {
              needsColour,
              needsA3,
              selectedProducts: selectedProducts,
            },
            source: {
              page: 'get-quotes',
              referrer: 'tendorai-nextjs',
              utm: {
                source: 'tendorai',
                medium: 'website',
                campaign: 'quote-flow',
              },
            },
          }),
        });
      }

      setFormSubmitted(true);
    } catch (err) {
      console.error('Failed to submit quote:', err);
      setError('Failed to submit quote. Please try again.');
    } finally {
      setFormSubmitting(false);
    }
  };

  // Render functions
  const renderStageIndicator = () => (
    <div className="flex items-center justify-between mb-6 overflow-x-auto pb-2">
      {STAGES.map((stage, index) => (
        <div key={stage.id} className="flex items-center">
          <button
            onClick={() => stage.id <= maxUnlockedStage && setCurrentStage(stage.id)}
            disabled={stage.id > maxUnlockedStage}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all whitespace-nowrap ${
              currentStage === stage.id
                ? 'bg-purple-600 text-white'
                : stage.id <= maxUnlockedStage
                  ? 'bg-purple-100 text-purple-700 hover:bg-purple-200 cursor-pointer'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                currentStage === stage.id
                  ? 'bg-white text-purple-600'
                  : stage.id < currentStage
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-300 text-gray-600'
              }`}
            >
              {stage.id < currentStage ? '✓' : stage.id}
            </span>
            <span className="hidden sm:inline font-medium">{stage.name}</span>
          </button>
          {index < STAGES.length - 1 && (
            <div
              className={`w-8 h-0.5 mx-1 ${
                stage.id < currentStage ? 'bg-green-500' : 'bg-gray-200'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );

  const renderSidebar = () => (
    <div
      className={`
      fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-xl transform transition-transform duration-300 lg:relative lg:transform-none lg:shadow-none lg:z-auto
      ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
    `}
    >
      <div className="h-full overflow-y-auto p-6 pt-20 lg:pt-6">
        {/* Mobile close button */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Category Selection */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
            Category
          </h3>
          <div className="space-y-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => handleCategorySelect(cat.value)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                  category === cat.value
                    ? 'bg-purple-100 text-purple-700 ring-2 ring-purple-500'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="text-xl">{cat.icon}</span>
                <span className="font-medium">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Postcode Filter */}
        {category && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
              Your Location
            </h3>
            <input
              type="text"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value.toUpperCase())}
              placeholder="Enter postcode (e.g., CF10 1AA)"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              maxLength={10}
            />
            {postcode && !validatePostcode(postcode) && (
              <p className="mt-1 text-sm text-amber-600">Enter a valid UK postcode</p>
            )}
          </div>
        )}

        {/* Photocopier-specific filters */}
        {category === 'photocopiers' && (
          <>
            {/* Monthly Volume */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
                Monthly Print Volume
              </h3>
              <div className="space-y-2">
                {VOLUME_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setMonthlyVolume(monthlyVolume === opt.value ? '' : opt.value)}
                    className={`w-full px-4 py-2 rounded-lg text-left text-sm transition-all ${
                      monthlyVolume === opt.value
                        ? 'bg-purple-100 text-purple-700 ring-2 ring-purple-500'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Colour Toggle */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
                Colour Printing
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setNeedsColour(needsColour === true ? null : true)}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    needsColour === true
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Yes
                </button>
                <button
                  onClick={() => setNeedsColour(needsColour === false ? null : false)}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    needsColour === false
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  No (Mono)
                </button>
              </div>
            </div>

            {/* A3 Toggle */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
                Paper Size
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setNeedsA3(needsA3 === true ? null : true)}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    needsA3 === true
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  A3
                </button>
                <button
                  onClick={() => setNeedsA3(needsA3 === false ? null : false)}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    needsA3 === false
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  A4 Only
                </button>
              </div>
            </div>
          </>
        )}

        {/* Apply Filters Button */}
        {category && currentStage < 3 && (
          <button
            onClick={handleApplyFilters}
            className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
          >
            View Matching Products
          </button>
        )}

        {/* Selected count */}
        {(selectedVendors.length > 0 || selectedProducts.length > 0) && (
          <div className="mt-6 p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-green-700 font-medium">
              {selectedProducts.length > 0 && `${selectedProducts.length} product(s) selected`}
              {selectedVendors.length > 0 && `${selectedVendors.length} supplier(s) selected`}
            </p>
            <button
              onClick={() => {
                setCurrentStage(4);
                setShowQuoteForm(true);
              }}
              className="mt-2 w-full py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
            >
              Get Quotes Now
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const renderVendorCard = (vendor: Vendor) => {
    const isSelected = selectedVendors.includes(vendor.id);
    const showDetails = currentStage >= 2;
    const showFullDetails = currentStage >= 3 || vendor.tier !== 'free';

    return (
      <div
        key={vendor.id}
        className={`bg-white rounded-xl p-5 border transition-all ${
          isSelected
            ? 'border-purple-500 ring-2 ring-purple-200'
            : 'border-gray-100 hover:border-purple-200'
        }`}
      >
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-bold text-gray-900 text-lg">{vendor.company}</h3>
            {showDetails && vendor.location.city && (
              <p className="text-sm text-gray-500">{vendor.location.city}</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            {vendor.tier !== 'free' && (
              <span
                className={`text-xs px-2 py-1 rounded-full font-medium ${
                  vendor.tier === 'verified'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-purple-100 text-purple-700'
                }`}
              >
                {vendor.tier === 'verified' ? 'Verified' : 'Visible'}
              </span>
            )}
            <button
              onClick={() => handleVendorSelect(vendor.id)}
              className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                isSelected
                  ? 'bg-purple-600 border-purple-600 text-white'
                  : 'border-gray-300 hover:border-purple-400'
              }`}
            >
              {isSelected && <span className="text-sm">✓</span>}
            </button>
          </div>
        </div>

        {vendor.description && showDetails && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{vendor.description}</p>
        )}

        <div className="flex flex-wrap gap-1.5 mb-3">
          {vendor.services.slice(0, 3).map((service, idx) => (
            <span key={idx} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
              {service}
            </span>
          ))}
        </div>

        {showFullDetails && (
          <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
            {vendor.productCount > 0 && <span>{vendor.productCount} products</span>}
            {vendor.yearsInBusiness && <span>{vendor.yearsInBusiness} years in business</span>}
          </div>
        )}

        {vendor.rating > 0 && showFullDetails && (
          <div className="flex items-center gap-1 mb-3">
            <span className="text-yellow-500">★</span>
            <span className="text-sm font-medium">{vendor.rating.toFixed(1)}</span>
            <span className="text-xs text-gray-400">({vendor.reviewCount} reviews)</span>
          </div>
        )}

        <div className="flex gap-2">
          <Link
            href={`/suppliers/profile/${vendor.id}`}
            className="flex-1 py-2 text-center text-sm font-medium text-purple-600 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
          >
            View Profile
          </Link>
          {currentStage >= 3 && (
            <button
              onClick={() => {
                setSelectedVendors([vendor.id]);
                setCurrentStage(4);
                setShowQuoteForm(true);
              }}
              className="flex-1 py-2 text-center text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Get Quote
            </button>
          )}
        </div>
      </div>
    );
  };

  const renderProductCard = (product: Product) => {
    const isSelected = selectedProducts.includes(product.id);
    const showPricing = currentStage >= 3;

    return (
      <div
        key={product.id}
        className={`bg-white rounded-xl p-5 border transition-all ${
          isSelected
            ? 'border-purple-500 ring-2 ring-purple-200'
            : 'border-gray-100 hover:border-purple-200'
        }`}
      >
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-bold text-gray-900">
              {product.manufacturer} {product.model}
            </h3>
            <p className="text-sm text-gray-500">from {product.vendorName}</p>
          </div>
          <button
            onClick={() => handleProductSelect(product.id)}
            className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
              isSelected
                ? 'bg-purple-600 border-purple-600 text-white'
                : 'border-gray-300 hover:border-purple-400'
            }`}
          >
            {isSelected && <span className="text-sm">✓</span>}
          </button>
        </div>

        {/* Match score badge */}
        {product.matchScore && product.matchScore >= 80 && (
          <div className="mb-3">
            <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
              {product.matchScore}% Match
            </span>
          </div>
        )}

        {/* Savings badge */}
        {product.savings && product.savings.annual > 0 && (
          <div className="mb-3 p-2 bg-green-50 rounded-lg">
            <p className="text-sm text-green-700 font-medium">
              Could save you {product.savings.formatted}/year
            </p>
          </div>
        )}

        {/* Specs */}
        <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
          <div className="flex items-center gap-1 text-gray-600">
            <span>⚡</span> {product.speed} ppm
          </div>
          <div className="flex items-center gap-1 text-gray-600">
            <span>📄</span> {product.isA3 ? 'A3' : 'A4'}
          </div>
          <div className="flex items-center gap-1 text-gray-600">
            <span>📊</span> {product.minVolume.toLocaleString()}-{product.maxVolume.toLocaleString()} pages
          </div>
          <div className="flex items-center gap-1 text-gray-600">
            <span>🎨</span> {product.costs?.cpcRates?.A4Colour ? 'Colour' : 'Mono'}
          </div>
        </div>

        {/* Features */}
        {product.features.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {product.features.slice(0, 4).map((feature, idx) => (
              <span key={idx} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                {feature}
              </span>
            ))}
          </div>
        )}

        {/* Pricing - only shown at stage 3+ */}
        {showPricing && product.costs && (
          <div className="border-t pt-3 mt-3">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-gray-500">Mono:</span>{' '}
                <span className="font-medium">{product.costs.cpcRates.A4Mono}p/page</span>
              </div>
              {product.costs.cpcRates.A4Colour > 0 && (
                <div>
                  <span className="text-gray-500">Colour:</span>{' '}
                  <span className="font-medium">{product.costs.cpcRates.A4Colour}p/page</span>
                </div>
              )}
            </div>
            {product.leaseRates?.term48 && (
              <div className="mt-2 text-sm">
                <span className="text-gray-500">Lease:</span>{' '}
                <span className="font-medium">£{product.leaseRates.term48}/quarter (48mo)</span>
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => {
              setSelectedProducts([product.id]);
              setCurrentStage(4);
              setShowQuoteForm(true);
            }}
            className="flex-1 py-2 text-center text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Get Quote
          </button>
        </div>
      </div>
    );
  };

  const renderQuoteForm = () => {
    if (formSubmitted) {
      return (
        <div className="bg-white rounded-xl p-8 text-center max-w-xl mx-auto">
          <div className="text-green-500 text-6xl mb-4">✓</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Quote Request Submitted!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for your enquiry. The selected suppliers will be in touch within 1-2 business
            days with personalised quotes.
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => {
                setFormSubmitted(false);
                setShowQuoteForm(false);
                setSelectedProducts([]);
                setSelectedVendors([]);
                setCurrentStage(1);
              }}
              className="px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
            >
              Get More Quotes
            </button>
            <Link
              href="/suppliers"
              className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
            >
              Browse Suppliers
            </Link>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-xl p-6 max-w-2xl mx-auto">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Get Your Personalised Quotes</h2>
        <p className="text-gray-600 mb-6">
          Fill in your details below and our selected suppliers will send you tailored quotes.
        </p>

        <form onSubmit={handleSubmitQuote} className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
                Company Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleFormChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${
                  formErrors.companyName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Your company name"
              />
              {formErrors.companyName && (
                <p className="mt-1 text-sm text-red-600">{formErrors.companyName}</p>
              )}
            </div>

            <div>
              <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-1">
                Contact Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="contactName"
                name="contactName"
                value={formData.contactName}
                onChange={handleFormChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${
                  formErrors.contactName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Your name"
              />
              {formErrors.contactName && (
                <p className="mt-1 text-sm text-red-600">{formErrors.contactName}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${
                  formErrors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="you@company.com"
              />
              {formErrors.email && <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleFormChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${
                  formErrors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="01234 567890"
              />
              {formErrors.phone && <p className="mt-1 text-sm text-red-600">{formErrors.phone}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="postcode" className="block text-sm font-medium text-gray-700 mb-1">
                Postcode
              </label>
              <input
                type="text"
                id="postcode"
                name="postcode"
                value={formData.postcode}
                onChange={handleFormChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${
                  formErrors.postcode ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="CF10 1AA"
              />
              {formErrors.postcode && (
                <p className="mt-1 text-sm text-red-600">{formErrors.postcode}</p>
              )}
            </div>

            <div>
              <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 mb-1">
                Timeline
              </label>
              <select
                id="timeline"
                name="timeline"
                value={formData.timeline}
                onChange={handleFormChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="urgent">Urgent (ASAP)</option>
                <option value="soon">Soon (1-3 months)</option>
                <option value="planning">Planning (3-6 months)</option>
                <option value="future">Future (6+ months)</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Additional Requirements
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleFormChange}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="Tell us about your requirements, current setup, or any questions..."
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={formSubmitting}
              className="flex-1 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {formSubmitting ? 'Submitting...' : 'Submit Quote Request'}
            </button>
            <button
              type="button"
              onClick={() => setShowQuoteForm(false)}
              className="py-3 px-6 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
          </div>

          <p className="text-xs text-gray-500 text-center">
            By submitting this form, you agree to be contacted by our selected suppliers regarding
            your enquiry. Your data will be handled in accordance with our{' '}
            <a href="/privacy" className="text-purple-600 hover:text-purple-700">
              Privacy Policy
            </a>
            .
          </p>
        </form>
      </div>
    );
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="text-center py-12">
          <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Finding the best matches...</p>
        </div>
      );
    }

    // Stage 4: Quote form
    if (currentStage === 4 || showQuoteForm) {
      return renderQuoteForm();
    }

    // Stage 3: Products view (for photocopiers)
    if (currentStage === 3 && category === 'photocopiers' && products.length > 0) {
      return (
        <>
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">
              Found <strong>{products.length}</strong> matching product
              {products.length !== 1 ? 's' : ''}
            </p>
            {selectedProducts.length > 0 && (
              <button
                onClick={() => {
                  setCurrentStage(4);
                  setShowQuoteForm(true);
                }}
                className="px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
              >
                Get Quotes ({selectedProducts.length})
              </button>
            )}
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {products.map((product) => renderProductCard(product))}
          </div>
        </>
      );
    }

    // Stage 1-2 or non-photocopier categories: Vendor view
    if (vendors.length > 0) {
      const filteredVendors =
        category && category !== 'photocopiers'
          ? vendors.filter((v) =>
              v.services.some((s) => s.toLowerCase().includes(category.replace('-services', '')))
            )
          : vendors;

      return (
        <>
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">
              Found <strong>{filteredVendors.length}</strong> supplier
              {filteredVendors.length !== 1 ? 's' : ''}
              {category && ` in ${CATEGORIES.find((c) => c.value === category)?.label}`}
            </p>
            {selectedVendors.length > 0 && (
              <button
                onClick={() => {
                  setCurrentStage(4);
                  setShowQuoteForm(true);
                }}
                className="px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
              >
                Get Quotes ({selectedVendors.length})
              </button>
            )}
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredVendors.map((vendor) => renderVendorCard(vendor))}
          </div>
        </>
      );
    }

    // No results
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🔍</div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">No suppliers found</h2>
        <p className="text-gray-600 mb-6">
          Try adjusting your filters or selecting a different category.
        </p>
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-gray-50 pt-16">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Hero */}
      <section className="bg-brand-gradient text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm mb-4 text-purple-200">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">Get Quotes</span>
          </nav>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">Get Quotes from Verified Suppliers</h1>
              <p className="text-purple-100">
                Compare pricing and get personalised quotes - free, instant, no obligation
              </p>
            </div>
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 bg-white/20 rounded-lg"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Stage indicator */}
          {renderStageIndicator()}

          {/* Two-column layout */}
          <div className="flex gap-6">
            {/* Sidebar */}
            {renderSidebar()}

            {/* Main content area */}
            <div className="flex-1 min-w-0">{renderContent()}</div>
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="py-8 bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>No obligation quotes</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>70+ verified suppliers</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>GDPR compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Free to use</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
