const publicPaths = ['/login', '/api/login', '/register', '/api/register', '/welcome'];
const staticPaths = ['/favicon.ico', '/api', '/_next', '/public', '/static', '/images', '/flags'];

export function isStaticPath(pathname: string): boolean {
    return staticPaths.some(path => pathname.startsWith(path)) || pathname.match(/\.(svg|jpg|png|gif|ico|css|js)$/);
}

export function isPublicPath(pathname: string): boolean {
    return publicPaths.some(path => pathname.includes(path));
} 