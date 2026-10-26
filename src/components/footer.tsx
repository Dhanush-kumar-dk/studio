"use client";

import Link from "next/link";
import { GmailFavicon, LinkedInFavicon, TikTokFavicon, YouTubeFavicon, XFavicon } from "./icons/favicons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Footer() {
  const latestPosts = [
    {
      title: "Atlant Security: The FREE WordPress Security Plugin You Should Try (No Pro Version!)",
      date: "September 25, 2026",
    },
    {
      title: "100% FREE WordPress 2FA, Passkeys, Magic Login & More Plugin",
      date: "September 18, 2026",
    },
    {
      title: "Stop WordPress Plugin Headaches: Go Static with Simply Static Studio",
      date: "September 15, 2026",
    },
    {
      title: "The Fastest Way to Migrate Bricks Sites is Finally Here",
      date: "August 24, 2026",
    },
    {
      title: "Free FluentCart Modal Checkout – No More Shop Pages!",
      date: "August 13, 2026",
    },
  ];

  const categories = [
    "Advanced Custom Fields",
    "Bricks Builder",
    "Brizy Page Builder",
    "Crocoblock Tutorials",
    "Design Tips",
    "Divi Page Builder",
    "Elementor",
    "Gutenberg",
    "JetEngine",
    "Masterclass",
    "Oxygen Builder",
    "PODS",
    "Toolset",
    "UI/UX Tutorials",
    "Visual Composer",
    "Woocommerce for Beginners",
    "WooCommerce Tutorials",
    "WordPress Plugins & Tools",
  ];

  return (
    <footer id="footer" className="w-full bg-[#111c29] text-slate-300 border-t border-white/10 transition-colors duration-200">
      
      {/* Top Socials Row from wptuts.co.uk */}
      <div className="border-b border-white/10 py-6">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-headline text-xl font-black text-white tracking-tight">WPTuts</span>
            <span className="h-2 w-2 rounded-full bg-[#df5c0c]" />
            <span className="text-xs text-slate-400 pl-2 hidden sm:inline">WordPress Tutorials &amp; Masterclasses</span>
          </div>

          <div className="flex items-center gap-2.5">
            <a
              href="https://www.youtube.com/c/wptuts"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 hover:bg-[#df5c0c] transition-colors"
              aria-label="YouTube"
            >
              <YouTubeFavicon className="h-4 w-4" />
            </a>
            <a
              href="https://twitter.com/WPTutz"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 hover:bg-[#df5c0c] transition-colors"
              aria-label="X Twitter"
            >
              <XFavicon className="h-4 w-4" />
            </a>
            <a
              href="https://www.facebook.com/groups/wpcrue"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 hover:bg-[#df5c0c] transition-colors"
              aria-label="Facebook Group"
            >
              <LinkedInFavicon className="h-4 w-4" />
            </a>
            <a
              href="https://www.instagram.com/wptuts/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 hover:bg-[#df5c0c] transition-colors"
              aria-label="Instagram"
            >
              <TikTokFavicon className="h-4 w-4" />
            </a>
            <a
              href="mailto:contact@wptuts.co.uk"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 hover:bg-[#df5c0c] transition-colors"
              aria-label="Email"
            >
              <GmailFavicon className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* WPTuts 3-Column Widget Area */}
      <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          
          {/* Column 1: About WPTuts */}
          <div className="space-y-4">
            <h3 className="font-headline text-lg font-bold text-white border-b border-white/10 pb-2">
              About WPTuts
            </h3>
            <p className="text-sm leading-relaxed text-slate-300">
              WPTuts is part of the PsmegTV group who provide free, high-quality training videos on a range of software topics.
            </p>
            <p className="text-sm leading-relaxed text-slate-400">
              WPTuts focuses on teaching how to use WordPress, Elementor, Advanced Custom Fields, Crocoblock, dynamic web design and more.
            </p>
            <div className="pt-2">
              <Link href="#tutorials" className="text-xs font-bold uppercase tracking-wider text-[#df5c0c] hover:underline">
                Explore Over 700+ Tutorials &rarr;
              </Link>
            </div>
          </div>

          {/* Column 2: Latest Posts */}
          <div className="space-y-4">
            <h3 className="font-headline text-lg font-bold text-white border-b border-white/10 pb-2">
              Latest Posts
            </h3>
            <ul className="space-y-3">
              {latestPosts.map((post, idx) => (
                <li key={idx} className="group border-b border-white/5 pb-2.5 last:border-none">
                  <Link
                    href="#tutorials"
                    className="text-xs sm:text-sm font-semibold text-slate-200 group-hover:text-[#df5c0c] transition-colors line-clamp-2"
                  >
                    {post.title}
                  </Link>
                  <time className="block text-[11px] text-slate-500 mt-1">
                    {post.date}
                  </time>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Tutorial Categories */}
          <div className="space-y-4">
            <h3 className="font-headline text-lg font-bold text-white border-b border-white/10 pb-2">
              Tutorial Categories
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat, idx) => (
                <Link
                  key={idx}
                  href="#tutorials"
                  className="rounded border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-300 hover:border-[#df5c0c] hover:bg-[#df5c0c] hover:text-white transition-all"
                >
                  {cat}
                </Link>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10">
              <span className="block text-xs font-semibold text-slate-400 mb-2">Want to level up your skills?</span>
              <Link
                href="#newsletter"
                className="inline-block rounded bg-[#df5c0c] px-3.5 py-1.5 font-button text-xs font-bold uppercase tracking-wider text-white hover:bg-[#ad3b1e] transition-colors"
              >
                Join Free Community
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Legal & Copyright Bar (Exact WPTuts) */}
        <div className="mt-12 border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            Copyright &copy; {new Date().getFullYear()} <strong className="text-white">WPTuts | WordPress Tutorials</strong> |
          </p>

          <div className="flex items-center gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <button type="button" className="hover:text-white transition-colors">
                  Cookie Policy
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Cookie Policy</DialogTitle>
                  <DialogDescription>
                    Information on how cookies are used.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-3 text-xs leading-relaxed text-muted-foreground pt-2">
                  <p>
                    We use cookies to enhance your browsing experience, serve personalized content, and analyze traffic.
                  </p>
                </div>
              </DialogContent>
            </Dialog>

            <span className="text-white/20">|</span>

            <Dialog>
              <DialogTrigger asChild>
                <button type="button" className="hover:text-white transition-colors">
                  Privacy Policy
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Privacy Policy</DialogTitle>
                  <DialogDescription>
                    WPTuts is committed to safeguarding your privacy online.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-3 text-xs leading-relaxed text-muted-foreground pt-2">
                  <p>
                    We value your privacy and do not sell or distribute your personal information.
                  </p>
                </div>
              </DialogContent>
            </Dialog>

            <span className="text-white/20">|</span>

            <Dialog>
              <DialogTrigger asChild>
                <button type="button" className="hover:text-white transition-colors">
                  Terms &amp; Conditions
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Terms &amp; Conditions</DialogTitle>
                  <DialogDescription>
                    Terms governing the use of WPTuts educational tutorials and resources.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-3 text-xs leading-relaxed text-muted-foreground pt-2">
                  <p>
                    All tutorials and resources are provided for educational purposes.
                  </p>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

      </div>
    </footer>
  );
}
