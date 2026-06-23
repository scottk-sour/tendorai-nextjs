import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { articles, getArticleBySlug, type Article } from '@/lib/content/articles';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return articles
    .filter((article) => !article.href)
    .map((article) => ({
      slug: article.slug,
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return { title: 'Article Not Found' };
  }

  const description = article.metaDescription || article.excerpt;
  const url = `https://www.tendorai.com/resources/${slug}`;
  // Site default OG image. Per-page openGraph replaces (not merges with)
  // the root metadata's images, so the asset is referenced here too.
  const ogImage = {
    url: 'https://www.tendorai.com/og-image.png',
    width: 1200,
    height: 630,
    alt: article.title,
  };

  return {
    title: article.title,
    description,
    openGraph: {
      title: article.title,
      description,
      type: 'article',
      publishedTime: article.publishedDate,
      modifiedTime: article.updatedDate || article.publishedDate,
      authors: [article.author || 'TendorAI'],
      url,
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description,
      images: [ogImage.url],
    },
    alternates: {
      canonical: url,
    },
    // Parked articles emit noindex,follow. follow stays on so any
    // outbound links keep their authority for the rest of the site.
    ...(article.noindex && {
      robots: { index: false, follow: true },
    }),
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
};

function parseMarkdown(content: string): string {
  // Simple markdown to HTML conversion
  let html = content
    // Horizontal rules
    .replace(/^---$/gm, '<hr class="my-8 border-gray-200" />')
    // Headers
    .replace(/^### (.*$)/gm, '<h3 class="text-xl font-semibold text-gray-900 mt-8 mb-4">$1</h3>')
    .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">$1</h2>')
    // Bold — must run before italic so the double asterisks are consumed
    // first; otherwise `**x**` would be misread as `*<em>x</em>*`.
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Italic — single-asterisk pairs. Inner pattern forbids `*` and newline
    // so one italic span can't swallow across a second `*` pair on the same
    // line, and stray unmatched asterisks don't false-match.
    .replace(/\*([^*\n]+?)\*/g, '<em>$1</em>')
    // Images — must run before links so ![alt](src) isn't caught by the
    // links regex (which would emit `!<a>alt</a>`).
    .replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" loading="lazy" style="width:100%;height:auto;display:block;margin:2rem auto;border:1px solid #eee;border-radius:8px;" />')
    // Links
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-purple-600 hover:text-purple-700 underline">$1</a>')
    // Tables
    .replace(/\|(.+)\|/g, (match) => {
      const cells = match.split('|').slice(1, -1);
      if (cells.every(c => c.trim().match(/^-+$/) || c.trim() === '')) {
        return ''; // Skip separator rows
      }
      const isHeader = match.includes('---');
      const cellTag = 'td';
      const cellHtml = cells.map(c => `<${cellTag} class="px-4 py-2 border border-gray-200">${c.trim()}</${cellTag}>`).join('');
      return `<tr>${cellHtml}</tr>`;
    })
    // Wrap tables — `\s*` (not `\n?`) lets us span the blank line left
    // behind by the removed separator row, so the whole table is one
    // <table> instead of splitting into two (header + body).
    .replace(/(<tr>.*?<\/tr>\s*)+/g, '<table class="w-full border-collapse my-6 text-sm">$&</table>')
    // Lists — bullets and numbered items get a `data-list` marker so the
    // wrap rules below can distinguish them; otherwise numbered items
    // would be stranded as bare <li> (no surrounding <ol>).
    .replace(/^- (.*$)/gm, '<li data-list="ul" class="ml-4 text-gray-600">$1</li>')
    .replace(/^\d+\. (.*$)/gm, '<li data-list="ol" class="ml-4 text-gray-600">$1</li>')
    .replace(/(<li data-list="ul"[^>]*>.*<\/li>\n?)+/g, '<ul class="list-disc pl-4 my-4 space-y-2">$&</ul>')
    .replace(/(<li data-list="ol"[^>]*>.*<\/li>\n?)+/g, '<ol class="list-decimal pl-4 my-4 space-y-2">$&</ol>')
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
    author: article.author
      ? { '@type': 'Person', name: article.author }
      : { '@type': 'Organization', name: 'TendorAI', url: 'https://www.tendorai.com' },
    publisher: {
      '@type': 'Organization',
      name: 'TendorAI',
      url: 'https://www.tendorai.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.tendorai.com/logo.png',
        width: 575,
        height: 283,
      },
    },
    datePublished: article.publishedDate,
    dateModified: article.updatedDate || article.publishedDate,
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
      { '@type': 'ListItem', position: 3, name: article.title, item: `https://www.tendorai.com/resources/${slug}` },
    ],
  };

  // Optional FAQPage JSON-LD when the article ships structured FAQs.
  const faqJsonLd = article.faqs && article.faqs.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: article.faqs.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer },
        })),
      }
    : null;

  return (
    <>
      {/* Article + extraJsonLd Article augmentations are suppressed when
          the article is parked (noindex). The meta robots tag already
          says "don't index this", so leaving Article structured data on
          a noindex page is contradictory — search engines and AI
          assistants treat it as a signal mismatch. BreadcrumbList and
          FAQPage stay; they're not Article and the page is still
          navigable. */}
      {!article.noindex && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      {/* Optional augmentation blocks. Match mainEntityOfPage @id to the
          canonical so search engines merge with the Article emitted above.
          Suppressed when the article is parked (noindex) — extraJsonLd
          augments the Article above, which isn't emitted in that case. */}
      {!article.noindex && article.extraJsonLd?.map((block, i) => (
        <script
          key={`extra-jsonld-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}

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
              {article.author && <span className="text-white font-medium">{article.author}</span>}
              {article.author && <span className="mx-2">&middot;</span>}
              {article.updatedDate && article.updatedDate !== article.publishedDate ? (
                <>Updated {new Date(article.updatedDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</>
              ) : (
                <>Published {new Date(article.publishedDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</>
              )}
            </div>
          </div>
        </section>

        {/* Article Content */}
        <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />

          {/* FAQ section (only renders when the article ships structured FAQs) */}
          {article.faqs && article.faqs.length > 0 && (
            <section className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {article.faqs.map((faq, i) => (
                  <details key={i} className="group border border-gray-200 rounded-lg overflow-hidden">
                    <summary className="cursor-pointer px-5 py-4 bg-gray-50 hover:bg-gray-100 transition-colors font-semibold text-gray-900 flex items-center justify-between">
                      <span>{faq.question}</span>
                      <svg className="w-5 h-5 text-gray-400 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="px-5 py-4 border-t border-gray-100 text-gray-700 leading-relaxed">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </section>
          )}

          {/* CTA */}
          <div className="mt-12 p-6 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Need help choosing the right solution?
            </h3>
            <p className="text-gray-600 mb-4">
              See what AI says about your business. Free, instant, and takes just 30 seconds.
            </p>
            <Link
              href="/aeo-report"
              className="inline-flex items-center px-5 py-2.5 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
            >
              Check AI Visibility
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
