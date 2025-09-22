"use client";

import Link from 'next/link';
import { Flame, Loader2, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useAuth } from '@/hooks/use-auth';
import GoogleSignInButton from './google-signin-button';
import UserNav from './user-nav';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FormEvent } from 'react';

export default function Header() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const defaultSearch = searchParams.get('search') ?? '';

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchQuery = formData.get('search') as string;

    const params = new URLSearchParams(searchParams);
    params.set('search', searchQuery);
    
    // If we are not on the homepage, navigate to it for search
    if (pathname !== '/') {
      router.push(`/?${params.toString()}`);
    } else {
      router.replace(`?${params.toString()}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Flame className="h-7 w-7 text-primary" />
          <span className="text-xl font-bold tracking-tight">NewsFlash</span>
        </Link>

        <div className="flex flex-1 items-center justify-end gap-4">
          {pathname === '/' && (
             <form onSubmit={handleSearch} className="hidden w-full max-w-sm md:flex">
              <div className="relative w-full">
                <Input
                  type="search"
                  name="search"
                  placeholder="Search articles..."
                  className="pl-10"
                  defaultValue={defaultSearch}
                />
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              </div>
            </form>
          )}

          <div className="flex items-center">
            {loading ? (
              <Loader2 className="h-6 w-6 animate-spin" />
            ) : user ? (
              <UserNav />
            ) : (
              <GoogleSignInButton />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
