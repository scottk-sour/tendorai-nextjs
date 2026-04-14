import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Are Clients Finding You on ChatGPT? What UK Firms Need to Know (2026)',
  description: 'More UK clients are asking ChatGPT and Perplexity to recommend a solicitor, accountant, or mortgage adviser. Is your firm showing up — or your competitor?',
  alternates: { canonical: 'https://www.tendorai.com/are-clients-finding-you-on-chatgpt' },
}

export default function AreClientsFindingYouOnChatGPT() {

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Are Clients Finding You on ChatGPT? What UK Firms Need to Know (2026)",
    "description": "More UK clients are using ChatGPT and Perplexity to find solicitors, accountants, and mortgage advisers. This page explains how AI recommendations work and how to check if your firm appears.",
    "url": "https://www.tendorai.com/are-clients-finding-you-on-chatgpt",
    "dateModified": "2026-04-14",
    "publisher": {
      "@type": "Organization",
      "name": "TendorAI",
      "url": "https://www.tendorai.com"
    }
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.tendorai.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Are Clients Finding You on ChatGPT?",
        "item": "https://www.tendorai.com/are-clients-finding-you-on-chatgpt"
      }
    ]
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Do people actually use ChatGPT to find a solicitor or accountant?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. ChatGPT reached 400 million weekly active users by February 2025 according to OpenAI. A growing proportion of those users ask it for local service recommendations — including solicitors, accountants, and mortgage advisers. When they do, ChatGPT names two or three specific firms. Most UK firms do not know whether they appear in those answers."
        }
      },
      {
        "@type": "Question",
        "name": "How does ChatGPT decide which firm to recommend?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "ChatGPT cross-references structured data on your website, your regulatory registration (SRA, FCA, ICAEW), review platforms, and third-party mentions. Firms with verified, structured data are recommended. Firms without it are invisible — regardless of how good their website looks."
        }
      },
      {
        "@type": "Question",
        "name": "How do I check if my firm appears in ChatGPT recommendations?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The quickest way is to ask ChatGPT directly: 'Who are the best [solicitors/accountants/mortgage advisers] in [your town]?' If your firm does not appear, TendorAI's free AI visibility report shows your score across ChatGPT, Perplexity, and four other AI platforms in 60 seconds."
        }
      },
      {
        "@type": "Question",
        "name": "Can I fix it if my firm is not showing up in AI recommendations?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. The main reasons firms are invisible to AI are missing structured data (schema markup), unverified regulatory information, and thin online presence. TendorAI installs schema on your website, structures your SRA, FCA, or ICAEW data, and tracks your visibility weekly. Most firms see measurable improvement within four to six weeks."
        }
      }
    ]
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main className="max-w-3xl mx-auto px-4 py-16">

        <nav className="text-sm text-gray-500 mb-8">
          <Link href="/">Home</Link> › <span>Are Clients Finding You on ChatGPT?</span>
        </nav>

        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Are Clients Finding You on ChatGPT? What UK Firms Need to Know (2026)
        </h1>

        <p className="text-xl text-gray-700 mb-4">
          A growing number of people in the UK are typing questions into ChatGPT and Perplexity instead of Google. When they ask for a solicitor, accountant, or mortgage adviser, AI names two or three specific firms. If your firm is not one of them, that client goes elsewhere — and you never know the enquiry existed.
        </p>

        <p className="text-lg text-gray-700 mb-10">
          This page explains how AI recommendations work, why most UK professional services firms are currently invisible, and how to check where your firm stands in under 60 seconds.
        </p>

        {/* Definition block — v5 §4.10 */}
        <div className="bg-blue-50 border-l-4 border-blue-600 p-5 mb-10">
          <p className="text-gray-800">
            <strong>An AI recommendation</strong> is when a tool like ChatGPT, Perplexity, or Google Gemini names a specific business in response to a user's question — such as "find me a family law solicitor in Leeds" or "who is the best accountant near me?" Unlike Google, which returns a list of links, AI tools name specific firms and explain why.
          </p>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          How Many People Are Using AI to Find Professional Services?
        </h2>
        <p className="text-gray-700 mb-4">
          ChatGPT reached 400 million weekly active users in February 2025, according to OpenAI. Perplexity reported over 15 million daily active users in the same period. Both platforms are used heavily for local service recommendations — and usage is growing faster in professional services than almost any other category.
        </p>
        <p className="text-gray-700 mb-10">
          When TendorAI analysed AI recommendations across 12,793 UK professional services firms, fewer than 12% appeared in any AI-generated answer. The other 88% are invisible — not because they are bad firms, but because AI cannot find or verify them.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          How Does ChatGPT Decide Which Firm to Recommend?
        </h2>
        <p className="text-gray-700 mb-4">
          ChatGPT does not search the internet the way Google does. It cross-references multiple data sources to identify firms it can confidently name. For UK professional services, those sources are:
        </p>

        <ul className="space-y-3 mb-6">
          {[
            { label: 'Regulatory registers', desc: 'The SRA register for solicitors, the FCA Financial Services Register for mortgage advisers, and ICAEW or ACCA directories for accountants. AI treats these as ground truth.' },
            { label: 'Structured data on your website', desc: 'Schema markup — code that tells AI exactly what your firm does, where it is, and what services it offers. Without this, AI cannot extract reliable information about you.' },
            { label: 'Reviews and third-party mentions', desc: 'Google reviews, ReviewSolicitors, Trustpilot, and mentions in third-party articles. AI uses these as credibility signals.' },
            { label: 'Consistent business information', desc: 'Your firm name, address, and phone number must be identical across your website, Google Business Profile, and directory listings. Inconsistencies reduce AI confidence.' },
          ].map((item, i) => (
            <li key={i} className="flex gap-3 p-4 bg-gray-50 rounded-lg">
              <span className="font-bold text-blue-700 min-w-fit">{item.label}:</span>
              <span className="text-gray-700">{item.desc}</span>
            </li>
          ))}
        </ul>

        <p className="text-gray-700 mb-10">
          Firms that have all four signals in place get recommended. Firms missing any of them are skipped — even if they have a well-designed website and decades of experience.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Why Most UK Firms Are Currently Invisible to AI
        </h2>
        <p className="text-gray-700 mb-4">
          The vast majority of UK professional services websites were built for Google — designed to rank in search results through keywords, backlinks, and page speed. None of that determines AI recommendations.
        </p>
        <p className="text-gray-700 mb-4">
          TendorAI's analysis of SRA-registered solicitor firms found that 91% have no schema markup identifying them as a legal practice. Without it, ChatGPT cannot reliably extract what the firm does or verify its regulatory status — so it recommends a competitor that has the data in place.
        </p>
        <p className="text-gray-700 mb-10">
          This is not a content problem. Firms can have detailed, well-written websites and still be completely invisible to AI. The issue is structural data — and most website builders and SEO agencies do not address it.
        </p>

        {/* How to check — practical, direct */}
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          How to Check If Your Firm Appears in AI Recommendations
        </h2>
        <p className="text-gray-700 mb-4">
          The fastest way is to test it yourself. Open ChatGPT or Perplexity and ask:
        </p>

        <div className="bg-gray-900 text-green-400 rounded-lg p-5 mb-4 font-mono text-sm space-y-2">
          <p>"Who are the best solicitors in [your town]?"</p>
          <p>"Find me a reliable accountant in [your area]"</p>
          <p>"Which mortgage adviser would you recommend in [your city]?"</p>
        </div>

        <p className="text-gray-700 mb-4">
          If your firm does not appear — or if a competitor appears instead — your business is invisible to that channel. For a more detailed picture across six AI platforms including Perplexity, Gemini, Claude, Grok, and Meta AI, TendorAI's free report shows your score in 60 seconds.
        </p>

        {/* FAQ — after most relevant section per v5 §4.6 */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6 mt-12">
          Frequently Asked Questions
        </h2>

        <div className="space-y-5 mb-12">
          {[
            {
              q: 'Do people actually use ChatGPT to find a solicitor or accountant?',
              a: 'Yes. ChatGPT reached 400 million weekly active users by February 2025. A growing proportion ask it for local service recommendations. When they do, ChatGPT names two or three specific firms. Most UK firms do not know whether they appear in those answers.'
            },
            {
              q: 'How does ChatGPT decide which firm to recommend?',
              a: 'ChatGPT cross-references structured data on your website, your regulatory registration (SRA, FCA, ICAEW), review platforms, and third-party mentions. Firms with verified, structured data are recommended. Firms without it are invisible — regardless of how good their website looks.'
            },
            {
              q: 'How do I check if my firm appears in ChatGPT recommendations?',
              a: 'Ask ChatGPT directly: "Who are the best [solicitors/accountants/mortgage advisers] in [your town]?" If your firm does not appear, TendorAI\'s free AI visibility report shows your score across ChatGPT, Perplexity, and four other AI platforms in 60 seconds.'
            },
            {
              q: 'Can I fix it if my firm is not showing up in AI recommendations?',
              a: 'Yes. The main reasons firms are invisible are missing schema markup, unverified regulatory information, and inconsistent business data. TendorAI installs schema on your website, structures your SRA, FCA, or ICAEW data, and tracks your visibility weekly. Most firms see measurable improvement within four to six weeks.'
            },
          ].map((item, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-5">
              <h3 className="font-bold text-gray-900 mb-2">{item.q}</h3>
              <p className="text-gray-700">{item.a}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-gray-900 text-white rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">
            Find Out If Clients Can Find Your Firm on ChatGPT
          </h2>
          <p className="text-gray-300 mb-2">
            Free AI visibility report. No signup. 60 seconds.
          </p>
          <p className="text-gray-400 text-sm mb-6">
            See your score across ChatGPT, Perplexity, Claude, Gemini, Grok, and Meta AI.
          </p>
          <Link
            href="/aeo-report"
            className="inline-block bg-white text-gray-900 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Check Your Firm's AI Visibility — Free
          </Link>
        </div>

        {/* Internal links */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">Related</h3>
          <ul className="space-y-2 text-blue-700">
            <li><Link href="/ai-visibility-for-solicitors">AI Visibility for Solicitors — Full Guide</Link></li>
            <li><Link href="/ai-visibility-for-accountants">AI Visibility for Accountants — Full Guide</Link></li>
            <li><Link href="/ai-visibility-for-mortgage-advisors">AI Visibility for Mortgage Advisers — Full Guide</Link></li>
            <li><Link href="/ai-visibility-platform">How TendorAI Works</Link></li>
            <li><Link href="/best-ai-visibility-tool-uk">Best AI Visibility Tools for UK Businesses (2026)</Link></li>
          </ul>
        </div>

      </main>
    </>
  )
}
