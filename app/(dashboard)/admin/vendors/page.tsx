'use client';

import { useEffect, useState, useCallback, useRef } from 'react';

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

function getToken(): string {
  return localStorage.getItem('admin_token') || '';
}

const tierOptions = ['free', 'visible', 'verified'];
const statusOptions = ['active', 'pending', 'suspended', 'inactive', 'unclaimed'];

const tierBadgeColors: Record<string, string> = {
  free: 'bg-gray-100 text-gray-700',
  visible: 'bg-blue-100 text-blue-700',
  verified: 'bg-green-100 text-green-700',
};

const statusBadgeColors: Record<string, string> = {
  active: 'bg-green-100 text-green-700',
  pending: 'bg-yellow-100 text-yellow-700',
  suspended: 'bg-red-100 text-red-700',
  inactive: 'bg-gray-100 text-gray-600',
  unclaimed: 'bg-orange-100 text-orange-700',
};

export default function AdminVendorsPage() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [filterTier, setFilterTier] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [deleteTarget, setDeleteTarget] = useState<Vendor | null>(null);
  const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [deleting, setDeleting] = useState(false);
  const toastTimer = useRef<NodeJS.Timeout | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastMessage(''), 3000);
  };

  const handleDeleteVendor = async (id: string) => {
    setDeleting(true);
    try {
      const token = getToken();
      const res = await fetch(`${API_URL}/api/admin/vendors/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setVendors((prev) => prev.filter((v) => v.id !== id));
        setSelectedIds((prev) => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
        showToast('Vendor deleted');
      }
    } catch {
      // silent fail
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  };

  const handleBulkDelete = async () => {
    setDeleting(true);
    try {
      const token = getToken();
      const ids = Array.from(selectedIds);
      const res = await fetch(`${API_URL}/api/admin/vendors/bulk-delete`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ids }),
      });
      if (res.ok) {
        const data = await res.json();
        setVendors((prev) => prev.filter((v) => !selectedIds.has(v.id)));
        setSelectedIds(new Set());
        showToast(`${data.count} vendor${data.count === 1 ? '' : 's'} deleted`);
      }
    } catch {
      // silent fail
    } finally {
      setDeleting(false);
      setBulkDeleteOpen(false);
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    const filteredIds = filtered.map((v) => v.id);
    const allSelected = filteredIds.length > 0 && filteredIds.every((id) => selectedIds.has(id));
    if (allSelected) {
      setSelectedIds((prev) => {
        const next = new Set(prev);
        filteredIds.forEach((id) => next.delete(id));
        return next;
      });
    } else {
      setSelectedIds((prev) => {
        const next = new Set(prev);
        filteredIds.forEach((id) => next.add(id));
        return next;
      });
    }
  };

  const fetchVendors = useCallback(async () => {
    try {
      const token = getToken();
      const res = await fetch(`${API_URL}/api/admin/vendors`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        setError('Failed to fetch vendors');
        setLoading(false);
        return;
      }

      const data = await res.json();
      if (data.success) setVendors(data.data);
    } catch {
      setError('Network error loading vendors');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVendors();
  }, [fetchVendors]);

  const updateTier = async (vendorId: string, tier: string) => {
    setUpdatingId(vendorId);
    try {
      const token = getToken();
      const res = await fetch(`${API_URL}/api/admin/vendors/${vendorId}/tier`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tier }),
      });

      if (res.ok) {
        setVendors((prev) =>
          prev.map((v) => (v.id === vendorId ? { ...v, tier } : v))
        );
      }
    } catch {
      // silent fail
    } finally {
      setUpdatingId(null);
    }
  };

  const updateStatus = async (vendorId: string, status: string) => {
    setUpdatingId(vendorId);
    try {
      const token = getToken();
      const res = await fetch(`${API_URL}/api/admin/vendors/${vendorId}/status`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        setVendors((prev) =>
          prev.map((v) => {
            if (v.id !== vendorId) return v;
            const updated = { ...v, status };
            // If rejecting (setting to unclaimed), clear claimed state
            if (status === 'unclaimed') {
              updated.listingStatus = 'unclaimed';
            }
            return updated;
          })
        );
      }
    } catch {
      // silent fail
    } finally {
      setUpdatingId(null);
    }
  };

  const handleExportCSV = () => {
    const token = getToken();
    fetch(`${API_URL}/api/admin/vendors/export/csv`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `tendorai-vendors-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        URL.revokeObjectURL(url);
      });
  };

  // Pending claims: vendors with status=pending AND claimedBy data
  const pendingClaims = vendors.filter(
    (v) => v.status === 'pending' && v.claimedBy?.name
  );

  // Client-side filtering
  const filtered = vendors.filter((v) => {
    const matchesSearch =
      !search ||
      v.company.toLowerCase().includes(search.toLowerCase()) ||
      v.email.toLowerCase().includes(search.toLowerCase()) ||
      v.name.toLowerCase().includes(search.toLowerCase());

    const matchesTier = filterTier === 'all' || v.tier === filterTier;
    const matchesStatus = filterStatus === 'all' || v.status === filterStatus;

    return matchesSearch && matchesTier && matchesStatus;
  });

  // Stats
  const totalVendors = vendors.length;
  const activeVendors = vendors.filter((v) => v.status === 'active').length;
  const paidVendors = vendors.filter((v) => !['free'].includes(v.tier)).length;
  const unclaimedVendors = vendors.filter((v) => !v.isClaimed).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Vendors</h1>
          <p className="text-gray-500 mt-1">Manage all vendor accounts</p>
        </div>
        <button
          onClick={handleExportCSV}
          className="inline-flex items-center px-4 py-2 bg-slate-800 text-white text-sm font-medium rounded-lg hover:bg-slate-700 transition"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Export CSV
        </button>
      </div>

      {/* Pending Claims Section */}
      {pendingClaims.length > 0 && (
        <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-6">
          <h2 className="text-lg font-bold text-amber-800 mb-4">
            Pending Claims ({pendingClaims.length})
          </h2>
          <div className="space-y-3">
            {pendingClaims.map((vendor) => (
              <div
                key={vendor.id}
                className="bg-white rounded-lg border border-amber-200 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900">{vendor.company}</p>
                  <div className="text-sm text-gray-600 mt-1 space-y-0.5">
                    <p>
                      <span className="font-medium">Claimed by:</span>{' '}
                      {vendor.claimedBy?.name} ({vendor.claimedBy?.role})
                    </p>
                    <p>
                      <span className="font-medium">Email:</span>{' '}
                      {vendor.claimedBy?.email}
                    </p>
                    {vendor.claimedAt && (
                      <p className="text-xs text-gray-400">
                        {new Date(vendor.claimedAt).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => updateStatus(vendor.id, 'active')}
                    disabled={updatingId === vendor.id}
                    className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 disabled:opacity-50 transition"
                  >
                    Activate
                  </button>
                  <button
                    onClick={() => updateStatus(vendor.id, 'unclaimed')}
                    disabled={updatingId === vendor.id}
                    className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 disabled:opacity-50 transition"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
          <p className="text-2xl font-bold text-gray-900">{totalVendors}</p>
          <p className="text-sm text-gray-500">Total</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
          <p className="text-2xl font-bold text-green-600">{activeVendors}</p>
          <p className="text-sm text-gray-500">Active</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
          <p className="text-2xl font-bold text-blue-600">{paidVendors}</p>
          <p className="text-sm text-gray-500">Paid</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
          <p className="text-2xl font-bold text-orange-600">{unclaimedVendors}</p>
          <p className="text-sm text-gray-500">Unclaimed</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Search by name, company or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
          />
          <select
            value={filterTier}
            onChange={(e) => setFilterTier(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
          >
            <option value="all">All Tiers</option>
            {tierOptions.map((t) => (
              <option key={t} value={t}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </option>
            ))}
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
          >
            <option value="all">All Statuses</option>
            {statusOptions.map((s) => (
              <option key={s} value={s}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Showing {filtered.length} of {totalVendors} vendors
        </p>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 w-10">
                  <input
                    type="checkbox"
                    checked={filtered.length > 0 && filtered.every((v) => selectedIds.has(v.id))}
                    onChange={toggleSelectAll}
                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                </th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Company</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Email</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Tier</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">City</th>
                <th className="text-center px-4 py-3 font-medium text-gray-600">Products</th>
                <th className="text-center px-4 py-3 font-medium text-gray-600">Rating</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Created</th>
                <th className="px-4 py-3 w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((vendor) => (
                <tr key={vendor.id} className={`hover:bg-gray-50 transition ${selectedIds.has(vendor.id) ? 'bg-purple-50' : ''}`}>
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedIds.has(vendor.id)}
                      onChange={() => toggleSelect(vendor.id)}
                      className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium text-gray-900">{vendor.company}</p>
                      {!vendor.isClaimed && (
                        <span className="text-xs text-orange-600">Unclaimed</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600 max-w-[200px] truncate">
                    {vendor.email}
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={vendor.tier}
                      onChange={(e) => updateTier(vendor.id, e.target.value)}
                      disabled={updatingId === vendor.id}
                      className={`text-xs font-medium px-2 py-1 rounded-full border-0 cursor-pointer ${
                        tierBadgeColors[vendor.tier] || 'bg-gray-100 text-gray-700'
                      } disabled:opacity-50`}
                    >
                      {tierOptions.map((t) => (
                        <option key={t} value={t}>
                          {t.charAt(0).toUpperCase() + t.slice(1)}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={vendor.status}
                      onChange={(e) => updateStatus(vendor.id, e.target.value)}
                      disabled={updatingId === vendor.id}
                      className={`text-xs font-medium px-2 py-1 rounded-full border-0 cursor-pointer ${
                        statusBadgeColors[vendor.status] || 'bg-gray-100 text-gray-600'
                      } disabled:opacity-50`}
                    >
                      {statusOptions.map((s) => (
                        <option key={s} value={s}>
                          {s.charAt(0).toUpperCase() + s.slice(1)}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{vendor.city}</td>
                  <td className="px-4 py-3 text-center text-gray-600">{vendor.productCount}</td>
                  <td className="px-4 py-3 text-center text-gray-600">
                    {vendor.rating > 0 ? vendor.rating.toFixed(1) : '-'}
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs">
                    {new Date(vendor.createdAt).toLocaleDateString('en-GB')}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setDeleteTarget(vendor)}
                      className="p-1 text-gray-400 hover:text-red-600 transition"
                      title="Delete vendor"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={10} className="px-4 py-8 text-center text-gray-500">
                    No vendors found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Floating Action Bar */}
      {selectedIds.size > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-4 z-40">
          <span className="text-sm font-medium">{selectedIds.size} selected</span>
          <button
            onClick={() => setBulkDeleteOpen(true)}
            className="px-4 py-1.5 bg-red-600 text-white text-sm font-medium rounded-full hover:bg-red-700 transition"
          >
            Delete Selected
          </button>
          <button
            onClick={() => setSelectedIds(new Set())}
            className="text-sm text-gray-300 hover:text-white transition underline"
          >
            Clear
          </button>
        </div>
      )}

      {/* Single Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 p-6">
            <h3 className="text-lg font-bold text-gray-900">Delete {deleteTarget.company}?</h3>
            <p className="text-sm text-gray-600 mt-2">
              This will permanently remove this vendor and all their data (products, leads, reviews, posts, audits, and mention scans). This cannot be undone.
            </p>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setDeleteTarget(null)}
                disabled={deleting}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteVendor(deleteTarget.id)}
                disabled={deleting}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50 transition flex items-center gap-2"
              >
                {deleting && (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                )}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Delete Confirmation Modal */}
      {bulkDeleteOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 p-6">
            <h3 className="text-lg font-bold text-gray-900">Delete {selectedIds.size} vendor{selectedIds.size === 1 ? '' : 's'}?</h3>
            <p className="text-sm text-gray-600 mt-2">
              This will permanently remove {selectedIds.size === 1 ? 'this vendor' : 'these vendors'} and all their data (products, leads, reviews, posts, audits, and mention scans). This cannot be undone.
            </p>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setBulkDeleteOpen(false)}
                disabled={deleting}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleBulkDelete}
                disabled={deleting}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50 transition flex items-center gap-2"
              >
                {deleting && (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                )}
                Delete {selectedIds.size} Vendor{selectedIds.size === 1 ? '' : 's'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-green-600 text-white px-5 py-3 rounded-lg shadow-lg text-sm font-medium z-50 animate-in fade-in slide-in-from-bottom-2">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
