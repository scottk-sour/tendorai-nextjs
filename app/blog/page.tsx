import type { Metadata } from 'next';
import Link from 'next/link';
import { articles } from '@/lib/content/articles';

const CANONICAL = 'https://www.tendorai.com/blog';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Articles on AI visibility for UK regulated professional services firms — solicitors, accountants, mortgage advisers and estate agents.',
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: 'website',
    url: CANONICAL,
    title: 'Blog | TendorAI',
    description:
      'Articles on AI visibility for UK regulated professional services firms — solicitors, accountants, mortgage advisers and estate agents.',
  },
};

// Only articles genuinely homed at /blog/<slug>. Articles with no `href`
// render at /resources/<slug>; listing them here would present a URL that
// now 301s, and would re-create the duplicate-surface problem this index
// was built alongside fixing.
const blogArticles = articles
  .filter((a) => a.href?.startsWith('/blog/'))
  .sort(
    (a, b) =>
      new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime(),
  );

export default function BlogIndexPage() {
  return (
    <div className="min-h-screen bg-[var(--surface)] pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="section-header">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[var(--text)] mb-3">
            Blog
          </h1>
          <p className="text-[var(--text2)] max-w-2xl">
            Articles on AI visibility for UK regulated professional services
            firms. Our measurement studies and methodology records live in{' '}
            <Link href="/research" className="text-purple-600 hover:underline">
              Research
            </Link>
            .
          </p>
        </div>

        <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogArticles.map((article) => (
            <li key={article.slug}>
              <Link
                href={article.href as string}
                className="group block h-full bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md hover:border-purple-200 transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
                    {article.category}
                  </span>
                  <span className="text-sm text-gray-500">
                    {article.readTime} min read
                  </span>
                </div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                  {article.title}
                </h2>
                <p className="text-gray-600 text-sm mb-4">{article.excerpt}</p>
                <span className="text-xs text-gray-400">
                  {new Date(article.publishedDate).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
