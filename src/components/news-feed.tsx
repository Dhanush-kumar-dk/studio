"use client";

import type { Article } from '@/lib/types';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useMemo, useState, useTransition, Suspense } from 'react';
import ArticleCard from './article-card';
import { Skeleton } from './ui/skeleton';
import { ChevronRight, Filter } from 'lucide-react';

const categories = ['All', 'Bricks Builder', 'Elementor', 'WordPress Plugins & Tools', 'WooCommerce', 'Dynamic Design'];
const ARTICLES_PER_PAGE = 6;

// Authentic WPTuts fallback videos if articles are empty or filtered
const WPTUTS_VIDEOS = [
  {
    id: 'wptuts-1',
    _id: 'wptuts-1',
    slug: 'atlant-security-free-wordpress-plugin',
    title: 'Atlant Security: The FREE WordPress Security Plugin You Should Try (No Pro Version!)',
    excerpt: 'In this episode of Friday Freebies, I take a look at Atlant Security — a completely free WordPress security plugin with no Pro or premium version.',
    category: 'WordPress Plugins & Tools' as const,
    imageUrl: 'https://wptuts.co.uk/wp-content/uploads/x-r4LPthS4Y-768x432.jpg',
    imageHint: 'WordPress security plugin review',
    publishedAt: '2026-09-25T12:00:00Z',
    author: 'Paul Charlton',
    authorSlug: 'paul-charlton',
    authorImageUrl: '/paul-c.png',
    content: 'Full video walkthrough and setup guide for Atlant Security on WordPress.',
    focusKeywords: ['WordPress', 'Security', 'Atlant Security'],
    metaDescription: 'Atlant Security free WordPress plugin tutorial by WPTuts.',
  },
  {
    id: 'wptuts-2',
    _id: 'wptuts-2',
    slug: 'free-wordpress-2fa-passkeys-magic-login',
    title: '100% FREE WordPress 2FA, Passkeys, Magic Login & More Plugin',
    excerpt: 'WordPress security, two-factor authentication, login protection, passkeys, magic login links and activity logs are all things FluentAuth brings together in one free plugin.',
    category: 'WordPress Plugins & Tools' as const,
    imageUrl: 'https://wptuts.co.uk/wp-content/uploads/Tt9LHwHySmA-768x432.jpg',
    imageHint: 'WordPress 2FA Passkeys FluentAuth',
    publishedAt: '2026-09-18T12:00:00Z',
    author: 'Paul Charlton',
    authorSlug: 'paul-charlton',
    authorImageUrl: '/paul-c.png',
    content: 'Step-by-step tutorial on securing WordPress with FluentAuth.',
    focusKeywords: ['WordPress', '2FA', 'Passkeys'],
    metaDescription: '100% Free WordPress 2FA & Magic Login tutorial by WPTuts.',
  },
  {
    id: 'wptuts-3',
    _id: 'wptuts-3',
    slug: 'stop-wordpress-plugin-headaches-simply-static',
    title: 'Stop WordPress Plugin Headaches: Go Static with Simply Static Studio',
    excerpt: 'With more people wanting the speed and security of static websites, I’m taking a look at Simply Static Studio — a hybrid approach that lets you generate lightning-fast static WordPress sites.',
    category: 'WordPress Plugins & Tools' as const,
    imageUrl: 'https://wptuts.co.uk/wp-content/uploads/hItYH6hDU7Y-768x432.jpg',
    imageHint: 'Static WordPress with Simply Static',
    publishedAt: '2026-09-15T12:00:00Z',
    author: 'Paul Charlton',
    authorSlug: 'paul-charlton',
    authorImageUrl: '/paul-c.png',
    content: 'How to convert WordPress to high-speed static HTML with Simply Static Studio.',
    focusKeywords: ['WordPress', 'Static WordPress', 'Simply Static'],
    metaDescription: 'Go Static with Simply Static Studio tutorial by WPTuts.',
  },
  {
    id: 'wptuts-4',
    _id: 'wptuts-4',
    slug: 'fastest-way-to-migrate-bricks-sites',
    title: 'The Fastest Way to Migrate Bricks Sites is Finally Here',
    excerpt: 'Bricks 2.4 introduces a streamlined Import/Export bundle that lets you move a wide range of settings between projects in a single ZIP file.',
    category: 'Bricks Builder' as const,
    imageUrl: 'https://wptuts.co.uk/wp-content/uploads/4cRgfpWBQKk-768x432.jpg',
    imageHint: 'Migrate Bricks Sites in a single zip',
    publishedAt: '2026-08-24T12:00:00Z',
    author: 'Paul Charlton',
    authorSlug: 'paul-charlton',
    authorImageUrl: '/paul-c.png',
    content: 'Complete guide to migrating Bricks Builder templates and settings in seconds.',
    focusKeywords: ['Bricks Builder', 'WordPress Migration'],
    metaDescription: 'Migrate Bricks sites fast with the new export bundle by WPTuts.',
  },
  {
    id: 'wptuts-5',
    _id: 'wptuts-5',
    slug: 'free-fluentcart-modal-checkout',
    title: 'Free FluentCart Modal Checkout – No More Shop Pages!',
    excerpt: 'For the last couple of years I’ve been using Lemon Squeezy to handle digital downloads for my Essential Web Designers Documents Pack, but I wanted a seamless modal checkout.',
    category: 'Bricks Builder' as const,
    imageUrl: 'https://wptuts.co.uk/wp-content/uploads/PVsZItwalCg-768x432.jpg',
    imageHint: 'FluentCart Modal Checkout tutorial',
    publishedAt: '2026-08-13T12:00:00Z',
    author: 'Paul Charlton',
    authorSlug: 'paul-charlton',
    authorImageUrl: '/paul-c.png',
    content: 'Set up an instant modal checkout for digital downloads without complex shop pages.',
    focusKeywords: ['FluentCart', 'Modal Checkout', 'WooCommerce'],
    metaDescription: 'Free FluentCart modal checkout guide by WPTuts.',
  },
  {
    id: 'wptuts-6',
    _id: 'wptuts-6',
    slug: 'woocommerce-website-from-scratch-free-tools',
    title: 'How To Build A WooCommerce Website From Scratch With Free Tools',
    excerpt: 'Step-by-step masterclass on launching a modern eCommerce website using WordPress and WooCommerce completely free.',
    category: 'WooCommerce' as const,
    imageUrl: '/tut-woocommerce.jpg',
    imageHint: 'WooCommerce tutorial free tools',
    publishedAt: '2026-08-01T12:00:00Z',
    author: 'Paul Charlton',
    authorSlug: 'paul-charlton',
    authorImageUrl: '/paul-c.png',
    content: 'Build an online shop from scratch using free themes and plugins.',
    focusKeywords: ['WooCommerce', 'WordPress eCommerce'],
    metaDescription: 'Build WooCommerce website tutorial by WPTuts.',
  },
];

