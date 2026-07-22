import { cn } from "@/lib/utils";
import { RegistryItemWithStatus } from "@/registry/config";
import { ShowcaseItemCard } from "./showcase-item-card";
import { MoreComponentsCard } from "@/features/portfolio/components/components-section/more-components-card";

interface MoreCardConfig {
  count: number;
  total: number;
  href?: string;
}

interface IShowcaseItemGridProps {
  items: RegistryItemWithStatus[];
  /** Pass this to render a trailing "+N more" tile. Caller decides the
   *  numbers — this component just renders what it's given. */
  moreCard?: MoreCardConfig;
  emptyMessage?: string;
  className?: string;
}

export function ShowcaseItemGrid({
  items,
  moreCard,
  emptyMessage = "No components yet.",
  className,
}: IShowcaseItemGridProps) {
  if (items.length === 0) {
    return (
      <div className="border-border/60 text-muted-foreground flex min-h-40 items-center justify-center rounded-xl border border-dashed text-sm">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-2",
        className,
      )}
    >
      {items.map((item) => (
        <ShowcaseItemCard
          key={item.name}
          item={{
            name: item.name,
            description: item.description,
            title: item.title!,
            category: item.catalog.category,
            isNew: item.isNew,
          }}
        />
      ))}

      {moreCard && (
        <MoreComponentsCard
          count={moreCard.count}
          total={moreCard.total}
          href={moreCard.href}
        />
      )}
    </div>
  );
}
