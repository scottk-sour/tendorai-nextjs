import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { articles, getArticleBySlug, type Article } from '@/lib/content/articles';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Only generate pages for articles with href pointing to /blog/
// that don't already have a static directory
const STATIC_BLOG_DIRS = new Set([
  'how-to-enhance-ai-visibility-professional-services-firm',
  'why-isnt-my-business-appearing-in-chatgpt-recommendations',
  'ai-visibility-tools-professional-services-firms-uk',
  'how-to-get-your-solicitor-firm-recommended-by-chatgpt',
  'how-to-get-your-accountancy-practice-into-ai-search-results',
  'does-structured-data-help-ai-visibility',
  'tendorai-review-what-uk-professional-services-firms-get',
  'how-to-get-estate-agency-recommended-by-chatgpt',
  'ai-visibility-mortgage-advisors-uk',
  'how-much-conveyancing-cost-cardiff-2026',
  'will-ai-make-seo-obsolete-what-uk-professional-services-firms-need-to-know',
  'ai-visibility-report-uk-solicitors-2025',
  'best-ai-visibility-tools-uk-professional-services',
  'how-to-check-if-business-appears-in-ai-recommendations',
  'how-to-get-found-on-chatgpt-as-a-solicitor',
  'how-to-get-recommended-by-ai',
  'how-to-get-solicitor-profile-into-ai-search-results',
  'how-to-get-your-accountancy-firm-found-on-chatgpt',
  'how-to-get-your-law-firm-visible-to-ai-assistants',
  'schema-markup-why-ai-recommends-your-competitor',
  'tendorai-vs-otterly-vs-profound-uk-professional-services',
  'why-business-not-showing-up-chatgpt-recommendations',
  'why-wont-chatgpt-recommend-my-law-firm',
]);

export async function generateStaticParams() {
  return articles
    .filter((a) => !STATIC_BLOG_DIRS.has(a.slug))
    .filter((a) => !a.href || a.href.startsWith('/blog/'))
    .map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) return { title: 'Article Not Found' };

  const canonical = `https://www.tendorai.com/blog/${slug}`;
  return {
    title: `${article.title} | TendorAI`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.publishedDate,
      authors: [article.author || 'TendorAI'],
      url: canonical,
      siteName: 'TendorAI',
      images: [{ url: '/logo.png', width: 873, height: 873 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
    },
    alternates: { canonical },
  };
}

const categoryColors: Record<string, string> = {
  Photocopiers: 'bg-blue-100 text-blue-700',
  Telecoms: 'bg-green-100 text-green-700',
  CCTV: 'bg-orange-100 text-orange-700',
  IT: 'bg-purple-100 text-purple-700',
  'Business Tips': 'bg-gray-100 text-gray-700',
  'AI & Visibility': 'bg-indigo-100 text-indigo-700',
  'AI Visibility': 'bg-teal-100 text-teal-700',
  Research: 'bg-rose-100 text-rose-700',
  Legal: 'bg-amber-100 text-amber-700',
  Tools: 'bg-cyan-100 text-cyan-700',
  'How-To': 'bg-emerald-100 text-emerald-700',
  Financial: 'bg-violet-100 text-violet-700',
  'AEO Strategy': 'bg-purple-100 text-purple-700',
};

