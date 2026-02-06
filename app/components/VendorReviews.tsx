'use client';

import { useState, useEffect } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://ai-procurement-backend-q35u.onrender.com';

interface Review {
  _id: string;
  reviewer: {
    name: string;
    company?: string;
  };
  rating: number;
  title: string;
  content: string;
  service: string;
  wouldRecommend: boolean;
  vendorResponse?: {
    content: string;
    respondedAt: string;
  };
  helpfulVotes: number;
  createdAt: string;
}

interface ReviewStats {
  averageRating: number;
  totalReviews: number;
  distribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
  recommendPercentage: number;
}

interface VendorReviewsProps {
  vendorId: string;
  vendorName: string;
  showWriteReview?: boolean;
}

function StarRating({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`${sizeClasses[size]} ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function RatingBar({ stars, count, total }: { stars: number; count: number; total: number }) {
  const percentage = total > 0 ? (count / total) * 100 : 0;

  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="w-3 text-gray-600">{stars}</span>
      <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-yellow-400 rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="w-8 text-gray-500 text-right">{count}</span>
    </div>
  );
}

export default function VendorReviews({ vendorId, vendorName, showWriteReview = true }: VendorReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [stats, setStats] = useState<ReviewStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sortBy, setSortBy] = useState<'recent' | 'highest' | 'lowest' | 'helpful'>('recent');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchReviews = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/reviews/vendor/${vendorId}?page=${page}&limit=5&sort=${sortBy}`
      );
      const data = await response.json();

      if (data.success) {
        setReviews(data.reviews);
        setStats(data.stats);
        setTotalPages(data.pagination.pages);
      }
    } catch {
      setError('Failed to load reviews');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [vendorId, sortBy, page]);

  const handleMarkHelpful = async (reviewId: string) => {
    try {
      await fetch(`${API_URL}/api/reviews/${reviewId}/helpful`, {
        method: 'POST'
      });
      // Refresh reviews
      fetchReviews();
    } catch {
      // Silently fail
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-6 bg-gray-200 rounded w-1/3"></div>
        <div className="h-32 bg-gray-200 rounded"></div>
        <div className="h-24 bg-gray-200 rounded"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-gray-500">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with stats */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
        {/* Rating summary */}
        {stats && stats.totalReviews > 0 ? (
          <div className="flex items-start gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900">{stats.averageRating.toFixed(1)}</div>
              <StarRating rating={Math.round(stats.averageRating)} size="md" />
              <div className="text-sm text-gray-500 mt-1">{stats.totalReviews} reviews</div>
            </div>
            <div className="space-y-1 min-w-[200px]">
              {[5, 4, 3, 2, 1].map((stars) => (
                <RatingBar
                  key={stars}
                  stars={stars}
                  count={stats.distribution[stars as keyof typeof stats.distribution]}
                  total={stats.totalReviews}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-gray-500">
            <p className="font-medium">No reviews yet</p>
            <p className="text-sm">Be the first to review {vendorName}</p>
          </div>
        )}

        {/* Write review button */}
        {showWriteReview && (
          <button
            onClick={() => setShowReviewForm(true)}
            className="btn-primary"
          >
            Write a Review
          </button>
        )}
      </div>

      {/* Review form modal */}
      {showReviewForm && (
        <ReviewForm
          vendorId={vendorId}
          vendorName={vendorName}
          onClose={() => setShowReviewForm(false)}
          onSuccess={() => {
            setShowReviewForm(false);
            fetchReviews();
          }}
        />
      )}

      {/* Sort and filter */}
      {reviews.length > 0 && (
        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          <h3 className="font-medium text-gray-900">Customer Reviews</h3>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="text-sm border border-gray-300 rounded-md px-3 py-1.5 focus:ring-purple-500 focus:border-purple-500"
          >
            <option value="recent">Most Recent</option>
            <option value="highest">Highest Rated</option>
            <option value="lowest">Lowest Rated</option>
            <option value="helpful">Most Helpful</option>
          </select>
        </div>
      )}

      {/* Reviews list */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review._id} className="border-b border-gray-100 pb-6 last:border-0">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <StarRating rating={review.rating} />
                  <span className="font-medium text-gray-900">{review.title}</span>
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
                </div>
              </div>
              {review.wouldRecommend && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Recommends
                </span>
              )}
            </div>

            <p className="mt-3 text-gray-700">{review.content}</p>

            {review.service !== 'General' && (
              <div className="mt-2">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600">
                  {review.service}
                </span>
              </div>
            )}

            {/* Vendor response */}
            {review.vendorResponse && (
              <div className="mt-4 ml-4 pl-4 border-l-2 border-purple-200 bg-purple-50 rounded-r-lg p-3">
                <div className="text-sm font-medium text-purple-900">Response from {vendorName}</div>
                <p className="mt-1 text-sm text-gray-700">{review.vendorResponse.content}</p>
                <div className="mt-1 text-xs text-gray-500">
                  {formatDate(review.vendorResponse.respondedAt)}
                </div>
              </div>
            )}

            {/* Helpful button */}
            <div className="mt-4">
              <button
                onClick={() => handleMarkHelpful(review._id)}
                className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
                Helpful ({review.helpfulVotes})
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-3 py-1 text-sm text-gray-600">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

// Review submission form component
function ReviewForm({
  vendorId,
  vendorName,
  onClose,
  onSuccess
}: {
  vendorId: string;
  vendorName: string;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [formData, setFormData] = useState({
    reviewerName: '',
    reviewerCompany: '',
    reviewerEmail: '',
    rating: 0,
    title: '',
    content: '',
    service: 'General',
    wouldRecommend: true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.rating === 0) {
      setError('Please select a rating');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/api/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vendorId, ...formData })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit review');
      }

      setSuccess(true);
      setTimeout(() => {
        onSuccess();
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Review {vendorName}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {success ? (
            <div className="text-center py-8">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Review submitted!</h3>
              <p className="mt-2 text-sm text-gray-600">
                Thank you for your feedback. Your review will be published after moderation.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Overall Rating <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData(f => ({ ...f, rating: star }))}
                      className="p-1"
                    >
                      <svg
                        className={`w-8 h-8 ${star <= formData.rating ? 'text-yellow-400' : 'text-gray-300'} hover:text-yellow-400 transition-colors`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>

              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Review Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  required
                  maxLength={100}
                  value={formData.title}
                  onChange={(e) => setFormData(f => ({ ...f, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Summarise your experience"
                />
              </div>

              {/* Content */}
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Review <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="content"
                  required
                  rows={4}
                  maxLength={2000}
                  value={formData.content}
                  onChange={(e) => setFormData(f => ({ ...f, content: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Share details about your experience..."
                />
              </div>

              {/* Service */}
              <div>
                <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
                  Service Used
                </label>
                <select
                  id="service"
                  value={formData.service}
                  onChange={(e) => setFormData(f => ({ ...f, service: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="General">General</option>
                  <option value="Photocopiers">Photocopiers</option>
                  <option value="CCTV">CCTV</option>
                  <option value="Telecoms">Telecoms</option>
                  <option value="IT">IT</option>
                  <option value="Security">Security</option>
                  <option value="Software">Software</option>
                </select>
              </div>

              {/* Would recommend */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="wouldRecommend"
                  checked={formData.wouldRecommend}
                  onChange={(e) => setFormData(f => ({ ...f, wouldRecommend: e.target.checked }))}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <label htmlFor="wouldRecommend" className="ml-2 text-sm text-gray-700">
                  I would recommend this supplier
                </label>
              </div>

              <hr className="my-4" />

              {/* Reviewer info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="reviewerName" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="reviewerName"
                    required
                    value={formData.reviewerName}
                    onChange={(e) => setFormData(f => ({ ...f, reviewerName: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <div>
                  <label htmlFor="reviewerCompany" className="block text-sm font-medium text-gray-700 mb-1">
                    Company
                  </label>
                  <input
                    type="text"
                    id="reviewerCompany"
                    value={formData.reviewerCompany}
                    onChange={(e) => setFormData(f => ({ ...f, reviewerCompany: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="reviewerEmail" className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-gray-400">(optional, not displayed)</span>
                </label>
                <input
                  type="email"
                  id="reviewerEmail"
                  value={formData.reviewerEmail}
                  onChange={(e) => setFormData(f => ({ ...f, reviewerEmail: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  placeholder="For verification purposes only"
                />
              </div>

              {/* Submit */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Review'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
