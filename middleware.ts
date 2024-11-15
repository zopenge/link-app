import { NextRequest, NextResponse } from 'next/server';
import { handleAuth } from '@/middleware/auth';
import { handleI18n } from '@/middleware/i18n';
import { isStaticPath, isPublicPath } from '@/middleware/paths';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isStaticPath(pathname)) {
    return NextResponse.next();
  }

  if (isPublicPath(pathname)) {
    const i18nResponse = handleI18n(request, pathname);
    if (i18nResponse) return i18nResponse;
    return NextResponse.next();
  }

  const i18nResponse = handleI18n(request, pathname);
  if (i18nResponse) return i18nResponse;

  const authResponse = handleAuth(request, pathname);
  if (authResponse) return authResponse;

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|images|flags).*)',
  ],
}; 