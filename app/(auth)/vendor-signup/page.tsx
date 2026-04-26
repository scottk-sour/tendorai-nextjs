import { Metadata } from 'next';
import VendorSignupForm from './VendorSignupForm';

export const metadata: Metadata = {
  title: 'Become a Firm',
  description: 'Join TendorAI so AI recommends your business. Free AI visibility profiles for UK solicitors, accountants, mortgage advisors, estate agents, and more.',
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Become a TendorAI Firm',
    description: 'Join TendorAI so AI recommends your business by name. Free profiles for UK professional services.',
    url: 'https://www.tendorai.com/vendor-signup',
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
