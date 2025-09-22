import { Flame, Linkedin, Mail } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <Flame className="h-7 w-7 text-primary" />
              <span className="text-xl font-bold">NewsFlash</span>
            </div>
            <p className="mt-4 text-muted-foreground">
              Your daily flash of news, summarized by AI. We bring you the most important stories, distilled for clarity and speed.
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
                <a href="mailto:contact@newsflash.com" className="text-muted-foreground hover:text-primary">
                  contact@newsflash.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Linkedin className="h-5 w-5 text-muted-foreground" />
                <a href="#" className="text-muted-foreground hover:text-primary">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} NewsFlash. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
