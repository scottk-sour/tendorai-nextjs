import type { Metadata } from 'next';
import Link from 'next/link';
import Pricing from '@/app/components/landing/Pricing';

const CANONICAL = 'https://www.tendorai.com/pricing';
const TITLE = 'Pricing | TendorAI';
const DESCRIPTION =
  'The TendorAI AI Visibility Growth Programme is £1,499 per month, on an initial three-month term, currently for solicitors only. A founding rate of £999 per month is available to the first 3 solicitor firms and held for 12 months from the firm\u2019s start date. TendorAI is not currently VAT-registered, so no VAT is added. A free AI visibility report is also available, permanently free.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: CANONICAL },
  robots: { index: true, follow: true },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: CANONICAL,
    siteName: 'TendorAI',
    locale: 'en_GB',
    type: 'website',
    images: [{ url: '/logo.png', width: 873, height: 873, alt: 'TendorAI pricing' }],
  },
  twitter: {
    card: 'summary',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/logo.png'],
  },
};

// Product / Offer JSON-LD. Two offers only: the free report at 0 and the
// programme at 1499 — the standard rate. The £999 founding rate is stated in
// visible copy only, because it is limited to the first 3 solicitor firms and a
// machine-readable Offer would misstate who can buy at that price. The
// discontinued self-serve offer is deliberately absent —
// a retired price must not survive in machine-readable schema.
const productJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'TendorAI AI Visibility Growth Programme',
  description:
    'A managed AI visibility programme for UK solicitors. Monthly measurement across ChatGPT, Google AI Overviews and Perplexity on a fixed prompt set, diagnosis of what AI assistants can read about the firm, implementation of structured data and page and content changes, a written record of every change, and re-measurement against the same prompt set.',
  brand: { '@type': 'Organization', name: 'TendorAI' },
  offers: [
    {
      '@type': 'Offer',
      name: 'Free AI visibility report',
      price: '0',
      priceCurrency: 'GBP',
      url: 'https://www.tendorai.com/ai-visibility-report',
      availability: 'https://schema.org/InStock',
    },
    {
      '@type': 'Offer',
      name: 'AI Visibility Growth Programme',
      price: '1499',
      priceCurrency: 'GBP',
      url: 'https://www.tendorai.com/contact',
      availability: 'https://schema.org/InStock',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: '1499',
        priceCurrency: 'GBP',
        billingDuration: 'P1M',
        billingIncrement: 1,
        unitCode: 'MON',
      },
    },
  ],
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.tendorai.com' },
    { '@type': 'ListItem', position: 2, name: 'Pricing', item: CANONICAL },
  ],
};

const faqs = [
  {
    q: 'Why three months?',
    a: 'AI assistants do not re-read a website overnight. The initial three-month term exists so there is time to measure, implement changes, and re-measure against the same prompt set — not because we think you will want to leave.',
  },
  {
    q: 'Why solicitors only?',
    a: 'The programme is currently offered to solicitors only. Our published measurement work covers SRA-regulated firms, and the structured data we install is checked against your entry on the SRA register.',
  },
  {
    q: 'Do you need access to my website?',
    a: 'Not necessarily. Implementation can be carried out by us, which does require access, or by your own web developer, in which case we supply the changes and your developer applies them.',
  },
  {
    q: 'What if my own web developer makes the changes?',
    a: 'That is one of the two supported routes. We provide the structured data and the page and content changes, your developer applies them, and we re-measure against the same prompt set either way. The written record of every change, its date and what we expected it to do is kept regardless of who applies it.',
  },
  {
    q: 'Is the free report really free?',
    a: 'Yes. It is permanently free and requires no payment details. There is no card and no trial period — it is a one-off measurement of whether AI assistants name your firm.',
  },
];

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Hero — the £1,499 figure, the founding rate and the term are
          server-rendered here so they are in the initial HTML, not only in the
          schema below. */}
      <section className="bg-brand-gradient text-white pt-24 pb-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <nav className="text-sm mb-6 text-purple-200">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Pricing</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">Pricing</h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            The TendorAI AI Visibility Growth Programme is <strong>&pound;1,499 per month</strong>,
            on an initial three-month term. A founding rate of <strong>&pound;999 per month</strong>
            is available to the first 3 solicitor firms, held for 12 months from the firm&rsquo;s
            start date. TendorAI is not currently VAT-registered, so no VAT is added. There is also
            a free AI visibility report, which is free permanently and requires no payment
            details.
          </p>
        </div>
      </section>

      {/* Two tiers — shared component, single source of truth. */}
      <Pricing />

      {/* What we promise, and what we don't */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="font-serif text-2xl font-semibold text-[var(--text)] mb-6">
            What we promise &mdash; and what we don&rsquo;t
          </h2>
          <div className="space-y-4 text-[var(--text2)] leading-relaxed">
            <p>
              We promise the work will be accurate and verifiable. The structured data we install
              will match your entry on the SRA register. Every figure we report will carry a date, a
              method and a sample size.
            </p>
            <p>
              We don&rsquo;t promise that any AI assistant will recommend you, and we&rsquo;d be
              sceptical of anyone who does. Our own research is why:{' '}
              <Link
                href="/resources/ai-visibility-report-solicitors-august-2026"
                className="text-[var(--purple-start)] underline hover:text-[var(--purple-end)]"
              >
                we measured 1,214 UK solicitors
              </Link>{' '}
              over five weeks and found that firms we made no changes to at all moved by 0.6
              percentage points between measurements. Visibility moves on its own. Anyone selling you
              a guaranteed position is either not measuring a control group or not telling you about
              it.
            </p>
            <p>
              There is no refund guarantee attached to this programme. The three-month term exists
              because AI assistants don&rsquo;t re-read a website overnight, not because we think
              you&rsquo;ll want to leave.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="font-serif text-2xl font-semibold text-[var(--text)] mb-6">
            Frequently asked questions
          </h2>
          <div className="space-y-4">
            {faqs.map((f) => (
              <details key={f.q} className="group border border-[var(--border)] rounded-lg overflow-hidden bg-white">
                <summary className="cursor-pointer px-5 py-4 font-semibold text-[var(--text)] flex items-center justify-between gap-4">
                  <span>{f.q}</span>
                  <svg className="w-5 h-5 text-gray-400 transition-transform group-open:rotate-180 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-5 py-4 border-t border-[var(--border)] text-[var(--text2)] leading-relaxed">
                  {f.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
