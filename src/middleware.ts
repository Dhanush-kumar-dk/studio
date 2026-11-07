import { NextResponse, type NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

export async function middleware(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code');

  // If an OAuth authorization code lands anywhere other than /auth/callback (e.g. /?code=...),
  // forward it directly to /auth/callback so the server can exchange the code for session cookies
  if (code && !request.nextUrl.pathname.startsWith('/auth/callback')) {
    const forwardedHost = request.headers.get('x-forwarded-host');
    const host = request.headers.get('host');
    const proto = request.headers.get('x-forwarded-proto') || (request.url.startsWith('https:') ? 'https' : 'http');

    const rawHost = forwardedHost || host || request.nextUrl.host || 'localhost:9002';
    const cleanHost = rawHost.replace(/^0\.0\.0\.0/, 'localhost');
    const callbackUrl = new URL(`/auth/callback${request.nextUrl.search}`, `${proto}://${cleanHost}`);
    return NextResponse.redirect(callbackUrl);
  }

  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - static images / assets
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