function parseMarkdown(content: string): string {
  return content
    .replace(/^---$/gm, '<hr class="my-8 border-gray-200" />')
    .replace(/^### (.*$)/gm, '<h3 class="text-xl font-semibold text-gray-900 mt-8 mb-4">$1</h3>')
    .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">$1</h2>')
    // Bold runs before italic so `**x**` is consumed as <strong>, not as
    // `*<em>x</em>*`.
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Italic — inner pattern forbids `*` and newline so one italic span
    // can't swallow across a second `*` pair on the same line.
    .replace(/\*([^*\n]+?)\*/g, '<em>$1</em>')
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-purple-600 hover:text-purple-700 underline">$1</a>')
    .replace(/^- (.*$)/gm, '<li class="ml-4 text-gray-600">$1</li>')
    .replace(/(<li.*<\/li>\n?)+/g, '<ul class="list-disc pl-4 my-4 space-y-2">$&</ul>')
    .replace(/^\d+\. (.*$)/gm, '<li class="ml-4 text-gray-600">$1</li>')
    .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1.5 py-0.5 rounded text-sm">$1</code>')
    .replace(/^(?!<[a-z])(.*$)/gm, (match) => {
      if (match.trim() === '' || match.startsWith('<')) return match;
      return `<p class="text-gray-600 leading-relaxed mb-4">${match}</p>`;
    });
}

function RelatedArticles({ currentSlug, category }: { currentSlug: string; category: string }) {
  const related = articles
    .filter(a => a.slug !== currentSlug && a.category === category)
    .slice(0, 2);
  const list = related.length > 0 ? related : articles.filter(a => a.slug !== currentSlug).slice(0, 2);
  if (list.length === 0) return null;

  return (
    <div className="border-t border-gray-200 pt-8 mt-12">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Related Articles</h3>
      <div className="grid md:grid-cols-2 gap-6">
        {list.map((article) => (
          <Link
            key={article.slug}
            href={article.href || `/blog/${article.slug}`}
            className="group p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full mb-2 ${categoryColors[article.category] || 'bg-gray-100 text-gray-700'}`}>
              {article.category}
            </span>
            <h4 className="font-medium text-gray-900 group-hover:text-purple-600 transition-colors line-clamp-2">
              {article.title}
            </h4>
            <p className="text-sm text-gray-500 mt-1">{article.readTime} min read</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) notFound();

  const hasContent = article.content && article.content.trim().length > 0;
  const contentHtml = hasContent ? parseMarkdown(article.content) : '';

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.excerpt,
    author: article.author
      ? { '@type': 'Person', name: article.author }
      : { '@type': 'Organization', name: 'TendorAI', url: 'https://www.tendorai.com' },
    publisher: {
      '@type': 'Organization',
      name: 'TendorAI',
      url: 'https://www.tendorai.com',
      logo: { '@type': 'ImageObject', url: 'https://www.tendorai.com/logo.png', width: 873, height: 873 },
    },
    datePublished: article.publishedDate,
    dateModified: article.publishedDate,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://www.tendorai.com/blog/${slug}` },
    articleSection: article.category,
  };

  const publishedDate = new Date(article.publishedDate).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-gradient-to-br from-[#1B4F72] via-[#1a3d5c] to-[#2d1b4e] text-white py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <nav className="text-sm mb-6 text-blue-200">
              <Link href="/" className="hover:text-white">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/blog" className="hover:text-white">Blog</Link>
              <span className="mx-2">/</span>
              <span className="text-white">{article.category}</span>
            </nav>

            <div className="flex items-center gap-3 mb-4">
              <span className={`px-3 py-1 text-sm font-medium rounded-full bg-white/20 text-white`}>
                {article.category}
              </span>
              <span className="text-blue-200">{article.readTime} min read</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              {article.title}
            </h1>

            <p className="text-lg text-blue-100 leading-relaxed max-w-3xl">
              {article.excerpt}
            </p>

            <div className="mt-6 flex items-center gap-4 text-sm text-blue-200">
              <span>By {article.author || 'TendorAI'}</span>
              <span>&middot;</span>
              <span>Published {publishedDate}</span>
            </div>
          </div>
        </section>

        {/* Article content */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16">
          {hasContent ? (
            <div
              className="prose prose-gray max-w-none"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600 mb-4">{article.excerpt}</p>
              <p className="text-gray-500">Full article coming soon.</p>
            </div>
          )}

          {/* CTA */}
          <div className="bg-gradient-to-br from-[#1B4F72] to-[#2d1b4e] text-white rounded-2xl p-8 md:p-12 text-center mt-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Check your AI visibility</h2>
            <p className="text-blue-100 mb-8 max-w-xl mx-auto">
              Run a free AI visibility report and see what ChatGPT, Perplexity and Claude say about your business.
            </p>
            <Link
              href="/aeo-report"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#1B4F72] font-bold rounded-lg hover:bg-blue-50 transition-colors text-lg"
            >
              Run Your Free Report
            </Link>
          </div>

          {/* Related */}
          <RelatedArticles currentSlug={slug} category={article.category} />

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-gray-200 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Published {publishedDate} by {article.author || 'TendorAI'}
            </p>
            <Link href="/blog" className="text-sm text-purple-600 hover:text-purple-700 font-medium">
              &larr; Back to Blog
            </Link>
          </div>
        </article>
      </main>
    </>
  );
}
