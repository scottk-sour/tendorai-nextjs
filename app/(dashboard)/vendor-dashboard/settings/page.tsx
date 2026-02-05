'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import { SERVICES, SERVICE_KEYS } from '@/lib/constants/services';

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

const API_URL = process.env.NEXT_PUBLIC_EXPRESS_BACKEND_URL ||
                'https://ai-procurement-backend-q35u.onrender.com';

const SERVICE_OPTIONS = SERVICE_KEYS.map((key) => ({
  value: SERVICES[key].name,
  label: SERVICES[key].name,
  icon: SERVICES[key].icon,
}));

export default function SettingsPage() {
  const { getCurrentToken } = useAuth();
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
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [newBrand, setNewBrand] = useState('');
  const [newCertification, setNewCertification] = useState('');
  const [newCoverage, setNewCoverage] = useState('');

  const fetchProfile = useCallback(async () => {
    const token = getCurrentToken();
    if (!token) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/vendors/profile`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
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

  const getTierLabel = (tier: string) => {
    const mapping: Record<string, string> = {
      free: 'Listed', listed: 'Listed',
      basic: 'Visible', visible: 'Visible',
      managed: 'Verified', verified: 'Verified',
    };
    return mapping[tier?.toLowerCase()] || 'Listed';
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
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
        <p className="text-gray-600 mt-1">Manage your vendor profile and business details</p>
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

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Subscription Status */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Subscription</h2>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-gray-700">Current Plan: </span>
              <span className="font-semibold">{getTierLabel(profile.tier)}</span>
            </div>
            <Link href="/for-vendors" className="btn-outline py-1.5 px-3 text-sm">
              {getTierLabel(profile.tier) === 'Listed' ? 'Upgrade Plan' : 'Manage Plan'}
            </Link>
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
    </div>
  );
}
