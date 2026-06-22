import { Metadata } from 'next';
import Link from 'next/link';

const TITLE =
  'Why AI Assistants Check Your SRA Registration Before Recommending Your Firm';
const SHORT_TITLE =
  'Why AI Assistants Check Your SRA Registration';
const DESCRIPTION =
  'Before ChatGPT, Claude or Perplexity names a UK solicitor, it has to confirm the firm is genuinely SRA-regulated. Where your website and the SRA register disagree, the assistant hedges or leaves you out. Here is how that check works and how to pass it.';
const CANONICAL =
  'https://tendorai.com/blog/why-ai-checks-sra-registration';
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
    q: 'Does ChatGPT really check the SRA register?',
    a: "Not by calling it live on every query in most cases. It builds a confident picture of your firm from public sources — the SRA register, Companies House, your website and directories — and recommends you when those sources agree that you are a real, regulated firm. Browsing-enabled assistants can also retrieve and cite register-derived sources directly. Either way, consistency with the register is what earns the recommendation.",
  },
  {
    q: 'My firm is fully SRA-regulated. Why am I still not recommended by AI?',
    a: 'Being regulated is not the same as being confirmable by a machine. If your registered name, trading name, address and practice areas are inconsistent across your public footprint, or your SRA number is not in machine-readable text, an AI assistant cannot resolve you to the register confidently, and will hedge or exclude you even though your regulation is genuine.',
  },
  {
    q: 'Is AI visibility the same as SEO for solicitors?',
    a: "No. SEO determines where you rank in Google's list of links. AI visibility determines whether an AI assistant is willing to name your firm as a recommendation. The signals overlap but the decision is different: ranking is about relevance; recommendation is about confirmable identity and trust.",
  },
  {
    q: 'What is the single most important fix to get recommended by AI?',
    a: 'Consistency. Make your registered name, SRA number, address and phone number identical everywhere they appear, and put your SRA number in plain text and structured data on your own site. That one discipline resolves most exclusions.',
  },
  {
    q: 'How do I know if AI assistants currently recommend my firm?',
    a: 'Test it directly — ask ChatGPT, Claude and Perplexity for a firm like yours in your area and see whether you are named. One test is not enough, because answers vary; you need to check across assistants and repeat. TendorAI runs this check across the major AI platforms and scores where your firm stands.',
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

export default function WhyAiChecksSraRegistrationPage() {
  const today = new Date().toISOString().split('T')[0];

  // Single Article graph — BlogPosting (subtype of Article), enriched with the
  // brief's additions (author.worksFor, publisher.legalName/identifier, about[],
  // mainEntityOfPage). Existing /blog/ posts inject one Article graph per page,
  // so no duplication.
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
      { '@type': 'Thing', name: 'Solicitors Regulation Authority' },
      { '@type': 'Thing', name: 'AI visibility' },
      { '@type': 'Thing', name: 'UK solicitors' },
    ],
    keywords: [
      'SRA register AI',
      'AI visibility for solicitors',
      'ChatGPT solicitor recommendations',
      'regulated entity resolution',
      'UK law firm AI',
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
        name: 'Legal',
        item: 'https://tendorai.com/blog?category=Legal',
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
      {/* DO NOT PUBLISH UNTIL VERIFIED — reviewer flagged that the body
          deliberately does NOT include the placeholder consistency-gap
          percentage. Run the SRA-segment audit and add the real figure to
          the "The scale of the gap" section before promoting this page.
          Suggested form: "Across the SRA-registered firms in our dataset,
          [N]% show at least one identity consistency issue that can cause
          AI exclusion." Until that audit ships, the page remains accurate
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
              <span className="text-white">Legal</span>
              <span className="mx-2">/</span>
              <span className="text-white">SRA Registration &amp; AI</span>
            </nav>

            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 text-sm font-medium rounded-full bg-white/20 text-white">
                Legal
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
            assistant for a solicitor, the assistant first has to satisfy
            itself that the firms it is about to name are genuinely regulated.
            &quot;Solicitor&quot; is a protected title in England and Wales —
            only SRA-regulated people and firms can use it — so a
            recommendation is only safe if the firm can be matched to the
            regulatory record. The assistant does this by comparing what your
            website says about you against authoritative public data, chiefly
            the SRA register and Companies House. Where those sources agree,
            it is confident enough to recommend you. Where they conflict — a
            trading name that does not match your registered name, an
            out-of-date address, practice areas the register does not reflect
            — it cannot safely confirm you are the regulated firm the user
            asked for, so it hedges or drops you. None of this is visible to
            you, and there is no notification when it happens.
          </p>

          <p className="text-gray-700 leading-relaxed mb-8">
            This is one of the most common, most fixable reasons a competent
            UK law firm never appears in AI recommendations. Below is how the
            check actually works, the four mismatches that cause exclusion,
            and what to do about each.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
            &quot;Solicitor&quot; is a regulated query, not a generic one
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            When a buyer types &quot;best property solicitor in Cardiff&quot;
            into Google, they get a list of links and decide for themselves.
            When they ask ChatGPT, Claude or Perplexity the same question, the
            assistant returns a small number of <em>named</em> firms as
            recommendations — and naming an unregulated business as a
            &quot;solicitor&quot; is a factual error the model is trained to
            avoid.
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            That changes the assistant&rsquo;s behaviour. It is no longer
            matching keywords; it is trying to confirm that each candidate is
            a real, identifiable, regulated entity before it will put its name
            in an answer. The SRA register is the authoritative source for
            that confirmation. Your firm&rsquo;s relationship to that register
            — how cleanly your public information maps onto it — is therefore
            a gating signal, applied before the quality of your website
            content is ever considered.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
            How AI actually uses the register — entity resolution, not a live
            lookup
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            It is worth being precise here, because the popular shorthand is
            misleading. Most AI assistants do not call the SRA&rsquo;s
            database in real time on every query. What they do is build a
            confident picture of your firm — an <em>entity</em> — from
            everything they have seen about you across the public web: the
            register, Companies House, your own website, legal directories,
            review sites. The more these sources agree, the more confident
            the model is that you exist, that you are regulated, and that you
            do what you claim. That confidence is what earns the
            recommendation.
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            For browsing-enabled answers — Perplexity, Google AI Overviews,
            and ChatGPT when it searches — register-derived sources can also
            be retrieved and cited directly in the response. In both cases the
            principle is the same:{' '}
            <strong>
              consistency between your public information and the regulatory
              record is the trust signal.
            </strong>{' '}
            Inconsistency is the failure mode.
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            We call this regulated-entity resolution: the process by which an
            AI assistant decides whether the firm in front of it is the same
            regulated firm named in the official record. Firms that resolve
            cleanly get recommended. Firms that resolve ambiguously get
            hedged.
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            The chain looks like this — four authoritative sources feeding a
            single resolution check, with one binary outcome on the other
            side:
          </p>

          <figure className="my-8">
            <img
              src="/blog/ai-verification-chain.svg"
              alt="The AI Verification Chain: SRA register, Companies House, your website and directories feed an entity-resolution step. Agreement leads to recommendation; conflict leads to exclusion."
              loading="lazy"
              className="block mx-auto w-full max-w-2xl h-auto"
            />
            <figcaption className="text-sm text-gray-500 italic mt-3 text-center">
              The AI Verification Chain: the SRA register, Companies House,
              your website and the directories you appear in are reconciled
              into one entity. Agreement earns a recommendation; conflict
              earns exclusion.
            </figcaption>
          </figure>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
            The four mismatches that get firms excluded
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            In our analysis of UK regulated firms, the same four discrepancies
            account for the large majority of avoidable exclusions. Each is a
            gap between what your website tells an AI assistant and what the
            SRA register tells it.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
            1. Trading name versus registered name
          </h3>
          <p className="text-gray-700 leading-relaxed mb-6">
            Your firm trades as &quot;Cardiff Property Law&quot; but is
            registered with the SRA and at Companies House as &quot;C P L
            Solicitors Limited.&quot; To a human this is obviously the same
            firm. To an AI assistant building an entity, it can read as two
            weakly-connected things — neither of which it can confidently
            recommend. The fix is to state the registered name and the SRA
            number plainly on your site and link the trading name to it, so
            the two resolve to one entity.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
            2. Address and contact inconsistency (NAP)
          </h3>
          <p className="text-gray-700 leading-relaxed mb-6">
            Name, address and phone number that differ between your website,
            your Google Business Profile, the SRA record and the directories
            you appear in is the single most common consistency failure. An
            old office address on one source and a current one on another
            forces the model to choose which to trust — and uncertainty
            pushes you down or out. Every public mention of your firm should
            carry the same address and phone number, matching the register.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
            3. Practice areas the register does not support
          </h3>
          <p className="text-gray-700 leading-relaxed mb-6">
            If your site leads with &quot;specialist medical negligence
            solicitors&quot; but your SRA record and wider footprint give no
            signal that you practise in that area, the assistant has no
            corroboration for the claim — so it will not stake a
            recommendation on it. Make sure the practice areas you want to be
            recommended for are stated clearly, consistently, and in a form
            the register and your other sources reinforce.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
            4. Regulated status that is not machine-readable
          </h3>
          <p className="text-gray-700 leading-relaxed mb-6">
            Many firms display &quot;Regulated by the Solicitors Regulation
            Authority&quot; as an image, a footer logo, or buried text with
            no SRA number nearby. A person sees it instantly; a machine often
            cannot extract it. Your SRA number, in plain text and ideally in
            structured data, is what lets an assistant connect your website
            to the register with confidence. Without it, you are asking the
            model to take your regulated status on trust — which, for a
            recommendation it has to stand behind, it will not do.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
            Why you cannot see this happening
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            The hardest part of this problem is that it is silent. When a
            buyer asks an AI assistant for a solicitor and your firm is
            excluded on a consistency check, there is no impression logged,
            no bounce, no analytics event — nothing in any dashboard you own.
            The enquiry simply goes to the two or three firms the assistant{' '}
            <em>could</em> confirm, and you never know the conversation took
            place. A firm can rank well on Google, have a strong reputation,
            and still be quietly filtered out of AI recommendations because
            its registered name and its trading name have never been
            connected in a way a machine can read.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
            How to pass the check
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            The work is unglamorous and entirely within your control:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-gray-700 mb-6">
            <li>
              <strong>State your registered name and SRA number in plain
              text</strong> on your site, and connect your trading name to
              them.
            </li>
            <li>
              <strong>Make your name, address and phone number identical</strong>{' '}
              across your website, Google Business Profile, the SRA record
              and every directory you appear in.
            </li>
            <li>
              <strong>Express the practice areas you want recommendations
              for</strong> clearly and consistently, reinforced across your
              public footprint.
            </li>
            <li>
              <strong>Add structured data (schema)</strong> that encodes your
              firm as a regulated <code className="bg-gray-100 px-1 rounded text-sm">LegalService</code>{' '}
              entity with its SRA number, so assistants can resolve you to
              the register without guessing.
            </li>
          </ul>
          <p className="text-gray-700 leading-relaxed mb-6">
            Done properly, this turns four sources of doubt into four sources
            of confirmation — and moves you from the &quot;cannot safely
            recommend&quot; pile into the &quot;named firm&quot; pile.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
            The scale of the gap
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            The opportunity here is large precisely because so few firms have
            closed it. TendorAI maintains a dataset of more than 63,000 UK
            regulated firms drawn from the official registers — SRA, ICAEW,
            FCA and Propertymark. Within the SRA segment,{' '}
            <strong>
              1,458 registered law firms have no website at all
            </strong>
            , which makes them effectively invisible to every AI assistant.
            Thousands more have a website but carry exactly the consistency
            gaps above. In most towns, the firms that get recommended are
            not the best firms — they are the firms whose regulatory data an
            assistant can confirm.
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
            more than 63,000 SRA, ICAEW, FCA and Propertymark-registered
            firms, install structured data on your own domain, and track how
            AI assistants describe and recommend you.{' '}
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
