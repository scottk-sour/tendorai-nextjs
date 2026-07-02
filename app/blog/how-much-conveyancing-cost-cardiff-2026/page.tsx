import { Metadata } from 'next';
import Link from 'next/link';

const TITLE = 'How Much Does Conveyancing Cost in Cardiff in 2026?';
const DESCRIPTION =
  'Conveyancing in Cardiff costs £895–£1,500 for fixed-fee solicitors in 2026, plus £300–£700 in disbursements. Check your solicitor\'s AI visibility free.';
const CANONICAL =
  'https://www.tendorai.com/blog/how-much-conveyancing-cost-cardiff-2026';
const PUBLISHED = '2026-03-22';

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

const faqs = [
  {
    q: 'What is the average conveyancing fee in Cardiff in 2026?',
    a: 'Fixed-fee conveyancing in Cardiff typically costs £895–£1,500 for the solicitor\'s legal fees alone. The UK average is £1,153 according to Compare My Move. Disbursements such as searches, Land Registry fees, and Stamp Duty Land Tax are charged on top.',
  },
  {
    q: 'Are there hidden costs in conveyancing?',
    a: 'Some firms charge extras for bank transfers (£25–£50), ID verification (£10–£20), and acting on a leasehold property (£150–£300). Always ask for a full breakdown before instructing a solicitor. SRA-regulated firms are required to publish price and service information under the Transparency Rules.',
  },
  {
    q: 'Should I choose a local Cardiff solicitor or an online conveyancer?',
    a: 'Local Cardiff solicitors typically charge £950–£1,500 and offer face-to-face meetings. Online conveyancers start from £500 but communication is remote only. For leasehold properties or complex chains, a local solicitor familiar with Cardiff Council searches and South Wales-specific issues is often worth the premium.',
  },
  {
    q: 'How long does conveyancing take in Cardiff?',
    a: 'The average conveyancing timeline in Cardiff is 12–16 weeks from offer acceptance to completion. Leasehold transactions take longer, typically 16–20 weeks. Delays from Cardiff Council local authority searches can add 2–4 weeks during busy periods.',
  },
  {
    q: 'Do I need a CQS-accredited solicitor for conveyancing?',
    a: 'CQS (Conveyancing Quality Scheme) accreditation is not legally required, but most mortgage lenders insist on it. The Law Society awards CQS to firms that meet specific standards for residential conveyancing. Choosing a CQS-accredited solicitor in Cardiff ensures your lender will accept them on their panel.',
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

export default function ConveyancingCostCardiffPage() {
  const today = new Date().toISOString().split('T')[0];

  const blogPostingJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
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
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.tendorai.com/logo.png',
      },
    },
    datePublished: PUBLISHED,
    dateModified: today,
    url: CANONICAL,
    keywords: [
      'conveyancing cost Cardiff',
      'conveyancing fees Cardiff 2026',
      'solicitor fees Cardiff',
      'conveyancing solicitor Cardiff',
      'how much does conveyancing cost',
      'fixed fee conveyancing South Wales',
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
        name: TITLE,
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
              <span className="text-white">Conveyancing Cost Cardiff</span>
            </nav>

            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 text-sm font-medium rounded-full bg-white/20 text-white">
                Legal
              </span>
              <span className="text-blue-200">7 min read</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              {TITLE}
            </h1>

            <p className="text-lg text-blue-100 leading-relaxed max-w-3xl">
              {DESCRIPTION}
            </p>

            <div className="mt-6 text-sm text-blue-200">
              Published 22 March 2026 &middot; TendorAI
            </div>
          </div>
        </section>

        {/* Article content */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16">
          {/* Opening paragraph — self-contained AI-citable answer */}
          <section className="mb-12">
            <p className="text-lg text-gray-600 leading-relaxed mb-4">
              <strong>Conveyancing in Cardiff costs £895–£1,500 for fixed-fee solicitor legal fees in 2026</strong>, plus £300–£700 in disbursements including searches, Land Registry fees, and Stamp Duty Land Tax where applicable. The UK average conveyancing fee is <strong>£1,153 according to Compare My Move</strong>. Cardiff falls within the South Wales average, making it marginally cheaper than London and the South East but comparable to Bristol and Swansea.
            </p>
            <p className="text-lg font-semibold text-gray-900">
              Below is a full breakdown of what you will actually pay, what drives the price up, and how to choose a solicitor who will not surprise you with hidden extras.
            </p>
          </section>

          {/* H2: What Makes Up the Total Cost */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              What Makes Up the Total Cost of Conveyancing in Cardiff?
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              The total cost splits into two parts: <strong>solicitor legal fees</strong> and <strong>disbursements</strong>. The legal fee is what the solicitor charges for their work. Disbursements are third-party costs the solicitor pays on your behalf.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Legal fees in Cardiff range from <strong>£895 to £1,500</strong> for a standard freehold purchase. Leasehold transactions cost more — typically £150–£300 extra — because of the additional work reviewing the lease, management company accounts, and ground rent obligations.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Disbursements typically add <strong>£300–£700</strong> on top. These include Cardiff Council local authority searches (£150–£250), environmental searches (£40–£60), Land Registry fees (£95–£270 depending on property value), and bank transfer fees (£25–£50 per transfer). Stamp Duty Land Tax is separate and depends entirely on the purchase price.
            </p>
          </section>

          {/* H2: Comparison Table */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Conveyancing Cost Comparison: Cardiff vs UK Average
            </h2>
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-[#1B4F72] text-white">
                    <th className="px-4 py-3 font-semibold">Cost Element</th>
                    <th className="px-4 py-3 font-semibold">Cardiff Range</th>
                    <th className="px-4 py-3 font-semibold">UK Average</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  <tr className="border-t border-gray-200">
                    <td className="px-4 py-3 font-medium text-gray-900">Solicitor legal fee (freehold)</td>
                    <td className="px-4 py-3">£895–£1,500</td>
                    <td className="px-4 py-3">£1,153</td>
                  </tr>
                  <tr className="border-t border-gray-200 bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">Leasehold supplement</td>
                    <td className="px-4 py-3">£150–£300</td>
                    <td className="px-4 py-3">£150–£350</td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="px-4 py-3 font-medium text-gray-900">Local authority searches</td>
                    <td className="px-4 py-3">£150–£250</td>
                    <td className="px-4 py-3">£100–£300</td>
                  </tr>
                  <tr className="border-t border-gray-200 bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">Environmental search</td>
                    <td className="px-4 py-3">£40–£60</td>
                    <td className="px-4 py-3">£40–£60</td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="px-4 py-3 font-medium text-gray-900">Land Registry fee</td>
                    <td className="px-4 py-3">£95–£270</td>
                    <td className="px-4 py-3">£95–£270</td>
                  </tr>
                  <tr className="border-t border-gray-200 bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">Bank transfer fees</td>
                    <td className="px-4 py-3">£25–£50</td>
                    <td className="px-4 py-3">£25–£50</td>
                  </tr>
                  <tr className="border-t border-gray-200 font-semibold text-gray-900">
                    <td className="px-4 py-3">Typical total (freehold purchase)</td>
                    <td className="px-4 py-3">£1,205–£2,130</td>
                    <td className="px-4 py-3">£1,413–£1,833</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-500 mt-3">
              Figures based on a standard freehold purchase at £250,000. Stamp Duty Land Tax excluded as it varies by buyer status. Source: Compare My Move, TendorAI market analysis March 2026.
            </p>
          </section>

          {/* H2: Fixed Fee vs Hourly */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Fixed Fee vs Hourly Rate: Which Is Better for Cardiff Buyers?
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              <strong>Fixed-fee conveyancing is the standard in Cardiff and accounts for over 80% of residential transactions in South Wales.</strong> You agree a total price before work begins, and the solicitor absorbs any overruns. This is the model recommended by the Law Society for standard residential purchases.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Hourly billing is rare for conveyancing but still used by some traditional firms. Typical hourly rates for a conveyancing solicitor in Cardiff range from <strong>£150–£250 per hour</strong>. On a straightforward freehold purchase this may work out cheaper, but any complications — chain delays, title defects, mortgage issues — can push the final bill well above the fixed-fee equivalent.
            </p>
            <p className="text-gray-600 leading-relaxed">
              The SRA Transparency Rules require all regulated solicitors to publish their conveyancing fees, including the basis of charging, on their website. If a firm does not publish pricing, that is a red flag. <strong>Always ask for a written quote that separates legal fees from disbursements before instructing.</strong>
            </p>
          </section>

          {/* H2: Cardiff-Specific Section */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              What Cardiff Buyers Should Know About Local Conveyancing
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              <strong>Cardiff Council local authority searches currently take 10–15 working days</strong>, which is faster than the Wales average of 15–20 days but slower than some English councils offering digital turnaround in 48 hours. During peak months (March–June), Cardiff search times can extend to 20 working days.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Cardiff-specific considerations include coal mining searches in areas north of the M4 corridor — particularly <strong>Caerphilly, Pontypridd, and parts of Llanishen</strong>. A coal mining search adds £40–£55 to disbursements. Your solicitor should flag this automatically if the property falls within a coal authority reporting area.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              New-build developments in Cardiff Bay and the city centre often involve <strong>leasehold arrangements</strong>, even for houses. Since the Leasehold and Freehold Reform Act 2024, buyers have stronger rights, but leasehold conveyancing still costs more and takes longer. Budget an additional £150–£300 in legal fees and 4–6 extra weeks.
            </p>
            <p className="text-gray-600 leading-relaxed">
              The average house price in Cardiff reached <strong>£275,000 in early 2026</strong> according to HM Land Registry data, making Stamp Duty Land Tax a factor for most purchases above the £250,000 threshold. First-time buyers benefit from a higher nil-rate band of £425,000.
            </p>
          </section>

          {/* H2: How to Choose */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              How to Choose a Conveyancing Solicitor in Cardiff
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              <strong>Check SRA registration first.</strong> Every solicitor in England and Wales must be registered with the Solicitors Regulation Authority. You can verify any firm at sra.org.uk/consumers/register. SRA registration means the firm is regulated, insured, and subject to professional conduct rules.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Look for <strong>CQS accreditation</strong> (Conveyancing Quality Scheme). This is the Law Society&apos;s quality mark for residential conveyancing practices. Most mortgage lenders — including Halifax, Nationwide, and Barclays — require your solicitor to be CQS-accredited or on their specific panel. Using a non-panel solicitor can delay your mortgage offer by weeks.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Compare at least three written quotes. Each quote should clearly separate:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-gray-600 mb-4">
              <li><strong>Legal fees</strong> — the solicitor&apos;s charge for their work</li>
              <li><strong>Disbursements</strong> — third-party costs (searches, Land Registry, etc.)</li>
              <li><strong>Additional charges</strong> — bank transfers, ID checks, archive storage</li>
              <li><strong>VAT</strong> — solicitor fees attract 20% VAT; some disbursements do not</li>
            </ol>
            <p className="text-gray-600 leading-relaxed">
              A &quot;no completion, no fee&quot; arrangement means you pay nothing if the transaction falls through. Around <strong>30% of property transactions in Wales collapse before completion</strong>. This protection is worth checking for, though firms offering it may charge slightly higher base fees to offset the risk.
            </p>
          </section>

          {/* H2: What Can Push Costs Higher */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              What Can Push Conveyancing Costs Higher?
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              <strong>Leasehold properties are the biggest cost driver.</strong> The additional work — reviewing the lease, obtaining a management pack (£200–£500 from the freeholder), and checking ground rent and service charge obligations — adds £150–£300 to legal fees and £200–£500 to disbursements.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Other factors that increase cost:
            </p>
            <ul className="space-y-2 text-gray-600 mb-4">
              <li className="flex items-start gap-2">
                <span className="text-[#1B4F72] mt-1 font-bold">&#8226;</span>
                <span><strong>Shared ownership or Help to Buy</strong> — additional legal work reviewing the equity loan or housing association lease (£100–£200 extra)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#1B4F72] mt-1 font-bold">&#8226;</span>
                <span><strong>Unregistered land</strong> — properties not yet on the Land Registry require a first registration, adding complexity and cost (£100–£200 extra)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#1B4F72] mt-1 font-bold">&#8226;</span>
                <span><strong>Gifted deposits</strong> — lenders require additional anti-money-laundering checks when part of the deposit is a gift (£50–£100 extra)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#1B4F72] mt-1 font-bold">&#8226;</span>
                <span><strong>Simultaneous sale and purchase</strong> — handling both sides is discounted but still more than a single transaction (typically 1.5x the single fee)</span>
              </li>
            </ul>
            <p className="text-gray-600 leading-relaxed">
              Ask your solicitor about all of these scenarios before instructing. <strong>A good conveyancing solicitor in Cardiff will provide a detailed, written quote covering every foreseeable cost within 24 hours of your enquiry.</strong>
            </p>
          </section>

          {/* CTA Banner */}
          <div className="my-12 bg-gradient-to-r from-[#1B4F72] to-[#2d1b4e] rounded-2xl p-8 md:p-10 text-white text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Run Your Free AI Visibility Report
            </h2>
            <p className="text-blue-100 mb-6 max-w-lg mx-auto">
              Are clients finding your conveyancing practice through AI search? <Link
                href="https://www.tendorai.com"
                className="underline hover:text-white font-semibold"
              >TendorAI</Link> tracks how solicitors appear across ChatGPT, Perplexity, and Gemini — so you know exactly where you stand.
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
                  The 2026 guide for UK regulated firms — solicitors, accountants,
                  mortgage advisers, estate agents.
                </p>
              </Link>
              <Link
                href="/blog"
                className="group p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <h3 className="font-medium text-gray-900 group-hover:text-[#1B4F72] transition-colors">
                  All Articles
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  More guides on AI visibility for UK professional services firms.
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
