import { Metadata } from 'next';
import Link from 'next/link';

const TITLE =
  'We tested 100 Manchester solicitor firms. Only 24 are recommended by ChatGPT.';
const DESCRIPTION =
  'We tested 100 Manchester SRA-registered solicitor firms across ChatGPT, Claude, and Perplexity. Of the 84 scored cleanly, only 24 appeared consistently in AI recommendations.';
const CANONICAL =
  'https://www.tendorai.com/blog/manchester-solicitors-chatgpt-recommendations';
const PUBLISHED = '2026-06-01';

// Per-CTA UTM-tagged URL — utm_content carries the position (cta_1 … cta_6).
const CTA_BASE =
  '/aeo-report?utm_source=blog&utm_medium=organic&utm_campaign=manchester-100-firms&utm_content=';

export const metadata: Metadata = {
  title: `${TITLE} | TendorAI`,
  description: DESCRIPTION,
  alternates: { canonical: CANONICAL },
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
};

function CtaButton({
  label,
  ctaId,
  large = false,
}: {
  label: string;
  ctaId: string;
  large?: boolean;
}) {
  const sizing = large ? 'px-8 py-4 text-base' : 'px-6 py-3 text-sm';
  return (
    <div className="not-prose my-8 flex justify-center">
      <Link
        href={`${CTA_BASE}${ctaId}`}
        className={`inline-flex items-center justify-center w-full sm:w-auto ${sizing} font-semibold rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors shadow-sm`}
      >
        {label}
      </Link>
    </div>
  );
}

