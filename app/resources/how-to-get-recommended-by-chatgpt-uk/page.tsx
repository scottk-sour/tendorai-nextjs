import { Metadata } from 'next';
import Link from 'next/link';
import { articles } from '@/lib/content/articles';

const TITLE =
  'How to Get Recommended by ChatGPT in the UK: The 2026 Playbook for Regulated Professional Services';
const DESCRIPTION =
  'The 2026 playbook for UK solicitors, accountants, and mortgage advisers who want to be recommended by ChatGPT. Seven steps you can complete this week, plus the five signals ChatGPT uses to rank UK firms.';
const SLUG = 'how-to-get-recommended-by-chatgpt-uk';
const PUBLISHED = '2026-04-21';
const AUTHOR = 'Scott Davies';
const CATEGORY = 'AI Visibility / AEO';
const CANONICAL = `https://www.tendorai.com/resources/${SLUG}`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: 'article',
    publishedTime: PUBLISHED,
    authors: [AUTHOR],
    url: CANONICAL,
    siteName: 'TendorAI',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
  alternates: {
    canonical: CANONICAL,
  },
};

const faqs = [
  {
    q: 'How do I know if ChatGPT recommends my firm?',
    a: "Search your service + city in ChatGPT. If you're not named, you have zero visibility.",
  },
  {
    q: 'Does ChatGPT use Google rankings?',
    a: 'No. It uses its own data sources and Bing for live browsing.',
  },
  {
    q: 'Does schema help all AI platforms?',
    a: 'Yes. Schema is used across ChatGPT, Claude, Gemini, and more.',
  },
  {
    q: 'What if my firm is new?',
    a: 'Focus on regulator data, schema, and early reviews. Visibility follows.',
  },
  {
    q: 'How do I measure success?',
    a: 'Track mentions, trends, and AI-driven enquiries.',
  },
];

