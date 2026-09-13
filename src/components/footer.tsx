import Link from "next/link";
import Logo from "./logo";
import { GmailFavicon, LinkedInFavicon, TikTokFavicon } from "./icons/favicons";

export default function Footer() {
  return (
    <footer className="border-t border-border/60 bg-background text-foreground transition-colors duration-200">
      <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Logo />
              <span className="font-headline text-xl font-bold tracking-tight text-foreground">Debt & Dominion</span>
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground max-w-sm">
              Navigating the complex worlds of global finance, tech, and geopolitics with uncompromised clarity and strategic insight.
            </p>
          </div>

          <div className="md:justify-self-center">
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

          <div className="md:justify-self-end">
            <h3 className="font-headline text-sm font-bold uppercase tracking-wider text-foreground">Connect</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a
                  href="mailto:debtdominionofficial@gmail.com"
                  className="group flex items-center gap-2.5 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <GmailFavicon className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
                  <span>debtdominionofficial@gmail.com</span>
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
            <span className="hover:text-foreground cursor-pointer">Privacy Policy</span>
            <span className="hover:text-foreground cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
