'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/app/contexts/AuthContext';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://ai-procurement-backend-q35u.onrender.com';

interface Review {
  _id: string;
  reviewer: {
    name: string;
    company?: string;
    email?: string;
  };
  rating: number;
  title: string;
  content: string;
  service: string;
  status: 'pending' | 'approved' | 'rejected' | 'flagged';
  vendorResponse?: {
    content: string;
    respondedAt: string;
  };
  helpfulVotes: number;
  createdAt: string;
  moderatedAt?: string;
}

interface ReviewStats {
  averageRating: number;
  totalReviews: number;
  distribution: Record<number, number>;
  recommendPercentage: number;
}

interface StatusCounts {
  pending: number;
  approved: number;
  rejected: number;
  flagged: number;
  total: number;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-4 h-4 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function VendorReviewsPage() {
  const { getCurrentToken } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [stats, setStats] = useState<ReviewStats | null>(null);
  const [counts, setCounts] = useState<StatusCounts | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [respondingTo, setRespondingTo] = useState<string | null>(null);
  const [responseText, setResponseText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchReviews = async () => {
    const token = getCurrentToken();
    if (!token) return;

    try {
      const url = new URL(`${API_URL}/api/reviews/my-reviews`);
      if (statusFilter) url.searchParams.set('status', statusFilter);

      const response = await fetch(url.toString(), {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await response.json();

      if (data.success) {
        setReviews(data.reviews);
        setStats(data.stats);
        setCounts(data.counts);
      } else {
        throw new Error(data.error || 'Failed to fetch reviews');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [statusFilter]);

  const handleRespond = async (reviewId: string) => {
    if (!responseText.trim()) return;

    const token = getCurrentToken();
    if (!token) return;

    setSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/api/reviews/${reviewId}/respond`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ response: responseText })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit response');
      }

      // Refresh reviews
      fetchReviews();
      setRespondingTo(null);
      setResponseText('');
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to submit response');
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      flagged: 'bg-orange-100 text-orange-800'
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status] || 'bg-gray-100 text-gray-800'}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-gray-200 rounded w-1/4 animate-pulse"></div>
        <div className="grid grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-24 bg-gray-200 rounded animate-pulse"></div>
          ))}
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-32 bg-gray-200 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error}</p>
        <button onClick={fetchReviews} className="mt-4 text-purple-600 hover:underline">
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Reviews</h1>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-500">Average Rating</div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-semibold text-gray-900">
              {stats?.averageRating.toFixed(1) || '0.0'}
            </span>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={`w-4 h-4 ${star <= Math.round(stats?.averageRating || 0) ? 'text-yellow-400' : 'text-gray-300'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-500">Total Reviews</div>
          <div className="mt-1 text-2xl font-semibold text-gray-900">
            {counts?.total || 0}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-500">Approved</div>
          <div className="mt-1 text-2xl font-semibold text-green-600">
            {counts?.approved || 0}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-500">Pending Moderation</div>
          <div className="mt-1 text-2xl font-semibold text-yellow-600">
            {counts?.pending || 0}
          </div>
        </div>
      </div>

      {/* Recommend percentage */}
      {stats && stats.totalReviews > 0 && (
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">Would Recommend</div>
              <div className="mt-1 text-2xl font-semibold text-gray-900">
                {stats.recommendPercentage}%
              </div>
            </div>
            <div className="w-48 h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 rounded-full"
                style={{ width: `${stats.recommendPercentage}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Filter */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-500">Filter by status:</span>
        <div className="flex gap-2">
          <button
            onClick={() => setStatusFilter('')}
            className={`px-3 py-1 text-sm rounded-full ${!statusFilter ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            All ({counts?.total || 0})
          </button>
          <button
            onClick={() => setStatusFilter('approved')}
            className={`px-3 py-1 text-sm rounded-full ${statusFilter === 'approved' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            Approved ({counts?.approved || 0})
          </button>
          <button
            onClick={() => setStatusFilter('pending')}
            className={`px-3 py-1 text-sm rounded-full ${statusFilter === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            Pending ({counts?.pending || 0})
          </button>
        </div>
      </div>

      {/* Reviews list */}
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No reviews yet</h3>
            <p className="mt-2 text-sm text-gray-500">
              Reviews from your customers will appear here.
            </p>
          </div>
        ) : (
          reviews.map((review) => (
            <div key={review._id} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <StarRating rating={review.rating} />
                    <span className="font-medium text-gray-900">{review.title}</span>
                    {getStatusBadge(review.status)}
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                    <span>{review.reviewer.name}</span>
                    {review.reviewer.company && (
                      <>
                        <span>•</span>
                        <span>{review.reviewer.company}</span>
                      </>
                    )}
                    <span>•</span>
                    <span>{formatDate(review.createdAt)}</span>
                    {review.service !== 'General' && (
                      <>
                        <span>•</span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-600">
                          {review.service}
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  {review.helpfulVotes} helpful
                </div>
              </div>

              <p className="mt-3 text-gray-700">{review.content}</p>

              {/* Vendor response */}
              {review.vendorResponse ? (
                <div className="mt-4 ml-4 pl-4 border-l-2 border-purple-200 bg-purple-50 rounded-r-lg p-3">
                  <div className="text-sm font-medium text-purple-900">Your Response</div>
                  <p className="mt-1 text-sm text-gray-700">{review.vendorResponse.content}</p>
                  <div className="mt-1 text-xs text-gray-500">
                    {formatDate(review.vendorResponse.respondedAt)}
                  </div>
                </div>
              ) : review.status === 'approved' ? (
                respondingTo === review._id ? (
                  <div className="mt-4 space-y-3">
                    <textarea
                      value={responseText}
                      onChange={(e) => setResponseText(e.target.value)}
                      rows={3}
                      maxLength={1000}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                      placeholder="Write your response to this review..."
                    />
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {responseText.length}/1000 characters
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setRespondingTo(null);
                            setResponseText('');
                          }}
                          className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleRespond(review._id)}
                          disabled={!responseText.trim() || submitting}
                          className="px-3 py-1.5 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
                        >
                          {submitting ? 'Submitting...' : 'Submit Response'}
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setRespondingTo(review._id)}
                    className="mt-3 text-sm text-purple-600 hover:text-purple-700 font-medium"
                  >
                    Respond to this review
                  </button>
                )
              ) : null}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
