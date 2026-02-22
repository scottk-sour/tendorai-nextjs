import { Metadata } from 'next';
import QuoteFlow from './QuoteFlow';

export const metadata: Metadata = {
  title: 'Find Verified Suppliers',
  description:
    'Find verified UK suppliers recommended by AI. Browse solicitors, accountants, mortgage advisors, estate agents, and more on TendorAI.',
  openGraph: {
    title: 'Find Verified Suppliers | TendorAI',
    description: 'Find UK suppliers that AI recommends. Browse verified profiles on TendorAI.',
    url: 'https://www.tendorai.com/get-quotes',
    type: 'website',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: '/get-quotes' },
};

export default async function GetQuotesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; postcode?: string }>;
}) {
  const { category, postcode } = await searchParams;
  return <QuoteFlow initialCategory={category} initialPostcode={postcode} />;
}
