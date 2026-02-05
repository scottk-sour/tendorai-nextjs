'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '@/app/contexts/AuthContext';
import { SERVICES, SERVICE_KEYS } from '@/lib/constants/services';
import { getTierLabel, hasTierAccess } from '@/app/components/dashboard/TierGate';

interface ProfileData {
  company: string;
  name: string;
  email: string;
  phone: string;
  website: string;
  city: string;
  postcode: string;
  coverage: string[];
  description: string;
  yearsInBusiness: number;
  services: string[];
  brands: string[];
  certifications: string[];
  tier: string;
}

interface SubscriptionData {
  plan: string;
  internalTier: string;
  subscription: {
    id?: string;
    status?: string;
    currentPeriodEnd?: string;
    cancelAtPeriodEnd?: boolean;
  } | null;
}

const API_URL = process.env.NEXT_PUBLIC_EXPRESS_BACKEND_URL ||
                'https://ai-procurement-backend-q35u.onrender.com';

const SERVICE_OPTIONS = SERVICE_KEYS.map((key) => ({
  value: SERVICES[key].value,
  label: SERVICES[key].name,
  icon: SERVICES[key].icon,
}));

// Plan configurations
const PLANS = [
  {
    id: 'free',
    name: 'Listed',
    price: 0,
    priceLabel: 'Free',
    description: 'Basic listing for new vendors',
    features: [
      { text: 'Company listing', included: true },
      { text: 'Up to 3 products', included: true },
      { text: 'Receive quote requests', included: true },
      { text: 'AI Visibility Score (number only)', included: true },
      { text: 'AI Mentions tracking', included: false },
      { text: 'Visibility breakdown & tips', included: false },
      { text: 'Analytics dashboard', included: false },
      { text: 'Unlimited products', included: false },
      { text: 'Priority AI ranking', included: false },
      { text: 'Verified badge', included: false },
    ],
    cta: 'Current Plan',
    popular: false,
  },
  {
    id: 'visible',
    name: 'Visible',
    price: 99,
    priceLabel: '£99/mo',
    description: 'Get discovered by AI assistants',
    features: [
      { text: 'Company listing', included: true },
      { text: 'Unlimited products', included: true },
      { text: 'Receive quote requests', included: true },
      { text: 'AI Visibility Score', included: true },
      { text: 'AI Mentions tracking', included: true },
      { text: 'Visibility breakdown & tips', included: true },
      { text: 'Analytics dashboard', included: true },
      { text: 'Appear in AI recommendations', included: true },
      { text: 'Priority AI ranking', included: false },
      { text: 'Verified badge', included: false },
    ],
    cta: 'Upgrade to Visible',
    popular: true,
  },
  {
    id: 'verified',
    name: 'Verified',
    price: 149,
    priceLabel: '£149/mo',
    description: 'Maximum visibility & trust',
    features: [
      { text: 'Everything in Visible', included: true },
      { text: 'Verified Supplier badge', included: true },
      { text: 'Priority in AI recommendations', included: true },
      { text: 'Detailed AI query analytics', included: true },
      { text: 'Profile optimisation by us', included: true },
      { text: 'Priority support', included: true },
      { text: 'AI Visibility Score up to 100', included: true },
      { text: 'Competitor insights', included: true },
    ],
    cta: 'Upgrade to Verified',
    popular: false,
  },
];

