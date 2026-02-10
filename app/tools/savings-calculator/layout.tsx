import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Office Equipment Savings Calculator',
  description:
    'Calculate how much your business could save on photocopiers, telecoms, and CCTV by comparing real pricing from 1,000+ verified UK suppliers.',
  openGraph: {
    title: 'Office Equipment Savings Calculator | TendorAI',
    description:
      'See how much you could save by comparing your current costs against market rates from verified UK suppliers.',
    url: '/tools/savings-calculator',
  },
  alternates: {
    canonical: '/tools/savings-calculator',
  },
};

export default function SavingsCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
