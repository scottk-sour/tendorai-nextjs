'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const industryLinks = [
  { href: '/ai-visibility-for-solicitors', label: 'Solicitors' },
  { href: '/ai-visibility-for-accountants', label: 'Accountants' },
  { href: '/ai-visibility-for-mortgage-advisors', label: 'Mortgage Advisers' },
  { href: '/ai-visibility-for-estate-agents', label: 'Estate Agents' },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // Desktop and mobile Industries dropdowns are independent. They used to
  // share a single piece of state, but the desktop click-outside listener
  // would then incorrectly close the mobile collapsible too. Keeping them
  // separate keeps each viewport's toggle self-contained.
  const [isIndustriesOpen, setIsIndustriesOpen] = useState(false);
  const [isMobileIndustriesOpen, setIsMobileIndustriesOpen] = useState(false);
  const pathname = usePathname();
  // Desktop Industries wrapper — used by the click-outside listener to
  // detect whether a mousedown happened inside the dropdown subtree.
  const industriesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsIndustriesOpen(false);
    setIsMobileIndustriesOpen(false);
  }, [pathname]);

  // Close the Industries dropdown when the user clicks outside it (mouse or
  // touch) or presses Escape. Attached only while the menu is open to avoid
  // an always-on document listener. Listens on mousedown rather than click
  // so the menu doesn't briefly persist if the user taps a non-Link area.
  useEffect(() => {
    if (!isIndustriesOpen) return;

    const handlePointer = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node | null;
      if (target && industriesRef.current && !industriesRef.current.contains(target)) {
        setIsIndustriesOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsIndustriesOpen(false);
    };

    document.addEventListener('mousedown', handlePointer);
    document.addEventListener('touchstart', handlePointer);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handlePointer);
      document.removeEventListener('touchstart', handlePointer);
      document.removeEventListener('keydown', handleKey);
    };
  }, [isIndustriesOpen]);

  const navLinks = [
    { href: '/suppliers', label: 'Find Suppliers' },
    { href: '/ai-visibility-platform', label: 'How It Works' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/resources', label: 'Resources' },
    { href: '/research', label: 'Research' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  const isIndustriesActive = pathname.startsWith('/ai-visibility-for-');

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,box-shadow,border-color] duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-[var(--border)]' : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/logo.png" alt="TendorAI" width={40} height={40} className="h-10 w-auto" priority />
            <span className="text-xl font-bold text-gray-900">
              Tendor<span className="text-purple-600">AI</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? 'text-purple-600'
                    : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Industries Dropdown — works on hover (mouse), click (mouse +
                touch) and keyboard (Enter/Space on the button, Escape to
                close, click-outside to close). The outer absolute wrapper
                uses `pt-2` rather than `mt-1` so the hit-box is continuous
                from the button's bottom edge to the visible menu card —
                previously the 4px transparent margin gap dropped the cursor
                out of the hover subtree and slammed the menu shut before
                the user could reach the items. */}
            <div
              ref={industriesRef}
              className="relative"
              onMouseEnter={() => setIsIndustriesOpen(true)}
              onMouseLeave={() => setIsIndustriesOpen(false)}
            >
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={isIndustriesOpen}
                onClick={() => setIsIndustriesOpen((o) => !o)}
                className={`text-sm font-medium transition-colors flex items-center gap-1 ${
                  isIndustriesActive ? 'text-purple-600' : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                Industries
                <svg className={`w-3.5 h-3.5 transition-transform ${isIndustriesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isIndustriesOpen && (
                <div
                  className="absolute top-full left-0 pt-2 w-56 z-50"
                  role="menu"
                >
                  <div className="bg-white rounded-xl shadow-lg border border-[var(--border)] py-2">
                    {industryLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        role="menuitem"
                        className={`block px-4 py-2.5 text-sm transition-colors ${
                          pathname === link.href
                            ? 'text-purple-600 bg-purple-50'
                            : 'text-gray-600 hover:text-purple-600 hover:bg-gray-50'
                        }`}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Desktop Auth + CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              href="/vendor-login"
              className="text-sm font-medium text-gray-600 hover:text-purple-600 transition-colors"
            >
              Firm Login
            </Link>
            <Link
              href="/tools/schema-checker"
              className="text-sm font-medium text-gray-600 hover:text-purple-600 transition-colors"
            >
              Schema Checker
            </Link>
            <Link
              href="/tools/robots-checker"
              className="text-sm font-medium text-gray-600 hover:text-purple-600 transition-colors"
            >
              AI Crawler Checker
            </Link>
            <Link
              href="/ai-visibility-report"
              className="btn-primary !py-2 !px-5 !text-sm"
            >
              Free AI Report
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-sm font-medium px-3 py-2 rounded-lg transition-colors ${
                    isActive(link.href)
                      ? 'text-purple-600 bg-purple-50'
                      : 'text-gray-600 hover:text-purple-600 hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile Industries Section — independent state from the
                  desktop dropdown above. */}
              <button
                type="button"
                aria-expanded={isMobileIndustriesOpen}
                onClick={() => setIsMobileIndustriesOpen((o) => !o)}
                className={`text-sm font-medium px-3 py-2 rounded-lg transition-colors flex items-center justify-between w-full ${
                  isIndustriesActive
                    ? 'text-purple-600 bg-purple-50'
                    : 'text-gray-600 hover:text-purple-600 hover:bg-gray-50'
                }`}
              >
                Industries
                <svg className={`w-4 h-4 transition-transform ${isMobileIndustriesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isMobileIndustriesOpen && (
                <div className="pl-4 space-y-1">
                  {industryLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`block text-sm font-medium px-3 py-2 rounded-lg transition-colors ${
                        pathname === link.href
                          ? 'text-purple-600 bg-purple-50'
                          : 'text-gray-500 hover:text-purple-600 hover:bg-gray-50'
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}

              <div className="border-t border-gray-100 pt-3 mt-2 space-y-1">
                <Link
                  href="/vendor-login"
                  className="block text-sm font-medium text-gray-600 hover:text-purple-600 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Firm Login
                </Link>
                <Link
                  href="/tools/schema-checker"
                  className="block text-sm font-medium text-gray-600 hover:text-purple-600 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Schema Checker
                </Link>
                <Link
                  href="/tools/robots-checker"
                  className="block text-sm font-medium text-gray-600 hover:text-purple-600 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  AI Crawler Checker
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
