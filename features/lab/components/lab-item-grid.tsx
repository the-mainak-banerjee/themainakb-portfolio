import { cn } from "@/lib/utils";
import { LabItemCard } from "./lab-item-card";
import { LabItem } from "../data/labs-data";

interface ILabItemGridProps {
  items: LabItem[];
  emptyMessage?: string;
  className?: string;
}

export function LabItemGrid({
  items,
  emptyMessage = "No components yet.",
  className,
}: ILabItemGridProps) {
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
        <LabItemCard
          key={item.slug}
          item={{
            description: item.description,
            title: item.title!,
            slug: item.slug,
            topics: item.tags,
            type: item.type,
          }}
        />
      ))}
    </div>
  );
}
