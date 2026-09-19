"use client";

import Link from "next/link";
import Logo from "./logo";
import { GmailFavicon, LinkedInFavicon, TikTokFavicon } from "./icons/favicons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Footer() {
  return (
    <footer className="border-t border-border/60 bg-background text-foreground transition-colors duration-200">
      <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <Logo />
              <span className="font-headline text-xl font-bold tracking-tight text-foreground">Debt & Dominion</span>
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground max-w-sm">
              Navigating the complex worlds of global finance, tech, and geopolitics with uncompromised clarity and strategic insight.
            </p>
          </div>

          <div>
            <h3 className="font-headline text-sm font-bold uppercase tracking-wider text-foreground">Navigation</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground transition-colors hover:text-emerald-600 dark:hover:text-emerald-400">
                  Latest Stories
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground transition-colors hover:text-emerald-600 dark:hover:text-emerald-400">
                  About Publication
                </Link>
              </li>
              <li>
                <Link href="/newsletter" className="text-muted-foreground transition-colors hover:text-emerald-600 dark:hover:text-emerald-400">
                  Newsletter Briefing
                </Link>
              </li>
              <li>
                <Link href="/#team" className="text-muted-foreground transition-colors hover:text-emerald-600 dark:hover:text-emerald-400">
                  Our Team & Authors
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-headline text-sm font-bold uppercase tracking-wider text-foreground">Categories</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/?category=Technology" className="text-muted-foreground transition-colors hover:text-emerald-600 dark:hover:text-emerald-400">
                  Technology & AI
                </Link>
              </li>
              <li>
                <Link href="/?category=Politics" className="text-muted-foreground transition-colors hover:text-emerald-600 dark:hover:text-emerald-400">
                  Politics & Policy
                </Link>
              </li>
              <li>
                <Link href="/?category=Sports" className="text-muted-foreground transition-colors hover:text-emerald-600 dark:hover:text-emerald-400">
                  Sports & Analytics
                </Link>
              </li>
              <li>
                <Link href="/?category=World" className="text-muted-foreground transition-colors hover:text-emerald-600 dark:hover:text-emerald-400">
                  World Affairs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-headline text-sm font-bold uppercase tracking-wider text-foreground">Connect</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a
                  href="mailto:debtdominionofficial@gmail.com"
                  className="group flex items-center gap-2.5 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <GmailFavicon className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
                  <span className="truncate">debtdominionofficial@gmail.com</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/company/debt-dominion/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2.5 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <LinkedInFavicon className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
                  <span>LinkedIn</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.tiktok.com/@debtanddominion"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2.5 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <TikTokFavicon className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
                  <span>TikTok</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border/40 pt-8 flex flex-col items-center justify-between gap-4 text-xs text-muted-foreground sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Debt & Dominion. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Dialog>
              <DialogTrigger asChild>
                <button type="button" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Privacy Policy</DialogTitle>
                  <DialogDescription>
                    Last updated: September 2026. Debt & Dominion is committed to protecting your privacy.
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
                    <strong>Cookies:</strong> Essential session cookies are used to authenticate authors and editors. You can control cookie preferences in your browser settings.
                  </p>
                  <p>
                    <strong>Contact:</strong> For privacy inquiries or data requests, contact us at <a href="mailto:debtdominionofficial@gmail.com" className="text-emerald-600 underline">debtdominionofficial@gmail.com</a>.
                  </p>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <button type="button" className="hover:text-foreground transition-colors">
                  Terms of Service
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Terms of Service</DialogTitle>
                  <DialogDescription>
                    Terms governing the use of the Debt & Dominion platform.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-3 text-xs leading-relaxed text-muted-foreground pt-2">
                  <p>
                    <strong>Editorial Integrity:</strong> Content published on Debt & Dominion is provided for informational and analytical purposes and does not constitute financial, investment, or legal advice.
                  </p>
                  <p>
                    <strong>Intellectual Property:</strong> All original articles, data visualizations, and editorial materials are the intellectual property of Debt & Dominion. Quotations and citations are encouraged with proper attribution.
                  </p>
                  <p>
                    <strong>User Conduct:</strong> Readers interacting with comment or forum features must engage civilly and refrain from harassment, spam, or unlawful dissemination.
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
