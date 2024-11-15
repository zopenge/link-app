import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import authConfig from '@/lib/config';

// Add paths that don't require authentication
const publicPaths = ['/login', '/api/login', '/register', '/api/register', '/welcome'];
const languages = ['en', 'zh'];
const staticPaths = ['/favicon.ico', '/api', '/_next', '/public', '/static', '/images', '/flags'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static files and API routes
  if (staticPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Skip file extensions
  if (pathname.match(/\.(svg|jpg|png|gif|ico|css|js)$/)) {
    return NextResponse.next();
  }

  // Rest of your existing middleware code...
  if (pathname.endsWith('.svg')) {
    return NextResponse.next();
  }

  if (publicPaths.some(path => pathname.includes(path))) {
    return NextResponse.next();
  }

  // Handle i18n routing
  const pathnameHasLocale = languages.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (!pathnameHasLocale) {
    // check saved language preference from cookie first
    const savedLocale = request.cookies.get('i18nextLng')?.value;
    const browserLocale = request.headers.get('accept-language')?.split(',')[0].split('-')[0];
    
    // priority: saved locale > browser locale > default 'en'
    const locale = savedLocale || browserLocale || 'en';
    const finalLocale = languages.includes(locale) ? locale : 'en';
    
    // preserve the full pathname when redirecting
    const fullPath = pathname === '/' ? '' : pathname;
    return NextResponse.redirect(new URL(`/${finalLocale}${fullPath}`, request.url));
  }

  const token = request.cookies.get('auth_token')?.value;

  if (!token) {
    const locale = pathname.split('/')[1];
    return NextResponse.redirect(new URL(`/${locale}/welcome`, request.url));
  }

  try {
    jwt.verify(token, authConfig.jwt.secret, {
      issuer: authConfig.jwt.issuer,
      algorithms: [authConfig.jwt.algorithm as jwt.Algorithm],
    });
    return NextResponse.next();
  } catch {
    const locale = pathname.split('/')[1];
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    // Skip all api routes
    // Skip all static files (favicon.ico, images, etc)
    '/((?!api|_next/static|_next/image|favicon.ico|images|flags).*)',
  ],
}; 