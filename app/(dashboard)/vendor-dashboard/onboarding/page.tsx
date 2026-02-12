'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/contexts/AuthContext';
import { SERVICES, SERVICE_KEYS } from '@/lib/constants/services';

const API_URL = process.env.NEXT_PUBLIC_EXPRESS_BACKEND_URL ||
  'https://ai-procurement-backend-q35u.onrender.com';

const STEPS = [
  { id: 1, name: 'Profile', label: 'Company Profile' },
  { id: 2, name: 'Coverage', label: 'Service Area' },
  { id: 3, name: 'Services', label: 'Services & Brands' },
  { id: 4, name: 'Product', label: 'First Product' },
  { id: 5, name: 'Done', label: 'Complete!' },
];

const SERVICE_OPTIONS = SERVICE_KEYS.map((key) => ({
  value: SERVICES[key].value,
  label: SERVICES[key].name,
  icon: SERVICES[key].icon,
}));

const BRAND_OPTIONS = [
  'Canon', 'Konica Minolta', 'Xerox', 'Sharp', 'Ricoh',
  'Brother', 'Lexmark', 'HP', 'Kyocera', 'Epson',
  'Toshiba', 'Samsung', 'Other',
];

const COVERAGE_PRESETS = [
  { label: 'South Wales (CF, NP, SA)', areas: ['CF', 'NP', 'SA'] },
  { label: 'Bristol & Bath (BS, BA)', areas: ['BS', 'BA'] },
  { label: 'South West (EX, PL, GL)', areas: ['EX', 'PL', 'GL'] },
  { label: 'West Midlands (B, WV, CV)', areas: ['B', 'WV', 'CV'] },
];

interface ProfileData {
  company: string;
  description: string;
  website: string;
  phone: string;
  city: string;
  coverage: string[];
  services: string[];
  brands: string[];
}

interface ProductData {
  manufacturer: string;
  productModel: string;
  category: string;
  description: string;
  speed: number;
  features: string[];
}

