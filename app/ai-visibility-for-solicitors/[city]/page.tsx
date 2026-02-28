import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CityVerticalLandingPage from '@/app/components/landing/CityVerticalLandingPage';
import {
  getCityStaticParams,
  resolveParams,
  buildCityMetadata,
  fetchCityStats,
} from '@/lib/helpers/cityPageHelpers';

const VERTICAL_KEY = 'solicitors';

export const generateStaticParams = getCityStaticParams;

type Props = { params: Promise<{ city: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: citySlug } = await params;
  const resolved = resolveParams(VERTICAL_KEY, citySlug);
  if (!resolved) return {};
  return buildCityMetadata(resolved.config, resolved.city);
}

export default async function Page({ params }: Props) {
  const { city: citySlug } = await params;
  const resolved = resolveParams(VERTICAL_KEY, citySlug);
  if (!resolved) notFound();

  const stats = await fetchCityStats(VERTICAL_KEY, resolved.city.name);
  return <CityVerticalLandingPage config={resolved.config} city={resolved.city} stats={stats} />;
}
