import { Metadata } from 'next';
import QuoteFlow from './QuoteFlow';

export const metadata: Metadata = {
  title: 'Get Free Quotes',
  description:
    'Get instant quotes from verified UK office equipment suppliers. Compare pricing for photocopiers, printers, telecoms, CCTV, and IT services.',
  openGraph: {
    title: 'Get Free Quotes | TendorAI',
    description: 'Compare quotes from verified UK suppliers. Free, instant, no obligation.',
    url: 'https://tendorai.com/get-quotes',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export default async function GetQuotesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; postcode?: string }>;
}) {
  const { category, postcode } = await searchParams;
  return <QuoteFlow initialCategory={category} initialPostcode={postcode} />;
}
