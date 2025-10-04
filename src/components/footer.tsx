import { Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import Logo from "./logo";

function TiktokIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <path d="M16.6 5.82s.51.5 0 0A4.27 4.27 0 0 1 12.09 3a5.39 5.39 0 0 0-5.38 5.38v8.64a2.44 2.44 0 0 0 2.43 2.44h.18a2.44 2.44 0 0 0 2.43-2.43v-8.64a2.79 2.79 0 0 1 2.79-2.79h.18a2.79 2.79 0 0 1 2.79 2.79v5.82a6.52 6.52 0 0 0-6.52 6.51h-.18a6.52 6.52 0 0 0-6.52-6.51v-5.82a5.39 5.39 0 0 0 5.38-5.38A5.39 5.39 0 0 0 12.09 3a5.39 5.39 0 0 0 5.38 5.38s-.51.5 0 0z" />
      </svg>
    );
  }

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <Logo />
              <span className="text-xl font-bold">Debt & Dominion</span>
            </div>
            <p className="mt-4 text-muted-foreground">
              Navigating the complex worlds of finance and power with clarity and insight.
            </p>
          </div>
          <div className="md:justify-self-center">
            <h3 className="font-semibold">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/?category=Technology" className="text-muted-foreground hover:text-primary">Technology</Link></li>
              <li><Link href="/?category=Politics" className="text-muted-foreground hover:text-primary">Politics</Link></li>
              <li><Link href="/?category=Sports" className="text-muted-foreground hover:text-primary">Sports</Link></li>
              <li><Link href="/?category=World" className="text-muted-foreground hover:text-primary">World</Link></li>
            </ul>
          </div>
          <div className="md:justify-self-end">
            <h3 className="font-semibold">Contact</h3>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <a href="mailto:contact@debtanddominion.com" className="text-muted-foreground hover:text-primary">
                  contact@debtanddominion.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Linkedin className="h-5 w-5 text-muted-foreground" />
                <a href="https://www.linkedin.com/company/debt-dominion/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                  LinkedIn
                </a>
              </li>
              <li className="flex items-center gap-2">
                <TiktokIcon className="h-5 w-5 text-muted-foreground" />
                <a href="https://www.tiktok.com/@debtanddominion" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                  TikTok
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Debt & Dominion. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
