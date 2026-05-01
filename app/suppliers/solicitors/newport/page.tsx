import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'SRA-Registered Solicitors in Newport (2026) — AI Visibility Report | TendorAI',
  description:
    'Browse SRA-regulated solicitors in Newport, Gwent. Verified against the Solicitors Regulation Authority register. See which Newport firms appear in ChatGPT, Perplexity, and Google AI when people search for legal advice in South Wales.',
  alternates: {
    canonical: 'https://www.tendorai.com/suppliers/solicitors/newport',
  },
  openGraph: {
    title: 'SRA-Registered Solicitors in Newport (2026) — AI Visibility Report',
    description:
      'Verified Newport solicitors. Compare AI visibility scores across ChatGPT, Perplexity, and Google AI.',
    url: 'https://www.tendorai.com/suppliers/solicitors/newport',
    siteName: 'TendorAI',
    locale: 'en_GB',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

// Verified Newport SRA-regulated firm count from MongoDB (May 2026).
const TOTAL_NEWPORT_FIRMS = 24;

export const revalidate = 3600;

export default function NewportSolicitorsPage() {
  const jsonLdCollection = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'SRA-Registered Solicitors in Newport (2026)',
    url: 'https://www.tendorai.com/suppliers/solicitors/newport',
    description:
      'Directory of SRA-regulated solicitor firms in Newport, Gwent, with AI visibility scores across ChatGPT, Perplexity, and Google AI.',
    isPartOf: {
      '@type': 'WebSite',
      name: 'TendorAI',
      url: 'https://www.tendorai.com',
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.tendorai.com' },
        { '@type': 'ListItem', position: 2, name: 'Suppliers', item: 'https://www.tendorai.com/suppliers' },
        { '@type': 'ListItem', position: 3, name: 'Solicitors', item: 'https://www.tendorai.com/suppliers/solicitors' },
        { '@type': 'ListItem', position: 4, name: 'Newport', item: 'https://www.tendorai.com/suppliers/solicitors/newport' },
      ],
    },
  };

  const jsonLdLegalService = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: 'SRA-Registered Solicitors in Newport',
    areaServed: {
      '@type': 'City',
      name: 'Newport',
      containedInPlace: {
        '@type': 'AdministrativeArea',
        name: 'Gwent, Wales',
      },
    },
    provider: {
      '@type': 'Organization',
      name: 'TendorAI',
      url: 'https://www.tendorai.com',
    },
  };

  const jsonLdFaq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How many SRA-regulated solicitors are based in Newport?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `TendorAI lists ${TOTAL_NEWPORT_FIRMS} SRA-regulated solicitor firms with a registered office in Newport, Gwent. Every firm is verified against the Solicitors Regulation Authority register. Newport is a smaller market than Cardiff or Bristol, but its firms cover the full range of practice areas — conveyancing, family law, criminal, wills and probate, employment, and commercial property — across the city centre, Maindee, Caerleon, and the wider Gwent area.`,
        },
      },
      {
        '@type': 'Question',
        name: 'Why do most Newport solicitors not appear in ChatGPT recommendations?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'AI assistants pull from structured data on the open web. Most Newport firms have a website, but few have schema markup, an SRA-verified profile, named solicitor entities, or fee structures published as machine-readable data. Without that, AI has nothing specific to cite — so it falls back to whichever firms appear most often in directories, news, and review platforms. A firm with detailed, structured information online will be recommended by name; a firm without it will not.',
        },
      },
      {
        '@type': 'Question',
        name: 'Which Newport firms have the strongest AI visibility?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The firms most frequently cited by AI for Newport legal queries are larger multi-disciplinary practices with established websites and decades of local presence — Harding Evans LLP, Petersons, and Everett Tomlin Lloyd & Pratt all appear regularly. Smaller specialists like Hennah Haywood Law and Slate Legal can outperform larger firms on niche queries when their data is structured properly. Visibility is determined by data, not firm size.',
        },
      },
      {
        '@type': 'Question',
        name: 'How is TendorAI different from Yell, the Law Society Find a Solicitor tool, or local directories?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yell and similar directories are built for human readers — they rank by adverts and pageviews. The Law Society register is regulator data, not a recommendation engine. TendorAI publishes structured profiles in formats designed specifically for AI assistants — JSON-LD schema, named regulated individuals, practice areas, areas served, and fee data — so ChatGPT, Perplexity, Google AI, and Claude can cite each firm by name when a user asks for help.',
        },
      },
    ],
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdCollection) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdLegalService) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />

      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-500">
        <Link href="/" className="hover:underline">Home</Link>
        {' / '}
        <Link href="/suppliers" className="hover:underline">Suppliers</Link>
        {' / '}
        <Link href="/suppliers/solicitors" className="hover:underline">Solicitors</Link>
        {' / '}
        <span className="text-gray-700">Newport</span>
      </nav>

      <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
        SRA-Registered Solicitors in Newport (2026) — AI Visibility Report
      </h1>

      <p className="mb-6 text-lg leading-relaxed text-gray-800">
        TendorAI lists <strong>{TOTAL_NEWPORT_FIRMS} SRA-regulated solicitor firms</strong> with a registered
        office in Newport, Gwent. Every firm is verified against the Solicitors Regulation
        Authority register. This page tracks which Newport firms appear in ChatGPT, Perplexity,
        Google AI, and Claude when South Wales residents and businesses ask for legal advice — and
        why most do not.
      </p>

      <ul className="mb-8 list-disc space-y-1 pl-5 text-gray-800">
        <li>{TOTAL_NEWPORT_FIRMS} verified Newport solicitor firms on TendorAI as of May 2026.</li>
        <li>Newport is the third-largest legal market in Wales, after Cardiff and Swansea.</li>
        <li>Most local firms cluster around Commercial Street, Stow Hill, and Cambrian Road.</li>
        <li>Conveyancing, family law, and criminal defence are the three highest-volume practice areas in the city.</li>
        <li>Most Newport firms have no schema markup that AI assistants can cite.</li>
      </ul>

      <h2 className="mb-3 mt-10 text-2xl font-semibold">What does the Newport legal market look like?</h2>
      <p className="mb-4 leading-relaxed text-gray-800">
        Newport sits between Cardiff and Bristol on the M4 corridor and serves the wider Gwent
        area — including Cwmbran, Caerphilly, Risca, and the eastern Valleys. The local profession
        is shaped by that geography: a mix of city-centre full-service firms handling conveyancing
        and commercial work, criminal defence practices serving Newport Magistrates&apos; and Crown Courts,
        and family law specialists supporting clients across Gwent. Larger Cardiff firms compete
        for higher-value Newport work, but a strong cluster of independent local practices
        continues to dominate everyday legal services for residents and SMEs.
      </p>

      <h2 className="mb-3 mt-10 text-2xl font-semibold">Why are Newport solicitors invisible to AI?</h2>
      <p className="mb-4 leading-relaxed text-gray-800">
        Three reasons consistently come up when we audit Newport firms. First, websites are often
        five to ten years old — they were built when Google rewarded keyword density, not
        structured data. Second, most firms publish no fee information online, so AI has nothing
        concrete to cite when a Newport user asks &quot;how much does conveyancing cost?&quot; Third, the SRA
        register lists named regulated individuals, but firm websites rarely connect those people
        to specific practice areas in a machine-readable way.
      </p>
      <p className="mb-4 leading-relaxed text-gray-800">
        The result: when somebody in Newport asks ChatGPT for a family law solicitor, the model
        either names a handful of larger, well-known firms or recommends Cardiff and Bristol firms
        that have invested in better online data. The smaller Newport practices — often the better
        local choice — are passed over not because they are worse, but because they are silent in
        the data layer AI reads.
      </p>

      <h2 className="mb-3 mt-10 text-2xl font-semibold">How can a Newport firm improve its AI visibility?</h2>
      <ol className="mb-4 list-decimal space-y-2 pl-5 leading-relaxed text-gray-800">
        <li>
          <strong>Verify your SRA profile.</strong> Make sure the firm name, SRA number, registered
          office, and named regulated individuals on your website match the SRA register exactly. AI
          cross-references both.
        </li>
        <li>
          <strong>Publish structured fees.</strong> Even fee ranges (&quot;£800–£1,200 for a freehold
          purchase under £350,000&quot;) give AI something concrete to quote. Required for conveyancing
          and probate under the SRA Transparency Rules anyway.
        </li>
        <li>
          <strong>Add LegalService schema.</strong> JSON-LD markup connecting your firm to its
          practice areas, areas served, and named solicitors. This is the single highest-leverage
          technical change for AI visibility.
        </li>
        <li>
          <strong>Claim your TendorAI profile.</strong> Free, takes under two minutes. Adds your
          firm to the data pool that ChatGPT, Perplexity, and Claude already cite.
        </li>
      </ol>

      <h2 className="mb-3 mt-10 text-2xl font-semibold">Which Newport firms appear most often in AI answers?</h2>
      <p className="mb-4 leading-relaxed text-gray-800">
        Based on TendorAI&apos;s monthly AI visibility audits, the Newport firms cited most frequently
        across ChatGPT, Perplexity, and Google AI are:
      </p>
      <ul className="mb-4 list-disc space-y-1 pl-5 text-gray-800">
        <li><strong>Harding Evans LLP</strong> — full-service, Devon Place, strong commercial and personal injury presence.</li>
        <li><strong>Petersons</strong> — broad practice across 13 areas, dominant on multi-vertical queries.</li>
        <li><strong>Everett Tomlin Lloyd &amp; Pratt</strong> — long-established Newport firm, strong family and criminal coverage.</li>
        <li><strong>Hennah Haywood Law</strong> — niche but well-cited for personal injury and conveyancing.</li>
        <li><strong>Glanvilles Damant</strong> — solid mid-market presence on family and commercial property queries.</li>
      </ul>
      <p className="mb-4 leading-relaxed text-gray-800">
        Smaller firms — Slate Legal, Atkinson Solicitors, HPJV Solicitors, Karen Hunte &amp; Co — are
        regulated, capable, and sometimes the better fit for specific work. They simply do not
        appear in AI answers because their data is not in the formats AI reads. That is fixable.
      </p>

      <h2 className="mb-3 mt-10 text-2xl font-semibold">What does TendorAI do for Newport firms?</h2>
      <p className="mb-4 leading-relaxed text-gray-800">
        TendorAI builds a verified profile for every SRA-regulated firm in Newport from public
        regulator data, then lets the firm enrich it with practice areas, fees, accreditations, and
        client reviews. We install schema markup on the firm&apos;s own website, monitor citations across
        the major AI platforms, and report monthly on which queries the firm is winning and losing.
        The free tier covers profile listing and citation tracking. The Pro tier (£299 per month)
        adds schema installation on the firm&apos;s site, monthly tracking reports, and named-citation
        monitoring across ChatGPT, Perplexity, Claude, Google AI, and Microsoft Copilot.
      </p>

      <h2 className="mb-3 mt-10 text-2xl font-semibold">Newport solicitor practice areas covered on TendorAI</h2>
      <ul className="mb-4 grid list-disc grid-cols-2 gap-x-6 gap-y-1 pl-5 text-gray-800 sm:grid-cols-3">
        <li><Link href="/suppliers/conveyancing/newport" className="text-blue-700 hover:underline">Conveyancing</Link></li>
        <li><Link href="/suppliers/family-law/newport" className="text-blue-700 hover:underline">Family Law</Link></li>
        <li><Link href="/suppliers/wills-and-probate/newport" className="text-blue-700 hover:underline">Wills &amp; Probate</Link></li>
        <li><Link href="/suppliers/criminal-law/newport" className="text-blue-700 hover:underline">Criminal Law</Link></li>
        <li><Link href="/suppliers/employment-law/newport" className="text-blue-700 hover:underline">Employment Law</Link></li>
        <li><Link href="/suppliers/commercial-property/newport" className="text-blue-700 hover:underline">Commercial Property</Link></li>
        <li><Link href="/suppliers/personal-injury/newport" className="text-blue-700 hover:underline">Personal Injury</Link></li>
        <li><Link href="/suppliers/litigation/newport" className="text-blue-700 hover:underline">Litigation</Link></li>
        <li><Link href="/suppliers/immigration/newport" className="text-blue-700 hover:underline">Immigration</Link></li>
      </ul>

      <h2 className="mb-3 mt-10 text-2xl font-semibold">Frequently asked questions</h2>

      <h3 className="mb-2 mt-6 text-xl font-semibold">How many SRA-regulated solicitors are based in Newport?</h3>
      <p className="mb-4 leading-relaxed text-gray-800">
        TendorAI lists {TOTAL_NEWPORT_FIRMS} SRA-regulated solicitor firms with a registered office in
        Newport, Gwent. Every firm is verified against the Solicitors Regulation Authority register.
      </p>

      <h3 className="mb-2 mt-6 text-xl font-semibold">Why do most Newport solicitors not appear in ChatGPT?</h3>
      <p className="mb-4 leading-relaxed text-gray-800">
        AI assistants pull from structured data. Most Newport firms have a website but no schema
        markup, no published fees, and no SRA-verified profile that AI can cite. Without that data,
        AI defaults to a handful of larger firms or to firms outside Newport entirely.
      </p>

      <h3 className="mb-2 mt-6 text-xl font-semibold">Which Newport firms have the strongest AI visibility?</h3>
      <p className="mb-4 leading-relaxed text-gray-800">
        Harding Evans LLP, Petersons, and Everett Tomlin Lloyd &amp; Pratt are cited most often.
        Smaller specialists can outperform on niche queries when their data is structured.
      </p>

      <h3 className="mb-2 mt-6 text-xl font-semibold">How is TendorAI different from Yell or the Law Society register?</h3>
      <p className="mb-8 leading-relaxed text-gray-800">
        Yell ranks by adverts. The Law Society register is regulator data. TendorAI publishes
        structured profiles in the JSON-LD format AI assistants actually read — so ChatGPT,
        Perplexity, Google AI, and Claude can cite each firm by name when a user asks for help.
      </p>

      <div className="mt-10 rounded-lg border border-gray-200 bg-gray-50 p-6">
        <h2 className="mb-2 text-xl font-semibold">Check your firm&apos;s AI visibility — free</h2>
        <p className="mb-4 text-gray-800">
          See exactly how ChatGPT, Perplexity, and Google AI describe your Newport firm today, and
          where the gaps are. Free report, no credit card required.
        </p>
        <Link
          href="/aeo-report"
          className="inline-block rounded-md bg-blue-700 px-5 py-2.5 font-medium text-white hover:bg-blue-800"
        >
          Get my free AI visibility report
        </Link>
      </div>

      <p className="mt-10 text-sm text-gray-500">
        Sources: Solicitors Regulation Authority register (sra.org.uk), TendorAI internal data, May 2026.
      </p>
    </main>
  );
}
