"use client";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import React from "react";

function ThemeSwitcher() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      onClick={() => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
      }}
      className="flex items-center justify-center h-[1.2rem] w-[1.2rem] relative"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] absolute inset-0 scale-100 dark:scale-0 rotate-0 dark:rotate-45 transition-all duration-300 ease-out" />
      <Moon className="h-[1.2rem] w-[1.2rem] absolute inset-0 scale-0 dark:scale-100 rotate-45 dark:rotate-0 transition-all duration-300 ease-out" />
    </button>
  );
}

export default ThemeSwitcher;
