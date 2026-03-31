import { generateVendorSitemap } from '../sitemap-vendors.xml/route';

export async function GET() {
  return generateVendorSitemap(1);
}
