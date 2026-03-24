import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Visibility Resources for UK Professional Services | TendorAI',
  description:
    'Guides, data reports, and strategies for UK solicitors, accountants, and mortgage advisers on getting recommended by ChatGPT and Perplexity.',
  openGraph: {
    title: 'AI Visibility Resources for UK Professional Services | TendorAI',
    description:
      'Guides, data reports, and strategies for UK solicitors, accountants, and mortgage advisers on getting recommended by ChatGPT and Perplexity.',
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
