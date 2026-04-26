import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Press & Media | TendorAI',
  description: 'TendorAI press kit, key stats, story angles, and brand assets. The UK\u2019s AI Visibility Platform \u2014 structured data for 12,793 professional services firms.',
  openGraph: {
    title: 'Press & Media | TendorAI',
    description: 'TendorAI press kit, key stats, story angles, and brand assets.',
    url: 'https://www.tendorai.com/press',
    siteName: 'TendorAI',
  },
  alternates: { canonical: '/press' },
};

const stats = [
  { value: '12,793', label: 'UK firms profiled' },
  { value: '8,625', label: 'SRA-registered solicitors' },
  { value: '1,380', label: 'ICAEW/ACCA accountants' },
  { value: '1,100', label: 'FCA mortgage advisers' },
  { value: '28/100', label: 'Average AI Visibility Score' },
  { value: '91%', label: 'Missing structured data' },
  { value: '6', label: 'AI platforms tracked' },
  { value: '3.2x', label: 'More mentions with schema' },
];

const differentiators = [
  {
    title: 'Built from UK regulatory register data',
    description: 'TendorAI profiles are pre-built from SRA, ICAEW, and FCA register data before firms even sign up. Every profile starts with verified regulatory credentials \u2014 not self-reported information.',
  },
  {
    title: 'Done-for-you implementation',
    description: 'Every other AI visibility tool monitors. TendorAI installs the fix \u2014 Schema.org markup on the vendor\u2019s website within 48 hours, auto-syncing when they update their dashboard. No developer required.',
  },
  {
    title: 'Bidirectional AI citation network',
    description: 'When a firm installs the TendorAI schema script, AI sees verified data on both their website and their TendorAI profile \u2014 creating a bidirectional citation loop that increases recommendation confidence.',
  },
  {
    title: 'All six major AI platforms',
    description: 'Weekly visibility scans across ChatGPT, Perplexity, Gemini, Claude, Grok, and Meta AI. Not just Google \u2014 every platform that gives business recommendations.',
  },
  {
    title: 'AI blog writer in TendorAI AEO Format',
    description: 'Built-in content generation using a structured format specifically designed to perform well in AI search results \u2014 with LinkedIn and Facebook versions generated alongside each post.',
  },
];

const storyAngles = [
  {
    title: '91% of UK professional services firms are invisible to AI',
    description: 'TendorAI\u2019s analysis of 12,793 firms shows the vast majority lack the structured data AI needs to recommend them. The average AI Visibility Score is 28 out of 100.',
  },
  {
    title: 'AI is replacing the Google search for finding solicitors and accountants',
    description: 'When consumers ask ChatGPT for a solicitor in Manchester, AI picks 2\u20133 names. Everyone else gets nothing. This is a fundamentally different dynamic to Google\u2019s list of 10.',
  },
  {
    title: 'Small firms are beating large firms in AI recommendations',
    description: 'TendorAI\u2019s data shows firm size is irrelevant to AI recommendation. Practices with fewer than 5 staff are appearing ahead of established firms with decades of history \u2014 because they have better-structured data.',
  },
  {
    title: 'The structured data gap is the new digital divide',
    description: 'UK businesses that don\u2019t adapt to AI search will lose a growing share of new client enquiries to competitors who do. The window to act is now \u2014 before the market catches up.',
  },
  {
    title: 'Why Google rankings don\u2019t transfer to AI',
    description: 'A firm ranked page one on Google for \u201caccountant Manchester\u201d can be completely absent from ChatGPT\u2019s answer to the same question. Google ranks pages. AI recommends entities. Different mechanisms entirely.',
  },
];

