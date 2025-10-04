"use client";

import Link from 'next/link';
import { Search, PlusCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import UserNav from './user-nav';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, useState } from 'react';
import Logo from './logo';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { useAuth } from '@/hooks/use-auth';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const defaultSearch = searchParams.get('search') ?? '';
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { user } = useAuth();

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
    
    // If we are not on the homepage, navigate to it for search
    if (pathname !== '/') {
      router.push(`/?${params.toString()}`);
    } else {
      router.replace(`?${params.toString()}`);
    }
    setIsSearchOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 text-foreground hover:text-foreground">
          <Logo />
          <span className="hidden sm:inline-block text-xl font-bold tracking-tight">Debt & Dominion</span>
        </Link>

        <div className="flex items-center justify-end gap-2">
          <Popover open={isSearchOpen} onOpenChange={setIsSearchOpen}>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Search className="h-5 w-5" />
                  <span className="sr-only">Search</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <form onSubmit={handleSearch}>
                  <div className="relative">
                    <Input
                      type="search"
                      name="search"
                      placeholder="Search articles..."
                      className="pl-10"
                      defaultValue={defaultSearch}
                      autoFocus
                    />
                    <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  </div>
                  <Button type="submit" className="hidden">Search</Button>
                </form>
            </PopoverContent>
          </Popover>
          
          {user && (
            <Button asChild variant="ghost" size="sm">
              <Link href="/create-post">
                <PlusCircle className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline-block">Create Post</span>
              </Link>
            </Button>
          )}
          <UserNav />
        </div>
      </div>
    </header>
  );
}
