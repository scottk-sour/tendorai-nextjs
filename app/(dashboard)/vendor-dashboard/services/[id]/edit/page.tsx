'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useAuth } from '@/app/contexts/AuthContext';
import ServiceForm from '../../ServiceForm';
import SchemaPreview from '../../SchemaPreview';
import CompletenessPanel from '../../CompletenessPanel';
import {
  getVendorService,
  updateVendorService,
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

export default function EditVendorServicePage() {
  const { auth, getCurrentToken } = useAuth();
  const params = useParams<{ id: string }>();
  const id = params?.id;

  const [vendorType, setVendorType] = useState<VendorType | null>(null);
  const [service, setService] = useState<VendorService | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [savedMessage, setSavedMessage] = useState<string | null>(null);
  const [showSchema, setShowSchema] = useState(false);

  const loadAll = useCallback(async () => {
    const token = getCurrentToken();
    if (!token || !id) return;
    setLoading(true);
    setLoadError(null);
    try {
      const [profileRes, serviceData] = await Promise.all([
        fetch(`${API_URL}/api/vendors/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        }).then(async (r) => {
          if (!r.ok) throw new Error('profile');
          return r.json();
        }),
        getVendorService(id, token),
      ]);

      const vt = profileRes.vendor?.vendorType as string | undefined;
      if (!vt || !(REGULATED_VENDOR_TYPES as readonly string[]).includes(vt)) {
        setLoadError('Service listings are only available for regulated firms.');
        return;
      }
      setVendorType(vt as VendorType);
      setService(serviceData);
    } catch (err) {
      const msg = err instanceof VendorServiceApiError ? err.message : 'Unable to load this service';
      setLoadError(msg);
    } finally {
      setLoading(false);
    }
  }, [getCurrentToken, id]);

  useEffect(() => {
    if (auth.isAuthenticated) loadAll();
  }, [auth.isAuthenticated, loadAll]);

  const handleSubmit = async (value: VendorService) => {
    const token = getCurrentToken();
    if (!token || !id) return;
    setSubmitting(true);
    setSaveError(null);
    setSavedMessage(null);
    try {
      const updated = await updateVendorService(id, value, token);
      setService(updated);
      setSavedMessage('Changes saved.');
    } catch (err) {
      const msg = err instanceof VendorServiceApiError ? err.message : 'Unable to save changes';
      setSaveError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || auth.isLoading) {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-48 bg-gray-200 rounded" />
          <div className="h-64 bg-gray-100 rounded" />
        </div>
      </div>
    );
  }

  if (loadError || !vendorType || !service) {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <div className="card p-6">
          <p className="text-sm text-gray-800">{loadError || 'Service not found.'}</p>
          <Link href="/vendor-dashboard/services" className="inline-block mt-3 text-sm text-purple-700 hover:text-purple-900 font-semibold">
            Back to services
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
        <h1 className="text-2xl font-bold text-gray-900 mt-1">Edit service</h1>
        <p className="text-sm text-gray-500 mt-1">
          Updates to this service regenerate the schema markup automatically.
        </p>
      </div>

      <CompletenessPanel score={service.completenessScore ?? 0} aeoSignals={service.aeoSignals} />

      {service.schemaJsonLd && (
        <div className="card p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3">
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

      {savedMessage && (
        <div className="p-3 rounded-lg bg-green-50 border border-green-200 text-sm text-green-900">
          {savedMessage}
        </div>
      )}

      <ServiceForm
        vendorType={vendorType}
        initial={service}
        submitting={submitting}
        saveLabel="Save changes"
        errorMessage={saveError}
        onSubmit={handleSubmit}
      />

      {showSchema && service.schemaJsonLd && (
        <SchemaPreview
          json={service.schemaJsonLd}
          serviceName={service.name}
          onClose={() => setShowSchema(false)}
        />
      )}
    </div>
  );
}
