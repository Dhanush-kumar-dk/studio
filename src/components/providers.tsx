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
    // If the browser arrives on any page with ?code=, exchange it as a client-side fallback
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      const code = url.searchParams.get('code');
      if (code && !url.pathname.startsWith('/auth/callback')) {
        supabase.auth.exchangeCodeForSession(code).then(({ data, error }) => {
          if (!error && data?.session) {
            setUser(data.session.user);
            setLoading(false);
            // Clean up the ?code= query param from the address bar cleanly without page reload
            url.searchParams.delete('code');
            const cleanUrl = url.pathname + (url.search ? url.search : '') + url.hash;
            window.history.replaceState({}, '', cleanUrl);
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
