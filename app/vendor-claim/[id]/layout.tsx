import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Claim Your Firm Profile | TendorAI',
  description:
    'Claim your pre-built firm profile on TendorAI and start getting recommended by AI.',
};

export default function VendorClaimLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
