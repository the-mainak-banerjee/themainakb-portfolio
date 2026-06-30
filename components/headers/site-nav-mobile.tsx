"use client";
import { MOBILE_NAV } from "@/config/site";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

function SiteNavMobile() {
  const pathName = usePathname();

  return (
    <nav className="md:hidden fixed bottom-8 bg-accent w-[80vw] py-2 px-2 right-1/2 left-1/2 -translate-x-1/2 rounded-xl flex items-center justify-around border border-foreground/20">
        {MOBILE_NAV.map((item) => {
          const isActiveItem = pathName === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex flex-col items-center gap-1 text-xs text-muted-foreground/80 transition-all duration-300 ease-out",
                isActiveItem && "text-foreground",
              )}
            >
              <item.icon size={16} className="z-50" />
              <span className="z-50">{item.title}</span>
              {/* {isActiveItem && (
              <motion.div
                layoutId="nav_item"
                className="absolute inset-0 bg-ring rounded-md"
              ></motion.div>
            )} */}
            </Link>
          );
        })}
    </nav>
  );
}

export default SiteNavMobile;
