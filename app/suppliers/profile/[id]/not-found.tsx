import Link from 'next/link';

export default function VendorNotFound() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center px-4">
        <div className="text-gray-300 text-8xl mb-6">404</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Supplier Not Found</h1>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          The supplier you&apos;re looking for doesn&apos;t exist or is no longer available.
          They may have been removed from our directory.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/suppliers" className="btn-primary">
            Browse All Suppliers
          </Link>
          <Link href="/" className="btn-secondary">
            Go to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
