import { Metadata } from 'next';
import ReviewForm from './ReviewForm';

export const metadata: Metadata = {
  title: 'Leave a Review',
  description: 'Share your experience with a professional services firm on TendorAI.',
};

export default async function ReviewPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;
  return <ReviewForm token={token || null} />;
}
