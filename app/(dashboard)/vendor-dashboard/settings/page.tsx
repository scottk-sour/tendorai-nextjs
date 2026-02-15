import SettingsContent from './SettingsContent';

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const { tab } = await searchParams;
  return <SettingsContent initialTab={tab} />;
}
