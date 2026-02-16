import { Metadata } from 'next';
import Link from 'next/link';
import { connectDB } from '@/lib/db/connection';
import { VendorPost } from '@/lib/db/models';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Supplier Posts | News, Guides & Offers',
  description: 'Read the latest news, product updates, guides, and offers from UK office equipment suppliers on TendorAI.',
  openGraph: {
    title: 'Supplier Posts | TendorAI',
    url: 'https://www.tendorai.com/posts',
  },
  alternates: {
    canonical: 'https://www.tendorai.com/posts',
  },
};

async function getPosts() {
  await connectDB();

  try {
    const posts = await VendorPost.find({ status: 'published' })
      .sort({ createdAt: -1 })
      .limit(50)
      .populate('vendor', 'company tier location.city')
      .lean()
      .exec() as any[];

    return posts.map((p: any) => ({
      ...p,
      _id: p._id.toString(),
      vendor: p.vendor ? { ...p.vendor, _id: p.vendor._id.toString() } : null,
    }));
  } catch {
    return [];
  }
}

const categoryLabels: Record<string, string> = {
  news: 'News',
  product: 'Product',
  offer: 'Offer',
  guide: 'Guide',
  update: 'Update',
};

const categoryColors: Record<string, string> = {
  news: 'bg-blue-100 text-blue-700',
  product: 'bg-green-100 text-green-700',
  offer: 'bg-amber-100 text-amber-700',
  guide: 'bg-purple-100 text-purple-700',
  update: 'bg-gray-100 text-gray-700',
};

export default async function PostsFeedPage() {
  const posts = await getPosts();

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-brand-gradient text-white py-12">
        <div className="section">
          <nav className="text-sm mb-4 text-purple-200">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Posts</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Supplier Posts</h1>
          <p className="text-lg text-purple-100">
            News, guides, product updates and offers from UK office equipment suppliers.
          </p>
        </div>
      </section>

      <section className="section py-8">
        {posts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post._id}
                href={`/posts/${post.slug}`}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col"
              >
                <div className="flex items-center gap-2 mb-3">
                  {post.category && (
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${categoryColors[post.category] || categoryColors.update}`}>
                      {categoryLabels[post.category] || post.category}
                    </span>
                  )}
                  <span className="text-xs text-gray-400">
                    {new Date(post.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </div>

                <h2 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {post.title}
                </h2>

                <p className="text-sm text-gray-600 line-clamp-3 flex-1">
                  {post.body.substring(0, 200).replace(/\n/g, ' ')}...
                </p>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-sm font-medium text-purple-600">
                    {post.vendor?.company || 'Supplier'}
                  </span>
                  {post.vendor?.location?.city && (
                    <span className="text-xs text-gray-400">{post.vendor.location.city}</span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg">
            <p className="text-gray-500 text-lg mb-4">No posts yet</p>
            <p className="text-gray-400">
              Supplier posts will appear here as vendors share news, guides, and offers.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
