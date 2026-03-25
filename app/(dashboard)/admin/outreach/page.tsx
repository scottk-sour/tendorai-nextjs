'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_EXPRESS_BACKEND_URL || 'https://ai-procurement-backend-q35u.onrender.com';

interface OutreachRecord {
  _id: string;
  firmName: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  website: string;
  reportCategory: string;
  reportCity: string;
  reportScore: number;
  vendorType: string;
  status: string;
  nextActionDate: string | null;
  nextAction: string;
  aeoReportUrl: string;
  aeoRunAt: string | null;
  history: Array<{ action: string; note: string; date: string; completedBy: string }>;
}

interface Pagination { page: number; limit: number; total: number; pages: number; }
interface Stats {
  total: number;
  counts: Record<string, number>;
  cities: string[];
  dueToday: number;
  overdue: number;
  won: number;
  conversionRate: number;
}

function getToken(): string {
  return localStorage.getItem('admin_token') || '';
}

const allStatuses = [
  'prospect', 'aeo_sent', 'email_sent', 'email-sent', 'called', 'call-back',
  'email_followup_sent', 'called_followup', 'interested', 'meeting_booked',
  'won', 'signed-up', 'lost', 'not-interested', 'no_response', 'new', 'opened',
];

const statusColors: Record<string, string> = {
  'prospect': 'bg-gray-100 text-gray-700',
  'new': 'bg-gray-100 text-gray-700',
  'aeo_sent': 'bg-sky-100 text-sky-700',
  'email_sent': 'bg-blue-100 text-blue-700',
  'email-sent': 'bg-blue-100 text-blue-700',
  'opened': 'bg-yellow-100 text-yellow-700',
  'called': 'bg-purple-100 text-purple-700',
  'call-back': 'bg-orange-100 text-orange-700',
  'email_followup_sent': 'bg-indigo-100 text-indigo-700',
  'called_followup': 'bg-violet-100 text-violet-700',
  'interested': 'bg-green-100 text-green-700',
  'meeting_booked': 'bg-emerald-100 text-emerald-700',
  'won': 'bg-emerald-200 text-emerald-800',
  'signed-up': 'bg-emerald-200 text-emerald-800',
  'lost': 'bg-red-100 text-red-700',
  'not-interested': 'bg-red-100 text-red-700',
  'no_response': 'bg-gray-200 text-gray-600',
};

const statusLabels: Record<string, string> = {
  'prospect': 'Prospect',
  'new': 'New',
  'aeo_sent': 'AEO Sent',
  'email_sent': 'Email Sent',
  'email-sent': 'Email Sent',
  'opened': 'Opened',
  'called': 'Called',
  'call-back': 'Call Back',
  'email_followup_sent': 'Follow-up Sent',
  'called_followup': 'Follow-up Called',
  'interested': 'Interested',
  'meeting_booked': 'Meeting Booked',
  'won': 'Won',
  'signed-up': 'Signed Up',
  'lost': 'Lost',
  'not-interested': 'Not Interested',
  'no_response': 'No Response',
};

const nextActionLabels: Record<string, string> = {
  'run_aeo': 'Run AEO Report',
  'send_aeo': 'Send AEO Report',
  'send_email': 'Send Email',
  'call': 'Call',
  'send_followup': 'Send Follow-up',
  'call_followup': 'Follow-up Call',
  'none': 'Complete',
  '': '—',
};

const vendorTypes = ['solicitor', 'accountant', 'mortgage-adviser', 'estate-agent', 'office-equipment'];

