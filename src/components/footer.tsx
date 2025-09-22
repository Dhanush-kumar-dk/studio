import { Flame } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="flex items-center gap-2">
            <Flame className="h-6 w-6 text-primary" />
            <span className="font-bold">NewsFlash</span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground md:mt-0">
            &copy; {new Date().getFullYear()} NewsFlash. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
