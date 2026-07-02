import { Metadata } from 'next';
import Link from 'next/link';

const TITLE = 'Best AI Visibility Tools for UK Solicitors 2026 | TendorAI';
const DESCRIPTION =
  'Compare the five AI visibility tools UK solicitors use in 2026 — TendorAI, Rank4AI, MLT Digital, Peec AI, and Searchable. Honest assessments and UK pricing.';
const CANONICAL = 'https://www.tendorai.com/best-ai-visibility-tools-uk-solicitors';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: CANONICAL },
  robots: { index: true, follow: true },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: 'article',
    url: CANONICAL,
    siteName: 'TendorAI',
    images: [{ url: '/logo.png', width: 873, height: 873 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
};

interface Tool {
  name: string;
  positioning: string;
  whatItDoes: string;
  bestForLimitation: string;
  pricing: string;
  bestFor: string;
}

const tools: Tool[] = [
  {
    name: 'TendorAI',
    positioning: 'UK AI visibility platform for regulated professional services firms.',
    whatItDoes:
      'TendorAI indexes 63,406 UK firms from the SRA Solicitors Register, ICAEW Chartered Accountant directory, FCA Financial Services Register, Propertymark, and Companies House. The platform installs AI-readable structured data on a firm’s own website, publishes three professionally-written articles per week, audits the UK directories AI assistants cross-reference and flags where the firm’s details don’t match, and monitors six AI platforms daily — ChatGPT, Perplexity, Claude, Gemini, Grok, and Google AI Overviews — through an autonomous six-agent fleet.',
    bestForLimitation:
      'Built and operated in South Wales. Direct contact with the founding team — no agency layer, no account managers, no offshored support. The £299/month price reflects the actual delivery cost rather than loss-leader pricing.',
    pricing: '£299/month, all in. Free tier available.',
    bestFor:
      'SRA-regulated solicitors, ICAEW accountants, FCA mortgage advisers, and Propertymark estate agents who want schema installation and content production included, not added on.',
  },
  {
    name: 'Rank4AI',
    positioning: 'US-built AI search visibility checker with solicitor-specific positioning.',
    whatItDoes:
      'Rank4AI is a monitoring-focused AI visibility tool that surfaces how a firm appears across major AI assistants and provides a visibility score. The product positions itself toward solicitors and includes solicitor-targeted content on its website. Pricing and feature depth vary by tier, with most plans focused on monitoring and reporting rather than fixing or installing structured data on the user’s website.',
    bestForLimitation:
      'The tool fits firms that have already built strong AI-readable content and want to track results, rather than firms starting from zero and needing schema, content, and listings handled.',
    pricing: 'Tier-based, US dollar pricing.',
    bestFor: 'Firms with existing strong content and structured data that need a tracking dashboard.',
  },
  {
    name: 'MLT Digital',
    positioning: 'UK legal marketing agency offering Generative Engine Optimisation as a service.',
    whatItDoes:
      'MLT Digital is an agency, not a software platform. They deliver GEO work for UK law firms as a managed service — including schema implementation, conversational query mapping, FAQ content development, and tracking of AI referrals. The model is hands-on consulting with a dedicated account team, billed monthly under typical agency arrangements.',
    bestForLimitation:
      'This is the right fit for firms that want a partner to do the work end-to-end and have budget for £1,500–£8,000/month agency engagements with longer onboarding cycles.',
    pricing: 'Agency pricing — typically £1,500–£8,000/month per UK GEO market rates.',
    bestFor:
      'Larger firms or specialist practices that want a dedicated agency relationship rather than a software platform.',
  },
  {
    name: 'Peec AI',
    positioning: 'European AI brand monitoring platform.',
    whatItDoes:
      'Peec AI is a brand monitoring tool focused on how brands appear in AI assistant responses. The product tracks brand mentions, sentiment, and share of voice across major AI platforms. It is not legal-specific and does not integrate UK regulatory registers like the SRA.',
    bestForLimitation:
      'Strong fit for firms with existing brand recognition that want to monitor and benchmark AI mentions alongside other channels. Less useful for solicitor firms starting from low or zero AI visibility, where the bottleneck is structured data and content rather than tracking.',
    pricing: 'Tier-based, monitoring-focused.',
    bestFor: 'Established brands tracking AI share of voice across multiple categories.',
  },
  {
    name: 'Searchable',
    positioning: 'AI search analytics platform with strong UK coverage.',
    whatItDoes:
      'Searchable provides AI visibility analytics including share of voice, source domain tracking, and prompt-level breakdowns across major AI assistants. The tool is widely used in the UK by agencies and in-house teams to benchmark AI visibility competitively. It is analytics-first rather than fix-first.',
    bestForLimitation:
      'Useful as a tracking layer alongside another tool that handles schema, content, and listings — Searchable measures, but does not install or publish.',
    pricing: 'Tier-based.',
    bestFor:
      'Teams that need an analytics layer to measure AI visibility alongside an execution-focused tool.',
  },
];

interface ComparisonRow {
  feature: string;
  values: [string, string, string, string, string]; // TendorAI, Rank4AI, MLT, Peec, Searchable
}

const comparisonRows: ComparisonRow[] = [
  { feature: 'Type', values: ['Software platform', 'Software tool', 'Agency service', 'Software tool', 'Analytics platform'] },
  { feature: 'Built for', values: ['UK regulated firms', 'Solicitors (US-built)', 'UK law firms', 'Global brands', 'UK + global'] },
  { feature: 'SRA register integration', values: ['Yes', 'No', 'Manual', 'No', 'No'] },
  { feature: 'Schema installation included', values: ['Yes', 'No', 'Yes (manual)', 'No', 'No'] },
  { feature: 'Content production included', values: ['Yes (3/week)', 'No', 'Add-on', 'No', 'No'] },
  { feature: 'AI platforms tracked', values: ['6', 'Varies', 'Varies', 'Major platforms', 'Major platforms'] },
  {
    feature: 'Six-platform coverage (incl. Google AI Overviews + Grok)',
    values: ['Yes', 'Partial', 'Partial', 'Partial', 'Partial'],
  },
  { feature: 'Monthly price', values: ['£299', 'Tier-based', '£1,500–£8,000', 'Tier-based', 'Tier-based'] },
  { feature: 'Contract length', values: ['Month-to-month', 'Varies', 'Typically 12-month', 'Varies', 'Varies'] },
  {
    feature: 'UK-specific data sources',
    values: ['Yes — SRA, ICAEW, FCA, Propertymark, Companies House', 'No', 'Yes (manual)', 'No', 'Partial'],
  },
];

const faqs: Array<{ q: string; a: string }> = [
  {
    q: 'What is AI visibility for UK solicitors?',
    a: 'AI visibility is whether your law firm appears when someone asks an AI assistant — ChatGPT, Perplexity, Claude, Gemini, Grok, or Google AI Overviews — to recommend a solicitor. It’s the difference between being named in an AI-generated answer and being skipped entirely. UK clients increasingly ask AI assistants for solicitor recommendations rather than browsing Google results, so a firm that isn’t visible in AI answers loses enquiries to firms that are. AI visibility depends on structured data, regulatory verification, and consistent listings across trusted UK sources.',
  },
  {
    q: 'Why does SRA register integration matter?',
    a: 'For regulated legal services, AI assistants treat the Solicitors Regulation Authority register as the ground truth for verifying a firm. A solicitor whose SRA number is visible on their website and consistent with their register entry is significantly more likely to be recommended than one where that information is missing or mismatched. Tools that don’t integrate SRA data leave this verification step to chance, which makes AI recommendations less reliable for the firm.',
  },
  {
    q: 'Is AI visibility the same as SEO?',
    a: 'No. SEO optimises a website to rank on Google’s search results pages, relying on backlinks, keywords, and on-page content. AI visibility optimises structured data and content for AI recommendations. When someone asks ChatGPT ‘find me a conveyancing solicitor in Cardiff’, AI doesn’t return a list of links — it names specific firms. AI visibility determines whether your firm is one of them. The two work together but use different signals and require different optimisation.',
  },
  {
    q: 'How long does AI visibility take to work?',
    a: 'AI engines typically need 3 to 6 weeks to incorporate new structured data and content into their training and retrieval systems. Schema installation effects appear faster — usually within two weeks of deployment. Content publishing builds visibility over 8 to 12 weeks. Monitor-only tools show no improvement because they don’t install fixes. Tools that combine schema, content, and listings (TendorAI, MLT Digital) typically show measurable improvement within 6 to 8 weeks for previously-invisible firms.',
  },
  {
    q: 'What’s the cheapest way to start?',
    a: 'Run a free AI visibility report to see where your firm currently appears across the six major AI platforms. TendorAI, Rank4AI, and Searchable all offer free entry-level diagnostics. After the diagnostic, the cheapest fix-inclusive option is TendorAI Pro at £299/month, which bundles schema installation, content production, listings, and tracking. Monitor-only tools are cheaper but do not change what AI assistants say about your firm.',
  },
];

export default function BestAiVisibilityToolsUkSolicitorsPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'The Best AI Visibility Tools for UK Solicitors in 2026',
    description:
      'Honest comparison of TendorAI, Rank4AI, MLT Digital, Peec AI, and Searchable for UK solicitors. SRA-specific features, six-platform coverage, and UK pricing.',
    datePublished: '2026-05-18',
    dateModified: '2026-05-18',
    author: { '@type': 'Organization', name: 'TendorAI Ltd', url: 'https://www.tendorai.com' },
    publisher: {
      '@type': 'Organization',
      name: 'TendorAI Ltd',
      url: 'https://www.tendorai.com',
      logo: { '@type': 'ImageObject', url: 'https://www.tendorai.com/logo.png' },
    },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.tendorai.com' },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Best AI Visibility Tools for UK Solicitors',
        item: CANONICAL,
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <main className="min-h-screen bg-white">
        {/* Hero — answer-first */}
        <section className="bg-gradient-to-br from-purple-700 via-purple-600 to-indigo-600 text-white py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              The Best AI Visibility Tools for UK Solicitors in 2026
            </h1>
            <p className="text-base md:text-lg text-purple-100 leading-relaxed">
              UK solicitors increasingly ask which AI visibility tool actually fits an SRA-regulated
              practice. Most tools were built for US tech companies, generic SEO use cases, or global
              brand monitoring. Five tools currently serve the UK legal market with meaningful coverage:
              TendorAI, Rank4AI, MLT Digital, Peec AI, and Searchable. This guide compares them honestly
              across the criteria solicitors actually need — SRA register integration, six-platform AI
              coverage, structured data installation, pricing, and UK regulatory awareness. The short
              answer for most SRA-regulated firms: TendorAI is the platform built specifically for UK
              regulated professional services and includes schema installation in the £299/month price.
            </p>
          </div>
        </section>

        {/* What to look for */}
        <section className="py-16 md:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              What to Look For in an AI Visibility Tool for a UK Law Firm
            </h2>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              AI visibility for a UK solicitor firm is not the same problem as AI visibility for a US
              SaaS company. Three factors make legal AI visibility distinct. First, regulatory
              verification — AI assistants treat the SRA register as ground truth, so any tool that
              doesn’t integrate SRA data is fighting with one arm tied behind its back. Second, schema
              specificity — legal services schema (LegalService, AttorneyService) is not the same as
              generic LocalBusiness markup, and most tools install the wrong one. Third, six-platform
              coverage — UK clients ask Google AI Overviews and Gemini far more often than US clients ask
              Claude or Perplexity, so a tool that only tracks two platforms misses the British market
              entirely.
            </p>
          </div>
        </section>

        {/* Tool-by-tool */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10">Tool-by-Tool Comparison</h2>
            <div className="space-y-10">
              {tools.map((tool) => (
                <article
                  key={tool.name}
                  className={`rounded-xl border p-6 md:p-8 ${
                    tool.name === 'TendorAI'
                      ? 'border-purple-200 bg-purple-50'
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">{tool.name}</h3>
                  <p className="text-sm italic text-purple-700 mb-4">{tool.positioning}</p>
                  <p className="text-base text-gray-700 leading-relaxed mb-3">{tool.whatItDoes}</p>
                  <p className="text-base text-gray-700 leading-relaxed mb-4">{tool.bestForLimitation}</p>
                  <p className="text-sm text-gray-900">
                    <span className="font-semibold">Pricing:</span> {tool.pricing}
                  </p>
                  <p className="text-sm text-gray-900 mt-1">
                    <span className="font-semibold">Best for:</span> {tool.bestFor}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Side-by-side table */}
        <section className="py-16 md:py-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Side-by-Side Comparison Table</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 pr-4 font-semibold text-gray-900">Feature</th>
                    <th className="text-left py-3 px-3 font-semibold text-purple-700">TendorAI</th>
                    <th className="text-left py-3 px-3 font-semibold text-gray-900">Rank4AI</th>
                    <th className="text-left py-3 px-3 font-semibold text-gray-900">MLT Digital</th>
                    <th className="text-left py-3 px-3 font-semibold text-gray-900">Peec AI</th>
                    <th className="text-left py-3 px-3 font-semibold text-gray-900">Searchable</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row) => (
                    <tr key={row.feature} className="border-b border-gray-100 align-top">
                      <td className="py-3 pr-4 font-medium text-gray-900">{row.feature}</td>
                      {row.values.map((v, i) => (
                        <td
                          key={i}
                          className={`py-3 px-3 ${i === 0 ? 'text-purple-700 font-semibold' : 'text-gray-700'}`}
                        >
                          {v}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Which tool is right */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
              Which Tool Is Right for Your Firm?
            </h2>
            <div className="space-y-6 text-base text-gray-700 leading-relaxed">
              <p>
                If you are an SRA-regulated solicitor firm in England or Wales, an ICAEW-registered
                accountant, an FCA-regulated mortgage adviser, or a Propertymark-registered estate agent,
                and you want schema installation, weekly content production, directory auditing, and
                six-platform tracking included in a single £299/month price, TendorAI is the platform
                built specifically for you. The platform indexes 63,406 UK firms from official registers
                and operates a six-agent autonomous fleet on every Pro account.
              </p>
              <p>
                If your firm has the budget for a managed service relationship at £1,500–£8,000/month and
                prefers a dedicated agency team to deliver GEO work end-to-end, MLT Digital is the
                strongest UK legal-specific option. Agencies suit firms with larger budgets, longer
                planning horizons, and a preference for human-led project management over software
                automation.
              </p>
              <p>
                If your firm already has strong AI-readable content and structured data in place and the
                remaining job is tracking and benchmarking, Rank4AI, Peec AI, or Searchable each provide
                analytics layers that surface AI visibility data. These tools are most useful as
                measurement complements to an execution tool — they show you what’s happening, not what
                to fix.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <details key={i} className="group bg-white border border-gray-200 rounded-lg" open={i === 0}>
                  <summary className="flex items-center justify-between cursor-pointer p-5 text-left">
                    <h3 className="font-medium text-gray-900 pr-4">{faq.q}</h3>
                    <svg
                      className="w-5 h-5 text-gray-400 shrink-0 transition-transform group-open:rotate-180"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-5 pb-5 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* How we wrote this */}
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">How We Wrote This Comparison</h2>
            <p className="text-base text-gray-700 leading-relaxed">
              This comparison was written by the TendorAI team based on publicly available product
              information, pricing pages, and UK legal market positioning as of May 2026. We’ve included
              TendorAI alongside our competitors because solicitors comparing AI visibility tools deserve
              to see the full UK market in one place, not just our own pitch. Where competitor positioning
              is unclear or pricing varies by tier, we’ve stated that openly rather than guessing.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-br from-purple-700 via-purple-600 to-indigo-600 text-white py-16 md:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-2xl md:text-4xl font-bold mb-4">Check Your Firm’s AI Visibility — Free</h2>
            <p className="text-purple-100 text-lg mb-8 max-w-xl mx-auto">
              See exactly where your solicitor firm appears across ChatGPT, Perplexity, Claude, Gemini,
              Grok, and Google AI Overviews. Takes 60 seconds. No card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/ai-visibility-report"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold bg-white text-purple-700 hover:bg-purple-50 transition-all shadow-lg text-lg"
              >
                Run Free Report
              </Link>
              <Link
                href="/ai-visibility-platform"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold border-2 border-white/30 text-white hover:bg-white/10 transition-all text-lg"
              >
                See the TendorAI Platform
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
