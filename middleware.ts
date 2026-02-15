import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Routes that require authentication
const protectedRoutes = ['/dashboard', '/vendor-dashboard', '/admin'];

// Routes that should redirect to dashboard if already authenticated
const authRoutes = ['/login', '/signup', '/vendor-login', '/vendor-signup', '/admin/login'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get token from cookies
  const token = request.cookies.get('auth-token')?.value;

  // Check auth routes first (login/signup pages) — must come before protected route check
  // to avoid /admin/login being caught by the /admin protected route prefix
  const isAuthRoute = authRoutes.some((route) => pathname === route);

  if (isAuthRoute && token) {
    const redirectTo = pathname === '/admin/login' ? '/admin' : '/dashboard';
    return NextResponse.redirect(new URL(redirectTo, request.url));
  }

  if (isAuthRoute) {
    // Allow unauthenticated access to auth routes (don't fall through to protected check)
    const response = NextResponse.next();
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    return response;
  }

  // Check if accessing protected route without auth
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));

  if (isProtectedRoute && !token) {
    // Redirect to appropriate login page
    const isVendorRoute = pathname.startsWith('/vendor-dashboard');
    const isAdminRoute = pathname.startsWith('/admin');
    const loginPath = isAdminRoute ? '/admin/login' : isVendorRoute ? '/vendor-login' : '/login';
    const loginUrl = new URL(loginPath, request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Add security headers
  const response = NextResponse.next();

  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=()'
  );

  // CORS headers for API routes
  if (pathname.startsWith('/api/')) {
    const origin = request.headers.get('origin');

    const allowedOrigins = [
      'https://www.tendorai.com',
      'https://tendorai.com',
      'http://localhost:3000',
      'http://127.0.0.1:3000',
    ];

    // Allow Vercel preview deployments
    const isVercelPreview =
      origin?.includes('ai-procurement') && origin?.includes('vercel.app');

    if (origin && (allowedOrigins.includes(origin) || isVercelPreview)) {
      response.headers.set('Access-Control-Allow-Origin', origin);
      response.headers.set('Access-Control-Allow-Credentials', 'true');
      response.headers.set(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, OPTIONS'
      );
      response.headers.set(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization, X-Requested-With'
      );
    }

    // Handle preflight
    if (request.method === 'OPTIONS') {
      return new NextResponse(null, { status: 200, headers: response.headers });
    }
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
};
