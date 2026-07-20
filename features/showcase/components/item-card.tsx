import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { RegistryItemWithStatus } from "@/registry/config";
import { Typography } from "@/components/ui/typography";

interface IItemCardProps {
  item: RegistryItemWithStatus;
  className?: string;
}

export function ItemCard({ item, className }: IItemCardProps) {
  return (
    <Link
      href={`/components/${item.name}`}
      className={cn(
        "group border-border/60 bg-card flex min-h-27.5 flex-col gap-3 rounded-xl border p-5",
        "hover:border-border hover:bg-accent/40 transition-all hover:-translate-y-0.5",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-2.5">
        <Typography variant="label" className="normal-case text-md">
          {item.title}
        </Typography>
        <div className="flex items-center gap-2">
          {item.catalog.category.map((category) => {
            return (
              <span
                key={category}
                className="border-border/60 bg-muted/40 text-muted-foreground shrink-0 rounded-md border px-1.5 py-0.5 font-mono text-[9.5px] tracking-wide uppercase"
              >
                {category}
              </span>
            );
          })}
        </div>
      </div>

      <Typography variant="caption" className="text-muted-foreground truncate text-[12.5px] leading-relaxed">
        {item.description}
      </Typography>

      <div className="mt-auto flex items-center justify-between">
        {item.isNew ? (
          <span className="rounded-md border border-emerald-500/20 bg-emerald-500/10 px-1.5 py-0.5 font-mono text-[10px] text-emerald-500">
            New
          </span>
        ) : (
          <span />
        )}
        <ArrowRight className="text-muted-foreground/60 group-hover:text-foreground h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
      </div>
    </Link>
  );
}
