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

const stripMarkdown = (text: string): string => {
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1')  // bold
    .replace(/\*(.*?)\*/g, '$1')       // italic
    .replace(/#{1,6}\s/g, '')          // headings
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // links
    .replace(/`([^`]+)`/g, '$1')       // inline code
    .trim();
};

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

const CONTENT_IDEAS: Record<string, { category: string; ideas: { topic: string; stats?: string; type: string }[] }[]> = {
  solicitor: [
    { category: 'Using Your Own Data', ideas: [
      { topic: 'How many conveyancing transactions did we complete last year \u2014 and what we learned', stats: 'Insert your actual transaction count and any interesting patterns you noticed', type: 'data' },
      { topic: 'The most common questions we get asked about [practice area] \u2014 answered', stats: 'List the top 5 questions clients actually ask you on the phone', type: 'faq' },
      { topic: 'Why we became [practice area] specialists \u2014 our story', stats: 'Years in practice, number of cases handled, notable achievements', type: 'story' },
      { topic: 'What our [practice area] clients wish they had known before instructing a solicitor', stats: 'Common mistakes or surprises clients encounter \u2014 use real examples', type: 'insight' },
    ]},
    { category: 'Rewrite Industry Articles', ideas: [
      { topic: 'What the latest Law Society guidance means for [practice area] clients in [city]', stats: 'Reference the specific guidance document and add your local perspective', type: 'news' },
      { topic: 'How recent property market changes affect conveyancing timelines', stats: 'UK Finance or HMRC transaction data \u2014 add your firm\'s experience', type: 'market' },
      { topic: 'CQS accreditation \u2014 what it means and why it matters when choosing a solicitor', stats: 'Number of CQS-accredited firms in your area vs total SRA firms', type: 'guide' },
    ]},
    { category: 'AI Visibility Content', ideas: [
      { topic: 'Fixed fee conveyancing in [city] \u2014 what\'s included and what to watch out for', stats: 'Your actual fee structure and what competitors charge', type: 'seo' },
      { topic: 'How to choose a conveyancing solicitor in [city] \u2014 7 questions to ask', stats: 'Include your CQS accreditation, review count, and completion time', type: 'seo' },
      { topic: 'How long does conveyancing take in [city] in 2026?', stats: 'Your average completion time and what causes delays', type: 'seo' },
    ]},
  ],
  accountant: [
    { category: 'Using Your Own Data', ideas: [
      { topic: 'How we helped [X] local businesses reduce their tax bill last year', stats: 'Aggregate saving amount, number of clients, most common tax relief used', type: 'data' },
      { topic: 'The most common accounting mistakes we see small businesses make', stats: 'Your top 5 from real client experience \u2014 anonymised', type: 'insight' },
      { topic: 'Why we specialise in [practice area] accounting \u2014 and what we\'ve learned', stats: 'Number of clients in this industry, years of experience', type: 'story' },
      { topic: 'MTD for Income Tax \u2014 what our clients are doing now to prepare', stats: 'How many of your clients are already MTD compliant vs still preparing', type: 'data' },
    ]},
    { category: 'Rewrite Industry Articles', ideas: [
      { topic: 'What the latest HMRC changes mean for small businesses in [city]', stats: 'Reference specific HMRC guidance \u2014 add local business context', type: 'news' },
      { topic: 'R&D tax credits \u2014 who qualifies and how much could you claim?', stats: 'HMRC R&D statistics for your industry sector', type: 'guide' },
      { topic: 'Xero vs QuickBooks vs Sage \u2014 which is right for your business?', stats: 'Your experience across all three platforms with real client examples', type: 'comparison' },
    ]},
    { category: 'AI Visibility Content', ideas: [
      { topic: 'How much does an accountant cost in [city] in 2026?', stats: 'Your actual pricing tiers and what\'s included', type: 'seo' },
      { topic: 'Finding a Xero accountant in [city] \u2014 what to look for', stats: 'Your Xero certification level and client results', type: 'seo' },
      { topic: 'Small business accountant in [city] \u2014 monthly vs annual packages explained', stats: 'Your package options and typical client savings', type: 'seo' },
    ]},
  ],
  'mortgage-advisor': [
    { category: 'Using Your Own Data', ideas: [
      { topic: 'How many mortgages we arranged last year \u2014 and what the data showed', stats: 'Total mortgage value, average loan size, most common property type', type: 'data' },
      { topic: 'The most common first-time buyer mistakes we see in [city]', stats: 'Your top 5 from real client experience', type: 'insight' },
      { topic: 'Why whole of market advice matters \u2014 our access to [X] lenders explained', stats: 'Your exact lender count and how it benefits clients vs restricted advisers', type: 'story' },
      { topic: 'How long does a mortgage application take? Our [city] completion times', stats: 'Your average completion time broken down by mortgage type', type: 'data' },
    ]},
    { category: 'Rewrite Industry Articles', ideas: [
      { topic: 'What the latest Bank of England rate decision means for mortgage holders in [city]', stats: 'Current base rate, impact on tracker vs fixed mortgages', type: 'news' },
      { topic: 'Buy-to-let mortgages in 2026 \u2014 what landlords need to know', stats: 'Current BTL rates, tax changes, rental yield data for your area', type: 'guide' },
      { topic: 'Remortgaging in [city] \u2014 when is the right time and what are your options?', stats: 'Current fixed vs variable rate comparison, average savings from remortgaging', type: 'guide' },
    ]},
    { category: 'AI Visibility Content', ideas: [
      { topic: 'Fee free mortgage adviser in [city] \u2014 how it works and what to expect', stats: 'How you get paid, what clients pay, your lender panel size', type: 'seo' },
      { topic: 'First time buyer mortgage in [city] \u2014 a complete 2026 guide', stats: 'Current rates, deposit requirements, schemes available', type: 'seo' },
      { topic: 'Whole of market mortgage adviser vs bank \u2014 the real difference', stats: 'Your lender count vs typical high street bank access', type: 'seo' },
    ]},
  ],
  'estate-agent': [
    { category: 'Using Your Own Data', ideas: [
      { topic: 'How many properties did we sell in [city] last year \u2014 and at what price?', stats: 'Your actual transaction count, average sale price, achieved vs asking %', type: 'data' },
      { topic: 'The most common reasons properties fail to sell in [city] \u2014 and how we fix them', stats: 'Your experience from actual unsold properties you\'ve relisted', type: 'insight' },
      { topic: 'Our average sale time in [city] vs the national average', stats: 'Your average completion time, Rightmove national average for comparison', type: 'data' },
      { topic: 'What our landlords wish they had known before letting their first property', stats: 'Common mistakes from real landlord clients \u2014 anonymised', type: 'story' },
    ]},
    { category: 'Rewrite Industry Articles', ideas: [
      { topic: 'Property market in [city] \u2014 what the latest data shows for buyers and sellers', stats: 'Land Registry HPI data for your area, your own transaction data', type: 'market' },
      { topic: 'New EPC requirements for landlords in 2026 \u2014 what you need to do now', stats: 'Current EPC requirements, timeline for changes, cost of upgrades', type: 'news' },
      { topic: 'Rightmove vs Zoopla vs OnTheMarket \u2014 where [city] properties sell fastest', stats: 'Your experience across portals, average days to offer per portal', type: 'comparison' },
    ]},
    { category: 'AI Visibility Content', ideas: [
      { topic: 'How much do estate agents charge in [city] in 2026?', stats: 'Your exact fee structure and what\'s included', type: 'seo' },
      { topic: 'Selling a house in [city] \u2014 a complete guide for 2026', stats: 'Your average timeline, typical costs, local market conditions', type: 'seo' },
      { topic: 'Letting agents in [city] \u2014 full management vs tenant find only explained', stats: 'Your fee structures for both services', type: 'seo' },
    ]},
  ],
  'office-equipment': [
    { category: 'Using Your Own Data', ideas: [
      { topic: 'How much are [city] businesses spending on printing \u2014 and how to cut it', stats: 'Average print spend from your managed print clients, typical savings', type: 'data' },
      { topic: 'The most common office equipment mistakes businesses make in [city]', stats: 'Top 5 from your actual client experience \u2014 wrong equipment, bad contracts', type: 'insight' },
      { topic: 'Lease vs buy \u2014 what we recommend to [city] businesses in 2026', stats: 'Your actual breakdown of lease vs purchase clients and outcomes', type: 'guide' },
      { topic: 'How we saved [X] businesses money on their telecoms last year', stats: 'Average saving per client, total clients helped, most common switch', type: 'data' },
    ]},
    { category: 'Rewrite Industry Articles', ideas: [
      { topic: 'Managed print service vs buying a printer \u2014 the real cost comparison in 2026', stats: 'Total cost of ownership comparison over 3-5 years', type: 'comparison' },
      { topic: 'VoIP vs traditional phone systems for [city] businesses in 2026', stats: 'Cost comparison, features, reliability data', type: 'comparison' },
      { topic: 'CCTV requirements for UK businesses in 2026 \u2014 what the law says', stats: 'ICO guidance, GDPR requirements, typical installation costs', type: 'guide' },
    ]},
    { category: 'AI Visibility Content', ideas: [
      { topic: 'Photocopier leasing in [city] \u2014 prices, contracts, and what to watch out for', stats: 'Your actual lease pricing and contract terms', type: 'seo' },
      { topic: 'Business telecoms providers in [city] \u2014 how to choose the right one', stats: 'Your service coverage, brands you supply, typical costs', type: 'seo' },
      { topic: 'Managed print service in [city] \u2014 how it works and what it costs', stats: 'Your MPS pricing, typical client savings, setup process', type: 'seo' },
    ]},
  ],
};

const TYPE_LABELS: Record<string, { label: string; colour: string }> = {
  data: { label: 'Your Data', colour: 'bg-blue-100 text-blue-700' },
  faq: { label: 'FAQ', colour: 'bg-purple-100 text-purple-700' },
  story: { label: 'Your Story', colour: 'bg-green-100 text-green-700' },
  insight: { label: 'Insight', colour: 'bg-amber-100 text-amber-700' },
  news: { label: 'Industry News', colour: 'bg-red-100 text-red-700' },
  market: { label: 'Market Data', colour: 'bg-orange-100 text-orange-700' },
  guide: { label: 'Guide', colour: 'bg-teal-100 text-teal-700' },
  comparison: { label: 'Comparison', colour: 'bg-pink-100 text-pink-700' },
  seo: { label: 'AI Visibility', colour: 'bg-indigo-100 text-indigo-700' },
};

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
  const [vendorCity, setVendorCity] = useState('');
  const [practiceAreas, setPracticeAreas] = useState<string[]>([]);
  const [companyName, setCompanyName] = useState('');

  // AI writer state
  const [topic, setTopic] = useState('');
  const [stats, setStats] = useState('');
  const [showIdeas, setShowIdeas] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(0);

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
            setVendorCity(profileData.vendor?.location?.city || '');
            setPracticeAreas(profileData.vendor?.practiceAreas || []);
            setCompanyName(profileData.vendor?.company || '');
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
                    id="topic-field"
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

                {/* Content Ideas Panel */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setShowIdeas(!showIdeas)}
                    className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
                  >
                    <span className="text-sm font-medium text-gray-700">
                      Need inspiration? View content ideas for your industry
                    </span>
                    <span className="text-gray-400 text-xs">
                      {showIdeas ? '\u25B2 Hide' : '\u25BC Show'}
                    </span>
                  </button>

                  {showIdeas && (
                    <div className="p-4">
                      {/* Category tabs */}
                      <div className="flex gap-2 mb-4 flex-wrap">
                        {(CONTENT_IDEAS[vendorType] || CONTENT_IDEAS['solicitor']).map((cat, i) => (
                          <button
                            key={i}
                            onClick={() => setSelectedCategory(i)}
                            className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
                              selectedCategory === i
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                          >
                            {cat.category}
                          </button>
                        ))}
                      </div>

                      {/* Ideas list */}
                      <div className="space-y-3">
                        {(CONTENT_IDEAS[vendorType] || CONTENT_IDEAS['solicitor'])[selectedCategory]?.ideas.map((idea, i) => {
                          const typeInfo = TYPE_LABELS[idea.type] || { label: idea.type, colour: 'bg-gray-100 text-gray-600' };
                          const ideaTopic = idea.topic
                            .replace(/\[city\]/g, vendorCity || 'your area')
                            .replace(/\[practice area\]/g, practiceAreas[0] || 'your speciality')
                            .replace(/\[X\]/g, 'many');
                          const ideaStats = idea.stats
                            ?.replace(/\[city\]/g, vendorCity || 'your area')
                            .replace(/\[practice area\]/g, practiceAreas[0] || 'your speciality');

                          return (
                            <div key={i} className="border border-gray-100 rounded-lg p-3 hover:border-blue-200 transition-colors">
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeInfo.colour}`}>
                                      {typeInfo.label}
                                    </span>
                                  </div>
                                  <p className="text-sm font-medium text-gray-800">{ideaTopic}</p>
                                  {ideaStats && (
                                    <p className="text-xs text-gray-500 mt-1">{ideaStats}</p>
                                  )}
                                </div>
                                <button
                                  onClick={() => {
                                    setTopic(ideaTopic);
                                    if (ideaStats) setStats(ideaStats);
                                    setShowIdeas(false);
                                    setTimeout(() => document.getElementById('topic-field')?.focus(), 100);
                                  }}
                                  className="flex-shrink-0 text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                  Use this
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <p className="text-xs text-gray-400 mt-3">
                        Click &quot;Use this&quot; to load any idea into the writer. Add your own stats and data to make it unique to your firm.
                      </p>
                    </div>
                  )}
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
                          {stripMarkdown(post.body).substring(0, 120)}
                          {stripMarkdown(post.body).length > 120 ? '...' : ''}
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
