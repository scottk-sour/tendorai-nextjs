import { Metadata } from 'next';
import CompareView from './CompareView';

export const metadata: Metadata = {
  title: 'Compare Suppliers',
  description:
    'Compare pricing, services, and AI visibility from multiple UK suppliers side-by-side. Find the best match for your business.',
  openGraph: {
    title: 'Compare Suppliers | TendorAI',
    description: 'Compare verified UK suppliers side-by-side on TendorAI.',
    url: 'https://www.tendorai.com/compare',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export default async function ComparePage({
  searchParams,
}: {
  searchParams: Promise<{
    vendors?: string;
    volume?: string;
    postcode?: string;
    category?: string;
    colour?: string;
    a3?: string;
  }>;
}) {
  const { vendors, volume, postcode, category, colour, a3 } = await searchParams;
  return (
    <CompareView
      vendors={vendors}
      volume={volume}
      postcode={postcode}
      category={category}
      colour={colour}
      a3={a3}
    />
  );
}