export default function OutreachPage() {
  const [todayActions, setTodayActions] = useState<OutreachRecord[]>([]);
  const [records, setRecords] = useState<OutreachRecord[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterCity, setFilterCity] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [showCreate, setShowCreate] = useState(false);
  const [creating, setCreating] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [form, setForm] = useState({
    firmName: '', contactName: '', contactEmail: '', contactPhone: '',
    website: '', reportCategory: '', reportCity: '', reportScore: '',
    reportLink: '', vendorType: '', nextActionDate: '', nextAction: '',
  });

  const fetchData = useCallback(async () => {
    try {
      const token = getToken();
      const headers = { Authorization: `Bearer ${token}` };
      const params = new URLSearchParams({ page: String(page), limit: '50' });
      if (filterStatus) params.set('status', filterStatus);
      if (filterCity) params.set('city', filterCity);
      if (search) params.set('search', search);

      const [todayRes, listRes, statsRes] = await Promise.all([
        fetch(`${API_URL}/api/outreach/today`, { headers }),
        fetch(`${API_URL}/api/outreach?${params}`, { headers }),
        fetch(`${API_URL}/api/outreach/stats`, { headers }),
      ]);

      if (!todayRes.ok || !listRes.ok || !statsRes.ok) { setError('Failed to load outreach data'); return; }

      const [todayData, listData, statsData] = await Promise.all([todayRes.json(), listRes.json(), statsRes.json()]);
      if (todayData.success) setTodayActions(todayData.data);
      if (listData.success) { setRecords(listData.data); setPagination(listData.pagination); }
      if (statsData.success) setStats(statsData.data);
    } catch { setError('Network error'); } finally { setLoading(false); }
  }, [page, filterStatus, filterCity, search]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.firmName.trim()) return;
    setCreating(true);
    try {
      const token = getToken();
      const body: Record<string, unknown> = { ...form };
      if (form.reportScore) body.reportScore = Number(form.reportScore);
      if (!form.nextActionDate) delete body.nextActionDate;
      const res = await fetch(`${API_URL}/api/outreach`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        setShowCreate(false);
        setForm({ firmName: '', contactName: '', contactEmail: '', contactPhone: '', website: '', reportCategory: '', reportCity: '', reportScore: '', reportLink: '', vendorType: '', nextActionDate: '', nextAction: '' });
        setPage(1);
        fetchData();
      }
    } catch { /* silent */ } finally { setCreating(false); }
  };

  const quickStatus = async (id: string, status: string) => {
    const token = getToken();
    await fetch(`${API_URL}/api/outreach/${id}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    fetchData();
  };

  const bulkStatus = async (status: string) => {
    const token = getToken();
    const ids = Array.from(selected);
    await Promise.all(ids.map(id =>
      fetch(`${API_URL}/api/outreach/${id}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
    ));
    setSelected(new Set());
    fetchData();
  };

  const toggleSelect = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selected.size === records.length) setSelected(new Set());
    else setSelected(new Set(records.map(r => r._id)));
  };

  const isOverdue = (d: string | null) => d && new Date(d) < new Date(new Date().toDateString());
  const isToday = (d: string | null) => {
    if (!d) return false;
    const dt = new Date(d).toDateString();
    return dt === new Date().toDateString();
  };

  const formatDate = (d: string | null) => {
    if (!d) return '—';
    return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  };

  const scoreColor = (s: number) => s >= 60 ? 'text-green-600' : s >= 30 ? 'text-amber-600' : 'text-red-600';

  if (loading) return <div className="flex items-center justify-center py-20"><div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" /></div>;
  if (error) return <div className="text-center py-20"><p className="text-red-600">{error}</p><button onClick={() => { setError(''); setLoading(true); fetchData(); }} className="mt-4 text-purple-600 hover:underline">Retry</button></div>;

  // Group today's actions by next action type
  const todaySendAeo = todayActions.filter(r => r.nextAction === 'send_aeo');
  const todayEmail = todayActions.filter(r => r.nextAction === 'send_email');
  const todayCall = todayActions.filter(r => r.nextAction === 'call');
  const todayFollowup = todayActions.filter(r => ['send_followup', 'call_followup'].includes(r.nextAction));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sales Outreach</h1>
          <p className="text-sm text-gray-500 mt-1">Track firms through the AEO sales sequence</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="inline-flex items-center px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Add Prospect
        </button>
      </div>

      {/* Stats Bar */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
            <div className="text-xs text-gray-500">Total</div>
          </div>
          <div className="bg-white rounded-lg border-2 border-orange-300 p-4">
            <div className="text-2xl font-bold text-orange-600">{stats.dueToday}</div>
            <div className="text-xs text-orange-600 font-medium">Due Today</div>
          </div>
          <div className="bg-white rounded-lg border-2 border-red-300 p-4">
            <div className="text-2xl font-bold text-red-600">{stats.overdue}</div>
            <div className="text-xs text-red-600 font-medium">Overdue</div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="text-2xl font-bold text-green-600">{stats.counts['interested'] || 0}</div>
            <div className="text-xs text-gray-500">Interested</div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="text-2xl font-bold text-emerald-600">{stats.won}</div>
            <div className="text-xs text-gray-500">Won</div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="text-2xl font-bold text-purple-600">{stats.conversionRate}%</div>
            <div className="text-xs text-gray-500">Conversion</div>
          </div>
        </div>
      )}

      {/* Today's Workflow */}
      {todayActions.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Today&apos;s Tasks ({todayActions.length})</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {todaySendAeo.length > 0 && (
              <div>
                <h3 className="text-xs font-bold text-sky-700 uppercase mb-2">Send AEO Reports ({todaySendAeo.length})</h3>
                {todaySendAeo.map(r => (
                  <Link key={r._id} href={`/admin/outreach/${r._id}`} className="block p-2 rounded hover:bg-sky-50 text-sm">
                    <span className="font-medium">{r.firmName}</span>
                    {r.contactEmail && <span className="text-gray-400 ml-2">{r.contactEmail}</span>}
                  </Link>
                ))}
              </div>
            )}
            {todayEmail.length > 0 && (
              <div>
                <h3 className="text-xs font-bold text-blue-700 uppercase mb-2">Send Emails ({todayEmail.length})</h3>
                {todayEmail.map(r => (
                  <Link key={r._id} href={`/admin/outreach/${r._id}`} className="block p-2 rounded hover:bg-blue-50 text-sm">
                    <span className="font-medium">{r.firmName}</span>
                    {r.contactEmail && <span className="text-gray-400 ml-2">{r.contactEmail}</span>}
                  </Link>
                ))}
              </div>
            )}
            {todayCall.length > 0 && (
              <div>
                <h3 className="text-xs font-bold text-purple-700 uppercase mb-2">Call ({todayCall.length})</h3>
                {todayCall.map(r => (
                  <Link key={r._id} href={`/admin/outreach/${r._id}`} className="block p-2 rounded hover:bg-purple-50 text-sm">
                    <span className="font-medium">{r.firmName}</span>
                    {r.contactPhone && <a href={`tel:${r.contactPhone}`} className="text-purple-600 ml-2 font-medium" onClick={e => e.stopPropagation()}>{r.contactPhone}</a>}
                  </Link>
                ))}
              </div>
            )}
            {todayFollowup.length > 0 && (
              <div>
                <h3 className="text-xs font-bold text-indigo-700 uppercase mb-2">Follow-up ({todayFollowup.length})</h3>
                {todayFollowup.map(r => (
                  <Link key={r._id} href={`/admin/outreach/${r._id}`} className="block p-2 rounded hover:bg-indigo-50 text-sm">
                    <span className="font-medium">{r.firmName}</span>
                    <span className="text-gray-400 ml-2">{nextActionLabels[r.nextAction] || r.nextAction}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bulk Actions */}
      {selected.size > 0 && (
        <div className="flex items-center gap-3 bg-purple-50 rounded-lg p-3">
          <span className="text-sm font-medium text-purple-700">{selected.size} selected</span>
          <button onClick={() => bulkStatus('email_sent')} className="px-3 py-1 text-xs font-medium bg-blue-600 text-white rounded hover:bg-blue-700">Mark Emailed</button>
          <button onClick={() => bulkStatus('called')} className="px-3 py-1 text-xs font-medium bg-purple-600 text-white rounded hover:bg-purple-700">Mark Called</button>
          <button onClick={() => setSelected(new Set())} className="px-3 py-1 text-xs text-gray-600 hover:text-gray-800">Clear</button>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <select value={filterStatus} onChange={(e) => { setFilterStatus(e.target.value); setPage(1); }} className="px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white">
          <option value="">All Statuses</option>
          {allStatuses.filter(s => stats?.counts[s]).map((s) => (
            <option key={s} value={s}>{statusLabels[s] || s} ({stats?.counts[s] || 0})</option>
          ))}
        </select>
        <select value={filterCity} onChange={(e) => { setFilterCity(e.target.value); setPage(1); }} className="px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white">
          <option value="">All Cities</option>
          {stats?.cities.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <input type="text" value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} placeholder="Search firm name..." className="px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white w-64" />
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-3 text-left"><input type="checkbox" checked={selected.size === records.length && records.length > 0} onChange={toggleSelectAll} className="rounded" /></th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Firm</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Score</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Next Action</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Due</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {records.length === 0 ? (
                <tr><td colSpan={9} className="px-4 py-8 text-center text-sm text-gray-500">No outreach records found</td></tr>
              ) : records.map((r) => (
                <tr key={r._id} className="hover:bg-gray-50">
                  <td className="px-3 py-3"><input type="checkbox" checked={selected.has(r._id)} onChange={() => toggleSelect(r._id)} className="rounded" /></td>
                  <td className="px-3 py-3 text-sm">
                    <Link href={`/admin/outreach/${r._id}`} className="text-purple-600 hover:text-purple-800 font-medium">{r.firmName}</Link>
                    {r.reportCity && <span className="text-xs text-gray-400 ml-1">({r.reportCity})</span>}
                  </td>
                  <td className="px-3 py-3 text-sm">
                    <div className="text-gray-700">{r.contactName || '—'}</div>
                    {r.contactPhone && <a href={`tel:${r.contactPhone}`} className="text-xs text-purple-600">{r.contactPhone}</a>}
                    {r.contactEmail && <div className="text-xs text-gray-400 truncate max-w-[150px]"><a href={`mailto:${r.contactEmail}`}>{r.contactEmail}</a></div>}
                  </td>
                  <td className="px-3 py-3 text-xs text-gray-600 capitalize">{r.vendorType || r.reportCategory || '—'}</td>
                  <td className="px-3 py-3 text-sm"><span className={`font-bold ${scoreColor(r.reportScore)}`}>{r.reportScore || '—'}</span></td>
                  <td className="px-3 py-3 text-sm">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[r.status] || 'bg-gray-100 text-gray-700'}`}>
                      {statusLabels[r.status] || r.status}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-sm font-medium text-gray-700">{nextActionLabels[r.nextAction] || r.nextAction || '—'}</td>
                  <td className="px-3 py-3 text-sm">
                    <span className={isOverdue(r.nextActionDate) ? 'text-red-600 font-bold' : isToday(r.nextActionDate) ? 'text-orange-600 font-semibold' : 'text-gray-600'}>
                      {formatDate(r.nextActionDate)}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-1">
                      {r.nextAction === 'call' && <button onClick={() => quickStatus(r._id, 'called')} className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded hover:bg-purple-200">Log Call</button>}
                      {r.nextAction === 'send_email' && <button onClick={() => quickStatus(r._id, 'email_sent')} className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200">Log Email</button>}
                      {r.nextAction === 'send_followup' && <button onClick={() => quickStatus(r._id, 'email_followup_sent')} className="px-2 py-1 text-xs bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200">Log F/U</button>}
                      {r.nextAction === 'call_followup' && <button onClick={() => quickStatus(r._id, 'called_followup')} className="px-2 py-1 text-xs bg-violet-100 text-violet-700 rounded hover:bg-violet-200">Log F/U Call</button>}
                      <Link href={`/admin/outreach/${r._id}`} className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded hover:bg-gray-200">View</Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination && pagination.pages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 bg-gray-50">
            <p className="text-sm text-gray-600">
              {(pagination.page - 1) * pagination.limit + 1}–{Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total}
            </p>
            <div className="flex gap-1">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={pagination.page === 1} className="px-3 py-1 text-sm rounded border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50">Prev</button>
              <button onClick={() => setPage(p => Math.min(pagination.pages, p + 1))} disabled={pagination.page === pagination.pages} className="px-3 py-1 text-sm rounded border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50">Next</button>
            </div>
          </div>
        )}
      </div>

      {/* Create Modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Add Prospect</h3>
              <button onClick={() => setShowCreate(false)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <form onSubmit={handleCreate} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Firm Name *</label>
                <input type="text" required value={form.firmName} onChange={(e) => setForm({ ...form, firmName: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Contact Name</label><input type="text" value={form.contactName} onChange={(e) => setForm({ ...form, contactName: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Phone</label><input type="text" value={form.contactPhone} onChange={(e) => setForm({ ...form, contactPhone: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" /></div>
              </div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Email</label><input type="email" value={form.contactEmail} onChange={(e) => setForm({ ...form, contactEmail: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Website</label><input type="url" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="https://" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vendor Type</label>
                  <select value={form.vendorType} onChange={(e) => setForm({ ...form, vendorType: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                    <option value="">Select...</option>
                    {vendorTypes.map(t => <option key={t} value={t}>{t.replace(/-/g, ' ')}</option>)}
                  </select>
                </div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">City</label><input type="text" value={form.reportCity} onChange={(e) => setForm({ ...form, reportCity: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">AEO Score</label><input type="number" min="0" max="100" value={form.reportScore} onChange={(e) => setForm({ ...form, reportScore: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Report Link</label><input type="url" value={form.reportLink} onChange={(e) => setForm({ ...form, reportLink: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" /></div>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowCreate(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">Cancel</button>
                <button type="submit" disabled={creating} className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 disabled:opacity-50">{creating ? 'Creating...' : 'Add Prospect'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
