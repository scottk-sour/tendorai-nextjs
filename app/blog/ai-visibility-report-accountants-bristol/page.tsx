import { Metadata } from 'next';
import Link from 'next/link';

const TITLE = 'AI Visibility Report: Bristol Accountants 2026 — TendorAI Research';
const DESCRIPTION =
  'TendorAI tracks 52 ICAEW-registered accountants in Bristol. Nearly all have websites but most lack structured data for AI. Here\'s what the data shows.';
const CANONICAL = 'https://www.tendorai.com/blog/ai-visibility-report-accountants-bristol';
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
    q: 'Does my Bristol accountancy firm appear when someone asks AI for a recommendation?',
    a: 'If your firm has no website, no. If your firm has a website but no structured data, almost certainly not. TendorAI offers a free AI Visibility Report that scans ChatGPT, Perplexity, and Gemini to show you exactly where you stand.',
  },
  {
    q: 'How many Bristol accountants are AI-visible?',
    a: 'TendorAI tracks 52 ICAEW-registered accountants in Bristol. Only 1 has no website. However, the vast majority of the remaining 51 have no structured schema data — meaning even firms with professional websites are likely invisible to AI recommendation engines.',
  },
  {
    q: 'Why do accountants have such a low invisibility rate compared to solicitors?',
    a: 'Accountancy firms adopted digital infrastructure earlier and more uniformly than other regulated professions. Cloud accounting platforms like Xero, QuickBooks, and Sage drove web adoption. But having a website is only the first step — without structured data, AI engines still cannot reliably identify your services, credentials, or location.',
  },
  {
    q: 'Does listing my ICAEW membership on my website make me AI-visible?',
    a: 'Not if it is only mentioned in paragraph text. AI engines parse structured data, not prose. Your ICAEW registration number, practice certificate details, and authorised services need to be declared in machine-readable schema markup — not just written on an About page.',
  },
  {
    q: 'Will AI recommendations replace Google for accounting queries?',
    a: 'For high-intent queries like "find me an accountant in Bristol for MTD," AI is already answering directly without returning links. According to industry data, AI Overviews now appear in over 60% of searches. Firms not visible in AI responses are missing an increasing share of inbound enquiries.',
  },
  {
    q: 'How does TendorAI help accountancy firms become AI-visible?',
    a: "TendorAI builds and maintains a structured profile for your firm — declaring your ICAEW credentials, MTD readiness, software partnerships, service areas, and location in machine-readable format. Pro firms get this schema installed directly on their website, with no developer required and no ongoing maintenance.",
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

export default function AIVisibilityReportBristolAccountants() {
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
      'AI visibility accountants Bristol',
      'Bristol accountants AI',
      'Bristol accountancy firm AI recommendations',
      'ChatGPT accountant Bristol',
      'AI visibility report Bristol accountants',
      'ICAEW accountant AI discovery Bristol',
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
              <span className="text-white">Bristol Accountants AI Visibility</span>
            </nav>

            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 text-sm font-medium rounded-full bg-white/20 text-white">
                AEO Research
              </span>
              <span className="text-blue-200">10 min read</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              AI Visibility Report: Bristol Accountants 2026
            </h1>

            <p className="text-lg text-blue-100 leading-relaxed max-w-3xl">
              TendorAI tracks 52 ICAEW-registered accountants in Bristol. <strong>Nearly all have websites</strong> &mdash; but most lack structured data, making them invisible to ChatGPT, Gemini, and Perplexity. Here&apos;s what the data shows.
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
              <div className="text-4xl font-bold text-[#1B4F72]">52</div>
              <div className="text-sm text-gray-500">ICAEW firms in Bristol</div>
            </div>
            <div className="h-px sm:h-12 sm:w-px bg-gray-200 w-full sm:w-auto" />
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600">1</div>
              <div className="text-sm text-gray-500">with no website</div>
            </div>
            <div className="h-px sm:h-12 sm:w-px bg-gray-200 w-full sm:w-auto" />
            <div className="text-center">
              <div className="text-4xl font-bold text-amber-600">2%</div>
              <div className="text-sm text-gray-500">completely invisible</div>
            </div>
          </div>
        </section>

        {/* Article content */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16">
          {/* Opening */}
          <section className="mb-12">
            <p className="text-lg text-gray-600 leading-relaxed mb-4">
              <strong className="text-gray-900">Bristol has 52 ICAEW-registered accountancy firms. Only 1 has no website &mdash; a 2% invisibility rate.</strong> On the surface, that looks excellent. But scratch beneath the headline number and the picture is far less reassuring.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Having a website does not mean being AI-visible. According to TendorAI&apos;s analysis, the overwhelming majority of Bristol accountancy firms have websites that tell AI engines almost nothing &mdash; no structured schema data, no machine-readable ICAEW credentials, no declared MTD compliance, and no explicit service taxonomy. The problem for accountants is not missing websites. It is missing structured data.
            </p>
          </section>

          {/* Module 1: The Structured Data Problem */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">The Structured Data Problem: Bristol in Context</h2>

            <p className="text-gray-600 leading-relaxed mb-4">
              Of Bristol&apos;s 52 ICAEW-registered accountancy firms:
            </p>

            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                <span className="text-gray-700"><strong>51 firms have a website</strong> &mdash; the minimum requirement to be detectable by AI</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                <span className="text-gray-700"><strong>1 firm has no website at all</strong> &mdash; 2% of Bristol practices</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0" />
                <span className="text-gray-700">Of the 51 with websites, the <strong>vast majority have no structured schema data</strong> &mdash; making them effectively invisible to AI recommendation engines</span>
              </li>
            </ul>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-[#1B4F72] text-white">
                    <th className="p-3 text-left font-semibold">City</th>
                    <th className="p-3 text-left font-semibold">ICAEW-Registered Firms</th>
                    <th className="p-3 text-left font-semibold">No Website</th>
                    <th className="p-3 text-left font-semibold">Invisibility Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {nationalCityData.map((row, i) => (
                    <tr key={i} className={`${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'} ${row.city === 'Bristol' ? 'ring-2 ring-[#1B4F72] ring-inset' : ''}`}>
                      <td className="p-3 text-gray-900 font-medium">{row.city === 'Bristol' ? <strong>{row.city}</strong> : row.city}</td>
                      <td className="p-3 text-gray-700">{row.firms}</td>
                      <td className="p-3 text-red-600 font-medium">{row.noWebsite}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                          parseInt(row.rate) >= 25 ? 'bg-red-100 text-red-700' :
                          parseInt(row.rate) >= 20 ? 'bg-amber-100 text-amber-700' :
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

            <p className="text-gray-500 text-sm italic">
              Source: TendorAI database of ICAEW-registered firms, April 2026
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mt-6">
              <p className="text-sm text-blue-900">
                A 2% invisibility rate sounds impressive &mdash; until you realise the real problem is not missing websites but missing structured data. A website without schema markup is a brochure that AI cannot read.
              </p>
            </div>
          </section>

          {/* Module 2: How AI Selects */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">How AI Selects Which Bristol Accountant to Recommend</h2>

            <p className="text-gray-600 leading-relaxed mb-6">
              When a business owner asks ChatGPT &ldquo;best accountant in Bristol for Making Tax Digital,&rdquo; the AI does not browse a list of firms. It draws on indexed, structured data it has already processed.
            </p>

            <p className="text-gray-700 font-semibold mb-4">The firms it recommends share three characteristics:</p>

            <div className="grid sm:grid-cols-3 gap-4 mb-6">
              {[
                { num: '1', title: 'Crawlable web presence', desc: 'A website that AI engines can access and index' },
                { num: '2', title: 'Structured data', desc: 'Schema markup declaring services, ICAEW credentials, MTD readiness, and location explicitly' },
                { num: '3', title: 'Third-party citations', desc: 'Directories, review platforms, and the ICAEW register that validate the firm' },
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
                Most Bristol accountancy firms tick box one &mdash; they have a website. Almost none tick boxes two and three. <strong className="text-white">That is why firms with decades of experience and hundreds of clients are being skipped by AI in favour of firms with better-structured data.</strong>
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
              Accountants have the lowest invisibility rate of any regulated profession TendorAI tracks &mdash; just 2% nationally. Cloud accounting platforms like Xero, QuickBooks, and Sage drove early web adoption across the profession. But web presence and AI visibility are fundamentally different things.
            </p>

            <p className="text-gray-600 leading-relaxed mb-4">
              Of Bristol&apos;s 51 accountancy firms with websites, most have no structured schema data declaring their ICAEW registration, MTD compliance status, software partnerships, or service specialisms. Their websites are human-readable brochures &mdash; not machine-readable profiles.
            </p>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p className="text-sm text-amber-800">
                  <strong className="text-amber-900">Accountants&apos; problem is not missing websites &mdash; it is missing structured data.</strong> ICAEW credentials are not machine-readable. MTD compliance is not declared in schema. Software partnerships with Xero, QuickBooks, and Sage are invisible to AI engines.
                </p>
              </div>
            </div>
          </section>

          {/* Module 4: What AI-Cited Firms Do Differently */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">What AI-Cited Bristol Accountancy Firms Are Doing Differently</h2>

            <p className="text-gray-600 leading-relaxed mb-6">
              TendorAI&apos;s analysis of accountancy firms across the South West that appear consistently in AI recommendation results identifies four common factors:
            </p>

            <div className="space-y-4">
              {[
                {
                  num: 1,
                  title: 'Machine-readable credentials',
                  desc: 'ICAEW membership number, ACCA registration, practice certificate details, and authorisation status are declared in structured data — not mentioned in an About page paragraph. AI engines treat schema-declared credentials as verified identity signals.',
                },
                {
                  num: 2,
                  title: 'Declared MTD and software capabilities',
                  desc: 'Making Tax Digital compliance, authorised software agent status, and partnerships with Xero, QuickBooks, and Sage are explicitly structured. A sentence saying "we use Xero" is invisible to AI. A schema-declared software partnership is not.',
                },
                {
                  num: 3,
                  title: 'Service specificity',
                  desc: 'Tax planning, audit, bookkeeping, payroll, VAT returns, R&D tax credits, and capital gains advice are listed as structured entities — not buried in paragraph copy. AI cannot reliably extract "we specialise in R&D tax credits" from a homepage. Schema-declared services are unambiguous.',
                },
                {
                  num: 4,
                  title: 'Third-party citation',
                  desc: 'The firm appears in authoritative directories that AI engines treat as trust signals. The ICAEW register, Google Business Profile, Trustpilot, and structured directories like TendorAI provide the external validation that moves a firm from "possible result" to "confident recommendation."',
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
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">What This Means for Bristol Accountants in 2026</h2>

            <p className="text-gray-600 leading-relaxed mb-6">
              Three shifts are already underway that will accelerate AI&apos;s role in how businesses find accountants in Bristol:
            </p>

            <div className="space-y-6">
              <div className="border-l-4 border-[#1B4F72] pl-5">
                <h3 className="font-bold text-gray-900 mb-2">MTD is driving search behaviour change</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Making Tax Digital for Income Tax Self Assessment launches in April 2026. Thousands of sole traders and landlords are searching for MTD-compliant accountants right now. Queries like &ldquo;accountant Bristol MTD compliant&rdquo; are increasingly answered by AI directly &mdash; and only firms with structured, declared MTD readiness are being recommended.
                </p>
              </div>

              <div className="border-l-4 border-[#1B4F72] pl-5">
                <h3 className="font-bold text-gray-900 mb-2">Zero-click recommendations</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Queries like &ldquo;best accountant in Bristol for small businesses&rdquo; increasingly return a direct recommendation rather than a list of links. The firm recommended gets the enquiry. The firms not recommended are not seen. AI Overviews now appear in over 60% of searches.
                </p>
              </div>

              <div className="border-l-4 border-[#1B4F72] pl-5">
                <h3 className="font-bold text-gray-900 mb-2">AI advertising is arriving</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Perplexity has opened sponsored placements in the UK. ChatGPT&apos;s ad model is in development. Bristol accountancy firms with structured profiles already in place will be first in line. Firms without structured data cannot buy their way into these placements &mdash; the infrastructure has to exist first.
                </p>
              </div>
            </div>
          </section>

          {/* Module 6: The ICAEW Credentials Gap */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">The ICAEW Credentials Gap</h2>

            <p className="text-gray-600 leading-relaxed mb-4">
              Every ICAEW-registered accountant in Bristol holds a credential that should be a powerful AI trust signal. The ICAEW is one of the most recognised accountancy bodies in the world. ACCA membership carries similar weight. Yet almost no Bristol accountancy firm has made these credentials machine-readable.
            </p>

            <p className="text-gray-600 leading-relaxed mb-4">
              Here is what AI engines look for when deciding whether to recommend an accountancy firm &mdash; and what they typically find on Bristol accountancy websites:
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-red-50 border border-red-200 rounded-xl p-5">
                <h3 className="font-bold text-red-900 mb-3 text-sm">What AI engines find today</h3>
                <ul className="space-y-2 text-sm text-red-800">
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-0.5">&#10005;</span>
                    <span>ICAEW logo on footer &mdash; not machine-readable</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-0.5">&#10005;</span>
                    <span>&ldquo;We are Xero-certified&rdquo; in paragraph text</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-0.5">&#10005;</span>
                    <span>Services listed in a single comma-separated sentence</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-0.5">&#10005;</span>
                    <span>No structured address or coverage area data</span>
                  </li>
                </ul>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                <h3 className="font-bold text-green-900 mb-3 text-sm">What AI engines need</h3>
                <ul className="space-y-2 text-sm text-green-800">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">&#10003;</span>
                    <span>ICAEW number declared in schema markup</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">&#10003;</span>
                    <span>Software partnerships as structured entities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">&#10003;</span>
                    <span>Each service as a distinct schema-declared offering</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">&#10003;</span>
                    <span>Structured address with postcode and areaServed</span>
                  </li>
                </ul>
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed">
              The gap between what Bristol accountancy firms publish and what AI engines need is the single biggest opportunity in the market. The firms that close this gap first will dominate AI recommendations in Bristol &mdash; not because they are better accountants, but because they are the only ones AI can confidently identify.
            </p>
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
              Every firm in the database has a structured profile. Pro firms have that profile extended to their own website via an automatically maintained schema installation &mdash; declaring ICAEW credentials, MTD compliance, software partnerships, service areas, and location in machine-readable format. No developer required, no quarterly audits, no schema drift.
            </p>

            <p className="text-gray-600 leading-relaxed">
              When a business owner asks AI to recommend an accountant in Bristol, TendorAI-listed firms have declared their credentials, services, and specialisms in the format AI engines require. That is why they get recommended.
            </p>
          </section>

          {/* CTA */}
          <section className="bg-gradient-to-br from-[#1B4F72] to-[#2d1b4e] text-white rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Run Your Free AI Visibility Report</h2>
            <p className="text-blue-100 mb-8 max-w-xl mx-auto">
              See where your Bristol accountancy firm stands in 60 seconds. We&apos;ll scan ChatGPT, Perplexity, and Gemini to show you exactly what AI knows about your practice.
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
            Data sourced from TendorAI&apos;s database of ICAEW-registered firms, April 2026. Firm counts reflect registered practices as of the most recent regulatory register import.
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
