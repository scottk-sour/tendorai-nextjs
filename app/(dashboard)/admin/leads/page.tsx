'use client';

import { useEffect, useState, useCallback } from 'react';

const API_URL = process.env.NEXT_PUBLIC_EXPRESS_BACKEND_URL || 'https://ai-procurement-backend-q35u.onrender.com';

interface Lead {
  email: string;
  name: string;
  company: string;
  source: string;
  category: string;
  city: string;
  date: string;
}

interface Counts {
  newsletter: number;
  aeo: number;
  quote: number;
  'vendor-lead': number;
  total: number;
}

function getToken(): string {
  return localStorage.getItem('admin_token') || '';
}

const sourceTabs = [
  { key: 'all', label: 'All' },
  { key: 'newsletter', label: 'Newsletter' },
  { key: 'aeo', label: 'AEO Report' },
  { key: 'quote', label: 'Quote Request' },
  { key: 'vendor-lead', label: 'Vendor Lead' },
];

const sourceBadgeColors: Record<string, string> = {
  newsletter: 'bg-green-100 text-green-700',
  aeo: 'bg-purple-100 text-purple-700',
  quote: 'bg-blue-100 text-blue-700',
  'vendor-lead': 'bg-orange-100 text-orange-700',
};

const sourceLabels: Record<string, string> = {
  newsletter: 'Newsletter',
  aeo: 'AEO Report',
  quote: 'Quote Request',
  'vendor-lead': 'Vendor Lead',
};

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [counts, setCounts] = useState<Counts | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [search, setSearch] = useState('');

  const fetchLeads = useCallback(async () => {
    try {
      const token = getToken();
      const headers = { Authorization: `Bearer ${token}` };

      const [leadsRes, countsRes] = await Promise.all([
        fetch(`${API_URL}/api/admin/all-leads`, { headers }),
        fetch(`${API_URL}/api/admin/all-leads?counts=true`, { headers }),
      ]);

      if (!leadsRes.ok || !countsRes.ok) {
        setError('Failed to fetch leads');
        setLoading(false);
        return;
      }

      const [leadsData, countsData] = await Promise.all([
        leadsRes.json(),
        countsRes.json(),
      ]);

      if (leadsData.success) setLeads(leadsData.data);
      if (countsData.success) setCounts(countsData.counts);
    } catch {
      setError('Network error loading leads');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  // Client-side filtering
  const filtered = leads.filter((l) => {
    const matchesTab = activeTab === 'all' || l.source === activeTab;
    const matchesSearch =
      !search ||
      l.email.toLowerCase().includes(search.toLowerCase()) ||
      l.company.toLowerCase().includes(search.toLowerCase()) ||
      l.name.toLowerCase().includes(search.toLowerCase());

    return matchesTab && matchesSearch;
  });

  // Unique emails
  const uniqueEmails = new Set(leads.map((l) => l.email)).size;

  const handleExportCSV = () => {
    const escapeCSV = (field: string) => {
      if (!field) return '';
      if (field.includes(',') || field.includes('"') || field.includes('\n')) {
        return `"${field.replace(/"/g, '""')}"`;
      }
      return field;
    };

    const header = 'Email,Name,Company,Source,Category,City,Date\n';
    const rows = filtered
      .map((l) =>
        [
          escapeCSV(l.email),
          escapeCSV(l.name),
          escapeCSV(l.company),
          escapeCSV(sourceLabels[l.source] || l.source),
          escapeCSV(l.category),
          escapeCSV(l.city),
          l.date ? new Date(l.date).toLocaleDateString('en-GB') : '',
        ].join(',')
      )
      .join('\n');

    const csv = header + rows;
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tendorai-leads-${activeTab}-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

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
          <h1 className="text-2xl font-bold text-gray-900">Leads</h1>
          <p className="text-gray-500 mt-1">All leads from every source</p>
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

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
          <p className="text-2xl font-bold text-gray-900">{counts?.total ?? leads.length}</p>
          <p className="text-sm text-gray-500">Total Leads</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
          <p className="text-2xl font-bold text-purple-600">{uniqueEmails}</p>
          <p className="text-sm text-gray-500">Unique Emails</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4 text-center sm:col-span-1 col-span-2">
          <div className="flex justify-center gap-3 flex-wrap">
            {counts && Object.entries(counts).filter(([k]) => k !== 'total').map(([src, count]) => (
              <span key={src} className={`text-xs font-medium px-2 py-1 rounded-full ${sourceBadgeColors[src] || 'bg-gray-100 text-gray-700'}`}>
                {sourceLabels[src] || src}: {count}
              </span>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-2">By Source</p>
        </div>
      </div>

      {/* Source Tabs */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex flex-wrap gap-2">
            {sourceTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
                  activeTab === tab.key
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Search by email, name or company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
          />
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Showing {filtered.length} leads
        </p>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-4 py-3 font-medium text-gray-600">Email</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Name</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Company</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Source</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Category</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">City</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((lead, i) => (
                <tr key={`${lead.email}-${lead.source}-${i}`} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 text-gray-900 max-w-[220px] truncate">
                    {lead.email}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{lead.name || '-'}</td>
                  <td className="px-4 py-3 text-gray-600">{lead.company || '-'}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex text-xs font-medium px-2.5 py-1 rounded-full ${
                        sourceBadgeColors[lead.source] || 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {sourceLabels[lead.source] || lead.source}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{lead.category || '-'}</td>
                  <td className="px-4 py-3 text-gray-600">{lead.city || '-'}</td>
                  <td className="px-4 py-3 text-gray-500 text-xs">
                    {lead.date ? new Date(lead.date).toLocaleDateString('en-GB') : '-'}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                    No leads found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
