import type { Metadata } from 'next';
import Link from 'next/link';
import { getArticleBySlug } from '@/lib/content/articles';

const CANONICAL = 'https://www.tendorai.com/research';
const DESCRIPTION =
  'TendorAI research: measurement studies of whether AI assistants name UK regulated professional services firms, with published deviation logs and datasets.';

export const metadata: Metadata = {
  title: 'Research',
  description: DESCRIPTION,
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: 'website',
    url: CANONICAL,
    title: 'Research | TendorAI',
    description: DESCRIPTION,
  },
};

// Every entry is resolved from lib/content/articles.ts at build time, so the
// hub cannot state a title, date or URL the published article does not.
const REPORT_SLUGS = [
  'ai-visibility-report-solicitors-july-2026',
  'ai-visibility-report-solicitors-august-2026',
] as const;

const STUDY_SLUGS = [
  'ai-recommends-uk-solicitors-study',
  'ai-recommends-accountants-uk-cities',
  'ai-recommends-mortgage-advisors-uk-cities',
  'ai-recommends-estate-agents-uk-cities',
  'cardiff-solicitors-ai-visibility-may-2026',
] as const;

const DEVIATION_LOGS = [
  {
    title:
      'Deviations log — UK AI Visibility Report for Solicitors, July 2026',
    href: '/research/solicitors-july-2026/deviations',
  },
  {
    title:
      'Deviations log — Most UK Solicitors Are Never Recommended by AI, August 2026',
    href: '/research/solicitors-august-2026/deviations',
  },
];

const DATASETS = [
  { title: 'The full 68-prompt panel', href: '/research/solicitors-july-2026/prompts.csv' },
  { title: 'The city and firm-count panel', href: '/research/solicitors-july-2026/panel.csv' },
  { title: 'The domain classification list', href: '/research/solicitors-july-2026/domain-classification.csv' },
];

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function ArticleEntry({ slug }: { slug: string }) {
  const article = getArticleBySlug(slug);
  if (!article) return null;

  return (
    <li>
      <Link
        href={`/resources/${article.slug}`}
        className="group block bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md hover:border-purple-200 transition-all"
      >
        {article.reportId && (
          <span className="inline-block mb-3 px-2.5 py-1 text-xs font-medium rounded-full bg-rose-100 text-rose-700">
            {article.reportId}
          </span>
        )}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
          {article.title}
        </h3>
        <p className="text-gray-600 text-sm mb-3">{article.excerpt}</p>
        <span className="text-xs text-gray-400">
          Published {formatDate(article.publishedDate)}
        </span>
      </Link>
    </li>
  );
}

function Section({
  id,
  heading,
  intro,
  children,
}: {
  id: string;
  heading: string;
  intro: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="mt-14">
      <h2
        id={`${id}-heading`}
        className="font-serif text-2xl font-bold text-[var(--text)] mb-2"
      >
        {heading}
      </h2>
      <p className="text-[var(--text2)] mb-6 max-w-3xl">{intro}</p>
      {children}
    </section>
  );
}

export default function ResearchPage() {
  return (
    <div className="min-h-screen bg-[var(--surface)] pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <header>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[var(--text)] mb-3">
            Research
          </h1>
          <p className="text-[var(--text2)] max-w-3xl">
            TendorAI measures whether AI assistants name UK regulated
            professional services firms. Everything below is published in full,
            ungated, with the prompt panel and datasets available for audit.
          </p>
        </header>

        <Section
          id="reports"
          heading="Research reports"
          intro="Numbered studies with a pre-registered panel, a published deviations log and downloadable data."
        >
          <ul className="grid gap-6 md:grid-cols-2">
            {REPORT_SLUGS.map((slug) => (
              <ArticleEntry key={slug} slug={slug} />
            ))}
          </ul>
        </Section>

        <Section
          id="studies"
          heading="Tested-firm studies"
          intro="Smaller studies testing named firms in specific cities and professions."
        >
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {STUDY_SLUGS.map((slug) => (
              <ArticleEntry key={slug} slug={slug} />
            ))}
          </ul>
        </Section>

        <Section
          id="methodology"
          heading="Deviation and methodology records"
          intro="Every departure from a pre-registered plan is logged and published. Each research report also carries its own Method section, describing the panel, the engines, the repeat count and the collection window for that study."
        >
          <ul className="grid gap-6 md:grid-cols-2">
            {DEVIATION_LOGS.map((log) => (
              <li key={log.href}>
                <Link
                  href={log.href}
                  className="group block h-full bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md hover:border-purple-200 transition-all"
                >
                  <h3 className="text-base font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                    {log.title}
                  </h3>
                </Link>
              </li>
            ))}
          </ul>
        </Section>

        <Section
          id="datasets"
          heading="Published datasets"
          intro="The panel is unchanged between waves, so these files serve both published reports."
        >
          <ul className="grid gap-4 sm:grid-cols-3">
            {DATASETS.map((file) => (
              <li key={file.href}>
                <a
                  href={file.href}
                  className="group block h-full bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md hover:border-purple-200 transition-all"
                >
                  <span className="block text-sm font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                    {file.title}
                  </span>
                  <span className="block mt-1 text-xs text-gray-400">CSV</span>
                </a>
              </li>
            ))}
          </ul>
        </Section>
      </div>
    </div>
  );
}
