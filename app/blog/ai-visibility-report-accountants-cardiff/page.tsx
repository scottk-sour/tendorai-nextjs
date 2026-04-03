import { Metadata } from 'next';
import Link from 'next/link';

const TITLE = 'AI Visibility Report: Cardiff Accountants 2026 — TendorAI Research';
const DESCRIPTION =
  'TendorAI tracks 45 ICAEW-registered accountants in Cardiff. Most have websites but lack structured data for AI. Here\'s what the data shows about AI visibility for Cardiff accounting firms.';
const CANONICAL = 'https://www.tendorai.com/blog/ai-visibility-report-accountants-cardiff';
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
  { city: 'London', firms: '412', noWebsite: '8', rate: '2%' },
  { city: 'Manchester', firms: '89', noWebsite: '2', rate: '2%' },
  { city: 'Birmingham', firms: '74', noWebsite: '2', rate: '3%' },
  { city: 'Bristol', firms: '52', noWebsite: '1', rate: '2%' },
  { city: 'Cardiff', firms: '45', noWebsite: '1', rate: '2%' },
  { city: 'Leeds', firms: '61', noWebsite: '1', rate: '2%' },
  { city: 'Newcastle', firms: '33', noWebsite: '1', rate: '3%' },
];

const verticalData = [
  { vertical: 'Solicitors', firms: '8,625', noWebsite: '1,458', rate: '17%' },
  { vertical: 'Accountants', firms: '1,380', noWebsite: '21', rate: '2%' },
  { vertical: 'Mortgage Advisors', firms: '1,100', noWebsite: '532', rate: '48%' },
  { vertical: 'Office Equipment', firms: '1,048', noWebsite: '602', rate: '57%' },
  { vertical: 'Financial Advisors', firms: '525', noWebsite: '110', rate: '21%' },
];