export function NewsFeedSkeleton() {
  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between border-b border-border/60 pb-6">
        <div className="border-l-4 border-[#df5c0c] pl-4 space-y-2">
          <Skeleton className="h-3.5 w-32 bg-muted/60" />
          <Skeleton className="h-8 w-56 bg-muted/60" />
          <Skeleton className="h-4 w-80 max-w-full bg-muted/40" />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-7 w-24 rounded-full bg-muted/50" />
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="rounded-xl border border-border/70 overflow-hidden bg-card">
            <Skeleton className="aspect-video w-full rounded-none bg-muted/60" />
            <div className="p-5 space-y-3">
              <Skeleton className="h-5 w-4/5 bg-muted/60" />
              <Skeleton className="h-4 w-full bg-muted/40" />
              <Skeleton className="h-4 w-2/3 bg-muted/40" />
            </div>
            <div className="mx-5 border-t border-border/50" />
            <div className="p-5 pt-3.5 flex justify-between items-center">
              <Skeleton className="h-3 w-32 bg-muted/50" />
              <Skeleton className="h-3 w-12 bg-muted/50" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function NewsFeedContent({ articles }: { articles: (Article & {_id: any})[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const selectedCategory = searchParams.get('category') ?? 'All';
  const searchQuery = searchParams.get('search') ?? '';
  const pageParam = parseInt(searchParams.get('page') ?? '1', 10);
  const currentPage = isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;

  // Merge database articles with WPTuts authentic tutorial posts
  const allTutorials = useMemo(() => {
    return [...WPTUTS_VIDEOS, ...articles];
  }, [articles]);

  const handleCategoryChange = (cat: string) => {
    const params = new URLSearchParams(searchParams);
    if (cat === 'All') {
      params.delete('category');
    } else {
      params.set('category', cat);
    }
    params.delete('page');
    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}#tutorials`, { scroll: false });
    });
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    if (newPage <= 1) {
      params.delete('page');
    } else {
      params.set('page', newPage.toString());
    }
    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}#tutorials`, { scroll: true });
    });
  };

  const filteredArticles = useMemo(() => {
    return allTutorials
      .filter((article) => {
        if (selectedCategory === 'All') return true;
        return article.category.toLowerCase().includes(selectedCategory.toLowerCase());
      })
      .filter((article) =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      );
  }, [allTutorials, selectedCategory, searchQuery]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE) || 1;
  const paginatedArticles = useMemo(() => {
    const start = (currentPage - 1) * ARTICLES_PER_PAGE;
    return filteredArticles.slice(start, start + ARTICLES_PER_PAGE);
  }, [filteredArticles, currentPage]);

  return (
    <section id="tutorials" className="space-y-8 scroll-mt-20">
      {/* WPTuts Exact Section Header: "Latest Videos" */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between border-b border-border/60 pb-6">
        <div className="border-l-4 border-[#df5c0c] pl-4">
          <div className="text-xs font-bold uppercase tracking-wider text-[#df5c0c]">
            Free WordPress Tutorials
          </div>
          <h2 className="font-headline text-3xl sm:text-4xl font-extrabold tracking-tight text-[#152333] dark:text-white mt-0.5">
            Latest Videos
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
            Unlock the potential of WordPress with over 700 FREE WordPress Tutorials. Elementor, ACF, Crocoblock, Brizy &amp; More.
          </p>
        </div>

        {/* WPTuts Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`rounded-full px-3.5 py-1 font-button text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                  isActive
                    ? "bg-[#df5c0c] text-white shadow-md"
                    : "bg-muted/60 text-slate-700 hover:bg-muted hover:text-foreground dark:text-slate-300"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {searchQuery && (
        <div className="flex items-center gap-2 rounded-lg bg-muted/40 p-3 text-xs text-muted-foreground border border-border/50">
          <Filter className="h-4 w-4 text-[#df5c0c]" />
          <span>Showing results for search term:</span>
          <span className="font-bold text-[#df5c0c]">"{searchQuery}"</span>
          <button
            onClick={() => {
              const params = new URLSearchParams(searchParams);
              params.delete('search');
              router.replace(`${pathname}?${params.toString()}`);
            }}
            className="ml-auto underline hover:text-foreground"
          >
            Clear Search
          </button>
        </div>
      )}

      {isPending ? (
        <NewsFeedSkeleton />
      ) : (
        <>
          {/* Article Enhanced Grid (WPTuts) */}
          {paginatedArticles.length > 0 ? (
            <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {paginatedArticles.map((article) => (
                <ArticleCard key={article._id.toString()} article={{...article, id: article._id.toString()}} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border/80 bg-muted/20 py-20 text-center">
              <div className="h-12 w-12 rounded-full bg-[#df5c0c]/10 p-3 text-[#df5c0c] mb-3 flex items-center justify-center font-bold text-lg">
                !
              </div>
              <h3 className="font-headline text-lg font-bold text-foreground">No Tutorials Found</h3>
              <p className="mt-1 text-xs sm:text-sm text-muted-foreground max-w-sm">
                No videos matched your criteria. Try selecting another category or resetting the search.
              </p>
              <button
                onClick={() => handleCategoryChange('All')}
                className="mt-4 rounded bg-[#df5c0c] px-4 py-2 font-button text-xs font-bold uppercase tracking-wide text-white hover:bg-[#ad3b1e]"
              >
                Show All Videos
              </button>
            </div>
          )}

          {/* WPTuts Style Numeric Pagination */}
          {totalPages > 1 && (
            <nav className="flex items-center justify-center gap-1.5 pt-8 border-t border-border/50" aria-label="Pagination">
              {[...Array(totalPages)].map((_, i) => {
                const pageNum = i + 1;
                const isCurrent = pageNum === currentPage;
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`flex h-9 w-9 items-center justify-center rounded font-button text-xs font-bold transition-all ${
                      isCurrent
                        ? "bg-[#df5c0c] text-white shadow-sm"
                        : "border border-border/70 bg-card text-foreground hover:border-[#df5c0c] hover:text-[#df5c0c]"
                    }`}
                    aria-current={isCurrent ? "page" : undefined}
                  >
                    {pageNum}
                  </button>
                );
              })}

              {currentPage < totalPages && (
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="flex h-9 items-center gap-1 rounded border border-border/70 bg-card px-3 font-button text-xs font-bold text-foreground transition-all hover:border-[#df5c0c] hover:text-[#df5c0c]"
                >
                  <span>Next</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              )}
            </nav>
          )}
        </>
      )}
    </section>
  );
}

export default function NewsFeed(props: { articles: (Article & {_id: any})[] }) {
  return (
    <Suspense fallback={<NewsFeedSkeleton />}>
      <NewsFeedContent {...props} />
    </Suspense>
  );
}
