import { Metadata } from 'next';
import Link from 'next/link';

const TITLE =
  'TendorAI Alternatives: How We Compare to Other AI Visibility Tools';
const DESCRIPTION =
  'Compare TendorAI to Peec AI, OtterlyAI, AireStream and other AI visibility tools. See which platform is best for UK solicitors, accountants and mortgage advisers.';
const CANONICAL = 'https://www.tendorai.com/compare';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: CANONICAL,
    images: [{ url: '/logo.png', width: 873, height: 873 }],
  },
  twitter: {
    card: 'summary',
    title: TITLE,
    description: DESCRIPTION,
  },
};

const faqs = [
  {
    q: 'What are the best TendorAI alternatives?',
    a: 'The main alternatives to TendorAI for AI visibility are Peec AI (broad LLM monitoring for brands), OtterlyAI (Google AI Overviews tracking), AireStream (legal and accountancy monitoring), Profound (enterprise citation analysis), and SE Ranking or Ahrefs AI visibility features. However, none of these alternatives offer UK regulatory data integration or schema installation on your website \u2014 both of which are essential for professional services firms to appear in AI recommendations.',
  },
  {
    q: 'Is there a free alternative to TendorAI?',
    a: 'TendorAI itself offers a free tier with a basic profile built from regulatory register data. For monitoring only, you can manually test AI visibility by asking ChatGPT and Perplexity to recommend firms in your area \u2014 this is free but time-consuming. No other tool offers free regulatory-verified profiles for UK professional services firms.',
  },
  {
    q: 'How is TendorAI different from SEO tools like Ahrefs or SE Ranking?',
    a: 'SEO tools optimise for Google search rankings. TendorAI optimises for AI recommendation engines \u2014 ChatGPT, Perplexity, Claude, Gemini, Grok and Meta AI. The mechanisms are different: AI models rely on structured schema, regulatory verification and entity consistency, not keyword rankings or backlink profiles.',
  },
  {
    q: 'Does TendorAI replace my SEO agency?',
    a: 'No. TendorAI handles AI visibility \u2014 a separate channel from Google SEO. Most firms benefit from both. TendorAI Pro at \u00a3299 per month covers schema installation, regulatory data structuring, AI content, and weekly tracking across six AI platforms. Your SEO agency continues to handle Google rankings.',
  },
  {
    q: 'Which AI visibility tool is best for UK solicitors?',
    a: 'TendorAI is the only tool that pulls SRA register data, installs LegalService schema on your website, and tracks your visibility across ChatGPT, Perplexity and four other AI platforms. For monitoring-only, AireStream also targets UK legal firms but does not install schema or integrate regulatory data.',
  },
];

