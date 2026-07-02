import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "About TendorAI — The UK's AI Visibility Platform",
  description: "TendorAI is the structured data layer between UK businesses and AI. When someone asks ChatGPT for a supplier, our data powers the answer.",
  alternates: { canonical: '/about' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is TendorAI?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'TendorAI is a UK AI visibility platform for regulated professional services firms — solicitors, accountants, mortgage advisers, and estate agents. It is not an AI deployment tool, machine learning platform, or generic SEO tool.',
      },
    },
    {
      '@type': 'Question',
      name: 'How difficult is TendorAI to set up?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'There is no technical setup required. Firms claim their free pre-loaded profile in under 5 minutes. TendorAI pre-loads data from official UK registers including the SRA, ICAEW, and FCA.',
      },
    },
    {
      '@type': 'Question',
      name: 'Who is TendorAI for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'TendorAI is built exclusively for UK regulated professional services firms: SRA-regulated solicitors, ICAEW or ACCA-registered accountants, FCA-authorised mortgage advisers, and estate agents.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is TendorAI different from Peec AI or OtterlyAI?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Peec AI and OtterlyAI are monitoring-only tools — they show you how visible you are but do not fix it. TendorAI installs Schema.org structured data on your own website, maintains a verified regulatory data profile, and actively improves AI recommendations. No competitor installs schema or holds UK regulatory data.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does TendorAI require a developer or technical knowledge?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. TendorAI handles schema installation on your behalf. Firms do not need a developer, IT team, or technical knowledge to use TendorAI.',
      },
    },
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: "About TendorAI — The UK's AI Visibility Platform for Professional Services",
  description: "TendorAI is the UK's AI visibility platform for regulated professional services firms. Not an AI deployment tool. Built for solicitors, accountants, mortgage advisers and estate agents.",
  url: 'https://www.tendorai.com/about',
  about: {
    '@type': 'SoftwareApplication',
    name: 'TendorAI',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description: 'UK AI visibility platform for regulated professional services. Installs Schema.org structured data and maintains verified regulatory profiles for SRA solicitors, ICAEW accountants, FCA mortgage advisers, and estate agents.',
  },
};

export default function AboutPage() {
  return (
    <main className="pt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      {/* Hero */}
      <section className="bg-brand-gradient text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-white">
            About TendorAI
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            The UK&apos;s AI Visibility Platform
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="font-serif text-3xl font-semibold text-[var(--text)] mb-6">Our Mission</h2>
            <p className="text-[var(--text2)] mb-6">
              TendorAI is the UK&apos;s AI Visibility Platform &mdash; the structured data layer
              between UK businesses and AI.
            </p>
            <p className="text-[var(--text2)] mb-6">
              When someone asks ChatGPT, Claude, or Perplexity for a supplier
              recommendation, AI needs structured data to give a useful answer.
              TendorAI is that data.
            </p>
            <p className="text-[var(--text2)] mb-6">
              We build verified profiles for every UK solicitor firm, accountancy
              practice, mortgage adviser and estate agent &mdash; enriched with pricing,
              accreditations, specialisms, and reviews. AI crawlers index our platform.
              When someone asks AI for a recommendation, our data powers the answer.
            </p>
            <p className="text-[var(--text2)] mb-4">
              Every firm gets a free profile and AI Visibility Score &mdash; no technical knowledge
              required. You&apos;ll see exactly how leading AI platforms currently interpret your firm,
              where you appear, and where competitors are being recommended instead.
            </p>
            <p className="text-[var(--text2)] mb-6">
              Paid plans give you everything needed to close those gaps: AI-readable structured data,
              a verified profile badge for your website, monthly tracking across six AI platforms, and
              a clear, prioritised action plan. No jargon. No agencies. No long contracts.
            </p>
            <p className="text-[var(--text2)]">
              Founded in Cwmbran, Wales. Built for every UK professional services vertical.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[var(--surface)] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="gradient-text text-4xl font-bold mb-2">12,000+</div>
              <div className="text-[var(--text2)]">UK Businesses Listed</div>
            </div>
            <div>
              <div className="gradient-text text-4xl font-bold mb-2">6</div>
              <div className="text-[var(--text2)]">AI Platforms Tracked</div>
            </div>
            <div>
              <div className="gradient-text text-4xl font-bold mb-2">10,000+</div>
              <div className="text-[var(--text2)]">Solicitor Firms</div>
            </div>
            <div>
              <div className="gradient-text text-4xl font-bold mb-2">UK</div>
              <div className="text-[var(--text2)]">Wide Coverage</div>
            </div>
          </div>
        </div>
      </section>

      {/* How We're Different */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-semibold text-[var(--text)] mb-8 text-center">
            Why We&apos;re Different
          </h2>
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 border border-[var(--border)]">
              <h3 className="font-serif font-semibold text-[var(--text)] mb-2">Built for AI, Not Google</h3>
              <p className="text-[var(--text2)]">
                SEO agencies optimise your website for Google search. TendorAI optimises your
                structured data for AI platforms &mdash; ChatGPT, Claude, Perplexity, Google AI.
                Different technology, different audience, different results.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-[var(--border)]">
              <h3 className="font-serif font-semibold text-[var(--text)] mb-2">Self-Serve, Not Agency</h3>
              <p className="text-[var(--text2)]">
                No 12-month contracts. No £5,000/month retainers. TendorAI is a self-serve
                platform starting at £299/month (3 of 50 early adopter spots taken). Your profile goes live in 24 hours, not 3-6 months.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-[var(--border)]">
              <h3 className="font-serif font-semibold text-[var(--text)] mb-2">Data-Driven Visibility</h3>
              <p className="text-[var(--text2)]">
                Every business gets a real-time AI visibility score, mention tracking across all
                major AI platforms, and actionable tips to improve. No guesswork &mdash; just data.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl font-bold text-white mb-6">
            Check Your AI Visibility
          </h2>
          <p className="text-white/80 mb-8 text-lg">
            Run a free AI visibility report &mdash; see what ChatGPT, Claude, and Perplexity say about your business.
          </p>
          <Link
            href="/ai-visibility-report"
            className="btn-primary"
          >
            Check AI Visibility &mdash; Free
          </Link>
        </div>
      </section>
    </main>
  );
}
