import { Metadata } from 'next';
import { Suspense } from 'react';
import VendorSignupForm from './VendorSignupForm';

export const metadata: Metadata = {
  title: 'Become a Vendor | TendorAI',
  description: 'Join TendorAI to receive qualified leads from UK businesses looking for office equipment suppliers. Sign up for free.',
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Become a TendorAI Vendor',
    description: 'Join our network of verified UK suppliers and receive qualified business leads.',
    url: 'https://www.tendorai.com/vendor-signup',
  },
};

function LoadingState() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function VendorSignupPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <VendorSignupForm />
    </Suspense>
  );
}
