'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_EXPRESS_BACKEND_URL || 'https://ai-procurement-backend-q35u.onrender.com';

interface CallEntry {
  calledAt: string;
  notes: string;
  outcome: string;
  nextActionDate?: string;
}

interface NoteEntry {
  text: string;
  createdAt: string;
}

interface HistoryEntry {
  action: string;
  note: string;
  date: string;
  completedBy: string;
}

interface OutreachRecord {
  _id: string;
  vendorId?: { _id: string; company: string; email: string } | null;
  firmName: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  website: string;
  reportLink: string;
  reportCategory: string;
  reportCity: string;
  reportScore: number;
  vendorType: string;
  aeoReportUrl: string;
  status: string;
  nextActionDate: string | null;
  nextAction: string;
  emailSentAt: string | null;
  emailOpenedAt: string | null;
  lastCalledAt: string | null;
  notes: NoteEntry[];
  callHistory: CallEntry[];
  history: HistoryEntry[];
  createdAt: string;
  updatedAt: string;
}

function getToken(): string {
  return localStorage.getItem('admin_token') || '';
}

const statuses = [
  'prospect', 'aeo_sent', 'email_sent', 'email-sent', 'opened', 'called', 'call-back',
  'email_followup_sent', 'called_followup', 'interested', 'meeting_booked',
  'won', 'signed-up', 'lost', 'not-interested', 'no_response', 'new',
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
  'new': 'New',
  'email-sent': 'Email Sent',
  'opened': 'Opened',
  'called': 'Called',
  'call-back': 'Call Back',
  'interested': 'Interested',
  'signed-up': 'Signed Up',
  'not-interested': 'Not Interested',
};

const outcomeOptions = ['called', 'call-back', 'interested', 'signed-up', 'not-interested'];

