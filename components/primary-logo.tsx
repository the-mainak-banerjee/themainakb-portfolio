"use client";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";

function PrimaryLogo() {
  const router = useRouter();
  const pathName = usePathname();
  const isHomePage = pathName === "/";
  return (
    <button
      className={cn(
        "group flex flex-col items-start",
        isHomePage ? "cursor-default" : "cursor-pointer",
      )}
      onClick={() => !isHomePage && router.push("/")}
    >
      <p
        className={cn(
          "font-space-grotesk text-3xl font-bold tracking-[-0.08em]",
          isHomePage
            ? ""
            : "group-hover:text-ring transition-all duration-300 ease-out group-hover:tracking-[-0.02em]",
        )}
      >
        MB
      </p>

      <div
        className={cn(
          "bg-ring mt-0.5 h-0.5 w-full origin-left scale-x-0 transition-transform duration-300 ease-out",
          isHomePage ? "" : "group-hover:scale-x-100",
        )}
      />
    </button>
  );
}

export default PrimaryLogo;
