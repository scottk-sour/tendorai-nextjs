import { Metadata } from 'next';
import { VERTICALS, VerticalConfig } from '@/lib/constants/verticals';
import { CITIES, CITY_MAP, CityConfig } from '@/lib/constants/cities';
import { CityStats } from '@/app/components/landing/CityVerticalLandingPage';

export function getCityStaticParams() {
  return CITIES.map((city) => ({ city: city.slug }));
}

export function resolveParams(
  verticalKey: string,
  citySlug: string
): { config: VerticalConfig; city: CityConfig } | null {
  const config = VERTICALS[verticalKey];
  const city = CITY_MAP[citySlug];
  if (!config || !city) return null;
  return { config, city };
}

export function buildCityMetadata(config: VerticalConfig, city: CityConfig): Metadata {
  const title = `AI Visibility for ${config.name} in ${city.name} | TendorAI`;
  const description = `Most ${config.name.toLowerCase()} firms in ${city.name} are invisible to AI. Check your firm\u2019s AI Visibility (AEO) score for free. ${config.name} in ${city.name} already profiled on TendorAI.`;

  return {
    title,
    description,
    alternates: { canonical: `/${config.slug}/${city.slug}` },
    openGraph: {
      title,
      description,
      url: `https://www.tendorai.com/${config.slug}/${city.slug}`,
      images: [{ url: '/logo.png', width: 575, height: 283, alt: title }],
    },
    twitter: {
      card: 'summary',
      title,
      description,
      images: ['/logo.png'],
    },
  };
}

const VERTICAL_TO_VENDOR_TYPE: Record<string, string> = {
  solicitors: 'solicitor',
  accountants: 'accountant',
  'mortgage-advisors': 'mortgage-advisor',
  'estate-agents': 'estate-agent',
};

export async function fetchCityStats(
  verticalKey: string,
  cityName: string
): Promise<CityStats | null> {
  const vendorType = VERTICAL_TO_VENDOR_TYPE[verticalKey];
  if (!vendorType) return null;

  try {
    const API_URL =
      process.env.EXPRESS_BACKEND_URL ||
      'https://ai-procurement-backend-q35u.onrender.com';
    const res = await fetch(
      `${API_URL}/api/public/city-stats?city=${encodeURIComponent(cityName)}&vendorType=${encodeURIComponent(vendorType)}`,
      { next: { revalidate: 86400 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.success ? data : null;
  } catch {
    return null;
  }
}
