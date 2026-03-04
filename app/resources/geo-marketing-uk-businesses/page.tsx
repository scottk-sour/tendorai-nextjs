import { Metadata } from 'next';
import Link from 'next/link';
import { articles } from '@/lib/content/articles';

const TITLE = 'GEO Marketing for UK Businesses: Why AI Visibility Is Replacing SEO in 2026';
const DESCRIPTION = 'GEO (Generative Engine Optimisation) is replacing traditional SEO. Learn how UK businesses can get recommended by ChatGPT, Gemini, and Perplexity in 2026.';
const SLUG = 'geo-marketing-uk-businesses';
const PUBLISHED = '2026-02-22';
const AUTHOR = 'Scott Davies';
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
    q: 'What is GEO marketing?',
    a: 'GEO (Generative Engine Optimisation) is the process of making your business understandable and recommendable by AI platforms. Instead of focusing purely on search rankings, it focuses on being the named answer AI provides.',
  },
  {
    q: 'Is GEO replacing SEO?',
    a: 'Not entirely. SEO still matters for traditional search visibility. But AI-driven discovery is growing rapidly. GEO complements SEO and, in many cases, becomes the higher-leverage channel.',
  },
  {
    q: 'How do I check if AI recommends my business?',
    a: 'Open ChatGPT and ask for the best providers of your service in your town. Or generate a structured report at tendorai.com/aeo-report \u2014 we scan AI platforms weekly and provide a visibility score out of 100.',
  },
  {
    q: 'How long does GEO take to work?',
    a: 'It depends on your starting point. If you already have strong reviews, structured data and consistent online signals, improvements can be visible within weeks. If your digital footprint is fragmented, it may take longer. The key is consistency and structure.',
  },
  {
    q: 'What does TendorAI do?',
    a: 'TendorAI is a UK SaaS platform that scans AI platforms weekly, tracks your AI mention rate, provides a visibility score out of 100, shows who AI recommends instead of you, structures your business data automatically, and helps you improve AI readability. We currently list 12,000+ UK businesses across solicitors, accountants, mortgage advisers and estate agents. Our goal is simple: give UK businesses control over how AI sees them.',
  },
];

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

