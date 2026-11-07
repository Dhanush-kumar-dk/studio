"use client";

import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';
import type { ReactNode } from 'react';
import { createContext, useEffect, useState } from 'react';

type AuthContextType = {
  user: User | null;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function Providers({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    // If the browser arrives on any page with ?code=, clean up or exchange as a fallback
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      const code = url.searchParams.get('code');
      if (code && !url.pathname.startsWith('/auth/callback')) {
        // Strip stranded ?code= immediately from the address bar
        const cleanParams = new URLSearchParams(url.search);
        cleanParams.delete('code');
        const cleanQuery = cleanParams.toString() ? `?${cleanParams.toString()}` : '';
        const cleanUrl = `${url.pathname}${cleanQuery}${url.hash}`;
        window.history.replaceState({}, '', cleanUrl);

        // Fallback exchange if server-side middleware didn't intercept
        supabase.auth.exchangeCodeForSession(code).then(({ data, error }) => {
          if (!error && data?.session) {
            setUser(data.session.user);
            setLoading(false);
          }
        }).catch((err) => {
          console.warn('Client OAuth exchange fallback skipped:', err);
        });
      }
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
