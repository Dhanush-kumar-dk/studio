"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [isAnimating, setIsAnimating] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggle = () => {
    setIsAnimating(true);
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
    setTimeout(() => {
      setIsAnimating(false);
    }, 400);
  };

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="h-9 w-9 rounded-full text-muted-foreground"
        aria-label="Toggle theme"
      >
        <span className="h-4 w-4" />
      </Button>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggle}
      className={`relative h-9 w-9 rounded-full text-muted-foreground transition-all duration-300 hover:bg-orange-500/10 hover:text-orange-500 active:scale-75 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-orange-500/50 ${
        isAnimating ? "scale-90" : "scale-100"
      }`}
      aria-label="Toggle theme"
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <div
        className={`relative flex items-center justify-center transition-transform duration-500 ease-in-out ${
          isAnimating ? "rotate-[360deg] scale-110" : "rotate-0 scale-100"
        }`}
      >
        <Sun
          className={`h-4 w-4 text-orange-600 transition-all duration-300 ${
            isDark
              ? "scale-0 rotate-90 opacity-0 absolute"
              : "scale-100 rotate-0 opacity-100 drop-shadow-[0_0_6px_rgba(234,88,12,0.4)]"
          }`}
        />
        <Moon
          className={`h-4 w-4 text-orange-400 transition-all duration-300 ${
            isDark
              ? "scale-100 rotate-0 opacity-100 drop-shadow-[0_0_8px_rgba(251,146,60,0.5)]"
              : "scale-0 -rotate-90 opacity-0 absolute"
          }`}
        />
      </div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