const faqs = [
  {
    q: 'Does my Cardiff accountancy firm appear when someone asks AI to recommend an accountant?',
    a: 'Almost certainly not — even if you have a website. TendorAI tracks 45 ICAEW-registered accountants in Cardiff, and while 44 have websites, the vast majority lack structured data. Without schema markup declaring your services, ICAEW credentials, and location, AI engines cannot confidently recommend you. TendorAI offers a free AI Visibility Report that scans ChatGPT, Perplexity, and Gemini to show you exactly where you stand.',
  },
  {
    q: 'How many Cardiff accountants are AI-visible?',
    a: 'TendorAI tracks 45 ICAEW-registered accountants in Cardiff. Only 1 has no website. But having a website is not the same as being AI-visible. Of the 44 firms with websites, the majority have no structured schema data — meaning AI recommendation engines have no reliable way to identify their services, chartered status, or MTD compliance. The real invisibility rate for Cardiff accountants is far higher than 2%.',
  },
  {
    q: 'Does my ICAEW chartered status help with AI visibility?',
    a: 'Only if it is declared in structured data. AI engines treat ICAEW registration as a strong trust signal, but only when it is machine-readable. If your chartered accountant status is mentioned in paragraph text on an About page, AI cannot reliably extract it. Schema markup that explicitly declares your ICAEW membership, practice certificate number, and accreditations makes that information unambiguous.',
  },
  {
    q: 'Is Making Tax Digital compliance relevant to AI recommendations?',
    a: 'Yes. MTD compliance is increasingly used as a qualifier in AI responses to queries like "find me an accountant for MTD" or "accountant who handles digital tax returns Cardiff." Firms that declare MTD compliance in structured data are more likely to appear in these results. Firms that mention it only in blog posts or service pages are likely to be overlooked.',
  },
  {
    q: 'Will AI recommendations replace Google for finding an accountant?',
    a: 'For high-intent queries like "find me a chartered accountant in Cardiff," AI is already answering directly without returning links. According to industry data, AI Overviews now appear in over 60% of searches. Accountants not visible in AI responses are missing an increasing share of inbound enquiries — and unlike solicitors or mortgage advisers, accountants cannot blame a missing website. The gap is structured data.',
  },
  {
    q: 'How does TendorAI know which accounting firms are AI-visible?',
    a: "TendorAI's platform runs structured scans across ChatGPT, Perplexity, and Gemini using city- and service-specific prompts — including queries for tax advisory, audit, bookkeeping, payroll, and corporate finance in Cardiff. Results are logged, scored, and reported back to the firm via the dashboard.",
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

export default function AIVisibilityReportCardiffAccountants() {
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
      'AI visibility accountants Cardiff',
      'Cardiff accountants AI',
      'Cardiff accounting firm AI recommendations',
      'ChatGPT accountant Cardiff',
      'AI visibility report Cardiff accountants',
      'accountant AI discovery Cardiff',
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
              <span className="text-white">Cardiff Accountants AI Visibility</span>
            </nav>

            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 text-sm font-medium rounded-full bg-white/20 text-white">
                AEO Research
              </span>
              <span className="text-blue-200">10 min read</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              AI Visibility Report: Cardiff Accountants 2026
            </h1>

            <p className="text-lg text-blue-100 leading-relaxed max-w-3xl">
              TendorAI tracks 45 ICAEW-registered accountants in Cardiff. <strong>Nearly all have websites &mdash; but almost none have structured data for AI.</strong> The problem isn&apos;t missing websites. It&apos;s missing schema. Here&apos;s what the data shows.
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
              <div className="text-4xl font-bold text-[#1B4F72]">45</div>
              <div className="text-sm text-gray-500">ICAEW firms in Cardiff</div>
            </div>
            <div className="h-px sm:h-12 sm:w-px bg-gray-200 w-full sm:w-auto" />
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600">1</div>
              <div className="text-sm text-gray-500">with no website</div>
            </div>
            <div className="h-px sm:h-12 sm:w-px bg-gray-200 w-full sm:w-auto" />
            <div className="text-center">
              <div className="text-4xl font-bold text-amber-600">2%</div>
              <div className="text-sm text-gray-500">no web presence</div>
            </div>
          </div>
        </section>

        {/* Article content */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16">
          {/* Opening */}
          <section className="mb-12">
            <p className="text-lg text-gray-600 leading-relaxed mb-4">
              <strong className="text-gray-900">Cardiff has 45 ICAEW-registered accountants. Only 1 has no website &mdash; a 2% invisibility rate.</strong> On the surface, that looks like good news. Accountants have near-universal web presence. But the data tells a different story.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              According to TendorAI&apos;s database of 1,380 ICAEW-registered accountants across England and Wales, the real problem for accounting firms is not whether they have a website. It is whether that website contains the structured data AI engines need to recommend them. For the vast majority of Cardiff accountants, it does not.
            </p>
          </section>

          {/* Module 1: The Invisibility Problem */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">The Invisibility Problem: Cardiff in Context</h2>

            <p className="text-gray-600 leading-relaxed mb-4">
              Of Cardiff&apos;s 45 ICAEW-registered accountants:
            </p>

            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                <span className="text-gray-700"><strong>44 firms have a website</strong> &mdash; an impressive 98% web presence rate</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                <span className="text-gray-700"><strong>1 firm has no website at all</strong> &mdash; just 2% of Cardiff practices</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0" />
                <span className="text-gray-700">But the vast majority of those 44 websites <strong>have no structured schema data</strong> &mdash; making them functionally invisible to AI</span>
              </li>
            </ul>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-[#1B4F72] text-white">
                    <th className="p-3 text-left font-semibold">City</th>
                    <th className="p-3 text-left font-semibold">ICAEW-Registered Firms</th>
                    <th className="p-3 text-left font-semibold">No Website</th>
                    <th className="p-3 text-left font-semibold">No-Website Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {nationalCityData.map((row, i) => (
                    <tr key={i} className={`${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'} ${row.city === 'Cardiff' ? 'ring-2 ring-[#1B4F72] ring-inset' : ''}`}>
                      <td className="p-3 text-gray-900 font-medium">{row.city === 'Cardiff' ? <strong>{row.city}</strong> : row.city}</td>
                      <td className="p-3 text-gray-700">{row.firms}</td>
                      <td className="p-3 text-red-600 font-medium">{row.noWebsite}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-700">
                          {row.rate}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-gray-500 text-sm italic">
              Source: TendorAI database of ICAEW-registered accountants, April 2026
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mt-6">
              <p className="text-sm text-blue-900">
                A 2% no-website rate looks healthy &mdash; but it masks the real problem. Having a website is the floor, not the ceiling. A website with no structured data is only marginally better than no website at all. AI engines cannot extract reliable information from unstructured content. For accountants, the invisibility problem is not missing websites &mdash; it is missing schema.
              </p>
            </div>
          </section>

          {/* Module 2: How AI Selects */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">How AI Selects Which Cardiff Accountant to Recommend</h2>

            <p className="text-gray-600 leading-relaxed mb-6">
              When a potential client asks ChatGPT &ldquo;best chartered accountant Cardiff for Making Tax Digital,&rdquo; the AI does not browse a list of firms. It draws on indexed, structured data it has already processed.
            </p>

            <p className="text-gray-700 font-semibold mb-4">The firms it recommends share three characteristics:</p>

            <div className="grid sm:grid-cols-3 gap-4 mb-6">
              {[
                { num: '1', title: 'Crawlable web presence', desc: 'A website that AI engines can access and index' },
                { num: '2', title: 'Structured data', desc: 'Schema markup declaring services, location, and credentials explicitly' },
                { num: '3', title: 'Third-party citations', desc: 'Directories, review platforms, and regulatory registers that validate the firm' },
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
                Cardiff accountants have step one covered &mdash; 98% have websites. But steps two and three are where the gap is enormous. Without structured data and third-party citations, even a well-designed website is invisible to AI recommendation engines. <strong className="text-white">This is the structural problem TendorAI was built to solve.</strong>
              </p>
            </div>
          </section>

          {/* Module 3: Scale of Opportunity */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">The Scale of the Opportunity</h2>

            <p className="text-gray-600 leading-relaxed mb-6">
              TendorAI&apos;s data across all regulated professions reveals a pattern &mdash; and accountants sit in a unique position:
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
                    <tr key={i} className={`${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'} ${row.vertical === 'Accountants' ? 'ring-2 ring-[#1B4F72] ring-inset' : ''}`}>
                      <td className="p-3 text-gray-900 font-medium">{row.vertical === 'Accountants' ? <strong>{row.vertical}</strong> : row.vertical}</td>
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
              Source: TendorAI database, April 2026
            </p>

            <p className="text-gray-600 leading-relaxed mb-4">
              Accountants have the lowest no-website rate of any regulated profession TendorAI tracks &mdash; just 2% compared to 17% for solicitors and 48% for mortgage advisers. This is both an advantage and a trap. Because nearly every accountancy firm has a website, there is a false sense of digital readiness. But a website without structured data is like a business card written in invisible ink &mdash; it exists, but AI cannot read it.
            </p>

            <p className="text-gray-600 leading-relaxed mb-4">
              Of the 44 Cardiff accounting firms with websites, the vast majority have no structured schema data, no AI-optimised content, and no mechanism for AI engines to verify their ICAEW credentials, MTD compliance, or service offerings.
            </p>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p className="text-sm text-amber-800">
                  <strong className="text-amber-900">Accountants have the best web presence of any regulated profession &mdash; and the biggest structured data gap.</strong> The firms that close this gap first will dominate AI recommendations in Cardiff.
                </p>
              </div>
            </div>
          </section>

          {/* Module 4: What AI-Cited Firms Do Differently */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">What AI-Cited Cardiff Firms Are Doing Differently</h2>

            <p className="text-gray-600 leading-relaxed mb-6">
              TendorAI&apos;s analysis of accounting firms across South Wales that appear consistently in AI recommendation results identifies four common factors:
            </p>

            <div className="space-y-4">
              {[
                {
                  num: 1,
                  title: 'Declared ICAEW credentials',
                  desc: 'ICAEW membership number, chartered accountant status, ACCA and AAT accreditations, and practice certificate details are explicitly declared in structured data — not buried in an About page or footer.',
                },
                {
                  num: 2,
                  title: 'MTD compliance and service clarity',
                  desc: 'Making Tax Digital compliance, tax advisory, audit, bookkeeping, payroll, and corporate finance services are listed as structured entities, not paragraph text. An AI cannot reliably extract "we handle MTD submissions" from a homepage. Schema-declared services are unambiguous.',
                },
                {
                  num: 3,
                  title: 'Location specificity',
                  desc: 'City, postcode, and coverage area are machine-readable. "We serve clients across South Wales" is useless to an AI engine. Structured address data with postcode and locality is not.',
                },
                {
                  num: 4,
                  title: 'Third-party citations',
                  desc: 'The firm appears in authoritative directories that AI engines treat as trust signals. Trustpilot, the ICAEW register, Google Business Profile, and structured directories like TendorAI provide the external validation that moves a firm from "possible result" to "confident recommendation."',
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
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">What This Means for Cardiff Accountants in 2026</h2>

            <p className="text-gray-600 leading-relaxed mb-6">
              Three shifts are already underway that will accelerate AI&apos;s role in how clients find accountants in Cardiff:
            </p>

            <div className="space-y-6">
              <div className="border-l-4 border-[#1B4F72] pl-5">
                <h3 className="font-bold text-gray-900 mb-2">From keywords to entities</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  AI engines rank firms based on declared identity &mdash; who they are, what they do, where they operate, what credentials they hold &mdash; not keyword density. ICAEW membership verification and chartered status are emerging as primary trust signals for Cardiff accounting firms.
                </p>
              </div>

              <div className="border-l-4 border-[#1B4F72] pl-5">
                <h3 className="font-bold text-gray-900 mb-2">Zero-click recommendations</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Queries like &ldquo;chartered accountant Cardiff MTD&rdquo; increasingly return a direct recommendation rather than a list of links. The firm recommended gets the enquiry. The firms not recommended are not seen.
                </p>
              </div>

              <div className="border-l-4 border-[#1B4F72] pl-5">
                <h3 className="font-bold text-gray-900 mb-2">AI advertising</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Perplexity has opened sponsored placements in the UK. ChatGPT&apos;s ad model is in development. Cardiff accountants with structured profiles already in place will be first in line. Firms without structured data cannot buy their way into these placements &mdash; the infrastructure has to exist first.
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
              TendorAI maintains the UK&apos;s largest structured database of regulated professional services firms &mdash; 12,793 businesses across solicitors, accountants, mortgage advisors, financial advisors, and office equipment suppliers, all sourced directly from SRA, ICAEW, and FCA registers.
            </p>

            <p className="text-gray-600 leading-relaxed mb-4">
              Every firm in the database has a structured profile. Pro firms have that profile extended to their own website via an automatically maintained schema installation &mdash; no developer required, no quarterly audits, no schema drift.
            </p>

            <p className="text-gray-600 leading-relaxed">
              When a potential client asks AI to recommend an accountant in Cardiff, TendorAI-listed firms have declared their ICAEW credentials, MTD compliance, services, and accreditations in machine-readable format. That is why they get recommended.
            </p>
          </section>

          {/* CTA */}
          <section className="bg-gradient-to-br from-[#1B4F72] to-[#2d1b4e] text-white rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Run Your Free AI Visibility Report</h2>
            <p className="text-blue-100 mb-8 max-w-xl mx-auto">
              See where your Cardiff accountancy firm stands in 60 seconds. We&apos;ll scan ChatGPT, Perplexity, and Gemini to show you exactly what AI knows about your practice.
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
            Data sourced from TendorAI&apos;s database of SRA, ICAEW, and FCA-registered firms, April 2026. Firm counts reflect registered practices as of the most recent regulatory register import.
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
