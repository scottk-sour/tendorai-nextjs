'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_EXPRESS_BACKEND_URL ||
  'https://ai-procurement-backend-q35u.onrender.com';

export default function VendorClaimPage() {
  const params = useParams();
  const vendorId = params.id as string;

  const [companyName, setCompanyName] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Owner');

  useEffect(() => {
    async function fetchVendor() {
      try {
        const res = await fetch(`${API_URL}/api/vendors/all?status=unclaimed&limit=100`);
        const data = await res.json();
        if (data.success) {
          const vendor = data.data?.vendors?.find(
            (v: { _id: string }) => v._id === vendorId
          );
          if (vendor) {
            setCompanyName(vendor.company);
          }
        }
      } catch {
        // Ignore fetch errors, company name is optional
      } finally {
        setLoading(false);
      }
    }
    fetchVendor();
  }, [vendorId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    if (!name.trim() || !email.trim() || !password.trim()) {
      setError('All fields are required.');
      setSubmitting(false);
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      setSubmitting(false);
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/vendors/claim`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vendorId, name, email, password, role }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Failed to submit claim.');
        setSubmitting(false);
        return;
      }

      setSuccess(true);
    } catch {
      setError('A network error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen pt-16 pb-12">
        <section className="bg-brand-gradient text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Claim Submitted</h1>
          </div>
        </section>
        <section className="py-12">
          <div className="max-w-md mx-auto px-4">
            <div className="card p-8 text-center">
              <div className="text-5xl mb-4">&#x2705;</div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                We&apos;ve received your claim
                {companyName ? ` for ${companyName}` : ''}
              </h2>
              <p className="text-gray-600 mb-6">
                Our team will review and activate your account within 24 hours.
                You&apos;ll receive an email when your account is ready.
              </p>
              <Link href="/" className="btn-primary inline-block px-6 py-3">
                Back to Home
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 pb-12">
      {/* Hero */}
      <section className="bg-brand-gradient text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 text-sm font-medium mb-4">
            Claim Your Listing
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            {companyName ? `Claim ${companyName}` : 'Claim This Listing'}
          </h1>
          <p className="text-lg text-purple-100 max-w-md mx-auto">
            Verify your ownership and start managing your business listing on TendorAI
          </p>
        </div>
      </section>

      {/* Claim Form */}
      <section className="py-12">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. John Smith"
                  required
                  disabled={submitting}
                  className="input"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Business Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@yourcompany.com"
                  required
                  autoComplete="email"
                  disabled={submitting}
                  className="input"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Create Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 8 characters"
                  required
                  minLength={8}
                  autoComplete="new-password"
                  disabled={submitting}
                  className="input"
                />
              </div>

              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Role <span className="text-red-500">*</span>
                </label>
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  disabled={submitting}
                  className="input"
                >
                  <option value="Owner">Owner</option>
                  <option value="Director">Director</option>
                  <option value="Manager">Manager</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full btn-primary py-3 text-base disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  'Submit Claim'
                )}
              </button>

              <p className="text-center text-xs text-gray-500">
                By submitting, you confirm you are authorised to manage this business listing.
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
