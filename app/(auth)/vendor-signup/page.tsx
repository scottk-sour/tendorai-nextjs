import { Metadata } from 'next';
import VendorSignupForm from './VendorSignupForm';

export const metadata: Metadata = {
  title: 'Become a Vendor',
  description: 'Join TendorAI to receive qualified leads from UK businesses looking for office equipment suppliers. Sign up for free.',
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Become a TendorAI Vendor',
    description: 'Join our network of verified UK suppliers and receive qualified business leads.',
    url: 'https://tendorai.com/vendor-signup',
  },
};

export default async function VendorSignupPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string }>;
}) {
  const { plan } = await searchParams;
  return <VendorSignupForm plan={plan || 'free'} />;
}
