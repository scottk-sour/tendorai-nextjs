'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/app/contexts/AuthContext';

interface Post {
  _id: string;
  title: string;
  body: string;
  category: string;
  tags: string[];
  status: string;
  slug: string;
  createdAt: string;
}

const API_URL = process.env.NEXT_PUBLIC_EXPRESS_BACKEND_URL ||
                'https://ai-procurement-backend-q35u.onrender.com';

const CATEGORIES = [
  { value: 'news', label: 'News' },
  { value: 'product', label: 'Product' },
  { value: 'offer', label: 'Offer' },
  { value: 'guide', label: 'Guide' },
  { value: 'update', label: 'Update' },
];

const categoryColors: Record<string, string> = {
  news: 'bg-blue-100 text-blue-700',
  product: 'bg-green-100 text-green-700',
  offer: 'bg-amber-100 text-amber-700',
  guide: 'bg-purple-100 text-purple-700',
  update: 'bg-gray-100 text-gray-700',
};

export default function PostsPage() {
  const { auth, getCurrentToken } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [tierInfo, setTierInfo] = useState<{ tier: string; postsThisMonth: number; limit: number } | null>(null);

  // Form state
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState('news');

  const vendorId = auth.user?.userId;

  const fetchPosts = useCallback(async () => {
    if (!vendorId) return;
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/public/vendors/${vendorId}/posts?limit=50`);
      if (response.ok) {
        const data = await response.json();
        setPosts(data.posts || []);

        // Calculate posts this month for limit display
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);
        const thisMonth = (data.posts || []).filter(
          (p: Post) => new Date(p.createdAt) >= startOfMonth
        ).length;

        // Fetch vendor tier
        const token = getCurrentToken();
        if (token) {
          const profileRes = await fetch(`${API_URL}/api/vendors/profile`, {
            headers: { 'Authorization': `Bearer ${token}` },
          });
          if (profileRes.ok) {
            const profileData = await profileRes.json();
            const rawTier = profileData.vendor?.tier || profileData.tier || 'free';
            const tierMap: Record<string, string> = {
              free: 'listed', listed: 'listed',
              basic: 'visible', visible: 'visible', standard: 'visible',
              managed: 'verified', verified: 'verified', enterprise: 'verified',
            };
            const tier = tierMap[rawTier.toLowerCase()] || 'listed';
            const limitMap: Record<string, number> = { listed: 0, visible: 2, verified: Infinity };
            setTierInfo({ tier, postsThisMonth: thisMonth, limit: limitMap[tier] });
          }
        }
      }
    } catch (err) {
      console.error('Failed to fetch posts:', err);
    } finally {
      setLoading(false);
    }
  }, [vendorId, getCurrentToken]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!title.trim() || !body.trim()) {
      setError('Title and body are required');
      return;
    }

    const token = getCurrentToken();
    if (!token || !vendorId) return;

    setSubmitting(true);
    try {
      const response = await fetch(`${API_URL}/api/vendors/${vendorId}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ title: title.trim(), body: body.trim(), category }),
      });

      const data = await response.json();

      if (response.ok) {
        setTitle('');
        setBody('');
        setCategory('news');
        setShowForm(false);
        fetchPosts();
      } else {
        setError(data.error || 'Failed to create post');
      }
    } catch {
      setError('Failed to create post. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    const token = getCurrentToken();
    if (!token || !vendorId) return;

    setDeleting(postId);
    try {
      const response = await fetch(`${API_URL}/api/vendors/${vendorId}/posts/${postId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (response.ok) {
        setPosts((prev) => prev.filter((p) => p._id !== postId));
      }
    } catch {
      console.error('Failed to delete post');
    } finally {
      setDeleting(null);
    }
  };

  const canPost = tierInfo && (tierInfo.limit === Infinity || tierInfo.postsThisMonth < tierInfo.limit);
  const isFree = tierInfo?.tier === 'listed';

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Posts</h1>
          <p className="text-gray-600 mt-1">Share news, guides, and offers with potential customers</p>
        </div>
        {!isFree && (
          <button
            onClick={() => setShowForm(!showForm)}
            disabled={!canPost}
            className="btn-primary px-4 py-2 disabled:opacity-50"
          >
            {showForm ? 'Cancel' : 'Write Post'}
          </button>
        )}
      </div>

      {/* Tier/Limit Info */}
      {tierInfo && (
        <div className="card p-4">
          {isFree ? (
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Posting is available on Visible and Verified tiers.
              </p>
              <a href="/vendor-dashboard/settings?tab=subscription" className="btn-primary px-3 py-1.5 text-sm">
                Upgrade
              </a>
            </div>
          ) : tierInfo.limit === Infinity ? (
            <p className="text-sm text-green-700">
              Verified tier — unlimited posts per month
            </p>
          ) : (
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-700">
                <span className="font-medium">{tierInfo.postsThisMonth} of {tierInfo.limit}</span> posts used this month
                {!canPost && <span className="text-red-600 ml-2">— limit reached</span>}
              </p>
              <a href="/vendor-dashboard/settings?tab=subscription" className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                Upgrade to Verified for unlimited posts
              </a>
            </div>
          )}
        </div>
      )}

      {/* Write Post Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="card p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Write a Post</h2>

          {error && (
            <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. New Canon C5740i Now Available"
              maxLength={200}
              className="input"
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="input"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="body" className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Write your post content here..."
              rows={8}
              maxLength={5000}
              className="input resize-y"
            />
            <p className="text-xs text-gray-400 mt-1">{body.length}/5000 characters</p>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="btn-primary px-6 py-2 disabled:opacity-50"
            >
              {submitting ? 'Publishing...' : 'Publish Post'}
            </button>
            <button
              type="button"
              onClick={() => { setShowForm(false); setError(''); }}
              className="btn-secondary px-4 py-2"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Posts List */}
      <div className="card">
        {posts.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <svg className="w-12 h-12 mx-auto text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <p>No posts yet</p>
            {!isFree && (
              <p className="text-sm mt-1">Click &quot;Write Post&quot; to share your first update</p>
            )}
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {posts.map((post) => (
              <div key={post._id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-gray-900 truncate">{post.title}</h3>
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${categoryColors[post.category] || categoryColors.update}`}>
                        {post.category}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {post.body.substring(0, 150).replace(/\n/g, ' ')}
                      {post.body.length > 150 ? '...' : ''}
                    </p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                      <span>
                        {new Date(post.createdAt).toLocaleDateString('en-GB', {
                          day: 'numeric', month: 'short', year: 'numeric',
                        })}
                      </span>
                      {post.slug && (
                        <a
                          href={`/posts/${post.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-600 hover:text-purple-700"
                        >
                          View on site
                        </a>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(post._id)}
                    disabled={deleting === post._id}
                    className="ml-4 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                    title="Delete post"
                  >
                    {deleting === post._id ? (
                      <div className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
