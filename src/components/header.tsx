"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Search, PlusCircle, Menu, ChevronDown, Coffee, GraduationCap } from 'lucide-react';
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
      {/* WPTuts Exact Top Bar */}
      <div className="hidden sm:block w-full bg-[#111c29] text-white border-b border-white/10 text-xs">
        <div className="container mx-auto flex h-9 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <span className="text-slate-400 font-medium">Follow WPTuts:</span>
            <div className="flex items-center gap-2">
              <a
                href="https://www.youtube.com/c/wptuts"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-6 w-6 items-center justify-center rounded-full bg-white/5 hover:bg-[#df5c0c] transition-colors"
                aria-label="YouTube"
              >
                <YouTubeFavicon className="h-3.5 w-3.5" />
              </a>
              <a
                href="https://twitter.com/WPTutz"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-6 w-6 items-center justify-center rounded-full bg-white/5 hover:bg-[#df5c0c] transition-colors"
                aria-label="Twitter / X"
              >
                <XFavicon className="h-3.5 w-3.5" />
              </a>
              <a
                href="https://www.facebook.com/groups/wpcrue"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-6 w-6 items-center justify-center rounded-full bg-white/5 hover:bg-[#df5c0c] transition-colors"
                aria-label="Facebook Group"
              >
                <LinkedInFavicon className="h-3.5 w-3.5" />
              </a>
              <a
                href="https://www.instagram.com/wptuts/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-6 w-6 items-center justify-center rounded-full bg-white/5 hover:bg-[#df5c0c] transition-colors"
                aria-label="Instagram"
              >
                <TikTokFavicon className="h-3.5 w-3.5" />
              </a>
              <a
                href="mailto:contact@wptuts.co.uk"
                className="flex h-6 w-6 items-center justify-center rounded-full bg-white/5 hover:bg-[#df5c0c] transition-colors"
                aria-label="Email"
              >
                <GmailFavicon className="h-3 w-3" />
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-slate-400 hidden md:inline">
              Over 700 Free WordPress Tutorials
            </span>
            <Link
              href={user ? "/dashboard" : "/login"}
              className="inline-flex items-center gap-1.5 rounded bg-[#df5c0c] px-3 py-1 font-button text-[11px] font-bold uppercase tracking-wider text-white hover:bg-[#ad3b1e] transition-colors"
            >
              <GraduationCap className="h-3 w-3" />
              <span>{user ? "Dashboard" : "Student Login"}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur-md transition-colors duration-200 shadow-sm">
        <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="group flex items-center gap-2.5 transition-opacity hover:opacity-90">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#df5c0c] text-white font-headline text-lg font-black shadow-md">
              W
            </span>
            <div className="flex items-center gap-1">
              <span className="font-headline text-2xl font-black tracking-tight text-foreground transition-colors group-hover:text-[#df5c0c]">
                WPTuts
              </span>
              <span className="h-2 w-2 rounded-full bg-[#df5c0c]" />
            </div>
          </Link>

          {/* Desktop Navigation Links with Exact WPTuts Menus */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-foreground/85">
            <Link href="/" className="transition-colors hover:text-[#df5c0c]">
              Home
            </Link>

            {/* Tutorials Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 transition-colors hover:text-[#df5c0c] outline-none">
                <span>Tutorials</span>
                <ChevronDown className="h-3.5 w-3.5 opacity-70" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56 p-2 border-border/80 shadow-xl bg-card">
                <DropdownMenuItem asChild>
                  <Link href="/#tutorials" className="cursor-pointer font-medium">
                    All Tutorials
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/#tutorials" className="cursor-pointer">
                    Beginners
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/#tutorials" className="cursor-pointer">
                    Intermediate
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/#tutorials" className="cursor-pointer">
                    Advanced
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* WordPress Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 transition-colors hover:text-[#df5c0c] outline-none">
                <span>WordPress</span>
                <ChevronDown className="h-3.5 w-3.5 opacity-70" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-60 p-2 border-border/80 shadow-xl bg-card">
                <DropdownMenuItem asChild>
                  <Link href="/#tutorials" className="cursor-pointer">
                    WordPress Tutorials
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/#tutorials" className="cursor-pointer">
                    Backup &amp; Maintenance
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/#tutorials" className="cursor-pointer">
                    Design Tips
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/#tutorials" className="cursor-pointer">
                    Gutenberg
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Dynamic Design Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 transition-colors hover:text-[#df5c0c] outline-none">
                <span>Dynamic Design</span>
                <ChevronDown className="h-3.5 w-3.5 opacity-70" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64 p-2 border-border/80 shadow-xl bg-card">
                <DropdownMenuItem asChild>
                  <Link href="/#tutorials" className="cursor-pointer">
                    Advanced Custom Fields
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/#tutorials" className="cursor-pointer">
                    JetEngine
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/#tutorials" className="cursor-pointer">
                    PODS
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/#tutorials" className="cursor-pointer">
                    Toolset
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Page Builders Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 transition-colors hover:text-[#df5c0c] outline-none">
                <span>Page Builders</span>
                <ChevronDown className="h-3.5 w-3.5 opacity-70" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56 p-2 border-border/80 shadow-xl bg-card">
                <DropdownMenuItem asChild>
                  <Link href="/#tutorials" className="cursor-pointer">
                    Bricks Builder
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/#tutorials" className="cursor-pointer">
                    Brizy Page Builder
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/#tutorials" className="cursor-pointer">
                    Divi Page Builder
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/#tutorials" className="cursor-pointer">
                    Elementor
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/#tutorials" className="cursor-pointer">
                    Oxygen Builder
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="#documents" className="transition-colors hover:text-[#df5c0c]">
              Documents
            </Link>

            <a
              href="https://www.buymeacoffee.com/wptuts"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#df5c0c] hover:underline"
            >
              <Coffee className="h-3.5 w-3.5" />
              <span>Buy me a coffee</span>
            </a>
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
                      placeholder="Search 700+ tutorials..."
                      className="pl-9 text-sm focus-visible:ring-[#df5c0c]"
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
              <Button asChild size="sm" className="bg-[#df5c0c] font-button text-xs font-bold uppercase tracking-wider text-white hover:bg-[#ad3b1e]">
                <Link href="/create-post" className="flex items-center gap-1.5">
                  <PlusCircle className="h-4 w-4" />
                  <span className="hidden sm:inline">Add Tutorial</span>
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
                    <SheetTitle className="flex items-center gap-2 font-headline text-xl font-black">
                      <span className="flex h-7 w-7 items-center justify-center rounded bg-[#df5c0c] text-white text-sm font-black">
                        W
                      </span>
                      <span>WPTuts</span>
                    </SheetTitle>
                  </SheetHeader>
                  <nav className="flex flex-col gap-3 text-sm font-semibold">
                    <Link
                      href="/"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="transition-colors hover:text-[#df5c0c]"
                    >
                      Home
                    </Link>
                    <div className="h-px bg-border/60 my-1" />
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Tutorials</span>
                    <Link
                      href="/#tutorials"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="pl-2 text-muted-foreground hover:text-foreground"
                    >
                      All Tutorials (700+)
                    </Link>
                    <Link
                      href="/#tutorials"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="pl-2 text-muted-foreground hover:text-foreground"
                    >
                      Bricks Builder
                    </Link>
                    <Link
                      href="/#tutorials"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="pl-2 text-muted-foreground hover:text-foreground"
                    >
                      Elementor Tutorials
                    </Link>
                    <Link
                      href="/#tutorials"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="pl-2 text-muted-foreground hover:text-foreground"
                    >
                      WordPress Plugins &amp; Tools
                    </Link>
                    <Link
                      href="/#tutorials"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="pl-2 text-muted-foreground hover:text-foreground"
                    >
                      WooCommerce Tutorials
                    </Link>
                    <div className="h-px bg-border/60 my-1" />
                    <Link
                      href="#documents"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="transition-colors hover:text-[#df5c0c]"
                    >
                      Essential Documents
                    </Link>
                    <Link
                      href="#newsletter"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="transition-colors hover:text-[#df5c0c]"
                    >
                      Subscribe
                    </Link>
                  </nav>
                </div>

                <div className="pt-6 border-t border-border/60">
                  <Link
                    href={user ? "/dashboard" : "/login"}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex w-full items-center justify-center rounded bg-[#df5c0c] py-2 text-center font-button text-xs font-bold uppercase text-white hover:bg-[#ad3b1e]"
                  >
                    {user ? "Student Dashboard" : "Student Login"}
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
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#df5c0c] text-white font-headline text-lg font-black">
              W
            </span>
            <span className="font-headline text-xl font-black tracking-tight text-foreground">WPTuts</span>
          </Link>
        </div>
      </header>
    }>
      <HeaderContent />
    </Suspense>
  );
}
