import { Metadata } from 'next';
import Link from 'next/link';

const TITLE =
  'Why UK Solicitors Are Being Referred to the SRA Over AI-Generated Legal Citations — And What It Means for AI Visibility in 2026';
const SHORT_TITLE =
  'UK Solicitors Referred to the SRA Over AI Citations: What It Means for AI Visibility in 2026';
const DESCRIPTION =
  'A UK judge has referred solicitors to the SRA for submitting AI-generated legal citations that did not exist. Here is what it signals for AI visibility, trust, and authority in 2026.';
const CANONICAL =
  'https://www.tendorai.com/blog/uk-solicitors-sra-referral-ai-citations-2026';
const PUBLISHED = '2026-05-15';
const AUTHOR = 'Scott Davies';

export const metadata: Metadata = {
  title: `${SHORT_TITLE} | TendorAI`,
  description: DESCRIPTION,
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: SHORT_TITLE,
    description: DESCRIPTION,
    type: 'article',
    publishedTime: PUBLISHED,
    authors: [AUTHOR],
    url: CANONICAL,
    siteName: 'TendorAI',
    images: [{ url: '/logo.png', width: 873, height: 873 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: SHORT_TITLE,
    description: DESCRIPTION,
  },
};

const faqs = [
  {
    q: 'Can solicitors use AI legally in the UK?',
    a: 'Yes. UK solicitors can use AI tools, but they remain fully responsible for accuracy, confidentiality, and professional compliance under SRA rules.',
  },
  {
    q: 'What are AI-generated legal authorities?',
    a: 'AI-generated legal authorities are citations, cases, or references created by an AI model that may be inaccurate, fabricated, or unverifiable. Large language models such as ChatGPT, Gemini, and Claude are probabilistic systems — they generate likely language patterns and do not inherently verify legal truth.',
  },
  {
    q: 'Why are AI hallucinations dangerous for law firms?',
    a: 'Hallucinations can create regulatory risk, reputational damage, client trust issues, inaccurate legal guidance, and court compliance problems. When the SRA refers solicitors over fabricated citations, the underlying issue is the absence of human verification — not the use of AI itself.',
  },
  {
    q: 'Does AI-generated content hurt SEO or AI visibility?',
    a: 'Poor-quality or inaccurate AI content can reduce trust signals and weaken AI visibility. High-quality, verified, structured, expert-reviewed content can still perform very well across ChatGPT, Perplexity, Gemini, and Google AI Overviews.',
  },
  {
    q: 'What is AI visibility for solicitors?',
    a: 'AI visibility is the likelihood that AI systems such as ChatGPT, Gemini, Claude, or Perplexity will recommend or cite a law firm when users ask relevant questions. It is increasingly determined by entity trust, structured data, named expert authors, and third-party citations rather than content volume.',
  },
  {
    q: 'How can law firms improve AI trust signals?',
    a: 'Law firms can improve AI trust signals through structured schema markup (LegalService, Organization, Person), named expert authors, SRA registration consistency, verified entity data, authoritative third-party citations, and accurate, regularly updated content.',
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

export default function SraAiCitationsPage() {
  const today = new Date().toISOString().split('T')[0];

  const blogPostingJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: TITLE,
    description: DESCRIPTION,
    author: {
      '@type': 'Person',
      name: AUTHOR,
      jobTitle: 'Founder, TendorAI',
      url: 'https://www.tendorai.com',
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
    dateModified: today,
    url: CANONICAL,
    keywords: [
      'SRA AI citations',
      'solicitors AI hallucination',
      'AI visibility for law firms',
      'AI generated legal authorities',
      'UK law firm AI compliance',
      'AI search for solicitors 2026',
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

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.tendorai.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: 'https://www.tendorai.com/blog',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Legal',
        item: 'https://www.tendorai.com/blog?category=Legal',
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: SHORT_TITLE,
        item: CANONICAL,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-gradient-to-br from-[#1B4F72] to-[#2d1b4e] text-white py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <nav className="text-sm mb-6 text-blue-200">
              <Link href="/" className="hover:text-white">
                Home
              </Link>
              <span className="mx-2">/</span>
              <Link href="/blog" className="hover:text-white">
                Blog
              </Link>
              <span className="mx-2">/</span>
              <span className="text-white">Legal</span>
              <span className="mx-2">/</span>
              <span className="text-white">SRA AI Citations Referral</span>
            </nav>

            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 text-sm font-medium rounded-full bg-white/20 text-white">
                Legal
              </span>
              <span className="text-blue-200">9 min read</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              {TITLE}
            </h1>

            <p className="text-lg text-blue-100 leading-relaxed max-w-3xl">
              {DESCRIPTION}
            </p>

            <div className="mt-6 text-sm text-blue-200">
              Last updated 15 May 2026 &middot; By {AUTHOR}, Founder of TendorAI
            </div>
          </div>
        </section>

        {/* Article content */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16">
          {/* Opening passage — self-contained AI-citable answer */}
          <section className="mb-12">
            <p className="text-lg text-gray-600 leading-relaxed mb-4">
              <strong>
                A UK judge has referred solicitors to the Solicitors Regulation
                Authority after the &quot;inexcusable&quot; submission of
                AI-generated legal authorities that did not exist.
              </strong>{' '}
              The case is another major warning that generative AI is now a
              compliance issue for regulated professions, not just a
              productivity tool.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              According to the Law Society Gazette, the court identified
              fabricated or inaccurate legal citations produced through
              AI-assisted workflows. The issue was not merely the use of AI
              itself, but the failure to verify the output before submission to
              the court.
            </p>
            <p className="text-lg font-semibold text-gray-900">
              This matters far beyond litigation. It changes how AI systems,
              regulators, clients, and search engines evaluate trust online. For
              UK solicitors, accountants, mortgage advisers, and other regulated
              professionals, the market is moving away from
              &quot;AI-generated content volume&quot; and toward
              &quot;AI-verifiable authority.&quot; That shift sits at the centre
              of what TendorAI calls{' '}
              <Link
                href="/ai-visibility-platform"
                className="text-[#1B4F72] underline hover:text-[#2d1b4e]"
              >
                AI visibility infrastructure
              </Link>
              .
            </p>
          </section>

          {/* H2: What Happened */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              What Happened in the AI Citation Case?
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              The core issue was simple:{' '}
              <strong>
                AI-generated authorities were submitted to the court without
                proper human verification.
              </strong>{' '}
              The judge reportedly described the conduct as
              &quot;inexcusable,&quot; and the solicitors were referred to the
              Solicitors Regulation Authority for potential regulatory
              investigation.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              This follows a growing international pattern:
            </p>
            <ul className="space-y-2 text-gray-600 mb-4">
              <li className="flex items-start gap-2">
                <span className="text-[#1B4F72] mt-1 font-bold">&#8226;</span>
                <span>fake AI-generated case law</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#1B4F72] mt-1 font-bold">&#8226;</span>
                <span>hallucinated citations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#1B4F72] mt-1 font-bold">&#8226;</span>
                <span>non-existent judgments</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#1B4F72] mt-1 font-bold">&#8226;</span>
                <span>incorrect quotations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#1B4F72] mt-1 font-bold">&#8226;</span>
                <span>fabricated legal references</span>
              </li>
            </ul>
            <p className="text-gray-600 leading-relaxed">
              Large language models such as OpenAI&apos;s ChatGPT, Google
              Gemini, and Anthropic Claude are probabilistic systems. They
              generate likely language patterns. <strong>They do not inherently
              verify legal truth.</strong> That distinction is now becoming
              operationally critical for professional services firms.
            </p>
          </section>

          {/* H2: Bigger than one case */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Why This Is Bigger Than One Court Case
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Our analysis of AI search behaviour across legal and
              professional-service queries shows a major shift happening in
              2026:{' '}
              <strong>
                AI systems increasingly reward verifiable authority over generic
                AI-generated content.
              </strong>
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">This affects:</p>
            <ul className="space-y-2 text-gray-600 mb-4">
              <li className="flex items-start gap-2">
                <span className="text-[#1B4F72] mt-1 font-bold">&#8226;</span>
                <span>AI search visibility</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#1B4F72] mt-1 font-bold">&#8226;</span>
                <span>Google AI Overviews</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#1B4F72] mt-1 font-bold">&#8226;</span>
                <span>ChatGPT recommendations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#1B4F72] mt-1 font-bold">&#8226;</span>
                <span>Perplexity citations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#1B4F72] mt-1 font-bold">&#8226;</span>
                <span>Gemini answers</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#1B4F72] mt-1 font-bold">&#8226;</span>
                <span>Claude retrieval behaviour</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#1B4F72] mt-1 font-bold">&#8226;</span>
                <span>client trust</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#1B4F72] mt-1 font-bold">&#8226;</span>
                <span>regulator confidence</span>
              </li>
            </ul>
            <p className="text-gray-600 leading-relaxed mb-4">
              The firms most likely to be recommended by AI systems are
              increasingly the firms with:
            </p>
            <ul className="space-y-2 text-gray-600 mb-4">
              <li className="flex items-start gap-2">
                <span className="text-[#1B4F72] mt-1 font-bold">&#8226;</span>
                <span>structured entity data</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#1B4F72] mt-1 font-bold">&#8226;</span>
                <span>regulator verification</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#1B4F72] mt-1 font-bold">&#8226;</span>
                <span>named experts</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#1B4F72] mt-1 font-bold">&#8226;</span>
                <span>consistent authorship</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#1B4F72] mt-1 font-bold">&#8226;</span>
                <span>strong schema markup</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#1B4F72] mt-1 font-bold">&#8226;</span>
                <span>third-party citations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#1B4F72] mt-1 font-bold">&#8226;</span>
                <span>transparent sourcing</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#1B4F72] mt-1 font-bold">&#8226;</span>
                <span>factual consistency across the public web</span>
              </li>
            </ul>
            <p className="text-gray-600 leading-relaxed">
              That is fundamentally different from publishing large volumes of
              lightly reviewed AI content.
            </p>
          </section>

          {/* H2: Trust problem */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              AI Visibility Is Becoming a Trust Problem, Not a Content Problem
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              <strong>
                AI visibility is the likelihood that an AI assistant — ChatGPT,
                Perplexity, Gemini, Claude, or Grok — will recommend a specific
                business when a user asks a relevant question.
              </strong>
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              For years, SEO largely rewarded keyword targeting, backlinks,
              content scale, and topical coverage. In 2026, AI systems
              increasingly evaluate entity trust, citation reliability,
              consistency, source quality, passage extraction quality, and
              regulatory verification.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              For solicitors, this means AI systems are more likely to trust:
            </p>
            <ul className="space-y-2 text-gray-600 mb-4">
              <li className="flex items-start gap-2">
                <span className="text-[#1B4F72] mt-1 font-bold">&#8226;</span>
                <span>SRA-registered firms</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#1B4F72] mt-1 font-bold">&#8226;</span>
                <span>named solicitors with visible credentials</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#1B4F72] mt-1 font-bold">&#8226;</span>
                <span>firms cited by trusted publications</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#1B4F72] mt-1 font-bold">&#8226;</span>
                <span>firms with accurate structured data</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#1B4F72] mt-1 font-bold">&#8226;</span>
                <span>
                  firms consistently referenced across multiple trusted sources
                </span>
              </li>
            </ul>
            <p className="text-gray-600 leading-relaxed">
              The hallucination problem accelerates this shift. When AI systems
              become unreliable in certain contexts,{' '}
              <strong>
                they compensate by leaning harder on authoritative entities.
              </strong>
            </p>
          </section>

          {/* H2: Stop positioning as AI content firms */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Why Law Firms Should Stop Positioning Themselves as &quot;AI
              Content Firms&quot;
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              One of the biggest strategic mistakes legal marketers are making
              is confusing <strong>AI-generated marketing</strong> with{' '}
              <strong>AI-visible authority</strong>. Those are not the same
              thing.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              A law firm publishing 200 generic AI blog posts may still fail to
              appear in ChatGPT recommendations, Google AI Overviews, Perplexity
              citations, or Gemini summaries. Meanwhile, a smaller firm with
              better entity consistency, stronger authorship, better legal
              schema, verified profiles, and stronger citation signals can
              outperform them.
            </p>
            <p className="text-gray-600 leading-relaxed">
              <strong>
                The market is moving from content quantity to machine-verifiable
                trust.
              </strong>
            </p>
          </section>

          {/* H2: Four signals */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              What the SRA Referral Signals to the Legal Industry
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              The referral sends four important signals to UK law firms.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              1. AI Usage Is No Longer Experimental
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              AI is now entering regulated workflows: legal drafting, due
              diligence, client communication, research, marketing, and document
              summarisation. The legal industry has moved beyond
              experimentation. The question is no longer{' '}
              <em>&quot;Should firms use AI?&quot;</em> — it is{' '}
              <strong>&quot;How do firms govern AI safely?&quot;</strong>
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-8">
              2. Human Verification Is Mandatory
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              The core compliance issue was not AI usage itself. It was the
              absence of verification. That principle applies equally to court
              submissions, website claims, FAQ pages, legal guidance content,
              AI-generated comparison pages, and informational blog posts.{' '}
              <strong>
                AI-assisted content without verification creates reputational
                risk.
              </strong>
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-8">
              3. Authority Signals Matter More Than Ever
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              AI systems increasingly cross-reference regulator directories,
              Companies House data, LinkedIn entities, schema markup, review
              platforms, named author profiles, and third-party mentions.
              Inconsistent or weak entity signals reduce trust. This is why
              local AI visibility increasingly depends on NAP (name, address,
              phone) consistency and regulator alignment.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-8">
              4. Hallucinations Become the Public Narrative if Unchallenged
            </h3>
            <p className="text-gray-600 leading-relaxed">
              AI hallucinations are not isolated errors anymore. Repeated
              misinformation becomes reinforced across AI systems, forums,
              social content, low-quality blogs, and scraped AI summaries. The
              most effective response is not emailing AI companies — it is
              publishing authoritative corrections, strengthening entity
              authority, increasing verified third-party references, improving
              structured data, and dominating the topic with accurate
              information.
            </p>
          </section>

          {/* H2: What smart firms do */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              What Smart Law Firms Will Do Next
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              The firms likely to win AI visibility over the next three years
              will usually do five things well.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Build Verifiable Author Entities
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              Named solicitors increasingly matter more than anonymous brand
              publishing. Strong author signals include named bylines, LinkedIn
              presence, speaking appearances, media mentions, regulator
              references, and visible credentials.{' '}
              <strong>
                AI systems trust identifiable experts more than faceless content
                farms.
              </strong>
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-8">
              Strengthen Structured Data
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              LegalService schema, Organization schema, Person schema, and clean
              entity relationships increasingly matter for AI retrieval.
              Structured data helps AI systems understand who the firm is, who
              authored the content, what services are offered, which regulators
              apply, and where the firm operates.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-8">
              Prioritise Accuracy Over Scale
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              A smaller number of well-sourced, updated, verified,
              expert-reviewed pages will often outperform mass AI-generated
              publishing — especially in YMYL (Your Money, Your Life) sectors
              such as legal, financial, medical, tax, and mortgage advice.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-8">
              Build Off-Site Authority
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              AI systems do not only evaluate websites. They also evaluate
              Reddit discussions, review platforms, legal directories, news
              mentions, LinkedIn profiles, industry citations, and Companies
              House records.{' '}
              <strong>
                Authority is increasingly networked across the public web.
              </strong>
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-8">
              Optimise for Passage-Level Retrieval
            </h3>
            <p className="text-gray-600 leading-relaxed">
              AI engines retrieve passages, not entire pages. That means direct
              answers, extractable paragraphs, clean formatting, entity clarity,
              and standalone sections matter more than traditional &quot;SEO
              fluff.&quot;
            </p>
          </section>

          {/* H2: Two camps */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              The Real Competitive Divide Emerging in Legal Marketing
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              The legal industry is beginning to split into two camps.
            </p>

            <div className="overflow-x-auto rounded-lg border border-gray-200 mb-6">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-[#1B4F72] text-white">
                    <th className="px-4 py-3 font-semibold">
                      Camp One: AI Content Volume
                    </th>
                    <th className="px-4 py-3 font-semibold">
                      Camp Two: AI Authority Infrastructure
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  <tr className="border-t border-gray-200">
                    <td className="px-4 py-3">Mass-produce AI blogs</td>
                    <td className="px-4 py-3">Build entity authority</td>
                  </tr>
                  <tr className="border-t border-gray-200 bg-gray-50">
                    <td className="px-4 py-3">Chase keywords</td>
                    <td className="px-4 py-3">Verify claims</td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="px-4 py-3">Automate aggressively</td>
                    <td className="px-4 py-3">Strengthen structured data</td>
                  </tr>
                  <tr className="border-t border-gray-200 bg-gray-50">
                    <td className="px-4 py-3">
                      Prioritise speed over verification
                    </td>
                    <td className="px-4 py-3">Invest in authorship</td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="px-4 py-3">—</td>
                    <td className="px-4 py-3">Improve AI citability</td>
                  </tr>
                  <tr className="border-t border-gray-200 bg-gray-50">
                    <td className="px-4 py-3">—</td>
                    <td className="px-4 py-3">Create trusted proof assets</td>
                  </tr>
                  <tr className="border-t border-gray-200 font-semibold text-gray-900">
                    <td className="px-4 py-3">
                      Outcome: trust, differentiation, AI citation, and
                      regulator-scrutiny problems
                    </td>
                    <td className="px-4 py-3">
                      Outcome: recommended, cited, and trusted firms
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-gray-600 leading-relaxed">
              That distinction matters enormously in AI search.
            </p>
          </section>

          {/* CTA Banner — single primary CTA per Content OS Section 16 */}
          <div className="my-12 bg-gradient-to-r from-[#1B4F72] to-[#2d1b4e] rounded-2xl p-8 md:p-10 text-white text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              See How Your Firm Appears Across ChatGPT, Perplexity, and Gemini
            </h2>
            <p className="text-blue-100 mb-6 max-w-lg mx-auto">
              Run a free AI visibility report to see exactly where your law firm
              stands across the AI engines clients are now searching on.
            </p>
            <Link
              href="/ai-visibility-report"
              className="inline-flex items-center justify-center bg-white text-[#1B4F72] font-semibold rounded-lg px-8 py-4 text-lg hover:bg-blue-50 transition-colors"
            >
              Get Your Free AI Visibility Report
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
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
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <FAQSection />
          </section>

          {/* Sources */}
          <section className="mb-12 border-t border-gray-200 pt-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              Sources
            </h2>
            <ul className="space-y-2 text-gray-600">
              <li>
                <a
                  href="https://www.lawgazette.co.uk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1B4F72] underline hover:text-[#2d1b4e]"
                >
                  Law Society Gazette — coverage of AI-generated authorities in
                  UK courts
                </a>
              </li>
              <li>
                <a
                  href="https://www.sra.org.uk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1B4F72] underline hover:text-[#2d1b4e]"
                >
                  Solicitors Regulation Authority — guidance on AI and
                  compliance
                </a>
              </li>
            </ul>
          </section>

          {/* Related links */}
          <section className="border-t border-gray-200 pt-8 mt-12">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Related Articles
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              <Link
                href="/blog/how-to-get-your-solicitor-firm-recommended-by-chatgpt"
                className="group p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <h3 className="font-medium text-gray-900 group-hover:text-[#1B4F72] transition-colors">
                  How to Get Your Solicitor Firm Recommended by ChatGPT
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  The UK solicitor playbook for getting recommended by AI assistants.
                </p>
              </Link>
              <Link
                href="/blog/how-to-get-recommended-by-chatgpt"
                className="group p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <h3 className="font-medium text-gray-900 group-hover:text-[#1B4F72] transition-colors">
                  How to Get Recommended by ChatGPT (2026 Guide)
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  The 2026 guide for UK regulated firms — covers solicitors,
                  accountants, mortgage advisers, and estate agents.
                </p>
              </Link>
              <Link
                href="/blog/does-structured-data-help-ai-visibility"
                className="group p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <h3 className="font-medium text-gray-900 group-hover:text-[#1B4F72] transition-colors">
                  Does Structured Data Actually Help With AI Visibility?
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Why structured data is now decisive for AI visibility.
                </p>
              </Link>
            </div>
          </section>

          {/* Back to blog */}
          <div className="mt-8">
            <Link
              href="/blog"
              className="text-[#1B4F72] hover:underline font-medium"
            >
              &larr; Back to Blog
            </Link>
          </div>
        </article>
      </main>
    </>
  );
}
