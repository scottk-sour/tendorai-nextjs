import { Metadata } from 'next';
import VerticalLandingPage from '@/app/components/landing/VerticalLandingPage';
import { VERTICALS } from '@/lib/constants/verticals';
import { CITIES } from '@/lib/constants/cities';
import Link from 'next/link';

const config = VERTICALS.solicitors;

export const metadata: Metadata = {
  title: config.meta.title,
  description: config.meta.description,
  alternates: { canonical: `/${config.slug}` },
  openGraph: {
    title: config.meta.title,
    description: config.meta.description,
    url: `https://www.tendorai.com/${config.slug}`,
    images: [{ url: '/logo.png', width: 873, height: 873, alt: config.meta.title }],
  },
  twitter: {
    card: 'summary',
    title: config.meta.title,
    description: config.meta.description,
    images: ['/logo.png'],
  },
};

export default function Page() {
  return (
    <>
      <VerticalLandingPage config={config} />

      {/* Comparison page cross-link */}
      <section className="bg-purple-50 border-y border-purple-100 py-5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm md:text-base text-[var(--text)]">
            Choosing a tool?{' '}
            <Link
              href="/best-ai-visibility-tools-uk-solicitors"
              className="font-semibold text-purple-700 hover:underline"
            >
              Compare TendorAI vs Rank4AI, MLT Digital, Peec AI, Searchable &rarr;
            </Link>
          </p>
        </div>
      </section>

      <section className="py-16 bg-white border-t border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--text)] mb-8 text-center">
            AI Visibility for {config.name} by City
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 max-w-5xl mx-auto">
            {CITIES.map((city) => (
              <Link
                key={city.slug}
                href={`/${config.slug}/${city.slug}`}
                className="text-sm text-[var(--text2)] hover:text-purple-600 hover:bg-purple-50 rounded-lg px-3 py-2 transition-colors text-center"
              >
                {config.name} in {city.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
