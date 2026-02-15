'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';

// Types
interface VendorProduct {
  name: string;
  category: string;
  speed: number;
  isColour?: boolean;
  isA3: boolean;
  features: string[];
}

interface VendorPricing {
  estimatedMonthly: string;
  breakdown: {
    lease: string;
    cpc: string;
    service: string;
  };
  cpcMono: string;
  cpcColour: string | null;
  disclaimer?: string;
}

interface VendorService {
  includesToner?: boolean;
  includesPartsLabour?: boolean;
  responseTime?: string;
}

interface CompareVendor {
  id: string;
  company: string;
  services: string[];
  description: string;
  location: string;
  coverage: string[];
  brands: string[];
  tier: string;
  matchScore: number;
  whyRecommended: string;
  product: VendorProduct | null;
  pricing: VendorPricing | null;
  service: VendorService | null;
  savings: { annual: number; formatted: string } | null;
  profileUrl: string;
  quoteUrl: string;
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

const BACKEND_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://ai-procurement-backend-q35u.onrender.com';

// Comparison row definitions
const COMPARISON_ROWS = [
  { key: 'estimatedMonthly', label: 'Est. Monthly Cost', highlight: 'lowest' },
  { key: 'matchScore', label: 'Match Score', highlight: 'highest' },
  { key: 'productName', label: 'Product' },
  { key: 'speed', label: 'Speed (ppm)', highlight: 'highest' },
  { key: 'paperSize', label: 'Paper Size' },
  { key: 'colour', label: 'Colour Printing' },
  { key: 'cpcMono', label: 'Mono CPC', highlight: 'lowest' },
  { key: 'cpcColour', label: 'Colour CPC', highlight: 'lowest' },
  { key: 'leaseQuarterly', label: 'Lease (Quarterly)' },
  { key: 'serviceIncluded', label: 'Service Included' },
  { key: 'responseTime', label: 'Response Time' },
  { key: 'features', label: 'Features' },
  { key: 'brands', label: 'Brands Supplied' },
  { key: 'location', label: 'Location' },
  { key: 'whyRecommended', label: 'Why Recommended' },
];

interface CompareViewProps {
  vendors?: string;
  volume?: string;
  postcode?: string;
  category?: string;
  colour?: string;
  a3?: string;
}

export default function CompareView({
  vendors: vendorsParam,
  volume: volumeParam,
  postcode: postcodeParam,
  category: categoryParam,
  colour: colourParam,
  a3: a3Param,
}: CompareViewProps) {
  // Parse props
  const vendorIds = useMemo(
    () => vendorsParam?.split(',').filter(Boolean) || [],
    [vendorsParam]
  );
  const volume = parseInt(volumeParam || '5000');
  const postcode = postcodeParam || '';
  const category = categoryParam || 'Photocopiers';
  const needsColour = colourParam !== 'false';
  const needsA3 = a3Param !== 'false';

  // State
  const [vendors, setVendors] = useState<CompareVendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState(0);

  // Quote form
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [selectedVendorId, setSelectedVendorId] = useState<string | null>(null);
  const [requestAll, setRequestAll] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    postcode: postcode,
    message: '',
    timeline: 'soon',
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  // Fetch comparison data
  const fetchComparisonData = useCallback(async () => {
    if (vendorIds.length === 0) {
      setError('No vendors selected for comparison');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Build query for AI endpoint
      let query = 'copier';
      if (needsColour) query += ' colour';
      if (needsA3) query += ' A3';
      query += ` ${volume} pages`;
      if (postcode) query += ` in ${postcode}`;

      const response = await fetch(`${BACKEND_URL}/api/ai-query`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query,
          location: postcode,
          category,
          volume,
          requirements: { colour: needsColour, a3: needsA3 },
          limit: 20,
        }),
      });

      const data = await response.json();

      if (data.success && data.vendors) {
        // Filter to only the selected vendor IDs
        const filteredVendors = data.vendors.filter((v: CompareVendor) =>
          vendorIds.includes(v.id)
        );

        // Sort by match score
        filteredVendors.sort(
          (a: CompareVendor, b: CompareVendor) => (b.matchScore || 0) - (a.matchScore || 0)
        );

        setVendors(filteredVendors);

        if (filteredVendors.length === 0) {
          setError('Selected vendors not found in results. They may not match your criteria.');
        }
      } else {
        setError('Failed to fetch comparison data');
      }
    } catch (err) {
      console.error('Failed to fetch comparison:', err);
      setError('Failed to load comparison. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [vendorIds, volume, postcode, category, needsColour, needsA3]);

  useEffect(() => {
    fetchComparisonData();
  }, [fetchComparisonData]);

  // Helper functions
  const getValue = (vendor: CompareVendor, key: string): string | number | null => {
    switch (key) {
      case 'estimatedMonthly':
        return vendor.pricing?.estimatedMonthly || null;
      case 'matchScore':
        return vendor.matchScore ? `${vendor.matchScore}%` : null;
      case 'productName':
        return vendor.product?.name || null;
      case 'speed':
        return vendor.product?.speed || null;
      case 'paperSize':
        return vendor.product?.isA3 ? 'A3' : 'A4';
      case 'colour':
        return vendor.product?.isColour ? 'Yes' : 'Mono only';
      case 'cpcMono':
        return vendor.pricing?.cpcMono || null;
      case 'cpcColour':
        return vendor.pricing?.cpcColour || 'N/A';
      case 'leaseQuarterly':
        return vendor.pricing?.breakdown?.lease
          ? `£${parseFloat(vendor.pricing.breakdown.lease.replace('£', '')) * 3}`
          : null;
      case 'serviceIncluded':
        if (!vendor.service) return 'Unknown';
        const parts = [];
        if (vendor.service.includesToner) parts.push('Toner');
        if (vendor.service.includesPartsLabour) parts.push('Parts & Labour');
        return parts.length > 0 ? parts.join(', ') : 'Unknown';
      case 'responseTime':
        return vendor.service?.responseTime || null;
      case 'features':
        return vendor.product?.features?.slice(0, 4).join(', ') || null;
      case 'brands':
        return vendor.brands?.slice(0, 3).join(', ') || null;
      case 'location':
        return vendor.location || null;
      case 'whyRecommended':
        return vendor.whyRecommended || null;
      default:
        return null;
    }
  };

  const getNumericValue = (value: string | number | null): number | null => {
    if (value === null) return null;
    if (typeof value === 'number') return value;
    const match = value.match(/[\d.]+/);
    return match ? parseFloat(match[0]) : null;
  };

  const getBestValue = (key: string, direction: 'lowest' | 'highest'): number | null => {
    const values = vendors
      .map((v) => getNumericValue(getValue(v, key)))
      .filter((v): v is number => v !== null);

    if (values.length === 0) return null;
    return direction === 'lowest' ? Math.min(...values) : Math.max(...values);
  };

  const isBestValue = (vendor: CompareVendor, key: string, direction?: 'lowest' | 'highest'): boolean => {
    if (!direction) return false;
    const value = getNumericValue(getValue(vendor, key));
    const best = getBestValue(key, direction);
    return value !== null && best !== null && value === best;
  };

  // Form handling
  const validatePostcode = (pc: string) => {
    return /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i.test(pc.trim());
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {};

    if (!formData.companyName.trim()) errors.companyName = 'Company name is required';
    if (!formData.contactName.trim()) errors.contactName = 'Contact name is required';
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
      const vendorsToContact = requestAll
        ? vendors
        : vendors.filter((v) => v.id === selectedVendorId);

      for (const vendor of vendorsToContact) {
        await fetch(`${BACKEND_URL}/api/vendor-leads`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            vendorId: vendor.id,
            service: category,
            companyName: formData.companyName.trim(),
            contactName: formData.contactName.trim(),
            email: formData.email.trim().toLowerCase(),
            phone: formData.phone.trim(),
            postcode: formData.postcode.trim().toUpperCase() || postcode || undefined,
            message: formData.message.trim() || undefined,
            timeline: formData.timeline,
            monthlyVolume: volume,
            requirements: {
              needsColour,
              needsA3,
              comparedWith: vendors.map((v) => v.company).join(', '),
            },
            source: {
              page: 'compare',
              referrer: 'tendorai-nextjs',
              utm: { source: 'tendorai', medium: 'website', campaign: 'compare' },
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

  const openQuoteForm = (vendorId: string | null, all: boolean = false) => {
    setSelectedVendorId(vendorId);
    setRequestAll(all);
    setShowQuoteForm(true);
  };

  // Render functions
  const renderDesktopTable = () => (
    <div className="hidden lg:block overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="sticky left-0 bg-gray-100 p-4 text-left font-semibold text-gray-700 border-b min-w-[180px]">
              Specification
            </th>
            {vendors.map((vendor, idx) => (
              <th
                key={vendor.id}
                className={`p-4 text-center border-b min-w-[220px] ${
                  idx === 0 ? 'bg-purple-50' : 'bg-white'
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  {idx === 0 && (
                    <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
                      Best Match
                    </span>
                  )}
                  <span className="font-bold text-gray-900">{vendor.company}</span>
                  {vendor.tier !== 'free' && (
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        vendor.tier === 'verified'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-purple-100 text-purple-700'
                      }`}
                    >
                      {vendor.tier === 'verified' ? 'Verified' : 'Visible'}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {COMPARISON_ROWS.map((row) => (
            <tr key={row.key} className="hover:bg-gray-50">
              <td className="sticky left-0 bg-gray-50 p-4 font-medium text-gray-700 border-b">
                {row.label}
              </td>
              {vendors.map((vendor, idx) => {
                const value = getValue(vendor, row.key);
                const isBest = isBestValue(vendor, row.key, row.highlight as 'lowest' | 'highest');

                return (
                  <td
                    key={`${vendor.id}-${row.key}`}
                    className={`p-4 text-center border-b ${idx === 0 ? 'bg-purple-50/50' : ''} ${
                      isBest ? 'bg-green-50' : ''
                    }`}
                  >
                    <span
                      className={`${isBest ? 'text-green-700 font-semibold' : 'text-gray-700'} ${
                        row.key === 'estimatedMonthly' ? 'text-lg font-bold' : ''
                      }`}
                    >
                      {value ?? '-'}
                      {isBest && row.highlight && (
                        <span className="ml-1 text-green-600 text-xs">✓</span>
                      )}
                    </span>
                  </td>
                );
              })}
            </tr>
          ))}
          {/* Actions row */}
          <tr>
            <td className="sticky left-0 bg-gray-100 p-4 font-medium text-gray-700">Actions</td>
            {vendors.map((vendor) => (
              <td key={`${vendor.id}-actions`} className="p-4 text-center bg-gray-50">
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => openQuoteForm(vendor.id)}
                    className="w-full py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Request Quote
                  </button>
                  <Link
                    href={`/suppliers/profile/${vendor.id}`}
                    className="w-full py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors text-center"
                  >
                    View Profile
                  </Link>
                </div>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );

  const renderMobileCards = () => (
    <div className="lg:hidden">
      {/* Tab bar */}
      <div className="flex overflow-x-auto gap-2 pb-4 mb-4 border-b">
        {vendors.map((vendor, idx) => (
          <button
            key={vendor.id}
            onClick={() => setActiveTab(idx)}
            className={`flex-shrink-0 px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === idx
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {idx === 0 && <span className="mr-1">★</span>}
            {vendor.company}
          </button>
        ))}
      </div>

      {/* Active vendor card */}
      {vendors[activeTab] && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900">{vendors[activeTab].company}</h3>
              <p className="text-sm text-gray-500">{vendors[activeTab].location}</p>
            </div>
            {activeTab === 0 && (
              <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
                Best Match
              </span>
            )}
          </div>

          {/* Match score */}
          <div className="mb-4 p-3 bg-purple-50 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-purple-700 font-medium">Match Score</span>
              <span className="text-2xl font-bold text-purple-600">
                {vendors[activeTab].matchScore}%
              </span>
            </div>
          </div>

          {/* Pricing */}
          {vendors[activeTab].pricing && (
            <div className="mb-4 p-4 bg-gray-50 rounded-lg">
              <div className="text-center mb-3">
                <span className="text-3xl font-bold text-gray-900">
                  {vendors[activeTab].pricing?.estimatedMonthly}
                </span>
                <span className="text-gray-500">/month est.</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-sm text-center">
                <div>
                  <div className="text-gray-500">Lease</div>
                  <div className="font-medium">{vendors[activeTab].pricing?.breakdown.lease}</div>
                </div>
                <div>
                  <div className="text-gray-500">CPC</div>
                  <div className="font-medium">{vendors[activeTab].pricing?.breakdown.cpc}</div>
                </div>
                <div>
                  <div className="text-gray-500">Service</div>
                  <div className="font-medium">{vendors[activeTab].pricing?.breakdown.service}</div>
                </div>
              </div>
            </div>
          )}

          {/* Product details */}
          {vendors[activeTab].product && (
            <div className="mb-4">
              <h4 className="font-semibold text-gray-900 mb-2">Product</h4>
              <p className="text-gray-700 mb-2">{vendors[activeTab].product?.name}</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-1">
                  <span>⚡</span> {vendors[activeTab].product?.speed} ppm
                </div>
                <div className="flex items-center gap-1">
                  <span>📄</span> {vendors[activeTab].product?.isA3 ? 'A3' : 'A4'}
                </div>
                <div className="flex items-center gap-1">
                  <span>🎨</span> {vendors[activeTab].product?.isColour ? 'Colour' : 'Mono'}
                </div>
                <div className="flex items-center gap-1">
                  <span>⏱️</span> {vendors[activeTab].service?.responseTime || 'N/A'}
                </div>
              </div>
            </div>
          )}

          {/* CPC rates */}
          {vendors[activeTab].pricing && (
            <div className="mb-4">
              <h4 className="font-semibold text-gray-900 mb-2">Cost Per Copy</h4>
              <div className="flex gap-4">
                <div className="flex-1 p-2 bg-gray-50 rounded text-center">
                  <div className="text-xs text-gray-500">Mono</div>
                  <div className="font-medium">{vendors[activeTab].pricing?.cpcMono}</div>
                </div>
                {vendors[activeTab].pricing?.cpcColour && (
                  <div className="flex-1 p-2 bg-gray-50 rounded text-center">
                    <div className="text-xs text-gray-500">Colour</div>
                    <div className="font-medium">{vendors[activeTab].pricing?.cpcColour}</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Why recommended */}
          {vendors[activeTab].whyRecommended && (
            <div className="mb-4 p-3 bg-green-50 rounded-lg">
              <p className="text-sm text-green-700">{vendors[activeTab].whyRecommended}</p>
            </div>
          )}

          {/* Features */}
          {vendors[activeTab].product?.features && vendors[activeTab].product!.features.length > 0 && (
            <div className="mb-4">
              <h4 className="font-semibold text-gray-900 mb-2">Features</h4>
              <div className="flex flex-wrap gap-1">
                {vendors[activeTab].product?.features.map((feature, idx) => (
                  <span key={idx} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={() => openQuoteForm(vendors[activeTab].id)}
              className="flex-1 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
            >
              Request Quote
            </button>
            <Link
              href={`/suppliers/profile/${vendors[activeTab].id}`}
              className="py-3 px-4 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
            >
              Profile
            </Link>
          </div>
        </div>
      )}
    </div>
  );

  const renderQuoteForm = () => {
    if (formSubmitted) {
      return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-8 max-w-md w-full text-center">
            <div className="text-green-500 text-6xl mb-4">✓</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Quote Request Sent!</h2>
            <p className="text-gray-600 mb-6">
              {requestAll
                ? `All ${vendors.length} suppliers will contact you within 1-2 business days.`
                : 'The supplier will contact you within 1-2 business days.'}
            </p>
            <button
              onClick={() => {
                setShowQuoteForm(false);
                setFormSubmitted(false);
              }}
              className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
            >
              Continue Comparing
            </button>
          </div>
        </div>
      );
    }

    const targetVendor = vendors.find((v) => v.id === selectedVendorId);

    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {requestAll
                  ? `Request Quotes from All ${vendors.length} Suppliers`
                  : `Request Quote from ${targetVendor?.company}`}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Fill in your details to receive a personalised quote
              </p>
            </div>
            <button
              onClick={() => setShowQuoteForm(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmitQuote} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleFormChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 ${
                    formErrors.companyName ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {formErrors.companyName && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.companyName}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleFormChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 ${
                    formErrors.contactName ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {formErrors.contactName && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.contactName}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 ${
                    formErrors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {formErrors.email && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleFormChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 ${
                    formErrors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {formErrors.phone && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Postcode</label>
                <input
                  type="text"
                  name="postcode"
                  value={formData.postcode}
                  onChange={handleFormChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 ${
                    formErrors.postcode ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {formErrors.postcode && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.postcode}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Timeline</label>
                <select
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                >
                  <option value="urgent">Urgent (ASAP)</option>
                  <option value="soon">Soon (1-3 months)</option>
                  <option value="planning">Planning (3-6 months)</option>
                  <option value="future">Future (6+ months)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Additional Requirements
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleFormChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="Any specific requirements or questions..."
              />
            </div>

            <button
              type="submit"
              disabled={formSubmitting}
              className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
            >
              {formSubmitting
                ? 'Sending...'
                : requestAll
                  ? `Request All ${vendors.length} Quotes`
                  : 'Request Quote'}
            </button>

            <p className="text-xs text-gray-500 text-center">
              By submitting, you agree to our{' '}
              <Link href="/privacy" className="text-purple-600 hover:text-purple-700">
                Privacy Policy
              </Link>
            </p>
          </form>
        </div>
      </div>
    );
  };

  // Loading state
  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 pt-16">
        <section className="bg-brand-gradient text-white py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl md:text-3xl font-bold">Compare Suppliers</h1>
          </div>
        </section>
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading comparison data...</p>
          </div>
        </section>
      </main>
    );
  }

  // Error or no vendors
  if (error || vendors.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50 pt-16">
        <section className="bg-brand-gradient text-white py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="text-sm mb-4 text-purple-200">
              <Link href="/" className="hover:text-white">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/get-quotes" className="hover:text-white">Get Quotes</Link>
              <span className="mx-2">/</span>
              <span className="text-white">Compare</span>
            </nav>
            <h1 className="text-2xl md:text-3xl font-bold">Compare Suppliers</h1>
          </div>
        </section>
        <section className="py-12">
          <div className="max-w-xl mx-auto px-4 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {error || 'No vendors to compare'}
            </h2>
            <p className="text-gray-600 mb-6">
              Please select vendors from the Get Quotes page to compare them side-by-side.
            </p>
            <Link
              href="/get-quotes"
              className="inline-block px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
            >
              Find Suppliers to Compare
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 pt-16">
      {/* Hero */}
      <section className="bg-brand-gradient text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm mb-4 text-purple-200">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/get-quotes" className="hover:text-white">Get Quotes</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Compare</span>
          </nav>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                Compare {vendors.length} Supplier{vendors.length !== 1 ? 's' : ''}
              </h1>
              <p className="text-purple-100">
                {volume.toLocaleString()} pages/month • {category}
                {postcode && ` • ${postcode}`}
              </p>
            </div>
            <button
              onClick={() => openQuoteForm(null, true)}
              className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:bg-purple-50 transition-colors"
            >
              Request All {vendors.length} Quotes
            </button>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Summary cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-sm text-gray-500">Lowest Price</div>
              <div className="text-xl font-bold text-green-600">
                {vendors.find(
                  (v) =>
                    v.pricing &&
                    getNumericValue(v.pricing.estimatedMonthly) === getBestValue('estimatedMonthly', 'lowest')
                )?.pricing?.estimatedMonthly || '-'}
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-sm text-gray-500">Best Match</div>
              <div className="text-xl font-bold text-purple-600">{vendors[0]?.matchScore}%</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-sm text-gray-500">Fastest Speed</div>
              <div className="text-xl font-bold text-blue-600">
                {getBestValue('speed', 'highest')} ppm
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-sm text-gray-500">Lowest Mono CPC</div>
              <div className="text-xl font-bold text-gray-900">
                {vendors.find(
                  (v) =>
                    v.pricing &&
                    getNumericValue(v.pricing.cpcMono) === getBestValue('cpcMono', 'lowest')
                )?.pricing?.cpcMono || '-'}
              </div>
            </div>
          </div>

          {/* Desktop table */}
          {renderDesktopTable()}

          {/* Mobile cards */}
          {renderMobileCards()}

          {/* Back link */}
          <div className="mt-8 text-center">
            <Link
              href={`/get-quotes?category=${category}&postcode=${postcode}&volume=${volume}`}
              className="text-purple-600 hover:text-purple-700 font-medium"
            >
              ← Back to search results
            </Link>
          </div>
        </div>
      </section>

      {/* Quote form modal */}
      {showQuoteForm && renderQuoteForm()}
    </main>
  );
}