export default function OutreachDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [record, setRecord] = useState<OutreachRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Call modal
  const [showCallModal, setShowCallModal] = useState(false);
  const [callForm, setCallForm] = useState({ notes: '', outcome: 'called', nextActionDate: '', nextAction: '' });
  const [savingCall, setSavingCall] = useState(false);

  // Next action modal
  const [showActionModal, setShowActionModal] = useState(false);
  const [actionForm, setActionForm] = useState({ nextAction: '', nextActionDate: '' });
  const [savingAction, setSavingAction] = useState(false);

  // Note form
  const [noteText, setNoteText] = useState('');
  const [savingNote, setSavingNote] = useState(false);

  const fetchRecord = async () => {
    try {
      const token = getToken();
      const res = await fetch(`${API_URL}/api/outreach/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        setError('Failed to load record');
        return;
      }
      const data = await res.json();
      if (data.success) setRecord(data.data);
    } catch {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecord();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const updateRecord = async (body: Record<string, unknown>) => {
    const token = getToken();
    await fetch(`${API_URL}/api/outreach/${id}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    await fetchRecord();
  };

  const handleStatusChange = async (newStatus: string) => {
    await updateRecord({ status: newStatus });
  };

  const handleMarkOpened = async () => {
    await updateRecord({ emailOpenedAt: new Date().toISOString(), status: 'opened' });
  };

  const handleLogCall = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingCall(true);
    try {
      const token = getToken();
      await fetch(`${API_URL}/api/outreach/${id}/call`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(callForm),
      });
      setShowCallModal(false);
      setCallForm({ notes: '', outcome: 'called', nextActionDate: '', nextAction: '' });
      await fetchRecord();
    } catch {
      // silent
    } finally {
      setSavingCall(false);
    }
  };

  const handleSetAction = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingAction(true);
    try {
      await updateRecord(actionForm);
      setShowActionModal(false);
      setActionForm({ nextAction: '', nextActionDate: '' });
    } catch {
      // silent
    } finally {
      setSavingAction(false);
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteText.trim()) return;
    setSavingNote(true);
    try {
      const token = getToken();
      await fetch(`${API_URL}/api/outreach/${id}/note`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: noteText }),
      });
      setNoteText('');
      await fetchRecord();
    } catch {
      // silent
    } finally {
      setSavingNote(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Delete this outreach record? This cannot be undone.')) return;
    const token = getToken();
    const res = await fetch(`${API_URL}/api/outreach/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) router.push('/admin/outreach');
  };

  const formatDateTime = (d: string | null) => {
    if (!d) return '—';
    return new Date(d).toLocaleString('en-GB', {
      day: 'numeric', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
  };

  const formatDate = (d: string | null) => {
    if (!d) return '—';
    return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  // Build activity timeline
  const buildTimeline = () => {
    if (!record) return [];
    const events: { date: string; icon: string; label: string; detail?: string }[] = [];

    events.push({ date: record.createdAt, icon: 'plus', label: 'Record created' });

    if (record.emailSentAt) {
      events.push({ date: record.emailSentAt, icon: 'mail', label: 'Email sent' });
    }
    if (record.emailOpenedAt) {
      events.push({ date: record.emailOpenedAt, icon: 'eye', label: 'Email opened' });
    }

    record.callHistory.forEach((c) => {
      events.push({
        date: c.calledAt,
        icon: 'phone',
        label: `Call — ${statusLabels[c.outcome] || c.outcome}`,
        detail: c.notes,
      });
    });

    record.notes.forEach((n) => {
      events.push({
        date: n.createdAt,
        icon: 'note',
        label: 'Note added',
        detail: n.text,
      });
    });

    events.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return events;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !record) {
    return (
      <div className="text-center py-20">
        <p className="text-red-600 font-medium">{error || 'Record not found'}</p>
        <Link href="/admin/outreach" className="mt-4 text-purple-600 hover:underline inline-block">
          Back to Outreach
        </Link>
      </div>
    );
  }

  const timeline = buildTimeline();

  return (
    <div className="space-y-6">
      {/* Back + Header */}
      <div>
        <Link href="/admin/outreach" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Outreach
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900">{record.firmName}</h1>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[record.status] || 'bg-gray-100 text-gray-700'}`}>
                {statusLabels[record.status] || record.status}
              </span>
              {record.reportScore > 0 && (
                <span className="text-sm text-gray-500">{record.reportScore}/100</span>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-600">
              {record.contactName && <span>{record.contactName}</span>}
              {record.contactEmail && (
                <a href={`mailto:${record.contactEmail}`} className="text-purple-600 hover:underline">{record.contactEmail}</a>
              )}
              {record.contactPhone && (
                <a href={`tel:${record.contactPhone}`} className="text-purple-600 hover:underline">{record.contactPhone}</a>
              )}
              {record.reportCity && <span>{record.reportCity}</span>}
              {record.reportCategory && <span>{record.reportCategory}</span>}
            </div>
          </div>
          <button
            onClick={handleDelete}
            className="text-sm text-red-500 hover:text-red-700 font-medium"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setShowCallModal(true)}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          Log Call
        </button>

        <button
          onClick={handleMarkOpened}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          Mark Email Opened
        </button>

        {record.contactEmail && (
          <a
            href={`mailto:${record.contactEmail}?subject=Following up — AI Visibility Report`}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Send Follow-up
          </a>
        )}

        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">Status:</label>
          <select
            value={record.status}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            {statuses.map((s) => (
              <option key={s} value={s}>{statusLabels[s]}</option>
            ))}
          </select>
        </div>

        <button
          onClick={() => {
            setActionForm({ nextAction: record.nextAction || '', nextActionDate: record.nextActionDate ? record.nextActionDate.split('T')[0] : '' });
            setShowActionModal(true);
          }}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Set Next Action
        </button>
      </div>

      {/* Report Section */}
      {(record.reportLink || record.reportScore > 0) && (
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="text-base font-semibold text-gray-900 mb-3">Report</h2>
          <div className="flex flex-wrap gap-6 text-sm">
            {record.reportLink && (
              <a href={record.reportLink} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">
                View Report
              </a>
            )}
            {record.reportScore > 0 && <span>Score: <strong>{record.reportScore}</strong>/100</span>}
            {record.reportCategory && <span>Category: {record.reportCategory}</span>}
            {record.reportCity && <span>City: {record.reportCity}</span>}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notes Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="text-base font-semibold text-gray-900 mb-3">Notes</h2>
          <form onSubmit={handleAddNote} className="mb-4">
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Add a note..."
              rows={3}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            />
            <div className="flex justify-end mt-2">
              <button
                type="submit"
                disabled={savingNote || !noteText.trim()}
                className="px-3 py-1.5 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors"
              >
                {savingNote ? 'Saving...' : 'Save Note'}
              </button>
            </div>
          </form>
          {record.notes.length === 0 ? (
            <p className="text-sm text-gray-500">No notes yet</p>
          ) : (
            <div className="space-y-3">
              {[...record.notes].reverse().map((n, i) => (
                <div key={i} className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-800 whitespace-pre-wrap">{n.text}</p>
                  <p className="text-xs text-gray-400 mt-1">{formatDateTime(n.createdAt)}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Call History */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="text-base font-semibold text-gray-900 mb-3">Call History</h2>
          {record.callHistory.length === 0 ? (
            <p className="text-sm text-gray-500">No calls logged</p>
          ) : (
            <div className="relative">
              <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-gray-200" />
              <div className="space-y-4">
                {[...record.callHistory].reverse().map((c, i) => (
                  <div key={i} className="relative pl-8">
                    <div className="absolute left-1.5 top-1.5 w-3 h-3 rounded-full bg-purple-500 border-2 border-white" />
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[c.outcome] || 'bg-gray-100 text-gray-700'}`}>
                          {statusLabels[c.outcome] || c.outcome}
                        </span>
                        <span className="text-xs text-gray-400">{formatDateTime(c.calledAt)}</span>
                      </div>
                      {c.notes && <p className="text-sm text-gray-700 mt-1">{c.notes}</p>}
                      {c.nextActionDate && (
                        <p className="text-xs text-gray-500 mt-1">Next action: {formatDate(c.nextActionDate)}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h2 className="text-base font-semibold text-gray-900 mb-3">Activity Timeline</h2>
        {timeline.length === 0 ? (
          <p className="text-sm text-gray-500">No activity</p>
        ) : (
          <div className="relative">
            <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-gray-200" />
            <div className="space-y-3">
              {timeline.map((ev, i) => (
                <div key={i} className="relative pl-8">
                  <div className={`absolute left-1.5 top-1.5 w-3 h-3 rounded-full border-2 border-white ${
                    ev.icon === 'phone' ? 'bg-purple-500' :
                    ev.icon === 'mail' ? 'bg-blue-500' :
                    ev.icon === 'eye' ? 'bg-yellow-500' :
                    ev.icon === 'note' ? 'bg-green-500' :
                    'bg-gray-400'
                  }`} />
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-800">{ev.label}</p>
                      {ev.detail && (
                        <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{ev.detail}</p>
                      )}
                    </div>
                    <span className="text-xs text-gray-400 ml-4 whitespace-nowrap">{formatDateTime(ev.date)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Log Call Modal */}
      {showCallModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Log Call</h3>
              <button onClick={() => setShowCallModal(false)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleLogCall} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Call Notes</label>
                <textarea
                  value={callForm.notes}
                  onChange={(e) => setCallForm({ ...callForm, notes: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Outcome</label>
                <select
                  value={callForm.outcome}
                  onChange={(e) => setCallForm({ ...callForm, outcome: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {outcomeOptions.map((o) => (
                    <option key={o} value={o}>{statusLabels[o]}</option>
                  ))}
                </select>
              </div>
              {callForm.outcome === 'call-back' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Call Back Date</label>
                    <input
                      type="date"
                      value={callForm.nextActionDate}
                      onChange={(e) => setCallForm({ ...callForm, nextActionDate: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Next Action</label>
                    <input
                      type="text"
                      value={callForm.nextAction}
                      onChange={(e) => setCallForm({ ...callForm, nextAction: e.target.value })}
                      placeholder="e.g. Call back to discuss pricing"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </>
              )}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCallModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingCall}
                  className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors"
                >
                  {savingCall ? 'Saving...' : 'Log Call'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Set Next Action Modal */}
      {showActionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Set Next Action</h3>
              <button onClick={() => setShowActionModal(false)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleSetAction} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Next Action</label>
                <input
                  type="text"
                  value={actionForm.nextAction}
                  onChange={(e) => setActionForm({ ...actionForm, nextAction: e.target.value })}
                  placeholder="e.g. Follow up on proposal"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  value={actionForm.nextActionDate}
                  onChange={(e) => setActionForm({ ...actionForm, nextActionDate: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowActionModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingAction}
                  className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors"
                >
                  {savingAction ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
