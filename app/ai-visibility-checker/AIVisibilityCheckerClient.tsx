'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const BUSINESS_TYPES = [
  { value: '', label: 'Select your business type' },
  { value: 'conveyancing', label: 'Solicitor — Conveyancing' },
  { value: 'family-law', label: 'Solicitor — Family Law' },
  { value: 'criminal-law', label: 'Solicitor — Criminal Law' },
  { value: 'commercial-law', label: 'Solicitor — Commercial Law' },
  { value: 'employment-law', label: 'Solicitor — Employment Law' },
  { value: 'wills-and-probate', label: 'Solicitor — Wills & Probate' },
  { value: 'immigration', label: 'Solicitor — Immigration' },
  { value: 'personal-injury', label: 'Solicitor — Personal Injury' },
  { value: 'tax-advisory', label: 'Accountant — Tax Advisory' },
  { value: 'audit-assurance', label: 'Accountant — Audit & Assurance' },
  { value: 'bookkeeping', label: 'Accountant — Bookkeeping' },
  { value: 'payroll', label: 'Accountant — Payroll' },
  { value: 'residential-mortgages', label: 'Mortgage Adviser — Residential' },
  { value: 'buy-to-let', label: 'Mortgage Adviser — Buy-to-Let' },
  { value: 'remortgage', label: 'Mortgage Adviser — Remortgage' },
  { value: 'first-time-buyer', label: 'Mortgage Adviser — First-Time Buyer' },
  { value: 'sales', label: 'Estate Agent — Sales' },
  { value: 'lettings', label: 'Estate Agent — Lettings' },
  { value: 'property-management', label: 'Estate Agent — Property Management' },
];

export default function AIVisibilityCheckerClient() {
  const router = useRouter();
  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({
      company: businessName,
      category: businessType,
      city: location,
    });
    router.push(`/aeo-report?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 sm:p-8 space-y-5">
      <div>
        <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-1">
          Business Name *
        </label>
        <input
          id="businessName"
          type="text"
          required
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          placeholder="e.g. Smith & Jones Solicitors"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900"
        />
      </div>

      <div>
        <label htmlFor="businessType" className="block text-sm font-medium text-gray-700 mb-1">
          Business Type *
        </label>
        <select
          id="businessType"
          required
          value={businessType}
          onChange={(e) => setBusinessType(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900 bg-white"
        >
          {BUSINESS_TYPES.map((t) => (
            <option key={t.value} value={t.value} disabled={t.value === ''}>
              {t.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
          City / Town *
        </label>
        <input
          id="location"
          type="text"
          required
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="e.g. Cardiff"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900"
        />
      </div>

      <button
        type="submit"
        className="w-full py-3.5 px-6 rounded-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl text-lg"
      >
        Check My AI Visibility &mdash; Free
      </button>

      <p className="text-xs text-gray-400 text-center">
        No signup required. Your report is generated instantly.
      </p>
    </form>
  );
}
