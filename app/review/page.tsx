import { Metadata } from 'next';
import ReviewForm from './ReviewForm';

export const metadata: Metadata = {
  title: 'Leave a Review | TendorAI',
  description: 'Share your experience with an office equipment supplier on TendorAI.',
};

export default function ReviewPage() {
  return <ReviewForm />;
}
