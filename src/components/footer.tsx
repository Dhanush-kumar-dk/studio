"use client";

import Link from "next/link";
import Logo from "./logo";
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
  const recentDispatches = [
    {
      title: "New Legislation on Global Data Privacy & AI Governance",
      date: "September 25, 2026",
      slug: "new-legislation-on-data-privacy",
    },
    {
      title: "The Rise of Sustainable Tech in Cross-Border Energy",
      date: "September 18, 2026",
      slug: "the-rise-of-sustainable-tech",
    },
    {
      title: "Global Economic Outlook: Sovereign Debt & FX Pressures",
      date: "September 15, 2026",
      slug: "global-economic-outlook-2024",
    },
    {
      title: "Critical Minerals and the New Semiconductor Corridor",
      date: "August 24, 2026",
      slug: "new-legislation-on-data-privacy",
    },
  ];

  const categories = [
    "Technology & AI",
    "Politics & Policy",
    "World Affairs",
    "Sports Analytics",
    "Sovereign Debt",
    "Sanctions & SWIFT",
    "Energy Economics",
    "Central Banks",
    "Macro Models",
    "Geopolitics",
  ];

  return (
    <footer id="footer" className="w-full bg-[#111c29] text-slate-300 border-t border-white/10 transition-colors duration-200">
      
      {/* Top Socials Row (WPTuts Style) */}
      <div className="border-b border-white/10 py-6">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-headline text-lg font-bold text-white tracking-tight">Debt &amp; Dominion</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#e95f3c]" />
            <span className="text-xs text-slate-400 pl-2 hidden sm:inline">Unvarnished Global Intelligence</span>
          </div>

          <div className="flex items-center gap-2.5">
            <a
              href="https://www.youtube.com/@debtanddominion"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 hover:bg-[#e95f3c] transition-colors"
              aria-label="YouTube"
            >
              <YouTubeFavicon className="h-4 w-4" />
            </a>
            <a
              href="https://x.com/debtanddominion"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 hover:bg-[#e95f3c] transition-colors"
              aria-label="X Twitter"
            >
              <XFavicon className="h-4 w-4" />
            </a>
            <a
              href="https://www.linkedin.com/company/debt-dominion/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 hover:bg-[#e95f3c] transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedInFavicon className="h-4 w-4" />
            </a>
            <a
              href="https://www.tiktok.com/@debtanddominion"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 hover:bg-[#e95f3c] transition-colors"
              aria-label="TikTok"
            >
              <TikTokFavicon className="h-4 w-4" />
            </a>
            <a
              href="mailto:debtdominionofficial@gmail.com"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 hover:bg-[#e95f3c] transition-colors"
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
          
          {/* Column 1: About Debt & Dominion */}
          <div className="space-y-4">
            <h3 className="font-headline text-base font-bold uppercase tracking-wider text-white border-b border-white/10 pb-2">
              About Debt &amp; Dominion
            </h3>
            <p className="text-sm leading-relaxed text-slate-300">
              Debt &amp; Dominion is an independent international publication dedicated to exploring the dynamic intersections of economics, sovereign debt, and global governance.
            </p>
            <p className="text-sm leading-relaxed text-slate-400">
              Powered by students and early-career thinkers from leading global academic institutions, we combine academic rigor with bold, design-forward storytelling.
            </p>
            <div className="pt-2">
              <Link href="/about" className="text-xs font-bold uppercase tracking-wider text-[#e95f3c] hover:underline">
                Read Our Full Mission &rarr;
              </Link>
            </div>
          </div>

          {/* Column 2: Latest Posts / Dispatches */}
          <div className="space-y-4">
            <h3 className="font-headline text-base font-bold uppercase tracking-wider text-white border-b border-white/10 pb-2">
              Latest Dispatches
            </h3>
            <ul className="space-y-3">
              {recentDispatches.map((dispatch, idx) => (
                <li key={idx} className="group border-b border-white/5 pb-2.5 last:border-none">
                  <Link
                    href={`/articles/${dispatch.slug}`}
                    className="text-xs sm:text-sm font-semibold text-slate-200 group-hover:text-[#e95f3c] transition-colors line-clamp-1"
                  >
                    {dispatch.title}
                  </Link>
                  <time className="block text-[11px] text-slate-500 mt-0.5">
                    {dispatch.date}
                  </time>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Tutorial Categories / Intelligence Desks */}
          <div className="space-y-4">
            <h3 className="font-headline text-base font-bold uppercase tracking-wider text-white border-b border-white/10 pb-2">
              Intelligence Desks
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat, idx) => (
                <Link
                  key={idx}
                  href={`/?category=${encodeURIComponent(cat.split(' ')[0])}#dispatches`}
                  className="rounded border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-300 hover:border-[#e95f3c] hover:bg-[#e95f3c] hover:text-white transition-all"
                >
                  {cat}
                </Link>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10">
              <span className="block text-xs font-semibold text-slate-400 mb-2">Need Direct Intelligence?</span>
              <Link
                href="/newsletter"
                className="inline-block rounded bg-[#e95f3c] px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#ad3b1e] transition-colors"
              >
                Join Free Dispatch List
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Legal & Copyright Bar (WPTuts Style) */}
        <div className="mt-12 border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            Copyright &copy; {new Date().getFullYear()} <strong className="text-white">Debt &amp; Dominion</strong> | All Rights Reserved.
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
                    Information on how Debt &amp; Dominion uses essential cookies.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-3 text-xs leading-relaxed text-muted-foreground pt-2">
                  <p>
                    Debt &amp; Dominion uses essential first-party cookies strictly to maintain user authentication sessions and preserve reader interface preferences.
                  </p>
                  <p>
                    We do not deploy third-party advertising cookies or cross-site tracking trackers.
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
                    Last updated: September 2026. Debt &amp; Dominion is committed to protecting your privacy.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-3 text-xs leading-relaxed text-muted-foreground pt-2">
                  <p>
                    <strong>Information Collection:</strong> We collect information you provide directly, such as email addresses for newsletter delivery or account credentials for authenticated users.
                  </p>
                  <p>
                    <strong>Analytics:</strong> We use privacy-conscious analytics (Vercel Analytics) to monitor site traffic and performance without selling user data.
                  </p>
                  <p>
                    <strong>Contact:</strong> For privacy inquiries or data requests, contact us at{' '}
                    <a href="mailto:debtdominionofficial@gmail.com" className="text-[#e95f3c] underline">
                      debtdominionofficial@gmail.com
                    </a>.
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
                    Terms governing the use of the Debt &amp; Dominion platform.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-3 text-xs leading-relaxed text-muted-foreground pt-2">
                  <p>
                    <strong>Editorial Integrity:</strong> Content published on Debt &amp; Dominion is provided for informational and analytical purposes and does not constitute financial, investment, or legal advice.
                  </p>
                  <p>
                    <strong>Intellectual Property:</strong> All original articles, data visualizations, and editorial materials are the intellectual property of Debt &amp; Dominion. Quotations and citations are encouraged with proper attribution.
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
