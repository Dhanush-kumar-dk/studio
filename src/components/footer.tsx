import { Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import Logo from "./logo";

function TiktokIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        {...props}
      >
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.43.05-4.84-.94-6.37-2.96-2.24-2.95-2.2-6.87-.05-9.83 2.1-2.9 5.56-4.41 9.01-4.32 1.25.03 2.49.21 3.72.46v-4.4c-.99-.3-2.02-.45-3.05-.45-3.19.01-6.25.95-8.62 3.32-2.31 2.3-3.48 5.42-3.48 8.68 0 3.33 1.21 6.41 3.55 8.71 2.33 2.3 5.4 3.49 8.74 3.49 3.42 0 6.51-1.25 8.8-3.62 2.24-2.32 3.45-5.38 3.45-8.62 0-1.2-.19-2.39-.56-3.53a4.23 4.23 0 0 0-2.09-2.9l-1.92-1.22c-1.38-.87-2.93-1.42-4.55-1.59l-.13-2.54z" />
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
