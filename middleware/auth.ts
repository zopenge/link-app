import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import authConfig from '@/lib/config';

export function handleAuth(request: NextRequest, pathname: string): NextResponse | null {
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