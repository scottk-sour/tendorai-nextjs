import { Metadata } from 'next';
import Link from 'next/link';

const TITLE =
  'Why AI Assistants Check Your ICAEW Registration Before Recommending Your Accountancy Firm';
const SHORT_TITLE =
  'Why AI Assistants Check Your ICAEW Registration';
const DESCRIPTION =
  'Before ChatGPT, Claude or Perplexity recommends an accountant, it has to work out which firms are genuinely chartered and ICAEW-registered. Where your website and the ICAEW record disagree, the assistant hedges or leaves you out. Here is how that check works and how to pass it.';
const CANONICAL =
  'https://tendorai.com/blog/why-ai-checks-icaew-registration';
const PUBLISHED = '2026-06-22';
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
    q: 'Does ChatGPT really check ICAEW registration?',
    a: 'Not by calling the register live on every query in most cases. It builds a confident picture of your firm from public sources — the ICAEW register, Companies House, your website and directories — and recommends you when those sources agree that you are a real, chartered or registered firm. Browsing-enabled assistants can also retrieve and cite register-derived sources directly. Either way, consistency with the record is what earns the recommendation.',
  },
  {
    q: 'Is accountant a protected title in the UK?',
    a: 'No. Anyone can call themselves an accountant. Chartered Accountant is protected and restricted to members of bodies such as ICAEW, ICAS and Chartered Accountants Ireland, and statutory audit requires registration with a recognised supervisory body. That is precisely why verifiable ICAEW status is such a strong signal to AI assistants — it separates genuinely regulated firms from the unregulated majority.',
  },
  {
    q: 'We are ICAEW-registered. Why are we still not recommended by AI?',
    a: 'Being registered is not the same as being confirmable by a machine. If your registered name, trading name, address and status are inconsistent across your public footprint, or your ICAEW details are only shown as a logo rather than machine-readable text, an assistant cannot resolve you to the register confidently, and will hedge or exclude you even though your status is genuine.',
  },
  {
    q: 'What is the single most important fix to get recommended by AI?',
    a: 'Consistency. Make your registered firm name, ICAEW details, address and phone number identical everywhere they appear, and put your chartered status in plain text and structured data on your own site. That one discipline resolves most exclusions.',
  },
  {
    q: 'How do I know if AI assistants currently recommend my firm?',
    a: 'Test it directly — ask ChatGPT, Claude and Perplexity for an accountant or chartered firm in your area and see whether you are named. One test is not enough, because answers vary; you need to check across assistants and repeat. TendorAI runs this check across the major AI platforms and scores where your firm stands.',
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

export default function WhyAiChecksIcaewRegistrationPage() {
  const today = new Date().toISOString().split('T')[0];

  // Single Article graph — BlogPosting (subtype of Article), enriched with the
  // brief's additions (author.worksFor, publisher.legalName/identifier, about[],
  // mainEntityOfPage). The brief's pasted schema used @type: 'Article'; we use
  // BlogPosting here to match the SRA sibling post — same shape, validates as
  // Article. Two Article graphs on one page is a validation error, so we keep
  // a single graph + the FAQPage.
  const blogPostingJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: TITLE,
    description: DESCRIPTION,
    author: {
      '@type': 'Person',
      name: AUTHOR,
      jobTitle: 'Founder',
      url: 'https://tendorai.com/about',
      worksFor: {
        '@type': 'Organization',
        name: 'TendorAI',
        url: 'https://tendorai.com',
      },
    },
    publisher: {
      '@type': 'Organization',
      name: 'TendorAI',
      url: 'https://tendorai.com',
      legalName: 'TendorAI Ltd',
      identifier: 'Companies House 16521860',
      logo: {
        '@type': 'ImageObject',
        url: 'https://tendorai.com/logo.png',
      },
    },
    datePublished: PUBLISHED,
    dateModified: today,
    url: CANONICAL,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': CANONICAL,
    },
    about: [
      { '@type': 'Thing', name: 'Institute of Chartered Accountants in England and Wales' },
      { '@type': 'Thing', name: 'AI visibility' },
      { '@type': 'Thing', name: 'UK accountants' },
    ],
    keywords: [
      'ICAEW register AI',
      'AI visibility for accountants',
      'ChatGPT accountant recommendations',
      'chartered accountant AI',
      'regulated entity resolution',
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
        item: 'https://tendorai.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: 'https://tendorai.com/blog',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'AI Visibility',
        item: 'https://tendorai.com/blog?category=AI%20Visibility',
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
      {/* DO NOT PUBLISH UNTIL VERIFIED — the body deliberately does NOT
          include the placeholder consistency-gap percentage. Run the
          ICAEW-segment audit (registered-name vs trading-name vs site, NAP
          match, ICAEW details in machine-readable text, chartered/auditor/
          specialism corroboration) and add the real figure to the "The
          scale of the gap" section before promoting this page. Suggested
          form: "Across the ICAEW-registered firms in our dataset, [N]%
          show at least one identity consistency issue that can cause AI
          exclusion." Until that audit ships, the page remains accurate
          as-is — no unverified stat is rendered. */}

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
              <span className="text-white">AI Visibility</span>
              <span className="mx-2">/</span>
              <span className="text-white">ICAEW Registration &amp; AI</span>
            </nav>

            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 text-sm font-medium rounded-full bg-white/20 text-white">
                AI Visibility
              </span>
              <span className="text-blue-200">8 min read</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
              {TITLE}
            </h1>

            <p className="text-lg text-blue-100 leading-relaxed">
              {DESCRIPTION}
            </p>

            <div className="mt-6 text-sm text-blue-200">
              <span className="text-white font-medium">{AUTHOR}</span>
              <span className="mx-2">&middot;</span>
              Published{' '}
              {new Date(PUBLISHED).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </div>
          </div>
        </section>

        {/* Article body */}
        <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
          <p className="text-gray-700 leading-relaxed mb-6">
            <strong>The short answer:</strong> when someone asks an AI
            assistant for an accountant — especially a chartered one, or one
            for audit, year-end or advisory work — the assistant has to
            decide which firms it can safely vouch for. Unlike
            &quot;solicitor&quot;, the word &quot;accountant&quot; is not a
            protected title: anyone can use it. That makes the market noisier,
            and it makes verifiable ICAEW status one of the strongest signals
            an assistant has to separate genuinely regulated firms from
            everyone else. So before it names you, it checks whether what
            your website claims about you lines up with the authoritative
            record — chiefly the ICAEW register and Companies House. Where
            they agree, it is confident enough to recommend you. Where they
            conflict — a trading name that does not match your registered
            firm, an out-of-date address, &quot;chartered&quot; or
            &quot;registered auditor&quot; claims the record does not
            corroborate — it cannot confirm you are the firm the user is
            looking for, so it hedges or drops you. None of this is visible
            to you, and there is no notification when it happens.
          </p>

          <p className="text-gray-700 leading-relaxed mb-8">
            This is one of the most common and most fixable reasons a capable
            accountancy firm never appears in AI recommendations. Below is
            how the check works, the four mismatches that cause exclusion,
            and what to do about each.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
            &quot;Accountant&quot; is not protected — which is exactly why AI
            leans on ICAEW
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Here is the distinction that drives the whole thing. In the UK,{' '}
            <strong>&quot;accountant&quot; is an unregulated term</strong> —
            there is no law stopping anyone from using it. But{' '}
            <strong>&quot;Chartered Accountant&quot; is protected</strong>,
            restricted to members of bodies like ICAEW, ICAS and Chartered
            Accountants Ireland. Statutory audit, and certain other reserved
            work, requires registration with a recognised supervisory body,
            of which ICAEW is the largest.
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            For an AI assistant, that is the difference between a claim it
            can stand behind and one it cannot. When a business owner asks
            for &quot;a chartered accountant in Bristol&quot; or &quot;an
            ICAEW firm for our year-end&quot;, naming a firm that is not
            actually chartered or registered is a factual error the model is
            trained to avoid. So it does not simply match the word
            &quot;accountant&quot; on your website — it looks for
            confirmation that your firm holds the status it claims. Your
            relationship to the ICAEW record is therefore a gating signal,
            applied before the quality of your website content is ever
            considered.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
            How AI actually uses the register — entity resolution, not a live
            lookup
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            It is worth being precise, because the popular shorthand is
            misleading. Most AI assistants do not query ICAEW&rsquo;s
            database in real time on every request. What they do is build a
            confident picture of your firm — an <em>entity</em> — from
            everything they have seen about you across the public web: the
            ICAEW register, Companies House, your own website, accountancy
            directories, review sites. The more these sources agree, the
            more confident the model is that you exist, that you are
            chartered or registered, and that you do the work you claim.
            That confidence is what earns the recommendation.
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            For browsing-enabled answers — Perplexity, Google AI Overviews,
            and ChatGPT when it searches — register-derived sources can also
            be retrieved and cited directly. In both cases the principle is
            the same:{' '}
            <strong>
              consistency between your public information and the regulatory
              record is the trust signal.
            </strong>{' '}
            Inconsistency is the failure mode.
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            We call this regulated-entity resolution: the process by which
            an AI assistant decides whether the firm in front of it is the
            same regulated firm named in the official record. Firms that
            resolve cleanly get recommended. Firms that resolve ambiguously
            get hedged.
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            The chain looks like this — four authoritative sources feeding
            a single resolution check, with one binary outcome on the other
            side:
          </p>

          <figure className="my-8">
            <img
              src="/blog/ai-verification-chain-icaew.svg"
              alt="The AI Verification Chain: ICAEW register, Companies House, your website and directories feed an entity-resolution step. Agreement leads to recommendation; conflict leads to exclusion."
              loading="lazy"
              className="block mx-auto w-full max-w-2xl h-auto"
            />
            <figcaption className="text-sm text-gray-500 italic mt-3 text-center">
              The AI Verification Chain: the ICAEW register, Companies
              House, your website and the directories you appear in are
              reconciled into one entity. Agreement earns a recommendation;
              conflict earns exclusion.
            </figcaption>
          </figure>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
            The four mismatches that get firms excluded
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            In our analysis of UK regulated firms, the same four
            discrepancies account for the large majority of avoidable
            exclusions. Each is a gap between what your website tells an AI
            assistant and what the ICAEW record tells it.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
            1. Trading name versus registered name
          </h3>
          <p className="text-gray-700 leading-relaxed mb-6">
            Your firm trades as &quot;Summit Accountancy&quot; but is
            registered at Companies House, and listed with ICAEW, as
            &quot;S A Chartered Accountants Limited.&quot; To a human these
            are obviously the same firm. To an AI assistant building an
            entity, they can read as two weakly-connected things — neither
            of which it can confidently recommend. State the registered firm
            name and your ICAEW firm details plainly on your site, and
            connect the trading name to them, so the two resolve to one
            entity.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
            2. Address and contact inconsistency (NAP)
          </h3>
          <p className="text-gray-700 leading-relaxed mb-6">
            Name, address and phone number that differ between your
            website, your Google Business Profile, the ICAEW record and the
            directories you appear in is the single most common consistency
            failure. An old office address on one source and a current one
            on another forces the model to choose which to trust — and
            uncertainty pushes you down or out. Every public mention of your
            firm should carry the same address and phone number, matching
            the record.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
            3. &quot;Chartered&quot; and &quot;registered auditor&quot;
            claims the record does not support
          </h3>
          <p className="text-gray-700 leading-relaxed mb-6">
            This one is sharper for accountants than for any other sector,
            because the headline claims are themselves regulated. If your
            site says &quot;chartered accountants&quot; or &quot;registered
            auditors&quot; but your firm&rsquo;s ICAEW and audit-register
            footprint does not corroborate that status, the assistant has
            no safe basis for repeating the claim — and will not stake a
            recommendation on it. The same applies to specialisms:
            &quot;specialist R&amp;D tax&quot; or &quot;ICAEW-accredited
            probate&quot; needs to be reinforced across your public
            footprint, not asserted once on a services page.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
            4. Regulated status that is not machine-readable
          </h3>
          <p className="text-gray-700 leading-relaxed mb-6">
            Many firms display &quot;ICAEW Chartered Accountants&quot; as a
            logo in the footer, or &quot;regulated by ICAEW&quot; as an
            image with no firm number nearby. A person sees it instantly; a
            machine often cannot extract it. Your ICAEW firm details, in
            plain text and ideally in structured data, are what let an
            assistant connect your website to the register with confidence.
            Without them, you are asking the model to take your chartered
            status on trust — which, for a recommendation it has to stand
            behind, it will not do.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
            Why you cannot see this happening
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            The hardest part of this problem is that it is silent. When a
            business owner asks an AI assistant for an accountant and your
            firm is excluded on a consistency check, there is no impression
            logged, no bounce, no analytics event — nothing in any
            dashboard you own. The enquiry simply goes to the two or three
            firms the assistant <em>could</em> confirm, and you never know
            the conversation took place. A firm can rank well on Google,
            have a strong reputation and a full client book, and still be
            quietly filtered out of AI recommendations because its
            registered name and its trading name have never been connected
            in a way a machine can read.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
            How to pass the check
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            The work is unglamorous and entirely within your control:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-gray-700 mb-6">
            <li>
              <strong>
                State your registered firm name and ICAEW firm details in
                plain text
              </strong>{' '}
              on your site, and connect your trading name to them.
            </li>
            <li>
              <strong>
                Make your name, address and phone number identical
              </strong>{' '}
              across your website, Google Business Profile, the ICAEW
              record and every directory you appear in.
            </li>
            <li>
              <strong>Reinforce your status and specialisms</strong> —
              chartered, registered auditor, the services and sectors you
              want recommendations for — clearly and consistently across
              your public footprint, not asserted once.
            </li>
            <li>
              <strong>Add structured data (schema)</strong> that encodes
              your firm as a regulated{' '}
              <code className="bg-gray-100 px-1 rounded text-sm">
                AccountingService
              </code>{' '}
              entity with its ICAEW details, so assistants can resolve you
              to the register without guessing.
            </li>
          </ul>
          <p className="text-gray-700 leading-relaxed mb-6">
            Done properly, this turns four sources of doubt into four
            sources of confirmation — and moves you from the &quot;cannot
            safely recommend&quot; pile into the &quot;named firm&quot;
            pile.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
            The scale of the gap
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            For accountants the gap is different from most sectors — and
            that is the opportunity. TendorAI maintains a dataset of more
            than 63,000 UK regulated firms drawn from the official
            registers — ICAEW, SRA, FCA and Propertymark. Unlike
            solicitors, where many firms have no website at all,{' '}
            <strong>
              nearly all ICAEW-registered accountancy firms have a website
            </strong>
            . The problem is not absence; it is that most of those sites
            carry the consistency gaps above and almost none expose their
            regulated status as structured data an AI assistant can read.
            In other words: the firms that get recommended are usually not
            the best firms — they are the firms whose chartered status an
            assistant can actually confirm. Almost everyone is leaving that
            confirmation to chance.
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            That is a fixable position, and being early to fix it is the
            advantage.
          </p>

          <hr className="my-12 border-gray-200" />

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Frequently asked questions
            </h2>
            <FAQSection />
          </section>

          <hr className="my-12 border-gray-200" />

          <p className="text-gray-600 italic leading-relaxed">
            TendorAI is the AI visibility platform for UK regulated
            professional services firms. We maintain verified profiles for
            more than 63,000 ICAEW, SRA, FCA and Propertymark-registered
            firms, install structured data on your own domain, and track
            how AI assistants describe and recommend you.{' '}
            <a
              href="https://tendorai.com"
              className="text-purple-600 hover:text-purple-700 underline"
            >
              Check your firm&apos;s AI visibility score
            </a>
            .
          </p>

          {/* Back to blog */}
          <div className="mt-12">
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
