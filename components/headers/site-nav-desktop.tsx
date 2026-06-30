"use client";
import { MAIN_NAV } from "@/config/site";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function SiteNavDesktop({className}: {className?: string}) {
  const [hoveredLink, setHoveredLink] = React.useState<string | null>(null);
  const pathName = usePathname();
  return (
      <nav
        className={cn("items-center gap-6 text-sm font-medium pr-4 hidden md:flex", className)}
        onMouseLeave={() => setHoveredLink(null)}
      >
        {MAIN_NAV.map((item) => {
          const isHoveredItem = hoveredLink === item.title;
          const isActiveItem = pathName === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative group text-muted-foreground/60",
                isActiveItem ? "text-ring scale-105" : "",
                isHoveredItem && !isActiveItem
                  ? "scale-105 text-ring transition-all duration-300 ease-out"
                  : "",
              )}
              onMouseEnter={() => setHoveredLink(item.title)}
            >
              <span>{item.title}</span>
              {isHoveredItem && !isActiveItem && (
                <motion.div
                  layout
                  layoutId="nav-indicator"
                  className="absolute inset-0 pointer-events-none"
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 35,
                  }}
                >
                  <div className="absolute -top-2 -left-2 h-2 w-2 border-l-2 border-t-2 border-ring" />
                  <div className="absolute -bottom-2 -right-2 h-2 w-2 border-r-2 border-b-2 border-ring" />
                </motion.div>
              )}
              {isActiveItem && (
                <motion.div
                  layout
                  layoutId="active-nav"
                  className="absolute inset-0 pointer-events-none"
                  transition={{
                    type: "spring",
                    stiffness: 600,
                    damping: 50,
                  }}
                >
                  <div className="absolute inset-0 border-b-2 border-ring" />
                </motion.div>
              )}
            </Link>
          );
        })}
      </nav>
  );
}

export default SiteNavDesktop;
