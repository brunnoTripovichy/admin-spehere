import { NextResponse } from 'next/server';
import acceptLanguage from 'accept-language';
import { cookieName, fallbackLng, languages } from './app/i18n/settings';
acceptLanguage.languages(languages);
// Define public paths that don't require authentication
const PUBLIC_PATHS = [
    '/login',
    '/forgot-password',
    '/register',
    '/_next',
    '/api/auth',
    '/favicon.ico',
    '/images',
    '/fonts',
];
export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|site.webmanifest).*)',
    ],
};
export function middleware(req) {
    var _a, _b;
    // Language handling
    let lng;
    if (req.cookies.has(cookieName)) {
        const cookieValue = (_a = req.cookies.get(cookieName)) === null || _a === void 0 ? void 0 : _a.value;
        if (cookieValue) {
            lng = acceptLanguage.get(cookieValue);
        }
    }
    if (!lng)
        lng = acceptLanguage.get(req.headers.get('Accept-Language') || '');
    if (!lng)
        lng = fallbackLng;
    // Redirect if lng in path is not supported
    if (!languages.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
        !req.nextUrl.pathname.startsWith('/_next')) {
        return NextResponse.redirect(new URL(`/${lng}${req.nextUrl.pathname}`, req.url));
    }
    // Authentication check
    const { pathname } = req.nextUrl;
    const pathWithoutLng = pathname.replace(/^\/[a-z]{2}/, '');
    // Check if the path is public
    const isPublicPath = PUBLIC_PATHS.some((path) => pathWithoutLng.startsWith(path) || pathWithoutLng === '/');
    // Get auth token from cookies
    const authToken = (_b = req.cookies.get('auth_token')) === null || _b === void 0 ? void 0 : _b.value;
    // If the path requires authentication and user is not authenticated, redirect to login
    if (!isPublicPath && !authToken) {
        const loginUrl = new URL(`/${lng}/login`, req.url);
        // Add the original URL as a query parameter to redirect after login
        loginUrl.searchParams.set('callbackUrl', pathname);
        return NextResponse.redirect(loginUrl);
    }
    // If user is authenticated and trying to access login page, redirect to dashboard
    if (authToken && pathWithoutLng.startsWith('/login')) {
        return NextResponse.redirect(new URL(`/${lng}/dashboard`, req.url));
    }
    // Language cookie handling
    if (req.headers.has('referer')) {
        const refererUrl = new URL(req.headers.get('referer') || '');
        const lngInReferer = languages.find((l) => refererUrl.pathname.startsWith(`/${l}`));
        const response = NextResponse.next();
        if (lngInReferer)
            response.cookies.set(cookieName, lngInReferer);
        return response;
    }
    return NextResponse.next();
}