function RelatedArticles() {
  const related = articles
    .filter(a => a.slug !== SLUG)
    .filter(a => a.category === 'AI Visibility' || a.category === 'AI & Visibility' || a.category === 'Research')
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <div className="border-t border-gray-200 pt-8 mt-12">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">More Resources</h3>
      <div className="grid md:grid-cols-3 gap-6">
        {related.map((article) => (
          <Link
            key={article.slug}
            href={`/resources/${article.slug}`}
            className="group p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <span className="inline-block px-2 py-0.5 text-xs font-medium rounded-full mb-2 bg-teal-100 text-teal-700">
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

export default function GeoMarketingPage() {
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
    articleSection: 'AI Visibility',
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.tendorai.com' },
      { '@type': 'ListItem', position: 2, name: 'Resources', item: 'https://www.tendorai.com/resources' },
      { '@type': 'ListItem', position: 3, name: TITLE },
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
              <Link href="/" className="hover:text-white">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/resources" className="hover:text-white">Resources</Link>
              <span className="mx-2">/</span>
              <span className="text-white">AI Visibility</span>
            </nav>

            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 text-sm font-medium rounded-full bg-teal-100 text-teal-700">
                AI Visibility
              </span>
              <span className="text-purple-200">14 min read</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              {TITLE}
            </h1>

            <p className="text-lg text-purple-100 leading-relaxed">
              {DESCRIPTION}
            </p>

            <div className="mt-6 text-sm text-purple-200">
              <span className="text-white font-medium">{AUTHOR}</span>
              <span className="mx-2">&middot;</span>
              Published 22 February 2026
            </div>
          </div>
        </section>

        {/* Article content */}
        <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12">

          {/* Byline */}
          <p className="text-gray-500 italic mb-8">By Scott Davies, Founder of TendorAI</p>

          {/* Intro */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
            A quiet shift is happening &mdash; and most business owners haven&apos;t noticed
          </h2>

          <p className="text-gray-600 leading-relaxed mb-4">
            Picture this.
          </p>

          <p className="text-gray-600 leading-relaxed mb-4">
            A business owner in Cardiff needs help with a shareholder dispute. Ten years ago, they would have typed something into Google. Five years ago, they might have clicked a few ads and browsed comparison sites.
          </p>

          <p className="text-gray-600 leading-relaxed mb-4">
            Today?
          </p>

          <p className="text-gray-600 leading-relaxed mb-4">
            They open ChatGPT and type:
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-8 space-y-3">
            <p className="text-gray-700 italic">&quot;Who are the best solicitors in Cardiff for shareholder disputes?&quot;</p>
            <p className="text-gray-700 italic">&quot;Best accountant in Leeds for e-commerce businesses.&quot;</p>
            <p className="text-gray-700 italic">&quot;Top estate agents in Bristol for selling a flat quickly.&quot;</p>
            <p className="text-gray-700 italic">&quot;Reliable telecoms provider for a 20-person office in Manchester.&quot;</p>
            <p className="text-gray-700 italic">&quot;Who installs commercial CCTV systems in Nottingham?&quot;</p>
          </div>

          <p className="text-gray-600 leading-relaxed mb-4">
            They don&apos;t scroll. They don&apos;t compare ten websites. They get a short list of named businesses &mdash; often with descriptions, reviews, pricing context and positioning &mdash; and they contact one of them.
          </p>

          <p className="text-gray-600 leading-relaxed mb-4">
            <strong>If AI doesn&apos;t know who you are, it can&apos;t recommend you.</strong>
          </p>

          <p className="text-gray-600 leading-relaxed mb-4">
            That is the shift.
          </p>

          <p className="text-gray-600 leading-relaxed mb-8">
            And it&apos;s why GEO is replacing SEO in 2026.
          </p>

          {/* What Is GEO? */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
            What Is GEO?
          </h2>

          <p className="text-gray-600 leading-relaxed mb-4">
            GEO stands for <strong>Generative Engine Optimisation</strong>.
          </p>

          <p className="text-gray-600 leading-relaxed mb-4">
            It&apos;s the discipline of making sure AI platforms like ChatGPT, Gemini and Perplexity can <em>understand</em> your business &mdash; and choose to recommend it.
          </p>

          <p className="text-gray-600 leading-relaxed mb-4">
            Here&apos;s the simplest way to understand it:
          </p>

          {/* SEO vs GEO comparison table */}
          <div className="overflow-x-auto my-8">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left py-3 px-4 bg-gray-50 text-sm font-semibold text-gray-700 rounded-tl-lg">Traditional SEO</th>
                  <th className="text-left py-3 px-4 bg-purple-50 text-sm font-semibold text-purple-700 rounded-tr-lg">GEO (Generative Engine Optimisation)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Rank on Google search results', 'Be the business AI names directly'],
                  ['Compete for 10 blue links', 'Compete to be the answer'],
                  ['Focus on keywords', 'Focus on entity clarity and structure'],
                  ['Optimise for search bots', 'Optimise for AI language models'],
                  ['Measured in traffic', 'Measured in mentions and recommendations'],
                ].map(([seo, geo], i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                    <td className="py-3 px-4 text-sm text-gray-600 border-t border-gray-100">{seo}</td>
                    <td className="py-3 px-4 text-sm text-purple-700 font-medium border-t border-gray-100">{geo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-gray-600 leading-relaxed mb-4">
            SEO gets you found in search results.
          </p>

          <p className="text-gray-600 leading-relaxed mb-4">
            <strong>GEO gets you spoken about in conversations.</strong>
          </p>

          <p className="text-gray-600 leading-relaxed mb-8">
            And conversations are where buying decisions now start.
          </p>

          {/* Who Needs This */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
            Who Actually Needs This?
          </h2>

          <p className="text-gray-600 leading-relaxed mb-4">
            If someone could reasonably ask:
          </p>

          <p className="text-gray-700 italic mb-4">
            &quot;Who&apos;s the best [your service] in [your town]?&quot;
          </p>

          <p className="text-gray-600 leading-relaxed mb-4">
            You need GEO.
          </p>

          <p className="text-gray-600 leading-relaxed mb-4">That includes:</p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 my-6">
            {['Solicitors', 'Accountants', 'Estate agents', 'Mortgage brokers', 'Office equipment suppliers', 'Copier dealers', 'Telecoms providers', 'IT support companies', 'Cyber security firms', 'CCTV installers', 'Facilities management companies'].map((item) => (
              <div key={item} className="bg-gray-50 rounded-lg px-3 py-2 text-sm text-gray-700 font-medium">
                {item}
              </div>
            ))}
          </div>

          <p className="text-gray-600 leading-relaxed mb-4">
            At TendorAI, we&apos;ve scanned over 1,000 UK businesses across multiple industries. Here&apos;s what we found:
          </p>

          <div className="grid grid-cols-2 gap-4 my-8">
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm text-center">
              <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">74%</div>
              <div className="text-sm font-medium text-gray-900">mentioned by AI</div>
              <div className="text-xs text-gray-500 mt-1">at least once</div>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm text-center">
              <div className="text-3xl md:text-4xl font-bold text-red-500 mb-2">26%</div>
              <div className="text-sm font-medium text-gray-900">completely invisible</div>
              <div className="text-xs text-gray-500 mt-1">to AI platforms</div>
            </div>
          </div>

          <p className="text-gray-600 leading-relaxed mb-4">
            Invisible doesn&apos;t mean small. Some invisible firms are established, well-reviewed and locally respected. AI simply doesn&apos;t understand them clearly enough.
          </p>

          <p className="text-gray-600 leading-relaxed mb-4">
            We currently list <strong>11,745+ UK businesses</strong> on TendorAI &mdash; and that number is growing weekly.
          </p>

          <p className="text-gray-600 leading-relaxed mb-8">
            The gap between &quot;known by AI&quot; and &quot;ignored by AI&quot; is where opportunity sits.
          </p>

          {/* How AI Decides */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
            How AI Decides Who to Recommend
          </h2>

          <p className="text-gray-600 leading-relaxed mb-4">
            AI platforms don&apos;t &quot;rank&quot; in the same way search engines do. They synthesise information from across the web and decide which businesses appear credible, structured and relevant.
          </p>

          <p className="text-gray-600 leading-relaxed mb-6">
            Here&apos;s what influences recommendations:
          </p>

          <div className="space-y-6 mb-8">
            <div className="bg-purple-50 rounded-lg p-5 border border-purple-100">
              <h3 className="font-semibold text-purple-900 mb-2">1. Structured Data</h3>
              <p className="text-sm text-purple-700">AI prefers machine-readable clarity. If your services, specialisms, team, reviews and credentials are not structured properly, AI struggles to interpret them. Most small and mid-sized UK businesses do not have robust structured data in place.</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-5 border border-purple-100">
              <h3 className="font-semibold text-purple-900 mb-2">2. Consistent NAP</h3>
              <p className="text-sm text-purple-700">Name, Address, Phone number. If your details vary across platforms, AI confidence drops. Consistency builds trust signals.</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-5 border border-purple-100">
              <h3 className="font-semibold text-purple-900 mb-2">3. Reviews and Sentiment</h3>
              <p className="text-sm text-purple-700">AI reads review tone, volume and recency. A business with 5 detailed, recent reviews can outperform one with 50 outdated ones.</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-5 border border-purple-100">
              <h3 className="font-semibold text-purple-900 mb-2">4. Content Depth</h3>
              <p className="text-sm text-purple-700">Thin brochure websites are easy for AI to ignore. Clear service explanations, FAQs, pricing transparency and specialisms help AI understand where you fit.</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-5 border border-purple-100">
              <h3 className="font-semibold text-purple-900 mb-2">5. Entity Recognition</h3>
              <p className="text-sm text-purple-700">AI doesn&apos;t just see a website. It sees entities &mdash; businesses, people, locations and services. If your business isn&apos;t clearly defined as an entity across the web, it becomes forgettable.</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-5 border border-purple-100">
              <h3 className="font-semibold text-purple-900 mb-2">6. Freshness</h3>
              <p className="text-sm text-purple-700">Outdated sites signal inactivity. AI leans towards businesses that look current and engaged.</p>
            </div>
          </div>

          {/* Try It Right Now */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
            Try It Right Now
          </h2>

          <p className="text-gray-600 leading-relaxed mb-4">
            Open ChatGPT. Ask:
          </p>

          <p className="text-gray-700 italic mb-4">
            &quot;Who are the best [your service] in [your town]?&quot;
          </p>

          <p className="text-gray-600 leading-relaxed mb-4">
            See what happens. Are you named? Are your competitors?
          </p>

          <p className="text-gray-600 leading-relaxed mb-4">
            If you&apos;re not mentioned, that&apos;s not a reputation problem. It&apos;s a <strong>visibility problem</strong>.
          </p>

          <p className="text-gray-600 leading-relaxed mb-8">
            And visibility in 2026 is conversational.
          </p>

          {/* 5 Steps */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
            5 Steps You Can Take Today
          </h2>

          <p className="text-gray-600 leading-relaxed mb-4">
            You don&apos;t need to panic. But you do need to act.
          </p>

          <p className="text-gray-600 leading-relaxed mb-6">
            Here&apos;s where to start.
          </p>

          <div className="space-y-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Test Yourself Across Platforms</h3>
              <p className="text-gray-600 leading-relaxed mb-2">
                Try ChatGPT, Gemini and Perplexity. Use different phrasings: &quot;Best&quot;, &quot;Recommended&quot;, &quot;Top rated&quot;, &quot;Experienced&quot;.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Document the responses. Patterns matter.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Check Your Structured Data</h3>
              <p className="text-gray-600 leading-relaxed">
                Does your website clearly define: your services, your service areas, your team members, reviews, contact details? If you don&apos;t know, that&apos;s the issue.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Audit Your Online Footprint</h3>
              <p className="text-gray-600 leading-relaxed">
                Search your business name. Are details consistent? Are there outdated listings? Is your positioning clear? AI confidence increases when information aligns everywhere.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">4. Strengthen Reviews</h3>
              <p className="text-gray-600 leading-relaxed mb-2">
                Encourage detailed, specific feedback.
              </p>
              <p className="text-gray-600 leading-relaxed mb-2">
                &quot;Great service&quot; is weak. &quot;Handled our commercial lease negotiation efficiently and kept costs predictable&quot; is strong.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Specificity helps AI understand your expertise.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">5. Get Your Free TendorAI Report</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                We built TendorAI to make this measurable. You can generate your free{' '}
                <Link href="/aeo-report" className="text-purple-600 hover:text-purple-700 underline font-medium">
                  AI Visibility Report
                </Link>{' '}
                right now.
              </p>
              <p className="text-gray-600 leading-relaxed mb-2">It shows:</p>
              <ul className="list-disc pl-6 space-y-1 text-gray-600 mb-2">
                <li>Whether AI mentions you</li>
                <li>Your visibility score (out of 100)</li>
                <li>Competitors AI prefers</li>
                <li>Where gaps exist</li>
              </ul>
              <p className="text-gray-600 leading-relaxed">
                No consultancy calls. No sales pressure. Just clarity.
              </p>
            </div>
          </div>

          {/* Why TendorAI Exists */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
            Why TendorAI Exists
          </h2>

          <p className="text-gray-600 leading-relaxed mb-4">
            TendorAI isn&apos;t an agency. It isn&apos;t a consultancy. It&apos;s a self-serve SaaS platform built specifically for UK businesses who want control over how AI sees them.
          </p>

          <p className="text-gray-600 leading-relaxed mb-6">
            Here&apos;s what it does:
          </p>

          <div className="space-y-4 mb-8">
            {[
              { title: 'Weekly AI Scanning', desc: 'We scan major AI platforms weekly. You can see if you\'re mentioned, who AI recommends instead, and changes over time.' },
              { title: 'AI Visibility Score (Out of 100)', desc: 'A clear metric. No vanity stats. Just a number that tracks how understandable and recommendable your business is to AI.' },
              { title: 'Structured Profiles', desc: 'When you claim your profile, you input your services in plain English. TendorAI structures it properly. Your business becomes AI-readable automatically. No coding required.' },
              { title: '12,000+ UK Businesses Listed', desc: 'We\'re building a structured ecosystem of UK service providers that AI can understand clearly. Solicitors, accountants, mortgage advisers, estate agents and more.' },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{item.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Pricing */}
          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
            Subscription Tiers
          </h3>

          <div className="grid md:grid-cols-3 gap-6 my-8">
            {[
              {
                name: 'Free',
                price: '\u00a30',
                priceLabel: '/forever',
                features: ['Basic profile', 'Directory listing', 'Public register data', 'Visible to AI crawlers with SRA/FCA/ICAEW details'],
                highlighted: false,
              },
              {
                name: 'Starter',
                price: '\u00a3149',
                priceLabel: '/month',
                features: ['Stand out from unclaimed profiles', 'Pricing visible to AI', 'Monthly AI Visibility (AEO) report', 'AI Visibility Score', 'Ranked above free profiles', 'Unlimited products'],
                highlighted: false,
              },
              {
                name: 'Pro',
                price: '\u00a3299',
                priceLabel: '/month',
                features: ['Ranked first in AI results', 'Full structured data', 'Weekly AI Visibility (AEO) reports', 'AI mention tracking', 'TendorAI Verified badge', 'Unlimited products', 'Priority support'],
                highlighted: true,
              },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`rounded-xl p-6 ${
                  plan.highlighted
                    ? 'border-2 border-purple-500 bg-purple-50/50 relative'
                    : 'border border-gray-200 bg-white'
                }`}
              >
                {plan.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Get Recommended First
                  </span>
                )}
                <h4 className="text-lg font-semibold text-gray-900">{plan.name}</h4>
                <div className="mt-2 mb-4">
                  <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-sm text-gray-500 ml-1">{plan.priceLabel}</span>
                </div>
                <ul className="space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-gray-600">
                      <svg className="w-4 h-4 text-green-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="text-gray-600 leading-relaxed mb-8">
            It&apos;s built to scale with your ambition.
          </p>

          {/* The Bottom Line */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
            The Bottom Line
          </h2>

          <p className="text-gray-600 leading-relaxed mb-4">
            <strong>We are in a land grab.</strong>
          </p>

          <p className="text-gray-600 leading-relaxed mb-4">
            The first businesses to establish strong AI visibility in their towns and sectors will dominate recommendations for years.
          </p>

          <p className="text-gray-600 leading-relaxed mb-4">
            AI builds memory. If it consistently sees clear positioning, strong structure, and credible signals &mdash; it reinforces those patterns. Late adopters will find it harder to displace early leaders.
          </p>

          <p className="text-gray-600 leading-relaxed mb-4">
            This isn&apos;t about abandoning SEO. It&apos;s about recognising that <strong>SEO alone is no longer enough</strong>.
          </p>

          <p className="text-gray-600 leading-relaxed mb-4">
            Search results are shrinking. AI answers are expanding. And buying journeys are compressing.
          </p>

          <p className="text-gray-600 leading-relaxed mb-8">
            The businesses that understand this now will own 2026.
          </p>

          {/* FAQ */}
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">
            Frequently Asked Questions
          </h2>

          <FAQSection />

          {/* The Opportunity Is Now */}
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            The Opportunity Is Now
          </h2>

          <p className="text-gray-600 leading-relaxed mb-4">
            If AI doesn&apos;t understand you, it won&apos;t recommend you.
          </p>

          <p className="text-gray-600 leading-relaxed mb-4">
            If it doesn&apos;t recommend you, you won&apos;t get the enquiry. And you won&apos;t even know you lost it.
          </p>

          <p className="text-gray-600 leading-relaxed mb-4">
            The shift has already started. The only question is whether you act early &mdash; or react later.
          </p>

          {/* Final CTA */}
          <div className="my-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 md:p-10 text-white text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-3">
              Get Your Free AI Visibility Report
            </h3>
            <p className="text-purple-100 mb-6 max-w-lg mx-auto">
              Find out if AI tools are recommending your business. Get your score, see competitors, and identify gaps &mdash; in 60 seconds.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/aeo-report"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-purple-700 font-semibold rounded-lg hover:bg-purple-50 transition-colors"
              >
                Run Free AI Visibility (AEO) Report
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/for-vendors"
                className="inline-flex items-center justify-center px-6 py-3 bg-purple-500/30 text-white font-semibold rounded-lg hover:bg-purple-500/40 transition-colors border border-purple-400/30"
              >
                Claim Your Profile
              </Link>
            </div>
          </div>

          <p className="text-gray-500 text-sm text-center italic">
            &mdash; Scott Davies, Founder of TendorAI
          </p>

          {/* Related */}
          <RelatedArticles />
        </article>
      </main>
    </>
  );
}
