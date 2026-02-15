import { Metadata } from 'next';
import VendorLoginForm from './VendorLoginForm';

export const metadata: Metadata = {
  title: 'Vendor Login',
  description: 'Log in to your TendorAI vendor account to manage listings, view leads, and track analytics.',
  robots: { index: false, follow: false },
};

export default async function VendorLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string }>;
}) {
  const { redirect } = await searchParams;
  return <VendorLoginForm redirectTo={redirect || '/vendor-dashboard'} />;
}