function ComparisonTable({
  headers,
  rows,
}: {
  headers: [string, string, string];
  rows: [string, string, string][];
}) {
  return (
    <div className="overflow-x-auto my-8">
      <table className="w-full border-collapse text-sm sm:text-base">
        <thead>
          <tr className="bg-[#1B4F72] text-white">
            {headers.map((h, i) => (
              <th
                key={i}
                className="py-3 px-4 text-left font-semibold border border-[#1B4F72]"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
            >
              {row.map((cell, j) => (
                <td
                  key={j}
                  className="py-3 px-4 border border-gray-200"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function ComparePage() {
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'TendorAI',
    description:
      'AI visibility platform for UK regulated professional services firms. Get recommended by ChatGPT, Perplexity, Claude, Gemini, Grok and Meta AI.',
    brand: { '@type': 'Brand', name: 'TendorAI' },
    offers: [
      {
        '@type': 'Offer',
        name: 'Free',
        price: '0',
        priceCurrency: 'GBP',
        description:
          'Basic profile built from regulatory register data, listed in directory, visible to AI crawlers.',
      },
      {
        '@type': 'Offer',
        name: 'Pro',
        price: '299',
        priceCurrency: 'GBP',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: '299',
          priceCurrency: 'GBP',
          billingDuration: 'P1M',
        },
        description:
          'Schema installation, AI mention tracking, weekly reports, AI content writer, Verified badge, priority ranking.',
      },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.tendorai.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Compare',
        item: 'https://www.tendorai.com/compare',
      },
    ],
  };

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />

      {/* Hero */}
      <section className="bg-brand-gradient text-white py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <nav className="text-sm mb-6 text-white/80">
            <Link href="/" className="hover:text-white">
              Home
            </Link>{' '}
            &rsaquo; Compare
          </nav>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            TendorAI Alternatives: How We Compare to Other AI Visibility Tools
          </h1>
          <p className="mt-4 text-lg text-white/90 max-w-2xl">
            TendorAI is the only AI visibility platform built specifically for
            UK regulated professional services firms. This page shows how it
            compares to every major alternative in 2026.
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        {/* TendorAI vs Peec AI */}
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
          TendorAI vs Peec AI
        </h2>
        <p className="text-gray-700 leading-relaxed mb-2">
          Peec AI is a broad LLM monitoring platform designed for brands and
          agencies. It tracks visibility across 10+ large language models with
          sentiment analysis and competitive benchmarking. However, Peec AI is
          not built for UK professional services &mdash; it has no regulatory
          data integration (SRA, ICAEW, FCA), does not install schema markup on
          your website, and does not generate AI-optimised content for your firm.
        </p>

        <ComparisonTable
          headers={['Feature', 'TendorAI', 'Peec AI']}
          rows={[
            [
              'UK regulatory data (SRA, ICAEW, FCA)',
              'Yes',
              'No',
            ],
            [
              'Schema installation on your website',
              'Yes \u2014 within 48 hours',
              'No',
            ],
            ['Multi-platform AI tracking', '6 platforms', '10+ platforms'],
            ['Firm-level reporting', 'Yes', 'Yes'],
            [
              'AI content writer',
              'Yes \u2014 2 posts/week',
              'No',
            ],
            [
              'Best for',
              'UK professional services',
              'Brands and agencies',
            ],
            [
              'Price',
              'Free / \u00a3299 Pro',
              'Custom pricing',
            ],
          ]}
        />

        {/* TendorAI vs OtterlyAI */}
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-12 mb-4">
          TendorAI vs OtterlyAI
        </h2>
        <p className="text-gray-700 leading-relaxed mb-2">
          OtterlyAI specialises in GEO &mdash; tracking how brands appear in
          Google AI Overviews. It is strong for that specific use case but
          limited beyond Google. OtterlyAI has no regulatory data integration,
          no schema installation on your website, and limited tracking of
          ChatGPT, Perplexity and other non-Google AI platforms.
        </p>

        <ComparisonTable
          headers={['Feature', 'TendorAI', 'OtterlyAI']}
          rows={[
            ['UK regulatory data', 'Yes', 'No'],
            ['Schema installation', 'Yes', 'No'],
            [
              'Google AI Overviews tracking',
              'Yes',
              'Yes (specialist)',
            ],
            ['ChatGPT tracking', 'Yes', 'Limited'],
            ['Perplexity tracking', 'Yes', 'Limited'],
            [
              'Best for',
              'UK professional services',
              'Marketing teams focused on GEO',
            ],
            [
              'Price',
              'Free / \u00a3299 Pro',
              'From $29/month',
            ],
          ]}
        />

        {/* TendorAI vs AireStream */}
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-12 mb-4">
          TendorAI vs AireStream
        </h2>
        <p className="text-gray-700 leading-relaxed mb-2">
          AireStream targets legal and accountancy firms with AI visibility
          monitoring and lead automation. It is closer to TendorAI&rsquo;s
          target market but is monitoring-only &mdash; AireStream does not
          install schema markup on your website or pull regulatory data directly
          from the SRA, ICAEW or FCA registers.
        </p>

        <ComparisonTable
          headers={['Feature', 'TendorAI', 'AireStream']}
          rows={[
            [
              'UK regulatory data',
              'Yes \u2014 SRA, ICAEW, FCA',
              'Partial',
            ],
            ['Schema installation', 'Yes', 'No'],
            ['AI tracking', '6 platforms weekly', 'Yes'],
            ['Lead automation', 'Via enquiry form', 'Yes'],
            ['Content writer', 'Yes', 'No'],
            [
              'Best for',
              'UK professional services (implementation + tracking)',
              'UK legal/accountancy (monitoring only)',
            ],
            [
              'Price',
              'Free / \u00a3299 Pro',
              'Custom pricing',
            ],
          ]}
        />

        {/* Summary */}
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-12 mb-4">
          Summary &mdash; which tool should you choose?
        </h2>
        <ul className="list-disc pl-6 space-y-3 text-gray-700 leading-relaxed">
          <li>
            You want AI to recommend your UK solicitor, accountant or mortgage
            adviser firm &rarr;{' '}
            <Link
              href="/for-vendors"
              className="text-blue-700 font-semibold hover:underline"
            >
              TendorAI
            </Link>
          </li>
          <li>
            You want broad LLM brand monitoring across multiple industries
            &rarr; Peec AI
          </li>
          <li>
            You want Google AI Overviews tracking specifically &rarr; OtterlyAI
          </li>
          <li>
            You want monitoring for a UK legal or accountancy firm that already
            has schema &rarr; AireStream
          </li>
          <li>
            You want enterprise-scale citation analysis &rarr; Profound
          </li>
        </ul>

        {/* FAQ */}
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-12 mb-6">
          Frequently asked questions
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <details
              key={i}
              className="group border border-gray-200 rounded-lg"
            >
              <summary className="cursor-pointer px-5 py-4 font-semibold text-gray-900 hover:bg-gray-50 list-none flex items-center justify-between">
                {faq.q}
                <span className="ml-2 text-gray-400 group-open:rotate-180 transition-transform">
                  &#9662;
                </span>
              </summary>
              <div className="px-5 pb-4 text-gray-700 leading-relaxed">
                {faq.a}
              </div>
            </details>
          ))}
        </div>

        {/* CTA */}
        <section className="mt-16 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 text-white px-6 sm:px-10 py-10 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Ready to get your firm recommended by AI?
          </h2>
          <p className="text-white/80 max-w-xl mx-auto mb-6 leading-relaxed">
            TendorAI pulls your regulatory data, installs schema on your
            website, and tracks your visibility across six AI platforms &mdash;
            ChatGPT, Perplexity, Claude, Gemini, Grok and Meta AI.
          </p>
          <Link
            href="/for-vendors"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            Claim your free profile
          </Link>
        </section>

        {/* Back to home */}
        <div className="mt-10 text-center">
          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-gray-700 hover:underline"
          >
            &larr; Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
