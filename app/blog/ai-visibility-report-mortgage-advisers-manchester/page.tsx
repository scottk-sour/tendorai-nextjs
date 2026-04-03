import { Metadata } from 'next';
import Link from 'next/link';

const TITLE = 'AI Visibility Report: Manchester Mortgage Advisers 2026 — TendorAI Research';
const DESCRIPTION =
  'TendorAI tracks 68 FCA-registered mortgage advisers in Manchester. Nearly half have no website. Here\'s the full AI visibility picture.';
const CANONICAL = 'https://www.tendorai.com/blog/ai-visibility-report-mortgage-advisers-manchester';
const PUBLISHED = '2026-04-03';

export const metadata: Metadata = {
  title: `${TITLE} | TendorAI`,
  description: DESCRIPTION,
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: 'article',
    publishedTime: PUBLISHED,
    authors: ['TendorAI'],
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

const nationalCityData = [
  { city: 'London', firms: '312', noWebsite: '148', rate: '47%' },
  { city: 'Manchester', firms: '68', noWebsite: '33', rate: '49%' },
  { city: 'Birmingham', firms: '54', noWebsite: '28', rate: '52%' },
  { city: 'Leeds', firms: '41', noWebsite: '18', rate: '44%' },
  { city: 'Bristol', firms: '37', noWebsite: '15', rate: '41%' },
  { city: 'Liverpool', firms: '29', noWebsite: '16', rate: '55%' },
  { city: 'Newcastle', firms: '24', noWebsite: '11', rate: '46%' },
];

const verticalData = [
  { vertical: 'Solicitors', firms: '8,625', noWebsite: '1,458', rate: '17%' },
  { vertical: 'Accountants', firms: '1,380', noWebsite: '21', rate: '2%' },
  { vertical: 'Mortgage Advisers', firms: '1,100', noWebsite: '532', rate: '48%' },
  { vertical: 'Office Equipment', firms: '1,048', noWebsite: '602', rate: '57%' },
  { vertical: 'Financial Advisers', firms: '525', noWebsite: '110', rate: '21%' },
];

const faqs = [
  {
    q: 'Does my Manchester mortgage advice firm appear when someone asks AI for a recommendation?',
    a: 'If your firm has no website, no. If your firm has a website but no structured data, probably not. TendorAI offers a free AI Visibility Report that scans ChatGPT, Perplexity, and Gemini to show you exactly where you stand.',
  },
  {
    q: 'How many Manchester mortgage advisers are AI-visible?',
    a: 'TendorAI tracks 68 FCA-registered mortgage advisers in Manchester. 33 have no website. Of the remaining 35, the majority have no structured schema data — meaning even firms with websites are likely invisible to AI recommendation engines.',
  },
  {
    q: 'What is the fastest way for a mortgage adviser to become AI-visible?',
    a: "Three steps: structured schema markup on your website, a verified profile in an AI-indexed directory, and at least one authoritative third-party citation (review platform or regulatory listing). TendorAI\u2019s Pro plan delivers all three.",
  },
  {
    q: 'Is AI visibility different from mortgage lead generation?',
    a: 'Yes. Traditional lead generation involves paying comparison sites or networks for referrals. AI visibility means appearing in organic AI recommendations when someone asks ChatGPT or Perplexity to recommend a mortgage adviser. It is free organic traffic, not paid leads.',
  },
  {
    q: 'Will AI recommendations replace Google for mortgage queries?',
    a: 'For high-intent queries ("find me a mortgage adviser in Manchester"), AI is already answering directly without returning links. According to industry data, AI Overviews now appear in over 60% of searches. Firms not visible in AI responses are missing an increasing share of inbound enquiries.',
  },
  {
    q: 'How does TendorAI know which mortgage advisers are AI-visible?',
    a: "TendorAI\u2019s platform runs structured scans across ChatGPT, Perplexity, and Gemini using city- and specialism-specific prompts. Results are logged, scored, and reported back to the firm via the dashboard.",
  },
];

function FAQSection() {
  return (
    <div className="space-y-4">
      {faqs.map((faq, i) => (
        <details
          key={i}
          className="group bg-white border border-gray-200 rounded-lg"
        >
          <summary className="flex items-center justify-between cursor-pointer p-5 text-left">
            <h3 className="font-medium text-gray-900 pr-4">{faq.q}</h3>
            <svg
              className="w-5 h-5 text-gray-400 shrink-0 transition-transform group-open:rotate-180"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </summary>
          <div className="px-5 pb-5 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
            {faq.a}
          </div>
        </details>
      ))}
    </div>
  );
}

export default function AIVisibilityReportManchesterMortgageAdvisers() {
  const today = new Date().toISOString().split('T')[0];

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': CANONICAL,
    headline: TITLE,
    description: DESCRIPTION,
    author: {
      '@type': 'Organization',
      name: 'TendorAI',
      url: 'https://www.tendorai.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'TendorAI',
      url: 'https://www.tendorai.com',
      logo: { '@type': 'ImageObject', url: 'https://www.tendorai.com/logo.png', width: 873, height: 873 },
    },
    datePublished: PUBLISHED,
    dateModified: today,
    url: CANONICAL,
    mainEntityOfPage: { '@type': 'WebPage', '@id': CANONICAL },
    image: { '@type': 'ImageObject', url: 'https://www.tendorai.com/logo.png', width: 873, height: 873 },
    articleSection: 'Research',
    keywords: [
      'AI visibility mortgage advisers Manchester',
      'Manchester mortgage adviser AI',
      'Manchester mortgage broker AI recommendations',
      'ChatGPT mortgage adviser Manchester',
      'AI visibility report Manchester',
      'mortgage adviser AI discovery Manchester',
    ],
    wordCount: 2400,
    inLanguage: 'en-GB',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.tendorai.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.tendorai.com/blog' },
      { '@type': 'ListItem', position: 3, name: TITLE, item: CANONICAL },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-gradient-to-br from-[#1B4F72] via-[#1a3d5c] to-[#2d1b4e] text-white py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <nav className="text-sm mb-6 text-blue-200">
              <Link href="/" className="hover:text-white">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/blog" className="hover:text-white">Blog</Link>
              <span className="mx-2">/</span>
              <span className="text-white">Manchester Mortgage Advisers AI Visibility</span>
            </nav>

            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 text-sm font-medium rounded-full bg-white/20 text-white">
                AEO Research
              </span>
              <span className="text-blue-200">10 min read</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              AI Visibility Report: Manchester Mortgage Advisers 2026
            </h1>

            <p className="text-lg text-blue-100 leading-relaxed max-w-3xl">
              TendorAI tracks 68 FCA-registered mortgage advisers in Manchester. <strong>49% have no website</strong> &mdash; making them completely invisible to ChatGPT, Gemini, and Perplexity. Here&apos;s the full AI visibility picture.
            </p>

            <div className="mt-6 flex items-center gap-4 text-sm text-blue-200">
              <span>By TendorAI</span>
              <span>&middot;</span>
              <span>Published {new Date(PUBLISHED).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            </div>
          </div>
        </section>

        {/* Key stat callouts */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 -mt-6">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 flex flex-col sm:flex-row items-center gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#1B4F72]">68</div>
              <div className="text-sm text-gray-500">FCA firms in Manchester</div>
            </div>
            <div className="h-px sm:h-12 sm:w-px bg-gray-200 w-full sm:w-auto" />
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600">33</div>
              <div className="text-sm text-gray-500">with no website</div>
            </div>
            <div className="h-px sm:h-12 sm:w-px bg-gray-200 w-full sm:w-auto" />
            <div className="text-center">
              <div className="text-4xl font-bold text-amber-600">49%</div>
              <div className="text-sm text-gray-500">completely invisible</div>
            </div>
          </div>
        </section>

        {/* Article content */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16">
          {/* Opening */}
          <section className="mb-12">
            <p className="text-lg text-gray-600 leading-relaxed mb-4">
              <strong className="text-gray-900">Manchester has 68 FCA-registered mortgage advisers. 33 of them &mdash; 49% &mdash; have no website.</strong> Every single one of those firms is completely undetectable by ChatGPT, Gemini, and Perplexity.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              According to TendorAI&apos;s database of 1,100 FCA-registered mortgage advisers across England and Wales, this is not unique to Manchester. But the data reveals a clear pattern: mortgage advice firms without structured digital infrastructure are being excluded from AI recommendations entirely.
            </p>
          </section>

          {/* Module 1: The Invisibility Problem */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">The Invisibility Problem: Manchester in Context</h2>

            <p className="text-gray-600 leading-relaxed mb-4">
              Of Manchester&apos;s 68 FCA-registered mortgage advisers:
            </p>

            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                <span className="text-gray-700"><strong>35 firms have a website</strong> &mdash; the minimum requirement to be detectable by AI</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                <span className="text-gray-700"><strong>33 firms have no website at all</strong> &mdash; 49% of all Manchester mortgage advisers</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0" />
                <span className="text-gray-700">Nationally, <strong>48% of FCA-registered mortgage advisers have no web presence</strong></span>
              </li>
            </ul>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-[#1B4F72] text-white">
                    <th className="p-3 text-left font-semibold">City</th>
                    <th className="p-3 text-left font-semibold">FCA-Registered Firms</th>
                    <th className="p-3 text-left font-semibold">No Website</th>
                    <th className="p-3 text-left font-semibold">Invisibility Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {nationalCityData.map((row, i) => (
                    <tr key={i} className={`${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'} ${row.city === 'Manchester' ? 'ring-2 ring-[#1B4F72] ring-inset' : ''}`}>
                      <td className="p-3 text-gray-900 font-medium">{row.city === 'Manchester' ? <strong>{row.city}</strong> : row.city}</td>
                      <td className="p-3 text-gray-700">{row.firms}</td>
                      <td className="p-3 text-red-600 font-medium">{row.noWebsite}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                          parseInt(row.rate) >= 50 ? 'bg-red-100 text-red-700' :
                          parseInt(row.rate) >= 45 ? 'bg-amber-100 text-amber-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {row.rate}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-gray-500 text-sm italic">
              Source: TendorAI database of FCA-registered mortgage advisers, March 2026
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mt-6">
              <p className="text-sm text-blue-900">
                Having a website is the floor, not the ceiling. A website with no structured data is only marginally better than no website at all &mdash; AI engines cannot extract reliable information from unstructured content.
              </p>
            </div>
          </section>

          {/* Module 2: How AI Selects */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">How AI Selects Which Manchester Mortgage Adviser to Recommend</h2>

            <p className="text-gray-600 leading-relaxed mb-6">
              When a potential client asks ChatGPT &ldquo;best mortgage adviser Manchester 2026,&rdquo; the AI does not browse a list of firms. It draws on indexed, structured data it has already processed.
            </p>

            <p className="text-gray-700 font-semibold mb-4">The firms it recommends share three characteristics:</p>

            <div className="grid sm:grid-cols-3 gap-4 mb-6">
              {[
                { num: '1', title: 'Crawlable web presence', desc: 'A website that AI engines can access and index' },
                { num: '2', title: 'Structured data', desc: 'Schema markup declaring services, FCA authorisation, and location explicitly' },
                { num: '3', title: 'Third-party citations', desc: 'Directories, review platforms, and the FCA register that validate the firm' },
              ].map((item) => (
                <div key={item.num} className="bg-white border border-gray-200 rounded-xl p-5">
                  <div className="w-8 h-8 rounded-full bg-[#1B4F72] flex items-center justify-center text-white font-bold text-sm mb-3">
                    {item.num}
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm mb-1">{item.title}</h3>
                  <p className="text-xs text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="bg-gray-900 text-white rounded-xl p-6">
              <p className="text-sm leading-relaxed text-gray-200">
                Firms without all three are skipped &mdash; regardless of how many lender panels they sit on, how experienced their CeMAP-qualified advisers are, or whether they offer whole-of-market advice. <strong className="text-white">This is the structural problem TendorAI was built to solve.</strong>
              </p>
            </div>
          </section>

          {/* Module 3: Scale of Opportunity */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">The Scale of the Opportunity (and the Risk)</h2>

            <p className="text-gray-600 leading-relaxed mb-6">
              TendorAI&apos;s data across all regulated professions reveals a pattern:
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-[#1B4F72] text-white">
                    <th className="p-3 text-left font-semibold">Vertical</th>
                    <th className="p-3 text-left font-semibold">Firms Tracked</th>
                    <th className="p-3 text-left font-semibold">No Website</th>
                    <th className="p-3 text-left font-semibold">Invisibility Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {verticalData.map((row, i) => (
                    <tr key={i} className={`${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'} ${row.vertical === 'Mortgage Advisers' ? 'ring-2 ring-[#1B4F72] ring-inset' : ''}`}>
                      <td className="p-3 text-gray-900 font-medium">{row.vertical === 'Mortgage Advisers' ? <strong>{row.vertical}</strong> : row.vertical}</td>
                      <td className="p-3 text-gray-700">{row.firms}</td>
                      <td className="p-3 text-red-600 font-medium">{row.noWebsite}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                          parseInt(row.rate) >= 40 ? 'bg-red-100 text-red-700' :
                          parseInt(row.rate) >= 15 ? 'bg-amber-100 text-amber-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {row.rate}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-gray-500 text-sm italic mb-6">
              Source: TendorAI database, March 2026
            </p>

            <p className="text-gray-600 leading-relaxed mb-4">
              Mortgage advisers have the second-highest invisibility rate of any regulated profession TendorAI tracks. Nearly half of all FCA-registered mortgage advice firms nationally have no website at all. Of the 35 Manchester mortgage advisers with websites, the vast majority have no structured schema data, no AI-optimised content, and no mechanism for AI engines to verify their FCA authorisation or lender panel memberships.
            </p>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p className="text-sm text-amber-800">
                  <strong className="text-amber-900">A whole-of-market mortgage adviser with no website is invisible to every AI platform.</strong> It does not matter how many lender panels you sit on or how many years of CeMAP-qualified experience your team holds. If the data is not structured, AI cannot find you.
                </p>
              </div>
            </div>
          </section>

          {/* Module 4: What AI-Cited Firms Do Differently */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">What AI-Cited Manchester Mortgage Advisers Are Doing Differently</h2>

            <p className="text-gray-600 leading-relaxed mb-6">
              TendorAI&apos;s analysis of mortgage advisers across Greater Manchester that appear consistently in AI recommendation results identifies four common factors:
            </p>

            <div className="space-y-4">
              {[
                {
                  num: 1,
                  title: 'Declared FCA credentials',
                  desc: 'FCA number, permissions (mortgage advising, mortgage arranging, insurance mediation), CeMAP qualifications, and appointed representative status are explicitly declared in structured data — not buried in a footer or compliance page.',
                },
                {
                  num: 2,
                  title: 'Location specificity',
                  desc: 'City, postcode, and coverage area are machine-readable. "We serve clients across Greater Manchester" is useless to an AI engine. Structured address data with postcode and locality is not.',
                },
                {
                  num: 3,
                  title: 'Service clarity',
                  desc: 'Specialisms are listed as structured entities, not paragraph text. An AI cannot reliably extract "we specialise in first-time buyer mortgages and buy-to-let" from a homepage. Schema-declared services — residential mortgages, equity release, protection, commercial finance — are unambiguous.',
                },
                {
                  num: 4,
                  title: 'Third-party citation',
                  desc: 'The firm appears in authoritative directories that AI engines treat as trust signals. The FCA Financial Services Register, Google Business Profile, Trustpilot, and structured directories like TendorAI provide the external validation that moves a firm from "possible result" to "confident recommendation."',
                },
              ].map((item) => (
                <div key={item.num} className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#1B4F72] flex items-center justify-center text-white font-bold">
                      {item.num}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600 leading-relaxed text-sm">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Module 5: What Changes in 2026 */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">What This Means for Manchester Mortgage Advisers in 2026</h2>

            <p className="text-gray-600 leading-relaxed mb-6">
              Three shifts are already underway that will accelerate AI&apos;s role in how clients find mortgage advisers in Manchester:
            </p>

            <div className="space-y-6">
              <div className="border-l-4 border-[#1B4F72] pl-5">
                <h3 className="font-bold text-gray-900 mb-2">From keywords to entities</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  AI engines rank firms based on declared identity &mdash; who they are, what FCA permissions they hold, what lender panels they sit on, what areas they cover &mdash; not keyword density. FCA register verification is emerging as a primary trust signal for mortgage advice firms.
                </p>
              </div>

              <div className="border-l-4 border-[#1B4F72] pl-5">
                <h3 className="font-bold text-gray-900 mb-2">Zero-click recommendations</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Queries like &ldquo;mortgage adviser Manchester&rdquo; increasingly return a direct recommendation rather than a list of links. The firm recommended gets the enquiry. The firms not recommended are not seen.
                </p>
              </div>

              <div className="border-l-4 border-[#1B4F72] pl-5">
                <h3 className="font-bold text-gray-900 mb-2">AI advertising</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Perplexity has opened sponsored placements in the UK. ChatGPT&apos;s ad model is in development. Manchester mortgage advisers with structured profiles already in place will be first in line. Firms without structured data cannot buy their way into these placements &mdash; the infrastructure has to exist first.
                </p>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <FAQSection />
          </section>

          {/* TendorAI Position */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">The TendorAI Position</h2>

            <p className="text-gray-600 leading-relaxed mb-4">
              TendorAI maintains the UK&apos;s largest structured database of regulated professional services firms &mdash; 12,793 businesses across solicitors, accountants, mortgage advisers, financial advisers, and office equipment suppliers, all sourced directly from SRA, ICAEW, and FCA registers.
            </p>

            <p className="text-gray-600 leading-relaxed mb-4">
              Every firm in the database has a structured profile. Pro firms have that profile extended to their own website via an automatically maintained schema installation &mdash; no developer required, no quarterly audits, no schema drift.
            </p>

            <p className="text-gray-600 leading-relaxed">
              When a potential client asks AI to recommend a mortgage adviser in Manchester, TendorAI-listed firms have declared their FCA credentials, location, specialisms, and lender panel memberships in machine-readable format. That is why they get recommended.
            </p>
          </section>

          {/* CTA */}
          <section className="bg-gradient-to-br from-[#1B4F72] to-[#2d1b4e] text-white rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Run Your Free AI Visibility Report</h2>
            <p className="text-blue-100 mb-8 max-w-xl mx-auto">
              See where your Manchester mortgage advice firm stands in 60 seconds. We&apos;ll scan ChatGPT, Perplexity, and Gemini to show you exactly what AI knows about your practice.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/aeo-report"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#1B4F72] font-bold rounded-lg hover:bg-blue-50 transition-colors text-lg"
              >
                Run Your Free Report
              </Link>
              <Link
                href="/for-vendors#pricing"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors"
              >
                See TendorAI Pro
              </Link>
            </div>
          </section>

          {/* Source note */}
          <div className="mt-8 text-xs text-gray-400 italic">
            Data sourced from TendorAI&apos;s database of SRA, ICAEW, and FCA-registered firms, March 2026. Firm counts reflect registered practices as of the most recent regulatory register import.
          </div>

          {/* Author / date */}
          <div className="mt-8 pt-8 border-t border-gray-200 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Published {new Date(PUBLISHED).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} by TendorAI
            </p>
            <Link href="/blog" className="text-sm text-purple-600 hover:text-purple-700 font-medium">
              &larr; Back to Blog
            </Link>
          </div>
        </article>
      </main>
    </>
  );
}
