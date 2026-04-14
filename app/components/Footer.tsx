import Link from 'next/link';
import Image from 'next/image';
import AskAiButton from './AskAiButton';

const footerNavigation = {
  product: [
    { name: 'Find Suppliers', href: '/suppliers' },
    { name: 'AI Visibility Report', href: '/aeo-report' },
    { name: 'AI Visibility Platform', href: '/ai-visibility-platform' },
    { name: 'For Vendors', href: '/for-vendors' },
    { name: 'Pricing', href: '/for-vendors#pricing' },
    { name: 'Resources', href: '/resources' },
    { name: 'Schema Checker', href: '/tools/schema-checker' },
    { name: 'AEO Checklist', href: '/tools/aeo-checklist' },
    { name: 'Accountancy AI Checklist', href: '/tools/ai-visibility-checklist-accountants' },
    { name: 'Blog', href: '/resources' },
  ],
  company: [
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Press', href: '/press' },
    { name: 'FAQ', href: '/faq' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ],
};

// Top cities for internal linking — improves crawl depth for GEO pages
const popularLocations = [
  { name: 'Cardiff', slug: 'cardiff' },
  { name: 'Bristol', slug: 'bristol' },
  { name: 'Swansea', slug: 'swansea' },
  { name: 'Newport', slug: 'newport' },
  { name: 'Bath', slug: 'bath' },
  { name: 'Gloucester', slug: 'gloucester' },
  { name: 'Exeter', slug: 'exeter' },
  { name: 'Plymouth', slug: 'plymouth' },
  { name: 'Cheltenham', slug: 'cheltenham' },
  { name: 'Swindon', slug: 'swindon' },
  { name: 'Bournemouth', slug: 'bournemouth' },
  { name: 'Taunton', slug: 'taunton' },
];

const serviceCategories = [
  { name: 'Conveyancing Solicitors', slug: 'conveyancing' },
  { name: 'Wills & Probate', slug: 'wills-and-probate' },
  { name: 'Family Law', slug: 'family-law' },
  { name: 'Immigration Solicitors', slug: 'immigration' },
  { name: 'Personal Injury', slug: 'personal-injury' },
  { name: 'Employment Law', slug: 'employment-law' },
];

const industries = [
  { name: 'AI Visibility for Solicitors', href: '/ai-visibility-for-solicitors' },
  { name: 'AI Visibility for Accountants', href: '/ai-visibility-for-accountants' },
  { name: 'AI Visibility for Mortgage Advisers', href: '/ai-visibility-for-mortgage-advisors' },
  { name: 'AI Visibility for Estate Agents', href: '/ai-visibility-for-estate-agents' },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900" aria-labelledby="footer-heading" data-nosnippet>
      <div id="footer-heading" className="sr-only">
        Footer
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="xl:grid xl:grid-cols-4 xl:gap-8">
          {/* Logo and description */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.png" alt="TendorAI" width={32} height={32} className="h-8 w-auto" />
              <span className="text-xl font-bold text-white">
                Tendor<span className="text-purple-400">AI</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 max-w-xs">
              AI visibility platform helping UK professional services firms get recommended by AI.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/company/tendorai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <span className="sr-only">LinkedIn</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a
                href="https://x.com/AiTendor95471"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <span className="sr-only">X (Twitter)</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation links */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 xl:col-span-3 xl:mt-0">
            <div>
              <h3 className="text-sm font-semibold text-white">Product</h3>
              <ul role="list" className="mt-4 space-y-3">
                {footerNavigation.product.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>

              <h3 className="text-sm font-semibold text-white mt-8">Company</h3>
              <ul role="list" className="mt-4 space-y-3">
                {footerNavigation.company.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
                {footerNavigation.legal.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white">Industries</h3>
              <ul role="list" className="mt-4 space-y-3">
                {industries.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>

              <h3 className="text-sm font-semibold text-white mt-8">Services</h3>
              <ul role="list" className="mt-4 space-y-3">
                {serviceCategories.map((cat) => (
                  <li key={cat.slug}>
                    <Link
                      href={`/suppliers/${cat.slug}`}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2 md:col-span-2">
              <h3 className="text-sm font-semibold text-white">Popular Locations</h3>
              <ul role="list" className="mt-4 grid grid-cols-2 gap-x-8 gap-y-3">
                {popularLocations.map((loc) => (
                  <li key={loc.slug}>
                    <Link
                      href={`/suppliers/solicitors/${loc.slug}`}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      Solicitors in {loc.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Ask AI */}
        <div className="mt-10 border-t border-gray-800 pt-8">
          <AskAiButton />
        </div>

        {/* Bottom bar */}
        <div className="mt-6 border-t border-gray-800 pt-8">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} TendorAI Ltd &middot; The UK&apos;s AI Visibility Platform &middot; Wales, UK
          </p>
        </div>
      </div>
    </footer>
  );
}