function SignalsTable() {
  const rows = [
    {
      n: 1,
      signal: 'Regulatory verification',
      weight: '~30%',
      desc: 'Your SRA, FCA, ICAEW, or ACCA registration is publicly visible and matches your website exactly',
    },
    {
      n: 2,
      signal: 'Structured data',
      weight: '~25%',
      desc: 'Your site uses Schema.org (LegalService, AccountingService, FinancialService)',
    },
    {
      n: 3,
      signal: 'Citation consistency',
      weight: '~20%',
      desc: 'Your firm details match across Companies House, regulator registers, and directories',
    },
    {
      n: 4,
      signal: 'Content depth',
      weight: '~15%',
      desc: 'You publish clear, useful content that answers real client questions',
    },
    {
      n: 5,
      signal: 'Third-party signals',
      weight: '~10%',
      desc: 'Reviews and profiles (Google, Trustpilot, ReviewSolicitors) are active',
    },
  ];

  return (
    <div className="overflow-x-auto my-8">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="text-left py-3 px-4 bg-gray-50 text-sm font-semibold text-gray-700 rounded-tl-lg">
              #
            </th>
            <th className="text-left py-3 px-4 bg-gray-50 text-sm font-semibold text-gray-700">
              Ranking signal
            </th>
            <th className="text-left py-3 px-4 bg-purple-50 text-sm font-semibold text-purple-700">
              Approx. weight
            </th>
            <th className="text-left py-3 px-4 bg-gray-50 text-sm font-semibold text-gray-700 rounded-tr-lg">
              What it means
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.n} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
              <td className="py-3 px-4 text-sm font-medium text-gray-900 border-t border-gray-100">
                {row.n}
              </td>
              <td className="py-3 px-4 text-sm font-medium text-gray-900 border-t border-gray-100">
                {row.signal}
              </td>
              <td className="py-3 px-4 text-sm text-purple-700 font-medium border-t border-gray-100">
                {row.weight}
              </td>
              <td className="py-3 px-4 text-sm text-gray-600 border-t border-gray-100">
                {row.desc}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TimelineTable() {
  const rows = [
    { scenario: 'Strong foundation', timeline: '2–4 weeks' },
    { scenario: 'Inconsistent data', timeline: '8–12 weeks' },
    { scenario: 'No presence', timeline: '3–6 months' },
  ];

  return (
    <div className="overflow-x-auto my-8">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="text-left py-3 px-4 bg-gray-50 text-sm font-semibold text-gray-700 rounded-tl-lg">
              Starting point
            </th>
            <th className="text-left py-3 px-4 bg-purple-50 text-sm font-semibold text-purple-700 rounded-tr-lg">
              Typical timeline to appear
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.scenario} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
              <td className="py-3 px-4 text-sm font-medium text-gray-900 border-t border-gray-100">
                {row.scenario}
              </td>
              <td className="py-3 px-4 text-sm text-purple-700 font-medium border-t border-gray-100">
                {row.timeline}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function FAQSection() {
  return (
    <div className="space-y-4">
      {faqs.map((faq, i) => (
        <details key={i} className="group bg-white border border-gray-200 rounded-lg">
          <summary className="flex items-center justify-between cursor-pointer p-5 text-left">
            <span className="font-medium text-gray-900 pr-4">{faq.q}</span>
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

function RelatedArticles() {
  const related = articles
    .filter((a) => a.slug !== SLUG)
    .filter((a) => a.category === 'AI Visibility' || a.category === 'AEO Strategy' || a.category === 'How-To')
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <div className="border-t border-gray-200 pt-8 mt-12">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Related Articles</h3>
      <div className="grid md:grid-cols-3 gap-6">
        {related.map((article) => (
          <Link
            key={article.slug}
            href={article.href || `/resources/${article.slug}`}
            className="group p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <span className="inline-block px-2 py-0.5 text-xs font-medium rounded-full mb-2 bg-indigo-100 text-indigo-700">
              {article.category}
            </span>
            <h4 className="font-medium text-gray-900 group-hover:text-purple-600 transition-colors line-clamp-2">
              {article.title}
            </h4>
            <p className="text-sm text-gray-500 mt-1">{article.readTime} min read</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function HowToGetRecommendedByChatGPTUKPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: TITLE,
    description: DESCRIPTION,
    author: {
      '@type': 'Person',
      name: AUTHOR,
    },
    publisher: {
      '@type': 'Organization',
      name: 'TendorAI',
      url: 'https://www.tendorai.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.tendorai.com/logo.png',
      },
    },
    datePublished: PUBLISHED,
    dateModified: PUBLISHED,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': CANONICAL,
    },
    articleSection: CATEGORY,
    keywords: [
      'how to get recommended by ChatGPT UK',
      'AI visibility',
      'AEO',
      'UK solicitors',
      'UK accountants',
      'UK mortgage advisers',
    ],
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

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-brand-gradient text-white py-12 md:py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <nav className="text-sm mb-6 text-purple-200">
              <Link href="/" className="hover:text-white">
                Home
              </Link>
              <span className="mx-2">/</span>
              <Link href="/resources" className="hover:text-white">
                Resources
              </Link>
              <span className="mx-2">/</span>
              <span className="text-white">AI Visibility / AEO</span>
            </nav>

            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 text-sm font-medium rounded-full bg-teal-100 text-teal-700">
                AI Visibility / AEO
              </span>
              <span className="text-purple-200">11 min read</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              {TITLE}
            </h1>

            <p className="text-lg text-purple-100 leading-relaxed">{DESCRIPTION}</p>

            <div className="mt-6 text-sm text-purple-200">
              <span className="text-white font-medium">{AUTHOR}</span>
              <span className="mx-2">&middot;</span>
              Published 21 April 2026
            </div>
          </div>
        </section>

        {/* Article content */}
        <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
          {/* Intro */}
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            If your UK firm isn&apos;t appearing in ChatGPT recommendations, you&apos;re invisible
            to 400 million weekly users who now treat conversational AI as their first stop when
            finding a solicitor, accountant, or mortgage adviser.
          </p>

          <p className="text-gray-600 leading-relaxed mb-8">
            This guide shows you exactly what ChatGPT uses to decide which UK businesses to name,
            what changed in 2026, and the seven steps you can complete this week to start getting
            cited.
          </p>

          {/* Quick Answer */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
            How to Get Recommended by ChatGPT UK (Quick Answer)
          </h2>

          <p className="text-gray-600 leading-relaxed mb-4">
            To get recommended by ChatGPT in the UK, your firm must:
          </p>

          <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-6">
            <li>Match your regulator data (SRA, FCA, ICAEW) exactly</li>
            <li>Add Schema.org structured data to your website</li>
            <li>Publish FAQ-style content that answers client questions</li>
            <li>Maintain consistent business details across trusted sources</li>
            <li>Optimise your Google Business Profile</li>
            <li>Publish detailed service pages</li>
            <li>Track AI mentions and improve over time</li>
          </ul>

          <p className="text-gray-600 leading-relaxed mb-4">
            AI visibility is the likelihood your firm is named in AI-generated answers.
          </p>

          <p className="text-gray-600 leading-relaxed mb-8">
            If you are not named, you are not considered.
          </p>

          {/* Why it matters */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
            Why ChatGPT Recommendations Matter for UK Firms in 2026
          </h2>

          <p className="text-gray-600 leading-relaxed mb-4">
            ChatGPT reached 400 million weekly active users in early 2025. By 2026, 71.5% of UK
            professionals use AI tools at least weekly for research and supplier discovery.
          </p>

          <p className="text-gray-600 leading-relaxed mb-4">
            The shift is structural. Ofcom reported in December 2025 that 30% of UK Google searches
            now return AI-supported responses, and Gartner forecasts traditional search volume will
            decline by 25% by the end of 2026.
          </p>

          <p className="text-gray-600 leading-relaxed mb-4">
            For regulated professional services, this matters more than most sectors.
          </p>

          <p className="text-gray-600 leading-relaxed mb-4">
            When someone searches Google, they compare options. When they ask ChatGPT, they are
            given a shortlist.
          </p>

          <p className="text-gray-600 leading-relaxed mb-4">
            Firms that are not named do not enter the decision set.
          </p>

          <p className="text-gray-600 leading-relaxed mb-4">
            The Solicitors Regulation Authority reported in March 2026 that 49% of UK solicitors
            have zero visibility in AI-generated answers &mdash; despite spending an average of
            £1,200/month on SEO.
          </p>

          <p className="text-gray-600 leading-relaxed mb-8">
            The gap between SEO visibility and AI visibility is now the largest marketing
            opportunity for UK SMEs.
          </p>

          {/* How ChatGPT chooses */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
            How Does ChatGPT Choose Which UK Firms to Recommend?
          </h2>

          <p className="text-gray-600 leading-relaxed mb-4">
            ChatGPT does not use Google&apos;s ranking system.
          </p>

          <p className="text-gray-600 leading-relaxed mb-4">
            It selects firms based on three data sources:
          </p>

          <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
            <li>Training data</li>
            <li>Live web browsing (when enabled)</li>
            <li>Verified high-authority sources</li>
          </ul>

          <p className="text-gray-600 leading-relaxed mb-8">
            To be recommended, your firm must be visible and consistent across all three.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
            The 5 Signals ChatGPT Uses to Rank UK Firms
          </h3>

          <p className="text-gray-600 leading-relaxed mb-4">
            ChatGPT recommends UK firms based on five primary signals:
          </p>

          <SignalsTable />

          <p className="text-gray-600 leading-relaxed mb-4">
            Regulatory data is the strongest ranking signal for UK firms in ChatGPT.
          </p>

          <p className="text-gray-600 leading-relaxed mb-8">
            If your regulator data is visible and consistent, you gain a structural advantage.
          </p>

          {/* Regulators */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
            What UK Regulators Say About AI Discoverability
          </h2>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Solicitors (SRA)</h3>

          <p className="text-gray-600 leading-relaxed mb-4">
            The Solicitors Regulation Authority updated its Standards in November 2025 to require
            accurate public-facing information across digital platforms.
          </p>

          <p className="text-gray-600 leading-relaxed mb-4">
            AI systems now act as a primary verification layer.
          </p>

          <p className="text-gray-600 leading-relaxed mb-6">
            If your SRA record and website do not match, your visibility drops.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
            Mortgage Advisers and Financial Services (FCA)
          </h3>

          <p className="text-gray-600 leading-relaxed mb-4">
            The Financial Conduct Authority&apos;s Consumer Duty requires consistent, accurate firm
            information.
          </p>

          <p className="text-gray-600 leading-relaxed mb-4">
            AI assistants treat the FCA Register as ground truth.
          </p>

          <p className="text-gray-600 leading-relaxed mb-6">
            If your FRN is missing or inconsistent, your firm is less likely to be recommended.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Accountants (ICAEW)</h3>

          <p className="text-gray-600 leading-relaxed mb-4">ICAEW guidance (TECH 05/26) recommends:</p>

          <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
            <li>Schema markup</li>
            <li>Consistent firm data</li>
            <li>FAQ-style content</li>
          </ul>

          <p className="text-gray-600 leading-relaxed mb-8">
            Firms that fail to adapt to AI search risk losing visibility to earlier adopters.
          </p>

          {/* Seven steps */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
            Seven Steps to Get Recommended by ChatGPT This Week
          </h2>

          <p className="text-gray-600 leading-relaxed mb-4">
            These steps reflect what works across 12,793 UK regulated firms.
          </p>

          <p className="text-gray-600 leading-relaxed mb-8">
            They are practical, fast, and do not require a developer.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
            Step 1: Audit Your Regulatory Footprint
          </h3>

          <p className="text-gray-600 leading-relaxed mb-4">
            Check that your firm name, address, and registration number match exactly across:
          </p>

          <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
            <li>Your website</li>
            <li>SRA / FCA / ICAEW register</li>
            <li>Companies House</li>
          </ul>

          <p className="text-gray-600 leading-relaxed mb-6">
            Even small differences reduce AI trust.
          </p>

          <div className="bg-purple-50 border border-purple-200 rounded-xl p-5 mb-8">
            <p className="text-gray-800 font-medium mb-2">
              👉{' '}
              <Link
                href="/aeo-report"
                className="text-purple-700 hover:text-purple-900 underline"
              >
                See if your firm is invisible in ChatGPT right now →
              </Link>
            </p>
            <p className="text-sm text-gray-600">Takes 60 seconds. No signup.</p>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
            Step 2: Install Schema.org Structured Data
          </h3>

          <p className="text-gray-600 leading-relaxed mb-4">Use the correct schema:</p>

          <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
            <li>Solicitors → LegalService</li>
            <li>Accountants → AccountingService</li>
            <li>Mortgage advisers → FinancialService</li>
            <li>Estate agents → RealEstateAgent</li>
          </ul>

          <p className="text-gray-600 leading-relaxed mb-4">
            Include your registration number in the{' '}
            <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">identifier</code> field.
          </p>

          <p className="text-gray-600 leading-relaxed mb-8">
            Structured data makes your website machine-readable for AI systems.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
            Step 3: Publish FAQ-Format Content
          </h3>

          <p className="text-gray-600 leading-relaxed mb-4">ChatGPT prefers direct answers.</p>

          <p className="text-gray-600 leading-relaxed mb-4">Create pages with:</p>

          <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
            <li>Real client questions</li>
            <li>40–60 word answers</li>
            <li>FAQPage schema</li>
          </ul>

          <p className="text-gray-600 leading-relaxed mb-6">
            Content written as questions and answers is significantly more likely to be cited by
            AI.
          </p>

          <div className="bg-purple-50 border border-purple-200 rounded-xl p-5 mb-8">
            <p className="text-gray-800 font-medium">
              👉{' '}
              <Link
                href="/aeo-report"
                className="text-purple-700 hover:text-purple-900 underline"
              >
                Check your current AI visibility score →
              </Link>
            </p>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
            Step 4: Optimise Your Google Business Profile
          </h3>

          <p className="text-gray-600 leading-relaxed mb-4">Ensure your profile includes:</p>

          <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
            <li>Correct category</li>
            <li>Full contact details</li>
            <li>Website link</li>
            <li>Opening hours</li>
            <li>At least 5 photos</li>
          </ul>

          <p className="text-gray-600 leading-relaxed mb-8">
            Include your registration number in the description.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
            Step 5: Build Consistent Third-Party Citations
          </h3>

          <p className="text-gray-600 leading-relaxed mb-4">
            Ensure your firm details match across:
          </p>

          <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
            <li>Companies House</li>
            <li>Regulator registers</li>
            <li>Google Business Profile</li>
            <li>Trustpilot / ReviewSolicitors / LinkedIn</li>
          </ul>

          <p className="text-gray-600 leading-relaxed mb-8">
            AI systems cross-check multiple sources before recommending a firm.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
            Step 6: Publish Substantive Service Pages
          </h3>

          <p className="text-gray-600 leading-relaxed mb-4">
            Each service needs its own page covering:
          </p>

          <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
            <li>Who it&apos;s for</li>
            <li>What&apos;s included</li>
            <li>Timelines</li>
            <li>Fees or fee ranges</li>
            <li>Qualifications</li>
          </ul>

          <p className="text-gray-600 leading-relaxed mb-8">Aim for 800–1,500 words per page.</p>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
            Step 7: Track AI Mentions Weekly
          </h3>

          <p className="text-gray-600 leading-relaxed mb-4">Test prompts across:</p>

          <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
            <li>ChatGPT</li>
            <li>Claude</li>
            <li>Perplexity</li>
            <li>Gemini</li>
            <li>Grok</li>
          </ul>

          <p className="text-gray-600 leading-relaxed mb-4">Track whether your firm is named.</p>

          <p className="text-gray-600 leading-relaxed mb-8">
            AI visibility improves over weeks, not instantly.
          </p>

          {/* Timeline */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
            How Long Until You Appear in ChatGPT?
          </h2>

          <p className="text-gray-600 leading-relaxed mb-4">Typical timelines:</p>

          <TimelineTable />

          <p className="text-gray-600 leading-relaxed mb-8">
            Live results update quickly. Model-level visibility takes longer.
          </p>

          {/* Top firms */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
            What the Top UK Firms Do Differently
          </h2>

          <p className="text-gray-600 leading-relaxed mb-4">Top-performing firms consistently:</p>

          <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
            <li>Use Schema.org markup</li>
            <li>Match regulator data exactly</li>
            <li>Maintain active Google profiles</li>
            <li>Publish FAQ content</li>
            <li>Create detailed service pages</li>
          </ul>

          <p className="text-gray-600 leading-relaxed mb-8">
            None of this requires an agency. It requires consistency.
          </p>

          {/* Done-for-you */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
            The Fastest Route: Done-For-You AI Visibility
          </h2>

          <p className="text-gray-600 leading-relaxed mb-4">
            You can implement this yourself in 20–30 hours.
          </p>

          <p className="text-gray-600 leading-relaxed mb-4">Or you can skip the work.</p>

          <p className="text-gray-600 leading-relaxed mb-4">TendorAI provides:</p>

          <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
            <li>Schema installed within 48 hours</li>
            <li>Weekly AI visibility tracking</li>
            <li>AI-optimised content publishing</li>
          </ul>

          <p className="text-gray-600 leading-relaxed mb-6">
            £299/month. No setup fees. 90-day guarantee.
          </p>

          <div className="my-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 md:p-10 text-white text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-3">
              Run a free AI visibility scan →
            </h3>
            <p className="text-purple-100 mb-6 max-w-lg mx-auto">See your score instantly.</p>
            <Link
              href="/aeo-report"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-purple-700 font-semibold rounded-lg hover:bg-purple-50 transition-colors"
            >
              Check AI Visibility — Free
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>

          {/* FAQ */}
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">
            Frequently Asked Questions
          </h2>

          <FAQSection />

          {/* About */}
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">About TendorAI</h2>

          <p className="text-gray-600 leading-relaxed mb-4">
            TendorAI is the UK&apos;s AI visibility platform for regulated professional services.
          </p>

          <p className="text-gray-600 leading-relaxed mb-8">
            We help solicitors, accountants, and mortgage advisers get recommended in ChatGPT,
            Claude, and other AI systems through structured data, citation tracking, and
            AI-optimised content.
          </p>

          {/* Sources */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Sources</h2>

          <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-8">
            <li>Harvard Journal of Law &amp; Technology (2026)</li>
            <li>Ofcom Online Nation Report (2025)</li>
            <li>Gartner Predicts: Generative AI and Search (2025)</li>
            <li>ICAEW TECH 05/26</li>
            <li>SRA Standards (2025)</li>
            <li>FCA Consumer Duty (2025 update)</li>
            <li>SALT.agency (2025)</li>
            <li>Best Lawyers AI Report (2026)</li>
            <li>Wellows (2025)</li>
          </ul>

          {/* Related */}
          <RelatedArticles />
        </article>
      </main>
    </>
  );
}
