"use client";

import Link from 'next/link';
import { Search, PlusCircle, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import UserNav from './user-nav';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, useState } from 'react';
import Logo from './logo';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const defaultSearch = searchParams.get('search') ?? '';
  const isMobile = useIsMobile();
  const [showMobileSearch, setShowMobileSearch] = useState(false);

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
    if (isMobile) {
      setShowMobileSearch(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between gap-4">
        <div className={cn("flex items-center gap-2", showMobileSearch && 'hidden')}>
          <Logo />
          <span className="hidden sm:inline-block text-xl font-bold tracking-tight">Debt & Dominion</span>
        </div>

        <div className="flex flex-1 items-center justify-end gap-2">
           <form onSubmit={handleSearch} className={cn("w-full max-w-sm", isMobile ? (showMobileSearch ? 'flex' : 'hidden') : 'hidden md:flex')}>
            <div className="relative w-full">
              <Input
                type="search"
                name="search"
                placeholder="Search articles..."
                className="pl-10"
                defaultValue={defaultSearch}
                autoFocus={showMobileSearch}
              />
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            </div>
          </form>

          <div className={cn("flex items-center gap-2", showMobileSearch && 'hidden')}>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setShowMobileSearch(true)}>
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
            </Button>
            <Button asChild variant="ghost" size="sm">
                <Link href="/create-post">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    <span className="hidden sm:inline-block">Create Post</span>
                </Link>
            </Button>
            <UserNav />
          </div>

          {showMobileSearch && isMobile && (
            <Button variant="ghost" size="icon" onClick={() => setShowMobileSearch(false)}>
              <X className="h-5 w-5" />
              <span className="sr-only">Close search</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
