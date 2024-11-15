import { NextRequest, NextResponse } from 'next/server';

const languages = ['en', 'zh'];

export function handleI18n(request: NextRequest, pathname: string): NextResponse | null {
    const pathnameHasLocale = languages.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (!pathnameHasLocale) {
        const savedLocale = request.cookies.get('i18nextLng')?.value;
        const browserLocale = request.headers.get('accept-language')?.split(',')[0].split('-')[0];
        const locale = savedLocale || browserLocale || 'en';
        const finalLocale = languages.includes(locale) ? locale : 'en';
        const fullPath = pathname === '/' ? '' : pathname;
        return NextResponse.redirect(new URL(`/${finalLocale}${fullPath}`, request.url));
    }

    return null;
}