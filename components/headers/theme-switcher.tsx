"use client";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useState } from "react";
import { IconButton } from "../ui/button_list";

function ThemeSwitcher() {
  const { resolvedTheme, setTheme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <IconButton
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      label="Toggle Theme (D)"
      with_tooltip={true}
    >
      <Sun
        fill={isHovered ? "currentColor" : "none"}
        className="absolute left-1/2 z-50 h-[1.2rem] w-[1.2rem] -translate-x-1/2 scale-100 rotate-0 transition-all duration-300 ease-out dark:scale-0 dark:rotate-45"
      />
      <Moon
        fill={isHovered ? "currentColor" : "none"}
        className="absolute left-1/2 z-50 h-[1.2rem] w-[1.2rem] -translate-x-1/2 scale-0 rotate-45 transition-all duration-300 ease-out dark:scale-100 dark:rotate-0"
      />
    </IconButton>
  );
}

export default ThemeSwitcher;
