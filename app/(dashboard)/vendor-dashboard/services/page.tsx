'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/contexts/AuthContext';
import {
  listVendorServices,
  deleteVendorService,
  VendorServiceApiError,
} from '@/lib/vendorServices/api';
import type { VendorService } from '@/lib/vendorServices/types';
import SchemaPreview from './SchemaPreview';

function formatDate(iso?: string): string {
  if (!iso) return '—';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '—';
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

function CompletenessBar({ score }: { score: number }) {
  const pct = Math.max(0, Math.min(100, Math.round(score)));
  const colour = pct >= 80 ? '#16A34A' : pct >= 50 ? '#D97706' : pct >= 25 ? '#EA580C' : '#DC2626';
  return (
    <div className="flex items-center gap-2 min-w-[110px]">
      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, backgroundColor: colour }}
        />
      </div>
      <span className="text-xs font-semibold text-gray-700 tabular-nums w-8 text-right">{pct}%</span>
    </div>
  );
}

function StatusPill({ active }: { active?: boolean }) {
  if (active === false) {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
        Inactive
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
      Active
    </span>
  );
}

export default function VendorServicesListPage() {
  const { auth, getCurrentToken } = useAuth();
  const router = useRouter();

  const [services, setServices] = useState<VendorService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [previewSchema, setPreviewSchema] = useState<{ json: unknown; serviceName: string } | null>(null);

  const loadServices = useCallback(async () => {
    const token = getCurrentToken();
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const data = await listVendorServices(token);
      setServices(Array.isArray(data) ? data : []);
    } catch (err) {
      const msg = err instanceof VendorServiceApiError ? err.message : 'Unable to load services';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [getCurrentToken]);

  useEffect(() => {
    if (auth.isAuthenticated) loadServices();
  }, [auth.isAuthenticated, loadServices]);

  const handleDelete = async (service: VendorService) => {
    if (!service._id) return;
    const confirmed = window.confirm(
      `Deactivate "${service.name}"? It will be hidden from your listings but can be restored by support.`,
    );
    if (!confirmed) return;

    const token = getCurrentToken();
    if (!token) return;
    setDeletingId(service._id);
    try {
      await deleteVendorService(service._id, token);
      await loadServices();
    } catch (err) {
      const msg = err instanceof VendorServiceApiError ? err.message : 'Unable to deactivate service';
      setError(msg);
    } finally {
      setDeletingId(null);
    }
  };

  if (auth.isLoading || loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-48 bg-gray-200 rounded" />
          <div className="h-32 bg-gray-100 rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Services</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage the services your firm offers. Each service generates its own schema markup that AI assistants read when recommending you.
          </p>
        </div>
        <button
          type="button"
          onClick={() => router.push('/vendor-dashboard/services/new')}
          className="inline-flex items-center justify-center px-4 py-2 bg-purple-600 text-white text-sm font-semibold rounded-lg hover:bg-purple-700 transition-colors"
        >
          + Add new service
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-800">
          {error}
        </div>
      )}

      {services.length === 0 ? (
        <div className="card p-8 text-center">
          <p className="text-gray-600 font-medium mb-1">No services yet</p>
          <p className="text-sm text-gray-500 mb-4">
            Add your first service so AI assistants know what to recommend you for.
          </p>
          <Link
            href="/vendor-dashboard/services/new"
            className="inline-flex items-center px-4 py-2 bg-purple-600 text-white text-sm font-semibold rounded-lg hover:bg-purple-700 transition-colors"
          >
            + Add your first service
          </Link>
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden md:block card overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr className="text-left">
                  <th className="px-4 py-3 font-semibold text-gray-600">Name</th>
                  <th className="px-4 py-3 font-semibold text-gray-600">Type</th>
                  <th className="px-4 py-3 font-semibold text-gray-600">Completeness</th>
                  <th className="px-4 py-3 font-semibold text-gray-600">Status</th>
                  <th className="px-4 py-3 font-semibold text-gray-600">Updated</th>
                  <th className="px-4 py-3 font-semibold text-gray-600 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {services.map((svc) => (
                  <tr key={svc._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">{svc.name}</td>
                    <td className="px-4 py-3 text-gray-600">{svc.serviceType || '—'}</td>
                    <td className="px-4 py-3"><CompletenessBar score={svc.completenessScore ?? 0} /></td>
                    <td className="px-4 py-3"><StatusPill active={svc.active} /></td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{formatDate(svc.updatedAt)}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-3">
                        {svc.schemaJsonLd && (
                          <button
                            type="button"
                            onClick={() => setPreviewSchema({ json: svc.schemaJsonLd, serviceName: svc.name })}
                            className="text-xs text-gray-600 hover:text-gray-900 font-medium"
                          >
                            View schema
                          </button>
                        )}
                        <Link
                          href={`/vendor-dashboard/services/${svc._id}/edit`}
                          className="text-xs text-purple-700 hover:text-purple-900 font-semibold"
                        >
                          Edit
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(svc)}
                          disabled={deletingId === svc._id}
                          className="text-xs text-red-600 hover:text-red-800 font-medium disabled:opacity-50"
                        >
                          {deletingId === svc._id ? 'Deactivating…' : 'Delete'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-3">
            {services.map((svc) => (
              <div key={svc._id} className="card p-4">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-900 truncate">{svc.name}</p>
                    {svc.serviceType && (
                      <p className="text-xs text-gray-500 mt-0.5">{svc.serviceType}</p>
                    )}
                  </div>
                  <StatusPill active={svc.active} />
                </div>
                <div className="mb-3">
                  <p className="text-xs text-gray-500 mb-1">Completeness</p>
                  <CompletenessBar score={svc.completenessScore ?? 0} />
                </div>
                <p className="text-xs text-gray-400 mb-3">Updated {formatDate(svc.updatedAt)}</p>
                <div className="flex flex-wrap items-center gap-3 text-xs font-medium">
                  <Link
                    href={`/vendor-dashboard/services/${svc._id}/edit`}
                    className="text-purple-700 hover:text-purple-900 font-semibold"
                  >
                    Edit
                  </Link>
                  {svc.schemaJsonLd && (
                    <button
                      type="button"
                      onClick={() => setPreviewSchema({ json: svc.schemaJsonLd, serviceName: svc.name })}
                      className="text-gray-700"
                    >
                      View schema
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => handleDelete(svc)}
                    disabled={deletingId === svc._id}
                    className="text-red-600 disabled:opacity-50 ml-auto"
                  >
                    {deletingId === svc._id ? 'Deactivating…' : 'Delete'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {previewSchema && (
        <SchemaPreview
          json={previewSchema.json}
          serviceName={previewSchema.serviceName}
          onClose={() => setPreviewSchema(null)}
        />
      )}
    </div>
  );
}
