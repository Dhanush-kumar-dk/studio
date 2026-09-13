"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [rotation, setRotation] = React.useState(0);
  const [isClicking, setIsClicking] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggle = () => {
    setRotation((prev) => prev + 360);
    setIsClicking(true);
    setTimeout(() => setIsClicking(false), 250);

    const nextTheme = resolvedTheme === "dark" ? "light" : "dark";

    if (typeof document !== "undefined" && "startViewTransition" in document) {
      document.startViewTransition(() => {
        setTheme(nextTheme);
      });
    } else {
      setTheme(nextTheme);
    }
  };

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="h-9 w-9 rounded-lg border border-border/40 text-muted-foreground"
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
      className={`relative h-9 w-9 rounded-lg border border-border/40 bg-background/60 backdrop-blur-sm transition-all duration-300 hover:border-emerald-500/40 hover:bg-emerald-500/10 hover:shadow-[0_0_12px_rgba(16,185,129,0.15)] active:scale-90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500/50 ${
        isClicking ? "scale-90" : "hover:scale-105"
      }`}
      aria-label="Toggle theme"
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <div
        className="relative flex items-center justify-center transition-transform duration-700 ease-spring"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        <Sun
          className={`h-[1.15rem] w-[1.15rem] text-amber-500 transition-all duration-500 ease-spring ${
            isDark
              ? "scale-0 rotate-90 opacity-0 absolute pointer-events-none"
              : "scale-100 rotate-0 opacity-100 drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]"
          }`}
        />
        <Moon
          className={`h-[1.15rem] w-[1.15rem] text-emerald-400 transition-all duration-500 ease-spring ${
            isDark
              ? "scale-100 rotate-0 opacity-100 drop-shadow-[0_0_8px_rgba(52,211,153,0.6)]"
              : "scale-0 -rotate-90 opacity-0 absolute pointer-events-none"
          }`}
        />
      </div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
