import { connectDB } from '@/lib/db/connection';
import { Vendor } from '@/lib/db/models';

const baseUrl = 'https://www.tendorai.com';
const VENDORS_PER_SITEMAP = 5000;

function entry(loc: string, lastmod: string, changefreq: string, priority: number) {
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

export async function GET() {
  return generateVendorSitemap(0);
}

export async function generateVendorSitemap(page: number) {
  let vendorUrls: string[] = [];

  try {
    await connectDB();

    const vendors = await Vendor.find(
      { slug: { $exists: true, $ne: '' } },
      { slug: 1, updatedAt: 1 }
    )
      .sort({ updatedAt: -1 })
      .skip(page * VENDORS_PER_SITEMAP)
      .limit(VENDORS_PER_SITEMAP)
      .lean();

    vendorUrls = vendors.map((v) => {
      const lastmod = v.updatedAt
        ? new Date(v.updatedAt).toISOString()
        : new Date().toISOString();
      return entry(`${baseUrl}/suppliers/vendor/${v.slug}`, lastmod, 'weekly', 0.8);
    });
  } catch (err) {
    console.error('Failed to generate vendor sitemap:', err);
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${vendorUrls.join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  });
}
