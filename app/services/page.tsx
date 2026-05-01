import { Metadata } from 'next';
import { Suspense } from 'react';
import ServiceCategoriesClient from '../components/landing/ServiceCategoriesClient';
import { connectDB } from '@/lib/db/connection';
import { Vendor } from '@/lib/db/models';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Browse Services by Category | TendorAI',
  description:
    'Browse verified UK firms by service category — solicitors, accountants, mortgage advisers, and office equipment suppliers. AI-recommended profiles built from SRA, ICAEW, and FCA register data.',
  alternates: { canonical: 'https://www.tendorai.com/services' },
  openGraph: {
    type: 'website',
    url: 'https://www.tendorai.com/services',
    title: 'Browse Services by Category | TendorAI',
    description:
      'Browse verified UK firms by service category — solicitors, accountants, mortgage advisers, and office equipment suppliers.',
    siteName: 'TendorAI',
    locale: 'en_GB',
  },
  robots: { index: true, follow: true },
};

async function getCategoryCounts(): Promise<Record<string, number>> {
  await connectDB();

  const statusFilter = {
    $or: [
      { 'account.status': 'active', 'account.verificationStatus': 'verified' },
      { listingStatus: 'unclaimed' },
    ],
  };

  const [equipmentStats, solicitorStats, accountantCount, mortgageStats, estateStats] = await Promise.all([
    Vendor.aggregate([
      { $match: { ...statusFilter, vendorType: { $nin: ['solicitor', 'accountant', 'mortgage-advisor', 'estate-agent'] } } },
      { $unwind: '$services' },
      { $group: { _id: '$services', count: { $sum: 1 } } },
    ]),
    Vendor.aggregate([
      { $match: { ...statusFilter, vendorType: 'solicitor' } },
      { $unwind: '$practiceAreas' },
      { $group: { _id: '$practiceAreas', count: { $sum: 1 } } },
    ]),
    Vendor.aggregate([
      { $match: { ...statusFilter, vendorType: 'accountant' } },
      { $unwind: '$practiceAreas' },
      { $group: { _id: '$practiceAreas', count: { $sum: 1 } } },
    ]),
    Vendor.aggregate([
      { $match: { ...statusFilter, vendorType: 'mortgage-advisor' } },
      { $unwind: '$practiceAreas' },
      { $group: { _id: '$practiceAreas', count: { $sum: 1 } } },
    ]),
    Vendor.aggregate([
      { $match: { ...statusFilter, vendorType: 'estate-agent' } },
      { $unwind: '$practiceAreas' },
      { $group: { _id: '$practiceAreas', count: { $sum: 1 } } },
    ]),
  ]);

  const counts: Record<string, number> = {};

  equipmentStats.forEach((s: { _id: string; count: number }) => { counts[s._id] = s.count; });
  solicitorStats.forEach((s: { _id: string; count: number }) => { counts[s._id] = s.count; });
  if (accountantCount.length > 0) {
    accountantCount.forEach((s: { _id: string; count: number }) => { counts[s._id] = s.count; });
  } else {
    const totalAccountants = await Vendor.countDocuments({ ...statusFilter, vendorType: 'accountant' });
    counts['Accountants'] = totalAccountants;
  }
  mortgageStats.forEach((s: { _id: string; count: number }) => { counts[s._id] = s.count; });
  estateStats.forEach((s: { _id: string; count: number }) => { counts[s._id] = s.count; });

  return counts;
}

export default async function ServicesPage() {
  const categoryCounts = await getCategoryCounts();

  return (
    <main>
      <Suspense fallback={<div className="py-8" />}>
        <ServiceCategoriesClient categoryCounts={categoryCounts} />
      </Suspense>
    </main>
  );
}
