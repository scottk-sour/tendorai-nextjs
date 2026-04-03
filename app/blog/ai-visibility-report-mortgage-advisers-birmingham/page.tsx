import { Metadata } from 'next';
import Link from 'next/link';

const TITLE = 'AI Visibility Report: Birmingham Mortgage Advisers 2026 — TendorAI Research';
const DESCRIPTION =
  'TendorAI tracks 55 FCA-registered mortgage advisers in Birmingham. 47% have no website — making them completely invisible to AI assistants.';
const CANONICAL = 'https://www.tendorai.com/blog/ai-visibility-report-mortgage-advisers-birmingham';
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
  { city: 'London', firms: '312', noWebsite: '141', rate: '45%' },
  { city: 'Birmingham', firms: '55', noWebsite: '26', rate: '47%' },
  { city: 'Manchester', firms: '48', noWebsite: '22', rate: '46%' },
  { city: 'Leeds', firms: '37', noWebsite: '17', rate: '46%' },
  { city: 'Bristol', firms: '29', noWebsite: '12', rate: '41%' },
  { city: 'Liverpool', firms: '26', noWebsite: '13', rate: '50%' },
  { city: 'Newcastle', firms: '22', noWebsite: '11', rate: '50%' },
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
    q: 'Does my Birmingham firm appear when someone asks AI to recommend a mortgage adviser?',
    a: 'If your firm has no website, no. If your firm has a website but no structured data, probably not. TendorAI offers a free AI Visibility Report that scans ChatGPT, Perplexity, and Gemini to show you exactly where you stand.',
  },
  {
    q: 'How many Birmingham mortgage advisers are AI-visible?',
    a: 'TendorAI tracks 55 FCA-registered mortgage advisers in Birmingham. 26 have no website. Of the remaining 29, the majority have no structured schema data — meaning even firms with websites are likely invisible to AI recommendation engines.',
  },
  {
    q: 'What is the fastest way for a mortgage adviser to become AI-visible?',
    a: "Three steps: structured schema markup on your website, a verified profile in an AI-indexed directory, and at least one authoritative third-party citation (review platform or regulatory listing). TendorAI\u2019s Pro plan delivers all three.",
  },
  {
    q: 'Is AI visibility different from SEO for mortgage advisers?',
    a: 'Yes. Traditional SEO optimises for keyword ranking in link-based search results. AI visibility (AEO — Answer Engine Optimisation) optimises for entity recognition in conversational AI responses. The techniques overlap but the mechanisms are different.',
  },
  {
    q: 'Will AI recommendations replace Google for mortgage queries?',
    a: 'For high-intent queries ("find me a mortgage adviser in Birmingham"), AI is already answering directly without returning links. According to industry data, AI Overviews now appear in over 60% of searches. Firms not visible in AI responses are missing an increasing share of inbound enquiries.',
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

export default function AIVisibilityReportBirminghamMortgageAdvisers() {
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
      'AI visibility mortgage advisers Birmingham',
      'Birmingham mortgage advisers AI',
      'Birmingham mortgage broker AI recommendations',
      'ChatGPT mortgage adviser Birmingham',
      'AI visibility report Birmingham',
      'mortgage adviser AI discovery Birmingham',
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
              <span className="text-white">Birmingham Mortgage Advisers AI Visibility</span>
            </nav>

            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 text-sm font-medium rounded-full bg-white/20 text-white">
                AEO Research
              </span>
              <span className="text-blue-200">10 min read</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              AI Visibility Report: Birmingham Mortgage Advisers 2026
            </h1>

            <p className="text-lg text-blue-100 leading-relaxed max-w-3xl">
              Half of Birmingham&apos;s mortgage advisers have no website.<br />
              The other half have no structured data. Both are invisible to AI.
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
              <div className="text-4xl font-bold text-[#1B4F72]">55</div>
              <div className="text-sm text-gray-500">FCA firms in Birmingham</div>
            </div>
            <div className="h-px sm:h-12 sm:w-px bg-gray-200 w-full sm:w-auto" />
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600">26</div>
              <div className="text-sm text-gray-500">with no website</div>
            </div>
            <div className="h-px sm:h-12 sm:w-px bg-gray-200 w-full sm:w-auto" />
            <div className="text-center">
              <div className="text-4xl font-bold text-amber-600">47%</div>
              <div className="text-sm text-gray-500">completely invisible</div>
            </div>
          </div>
        </section>

        {/* Article content */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16">
          {/* The Data */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">The Data</h2>
            <p className="text-gray-700 mb-2">TendorAI tracks 55 FCA-registered mortgage advisers in Birmingham.</p>
            <ul className="space-y-1 mb-4">
              <li className="text-gray-700">&bull; 29 firms have a website</li>
              <li className="text-gray-700">&bull; 26 firms have no website</li>
            </ul>
            <p className="text-gray-700 mb-2">That&apos;s a 47% no-website rate.</p>
            <p className="text-gray-700 mb-2">Nearly half of Birmingham&apos;s mortgage advisers are completely undetectable by AI.</p>
            <p className="text-gray-900 font-semibold">The other half have websites &mdash; but almost none have structured data.</p>
          </section>

          {/* The Real Problem */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">The Real Problem: No Website, No Visibility</h2>
            <p className="text-gray-700 mb-2">Mortgage advisers have the worst web presence of any regulated profession TendorAI tracks.</p>
            <p className="text-gray-700 mb-2">Accountants: 2% have no website.</p>
            <p className="text-gray-700 mb-2">Solicitors: 17% have no website.</p>
            <p className="text-gray-700 mb-2">Mortgage advisers: 48% have no website.</p>
            <p className="text-gray-700 mb-4">The reasons are structural.</p>
            <p className="text-gray-700 mb-2">Many mortgage advisers have relied on estate agent referrals and network introductions for decades.</p>
            <p className="text-gray-700 mb-2">A website was never a priority because leads came through intermediaries.</p>
            <p className="text-gray-700 mb-2">That model is breaking.</p>
            <p className="text-gray-700">First-time buyers now ask AI for mortgage advice before speaking to an estate agent.</p>
          </section>

          {/* Birmingham in Context */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Birmingham in Context</h2>
            <p className="text-gray-700 mb-4">This is not a Birmingham-only problem.</p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-[#1B4F72] text-white">
                    <th className="p-3 text-left font-semibold">City</th>
                    <th className="p-3 text-left font-semibold">FCA-Registered Firms</th>
                    <th className="p-3 text-left font-semibold">No Website</th>
                    <th className="p-3 text-left font-semibold">No-Website Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {nationalCityData.map((row, i) => (
                    <tr key={i} className={`${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'} ${row.city === 'Birmingham' ? 'ring-2 ring-[#1B4F72] ring-inset' : ''}`}>
                      <td className="p-3 text-gray-900 font-medium">{row.city === 'Birmingham' ? <strong>{row.city}</strong> : row.city}</td>
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

            <p className="text-gray-500 text-sm italic mb-4">Source: TendorAI database, April 2026</p>
            <p className="text-gray-700 mb-2">Across England and Wales, nearly half of all FCA-registered mortgage advisers have no web presence.</p>
            <p className="text-gray-900 font-semibold">No website means no visibility. No structured data means no recommendation.</p>
          </section>

          {/* How AI Chooses */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">How AI Chooses Which Mortgage Adviser to Recommend</h2>
            <p className="text-gray-700 mb-2">When someone asks:</p>
            <p className="text-gray-900 font-medium italic mb-4">&ldquo;Best mortgage adviser in Birmingham for a first-time buyer&rdquo;</p>
            <p className="text-gray-700 mb-2">AI systems do not browse websites live.</p>
            <p className="text-gray-700 mb-4">They rely on structured, pre-processed data.</p>
            <p className="text-gray-700 mb-2">Firms that get recommended consistently have:</p>
            <div className="space-y-3 mb-4">
              <div className="flex gap-3">
                <span className="font-bold text-[#1B4F72]">1.</span>
                <div><strong className="text-gray-900">Crawlable website</strong> <span className="text-gray-600">&mdash; Accessible and indexable</span></div>
              </div>
              <div className="flex gap-3">
                <span className="font-bold text-[#1B4F72]">2.</span>
                <div><strong className="text-gray-900">Structured schema data</strong> <span className="text-gray-600">&mdash; FCA credentials, services, lender panels, and location clearly defined</span></div>
              </div>
              <div className="flex gap-3">
                <span className="font-bold text-[#1B4F72]">3.</span>
                <div><strong className="text-gray-900">Third-party validation</strong> <span className="text-gray-600">&mdash; FCA register, review platforms, and trusted directories</span></div>
              </div>
            </div>
            <p className="text-gray-700">Most Birmingham firms fail at the first step. They have no website at all.</p>
          </section>

          {/* The Hidden Gap */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">The Hidden Gap</h2>
            <p className="text-gray-700 mb-4">TendorAI&apos;s wider dataset shows:</p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-[#1B4F72] text-white">
                    <th className="p-3 text-left font-semibold">Vertical</th>
                    <th className="p-3 text-left font-semibold">Firms</th>
                    <th className="p-3 text-left font-semibold">No Website</th>
                    <th className="p-3 text-left font-semibold">Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {verticalData.map((row, i) => (
                    <tr key={i} className={`${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'} ${row.vertical === 'Mortgage Advisers' ? 'ring-2 ring-[#1B4F72] ring-inset' : ''}`}>
                      <td className="p-3 text-gray-900 font-medium">{row.vertical === 'Mortgage Advisers' ? <strong>{row.vertical}</strong> : row.vertical}</td>
                      <td className="p-3 text-gray-700">{row.firms}</td>
                      <td className="p-3 text-red-600 font-medium">{row.noWebsite}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${parseInt(row.rate) >= 40 ? 'bg-red-100 text-red-700' : parseInt(row.rate) >= 15 ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>{row.rate}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-gray-700 mb-2">Mortgage advisers sit near the bottom &mdash; only office equipment suppliers fare worse.</p>
            <p className="text-gray-700">Accountants have near-universal web presence. Mortgage advisers do not even have a website in half of cases.</p>
          </section>

          {/* What AI-Recommended Firms Are Doing Differently */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">What AI-Recommended Firms Are Doing Differently</h2>
            <p className="text-gray-700 mb-4">Analysis of mortgage adviser firms appearing in AI recommendations shows consistent patterns:</p>
            <div className="space-y-4">
              <div className="flex gap-3">
                <span className="font-bold text-[#1B4F72]">1.</span>
                <div><strong className="text-gray-900">Declared FCA credentials</strong> <span className="text-gray-600">&mdash; FCA reference number, authorisation type, CeMAP qualifications, and whole-of-market status structured clearly</span></div>
              </div>
              <div className="flex gap-3">
                <span className="font-bold text-[#1B4F72]">2.</span>
                <div><strong className="text-gray-900">Service clarity</strong> <span className="text-gray-600">&mdash; First-time buyer, remortgage, buy-to-let, equity release &mdash; defined as entities, not paragraphs</span></div>
              </div>
              <div className="flex gap-3">
                <span className="font-bold text-[#1B4F72]">3.</span>
                <div><strong className="text-gray-900">Lender panel and market access</strong> <span className="text-gray-600">&mdash; Whole-of-market status and panel size (50&ndash;90 lenders) declared in machine-readable format</span></div>
              </div>
              <div className="flex gap-3">
                <span className="font-bold text-[#1B4F72]">4.</span>
                <div><strong className="text-gray-900">Precise location data</strong> <span className="text-gray-600">&mdash; City, postcode, and coverage areas machine-readable</span></div>
              </div>
            </div>
            <p className="text-gray-700 mt-4">These signals allow AI to move from:<br /><span className="text-gray-900 font-semibold">&ldquo;possible result&rdquo; &rarr; &ldquo;confident recommendation&rdquo;</span></p>
          </section>

          {/* What This Means */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">What This Means for Birmingham Mortgage Advisers</h2>
            <p className="text-gray-700 mb-4">Three shifts are already underway:</p>
            <div className="space-y-4">
              <div className="flex gap-3">
                <span className="font-bold text-[#1B4F72]">1.</span>
                <div><strong className="text-gray-900">From search results to recommendations</strong> <span className="text-gray-600">&mdash; AI returns a small number of named firms</span></div>
              </div>
              <div className="flex gap-3">
                <span className="font-bold text-[#1B4F72]">2.</span>
                <div><strong className="text-gray-900">From keywords to entities</strong> <span className="text-gray-600">&mdash; Firms are evaluated based on FCA credentials and structured identity, not content</span></div>
              </div>
              <div className="flex gap-3">
                <span className="font-bold text-[#1B4F72]">3.</span>
                <div><strong className="text-gray-900">From visibility to selection</strong> <span className="text-gray-600">&mdash; Having a website is no longer enough &mdash; you must be chosen</span></div>
              </div>
            </div>
          </section>

          {/* The Opportunity */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">The Opportunity</h2>
            <p className="text-gray-700 mb-2">Out of 55 Birmingham mortgage advisers:</p>
            <p className="text-gray-900 font-semibold mb-4">26 have no website. The rest have no structured data. Almost all are invisible to AI.</p>
            <p className="text-gray-700 mb-2">This creates a short-term window where:</p>
            <ul className="space-y-1 mb-4">
              <li className="text-gray-700">&bull; Early adopters gain disproportionate visibility</li>
              <li className="text-gray-700">&bull; AI begins reinforcing the same firms repeatedly</li>
              <li className="text-gray-700">&bull; Late adopters struggle to catch up</li>
            </ul>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <FAQSection />
          </section>

          {/* TendorAI Position */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">The TendorAI Position</h2>
            <p className="text-gray-700 mb-4">TendorAI maintains a structured database of 12,793 regulated UK firms, sourced from SRA, ICAEW, and FCA registers.</p>
            <p className="text-gray-700 mb-4">Each firm has a machine-readable profile.</p>
            <p className="text-gray-700 mb-2">For Pro firms:</p>
            <ul className="space-y-1 mb-4">
              <li className="text-gray-700">&bull; Structured data is installed on their website</li>
              <li className="text-gray-700">&bull; Data remains synchronised automatically</li>
              <li className="text-gray-700">&bull; AI systems can verify and cross-reference information</li>
            </ul>
            <p className="text-gray-700">This enables consistent inclusion in AI-generated recommendations.</p>
          </section>

          {/* CTA */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Check Your Position</h2>
            <p className="text-gray-700 mb-2">If you are a mortgage adviser in Birmingham, the question is simple:</p>
            <p className="text-gray-900 font-semibold text-lg mb-6">Are you being recommended &mdash; or not?</p>
            <Link
              href="/aeo-report"
              className="inline-flex items-center justify-center px-8 py-4 bg-[#1B4F72] text-white font-bold rounded-lg hover:bg-[#164060] transition-colors text-lg"
            >
              Run Your Free AI Visibility Report
            </Link>
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
