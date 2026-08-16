"use client";

import Link from 'next/link';
import { Search, PlusCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import UserNav from './user-nav';
import { ThemeToggle } from './theme-toggle';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, useState, useEffect, Suspense } from 'react';
import Logo from '../Assest/signal-2025-09-01-172433.jpeg';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { useAuth } from '@/hooks/use-auth';
import type { User } from '@/lib/types';
import { createClient } from '@/lib/supabase/client';

function HeaderContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const defaultSearch = searchParams.get('search') ?? '';
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { user } = useAuth();
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const supabase = createClient();

  useEffect(() => {
    async function fetchUserRole() {
      if (user) {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', user.id)
          .single();
          
        if (data) {
          setCurrentUser(data);
        }
      } else {
        setCurrentUser(null);
      }
    }
    fetchUserRole();
  }, [user]);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchQuery = formData.get('search') as string;

    const params = new URLSearchParams(searchParams);
    if (searchQuery) {
      params.set('search', searchQuery);
    } else {
      params.delete('search');
    }

    if (pathname !== '/') {
      router.push(`/?${params.toString()}`);
    } else {
      router.replace(`?${params.toString()}`);
    }
    setIsSearchOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md transition-colors duration-200">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3 transition-opacity hover:opacity-90">
          <img src={Logo.src} alt="Debt & Dominion" className="h-8 w-auto rounded-md object-contain" />
          <div className="flex items-center gap-1.5">
            <span className="font-headline text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
              Debt & Dominion
            </span>
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
          </div>
        </Link>

        <div className="flex items-center gap-2">
          {/* Search Popover */}
          <Popover open={isSearchOpen} onOpenChange={setIsSearchOpen}>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground">
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-80 border border-border/80 p-2 shadow-lg">
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <Input
                    type="search"
                    name="search"
                    placeholder="Search articles & topics..."
                    className="pl-9 text-sm focus-visible:ring-emerald-500"
                    defaultValue={defaultSearch}
                    autoFocus
                  />
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                </div>
                <Button type="submit" className="hidden">Search</Button>
              </form>
            </PopoverContent>
          </Popover>

          {/* Light / Dark Mode Toggle */}
          <ThemeToggle />

          {/* Create Post Action for Admin, Editor, Author */}
          {(currentUser?.role === 'Admin' || currentUser?.role === 'Editor' || currentUser?.role === 'Author') && (
            <Button asChild size="sm" className="bg-emerald-600 font-medium text-white hover:bg-emerald-700 dark:bg-emerald-500 dark:text-slate-950 dark:hover:bg-emerald-400">
              <Link href="/create-post" className="flex items-center gap-1.5">
                <PlusCircle className="h-4 w-4" />
                <span className="hidden sm:inline">Create Post</span>
              </Link>
            </Button>
          )}

          {/* User Nav */}
          <UserNav />
        </div>
      </div>
    </header>
  );
}

export default function Header() {
  return (
    <Suspense fallback={
      <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <img src={Logo.src} alt="Debt & Dominion" className="h-8 w-auto rounded-md" />
            <span className="font-headline text-xl font-bold tracking-tight text-foreground">Debt & Dominion</span>
          </Link>
        </div>
      </header>
    }>
      <HeaderContent />
    </Suspense>
  );
}
