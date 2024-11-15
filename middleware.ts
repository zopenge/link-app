import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import authConfig from '@/lib/config';

// Add paths that don't require authentication
const publicPaths = ['/login', '/api/login'];
const languages = ['en', 'zh'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

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
    // Redirect to default locale if no locale in pathname
    const locale = request.headers.get('accept-language')?.split(',')[0].split('-')[0] || 'en';
    const finalLocale = languages.includes(locale) ? locale : 'en';
    return NextResponse.redirect(new URL(`/${finalLocale}${pathname}`, request.url));
  }

  const token = request.cookies.get('auth_token')?.value;

  if (!token) {
    const locale = pathname.split('/')[1];
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
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
    '/((?!api|_next/static|_next/image|favicon.ico|public/).*)',
  ],
}; 