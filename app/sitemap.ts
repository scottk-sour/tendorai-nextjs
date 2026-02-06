import { MetadataRoute } from 'next';
import { connectDB } from '@/lib/db/connection';
import { Vendor } from '@/lib/db/models';
import { SERVICE_KEYS, MAJOR_LOCATIONS } from '@/lib/constants';
import { articles } from '@/lib/content/articles';

const BASE_URL = 'https://www.tendorai.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const urls: MetadataRoute.Sitemap = [];

  // Static pages
  const staticPages = [
    { path: '/', priority: 1.0, changeFrequency: 'daily' as const },
    { path: '/suppliers', priority: 0.9, changeFrequency: 'daily' as const },
    { path: '/suppliers/search', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/get-quotes', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/how-it-works', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/for-vendors', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/compare', priority: 0.6, changeFrequency: 'weekly' as const },
    { path: '/about', priority: 0.5, changeFrequency: 'monthly' as const },
    { path: '/faq', priority: 0.5, changeFrequency: 'monthly' as const },
    { path: '/contact', priority: 0.5, changeFrequency: 'monthly' as const },
    { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/terms', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/vendor-login', priority: 0.4, changeFrequency: 'monthly' as const },
    { path: '/vendor-signup', priority: 0.5, changeFrequency: 'monthly' as const },
    { path: '/vendor-forgot-password', priority: 0.3, changeFrequency: 'yearly' as const },
  ];

  staticPages.forEach(({ path, priority, changeFrequency }) => {
    urls.push({
      url: `${BASE_URL}${path}`,
      lastModified: now,
      changeFrequency,
      priority,
    });
  });

  // Category pages
  for (const category of SERVICE_KEYS) {
    urls.push({
      url: `${BASE_URL}/suppliers/${category}`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    });

    // Category + location pages (GEO pages)
    for (const location of MAJOR_LOCATIONS) {
      urls.push({
        url: `${BASE_URL}/suppliers/${category}/${location.toLowerCase().replace(/\s+/g, '-')}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    }
  }

  // Resources/articles pages
  urls.push({
    url: `${BASE_URL}/resources`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  });

  articles.forEach((article) => {
    urls.push({
      url: `${BASE_URL}/resources/${article.slug}`,
      lastModified: new Date(article.publishedDate),
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  });

  // Dynamic vendor profile pages from database
  try {
    await connectDB();

    const vendors = await Vendor.find(
      { 'account.status': 'active', 'account.verificationStatus': 'verified' },
      { _id: 1, updatedAt: 1 }
    )
      .lean()
      .exec();

    vendors.forEach((vendor: { _id: { toString(): string }; updatedAt?: Date }) => {
      urls.push({
        url: `${BASE_URL}/suppliers/profile/${vendor._id.toString()}`,
        lastModified: vendor.updatedAt || now,
        changeFrequency: 'weekly',
        priority: 0.7,
      });
    });
  } catch (error) {
    console.error('Sitemap DB error:', error);
    // Continue with static pages only
  }

  return urls;
}
