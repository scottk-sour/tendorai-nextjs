'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/contexts/AuthContext';
import ServiceForm from '../ServiceForm';
import SchemaPreview from '../SchemaPreview';
import CompletenessPanel from '../CompletenessPanel';
import {
  createVendorService,
  VendorServiceApiError,
} from '@/lib/vendorServices/api';
import type { VendorService, VendorType } from '@/lib/vendorServices/types';

const API_URL = process.env.NEXT_PUBLIC_EXPRESS_BACKEND_URL ||
                'https://ai-procurement-backend-q35u.onrender.com';

const REGULATED_VENDOR_TYPES: readonly VendorType[] = [
  'solicitor',
  'accountant',
  'mortgage-advisor',
  'estate-agent',
];

export default function NewVendorServicePage() {
  const { auth, getCurrentToken } = useAuth();
  const router = useRouter();

  const [vendorType, setVendorType] = useState<VendorType | null>(null);
  const [profileLoaded, setProfileLoaded] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saved, setSaved] = useState<VendorService | null>(null);
  const [showSchema, setShowSchema] = useState(false);

  const loadVendorType = useCallback(async () => {
    const token = getCurrentToken();
    if (!token) return;
    try {
      const res = await fetch(`${API_URL}/api/vendors/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Unable to load firm profile');
      const data = await res.json();
      const vt = data.vendor?.vendorType as string | undefined;
      if (vt && (REGULATED_VENDOR_TYPES as readonly string[]).includes(vt)) {
        setVendorType(vt as VendorType);
      } else {
        setProfileError('Service listings are only available for regulated firms (solicitor, accountant, mortgage adviser, estate agent).');
      }
    } catch {
      setProfileError('Unable to load your firm profile. Refresh to try again.');
    } finally {
      setProfileLoaded(true);
    }
  }, [getCurrentToken]);

  useEffect(() => {
    if (auth.isAuthenticated) loadVendorType();
  }, [auth.isAuthenticated, loadVendorType]);

  const handleSubmit = async (value: VendorService) => {
    const token = getCurrentToken();
    if (!token) return;
    setSubmitting(true);
    setSaveError(null);
    try {
      const created = await createVendorService(value, token);
      setSaved(created);
    } catch (err) {
      const msg = err instanceof VendorServiceApiError ? err.message : 'Unable to save service';
      setSaveError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  if (!profileLoaded || auth.isLoading) {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-48 bg-gray-200 rounded" />
          <div className="h-64 bg-gray-100 rounded" />
        </div>
      </div>
    );
  }

  if (profileError || !vendorType) {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <div className="card p-6">
          <p className="text-sm text-gray-800">{profileError || 'Could not determine your vendor type.'}</p>
          <Link href="/vendor-dashboard" className="inline-block mt-3 text-sm text-purple-700 hover:text-purple-900 font-semibold">
            Back to dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-3xl mx-auto space-y-6">
      <div>
        <Link href="/vendor-dashboard/services" className="text-xs text-gray-500 hover:text-gray-800">
          ← Back to services
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-1">Add a new service</h1>
        <p className="text-sm text-gray-500 mt-1">
          Each service generates its own schema markup that AI assistants read when recommending you.
        </p>
      </div>

      {saved ? (
        <div className="space-y-6">
          <div className="p-4 rounded-lg bg-green-50 border border-green-200">
            <p className="text-sm font-semibold text-green-900">
              &ldquo;{saved.name}&rdquo; saved. It&apos;s now live in your listings.
            </p>
          </div>

          <CompletenessPanel
            score={saved.completenessScore ?? 0}
            aeoSignals={saved.aeoSignals}
          />

          {saved.schemaJsonLd && (
            <div className="card p-5 sm:p-6">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <h3 className="text-base font-semibold text-gray-900">Generated schema</h3>
                  <p className="text-xs text-gray-500 mt-1">
                    This is the schema.org markup your website should include for this service.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowSchema(true)}
                  className="flex-shrink-0 text-xs font-semibold text-purple-700 hover:text-purple-900"
                >
                  View schema →
                </button>
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-3">
            <Link
              href={`/vendor-dashboard/services/${saved._id}/edit`}
              className="inline-flex items-center px-4 py-2 bg-purple-600 text-white text-sm font-semibold rounded-lg hover:bg-purple-700 transition-colors"
            >
              Edit this service
            </Link>
            <button
              type="button"
              onClick={() => router.push('/vendor-dashboard/services')}
              className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-200 transition-colors"
            >
              Back to services list
            </button>
          </div>

          {showSchema && saved.schemaJsonLd && (
            <SchemaPreview
              json={saved.schemaJsonLd}
              serviceName={saved.name}
              onClose={() => setShowSchema(false)}
            />
          )}
        </div>
      ) : (
        <ServiceForm
          vendorType={vendorType}
          submitting={submitting}
          saveLabel="Create service"
          errorMessage={saveError}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}
