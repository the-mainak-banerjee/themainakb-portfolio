"use client";
import { MOBILE_NAV } from "@/config/site";
import { cn, isActiveNavItem } from "@/lib/utils";
import { useMotionValueEvent, useScroll, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

function SiteNavMobile() {
  const pathName = usePathname();
  const { scrollY } = useScroll();
  const [isCompact, setIsCompact] = useState(false);
  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious();
    if (!prev) return;
    if (latest > prev) {
      if (isCompact) return;
      setIsCompact(true);
    } else {
      if (!isCompact) return;
      setIsCompact(false);
    }
  });

  return (
    <motion.nav
      animate={{ scale: isCompact ? 0.8 : 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="bg-accent supports-backdrop-filter:bg-accent/60 border-border fixed right-1/2 bottom-4 left-1/2 flex w-[60vw] -translate-x-1/2 items-center justify-around rounded-xl border px-2 py-2 backdrop-blur md:hidden z-50"
    >
      {MOBILE_NAV.map((item) => {
        const isActiveItem = isActiveNavItem(item.href, pathName);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "text-muted-foreground/80 relative flex flex-col items-center justify-center gap-1 text-xs transition-all duration-300 ease-out font-mono w-7 h-7",
              isActiveItem && "text-foreground",
            )}
            onClick={() => {
              if (!isCompact) return;
              setIsCompact(false);
            }}
          >
            <item.icon size={16} className="z-50" />
            {/* <span className="z-50">{item.title}</span> */}
            {isActiveItem && (
              <motion.div
                layoutId="nav_item"
                className="absolute inset-0 bg-ring rounded-md"
              ></motion.div>
            )}
          </Link>
        );
      })}
    </motion.nav>
  );
}

export default SiteNavMobile;
