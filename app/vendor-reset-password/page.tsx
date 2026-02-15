import { Metadata } from 'next';
import ResetPasswordContent from './ResetPasswordContent';

export const metadata: Metadata = {
  title: 'Reset Password',
  description: 'Create a new password for your TendorAI vendor account.',
};

export default async function VendorResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;
  return <ResetPasswordContent token={token || null} />;
}
