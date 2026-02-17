import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resources — AI Visibility Guides & Insights',
  description:
    'Expert guides on AI visibility, AEO, and getting your business recommended by ChatGPT, Claude, and Perplexity. For UK solicitors, suppliers, and professional services.',
  openGraph: {
    title: 'AI Visibility Resources | TendorAI',
    description:
      'Expert guides on AI visibility and getting recommended by AI platforms.',
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
