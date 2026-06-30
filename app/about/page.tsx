// app/about/page.tsx
// Before merge: FILL the live firm count (search "FILL:") — same number as the FAQ.

import type { Metadata } from 'next';
import Link from 'next/link';

const FIRM_COUNT = '62,026+';

export const metadata: Metadata = {
  title: "About TendorAI — The UK's AI Visibility Platform",
  description:
    'TendorAI is the structured data layer between UK regulated firms and AI assistants. Built by a founder with 15 years in marketing and a pivot from procurement to AI visibility.',
  alternates: { canonical: 'https://www.tendorai.com/about' },
  robots: { index: true, follow: true },
  openGraph: {
    title: "About TendorAI — The UK's AI Visibility Platform",
    description:
      'The structured data layer between UK regulated firms and AI assistants. Measure, diagnose and improve how AI describes your firm.',
    url: 'https://www.tendorai.com/about',
    siteName: 'TendorAI',
    locale: 'en_GB',
    type: 'website',
  },
};

const stats: { value: string; label: string }[] = [
  { value: FIRM_COUNT, label: 'UK regulated firms profiled' },
  { value: '4', label: 'Regulated verticals covered' },
  { value: 'Free', label: 'AI visibility score for every firm' },
  { value: 'Wales', label: 'Founded in Cwmbran' },
];

const verticals: { name: string; body: string }[] = [
  {
    name: 'Solicitors',
    body: 'When someone asks an AI assistant to recommend a solicitor for conveyancing, probate or family law, SRA-registered firms are often missed or misdescribed. We make sure your firm is read correctly.',
  },
  {
    name: 'Accountants',
    body: 'Accountancy practices are increasingly found through AI rather than search. We structure your data so assistants represent your services and credentials accurately — with ICAEW membership shown only where confirmed.',
  },
  {
    name: 'Mortgage advisers',
    body: 'FCA-regulated advisers compete on trust. We help AI assistants describe your regulated status and specialisms correctly when a potential client asks for a recommendation.',
  },
  {
    name: 'Estate agents',
    body: 'Buyers and sellers increasingly ask AI for local agents. We make your firm visible and accurate in those answers, drawing on verified, structured data.',
  },
];

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-14">
      <header className="mb-12">
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-gray-900">About TendorAI</h1>
        <p className="text-lg text-gray-500">The UK&apos;s AI visibility platform.</p>
      </header>

      {/* Mission */}
      <section className="mb-14">
        <h2 className="mb-3 text-xl font-semibold text-gray-900">Our mission</h2>
        <p className="mb-4 text-[15px] leading-relaxed text-gray-700">
          TendorAI is the structured data layer between UK regulated firms and AI assistants. When
          someone asks ChatGPT, Claude, Gemini or Perplexity to recommend a solicitor, accountant,
          mortgage adviser or estate agent, the assistant relies on clear, trustworthy information to
          answer. Most firms are invisible or misrepresented in that moment. We exist to fix that.
        </p>
        <p className="text-[15px] leading-relaxed text-gray-700">
          We build a profile for every firm in our verticals from public register data. You can claim
          it, verify your details, and add the information AI assistants look for. We then structure
          that data so AI platforms can read your firm accurately — no technical knowledge required.
        </p>
      </section>

      {/* Founder story */}
      <section className="mb-14">
        <h2 className="mb-3 text-xl font-semibold text-gray-900">Why we built TendorAI</h2>
        <p className="mb-4 text-[15px] leading-relaxed text-gray-700">
          TendorAI started as something else. After 15 years in marketing and the UK office-equipment
          industry, I set out to build a procurement platform to help firms find suppliers. But the
          deeper I got — and with five years spent watching how AI was changing the way people find and
          choose businesses — the clearer it became that the bigger problem wasn&apos;t procurement. It
          was visibility.
        </p>
        <p className="text-[15px] leading-relaxed text-gray-700">
          Firms were being asked about by AI assistants and coming up invisible, or worse, wrong. So I
          pivoted. TendorAI now does the thing that genuinely helps firms most: making sure AI describes
          them accurately when a potential client asks. Built solo, in Cwmbran, Wales — for UK regulated
          professional-services firms.
        </p>
      </section>

      {/* Stats */}
      <section className="mb-14">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-gray-200 bg-gray-200 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-white p-5 text-center">
              <div className="text-2xl font-bold text-indigo-600">{s.value}</div>
              <div className="mt-1 text-xs leading-snug text-gray-600">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How we measure */}
      <section className="mb-14">
        <h2 className="mb-3 text-xl font-semibold text-gray-900">How we measure visibility</h2>
        <p className="mb-4 text-[15px] leading-relaxed text-gray-700">
          Most of this space is built on guesswork and bold promises. We took a different approach. We
          run real buyer-style questions across leading AI assistants and record which firms actually
          get referenced in the answers.
        </p>
        <p className="text-[15px] leading-relaxed text-gray-700">
          Crucially, we only count mentions from assistants that genuinely browse and cite their
          sources — not answers generated from memory that can&apos;t be verified. That discipline means
          your score reflects what AI really says about your firm, not what we&apos;d like it to say. We
          never promise guaranteed rankings, because no AI platform allows them. What we promise is an
          honest measurement and a clear plan to improve it.
        </p>
      </section>

      {/* Who it's for */}
      <section className="mb-14">
        <h2 className="mb-5 text-xl font-semibold text-gray-900">Who it&apos;s for</h2>
        <div className="space-y-5">
          {verticals.map((v) => (
            <div key={v.name} className="rounded-lg border border-gray-200 p-5">
              <h3 className="mb-2 text-base font-semibold text-gray-900">{v.name}</h3>
              <p className="text-[15px] leading-relaxed text-gray-700">{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why different */}
      <section className="mb-14">
        <h2 className="mb-3 text-xl font-semibold text-gray-900">Why we&apos;re different</h2>
        <p className="text-[15px] leading-relaxed text-gray-700">
          Traditional SEO optimises your website for search engines; we focus on how AI assistants read
          and represent your firm. We&apos;re self-serve, not an agency — no long lock-in contracts and
          no four-figure monthly retainers. Pro is £299 per month, billed monthly, cancel any time. And
          every decision we make starts from measurement, not marketing claims.
        </p>
      </section>

      {/* CTA */}
      <section className="rounded-lg border border-indigo-100 bg-indigo-50/60 p-6 text-center">
        <h2 className="mb-2 text-lg font-semibold text-indigo-900">Check your AI visibility</h2>
        <p className="mb-4 text-[15px] leading-relaxed text-indigo-900/90">
          Run a free report and see how AI assistants currently describe your firm.
        </p>
        <Link
          href="/aeo-report"
          className="inline-block rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          Check AI visibility — free
        </Link>
      </section>
    </main>
  );
}
