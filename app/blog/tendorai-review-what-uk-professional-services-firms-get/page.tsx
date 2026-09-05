import { Metadata } from 'next';
import Link from 'next/link';

const TITLE = 'TendorAI Review: What UK Professional Services Firms Actually Get';
const DESCRIPTION =
  "An honest review of TendorAI — schema installation, AI blog writer, and monthly measurement across ChatGPT, Google AI Overviews and Perplexity. Here's exactly what UK professional services firms receive.";
const CANONICAL =
  'https://www.tendorai.com/blog/tendorai-review-what-uk-professional-services-firms-get';
const PUBLISHED = '2026-03-29';

export const metadata: Metadata = {
  title: `${TITLE} | TendorAI`,
  description: DESCRIPTION,
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
  alternates: {
    canonical: CANONICAL,
  },
  keywords: [
    'TendorAI review',
    'AI visibility platform UK',
    'TendorAI solicitors',
    'TendorAI accountants',
    'AI visibility for professional services',
    'TendorAI vs OtterlyAI',
  ],
};

const faqs = [
  {
    q: 'What is TendorAI?',
    a: 'TendorAI is a UK AI visibility platform built for solicitors, accountants, mortgage advisers, and estate agents. It is the only platform that integrates SRA, FCA, and ICAEW register data to build structured profiles for AI recommendation.',
  },
  {
    q: 'How much does TendorAI cost?',
    a: 'TendorAI offers a free plan and the AI Visibility Growth Programme at \u00a31,499 per month, or \u00a3999 per month as a founding rate for the first 3 solicitor firms, held for 12 months, on an initial three-month term. The free plan includes a directory listing and free AI visibility report. The programme includes schema markup installation, monthly AI measurement, and AI-optimised content.',
  },
  {
    q: 'Does TendorAI actually work?',
    a: "According to TendorAI\u2019s data, firms with properly implemented schema markup are cited in AI responses 3.2 times more often than those without. TendorAI installs schema markup within 48 hours and measures visibility monthly across ChatGPT, Google AI Overviews and Perplexity.",
  },
  {
    q: 'How is TendorAI different from OtterlyAI or Peec AI?',
    a: 'OtterlyAI and Peec AI are monitoring tools \u2014 they track AI visibility but do not fix it. TendorAI installs structured data on your website, connects regulatory register data, and publishes AI-optimised content. It is also the only tool built specifically for UK professional services.',
  },
  {
    q: 'Is TendorAI good for solicitors and accountants?',
    a: "Yes. TendorAI is built from SRA and ICAEW register data. According to TendorAI\u2019s analysis of 8,625 UK solicitors, the average AI visibility score is 28 out of 100. The TendorAI programme installs schema markup within 48 hours and measures visibility monthly across ChatGPT, Google AI Overviews and Perplexity.",
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

export default function TendorAIReviewPage() {
  const today = new Date().toISOString().split('T')[0];

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: TITLE,
    description: DESCRIPTION,
    author: { '@type': 'Organization', name: 'TendorAI', url: 'https://www.tendorai.com' },
    publisher: {
      '@type': 'Organization',
      name: 'TendorAI',
      url: 'https://www.tendorai.com',
      logo: { '@type': 'ImageObject', url: 'https://www.tendorai.com/logo.png' },
    },
    datePublished: PUBLISHED,
    dateModified: today,
    url: CANONICAL,
    mainEntityOfPage: { '@type': 'WebPage', '@id': CANONICAL },
    keywords: ['TendorAI review', 'AI visibility platform UK', 'TendorAI solicitors', 'TendorAI accountants'],
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

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-gradient-to-br from-[#1B4F72] via-[#1a3d5c] to-[#2d1b4e] text-white py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <nav className="text-sm mb-6 text-blue-200">
              <Link href="/" className="hover:text-white">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/blog" className="hover:text-white">Blog</Link>
              <span className="mx-2">/</span>
              <span className="text-white">TendorAI Review</span>
            </nav>

            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 text-sm font-medium rounded-full bg-white/20 text-white">AI Visibility</span>
              <span className="text-blue-200">8 min read</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">{TITLE}</h1>
            <p className="text-sm text-white/70 mb-6">Updated 05/09/2026: TendorAI pricing revised</p>

            <p className="text-lg text-blue-100 leading-relaxed max-w-3xl">{DESCRIPTION}</p>

            <div className="mt-6 flex items-center gap-4 text-sm text-blue-200">
              <span>By TendorAI</span>
              <span>&middot;</span>
              <span>Published 29 March 2026</span>
            </div>
          </div>
        </section>

        {/* Key stat callout */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 -mt-6">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 flex flex-col sm:flex-row items-center gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#1B4F72]">12,793</div>
              <div className="text-sm text-gray-500">UK firms analysed</div>
            </div>
            <div className="h-px sm:h-12 sm:w-px bg-gray-200 w-full sm:w-auto" />
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600">28/100</div>
              <div className="text-sm text-gray-500">average AI visibility score</div>
            </div>
            <div className="h-px sm:h-12 sm:w-px bg-gray-200 w-full sm:w-auto" />
            <div className="text-center">
              <div className="text-4xl font-bold text-amber-600">91%</div>
              <div className="text-sm text-gray-500">no structured data</div>
            </div>
          </div>
        </section>

        {/* Article content */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16">
          {/* Intro */}
          <section className="mb-12">
            <p className="text-lg text-gray-600 leading-relaxed mb-4">
              TendorAI is an AI visibility platform built specifically for UK professional services firms &mdash; solicitors, accountants, mortgage advisers, and estate agents. According to TendorAI&apos;s analysis of 12,793 UK professional services firms, the average AI visibility score is 28 out of 100. 91% have no structured data on their website.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              AI search is already changing how clients find professional services firms. Instead of browsing directories or comparing search results, more users are asking ChatGPT, Gemini, and Perplexity to recommend trusted providers. That creates a new visibility problem. AI assistants recommend only a small number of firms. Most professional services businesses are not being recommended at all.
            </p>
            <p className="text-gray-600 leading-relaxed">
              This is not because firms lack expertise. It is because their websites and profiles are not structured for AI. This review explains what TendorAI does, what firms actually receive, and whether it makes a measurable difference.
            </p>
          </section>

          {/* What TendorAI Actually Is */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">What TendorAI Actually Is</h2>

            <div className="bg-gray-900 text-white rounded-xl p-6 mb-6">
              <p className="text-sm leading-relaxed text-gray-200">
                <strong className="text-white">TendorAI is not a monitoring-only tool.</strong> Most AI visibility platforms tell you there is a problem. TendorAI fixes it. Firms that only monitor their AI visibility without fixing the underlying structured data problem see no improvement in recommendation frequency.
              </p>
            </div>

            <p className="text-gray-600 leading-relaxed mb-4">
              Monitoring tools show whether AI assistants recommend your firm. TendorAI focuses on helping AI assistants <em>understand</em> and recommend your firm.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              AI assistants rely on three core signals before recommending professional services firms: structured schema markup, verified regulatory data, and consistent citations across trusted sources.
            </p>
            <p className="text-gray-600 leading-relaxed">
              TendorAI installs schema markup directly on your website. It connects your regulatory data from the SRA, FCA, and ICAEW. It then measures your visibility monthly across ChatGPT, Google AI Overviews and Perplexity. This approach focuses on fixing visibility, not just measuring it.
            </p>
          </section>

          {/* Free Plan */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">What Firms Receive on the Free Plan</h2>

            <p className="text-gray-600 leading-relaxed mb-4">
              The TendorAI free plan is designed to make firms visible to AI assistants even before upgrading. Firms on the free plan are listed in the TendorAI directory, which AI platforms including ChatGPT crawl as a source when generating recommendations.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              This directory listing is built from regulatory register data where available. For solicitors, this includes SRA data. For accountants, ICAEW and related bodies. For mortgage advisers, FCA data.
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-6">
              <p className="text-sm text-blue-900">
                Directory listings alone improve AI citation frequency for firms with no existing structured data. Most firms running their first AI visibility report discover they are not recommended anywhere &mdash; this creates a baseline for improvement.
              </p>
            </div>

            <p className="text-gray-600 leading-relaxed">
              The free plan includes a basic profile (firm name, services, location, regulatory status) and an{' '}
              <Link href="/ai-visibility-report" className="text-purple-600 hover:text-purple-700 underline">AI visibility report</Link>{' '}
              that covers ChatGPT, Google AI Overviews and Perplexity to show where your firm appears, if at all.
            </p>
          </section>

          {/* Pro Plan */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">What Firms Receive on the TendorAI programme</h2>

            <p className="text-gray-600 leading-relaxed mb-4">
              Everything you need to go from invisible to recommended by AI &mdash; schema installation, content creation, social publishing, and monthly measurement. Agencies charge &pound;1,500&ndash;&pound;3,900/month for this manually. You pay &pound;1,499, or &pound;999 as a founding rate if you are one of the first 3 solicitor firms.
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-8">
              <p className="text-sm text-blue-900">
                TendorAI&apos;s data shows that firms with properly implemented schema markup are cited in AI responses <strong>3.2 times more often</strong> than those without.
              </p>
            </div>

            {/* Schema & Website */}
            <h3 className="text-xl font-bold text-gray-900 mb-3">Schema &amp; Website</h3>
            <ul className="space-y-2 mb-8">
              {[
                'AI-optimised schema markup installed on your website within 48 hours',
                'Auto-sync \u2014 every dashboard update updates your website schema automatically',
                'Fees, accreditations, and practice areas visible to AI',
                'Export your schema any time \u2014 your data stays with you if you ever leave',
                'Done-for-you installation \u2014 just send us your website login',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <svg className="w-4 h-4 text-green-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>

            {/* AI Blog Writer */}
            <h3 className="text-xl font-bold text-gray-900 mb-3">AI Blog Writer</h3>
            <ul className="space-y-2 mb-8">
              {[
                'Write two AI-optimised blog posts per week automatically',
                'Enter a topic, Claude writes it in TendorAI format \u2014 the structure AI loves to cite',
                'One click publishes to your TendorAI profile',
                'LinkedIn and Facebook copy \u2014 post in one click from your dashboard',
                'Blog content published to your TendorAI profile page and ready to share on LinkedIn and Facebook',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <svg className="w-4 h-4 text-green-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>

            {/* Tracking & Visibility */}
            <h3 className="text-xl font-bold text-gray-900 mb-3">Tracking &amp; Visibility</h3>
            <ul className="space-y-2 mb-8">
              {[
                'Monthly AI visibility measurement across ChatGPT, Google AI Overviews and Perplexity',
                'Email alert when any AI platform recommends you \u2014 ChatGPT, Google AI Overviews or Perplexity',
                'Monthly AI Visibility Score with trend tracking',
                'Competitor comparison \u2014 see who AI recommends instead',
                'Profile gaps report \u2014 exact fields missing and why they matter',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <svg className="w-4 h-4 text-green-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>

            {/* Directory & Profile */}
            <h3 className="text-xl font-bold text-gray-900 mb-3">Directory &amp; Profile</h3>
            <ul className="space-y-2 mb-8">
              {[
                'Ranked above free profiles in TendorAI directory',
                'TendorAI Verified badge on your profile',
                'Pre-built profile from SRA, ICAEW, or FCA register data',
                'Unlimited products and services listed',
                'Team members with individual specialisms',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <svg className="w-4 h-4 text-green-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>

            {/* Reports & Support */}
            <h3 className="text-xl font-bold text-gray-900 mb-3">Reports &amp; Support</h3>
            <ul className="space-y-2 mb-6">
              {[
                'Monthly AI Visibility Report emailed to the firm',
                '10-point Website AI Audit with fix guides',
                'Google Business Profile optimisation checklist',
                'Priority support',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <svg className="w-4 h-4 text-green-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-6">
              <p className="text-sm text-amber-800">
                <strong className="text-amber-900">If you cancel,</strong> the AI visibility code stops working. But you can export your schema file and self-host it &mdash; your data stays yours.
              </p>
            </div>
          </section>

          {/* The Data */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">The Data Behind TendorAI</h2>

            <p className="text-gray-600 leading-relaxed mb-4">
              TendorAI&apos;s approach is based on large-scale analysis of UK professional services firms. Of 8,625 SRA-registered solicitors analysed, the average AI visibility score is 28 out of 100. Not a single firm scored above 60. 1,458 SRA-registered law firms have no website at all &mdash; making them completely invisible to ChatGPT, Gemini, and Perplexity.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              The same pattern exists across other regulated sectors. Accountancy firms, mortgage advisers regulated by the FCA, and estate agents all show similar trends &mdash; strong credentials but weak AI visibility.
            </p>

            <div className="bg-gray-900 text-white rounded-xl p-6">
              <p className="text-sm leading-relaxed text-gray-200">
                TendorAI&apos;s weekly scans across ChatGPT, Perplexity, Claude, Gemini, Copilot, and Meta AI provide the largest dataset of UK professional services AI visibility data available. The findings are consistent: <strong className="text-white">structured data, regulatory verification, and consistent citations are the strongest signals.</strong>
              </p>
            </div>
          </section>

          {/* Comparison */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">How TendorAI Compares to Monitoring-Only Tools</h2>

            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="rounded-xl border-2 border-red-200 bg-red-50 p-5">
                <h3 className="font-bold text-gray-900 mb-2">Monitoring tools (Peec AI, OtterlyAI)</h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>&bull; Show whether your firm is recommended</li>
                  <li>&bull; Do not fix the underlying visibility issues</li>
                  <li>&bull; No structured data installation</li>
                  <li>&bull; No regulatory data integration</li>
                </ul>
              </div>
              <div className="rounded-xl border-2 border-green-200 bg-green-50 p-5">
                <h3 className="font-bold text-gray-900 mb-2">TendorAI</h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>&bull; Installs structured data on your website</li>
                  <li>&bull; Connects SRA, FCA, ICAEW register data</li>
                  <li>&bull; Publishes AI-optimised content</li>
                  <li>&bull; Measures visibility monthly across ChatGPT, Google AI Overviews and Perplexity</li>
                </ul>
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed">
              For firms that have already used a monitoring tool and seen the problem but not fixed it, TendorAI is the next step. You can{' '}
              <Link href="/blog/best-ai-visibility-tools-uk-professional-services" className="text-purple-600 hover:text-purple-700 underline">compare tools here</Link>.
            </p>
          </section>

          {/* Who It's For */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Who TendorAI Is Built For</h2>

            <p className="text-gray-600 leading-relaxed mb-4">
              TendorAI is designed specifically for regulated UK professional services: solicitors registered with the SRA, accountants registered with ICAEW, mortgage advisers regulated by the FCA, and estate agents registered with NAEA Propertymark and The Property Ombudsman.
            </p>
            <p className="text-gray-600 leading-relaxed">
              UK professional services firms in regulated sectors have a significant advantage &mdash; their regulatory register data is already trusted by AI platforms as a verification source. TendorAI connects that data to your online presence automatically.{' '}
              <Link href="/how-it-works" className="text-purple-600 hover:text-purple-700 underline">Learn how it works</Link>.
            </p>
          </section>

          {/* Honest Assessment */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">The Honest Assessment</h2>

            <p className="text-gray-600 leading-relaxed mb-4">
              TendorAI is focused on a specific problem: helping UK professional services firms become visible to AI assistants. It is not a general marketing platform. It is UK-only and focused on professional services &mdash; not suitable for retail, e-commerce, or international firms.
            </p>
            <p className="text-gray-600 leading-relaxed">
              For UK solicitors, accountants, mortgage advisers, and estate agents who want to be recommended by AI rather than just tracked, TendorAI is the most focused option available. No other tool integrates SRA, FCA, and ICAEW register data to build structured profiles for AI recommendation.
            </p>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <FAQSection />
          </section>

          {/* CTA */}
          <section className="bg-gradient-to-br from-[#1B4F72] to-[#2d1b4e] text-white rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Run Your Free AI Visibility Report</h2>
            <p className="text-blue-100 mb-8 max-w-xl mx-auto">
              See exactly what ChatGPT, Perplexity, Claude, Gemini, Copilot, and Meta AI say about your firm. Free report, no card required.
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

          {/* Author / date */}
          <div className="mt-12 pt-8 border-t border-gray-200 flex items-center justify-between">
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
