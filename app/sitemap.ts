import { MetadataRoute } from 'next';
import { connectDB } from '@/lib/db/connection';
import { Vendor } from '@/lib/db/models';
import { SERVICE_KEYS, MAJOR_LOCATIONS } from '@/lib/constants';

const BASE_URL = 'https://www.tendorai.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const urls: MetadataRoute.Sitemap = [];

  // Static pages
  const staticPages = [
    { path: '/', priority: 1.0, changeFrequency: 'daily' as const },
    { path: '/suppliers', priority: 0.9, changeFrequency: 'daily' as const },
    { path: '/login', priority: 0.5, changeFrequency: 'monthly' as const },
    { path: '/signup', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/vendor-login', priority: 0.5, changeFrequency: 'monthly' as const },
    { path: '/vendor-signup', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/privacy-policy', priority: 0.3, changeFrequency: 'yearly' as const },
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