export default function OnboardingPage() {
  const router = useRouter();
  const { getCurrentToken, auth } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [visibilityScore, setVisibilityScore] = useState<number | null>(null);

  const [profile, setProfile] = useState<ProfileData>({
    company: '',
    description: '',
    website: '',
    phone: '',
    city: '',
    coverage: [],
    services: [],
    brands: [],
  });

  const [product, setProduct] = useState<ProductData>({
    manufacturer: '',
    productModel: '',
    category: 'Photocopier',
    description: '',
    speed: 35,
    features: [],
  });

  const [coverageInput, setCoverageInput] = useState('');

  // Load existing profile data
  useEffect(() => {
    const loadProfile = async () => {
      const token = getCurrentToken();
      if (!token) return;

      try {
        const res = await fetch(`${API_URL}/api/vendors/profile`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });

        if (res.ok) {
          const data = await res.json();
          if (data.vendor) {
            setProfile({
              company: data.vendor.company || '',
              description: data.vendor.businessProfile?.description || '',
              website: data.vendor.contactInfo?.website || '',
              phone: data.vendor.contactInfo?.phone || '',
              city: data.vendor.location?.city || '',
              coverage: data.vendor.location?.coverage || data.vendor.postcodeAreas || [],
              services: data.vendor.services || [],
              brands: data.vendor.brands || [],
            });
          }
        }
      } catch (err) {
        console.error('Failed to load profile:', err);
      }
    };

    loadProfile();
  }, [getCurrentToken]);

  const saveProfile = async (data: Partial<ProfileData>) => {
    const token = getCurrentToken();
    if (!token) return false;

    try {
      const response = await fetch(`${API_URL}/api/vendors/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          company: data.company || profile.company,
          businessProfile: {
            description: data.description || profile.description,
          },
          contactInfo: {
            website: data.website || profile.website,
            phone: data.phone || profile.phone,
          },
          location: {
            city: data.city || profile.city,
            coverage: data.coverage || profile.coverage,
          },
          postcodeAreas: data.coverage || profile.coverage,
          services: data.services || profile.services,
          brands: data.brands || profile.brands,
        }),
      });

      return response.ok;
    } catch (err) {
      console.error('Failed to save profile:', err);
      return false;
    }
  };

  const handleStep1Submit = async () => {
    if (!profile.company || !profile.description) {
      setError('Please fill in company name and description');
      return;
    }
    setLoading(true);
    setError(null);

    const success = await saveProfile({
      company: profile.company,
      description: profile.description,
      website: profile.website,
      phone: profile.phone,
    });

    setLoading(false);
    if (success) {
      setCurrentStep(2);
    } else {
      setError('Failed to save. Please try again.');
    }
  };

  const handleStep2Submit = async () => {
    if (profile.coverage.length === 0) {
      setError('Please add at least one postcode area');
      return;
    }
    setLoading(true);
    setError(null);

    const success = await saveProfile({
      city: profile.city,
      coverage: profile.coverage,
    });

    setLoading(false);
    if (success) {
      setCurrentStep(3);
    } else {
      setError('Failed to save. Please try again.');
    }
  };

  const handleStep3Submit = async () => {
    if (profile.services.length === 0) {
      setError('Please select at least one service');
      return;
    }
    setLoading(true);
    setError(null);

    const success = await saveProfile({
      services: profile.services,
      brands: profile.brands,
    });

    setLoading(false);
    if (success) {
      setCurrentStep(4);
    } else {
      setError('Failed to save. Please try again.');
    }
  };

  const handleStep4Submit = async (skip: boolean = false) => {
    setLoading(true);
    setError(null);

    if (!skip && product.manufacturer && product.productModel) {
      const token = getCurrentToken();
      try {
        const response = await fetch(`${API_URL}/api/vendors/products`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            manufacturer: product.manufacturer,
            productModel: product.productModel,
            category: product.category,
            description: product.description,
            speed: product.speed,
            features: product.features,
            status: 'active',
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to create product');
        }
      } catch (err) {
        console.error('Failed to create product:', err);
        setError('Failed to add product. You can add products later from your dashboard.');
      }
    }

    // Fetch visibility score for completion screen
    const token = getCurrentToken();
    try {
      const res = await fetch(`${API_URL}/api/visibility/score`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setVisibilityScore(data.data.score);
        }
      }
    } catch {
      // Ignore score fetch errors
    }

    setLoading(false);
    setCurrentStep(5);
  };

  const markOnboardingComplete = async () => {
    const token = getCurrentToken();
    if (token) {
      try {
        await fetch(`${API_URL}/api/vendors/onboarding-complete`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` },
        });
      } catch {
        // Best-effort — don't block navigation
      }
    }
  };

  const handleComplete = async () => {
    await markOnboardingComplete();
    router.push('/vendor-dashboard');
  };

  const handleSkip = async () => {
    await markOnboardingComplete();
    router.push('/vendor-dashboard');
  };

  const addCoverageArea = () => {
    const area = coverageInput.toUpperCase().trim();
    if (area && !profile.coverage.includes(area)) {
      setProfile({ ...profile, coverage: [...profile.coverage, area] });
    }
    setCoverageInput('');
  };

  const removeCoverageArea = (area: string) => {
    setProfile({ ...profile, coverage: profile.coverage.filter(a => a !== area) });
  };

  const applyPreset = (areas: string[]) => {
    const newCoverage = [...new Set([...profile.coverage, ...areas])];
    setProfile({ ...profile, coverage: newCoverage });
  };

  const toggleService = (value: string) => {
    if (profile.services.includes(value)) {
      setProfile({ ...profile, services: profile.services.filter(s => s !== value) });
    } else {
      setProfile({ ...profile, services: [...profile.services, value] });
    }
  };

  const toggleBrand = (brand: string) => {
    if (profile.brands.includes(brand)) {
      setProfile({ ...profile, brands: profile.brands.filter(b => b !== brand) });
    } else {
      setProfile({ ...profile, brands: [...profile.brands, brand] });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {STEPS.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                    currentStep > step.id
                      ? 'bg-green-500 text-white'
                      : currentStep === step.id
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {currentStep > step.id ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    step.id
                  )}
                </div>
                {index < STEPS.length - 1 && (
                  <div
                    className={`h-1 w-8 sm:w-16 mx-2 ${
                      currentStep > step.id ? 'bg-green-500' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <h2 className="text-xl font-semibold text-gray-900">
              {STEPS[currentStep - 1].label}
            </h2>
            {currentStep < 5 && (
              <button
                onClick={handleSkip}
                className="mt-2 text-sm text-gray-500 hover:text-gray-700 underline"
              >
                Skip setup — I&apos;ll do this later
              </button>
            )}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Step Content */}
        <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8">
          {/* Step 1: Company Profile */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <p className="text-gray-600">
                Let&apos;s start with your company details. This information appears on your public profile.
              </p>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name *
                </label>
                <input
                  type="text"
                  value={profile.company}
                  onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Your Company Ltd"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Description *
                </label>
                <textarea
                  value={profile.description}
                  onChange={(e) => setProfile({ ...profile, description: e.target.value })}
                  rows={4}
                  maxLength={500}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Describe your business in 2-3 sentences. What makes you different?"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {profile.description.length}/500 characters
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Website URL
                </label>
                <input
                  type="url"
                  value={profile.website}
                  onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="https://yourcompany.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="01onal 123456"
                />
              </div>

              <button
                onClick={handleStep1Submit}
                disabled={loading}
                className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 disabled:bg-gray-300 transition-colors"
              >
                {loading ? 'Saving...' : 'Continue'}
              </button>
            </div>
          )}

          {/* Step 2: Coverage Area */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <p className="text-gray-600">
                What areas do you serve? Add postcode areas (like CF, NP, BS) where you can provide service.
              </p>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Primary City
                </label>
                <input
                  type="text"
                  value={profile.city}
                  onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="e.g. Cardiff, Bristol, Swansea"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quick Presets
                </label>
                <div className="flex flex-wrap gap-2">
                  {COVERAGE_PRESETS.map((preset) => (
                    <button
                      key={preset.label}
                      onClick={() => applyPreset(preset.areas)}
                      className="px-3 py-1.5 text-sm bg-purple-50 text-purple-700 rounded-full hover:bg-purple-100 transition-colors"
                    >
                      + {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Add Postcode Area
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={coverageInput}
                    onChange={(e) => setCoverageInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCoverageArea())}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="e.g. CF, NP, BS"
                  />
                  <button
                    onClick={addCoverageArea}
                    className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Add
                  </button>
                </div>
              </div>

              {profile.coverage.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Coverage Areas ({profile.coverage.length})
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {profile.coverage.map((area) => (
                      <span
                        key={area}
                        className="inline-flex items-center px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm"
                      >
                        {area}
                        <button
                          onClick={() => removeCoverageArea(area)}
                          className="ml-2 text-purple-500 hover:text-purple-700"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="flex-1 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleStep2Submit}
                  disabled={loading}
                  className="flex-1 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 disabled:bg-gray-300 transition-colors"
                >
                  {loading ? 'Saving...' : 'Continue'}
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Services & Brands */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <p className="text-gray-600">
                What services do you offer and which brands do you carry?
              </p>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Services Offered *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {SERVICE_OPTIONS.map((service) => (
                    <button
                      key={service.value}
                      onClick={() => toggleService(service.value)}
                      className={`p-3 rounded-lg border text-left transition-colors ${
                        profile.services.includes(service.value)
                          ? 'border-purple-500 bg-purple-50 text-purple-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span className="mr-2">{service.icon}</span>
                      <span className="text-sm font-medium">{service.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Brands Carried
                </label>
                <div className="flex flex-wrap gap-2">
                  {BRAND_OPTIONS.map((brand) => (
                    <button
                      key={brand}
                      onClick={() => toggleBrand(brand)}
                      className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                        profile.brands.includes(brand)
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="flex-1 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleStep3Submit}
                  disabled={loading}
                  className="flex-1 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 disabled:bg-gray-300 transition-colors"
                >
                  {loading ? 'Saving...' : 'Continue'}
                </button>
              </div>
            </div>
          )}

          {/* Step 4: First Product */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="bg-purple-50 border border-purple-100 rounded-lg p-4">
                <p className="text-sm text-purple-700">
                  <strong>Tip:</strong> Vendors with products get 5× more quote requests. Add at least one now!
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Manufacturer
                  </label>
                  <select
                    value={product.manufacturer}
                    onChange={(e) => setProduct({ ...product, manufacturer: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="">Select...</option>
                    {BRAND_OPTIONS.filter(b => b !== 'Other').map((brand) => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Model
                  </label>
                  <input
                    type="text"
                    value={product.productModel}
                    onChange={(e) => setProduct({ ...product, productModel: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="e.g. imageRUNNER C5540i"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={product.category}
                  onChange={(e) => setProduct({ ...product, category: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="Photocopier">Photocopier / MFP</option>
                  <option value="Printer">Printer</option>
                  <option value="Phone System">Phone System</option>
                  <option value="CCTV">CCTV System</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Speed (pages per minute)
                </label>
                <input
                  type="number"
                  value={product.speed}
                  onChange={(e) => setProduct({ ...product, speed: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setCurrentStep(3)}
                  className="flex-1 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={() => handleStep4Submit(true)}
                  className="py-3 px-6 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Skip
                </button>
                <button
                  onClick={() => handleStep4Submit(false)}
                  disabled={loading || !product.manufacturer || !product.productModel}
                  className="flex-1 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 disabled:bg-gray-300 transition-colors"
                >
                  {loading ? 'Saving...' : 'Add & Continue'}
                </button>
              </div>
            </div>
          )}

          {/* Step 5: Complete */}
          {currentStep === 5 && (
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">You&apos;re All Set!</h2>
                <p className="text-gray-600">
                  Your profile is now live and ready to receive quote requests.
                </p>
              </div>

              {visibilityScore !== null && (
                <div className="bg-purple-50 rounded-xl p-6">
                  <p className="text-sm text-purple-600 mb-2">Your AI Visibility Score</p>
                  <p className="text-4xl font-bold text-purple-700">{visibilityScore}/100</p>
                  <p className="text-sm text-purple-600 mt-2">
                    Complete your profile to improve this score
                  </p>
                </div>
              )}

              <div className="text-left bg-gray-50 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-3">What&apos;s next?</p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <span className="text-purple-600">→</span>
                    Add more products to your catalogue
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-purple-600">→</span>
                    Check your AI visibility analytics
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-purple-600">→</span>
                    View your public profile
                  </li>
                </ul>
              </div>

              <button
                onClick={handleComplete}
                className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
              >
                Go to Dashboard
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
