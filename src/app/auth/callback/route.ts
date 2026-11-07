import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { checkAndCreateUser } from '@/app/actions';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const error = searchParams.get('error');
  const error_description = searchParams.get('error_description');
  const next = searchParams.get('next') ?? '/';

  // Determine the correct public base URL (handling Vercel / reverse proxies / local dev)
  const forwardedHost = request.headers.get('x-forwarded-host');
  const host = request.headers.get('host');
  const proto = request.headers.get('x-forwarded-proto') || (request.url.startsWith('https:') ? 'https' : 'http');

  const rawHost = forwardedHost || host || request.nextUrl.host || 'localhost:9002';
  const cleanHost = rawHost.replace(/^0\.0\.0\.0/, 'localhost');
  const baseUrl = `${proto}://${cleanHost}`;

  const cleanNext = next.startsWith('/') ? next : `/${next}`;
  const targetUrl = new URL(cleanNext, baseUrl).toString();

  if (error) {
    console.error('OAuth error from provider:', error, error_description);
    const errorMsg = error_description || error;
    return NextResponse.redirect(new URL(`/login?error=${encodeURIComponent(errorMsg)}`, baseUrl));
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase credentials in auth callback');
    return NextResponse.redirect(
      new URL(`/login?error=${encodeURIComponent('Supabase credentials not configured')}`, baseUrl)
    );
  }

  if (code) {
    const response = NextResponse.redirect(targetUrl);

    const supabase = createServerClient(
      supabaseUrl,
      supabaseAnonKey,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              const cookieOptions = { ...options };
              // Ensure plain HTTP (localhost or local network IP) accepts cookies
              if (!baseUrl.startsWith('https://')) {
                cookieOptions.secure = false;
              }
              response.cookies.set(name, value, cookieOptions);
            });
          },
        },
      }
    );

    const { data: sessionData, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

    if (!exchangeError && sessionData?.session) {
      if (sessionData.user) {
        try {
          await checkAndCreateUser(sessionData.user);
        } catch (syncError) {
          console.error('Error syncing user profile in callback:', syncError);
        }
      }

      console.log('Successfully exchanged code for session. Redirecting to:', targetUrl);
      return response;
    } else {
      console.warn('exchangeCodeForSession notice:', exchangeError?.message);

      // Check if session is already active (e.g. repeated navigation or code already consumed)
      try {
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        if (currentSession?.user) {
          return NextResponse.redirect(targetUrl);
        }
      } catch (sessErr) {
        // Fall through to redirect
      }

      const errMsg = exchangeError?.message || 'Failed to exchange authorization code';
      return NextResponse.redirect(
        new URL(`/login?error=${encodeURIComponent(errMsg)}`, baseUrl)
      );
    }
  }

  return NextResponse.redirect(new URL('/login?error=auth_callback_failed', baseUrl));
}
