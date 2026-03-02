import { Metadata } from 'next';
import VerticalLandingPage from '@/app/components/landing/VerticalLandingPage';
import { VERTICALS } from '@/lib/constants/verticals';
import { CITIES } from '@/lib/constants/cities';
import Link from 'next/link';

const config = VERTICALS.accountants;

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'AI Visibility for UK Accountants',
  description: 'TendorAI helps UK accountancy firms get recommended by ChatGPT, Perplexity, Claude and Google AI. Free AI visibility report included.',
  provider: {
    '@type': 'Organization',
    name: 'TendorAI',
    url: 'https://www.tendorai.com',
  },
  areaServed: 'GB',
  serviceType: 'AI Visibility Optimisation',
  url: 'https://www.tendorai.com/ai-visibility-for-accountants',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I get my accountancy firm recommended by ChatGPT?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'To get your accountancy firm recommended by ChatGPT, you need structured data that AI can read — including your services, specialisms, client sectors, and location. TendorAI creates an AI-readable profile for your firm and installs Schema.org markup on your website so AI platforms can confidently recommend you.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is AI visibility for accountants?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'AI visibility is how likely AI assistants like ChatGPT, Perplexity, and Claude are to recommend your accountancy firm when someone asks for an accountant. Unlike SEO which targets Google, AI visibility focuses on making your firm findable and recommendable by AI platforms through structured data and verified business information.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does AI visibility work for UK accounting firms?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. TendorAI is specifically built for UK professional services firms including accountants. We use data from ICAEW, ACCA, and other UK accounting bodies to verify your firm and provide AI platforms with trusted, structured information about your practice areas, qualifications, and location.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does it take for an accountancy firm to appear in AI recommendations?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most accountancy firms see improvements in AI visibility within 2-4 weeks of setting up their TendorAI profile and installing structured data. AI platforms continuously update their knowledge, so the sooner you provide structured data, the sooner they can start recommending you.',
      },
    },
    {
      '@type': 'Question',
      name: "What's the difference between SEO and AI visibility for accountants?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'SEO optimises your website for Google search rankings. AI visibility optimises your business data for AI recommendations. When a business owner asks ChatGPT "find me a tax advisor in Manchester", the AI doesn\'t crawl Google — it looks for structured data it can trust. TendorAI provides that structured data specifically for UK accountancy firms.',
      },
    },
  ],
};

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <VerticalLandingPage config={config} />
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
