'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: 'Find Suppliers', href: '/suppliers' },
  { name: 'How It Works', href: '/how-it-works' },
  { name: 'For Vendors', href: '/for-vendors' },
  { name: 'About', href: '/about' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled ? 'bg-white/95 backdrop-blur shadow-sm' : 'bg-white'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-4" aria-label="Global">
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
            <span className="sr-only">TendorAI</span>
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center">
              <svg
                className="h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z"
                />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900">
              Tendor<span className="text-purple-600">AI</span>
            </span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
          >
            <span className="sr-only">{mobileMenuOpen ? 'Close menu' : 'Open menu'}</span>
            {mobileMenuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>

        {/* Desktop navigation */}
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-medium transition-colors ${
                pathname === item.href
                  ? 'text-purple-600'
                  : 'text-gray-700 hover:text-purple-600'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Desktop CTA buttons */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
          <a
            href="https://www.tendorai.com/login"
            className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors py-2"
          >
            Sign in
          </a>
          <Link
            href="/suppliers"
            className="inline-block bg-purple-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm"
          >
            Get Quotes
          </Link>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`lg:hidden transition-all duration-200 overflow-hidden ${
          mobileMenuOpen ? 'max-h-96 border-t border-gray-100' : 'max-h-0'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-1 py-4">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`block rounded-lg px-3 py-2 text-base font-medium transition-colors ${
                pathname === item.href
                  ? 'bg-purple-50 text-purple-600'
                  : 'text-gray-900 hover:bg-gray-50'
              }`}
            >
              {item.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-gray-100 mt-4 space-y-2">
            <a
              href="https://www.tendorai.com/login"
              className="block rounded-lg px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50"
            >
              Sign in
            </a>
            <Link
              href="/suppliers"
              className="block bg-purple-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-center"
            >
              Get Quotes
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
