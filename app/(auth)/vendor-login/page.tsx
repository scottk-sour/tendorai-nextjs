import { Metadata } from 'next';
import { Suspense } from 'react';
import VendorLoginForm from './VendorLoginForm';

export const metadata: Metadata = {
  title: 'Vendor Login',
  description: 'Log in to your TendorAI vendor account to manage listings, view leads, and track analytics.',
  robots: { index: false, follow: false },
};

function LoadingState() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function VendorLoginPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <VendorLoginForm />
    </Suspense>
  );
}
