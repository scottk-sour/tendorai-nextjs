import { Metadata } from 'next';
import Link from 'next/link';

const TITLE = 'Does Structured Data Actually Help With AI Visibility?';
const DESCRIPTION =
  "Yes — firms with structured data are cited 3.2x more often in AI responses. TendorAI's analysis of 12,793 UK firms shows exactly what structured data does for AI visibility and why most firms are invisible without it.";
const CANONICAL =
  'https://www.tendorai.com/blog/does-structured-data-help-ai-visibility';
const PUBLISHED = '2026-03-30';

export const metadata: Metadata = {
  title: `${TITLE} | TendorAI`,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: 'article',
    publishedTime: PUBLISHED,
    authors: ['Scott Davies'],
    url: CANONICAL,
    siteName: 'TendorAI',
    images: [{ url: '/logo.png', width: 873, height: 873 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
  alternates: {
    canonical: CANONICAL,
  },
  keywords: [
    'structured data AI visibility',
    'schema markup AI',
    'does schema help ChatGPT',
    'AI visibility structured data',
    'UK professional services AI',
  ],
};

const faqs = [
  {
    q: 'Does adding schema markup guarantee AI will recommend my business?',
    a: "No \u2014 and anyone who tells you it does is wrong. Structured data makes your business readable and verifiable to AI. What AI does with that information depends on the query, the competition, and how complete your entity profile is. What structured data guarantees is that AI can consider you. Without it, AI cannot recommend you with confidence regardless of how good your business is.",
  },
  {
    q: 'Does my Google ranking affect whether AI recommends me?',
    a: "Partially. AI platforms use web signals including domain authority, which correlates with Google ranking. But a firm ranked on page one of Google for a keyword can be completely absent from ChatGPT\u2019s answer to the same question. Google ranks pages. AI recommends entities. Structured data is the primary mechanism for entity verification \u2014 it works independently of keyword rankings.",
  },
  {
    q: 'What is the most important schema field for a UK solicitor?',
    a: 'The SRA number. It is the verifiable regulatory credential that confirms to AI the firm is a real, regulated, practising solicitor. Without it, AI treats the firm as an unverified business. With it, AI can confirm regulatory status, which is the primary trust signal for professional services recommendations.',
  },
  {
    q: 'How do I know if my website already has structured data?',
    a: "Go to Google\u2019s Rich Results Test \u2014 search.google.com/test/rich-results \u2014 and enter your website URL. It will show any structured data currently installed and flag errors. Alternatively, run your firm through TendorAI\u2019s free AI visibility report at tendorai.com/ai-visibility-report \u2014 it shows your current AI Visibility Score and whether schema is installed and correctly configured.",
  },
  {
    q: 'Does structured data help with Google as well as AI?',
    a: 'Yes. Schema markup is a Google-recommended best practice that can improve rich results in Google Search \u2014 star ratings, FAQ sections, business information panels. Installing structured data for AI visibility simultaneously improves your Google presence. It does not hurt existing rankings. It is additive.',
  },
  {
    q: 'How is TendorAI different from just adding schema myself?',
    a: "TendorAI installs the correct vertical-specific schema for your firm \u2014 LegalService, AccountingService, FinancialService, or RealEstateAgent \u2014 with your regulatory credentials, services, fees, and accreditations structured correctly. It auto-syncs every time you update your dashboard, so your schema stays current without developer involvement. It also tracks weekly whether AI is actually citing you, so you can see the impact over time rather than guessing.",
  },
];

function FAQSection() {
  return (
    <div className="space-y-4">
      {faqs.map((faq, i) => (
        <details key={i} className="group bg-white border border-gray-200 rounded-lg">
          <summary className="flex items-center justify-between cursor-pointer p-5 text-left">
            <h3 className="font-medium text-gray-900 pr-4">{faq.q}</h3>
            <svg className="w-5 h-5 text-gray-400 shrink-0 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
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

export default function StructuredDataAIVisibilityPage() {
  const today = new Date().toISOString().split('T')[0];

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': CANONICAL,
    headline: TITLE,
    description: DESCRIPTION,
    author: { '@type': 'Person', name: 'Scott Davies' },
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
    articleSection: 'AI Visibility',
    keywords: ['structured data', 'schema markup', 'AI visibility', 'AI visibility', 'UK professional services'],
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
      { '@type': 'ListItem', position: 2, name: 'Resources', item: 'https://www.tendorai.com/resources' },
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
              <Link href="/resources" className="hover:text-white">Resources</Link>
              <span className="mx-2">/</span>
              <span className="text-white">Structured Data &amp; AI Visibility</span>
            </nav>

            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 text-sm font-medium rounded-full bg-white/20 text-white">AI Visibility</span>
              <span className="text-blue-200">8 min read</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">{TITLE}</h1>

            <p className="text-lg text-blue-100 leading-relaxed max-w-3xl">{DESCRIPTION}</p>

            <div className="mt-6 flex items-center gap-4 text-sm text-blue-200">
              <span>By Scott Davies</span>
              <span>&middot;</span>
              <span>Published 30 March 2026</span>
            </div>
          </div>
        </section>

        {/* Key stat callout */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 -mt-6">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 flex flex-col sm:flex-row items-center gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#1B4F72]">3.2x</div>
              <div className="text-sm text-gray-500">more AI citations</div>
            </div>
            <div className="h-px sm:h-12 sm:w-px bg-gray-200 w-full sm:w-auto" />
            <div className="text-center sm:text-left">
              <p className="text-gray-700 text-sm leading-relaxed">
                Firms with properly implemented structured data are cited in AI responses <strong>3.2 times more often</strong> than those without. Based on TendorAI&apos;s analysis of 12,793 UK professional services firms.
              </p>
            </div>
          </div>
        </section>

        {/* Article content */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16">
          {/* Intro */}
          <section className="mb-12">
            <p className="text-lg text-gray-600 leading-relaxed mb-4">
              Structured data is not a technical nicety. It is the difference between AI being able to recommend your firm with confidence and AI guessing &mdash; or ignoring you entirely. Most UK businesses have no structured data in place. That is not a disadvantage. It is an opportunity.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Here is exactly what structured data does, why it matters for AI specifically, and what happens when you do not have it.
            </p>
          </section>

          {/* What Structured Data Is */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">What Structured Data Actually Is</h2>

            <p className="text-gray-600 leading-relaxed mb-4">
              <strong className="text-gray-900">Structured data is machine-readable information added to your website that tells AI exactly who you are, what you do, and why you are credible.</strong>
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Your website was built for humans. A human reads your homepage and understands you are a conveyancing solicitor in Cardiff who charges &pound;895 for a standard residential transaction, holds CQS accreditation, and has been trading for 12 years. An AI platform cannot reliably extract that information from human-readable text. It has to guess.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Schema.org markup &mdash; added as JSON-LD code in your website&apos;s head &mdash; changes that. Instead of AI guessing what your business does, it reads a structured file that states: entity type LegalService, SRA number 123456, practice areas conveyancing and family law, fee range &pound;895 to &pound;1,500, location Cardiff, accreditation CQS. No guessing. No gaps. No errors.
            </p>
          </section>

          {/* Why AI Needs It */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Why AI Specifically Needs Structured Data</h2>

            <div className="bg-gray-900 text-white rounded-xl p-6 mb-6">
              <p className="text-sm leading-relaxed text-gray-200">
                <strong className="text-white">Google and AI platforms are not the same system.</strong> Ranking on Google does not mean AI can recommend you. Google crawls pages and ranks them by relevance and authority. AI platforms &mdash; ChatGPT, Perplexity, Gemini, Claude &mdash; try to identify and verify entities.
              </p>
            </div>

            <p className="text-gray-600 leading-relaxed mb-4">
              An entity is a real-world thing: a specific business, with a specific address, specific credentials, specific services. AI needs to be confident that an entity is real and trustworthy before it recommends it by name.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Structured data is how you confirm your entity to AI. Without it, AI has to piece together fragments from your website, your Google Business Profile, your Companies House entry, and various directory listings &mdash; and hope they are consistent. According to TendorAI&apos;s tracking data, 40% of UK professional services firms have at least one NAP inconsistency across platforms. When AI finds conflicting information, it reduces recommendation confidence. When it finds a verified, structured, consistent entity profile, it recommends with confidence.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-[#1B4F72] text-white">
                    <th className="p-3 text-left font-semibold">Without Structured Data</th>
                    <th className="p-3 text-left font-semibold">With Structured Data</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['AI guesses your services from page text', 'AI reads your exact service list'],
                    ['Credentials unverified', 'SRA/ICAEW/FCA number confirmed'],
                    ['Fees unknown', 'Fee ranges indexed and citable'],
                    ['Address may conflict across sources', 'NAP consistent and machine-readable'],
                    ['Recommendation confidence low', 'Recommendation confidence high'],
                    ['Cited 1x in AI responses', 'Cited 3.2x more often'],
                  ].map(([without, withData], i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="p-3 text-red-700">{without}</td>
                      <td className="p-3 text-green-700 font-medium">{withData}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* What the Data Shows */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">What the Data Shows</h2>

            <p className="text-gray-600 leading-relaxed mb-4">
              <strong className="text-gray-900">TendorAI runs weekly AI visibility scans across 12,793 UK professional services firms. The pattern is consistent.</strong>
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Firms with complete structured data profiles &mdash; schema markup installed, regulatory credentials verified, services and fees structured &mdash; appear in AI responses at an average position of 2.1. Firms without structured data appear at an average position of 6.4 when they appear at all. Most do not appear.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              The average AI Visibility Score across all tracked firms is 28 out of 100. Firms that have completed schema installation move to between 55 and 70 within 90 days. The ceiling is not technical &mdash; it is content. The firms scoring above 70 have schema plus regular structured content that AI can cite.
            </p>

            <div className="space-y-4">
              {[
                { stat: '91%', desc: 'of UK solicitors have no structured data on their website \u2014 meaning 9% of firms are competing for AI recommendations while 91% are invisible by default' },
                { stat: '3.2x', desc: 'more often \u2014 firms with schema markup are cited 3.2 times more often in AI responses than those without, based on TendorAI\u2019s tracking dataset' },
                { stat: '2\u20133 weeks', desc: 'Perplexity updates fastest \u2014 typically reflecting new structured data within 2 to 3 weeks. ChatGPT takes longer. The compounding effect builds over 90 days' },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start bg-white border border-gray-200 rounded-xl p-5">
                  <div className="text-2xl font-bold text-[#1B4F72] shrink-0 w-20 text-center">{item.stat}</div>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Schema Types */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">The Specific Schema Types That Move the Needle for UK Firms</h2>

            <p className="text-gray-600 leading-relaxed mb-6">
              <strong className="text-gray-900">Generic LocalBusiness schema is not enough. AI looks for entity-specific types with UK-relevant fields.</strong> The schema type determines what fields AI expects to find. A firm using generic LocalBusiness schema is telling AI it is a local business. A firm using LegalService schema with an SRA number, practice areas, and fee transparency data is telling AI it is a verified, regulated solicitor in a specific location with specific credentials.
            </p>

            <div className="space-y-4">
              {[
                { type: 'Solicitors', schema: 'LegalService', fields: 'SRA number, practice areas, fee ranges, CQS/Lexcel accreditations' },
                { type: 'Accountants', schema: 'AccountingService', fields: 'ICAEW or ACCA number, MTD agent status, software accreditations (Xero, QuickBooks), fee structure' },
                { type: 'Mortgage Advisers', schema: 'FinancialService', fields: 'FCA number, whole-of-market status, lender count, fee model' },
                { type: 'Estate Agents', schema: 'RealEstateAgent', fields: 'Propertymark registration, average sale time, achieved vs asking percentage, management fee' },
              ].map((item, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#1B4F72] flex items-center justify-center text-white font-bold text-xs">
                      {item.type.slice(0, 3)}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">
                        {item.type} &mdash; <code className="bg-purple-50 text-purple-700 px-2 py-0.5 rounded text-sm">{item.schema}</code>
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.fields}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-gray-500 text-sm mt-4">
              Each missing field is a gap in the entity profile that reduces recommendation confidence.
            </p>
          </section>

          {/* What Happens Without It */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">What Happens When Structured Data Is Missing</h2>

            <p className="text-gray-600 leading-relaxed mb-4">
              <strong className="text-gray-900">AI does not fail gracefully. It either recommends a competitor or recommends nobody.</strong>
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              When someone asks ChatGPT for a conveyancing solicitor in Leeds and your firm has no structured data, one of three things happens:
            </p>

            <div className="space-y-3 mb-6">
              {[
                { outcome: 'AI recommends a competitor who does have structured data', severity: 'red' },
                { outcome: 'AI gives a generic response without naming specific firms', severity: 'amber' },
                { outcome: 'AI mentions your firm incorrectly \u2014 wrong address, wrong phone number, wrong practice areas', severity: 'red' },
              ].map((item, i) => (
                <div key={i} className={`flex items-start gap-3 p-4 rounded-xl border ${item.severity === 'red' ? 'border-red-200 bg-red-50' : 'border-amber-200 bg-amber-50'}`}>
                  <span className="text-lg font-bold text-gray-400">{i + 1}</span>
                  <p className={`text-sm ${item.severity === 'red' ? 'text-red-800' : 'text-amber-800'}`}>{item.outcome}</p>
                </div>
              ))}
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p className="text-sm text-amber-800">
                  The third outcome is the most damaging. A potential client asks AI about your firm specifically, gets wrong information, and forms a negative first impression before they have ever contacted you. <strong className="text-amber-900">Structured data does not just help AI recommend you. It controls what AI says about you.</strong>
                </p>
              </div>
            </div>
          </section>

          {/* How Long */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">How Long Does It Take to Work</h2>

            <p className="text-gray-600 leading-relaxed mb-4">
              <strong className="text-gray-900">Structured data is not instant. It compounds.</strong>
            </p>

            <div className="space-y-6 mb-6">
              <div className="border-l-4 border-[#1B4F72] pl-5">
                <h3 className="font-bold text-gray-900 mb-1">Perplexity</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Fastest to reflect new structured data &mdash; typically 2 to 3 weeks after installation.</p>
              </div>
              <div className="border-l-4 border-[#1B4F72] pl-5">
                <h3 className="font-bold text-gray-900 mb-1">ChatGPT &amp; Gemini</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Take longer, often 6 to 8 weeks before significant movement.</p>
              </div>
              <div className="border-l-4 border-[#1B4F72] pl-5">
                <h3 className="font-bold text-gray-900 mb-1">Full compounding effect</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Schema plus consistent content plus verified entity signals across directories &mdash; typically 90 days to show material improvement in AI Visibility Score.</p>
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed">
              The firms that see the fastest results combine three things simultaneously: schema installation on their own website, a complete and verified TendorAI profile, and at least one piece of structured content published in the first 30 days. Content gives AI something to cite. Schema gives AI something to verify. The combination moves faster than either alone.
            </p>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <FAQSection />
          </section>

          {/* Closing */}
          <section className="mb-12">
            <div className="bg-gray-900 text-white rounded-xl p-6">
              <p className="text-sm leading-relaxed text-gray-200">
                <strong className="text-white">Structured data does not make AI recommend you. It makes AI able to recommend you.</strong> Without it, AI is working with fragments, inconsistencies, and guesses. With it, AI has a verified, complete, machine-readable entity profile to work from. The firms AI recommends in 2026 are the firms that gave it something reliable to work with.
              </p>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-gradient-to-br from-[#1B4F72] to-[#2d1b4e] text-white rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Check Whether Your Firm Has Structured Data</h2>
            <p className="text-blue-100 mb-8 max-w-xl mx-auto">
              Free, 30 seconds, no login required. See your AI Visibility Score and whether schema is installed correctly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/ai-visibility-report" className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#1B4F72] font-bold rounded-lg hover:bg-blue-50 transition-colors text-lg">
                Get Your Free AI Visibility Report
              </Link>
              <Link href="/pricing" className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors">
                See the TendorAI programme
              </Link>
            </div>
          </section>

          {/* Source note */}
          <div className="mt-8 text-xs text-gray-400 italic">
            Sources: TendorAI analysis of 12,793 SRA, ICAEW, and FCA-registered firms, March 2026. Citation frequency data from TendorAI AI visibility measurement across ChatGPT, Google AI Overviews and Perplexity.
          </div>

          {/* Author / date */}
          <div className="mt-8 pt-8 border-t border-gray-200 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Published {new Date(PUBLISHED).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} by Scott Davies
            </p>
            <Link href="/resources" className="text-sm text-purple-600 hover:text-purple-700 font-medium">
              &larr; Back to Resources
            </Link>
          </div>
        </article>
      </main>
    </>
  );
}
