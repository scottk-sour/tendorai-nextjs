import { notFound } from 'next/navigation'
import Link from 'next/link'
import { AEO_GUIDES } from '@/lib/content/aeoGuides'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  return AEO_GUIDES.map((guide) => ({ slug: guide.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const guide = AEO_GUIDES.find((g) => g.slug === slug)
  if (!guide) return {}
  return {
    title: guide.metaTitle,
    description: guide.metaDescription,
  }
}

function DifficultyBadge({ difficulty }: { difficulty: string }) {
  const colours: Record<string, string> = {
    Easy: 'bg-green-100 text-green-800',
    Medium: 'bg-amber-100 text-amber-800',
    'Needs developer': 'bg-red-100 text-red-800',
    'TendorAI fixes this': 'bg-blue-100 text-blue-800',
  }
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
        colours[difficulty] || 'bg-gray-100 text-gray-800'
      }`}
    >
      {difficulty}
    </span>
  )
}

function Accordion({
  platform,
  steps,
}: {
  platform: string
  steps: string[]
}) {
  return (
    <details className="group border border-gray-200 rounded-lg overflow-hidden">
      <summary className="flex items-center justify-between cursor-pointer px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors font-medium text-sm text-gray-900">
        {platform}
        <svg
          className="w-4 h-4 text-gray-400 transition-transform group-open:rotate-180"
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
      <div className="px-4 py-3 border-t border-gray-100">
        <ul className="space-y-2">
          {steps.map((step, i) => (
            <li key={i} className="flex gap-3 text-sm text-gray-700">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-xs font-bold">
                {i + 1}
              </span>
              <span className="pt-0.5">{step}</span>
            </li>
          ))}
        </ul>
      </div>
    </details>
  )
}

export default async function AeoGuidePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const guide = AEO_GUIDES.find((g) => g.slug === slug)
  if (!guide) notFound()

  const showDoneForYouCta =
    !guide.tendoraiFixesThis

  return (
    <main className="min-h-screen bg-gray-50 pt-16 pb-20">
      {/* Header */}
      <section className="bg-white border-b">
        <div className="max-w-3xl mx-auto px-4 py-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-gray-900 transition-colors">
              Home
            </Link>
            <span>&rsaquo;</span>
            <span>AEO Guides</span>
            <span>&rsaquo;</span>
            <span className="text-gray-900">{guide.title}</span>
          </nav>

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            {guide.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3">
            <DifficultyBadge difficulty={guide.difficulty} />
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-medium">
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {guide.timeToFix}
            </span>
          </div>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4">
        {/* What it is */}
        <section className="mt-10 bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3">
            What is {guide.title}?
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            {guide.whatItIs}
          </p>
        </section>

        {/* Why it matters */}
        <section className="mt-6 bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3">
            Why does this affect AI recommendations?
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            {guide.whyItMatters}
          </p>
        </section>

        {/* How to fix */}
        <section className="mt-6 bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            How to fix it
          </h2>

          {guide.difficulty === 'TendorAI fixes this' && (
            <div className="mb-6 p-5 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm font-semibold text-blue-900 mb-2">
                TendorAI Pro fixes this automatically — no technical knowledge
                needed.
              </p>
              <a
                href="/for-vendors#pricing"
                className="inline-flex items-center px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Upgrade to Pro — £299/month
              </a>
            </div>
          )}

          <div className="space-y-3">
            {guide.howToFix.map((fix) => (
              <Accordion
                key={fix.platform}
                platform={fix.platform}
                steps={fix.steps}
              />
            ))}
          </div>
        </section>

        {/* TendorAI section */}
        <section className="mt-6 bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3">
            How TendorAI helps
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed mb-4">
            {guide.tendoraiHowItHelps}
          </p>

          {guide.tendoraiFixesThis && (
            <div className="p-5 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm font-semibold text-blue-900 mb-2">
                This is fixed automatically on Pro.
              </p>
              <a
                href="/for-vendors#pricing"
                className="inline-flex items-center px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Upgrade to Pro — £299/month
              </a>
            </div>
          )}

          {showDoneForYouCta && (
            <div className="p-5 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm font-semibold text-green-900 mb-2">
                Not confident fixing this yourself? Our done-for-you Website AI
                Optimisation service fixes this and everything else on your audit
                for a one-off &pound;395. We handle it all &mdash; you just send us your
                website login.
              </p>
              <p className="text-xs text-gray-500 mb-3">
                Includes meta titles, H1 headings, FAQ section, contact
                information, social links, image compression, and content
                expansion across your key service pages.
              </p>
              <Link
                href="/for-vendors"
                className="inline-flex items-center px-5 py-2.5 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 transition-colors"
              >
                Book Website Optimisation &mdash; &pound;395
              </Link>
            </div>
          )}
        </section>

        {/* Bottom CTA */}
        <section className="mt-10 bg-[#1B4F72] rounded-xl shadow-sm p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-3">
            Ready to improve your AI visibility score?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-6">
            <Link
              href="/aeo-report"
              className="inline-flex items-center px-6 py-3 bg-white text-[#1B4F72] font-bold rounded-lg hover:bg-blue-50 transition-colors"
            >
              Run Free AEO Report
            </Link>
            <a
              href="/for-vendors#pricing"
              className="inline-flex items-center px-6 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors"
            >
              Upgrade to Pro — £299/month
            </a>
          </div>
        </section>
      </div>
    </main>
  )
}
