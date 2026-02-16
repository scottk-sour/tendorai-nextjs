import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { articles, getArticleBySlug, type Article } from '@/lib/content/articles';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return { title: 'Article Not Found' };
  }

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.publishedDate,
      authors: ['TendorAI'],
      url: `https://www.tendorai.com/resources/${slug}`,
    },
    alternates: {
      canonical: `https://www.tendorai.com/resources/${slug}`,
    },
  };
}

const categoryColors: Record<string, string> = {
  Photocopiers: 'bg-blue-100 text-blue-700',
  Telecoms: 'bg-green-100 text-green-700',
  CCTV: 'bg-orange-100 text-orange-700',
  IT: 'bg-purple-100 text-purple-700',
  'Business Tips': 'bg-gray-100 text-gray-700',
  'AI & Visibility': 'bg-indigo-100 text-indigo-700',
};

function parseMarkdown(content: string): string {
  // Simple markdown to HTML conversion
  let html = content
    // Headers
    .replace(/^### (.*$)/gm, '<h3 class="text-xl font-semibold text-gray-900 mt-8 mb-4">$1</h3>')
    .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">$1</h2>')
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Links
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-purple-600 hover:text-purple-700 underline">$1</a>')
    // Tables
    .replace(/\|(.+)\|/g, (match) => {
      const cells = match.split('|').filter(c => c.trim());
      if (cells.every(c => c.trim().match(/^-+$/))) {
        return ''; // Skip separator rows
      }
      const isHeader = match.includes('---');
      const cellTag = 'td';
      const cellHtml = cells.map(c => `<${cellTag} class="px-4 py-2 border border-gray-200">${c.trim()}</${cellTag}>`).join('');
      return `<tr>${cellHtml}</tr>`;
    })
    // Wrap tables
    .replace(/(<tr>.*?<\/tr>\n?)+/g, '<table class="w-full border-collapse my-6 text-sm">$&</table>')
    // Lists
    .replace(/^- (.*$)/gm, '<li class="ml-4 text-gray-600">$1</li>')
    .replace(/(<li.*<\/li>\n?)+/g, '<ul class="list-disc pl-4 my-4 space-y-2">$&</ul>')
    // Numbered lists
    .replace(/^\d+\. (.*$)/gm, '<li class="ml-4 text-gray-600">$1</li>')
    // Code blocks
    .replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-100 p-4 rounded-lg overflow-x-auto my-4 text-sm"><code>$1</code></pre>')
    // Inline code
    .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1.5 py-0.5 rounded text-sm">$1</code>')
    // Paragraphs
    .replace(/^(?!<[a-z])(.*$)/gm, (match) => {
      if (match.trim() === '') return '';
      if (match.startsWith('<')) return match;
      return `<p class="text-gray-600 leading-relaxed mb-4">${match}</p>`;
    });

  return html;
}

function RelatedArticles({ currentSlug, category }: { currentSlug: string; category: string }) {
  const related = articles
    .filter(a => a.slug !== currentSlug)
    .filter(a => a.category === category)
    .slice(0, 2);

  if (related.length === 0) {
    // If no same-category articles, show any other articles
    const others = articles.filter(a => a.slug !== currentSlug).slice(0, 2);
    if (others.length === 0) return null;
    return <RelatedList articles={others} />;
  }

  return <RelatedList articles={related} />;
}

function RelatedList({ articles }: { articles: Article[] }) {
  return (
    <div className="border-t border-gray-200 pt-8 mt-12">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Related Articles</h3>
      <div className="grid md:grid-cols-2 gap-6">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/resources/${article.slug}`}
            className="group p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full mb-2 ${categoryColors[article.category]}`}>
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

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const contentHtml = parseMarkdown(article.content);

  // Schema.org Article markup
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
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
    datePublished: article.publishedDate,
    dateModified: article.publishedDate,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.tendorai.com/resources/${slug}`,
    },
    articleSection: article.category,
    wordCount: article.content.split(/\s+/).length,
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.tendorai.com' },
      { '@type': 'ListItem', position: 2, name: 'Resources', item: 'https://www.tendorai.com/resources' },
      { '@type': 'ListItem', position: 3, name: article.title },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <main className="min-h-screen bg-white">
        {/* Header */}
        <section className="bg-brand-gradient text-white py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            {/* Breadcrumb */}
            <nav className="text-sm mb-6 text-purple-200">
              <Link href="/" className="hover:text-white">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/resources" className="hover:text-white">Resources</Link>
              <span className="mx-2">/</span>
              <span className="text-white">{article.category}</span>
            </nav>

            <div className="flex items-center gap-3 mb-4">
              <span className={`px-3 py-1 text-sm font-medium rounded-full ${categoryColors[article.category]}`}>
                {article.category}
              </span>
              <span className="text-purple-200">{article.readTime} min read</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {article.title}
            </h1>

            <p className="text-lg text-purple-100">
              {article.excerpt}
            </p>

            <div className="mt-6 text-sm text-purple-200">
              Published {new Date(article.publishedDate).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </div>
          </div>
        </section>

        {/* Article Content */}
        <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />

          {/* CTA */}
          <div className="mt-12 p-6 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Need help choosing the right solution?
            </h3>
            <p className="text-gray-600 mb-4">
              Compare quotes from verified local suppliers. Free, no-obligation, and takes just 2 minutes.
            </p>
            <Link
              href={`/get-quotes?category=${encodeURIComponent(article.category === 'Business Tips' ? 'Photocopiers' : article.category)}`}
              className="inline-flex items-center px-5 py-2.5 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
            >
              Get Quotes Now
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Related Articles */}
          <RelatedArticles currentSlug={slug} category={article.category} />
        </article>
      </main>
    </>
  );
}
