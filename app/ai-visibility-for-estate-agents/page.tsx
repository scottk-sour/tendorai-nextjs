import { Metadata } from 'next';
import VerticalLandingPage from '@/app/components/landing/VerticalLandingPage';
import { VERTICALS } from '@/lib/constants/verticals';

const config = VERTICALS['estate-agents'];

export const metadata: Metadata = {
  title: config.meta.title,
  description: config.meta.description,
  alternates: { canonical: `/${config.slug}` },
  openGraph: {
    title: config.meta.title,
    description: config.meta.description,
    url: `https://www.tendorai.com/${config.slug}`,
    images: [{ url: '/logo.png', width: 575, height: 283, alt: config.meta.title }],
  },
  twitter: {
    card: 'summary',
    title: config.meta.title,
    description: config.meta.description,
    images: ['/logo.png'],
  },
};

export default function AiVisibilityForEstateAgentsPage() {
  return <VerticalLandingPage config={config} />;
}
