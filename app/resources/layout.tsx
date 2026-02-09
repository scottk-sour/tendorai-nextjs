import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Office Equipment Guides & Insights',
  description:
    'Expert advice on photocopiers, telecoms, CCTV, and IT for UK businesses. Compare suppliers, understand costs, and make informed procurement decisions.',
  openGraph: {
    title: 'Office Equipment Guides & Insights | TendorAI',
    description:
      'Expert advice on photocopiers, telecoms, CCTV, and IT for UK businesses.',
    url: '/resources',
  },
  alternates: {
    canonical: '/resources',
  },
};

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
