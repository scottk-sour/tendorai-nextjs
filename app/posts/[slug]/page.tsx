import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { connectDB } from '@/lib/db/connection';
import { VendorPost, Vendor } from '@/lib/db/models';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 3600;

async function getPost(slug: string) {
  await connectDB();

  try {
    const post = await VendorPost.findOne({ slug, status: 'published' })
      .populate('vendor', 'company tier location.city contactInfo.website')
      .lean()
      .exec();

    if (!post) return null;

    return {
      ...post,
      _id: post._id.toString(),
      vendor: post.vendor ? {
        ...post.vendor,
        _id: post.vendor._id.toString(),
      } : null,
    };
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return { title: 'Post Not Found' };
  }

  const vendorName = post.vendor?.company || 'TendorAI Vendor';
  const title = `${post.title} | ${vendorName}`;
  const description = post.body.slice(0, 160).replace(/\n/g, ' ');

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://www.tendorai.com/posts/${slug}`,
      type: 'article',
    },
    alternates: {
      canonical: `https://www.tendorai.com/posts/${slug}`,
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const vendorName = post.vendor?.company || 'TendorAI Vendor';
  const vendorCity = post.vendor?.location?.city || '';
  const vendorId = post.vendor?._id;

  // Schema.org BlogPosting JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    articleBody: post.body,
    datePublished: post.createdAt,
    dateModified: post.updatedAt,
    author: {
      '@type': 'Organization',
      name: vendorName,
      url: vendorId
        ? `https://www.tendorai.com/suppliers/profile/${vendorId}`
        : 'https://www.tendorai.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'TendorAI',
      url: 'https://www.tendorai.com',
    },
    mainEntityOfPage: `https://www.tendorai.com/posts/${slug}`,
    keywords: post.tags?.join(', ') || '',
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.tendorai.com' },
      { '@type': 'ListItem', position: 2, name: 'Posts', item: 'https://www.tendorai.com/posts' },
      { '@type': 'ListItem', position: 3, name: post.title },
    ],
  };

  const categoryLabels: Record<string, string> = {
    news: 'News',
    product: 'Product',
    offer: 'Offer',
    guide: 'Guide',
    update: 'Update',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <main className="min-h-screen bg-gray-50">
        {/* Header */}
        <section className="bg-brand-gradient text-white py-8">
          <div className="section max-w-3xl">
            <nav className="text-sm mb-4 text-purple-200">
              <Link href="/" className="hover:text-white">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/posts" className="hover:text-white">Posts</Link>
              <span className="mx-2">/</span>
              <span className="text-white">{post.title.substring(0, 50)}{post.title.length > 50 ? '...' : ''}</span>
            </nav>

            <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
              {post.title}
            </h1>

            <div className="flex items-center gap-4 text-sm text-purple-200">
              {vendorId && (
                <Link href={`/suppliers/profile/${vendorId}`} className="hover:text-white font-medium">
                  {vendorName}
                </Link>
              )}
              {vendorCity && <span>{vendorCity}</span>}
              <span>{new Date(post.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              {post.category && (
                <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs">
                  {categoryLabels[post.category] || post.category}
                </span>
              )}
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="section max-w-3xl py-8">
          <article className="bg-white rounded-lg shadow-sm p-6 md:p-8">
            <div className="prose prose-purple max-w-none whitespace-pre-line text-gray-700 leading-relaxed">
              {post.body}
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* Vendor CTA */}
          {vendorId && (
            <div className="mt-6 bg-purple-50 rounded-lg p-6 text-center">
              <p className="text-purple-800 font-medium mb-3">
                Interested in {vendorName}&apos;s services?
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href={`/suppliers/profile/${vendorId}`}
                  className="btn-primary"
                >
                  View Profile
                </Link>
                <Link
                  href={`/suppliers/profile/${vendorId}?quote=true`}
                  className="btn-outline"
                >
                  Request Quote
                </Link>
              </div>
            </div>
          )}

          {post.isDemoVendor && (
            <p className="text-center text-sm text-gray-400 mt-4">
              Demo profile — this is an example of what vendor posts look like on TendorAI.
            </p>
          )}
        </section>
      </main>
    </>
  );
}
