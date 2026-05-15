import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';

export default function OnboardingFirmFactsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200">
        <div className="mx-auto flex max-w-2xl items-center px-6 py-4">
          <Link href="/" aria-label="TendorAI home" className="flex items-center">
            <Image
              src="/logo.png"
              alt="TendorAI"
              width={40}
              height={40}
              className="h-10 w-auto"
              priority
            />
            <span className="ml-2 text-lg font-semibold text-gray-900">
              TendorAI
            </span>
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-2xl px-6 py-10">{children}</main>
    </div>
  );
}
