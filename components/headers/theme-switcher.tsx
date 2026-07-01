"use client";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useState } from "react";

function ThemeSwitcher() {
  const { resolvedTheme, setTheme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex h-7 w-7 items-center justify-center"
    >
      <Sun
        fill={isHovered ? "currentColor" : "none"}
        className="absolute left-1/2 z-50 h-[1.2rem] w-[1.2rem] -translate-x-1/2 scale-100 rotate-0 transition-all duration-300 ease-out dark:scale-0 dark:rotate-45"
      />
      <Moon
        fill={isHovered ? "currentColor" : "none"}
        className="absolute left-1/2 z-50 h-[1.2rem] w-[1.2rem] -translate-x-1/2 scale-0 rotate-45 transition-all duration-300 ease-out dark:scale-100 dark:rotate-0"
      />
      <div
        className={`dark:bg-foreground/30 bg-foreground/10 absolute inset-0 rounded-md transition-opacity duration-300 ease-out ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      />
    </button>
  );
}

export default ThemeSwitcher;
