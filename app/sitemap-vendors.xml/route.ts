import { generateVendorSitemap } from '@/lib/utils/vendorSitemap';

export async function GET() {
  return generateVendorSitemap(0);
}
