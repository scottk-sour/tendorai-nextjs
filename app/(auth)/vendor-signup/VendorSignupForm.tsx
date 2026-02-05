'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import { validateEmail, validatePhone, VendorSignupData } from '@/lib/auth';
import { SERVICES, ServiceKey, SERVICE_KEYS } from '@/lib/constants/services';

const SERVICE_OPTIONS = SERVICE_KEYS.map((key) => ({
  value: SERVICES[key].value, // Backend-expected value (e.g., 'IT' not 'IT Services')
  label: SERVICES[key].name,  // Display name (e.g., 'IT Services')
  icon: SERVICES[key].icon,
}));

export default function VendorSignupForm() {
  const [formData, setFormData] = useState<VendorSignupData>({
    name: '',
    company: '',
    email: '',
    password: '',
    services: [],
    phone: '',
    address: '',
    location: '',
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const router = useRouter();
  const searchParams = useSearchParams();
  const { auth, signupVendor } = useAuth();

  const plan = searchParams.get('plan') || 'free';

  // Redirect if already authenticated as vendor
  useEffect(() => {
    if (!auth.isLoading && auth.isAuthenticated && auth.user?.role === 'vendor') {
      router.replace('/vendor-dashboard');
    }
  }, [auth, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleServiceToggle = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const { name, company, email, password, services, phone } = formData;

    // Validation
    if (!name || !company || !email || !password || services.length === 0) {
      setError('Please complete all required fields: Name, Company, Email, Password, and at least one Service.');
      setLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      setLoading(false);
      return;
    }

    if (phone && !validatePhone(phone)) {
      setError('Please enter a valid phone number (10-15 digits) or leave it blank.');
      setLoading(false);
      return;
    }

    try {
      const result = await signupVendor(formData);

      if (result.success) {
        setSuccess('Registration successful! Redirecting to login...');
        setTimeout(() => router.push('/vendor-login'), 2000);
      } else {
        setError(result.message || 'Error signing up. Please try again.');
      }
    } catch {
      setError('A network error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Show loading while checking auth
  if (auth.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 pb-12">
      {/* Hero */}
      <section className="bg-brand-gradient text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Become a TendorAI Vendor
          </h1>
          <p className="text-lg text-purple-100 max-w-xl mx-auto">
            Join our network to receive qualified leads and connect with businesses through AI
          </p>
          {plan !== 'free' && (
            <div className="mt-4 inline-flex items-center px-4 py-2 rounded-full bg-white/20 text-sm font-medium">
              Selected plan: {plan.charAt(0).toUpperCase() + plan.slice(1)}
            </div>
          )}
        </div>
      </section>

      {/* Signup Form */}
      <section className="py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {error}
                </div>
              )}
              {success && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                  {success}
                </div>
              )}

              {/* Required Fields Section */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                  Account Details
                </h2>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      required
                      disabled={loading}
                      className="input"
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                      Company Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Enter your company name"
                      required
                      disabled={loading}
                      className="input"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your business email"
                    required
                    autoComplete="email"
                    disabled={loading}
                    className="input"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={passwordVisible ? 'text' : 'password'}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create a password (min 8 characters)"
                      required
                      autoComplete="new-password"
                      disabled={loading}
                      className="input pr-16"
                    />
                    <button
                      type="button"
                      onClick={() => setPasswordVisible(!passwordVisible)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-gray-700"
                      disabled={loading}
                    >
                      {passwordVisible ? 'Hide' : 'Show'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Services Section */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                  Services Offered <span className="text-red-500">*</span>
                </h2>
                <p className="text-sm text-gray-500">
                  Select all services your company provides
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {SERVICE_OPTIONS.map((service) => (
                    <button
                      key={service.value}
                      type="button"
                      onClick={() => handleServiceToggle(service.value)}
                      disabled={loading}
                      className={`flex items-center p-3 rounded-lg border-2 transition-all ${
                        formData.services.includes(service.value)
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

              {/* Optional Fields Section */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                  Business Details <span className="text-sm font-normal text-gray-500">(Optional)</span>
                </h2>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone || ''}
                      onChange={handleChange}
                      placeholder="e.g. 01onal23 456789"
                      disabled={loading}
                      className="input"
                    />
                  </div>

                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                      Location / City
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location || ''}
                      onChange={handleChange}
                      placeholder="e.g. Cardiff, Bristol"
                      disabled={loading}
                      className="input"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Business Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address || ''}
                    onChange={handleChange}
                    placeholder="Enter your business address"
                    disabled={loading}
                    className="input"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-3 text-base disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Creating Account...
                  </span>
                ) : (
                  'Create Vendor Account'
                )}
              </button>

              <p className="text-center text-sm text-gray-600">
                Already have a vendor account?{' '}
                <Link href="/vendor-login" className="link font-medium">
                  Log in here
                </Link>
              </p>
            </form>
          </div>

          {/* Benefits */}
          <div className="mt-8 bg-purple-50 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Why join TendorAI?</h3>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Receive qualified leads from businesses actively looking for your services</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Get recommended by AI when businesses search for suppliers</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Track your performance with detailed analytics dashboard</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Free tier available - upgrade anytime for enhanced visibility</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
