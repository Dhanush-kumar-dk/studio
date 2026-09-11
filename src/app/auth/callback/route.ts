import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { createAdminClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');
  const error_description = searchParams.get('error_description');
  const next = searchParams.get('next') ?? '/';

  // Determine the correct public base URL (handling Vercel / reverse proxies)
  const forwardedHost = request.headers.get('x-forwarded-host');
  const host = request.headers.get('host');
  const proto = request.headers.get('x-forwarded-proto') || 'https';
  const isLocalEnv = process.env.NODE_ENV === 'development';

  const baseUrl = isLocalEnv
    ? origin
    : forwardedHost
      ? `${proto}://${forwardedHost}`
      : host
        ? `${proto}://${host}`
        : origin;

  if (error) {
    console.error('OAuth error from provider:', error, error_description);
    const errorMsg = error_description || error;
    return NextResponse.redirect(`${baseUrl}/login?error=${encodeURIComponent(errorMsg)}`);
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase credentials in auth callback');
    return NextResponse.redirect(`${baseUrl}/login?error=${encodeURIComponent('Supabase credentials not configured')}`);
  }

  if (code) {
    // Create the redirect response using baseUrl so the user returns to the actual domain
    const response = NextResponse.redirect(`${baseUrl}${next}`);

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
              response.cookies.set(name, value, options);
            });
          },
        },
      }
    );

    const { data: sessionData, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

    if (!exchangeError) {
      // Sync user profile into public.users if not already created
      if (sessionData?.user) {
        try {
          const adminClient = createAdminClient();
          const { data: existingUser } = await adminClient
            .from('users')
            .select('id')
            .eq('id', sessionData.user.id)
            .maybeSingle();

          if (!existingUser) {
            const u = sessionData.user;
            const name = u.user_metadata?.full_name || u.user_metadata?.name || u.email?.split('@')[0] || 'User';
            const avatarUrl = u.user_metadata?.avatar_url || u.user_metadata?.picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`;

            await adminClient.from('users').insert({
              id: u.id,
              email: u.email,
              name: name,
              avatar_url: avatarUrl,
              role: 'User',
            });
          }
        } catch (syncError) {
          console.error('Error syncing user profile in callback:', syncError);
        }
      }

      console.log('Successfully exchanged code for session. Redirecting to:', `${baseUrl}${next}`);
      return response;
    } else {
      console.error('Error exchanging code for session:', exchangeError);
      return NextResponse.redirect(
        `${baseUrl}/login?error=${encodeURIComponent(exchangeError.message)}`
      );
    }
  }

  return NextResponse.redirect(`${baseUrl}/login?error=auth_callback_failed`);
}
