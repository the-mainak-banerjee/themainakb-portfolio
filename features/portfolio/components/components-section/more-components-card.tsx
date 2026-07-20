import Link from "next/link";
import { LayoutGrid, Scissors, Type } from "lucide-react";
import { REGISTRY_TYPE_SLUGS } from "@/registry/config";
import { Typography } from "@/components/ui/typography";

interface IMoreComponentsCardProps {
  count: number;
  total: number;
  href?: string;
}

export function MoreComponentsCard({
  count,
  total,
  href = `/${REGISTRY_TYPE_SLUGS.components}`,
}: IMoreComponentsCardProps) {
  return (
    <Link
      href={href}
      className="group border-border/60 bg-card hover:border-border hover:bg-accent/40 flex min-h-27.5 flex-col items-center justify-center gap-3.5 rounded-xl border p-5 text-center transition-colors"
    >
      <div className="flex items-center justify-center">
        <div className="border-border bg-muted flex h-8.5 w-8.5 items-center justify-center rounded-[9px] border shadow-sm transition-transform">
          <Scissors className="text-muted-foreground h-3.5 w-3.5" />
        </div>
        <div className="border-border bg-muted -ml-2.5 flex h-8.5 w-8.5 items-center justify-center rounded-[9px] border shadow-sm">
          <Type className="text-muted-foreground h-3.5 w-3.5" />
        </div>
        <div className="border-border bg-muted -ml-2.5 flex h-8.5 w-8.5 items-center justify-center rounded-[9px] border shadow-sm transition-transform">
          <LayoutGrid className="text-muted-foreground h-3.5 w-3.5" />
        </div>
        <div className="bg-foreground text-background -ml-2.5 flex h-8.5 w-8.5 items-center justify-center rounded-[9px] font-mono text-[11px] font-semibold">
          +{count}
        </div>
      </div>

      <div>
        <div className="text-foreground text-[13px] font-medium">
          View all components
        </div>
        <Typography variant="caption" className="mt-0.5">
          {total} total
        </Typography>
      </div>
    </Link>
  );
}
