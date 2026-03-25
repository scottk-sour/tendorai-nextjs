'use client';

import { useEffect, useState, useCallback } from 'react';

const API_URL = process.env.NEXT_PUBLIC_EXPRESS_BACKEND_URL || 'https://ai-procurement-backend-q35u.onrender.com';

interface Post {
  id: string;
  title: string;
  slug: string;
  status: string;
  vendor: { id: string; company: string; email: string } | null;
  createdAt: string;
}

function getToken(): string {
  return localStorage.getItem('admin_token') || '';
}

const statusColors: Record<string, string> = {
  published: 'bg-green-100 text-green-700',
  draft: 'bg-gray-100 text-gray-600',
};

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [toastMessage, setToastMessage] = useState('');
  const [actionId, setActionId] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const fetchPosts = useCallback(async () => {
    try {
      const token = getToken();
      const params = filterStatus !== 'all' ? `?status=${filterStatus}` : '';
      const res = await fetch(`${API_URL}/api/admin/posts${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) { setError('Failed to fetch posts'); return; }
      const data = await res.json();
      if (data.success) setPosts(data.data);
    } catch {
      setError('Network error loading posts');
    } finally {
      setLoading(false);
    }
  }, [filterStatus]);

  useEffect(() => { fetchPosts(); }, [fetchPosts]);

  const toggleStatus = async (postId: string, currentStatus: string) => {
    setActionId(postId);
    const newStatus = currentStatus === 'published' ? 'draft' : 'published';
    try {
      const token = getToken();
      const res = await fetch(`${API_URL}/api/admin/posts/${postId}`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setPosts((prev) => prev.map((p) => p.id === postId ? { ...p, status: newStatus } : p));
        showToast(`Post ${newStatus === 'published' ? 'published' : 'unpublished'}`);
      }
    } catch { /* silent */ } finally { setActionId(null); }
  };

  const deletePost = async (postId: string) => {
    if (!confirm('Delete this post permanently?')) return;
    setActionId(postId);
    try {
      const token = getToken();
      const res = await fetch(`${API_URL}/api/admin/posts/${postId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setPosts((prev) => prev.filter((p) => p.id !== postId));
        showToast('Post deleted');
      }
    } catch { /* silent */ } finally { setActionId(null); }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Vendor Posts</h1>
          <p className="text-gray-500 mt-1">Moderate vendor blog posts</p>
        </div>
        <select
          value={filterStatus}
          onChange={(e) => { setFilterStatus(e.target.value); setLoading(true); }}
          className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
        >
          <option value="all">All Statuses</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-4 py-3 font-medium text-gray-600">Title</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Vendor</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Date</th>
                <th className="px-4 py-3 w-24"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-900 truncate max-w-[300px]">{post.title}</p>
                    <p className="text-xs text-gray-400 truncate">{post.slug}</p>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{post.vendor?.company || 'Unknown'}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[post.status] || 'bg-gray-100 text-gray-600'}`}>
                      {post.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs">
                    {new Date(post.createdAt).toLocaleDateString('en-GB')}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => toggleStatus(post.id, post.status)}
                        disabled={actionId === post.id}
                        className="px-2.5 py-1 text-xs font-medium rounded bg-blue-50 text-blue-700 hover:bg-blue-100 disabled:opacity-50 transition"
                      >
                        {post.status === 'published' ? 'Unpublish' : 'Publish'}
                      </button>
                      <button
                        onClick={() => deletePost(post.id)}
                        disabled={actionId === post.id}
                        className="p-1 text-gray-400 hover:text-red-600 disabled:opacity-50 transition"
                        title="Delete post"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {posts.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-gray-500">No posts found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-green-600 text-white px-5 py-3 rounded-lg shadow-lg text-sm font-medium z-50">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
