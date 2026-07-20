import { getComponentRegistryItemByCategory } from "@/lib/registry";
import { ItemGrid } from "./item-grid";
import { REGISTRY_ITEM_CATEGORY } from "@/registry/config";


interface RegistryComponentGridProps {
  category?: keyof typeof REGISTRY_ITEM_CATEGORY;
  limit?: number;
  showMoreCard?: boolean;
  moreCardHref?: string;
  className?: string;
}

export function RegistryComponentGrid({
  category,
  limit,
  showMoreCard = false,
  moreCardHref,
  className,
}: RegistryComponentGridProps) {
  const items = getComponentRegistryItemByCategory(category);
  const visible = limit ? items.slice(0, limit) : items;
  const remaining = limit ? Math.max(items.length - limit, 0) : 0;

  return (
    <ItemGrid
      items={visible}
      className={className}
      moreCard={
        showMoreCard && remaining > 0
          ? { count: remaining, total: items.length, href: moreCardHref }
          : undefined
      }
    />
  );
}
