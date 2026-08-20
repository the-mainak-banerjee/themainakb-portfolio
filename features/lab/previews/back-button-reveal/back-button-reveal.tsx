"use client";
import { cn } from "@/lib/utils";
import { ChevronLeft, Home, Search, Settings } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const elements = [
  {
    icon: Home,
    id: "home",
  },
  {
    icon: Settings,
    id: "settings",
  },
  {
    icon: Search,
    id: "search",
  },
] as const;

type ActiveId = (typeof elements)[number]["id"];

const GooeyFilter = () => {
  return (
    <svg aria-hidden="true" className="absolute hidden h-0 w-0">
      <defs>
        <filter id="goo-effect">
          <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -15"
            result="goo"
          />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </defs>
    </svg>
  );
};

function BackButtonReveal() {
  const [active, setActive] = useState<ActiveId>("home");
  const displayBack = active !== "home";
  return (
    <div className="relative isolate" style={{ filter: "url(#goo-effect)" }}>
      <GooeyFilter />
      <div className="relative z-20 flex w-37.5 items-center justify-between rounded-4xl bg-neutral-700 px-6 py-4 dark:bg-white">
        {elements.map((item) => {
          const Icon = item.icon;
          const isActive = item.id === active;
          return (
            <button
              key={item.id}
              className={cn(
                "cursor-pointer transition-colors duration-200 ease-in-out",
                isActive
                  ? "text-white dark:text-neutral-800"
                  : "text-gray-400 dark:text-neutral-500",
              )}
              onClick={() => setActive(item.id)}
            >
              <Icon />
            </button>
          );
        })}
      </div>
      <AnimatePresence>
        {displayBack && (
          <motion.button
            initial={{ x: 2, rotate: "60deg", opacity: 0.8 }}
            animate={{ x: -60, rotate: "0deg", opacity: 1 }}
            exit={{ x: 2, rotate: "60deg", opacity: 0.8 }}
            transition={{ duration: 0.3, type: "spring", bounce: 0.2 }}
            onClick={() => setActive("home")}
            className="absolute top-0 z-10 cursor-pointer rounded-full bg-neutral-700 p-4 text-white dark:bg-white dark:text-neutral-800"
          >
            <ChevronLeft />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

export default BackButtonReveal;
