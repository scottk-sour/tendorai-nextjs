'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_EXPRESS_BACKEND_URL || 'https://ai-procurement-backend-q35u.onrender.com';

interface ClaimedBy {
  name: string;
  email: string;
  role: string;
  date: string;
}

interface Vendor {
  id: string;
  company: string;
  name: string;
  email: string;
  tier: string;
  status: string;
  city: string;
  region: string;
  productCount: number;
  rating: number;
  isClaimed: boolean;
  listingStatus: string;
  claimedBy: ClaimedBy | null;
  claimedAt: string | null;
  createdAt: string;
}

const tierBadgeColors: Record<string, string> = {
  free: 'bg-gray-100 text-gray-700',
  basic: 'bg-slate-100 text-slate-700',
  starter: 'bg-cyan-100 text-cyan-700',
  pro: 'bg-purple-100 text-purple-700',
  visible: 'bg-blue-100 text-blue-700',
  verified: 'bg-green-100 text-green-700',
  listed: 'bg-amber-100 text-amber-700',
  managed: 'bg-teal-100 text-teal-700',
  enterprise: 'bg-indigo-100 text-indigo-700',
};

const statusBadgeColors: Record<string, string> = {
  active: 'bg-green-100 text-green-700',
  pending: 'bg-yellow-100 text-yellow-700',
  suspended: 'bg-red-100 text-red-700',
  inactive: 'bg-gray-100 text-gray-600',
  unclaimed: 'bg-orange-100 text-orange-700',
};

function getToken(): string {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem('admin_token') || '';
}

function formatDateTime(iso?: string | null): string {
  if (!iso) return '—';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '—';
  return d.toLocaleString('en-GB');
}

function formatDate(iso?: string | null): string {
  if (!iso) return '—';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '—';
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function AdminVendorDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = typeof params?.id === 'string' ? params.id : Array.isArray(params?.id) ? params.id[0] : '';

  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchVendor = useCallback(async () => {
    if (!id) {
      setError('Missing vendor id.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');
    try {
      const token = getToken();
      const res = await fetch(`${API_URL}/api/admin/vendors`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 401) {
        router.replace('/admin/login');
        return;
      }

      if (!res.ok) {
        setError(`Failed to load vendors (${res.status}).`);
        return;
      }

      const data = await res.json();
      const list: Vendor[] = data?.success && Array.isArray(data?.data) ? data.data : [];
      const match = list.find((v) => v.id === id) || null;

      if (!match) {
        setError('Vendor not found.');
        return;
      }

      setVendor(match);
    } catch {
      setError('Network error loading vendor.');
    } finally {
      setLoading(false);
    }
  }, [id, router]);

  useEffect(() => {
    fetchVendor();
  }, [fetchVendor]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !vendor) {
    return (
      <div className="space-y-4">
        <Link href="/admin/vendors" className="text-sm text-purple-700 hover:underline">
          ← Back to Vendors
        </Link>
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg flex items-center justify-between gap-4">
          <span>{error || 'Vendor not found.'}</span>
          <button
            type="button"
            onClick={fetchVendor}
            className="px-3 py-1.5 text-sm font-medium rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const showListingStatus =
    vendor.listingStatus &&
    vendor.listingStatus !== (vendor.isClaimed ? 'claimed' : 'unclaimed');

  return (
    <div className="space-y-6">
      {/* Back link */}
      <div>
        <Link href="/admin/vendors" className="text-sm text-purple-700 hover:underline">
          ← Back to Vendors
        </Link>
      </div>

      {/* Header */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-2xl font-bold text-gray-900 break-words">{vendor.company}</h1>
            <p className="text-xs text-gray-400 mt-1 font-mono break-all">{vendor.id}</p>
          </div>
          <div className="flex flex-wrap gap-2 shrink-0">
            <span
              className={`inline-flex text-xs font-medium px-3 py-1 rounded-full ${
                tierBadgeColors[vendor.tier] || 'bg-gray-100 text-gray-700'
              }`}
            >
              {vendor.tier}
            </span>
            <span
              className={`inline-flex text-xs font-medium px-3 py-1 rounded-full ${
                statusBadgeColors[vendor.status] || 'bg-gray-100 text-gray-700'
              }`}
            >
              {vendor.status}
            </span>
          </div>
        </div>
      </div>

      {/* Basics */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-3">
        <h2 className="text-sm font-semibold text-gray-900">Basics</h2>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm">
          <div>
            <dt className="text-xs font-medium text-gray-500">Contact name</dt>
            <dd className="text-gray-900">{vendor.name || '—'}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-gray-500">Email</dt>
            <dd className="text-gray-900 break-all">{vendor.email || '—'}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-gray-500">Location</dt>
            <dd className="text-gray-900">
              {[vendor.city, vendor.region].filter(Boolean).join(', ') || '—'}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-gray-500">Claim status</dt>
            <dd className="text-gray-900">
              {vendor.isClaimed ? 'Claimed' : 'Unclaimed'}
              {showListingStatus && (
                <span className="text-gray-500"> · {vendor.listingStatus}</span>
              )}
            </dd>
          </div>
          {vendor.claimedAt && (
            <div>
              <dt className="text-xs font-medium text-gray-500">Claimed date</dt>
              <dd className="text-gray-900">{formatDateTime(vendor.claimedAt)}</dd>
            </div>
          )}
          <div>
            <dt className="text-xs font-medium text-gray-500">Created</dt>
            <dd className="text-gray-900">{formatDate(vendor.createdAt)}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-gray-500">Products</dt>
            <dd className="text-gray-900">{vendor.productCount}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-gray-500">Rating</dt>
            <dd className="text-gray-900">{vendor.rating > 0 ? vendor.rating.toFixed(1) : '—'}</dd>
          </div>
        </dl>
      </div>

      {/* Claim record */}
      {vendor.isClaimed && vendor.claimedBy && (
        <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-3">
          <h2 className="text-sm font-semibold text-gray-900">Claim record</h2>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm">
            <div>
              <dt className="text-xs font-medium text-gray-500">Name</dt>
              <dd className="text-gray-900">{vendor.claimedBy.name || '—'}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-gray-500">Role</dt>
              <dd className="text-gray-900">{vendor.claimedBy.role || '—'}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-gray-500">Email</dt>
              <dd className="text-gray-900 break-all">{vendor.claimedBy.email || '—'}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-gray-500">Claimed at</dt>
              <dd className="text-gray-900">
                {formatDateTime(vendor.claimedBy.date || vendor.claimedAt)}
              </dd>
            </div>
          </dl>
        </div>
      )}
    </div>
  );
}