export default function SettingsPage() {
  const { getCurrentToken } = useAuth();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState<ProfileData>({
    company: '',
    name: '',
    email: '',
    phone: '',
    website: '',
    city: '',
    postcode: '',
    coverage: [],
    description: '',
    yearsInBusiness: 0,
    services: [],
    brands: [],
    certifications: [],
    tier: 'free',
  });
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [upgradingTo, setUpgradingTo] = useState<string | null>(null);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [newBrand, setNewBrand] = useState('');
  const [newCertification, setNewCertification] = useState('');
  const [newCoverage, setNewCoverage] = useState('');

  // Check URL params for tab
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'subscription') {
      setActiveTab('subscription');
    }
  }, [searchParams]);

  const fetchProfile = useCallback(async () => {
    const token = getCurrentToken();
    if (!token) return;

    setLoading(true);
    try {
      const [profileRes, subRes] = await Promise.all([
        fetch(`${API_URL}/api/vendors/profile`, {
          headers: { 'Authorization': `Bearer ${token}` },
        }),
        fetch(`${API_URL}/api/stripe/subscription-status`, {
          headers: { 'Authorization': `Bearer ${token}` },
        }),
      ]);

      if (profileRes.ok) {
        const data = await profileRes.json();
        if (data.vendor) {
          setProfile({
            company: data.vendor.company || '',
            name: data.vendor.name || '',
            email: data.vendor.email || '',
            phone: data.vendor.phone || '',
            website: data.vendor.website || '',
            city: data.vendor.city || '',
            postcode: data.vendor.postcode || '',
            coverage: data.vendor.coverage || [],
            description: data.vendor.description || '',
            yearsInBusiness: data.vendor.yearsInBusiness || 0,
            services: data.vendor.services || [],
            brands: data.vendor.brands || [],
            certifications: data.vendor.certifications || [],
            tier: data.vendor.tier || 'free',
          });
        }
      }

      if (subRes.ok) {
        const subData = await subRes.json();
        setSubscription(subData);
      }
    } catch (error) {
      console.error('Failed to fetch profile:', error);
      setMessage({ text: 'Failed to load profile', type: 'error' });
    } finally {
      setLoading(false);
    }
  }, [getCurrentToken]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = getCurrentToken();
    if (!token) return;

    setSaving(true);
    setMessage(null);

    try {
      const response = await fetch(`${API_URL}/api/vendors/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(profile),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ text: 'Profile saved successfully!', type: 'success' });
      } else {
        setMessage({ text: data.message || 'Failed to save profile', type: 'error' });
      }
    } catch (error) {
      console.error('Failed to save profile:', error);
      setMessage({ text: 'Failed to save profile', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleServiceToggle = (service: string) => {
    setProfile((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
  };

  const addTag = (field: 'brands' | 'certifications' | 'coverage', value: string) => {
    if (!value.trim()) return;
    setProfile((prev) => ({
      ...prev,
      [field]: [...prev[field], value.trim()],
    }));
    if (field === 'brands') setNewBrand('');
    if (field === 'certifications') setNewCertification('');
    if (field === 'coverage') setNewCoverage('');
  };

  const removeTag = (field: 'brands' | 'certifications' | 'coverage', index: number) => {
    setProfile((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  // Handle upgrade to a plan
  const handleUpgrade = async (planId: string) => {
    const token = getCurrentToken();
    if (!token) return;

    setUpgradingTo(planId);
    setMessage(null);

    try {
      const response = await fetch(`${API_URL}/api/stripe/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ planId }),
      });

      const data = await response.json();

      if (data.success && data.url) {
        // Redirect to Stripe checkout
        window.location.href = data.url;
      } else if (response.status === 503) {
        // Stripe not configured
        setMessage({
          text: 'Online payments are not yet available. Please contact us to upgrade: hello@tendorai.com',
          type: 'error',
        });
      } else {
        setMessage({
          text: data.message || 'Failed to start checkout',
          type: 'error',
        });
      }
    } catch (error) {
      console.error('Upgrade error:', error);
      setMessage({
        text: 'Failed to start checkout. Please try again or contact support.',
        type: 'error',
      });
    } finally {
      setUpgradingTo(null);
    }
  };

  // Handle manage subscription (portal)
  const handleManageSubscription = async () => {
    const token = getCurrentToken();
    if (!token) return;

    try {
      const response = await fetch(`${API_URL}/api/stripe/create-portal-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success && data.url) {
        window.location.href = data.url;
      } else {
        setMessage({
          text: data.message || 'Failed to open billing portal',
          type: 'error',
        });
      }
    } catch (error) {
      console.error('Portal error:', error);
      setMessage({
        text: 'Failed to open billing portal',
        type: 'error',
      });
    }
  };

  // Get current plan ID
  const getCurrentPlanId = () => {
    const tier = profile.tier?.toLowerCase() || 'free';
    if (tier === 'managed' || tier === 'verified') return 'verified';
    if (tier === 'basic' || tier === 'visible') return 'visible';
    return 'free';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const currentPlanId = getCurrentPlanId();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your profile and subscription</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex gap-8">
          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'profile'
                ? 'border-purple-600 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab('subscription')}
            className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'subscription'
                ? 'border-purple-600 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Subscription
          </button>
        </nav>
      </div>

      {/* Message */}
      {message && (
        <div
          className={`p-4 rounded-lg ${
            message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Current Plan Badge */}
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-gray-700">Current Plan: </span>
                <span className={`font-semibold ${
                  currentPlanId === 'verified' ? 'text-green-600' :
                  currentPlanId === 'visible' ? 'text-blue-600' :
                  'text-gray-600'
                }`}>
                  {getTierLabel(profile.tier)}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('subscription')}
                className="btn-outline py-1.5 px-3 text-sm"
              >
                {currentPlanId === 'free' ? 'Upgrade Plan' : 'Manage Plan'}
              </button>
            </div>
          </div>

          {/* Business Details */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Business Details</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={profile.company}
                  onChange={handleChange}
                  className="input"
                />
              </div>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  className="input"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  className="input"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  className="input"
                />
              </div>
              <div>
                <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                  Website
                </label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  value={profile.website}
                  onChange={handleChange}
                  placeholder="https://"
                  className="input"
                />
              </div>
              <div>
                <label htmlFor="yearsInBusiness" className="block text-sm font-medium text-gray-700 mb-1">
                  Years in Business
                </label>
                <input
                  type="number"
                  id="yearsInBusiness"
                  name="yearsInBusiness"
                  value={profile.yearsInBusiness || ''}
                  onChange={handleChange}
                  min="0"
                  className="input"
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Location</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={profile.city}
                  onChange={handleChange}
                  className="input"
                />
              </div>
              <div>
                <label htmlFor="postcode" className="block text-sm font-medium text-gray-700 mb-1">
                  Postcode
                </label>
                <input
                  type="text"
                  id="postcode"
                  name="postcode"
                  value={profile.postcode}
                  onChange={handleChange}
                  className="input"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Coverage Areas
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newCoverage}
                  onChange={(e) => setNewCoverage(e.target.value)}
                  placeholder="e.g. South Wales, Bristol"
                  className="input flex-1"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addTag('coverage', newCoverage);
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={() => addTag('coverage', newCoverage)}
                  className="btn-secondary px-4"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {profile.coverage.map((area, i) => (
                  <span key={i} className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-sm">
                    {area}
                    <button
                      type="button"
                      onClick={() => removeTag('coverage', i)}
                      className="ml-2 text-gray-500 hover:text-gray-700"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Services Offered</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {SERVICE_OPTIONS.map((service) => (
                <button
                  key={service.value}
                  type="button"
                  onClick={() => handleServiceToggle(service.value)}
                  className={`flex items-center p-3 rounded-lg border-2 transition-all ${
                    profile.services.includes(service.value)
                      ? 'border-purple-600 bg-purple-50 text-purple-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <span className="text-xl mr-2">{service.icon}</span>
                  <span className="text-sm font-medium">{service.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">About Your Business</h2>
            <textarea
              id="description"
              name="description"
              value={profile.description}
              onChange={handleChange}
              rows={4}
              placeholder="Tell potential customers about your business, experience, and what makes you different..."
              className="input"
            />
          </div>

          {/* Brands & Certifications */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Brands & Certifications</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Brands You Work With
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newBrand}
                    onChange={(e) => setNewBrand(e.target.value)}
                    placeholder="e.g. Canon, Ricoh, Xerox"
                    className="input flex-1"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTag('brands', newBrand);
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => addTag('brands', newBrand)}
                    className="btn-secondary px-4"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {profile.brands.map((brand, i) => (
                    <span key={i} className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
                      {brand}
                      <button
                        type="button"
                        onClick={() => removeTag('brands', i)}
                        className="ml-2 hover:text-blue-900"
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Certifications
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newCertification}
                    onChange={(e) => setNewCertification(e.target.value)}
                    placeholder="e.g. ISO 9001, Cyber Essentials"
                    className="input flex-1"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTag('certifications', newCertification);
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => addTag('certifications', newCertification)}
                    className="btn-secondary px-4"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {profile.certifications.map((cert, i) => (
                    <span key={i} className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
                      {cert}
                      <button
                        type="button"
                        onClick={() => removeTag('certifications', i)}
                        className="ml-2 hover:text-green-900"
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="btn-primary py-2.5 px-6 disabled:opacity-50"
            >
              {saving ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Saving...
                </span>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </form>
      )}

      {/* Subscription Tab */}
      {activeTab === 'subscription' && (
        <div className="space-y-6">
          {/* Current subscription info */}
          {subscription?.subscription && (
            <div className="card p-6 bg-purple-50 border-purple-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-purple-900">Active Subscription</h3>
                  <p className="text-purple-700 text-sm mt-1">
                    {getTierLabel(profile.tier)} Plan
                    {subscription.subscription.currentPeriodEnd && (
                      <> • Renews {new Date(subscription.subscription.currentPeriodEnd).toLocaleDateString('en-GB')}</>
                    )}
                    {subscription.subscription.cancelAtPeriodEnd && (
                      <span className="text-amber-600"> (Cancels at period end)</span>
                    )}
                  </p>
                </div>
                <button
                  onClick={handleManageSubscription}
                  className="btn-secondary py-2 px-4 text-sm"
                >
                  Manage Billing
                </button>
              </div>
            </div>
          )}

          {/* Plan comparison */}
          <div className="grid md:grid-cols-3 gap-6">
            {PLANS.map((plan) => {
              const isCurrent = plan.id === currentPlanId;
              const isUpgrade = !isCurrent && (
                (currentPlanId === 'free' && (plan.id === 'visible' || plan.id === 'verified')) ||
                (currentPlanId === 'visible' && plan.id === 'verified')
              );
              const isDowngrade = !isCurrent && !isUpgrade && plan.id !== currentPlanId;

              return (
                <div
                  key={plan.id}
                  className={`card p-6 relative ${
                    plan.popular ? 'ring-2 ring-purple-600' : ''
                  } ${isCurrent ? 'bg-purple-50 border-purple-200' : ''}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-purple-600 text-white text-xs font-medium rounded-full">
                      Most Popular
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                    <div className="mt-2">
                      <span className="text-3xl font-bold text-gray-900">{plan.priceLabel}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">{plan.description}</p>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        {feature.included ? (
                          <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-gray-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        )}
                        <span className={feature.included ? 'text-gray-700' : 'text-gray-400'}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {isCurrent ? (
                    <div className="w-full py-2.5 px-4 text-center text-purple-700 bg-purple-100 rounded-lg font-medium">
                      Current Plan
                    </div>
                  ) : isUpgrade ? (
                    <button
                      onClick={() => handleUpgrade(plan.id)}
                      disabled={upgradingTo === plan.id}
                      className={`w-full py-2.5 px-4 rounded-lg font-medium transition-colors ${
                        plan.popular
                          ? 'bg-purple-600 text-white hover:bg-purple-700'
                          : 'bg-gray-900 text-white hover:bg-gray-800'
                      } disabled:opacity-50`}
                    >
                      {upgradingTo === plan.id ? 'Processing...' : plan.cta}
                    </button>
                  ) : isDowngrade ? (
                    <button
                      onClick={handleManageSubscription}
                      className="w-full py-2.5 px-4 text-gray-600 bg-gray-100 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                    >
                      Manage Subscription
                    </button>
                  ) : null}
                </div>
              );
            })}
          </div>

          {/* Contact for enterprise */}
          <div className="card p-6 text-center bg-gray-50">
            <h3 className="font-semibold text-gray-900">Need a custom plan?</h3>
            <p className="text-gray-600 text-sm mt-1">
              For enterprise needs or custom requirements, get in touch.
            </p>
            <a
              href="mailto:hello@tendorai.com?subject=Custom Plan Enquiry"
              className="inline-block mt-4 text-purple-600 hover:text-purple-700 font-medium"
            >
              Contact us at hello@tendorai.com
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
