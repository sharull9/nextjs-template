import { verifySession } from '@/lib/session';
import { createRouteMatcher } from '@/lib/utils';
import { NextRequest, NextResponse } from 'next/server';

const privateRoutes = createRouteMatcher(['/dashboard', '/dashboard/(.*)']);
const authRoutes = createRouteMatcher(['/auth/signin', '/auth/signup', '/']);

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const isPrivateRoute = privateRoutes(pathname);
    const isAuthRoute = authRoutes(pathname);
    const isAuth = await verifySession();
    if (!isAuth && isPrivateRoute) return NextResponse.redirect(new URL('/auth/signin', request.nextUrl));
    if (isAuthRoute && isAuth) return NextResponse.redirect(new URL('/dashboard', request.nextUrl));
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        '/(api|trpc)(.*)',
    ],
};