export default function ManchesterSolicitorsChatGPTPage() {
  const today = new Date().toISOString().split('T')[0];

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: TITLE,
    description: DESCRIPTION,
    datePublished: PUBLISHED,
    dateModified: today,
    author: {
      '@type': 'Person',
      name: 'Scott Davies',
      url: 'https://www.tendorai.com/about',
      jobTitle: 'Founder, TendorAI',
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
    url: CANONICAL,
    mainEntityOfPage: { '@type': 'WebPage', '@id': CANONICAL },
    image: 'https://www.tendorai.com/logo.png',
    inLanguage: 'en-GB',
    articleSection: 'AI Visibility Research',
    keywords: [
      'Manchester solicitors ChatGPT',
      'AI visibility Manchester',
      'SRA solicitor AI recommendations',
      'AI visibility research UK',
      'ChatGPT solicitor recommendations',
    ],
  };

  // Per brief: explicit Organization block confirming TendorAI Ltd identity.
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://www.tendorai.com/#organization',
    name: 'TendorAI Ltd',
    legalName: 'TendorAI Ltd',
    url: 'https://www.tendorai.com',
    logo: 'https://www.tendorai.com/logo.png',
    email: 'scott.davies@tendorai.com',
    identifier: {
      '@type': 'PropertyValue',
      name: 'Companies House Number',
      propertyID: 'https://find-and-update.company-information.service.gov.uk',
      value: '16521860',
    },
    founder: {
      '@type': 'Person',
      name: 'Scott Davies',
      jobTitle: 'Founder',
      url: 'https://www.tendorai.com/about',
    },
    areaServed: { '@type': 'Country', name: 'United Kingdom' },
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <main className="min-h-screen bg-white">
        {/* Hero — brand gradient, no image (matches existing blog template) */}
        <section className="bg-brand-gradient text-white py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <nav className="text-sm mb-6 text-purple-200">
              <Link href="/" className="hover:text-white">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/blog" className="hover:text-white">Blog</Link>
              <span className="mx-2">/</span>
              <span className="text-white">Manchester research</span>
            </nav>
            <p className="text-xs uppercase tracking-[0.2em] text-white/80 mb-3">
              AI Visibility Research · Manchester
            </p>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight" style={{ fontFamily: 'var(--font-serif)' }}>
              {TITLE}
            </h1>
            <p className="mt-4 text-base text-white/90">
              By Scott Davies, Founder of TendorAI · Published 1 June 2026 · 4 min read
            </p>
          </div>
        </section>

        {/* Body */}
        <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12 prose prose-slate lg:prose-lg">
          <p className="lead font-semibold text-lg text-gray-900">
            We tested 100 Manchester solicitor firms last week. Of the 84 we could measure cleanly,
            only 24 appeared consistently in AI recommendations. Find out where your firm sits — free,
            90 seconds.
          </p>

          <CtaButton label="Check if ChatGPT recommends your firm" ctaId="cta_1" />

          <h2>The question your clients are now asking ChatGPT</h2>
          <p>
            Right now, prospective clients in Manchester are typing this into ChatGPT, Claude, and
            Perplexity:
          </p>
          <blockquote>
            &ldquo;Who&rsquo;s the best conveyancing solicitor in Manchester?&rdquo;
            <br />
            &ldquo;Recommend a family law solicitor near me.&rdquo;
            <br />
            &ldquo;Which Manchester firm should I use for wills and probate?&rdquo;
          </blockquote>
          <p>
            AI doesn&rsquo;t return 100 firms with phone numbers like Google. It names 2 or 3.
            Everyone else is absent completely.
          </p>
          <p>
            We tested 100 Manchester firms to find out who&rsquo;s in the 2 or 3 — and who
            isn&rsquo;t.
          </p>

          <CtaButton label="See which firms AI names instead of yours" ctaId="cta_2" />

          <h2>The 5 firms ChatGPT named again and again</h2>
          <p>
            When we asked AI for Manchester legal recommendations across our test queries, the same
            firms appeared on repeat:
          </p>
          <ul>
            <li><strong>Stowe Family Law</strong></li>
            <li><strong>Maguire Family Law</strong></li>
            <li><strong>Pannone Corporate</strong></li>
            <li><strong>McAlister Family Law</strong></li>
            <li><strong>Kuits Solicitors</strong></li>
          </ul>
          <p>
            They aren&rsquo;t necessarily the best lawyers in Manchester. They&rsquo;re the firms AI
            can verify confidently — clear specialisms, structured website data, claimed Google
            Business Profile, directory recognition.
          </p>
          <p>
            For most firms we tested, AI could identify basic{' '}
            <a
              href="https://www.sra.org.uk/consumers/register/"
              target="_blank"
              rel="noopener noreferrer"
            >
              SRA register
            </a>{' '}
            entries but lacked enough structured confidence signals to recommend them consistently.
            That&rsquo;s the gap.
          </p>

          <CtaButton label="Find your firm in the Manchester data" ctaId="cta_3" />

          <h2>What we found across the 84 firms we scored cleanly</h2>
          <p>
            We tested 100 SRA-registered firms. 84 returned complete scoring data; 16 returned
            partial data and were excluded from the score-band analysis below. Of the 84 we
            measured cleanly:
          </p>
          <ul>
            <li><strong>24 firms consistently cited</strong> by AI — the recommended group, scoring 50+</li>
            <li><strong>44 firms occasionally cited</strong> — sporadic mentions, never first in queue</li>
            <li><strong>16 firms effectively invisible</strong> — scoring below 30, absent from AI recommendations</li>
          </ul>
          <p>
            The UK average AI Visibility Score sits around 34/100. The 24 cited Manchester firms
            score 50+. Most firms we tested fall well below that line.
          </p>
          <p>One Manchester firm scored 5/100. Total AI invisibility.</p>

          <CtaButton label="Get your firm's score" ctaId="cta_4" />

          <h2>What this means for revenue</h2>
          <p>
            The average family law instruction in the UK is worth around £3,000. Conveyancing
            instructions average £1,200. Commercial and probate considerably more.
          </p>
          <p>
            If even a small proportion of legal enquiries are now concentrated among the 24 firms
            consistently cited, that&rsquo;s a measurable shift in client routing — and the 76
            less-visible firms are competing for everything AI didn&rsquo;t route. They don&rsquo;t
            realise the AI-routed enquiries existed.
          </p>
          <p>
            Every month you don&rsquo;t know your AI Visibility Score, the routing shift continues
            without you.
          </p>

          <CtaButton label="Check whether AI recommends your firm" ctaId="cta_5" />

          <h2>The fix is mechanical, not mystical</h2>
          <p>The firms AI cites have five things in common:</p>
          <ol>
            <li>
              <Link href="/blog/does-structured-data-help-ai-visibility">Structured data</Link> on
              their website (FAQ schema, LocalBusiness markup)
            </li>
            <li>Claimed Google Business Profile with reviews and Q&amp;A populated</li>
            <li>
              Consistent regulatory identity across SRA register, Companies House, and directories
            </li>
            <li>
              Practice-area clarity — named services, not &ldquo;we do all aspects of law&rdquo;
            </li>
            <li>
              Authority signals —{' '}
              <a
                href="https://www.legal500.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Legal 500
              </a>
              ,{' '}
              <a
                href="https://chambers.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Chambers
              </a>
              , CQS, Lexcel, Resolution
            </li>
          </ol>
          <p>
            This isn&rsquo;t SEO. It&rsquo;s not marketing. It&rsquo;s the verification stack AI
            uses to decide which firms to recommend. It&rsquo;s measurable. It&rsquo;s fixable.
          </p>
          <p>
            Most Manchester firms haven&rsquo;t realised yet that AI visibility is now its own
            category — separate from Google rankings, separate from paid advertising, separate from
            referral networks.
          </p>
          <p>
            TendorAI is the UK&rsquo;s first platform built specifically for this. We measure your
            AI visibility weekly, identify the structural gaps, and install the schema fixes on
            your website within 48 hours.
          </p>
          <p>
            The 24 Manchester firms scoring above 50 figured this out. The other 60 we scored
            cleanly haven&rsquo;t.
          </p>

          <h2>Your free report</h2>
          <p>
            We&rsquo;ve already tested 100 Manchester firms. Yours might be one of them. The report
            shows:
          </p>
          <ul>
            <li>Your current AI Visibility Score (0–100)</li>
            <li>Which Manchester competitors AI names instead of you</li>
            <li>The exact structured-data gaps stopping AI from recommending you</li>
            <li>The specific fixes that move firms into the cited group</li>
          </ul>
          <p>
            <strong>No signup. No credit card. 90 seconds.</strong>
          </p>

          <CtaButton label="See if ChatGPT recommends your firm" ctaId="cta_6" large />

          <hr />

          <p className="text-xs text-gray-500 italic">
            Research conducted 31 May 2026 across 100 Manchester SRA-registered solicitor firms.
            Each firm tested against ChatGPT, Claude, and Perplexity using practice-area-specific
            consumer recommendation prompts (e.g. &ldquo;recommend a conveyancing solicitor in
            Manchester&rdquo;), run multiple times across the test period to control for response
            variance. 84 firms returned complete scoring across all signals; 16 returned partial
            data and were excluded from the score-band analysis but included in the qualitative
            findings. National plcs and regional giants (DWF, JMW, Kuits, Pannone) were tested as
            comparison points but excluded from the SME cohort. TendorAI is operated by TendorAI
            Ltd (Companies House 16521860).
          </p>
        </article>
      </main>
    </>
  );
}
