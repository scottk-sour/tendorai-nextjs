'use client';

import dynamic from 'next/dynamic';

const ServiceCategories = dynamic(
  () => import('./ServiceCategories'),
  {
    ssr: false,
    loading: () => (
      <div className="py-16 text-center text-gray-400 text-sm">
        Loading services...
      </div>
    ),
  }
);

interface ServiceCategoriesClientProps {
  categoryCounts?: Record<string, number>;
}

export default function ServiceCategoriesClient({ categoryCounts }: ServiceCategoriesClientProps) {
  return <ServiceCategories categoryCounts={categoryCounts} />;
}
