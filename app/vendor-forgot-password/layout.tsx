import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reset Password | TendorAI',
  description: 'Reset your TendorAI firm account password.',
  robots: 'noindex',
};

export default function VendorForgotPasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
