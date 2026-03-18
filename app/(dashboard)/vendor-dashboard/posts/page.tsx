'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/app/contexts/AuthContext';
import { hasTierAccess } from '@/app/components/dashboard/TierGate';

interface Post {
  _id: string;
  title: string;
  body: string;
  category: string;
  tags: string[];
  status: string;
  slug: string;
  createdAt: string;
  aiGenerated?: boolean;
  linkedInText?: string;
  facebookText?: string;
  topic?: string;
  stats?: string;
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

type EditorTab = 'blog' | 'linkedin' | 'facebook';

export default function PostsPage() {
  const { auth, getCurrentToken } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [tierInfo, setTierInfo] = useState<{ tier: string; postsThisMonth: number; limit: number } | null>(null);
  const [vendorType, setVendorType] = useState('');

  // AI writer state
  const [topic, setTopic] = useState('');
  const [stats, setStats] = useState('');

  // Editor state
  const [showEditor, setShowEditor] = useState(false);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [linkedInText, setLinkedInText] = useState('');
  const [facebookText, setFacebookText] = useState('');
  const [category, setCategory] = useState('guide');
  const [isAiGenerated, setIsAiGenerated] = useState(false);
  const [editorTab, setEditorTab] = useState<EditorTab>('blog');
  const [copied, setCopied] = useState<string | null>(null);
  const [savedPost, setSavedPost] = useState<Post | null>(null);

  const vendorId = auth.user?.userId;

  const fetchPosts = useCallback(async () => {
    if (!vendorId) return;
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/public/vendors/${vendorId}/posts?limit=50`);
      if (response.ok) {
        const data = await response.json();
        setPosts(data.posts || []);

        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);
        const thisMonth = (data.posts || []).filter(
          (p: Post) => new Date(p.createdAt) >= startOfMonth
        ).length;

        const token = getCurrentToken();
        if (token) {
          const profileRes = await fetch(`${API_URL}/api/vendors/profile`, {
            headers: { 'Authorization': `Bearer ${token}` },
          });
          if (profileRes.ok) {
            const profileData = await profileRes.json();
            const rawTier = profileData.vendor?.tier || profileData.tier || 'free';
            const isPaidTier = hasTierAccess(rawTier, 'starter');
            const isProTier = hasTierAccess(rawTier, 'pro');
            const limit = isProTier ? Infinity : isPaidTier ? 2 : 0;
            setTierInfo({ tier: rawTier, postsThisMonth: thisMonth, limit });
            setVendorType(profileData.vendor?.vendorType || '');
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

  const resetEditor = () => {
    setTitle('');
    setBody('');
    setLinkedInText('');
    setFacebookText('');
    setCategory('guide');
    setIsAiGenerated(false);
    setEditingPostId(null);
    setShowEditor(false);
    setSavedPost(null);
    setEditorTab('blog');
    setError('');
  };

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setError('Please enter a topic');
      return;
    }

    const token = getCurrentToken();
    if (!token || !vendorId) return;

    setError('');
    setGenerating(true);
    try {
      const response = await fetch(`${API_URL}/api/vendors/${vendorId}/posts/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ topic: topic.trim(), stats: stats.trim(), vendorType }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setTitle(data.title);
        setBody(data.body);
        setLinkedInText(data.linkedInText || '');
        setFacebookText(data.facebookText || '');
        setIsAiGenerated(true);
        setEditingPostId(null);
        setShowEditor(true);
        setSavedPost(null);
        setEditorTab('blog');
      } else {
        setError(data.error || 'AI generation failed. Please try again.');
      }
    } catch {
      setError('AI generation failed. Please try again.');
    } finally {
      setGenerating(false);
    }
  };

  const handleSave = async (status: 'draft' | 'published') => {
    if (!title.trim() || !body.trim()) {
      setError('Title and body are required');
      return;
    }

    const token = getCurrentToken();
    if (!token || !vendorId) return;

    setError('');
    setSubmitting(true);
    try {
      const isEditing = !!editingPostId;
      const url = isEditing
        ? `${API_URL}/api/vendors/${vendorId}/posts/${editingPostId}`
        : `${API_URL}/api/vendors/${vendorId}/posts`;

      const response = await fetch(url, {
        method: isEditing ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: title.trim(),
          body: body.trim(),
          category,
          status,
          aiGenerated: isAiGenerated,
          topic: topic.trim() || undefined,
          stats: stats.trim() || undefined,
          linkedInText: linkedInText.trim() || undefined,
          facebookText: facebookText.trim() || undefined,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSavedPost(data.post);
        await fetchPosts();
        if (status === 'published') {
          // Keep editor open to show share section
        }
      } else {
        setError(data.error || 'Failed to save post');
      }
    } catch {
      setError('Failed to save post. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (post: Post) => {
    setEditingPostId(post._id);
    setTitle(post.title);
    setBody(post.body);
    setCategory(post.category);
    setLinkedInText(post.linkedInText || '');
    setFacebookText(post.facebookText || '');
    setIsAiGenerated(post.aiGenerated || false);
    setTopic(post.topic || '');
    setStats(post.stats || '');
    setShowEditor(true);
    setSavedPost(post);
    setEditorTab('blog');
    setError('');
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
        if (editingPostId === postId) resetEditor();
      }
    } catch {
      console.error('Failed to delete post');
    } finally {
      setDeleting(null);
    }
  };

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(label);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(label);
      setTimeout(() => setCopied(null), 2000);
    }
  };

  const canPost = tierInfo && (tierInfo.limit === Infinity || tierInfo.postsThisMonth < tierInfo.limit);
  const isFree = tierInfo ? !hasTierAccess(tierInfo.tier, 'starter') : false;

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
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Posts</h1>
        <p className="text-gray-600 mt-1">Write blog posts, generate AI content, and share on social media</p>
      </div>

      {/* Tier/Limit Info */}
      {tierInfo && (
        <div className="card p-4">
          {isFree ? (
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">
                  Posts help AI recommend you with context
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  Share news, guides, and offers. AI tools use your posts to give richer recommendations. Available on the Pro plan.
                </p>
              </div>
              <a href="/vendor-dashboard/settings?tab=subscription" className="btn-primary px-3 py-1.5 text-sm ml-4 whitespace-nowrap">
                Upgrade
              </a>
            </div>
          ) : tierInfo.limit === Infinity ? (
            <p className="text-sm text-green-700">
              Pro plan &mdash; unlimited posts per month &bull; AI blog writer included
            </p>
          ) : (
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-700">
                <span className="font-medium">{tierInfo.postsThisMonth} of {tierInfo.limit}</span> posts used this month
                {!canPost && <span className="text-red-600 ml-2">&mdash; limit reached</span>}
              </p>
              <a href="/vendor-dashboard/settings?tab=subscription" className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                Upgrade to Pro for unlimited posts
              </a>
            </div>
          )}
        </div>
      )}

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left column — Editor (60%) */}
        <div className="lg:col-span-3 space-y-6">
          {/* AI Writer Card */}
          {!isFree && (
            <div className="card p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Write with AI</h2>

              {error && (
                <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg text-sm mb-4">
                  {error}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-1">
                    What do you want to write about?
                  </label>
                  <textarea
                    id="topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g. Why Cardiff homeowners should use a CQS-accredited conveyancer"
                    rows={3}
                    className="input resize-y"
                  />
                </div>

                <div>
                  <label htmlFor="stats" className="block text-sm font-medium text-gray-700 mb-1">
                    Any stats or facts to include? <span className="text-gray-400 font-normal">(optional)</span>
                  </label>
                  <textarea
                    id="stats"
                    value={stats}
                    onChange={(e) => setStats(e.target.value)}
                    placeholder="e.g. 68% of property transactions fall through without a specialist, average completion time is 12 weeks"
                    rows={2}
                    className="input resize-y"
                  />
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={generating || !canPost || !topic.trim()}
                  className="w-full btn-primary py-2.5 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {generating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Writing your post...
                    </>
                  ) : (
                    'Generate Post'
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Post Editor */}
          {showEditor && (
            <div className="card p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                  {editingPostId ? 'Edit Post' : 'New Post'}
                </h2>
                <button
                  onClick={resetEditor}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Cancel
                </button>
              </div>

              <div>
                <label htmlFor="editor-title" className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  id="editor-title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Post title"
                  maxLength={200}
                  className="input"
                />
              </div>

              <div>
                <label htmlFor="editor-category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  id="editor-category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="input"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>

              {/* Tab bar */}
              <div>
                <div className="flex border-b border-gray-200">
                  {([
                    { key: 'blog' as EditorTab, label: 'Blog Post' },
                    { key: 'linkedin' as EditorTab, label: 'LinkedIn' },
                    { key: 'facebook' as EditorTab, label: 'Facebook' },
                  ]).map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setEditorTab(tab.key)}
                      className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                        editorTab === tab.key
                          ? 'border-purple-600 text-purple-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}

                  {/* Copy button for current tab */}
                  <div className="ml-auto flex items-center">
                    <button
                      onClick={() => {
                        const text = editorTab === 'blog' ? body : editorTab === 'linkedin' ? linkedInText : facebookText;
                        if (text) copyToClipboard(text, editorTab);
                      }}
                      className="text-xs text-gray-500 hover:text-gray-700 px-2 py-1 rounded hover:bg-gray-100 transition-colors"
                    >
                      {copied === editorTab ? 'Copied!' : 'Copy to clipboard'}
                    </button>
                  </div>
                </div>

                {editorTab === 'blog' && (
                  <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder="Write your post content here..."
                    rows={20}
                    maxLength={10000}
                    className="input resize-y mt-2 font-mono text-sm"
                  />
                )}
                {editorTab === 'linkedin' && (
                  <textarea
                    value={linkedInText}
                    onChange={(e) => setLinkedInText(e.target.value)}
                    placeholder="LinkedIn version of your post..."
                    rows={10}
                    className="input resize-y mt-2"
                  />
                )}
                {editorTab === 'facebook' && (
                  <textarea
                    value={facebookText}
                    onChange={(e) => setFacebookText(e.target.value)}
                    placeholder="Facebook version of your post..."
                    rows={8}
                    className="input resize-y mt-2"
                  />
                )}
                {editorTab === 'blog' && (
                  <p className="text-xs text-gray-400 mt-1">{body.length}/10000 characters</p>
                )}
              </div>

              {/* Save buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => handleSave('draft')}
                  disabled={submitting}
                  className="btn-secondary px-6 py-2 disabled:opacity-50"
                >
                  {submitting ? 'Saving...' : 'Save as Draft'}
                </button>
                <button
                  onClick={() => handleSave('published')}
                  disabled={submitting}
                  className="btn-primary px-6 py-2 disabled:opacity-50"
                >
                  {submitting ? 'Publishing...' : 'Publish'}
                </button>
              </div>

              {editingPostId && (
                <button
                  onClick={() => handleDelete(editingPostId)}
                  className="text-sm text-red-500 hover:text-red-700"
                >
                  Delete this post
                </button>
              )}

              {/* Share section — shown after saving */}
              {savedPost && (savedPost.linkedInText || savedPost.facebookText || linkedInText || facebookText) && (
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Share this post</h3>
                  <div className="flex gap-3">
                    {(savedPost.linkedInText || linkedInText) && (
                      <div>
                        <button
                          onClick={() => copyToClipboard(savedPost.linkedInText || linkedInText, 'share-linkedin')}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-[#0A66C2] text-white text-sm font-medium rounded-lg hover:bg-[#004182] transition-colors"
                        >
                          {copied === 'share-linkedin' ? 'Copied!' : 'Copy LinkedIn Post'}
                        </button>
                        <p className="text-xs text-gray-400 mt-1">Paste directly into LinkedIn to publish</p>
                      </div>
                    )}
                    {(savedPost.facebookText || facebookText) && (
                      <div>
                        <button
                          onClick={() => copyToClipboard(savedPost.facebookText || facebookText, 'share-facebook')}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-[#1877F2] text-white text-sm font-medium rounded-lg hover:bg-[#0b5fcc] transition-colors"
                        >
                          {copied === 'share-facebook' ? 'Copied!' : 'Copy Facebook Post'}
                        </button>
                        <p className="text-xs text-gray-400 mt-1">Paste directly into Facebook to publish</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Manual write button — shown when editor is hidden and not free */}
          {!showEditor && !isFree && (
            <button
              onClick={() => { resetEditor(); setShowEditor(true); }}
              disabled={!canPost}
              className="card p-4 w-full text-left hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              <p className="text-sm font-medium text-gray-700">Or write a post manually</p>
              <p className="text-xs text-gray-500 mt-0.5">Create a post without AI &mdash; just fill in the title and content</p>
            </button>
          )}
        </div>

        {/* Right column — Posts list (40%) */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="p-4 border-b border-gray-200">
              <h2 className="font-semibold text-gray-900">Your Posts</h2>
            </div>
            {posts.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <svg className="w-12 h-12 mx-auto text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <p className="font-medium">No posts yet</p>
                <p className="text-sm mt-1">Use the AI writer to create your first post &mdash; it takes about 30 seconds.</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {posts.map((post) => (
                  <div key={post._id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h3 className="font-medium text-gray-900 text-sm truncate">{post.title}</h3>
                          <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full ${
                            post.status === 'published' ? 'bg-green-100 text-green-700'
                            : post.status === 'draft' ? 'bg-gray-100 text-gray-600'
                            : 'bg-red-100 text-red-700'
                          }`}>
                            {post.status === 'published' ? 'Published' : post.status === 'draft' ? 'Draft' : 'Hidden'}
                          </span>
                          {post.aiGenerated && (
                            <span className="px-1.5 py-0.5 text-[10px] font-medium rounded-full bg-purple-100 text-purple-700">
                              AI
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-600 line-clamp-2">
                          {post.body.substring(0, 120).replace(/\n/g, ' ')}
                          {post.body.length > 120 ? '...' : ''}
                        </p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                          <span>
                            {new Date(post.createdAt).toLocaleDateString('en-GB', {
                              day: 'numeric', month: 'short', year: 'numeric',
                            })}
                          </span>
                          {post.slug && post.status === 'published' && (
                            <a
                              href={`/posts/${post.slug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-purple-600 hover:text-purple-700"
                            >
                              View
                            </a>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <button
                          onClick={() => handleEdit(post)}
                          className="p-1.5 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded transition-colors"
                          title="Edit"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(post._id)}
                          disabled={deleting === post._id}
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors disabled:opacity-50"
                          title="Delete"
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
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
