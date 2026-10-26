"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Search, PlusCircle, Menu, ChevronDown, BookOpen, Layers, Newspaper, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import UserNav from './user-nav';
import { ThemeToggle } from './theme-toggle';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, useState, useEffect, Suspense } from 'react';
import Logo from '../Assest/signal-2025-09-01-172433.jpeg';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/use-auth';
import type { User } from '@/lib/types';
import { createClient } from '@/lib/supabase/client';
import { GmailFavicon, LinkedInFavicon, TikTokFavicon, YouTubeFavicon, XFavicon } from './icons/favicons';

function HeaderContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const defaultSearch = searchParams.get('search') ?? '';
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
    <div className="w-full">
      {/* WPTuts Style Top Bar */}
      <div className="hidden sm:block w-full bg-[#111c29] text-white border-b border-white/10 text-xs">
        <div className="container mx-auto flex h-9 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <span className="text-slate-400 font-medium">Follow Our Desks:</span>
            <div className="flex items-center gap-2">
              <a
                href="https://www.youtube.com/@debtanddominion"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-6 w-6 items-center justify-center rounded-full bg-white/5 hover:bg-[#e95f3c] transition-colors"
                aria-label="YouTube"
              >
                <YouTubeFavicon className="h-3.5 w-3.5" />
              </a>
              <a
                href="https://x.com/debtanddominion"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-6 w-6 items-center justify-center rounded-full bg-white/5 hover:bg-[#e95f3c] transition-colors"
                aria-label="X Twitter"
              >
                <XFavicon className="h-3.5 w-3.5" />
              </a>
              <a
                href="https://www.linkedin.com/company/debt-dominion/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-6 w-6 items-center justify-center rounded-full bg-white/5 hover:bg-[#e95f3c] transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedInFavicon className="h-3.5 w-3.5" />
              </a>
              <a
                href="https://www.tiktok.com/@debtanddominion"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-6 w-6 items-center justify-center rounded-full bg-white/5 hover:bg-[#e95f3c] transition-colors"
                aria-label="TikTok"
              >
                <TikTokFavicon className="h-3.5 w-3.5" />
              </a>
              <a
                href="mailto:debtdominionofficial@gmail.com"
                className="flex h-6 w-6 items-center justify-center rounded-full bg-white/5 hover:bg-[#e95f3c] transition-colors"
                aria-label="Email"
              >
                <GmailFavicon className="h-3 w-3" />
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-slate-400 hidden md:inline">
              Over 700+ Global Dispatches &amp; Intelligence Briefings
            </span>
            <Link
              href={user ? "/dashboard" : "/login"}
              className="inline-flex items-center gap-1.5 rounded bg-[#e95f3c] px-3 py-1 font-semibold text-white text-[11px] uppercase tracking-wider hover:bg-[#ad3b1e] transition-colors"
            >
              {user ? "Member Dashboard" : "Student / Member Login"}
            </Link>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur-md transition-colors duration-200 shadow-sm">
        <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="group flex items-center gap-3 transition-opacity hover:opacity-90">
            <Image src={Logo} alt="Debt & Dominion" width={32} height={32} priority className="h-8 w-8 rounded-md object-contain shadow-sm shrink-0" />
            <div className="flex items-center gap-1.5">
              <span className="font-headline text-xl font-extrabold tracking-tight text-foreground transition-colors group-hover:text-[#e95f3c]">
                Debt &amp; Dominion
              </span>
              <span className="h-2 w-2 rounded-full bg-[#e95f3c]" />
            </div>
          </Link>

          {/* Desktop Navigation Links with WPTuts-Style Dropdowns */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-foreground/80">
            <Link href="/" className="transition-colors hover:text-[#e95f3c]">
              Home
            </Link>

            {/* Dispatches Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 transition-colors hover:text-[#e95f3c] outline-none">
                <span>Dispatches</span>
                <ChevronDown className="h-3.5 w-3.5 opacity-70" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56 p-2 border-border/80 shadow-xl bg-card">
                <DropdownMenuItem asChild>
                  <Link href="/#dispatches" className="cursor-pointer font-medium">
                    All Dispatches
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/?category=Technology" className="cursor-pointer">
                    Technology &amp; AI
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/?category=Politics" className="cursor-pointer">
                    Politics &amp; Policy
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/?category=World" className="cursor-pointer">
                    World Affairs
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/?category=Sports" className="cursor-pointer">
                    Sports &amp; Analytics
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Intelligence Dossiers Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 transition-colors hover:text-[#e95f3c] outline-none">
                <span>Dossiers</span>
                <ChevronDown className="h-3.5 w-3.5 opacity-70" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64 p-2 border-border/80 shadow-xl bg-card">
                <DropdownMenuItem asChild>
                  <Link href="/#dossier" className="cursor-pointer font-medium flex items-center justify-between">
                    <span>Sovereign Analyst Pack</span>
                    <span className="text-[10px] font-bold uppercase bg-[#e95f3c]/15 text-[#e95f3c] px-1.5 py-0.5 rounded">Free</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/#featured" className="cursor-pointer font-medium">
                    Featured Deep Dives
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/newsletter" className="cursor-pointer">
                    Weekly Intelligence Briefing
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/about" className="transition-colors hover:text-[#e95f3c]">
              About
            </Link>
            <Link href="/newsletter" className="transition-colors hover:text-[#e95f3c]">
              Newsletter
            </Link>
          </nav>

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
                      className="pl-9 text-sm focus-visible:ring-[#e95f3c]"
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
              <Button asChild size="sm" className="bg-[#e95f3c] font-medium text-white hover:bg-[#ad3b1e]">
                <Link href="/create-post" className="flex items-center gap-1.5">
                  <PlusCircle className="h-4 w-4" />
                  <span className="hidden sm:inline">Create Post</span>
                </Link>
              </Button>
            )}

            {/* User Nav */}
            <UserNav />

            {/* Mobile Navigation Drawer */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 text-muted-foreground hover:text-foreground lg:hidden"
                  aria-label="Open navigation menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 p-6 flex flex-col justify-between">
                <div>
                  <SheetHeader className="text-left mb-6">
                    <SheetTitle className="flex items-center gap-2 font-headline text-lg font-bold">
                      <Image src={Logo} alt="Debt & Dominion" width={28} height={28} className="h-7 w-7 rounded object-contain shrink-0" />
                      <span>Debt &amp; Dominion</span>
                    </SheetTitle>
                  </SheetHeader>
                  <nav className="flex flex-col gap-3 text-base font-medium">
                    <Link
                      href="/"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="transition-colors hover:text-[#e95f3c]"
                    >
                      Home
                    </Link>
                    <div className="h-px bg-border/60 my-1" />
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Dispatches</span>
                    <Link
                      href="/#dispatches"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="pl-2 text-sm text-muted-foreground hover:text-foreground"
                    >
                      All Stories
                    </Link>
                    <Link
                      href="/?category=Technology"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="pl-2 text-sm text-muted-foreground hover:text-foreground"
                    >
                      Technology &amp; AI
                    </Link>
                    <Link
                      href="/?category=Politics"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="pl-2 text-sm text-muted-foreground hover:text-foreground"
                    >
                      Politics &amp; Policy
                    </Link>
                    <Link
                      href="/?category=World"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="pl-2 text-sm text-muted-foreground hover:text-foreground"
                    >
                      World Affairs
                    </Link>
                    <Link
                      href="/?category=Sports"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="pl-2 text-sm text-muted-foreground hover:text-foreground"
                    >
                      Sports &amp; Analytics
                    </Link>
                    <div className="h-px bg-border/60 my-1" />
                    <Link
                      href="/about"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="transition-colors hover:text-[#e95f3c]"
                    >
                      About Publication
                    </Link>
                    <Link
                      href="/newsletter"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="transition-colors hover:text-[#e95f3c]"
                    >
                      Weekly Newsletter
                    </Link>
                  </nav>
                </div>

                <div className="pt-6 border-t border-border/60">
                  <Link
                    href={user ? "/dashboard" : "/login"}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex w-full items-center justify-center rounded bg-[#e95f3c] py-2 text-center text-xs font-bold uppercase text-white hover:bg-[#ad3b1e]"
                  >
                    {user ? "Member Dashboard" : "Member Login"}
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </div>
  );
}

export default function Header() {
  return (
    <Suspense fallback={
      <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <Image src={Logo} alt="Debt & Dominion" width={32} height={32} priority className="h-8 w-8 rounded-md object-contain shrink-0" />
            <span className="font-headline text-xl font-bold tracking-tight text-foreground">Debt &amp; Dominion</span>
          </Link>
        </div>
      </header>
    }>
      <HeaderContent />
    </Suspense>
  );
}
