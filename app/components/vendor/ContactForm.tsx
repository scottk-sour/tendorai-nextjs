'use client';

import { useState, FormEvent } from 'react';

interface ContactFormProps {
  vendorId: string;
  vendorName: string;
  isPro: boolean;
}

const API_URL = process.env.NEXT_PUBLIC_EXPRESS_BACKEND_URL ||
                'https://ai-procurement-backend-q35u.onrender.com';

export default function ContactForm({ vendorId, vendorName, isPro }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    contactName: '',
    email: '',
    phone: '',
    message: '',
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.contactName.trim()) errs.contactName = 'Name is required';
    if (!formData.email.trim()) {
      errs.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (!/^[\d\s+()-]{10,}$/.test(formData.phone)) {
      errs.phone = 'Please enter a valid phone number';
    }
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/api/vendor-leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vendorId,
          service: 'General Enquiry',
          contactName: formData.contactName.trim(),
          email: formData.email.trim().toLowerCase(),
          phone: formData.phone.trim(),
          message: formData.message.trim() || undefined,
          source: {
            page: window.location.pathname,
            referrer: document.referrer || 'direct',
            utm: { source: 'tendorai', medium: 'website', campaign: 'vendor-profile' },
          },
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to submit enquiry');
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-green-100 rounded-full mb-4">
          <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Enquiry Sent</h3>
        <p className="text-gray-600">
          Thank you. {vendorName} will be in touch within 1&ndash;2 business days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="cf-contactName" className="block text-sm font-medium text-gray-700 mb-1">
          Your Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="cf-contactName"
          name="contactName"
          value={formData.contactName}
          onChange={handleChange}
          className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${fieldErrors.contactName ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="Your full name"
        />
        {fieldErrors.contactName && <p className="mt-1 text-xs text-red-600">{fieldErrors.contactName}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="cf-email" className="block text-sm font-medium text-gray-700 mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="cf-email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${fieldErrors.email ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="you@company.com"
          />
          {fieldErrors.email && <p className="mt-1 text-xs text-red-600">{fieldErrors.email}</p>}
        </div>
        <div>
          <label htmlFor="cf-phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="cf-phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${fieldErrors.phone ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="01234 567890"
          />
          {fieldErrors.phone && <p className="mt-1 text-xs text-red-600">{fieldErrors.phone}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="cf-message" className="block text-sm font-medium text-gray-700 mb-1">
          How can they help?
        </label>
        <textarea
          id="cf-message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={3}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          placeholder="Briefly describe what you need..."
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Sending...' : 'Send Enquiry'}
      </button>

      {isPro && (
        <p className="text-xs text-gray-500 text-center">
          Enquiries sent here go directly to {vendorName} and appear in their TendorAI dashboard.
        </p>
      )}

      <p className="text-xs text-gray-400 text-center">
        By submitting, you agree to be contacted by {vendorName} regarding your enquiry.
      </p>
    </form>
  );
}
