import { Metadata } from 'next';
import Link from 'next/link';

const TITLE = 'AI Visibility Report: London Accountants 2026 — TendorAI Research';
const DESCRIPTION =
  'TendorAI tracks 412 ICAEW-registered accountants in London. With 98% having websites, the real battle is structured data. Here\'s what AI visibility looks like for London accounting firms.';
const CANONICAL = 'https://www.tendorai.com/blog/ai-visibility-report-accountants-london';
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
    q: 'Does my London accountancy firm appear when someone asks AI for an accountant recommendation?',
    a: 'Almost certainly not — unless you have structured data on your website. TendorAI tracks 412 ICAEW-registered accountants in London. Only 8 have no website, but the vast majority of those with websites have no structured schema data. Without it, AI engines cannot confidently recommend your firm. TendorAI offers a free AI Visibility Report that scans ChatGPT, Perplexity, and Gemini to show you exactly where you stand.',
  },
  {
    q: 'How many London accountants are AI-visible right now?',
    a: 'Of the 412 ICAEW-registered accountants in London, 404 have a website — giving London accountants a 98% web presence rate. However, having a website is only the baseline. The real differentiator is structured data: schema markup that declares your services, credentials, and location in a machine-readable format. Most London firms lack this entirely, which means AI engines skip them in favour of the few that have it.',
  },
  {
    q: 'Can smaller London accountancy firms compete with the Big 4 in AI recommendations?',
    a: 'Yes — and this is one of the most significant opportunities in the market. AI recommendation engines do not rank by revenue or headcount. They rank by structured data quality, third-party citations, and entity clarity. A sole practitioner in Islington with proper schema markup and a verified directory listing can outperform a Big 4 office that relies on brand recognition alone. AI does not know your brand — it knows your data.',
  },
  {
    q: 'Is AI visibility different from SEO for accountants?',
    a: 'Yes. Traditional SEO optimises for keyword ranking in link-based search results. AI visibility (AEO — Answer Engine Optimisation) optimises for entity recognition in conversational AI responses. When a business owner asks ChatGPT "find me a good accountant near Canary Wharf," the AI does not return a list of links — it names specific firms. The techniques overlap but the mechanisms are fundamentally different.',
  },
  {
    q: 'How does Making Tax Digital affect AI visibility for London accountants?',
    a: 'MTD is driving a surge in AI-mediated searches. Business owners searching for MTD-compliant accountants are increasingly using AI assistants rather than Google. Firms that have declared MTD advisory services in structured data are being recommended directly. Firms that mention MTD only in blog posts or unstructured copy are being overlooked. The firms winning MTD-related enquiries through AI are those with machine-readable service declarations.',
  },
  {
    q: 'How does TendorAI know which London accountants are AI-visible?',
    a: "TendorAI's platform runs structured scans across ChatGPT, Perplexity, and Gemini using city- and service-specific prompts for accountancy. Results are logged, scored, and reported back to the firm via the dashboard. We track visibility across tax advisory, audit, bookkeeping, MTD compliance, and other ICAEW-relevant service categories.",
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

export default function AIVisibilityReportLondonAccountants() {
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
      'AI visibility accountants London',
      'London accountants AI',
      'London accounting firm AI recommendations',
      'ChatGPT accountant London',
      'AI visibility report London accountants',
      'ICAEW accountant AI discovery London',
    ],
    wordCount: 2600,
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
              <span className="text-white">London Accountants AI Visibility</span>
            </nav>

            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 text-sm font-medium rounded-full bg-white/20 text-white">
                AEO Research
              </span>
              <span className="text-blue-200">12 min read</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              AI Visibility Report: London Accountants 2026
            </h1>

            <p className="text-lg text-blue-100 leading-relaxed max-w-3xl">
              TendorAI tracks 412 ICAEW-registered accountants in London. <strong>98% have websites</strong> &mdash; but the real battle is structured data. With 412 firms competing for AI recommendations, only those with machine-readable credentials are getting cited.
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
              <div className="text-4xl font-bold text-[#1B4F72]">412</div>
              <div className="text-sm text-gray-500">ICAEW firms in London</div>
            </div>
            <div className="h-px sm:h-12 sm:w-px bg-gray-200 w-full sm:w-auto" />
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600">8</div>
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
              <strong className="text-gray-900">London has 412 ICAEW-registered accountancy firms. Only 8 &mdash; just 2% &mdash; have no website.</strong> That makes London accountants one of the most digitally connected professional services segments in the UK. But here is the problem: having a website is no longer the differentiator. Structured data is.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              According to TendorAI&apos;s database of 1,380 ICAEW-registered accountants across England and Wales, London is the largest and most competitive market. With 412 firms fighting for the same AI-mediated recommendations, the margin between visibility and obscurity is razor-thin &mdash; and it comes down to whether your firm&apos;s credentials are machine-readable.
            </p>
          </section>

          {/* Module 1: The Structured Data Battleground */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">The Structured Data Battleground: London in Context</h2>

            <p className="text-gray-600 leading-relaxed mb-4">
              Of London&apos;s 412 ICAEW-registered accountancy firms:
            </p>

            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                <span className="text-gray-700"><strong>404 firms have a website</strong> &mdash; a 98% web presence rate, the highest of any regulated profession</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                <span className="text-gray-700"><strong>8 firms have no website at all</strong> &mdash; only 2% of London practices</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0" />
                <span className="text-gray-700">Of the 404 with websites, <strong>the vast majority have no structured schema data</strong> &mdash; making them functionally invisible to AI</span>
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
                    <tr key={i} className={`${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'} ${row.city === 'London' ? 'ring-2 ring-[#1B4F72] ring-inset' : ''}`}>
                      <td className="p-3 text-gray-900 font-medium">{row.city === 'London' ? <strong>{row.city}</strong> : row.city}</td>
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
              Source: TendorAI database of ICAEW-registered accountants, April 2026
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mt-6">
              <p className="text-sm text-blue-900">
                A 2% invisibility rate sounds encouraging &mdash; until you realise that 98% web presence means 412 firms competing for the same AI recommendations. The differentiator is not whether you have a website. It is whether your website speaks a language that AI engines can parse.
              </p>
            </div>
          </section>

          {/* Module 2: How AI Selects */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">How AI Selects Which London Accountant to Recommend</h2>

            <p className="text-gray-600 leading-relaxed mb-6">
              When a business owner asks ChatGPT &ldquo;find me a good accountant in the City of London for MTD compliance,&rdquo; the AI does not browse a list of 412 firms. It draws on indexed, structured data it has already processed &mdash; and it names one or two firms with confidence.
            </p>

            <p className="text-gray-700 font-semibold mb-4">The firms it recommends share three characteristics:</p>

            <div className="grid sm:grid-cols-3 gap-4 mb-6">
              {[
                { num: '1', title: 'Crawlable web presence', desc: 'A website that AI engines can access and index' },
                { num: '2', title: 'Structured data', desc: 'Schema markup declaring services, location, and ICAEW credentials explicitly' },
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
                In a market of 412 firms, the AI does not recommend all of them. It recommends the handful that have made their credentials unambiguous. <strong className="text-white">This is the structural problem TendorAI was built to solve &mdash; and in London, the competition for those recommendation slots is fiercer than anywhere else in the UK.</strong>
              </p>
            </div>
          </section>

          {/* Module 3: Big 4 vs Smaller Firms */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Big 4 vs Smaller Firms: The AI Leveller</h2>

            <p className="text-gray-600 leading-relaxed mb-4">
              London&apos;s accountancy market is dominated by the Big 4 &mdash; Deloitte, PwC, EY, and KPMG &mdash; along with mid-tier firms like BDO, Grant Thornton, and Mazars. These firms have enormous brand recognition. But AI recommendation engines do not rank by brand.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              When ChatGPT receives a query like &ldquo;recommend an accountant for a small business in Shoreditch,&rdquo; it does not default to the Big 4. It looks for structured signals: declared service areas, geographic coverage, client types, and regulatory credentials. A specialist SME accountant with proper schema markup can &mdash; and frequently does &mdash; outrank a Big 4 office that treats its website as a brochure.
            </p>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-6">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p className="text-sm text-amber-800">
                  <strong className="text-amber-900">Brand recognition is invisible to AI.</strong> A sole practitioner with structured data declaring &ldquo;MTD advisory, bookkeeping, and tax returns for SMEs in EC1&rdquo; has a stronger AI signal than a Big 4 office whose website says &ldquo;we provide a range of services to clients globally.&rdquo;
                </p>
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed">
              This is the single biggest shift in London&apos;s accountancy market in a decade. For the first time, smaller firms have a structural advantage &mdash; provided they act on it before the larger firms catch up.
            </p>
          </section>

          {/* Module 4: Scale of Opportunity */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">The Scale of the Opportunity (and the Risk)</h2>

            <p className="text-gray-600 leading-relaxed mb-6">
              TendorAI&apos;s data across all regulated professions reveals a striking contrast:
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
              Accountants lead every other regulated profession for web presence &mdash; just 2% nationally have no website. But this creates a paradox: when nearly everyone has a website, the website itself becomes meaningless as a differentiator. The battle moves to structured data, and in London &mdash; where 412 firms are competing &mdash; that battle is already being fought.
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
              <p className="text-sm text-blue-900">
                <strong>The accountancy profession&apos;s advantage is also its challenge.</strong> With 98% web presence, there is no easy win from simply launching a website. The firms that will dominate AI recommendations are those investing in structured data now &mdash; while the majority of their competitors still treat their website as a static brochure.
              </p>
            </div>
          </section>

          {/* Module 5: What AI-Cited Firms Do Differently */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">What AI-Cited London Accountants Are Doing Differently</h2>

            <p className="text-gray-600 leading-relaxed mb-6">
              TendorAI&apos;s analysis of London accountancy firms that appear consistently in AI recommendation results identifies four common factors:
            </p>

            <div className="space-y-4">
              {[
                {
                  num: 1,
                  title: 'Declared credentials',
                  desc: 'ICAEW membership number, practice certificate details, specialist accreditations (audit registration, probate, insolvency), and year of establishment are explicitly declared in structured data — not buried in a footer or About page.',
                },
                {
                  num: 2,
                  title: 'Location specificity',
                  desc: 'Borough, postcode, and coverage area are machine-readable. "We serve clients across London" is useless to an AI engine. Structured address data with postcode (EC2, W1, SE1) and locality declarations is what AI engines parse.',
                },
                {
                  num: 3,
                  title: 'Service clarity',
                  desc: 'Practice areas — tax advisory, MTD compliance, payroll, audit, bookkeeping, company formation — are listed as structured entities, not paragraph text. An AI cannot reliably extract "we help with Making Tax Digital" from a homepage. Schema-declared services are unambiguous.',
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

          {/* Module 6: What Changes in 2026 */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">What This Means for London Accountants in 2026</h2>

            <p className="text-gray-600 leading-relaxed mb-6">
              Three shifts are already underway that will accelerate AI&apos;s role in how clients find accountants in London:
            </p>

            <div className="space-y-6">
              <div className="border-l-4 border-[#1B4F72] pl-5">
                <h3 className="font-bold text-gray-900 mb-2">MTD is driving AI-mediated search</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Making Tax Digital is creating a wave of businesses searching for compliant accountants. Increasingly, those searches happen through AI assistants rather than Google. Firms with structured MTD service declarations are capturing these enquiries. Firms without them are not.
                </p>
              </div>

              <div className="border-l-4 border-[#1B4F72] pl-5">
                <h3 className="font-bold text-gray-900 mb-2">Zero-click recommendations</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Queries like &ldquo;best accountant for startups in Shoreditch&rdquo; increasingly return a direct recommendation rather than a list of links. In a market of 412 firms, only two or three get named. The rest are not seen.
                </p>
              </div>

              <div className="border-l-4 border-[#1B4F72] pl-5">
                <h3 className="font-bold text-gray-900 mb-2">AI advertising is coming to London</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Perplexity has opened sponsored placements in the UK. ChatGPT&apos;s ad model is in development. London accountancy firms with structured profiles already in place will be first in line. Firms without structured data cannot buy their way into these placements &mdash; the infrastructure has to exist first.
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
              When a business owner asks AI to recommend an accountant in London, TendorAI-listed firms have declared their ICAEW credentials, location, services, and specialist accreditations in machine-readable format. In a market of 412 competitors, that is the difference between being recommended and being ignored.
            </p>
          </section>

          {/* CTA */}
          <section className="bg-gradient-to-br from-[#1B4F72] to-[#2d1b4e] text-white rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Run Your Free AI Visibility Report</h2>
            <p className="text-blue-100 mb-8 max-w-xl mx-auto">
              See where your London accountancy firm stands in 60 seconds. We&apos;ll scan ChatGPT, Perplexity, and Gemini to show you exactly what AI knows about your practice.
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
