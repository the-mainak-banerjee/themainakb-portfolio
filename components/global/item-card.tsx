import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { Typography } from "@/components/ui/typography";


interface ItemCardRootProps {
  href: string;
  className?: string;
  children: ReactNode;
}

function Root({ href, className, children }: ItemCardRootProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group border-border/60 bg-card flex min-h-27.5 flex-col gap-3 rounded-xl border p-5",
        "hover:border-border hover:bg-accent/40 transition-all hover:-translate-y-0.5",
        className,
      )}
    >
      {children}
    </Link>
  );
}


function Header({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-start justify-between gap-2.5", className)}>
      {children}
    </div>
  );
}

function Title({ children }: { children: ReactNode }) {
  return (
    <Typography variant="label" className="text-md normal-case">
      {children}
    </Typography>
  );
}

function CategoryBadges({ categories }: { categories?: string[] }) {
  if (!categories || categories.length === 0) return null;

  return (
    <div className="flex items-center gap-2">
      {categories.map((category) => (
        <span
          key={category}
          className="border-border/60 bg-muted/40 text-muted-foreground shrink-0 rounded-md border px-1.5 py-0.5 font-mono text-[9.5px] tracking-wide uppercase"
        >
          {category}
        </span>
      ))}
    </div>
  );
}


function Description({ children }: { children?: ReactNode }) {
  if (!children) return null;

  return (
    <Typography
      variant="caption"
      className="text-muted-foreground truncate text-[12.5px] leading-relaxed"
    >
      {children}
    </Typography>
  );
}


function Footer({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mt-auto flex items-center justify-between gap-2",
        className,
      )}
    >
      {children}
    </div>
  );
}

function NewBadge({ show }: { show?: boolean }) {
  if (!show) return <span />;

  return (
    <span className="rounded-md border border-emerald-500/20 bg-emerald-500/10 px-1.5 py-0.5 font-mono text-[10px] text-emerald-500">
      New
    </span>
  );
}

function Topics({ topics }: { topics?: string[] }) {
  if (!topics || topics.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {topics.map((topic) => (
        <span
          key={topic}
          className="border-border text-muted-foreground rounded-full border px-2 py-0.5 text-[11px]"
        >
          {topic}
        </span>
      ))}
    </div>
  );
}


function Arrow({ className }: { className?: string }) {
  return (
    <ArrowRight
      className={cn(
        "text-muted-foreground/60 group-hover:text-foreground h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-0.5",
        className,
      )}
    />
  );
}

export const ItemCard = Object.assign(Root, {
  Header,
  Title,
  CategoryBadges,
  Description,
  Footer,
  NewBadge,
  Topics,
  Arrow,
});