export default function PressPage() {
  return (
    <main className="min-h-screen bg-gray-50 pt-16">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Press &amp; Media</h1>
          <p className="text-xl text-purple-200 max-w-2xl mx-auto">
            TendorAI is the UK&rsquo;s AI Visibility Platform &mdash; the structured data layer between UK businesses and AI recommendation engines.
          </p>
        </div>
      </section>

      {/* About */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">About TendorAI</h2>
          <div className="text-gray-600 leading-relaxed space-y-4">
            <p>
              TendorAI is the UK&rsquo;s first AI Visibility Platform &mdash; built to ensure UK professional services firms appear when clients ask AI assistants like ChatGPT, Perplexity, and Gemini for recommendations.
            </p>
            <p>
              The platform holds verified profiles for 12,793 SRA, ICAEW, and FCA-registered firms, pre-built from UK regulatory register data. When a firm claims their profile and completes it, TendorAI installs AI-optimised Schema.org markup on their website within 48 hours &mdash; the structured data AI needs to recommend them with confidence.
            </p>
            <p>
              Unlike monitoring tools that track AI mentions, TendorAI fixes the underlying problem: the missing structured data that causes 91% of UK firms to be invisible to AI in the first place.
            </p>
          </div>
        </div>
      </section>

      {/* Key Stats */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Stats</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm text-center">
              <div className="text-2xl md:text-3xl font-bold text-purple-600 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-400 mt-4 italic">
          Source: TendorAI analysis of SRA, ICAEW, and FCA register data, March 2026.
        </p>
      </section>

      {/* What Makes It Different */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">What Makes TendorAI Different</h2>
        <div className="space-y-4">
          {differentiators.map((d) => (
            <div key={d.title} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">{d.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{d.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Story Angles */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Story Angles</h2>
          <p className="text-gray-500 mb-8">Ready-to-use angles for journalists covering AI, legal tech, fintech, or UK professional services.</p>
          <div className="space-y-6">
            {storyAngles.map((angle, i) => (
              <div key={i} className="border-l-4 border-purple-500 pl-6 py-2">
                <h3 className="font-semibold text-gray-900 mb-1">{angle.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{angle.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Assets */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Brand Assets</h2>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Brand Colours</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-600"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">TendorAI Purple</p>
                    <p className="text-xs text-gray-500">#7c3aed</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-indigo-600"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">TendorAI Indigo</p>
                    <p className="text-xs text-gray-500">#4f46e5</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-900"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">TendorAI Dark</p>
                    <p className="text-xs text-gray-500">#0f172a</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Usage Guidelines</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>&bull; Always write &ldquo;TendorAI&rdquo; as one word with a capital T and capital AI</li>
                <li>&bull; Do not abbreviate to &ldquo;Tendor&rdquo; or &ldquo;TAI&rdquo;</li>
                <li>&bull; The platform is &ldquo;the UK&rsquo;s AI Visibility Platform&rdquo; &mdash; not a directory, marketplace, or SEO tool</li>
                <li>&bull; AI Visibility is the category. AEO (AI Engine Optimisation) is the practice.</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-3">Company Details</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <p><strong>Founded:</strong> 2025</p>
                <p><strong>Headquarters:</strong> Cardiff, Wales</p>
                <p><strong>Sector:</strong> AI / Professional Services / RegTech</p>
              </div>
              <div>
                <p><strong>Founder:</strong> Scott Davies</p>
                <p><strong>Website:</strong> <Link href="/" className="text-purple-600 hover:underline">tendorai.com</Link></p>
                <p><strong>Data Coverage:</strong> England &amp; Wales</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Press Contact */}
      <section className="bg-purple-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Press Contact</h2>
          <p className="text-gray-600 mb-6">
            For press enquiries, interviews, data requests, or commentary on AI visibility, AI search, or UK professional services technology:
          </p>
          <div className="inline-flex flex-col items-center gap-2">
            <a
              href="mailto:scott.davies@tendorai.com"
              className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
            >
              scott.davies@tendorai.com
            </a>
            <p className="text-sm text-gray-500">We typically respond within 24 hours</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-4">See the data yourself</h2>
        <p className="text-gray-600 mb-6">
          Run a free AI Visibility report on any UK business &mdash; 30 seconds, no login required.
        </p>
        <Link
          href="/aeo-report"
          className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
        >
          Get a Free AI Visibility Report
          <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </section>
    </main>
  );
}
