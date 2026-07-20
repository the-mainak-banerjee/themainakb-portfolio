import { SITE_URL } from "@/config/site";
import {
  REGISTRY_ITEM_CATEGORY,
  RegistryItemEntry,
  RegistryItemWithStatus,
  getAllRegistryItems,
  getRegistryItemByRegistryType,
} from "@/registry/config";

export function getRegistryItemUrl(item: string) {
  const namespaceUrl =
    process.env.NEXT_PUBLIC_REGISTRY_NAMESPACE_URL ||
    `${SITE_URL}/r/{name}.json`;
  return namespaceUrl?.replace("{name}", item);
}

export function getItemDocumentationUrl(name: string, registryTypeSlug: string) {
  return `${SITE_URL}/${registryTypeSlug}/${name}`;
}

const NEW_THRESHOLD_DAYS = 15;

export function isNewRegistryItem(
  publishedAt: RegistryItemEntry["catalog"]["publishedAt"],
): boolean {
  const days =
    (Date.now() - new Date(publishedAt).getTime()) / (1000 * 60 * 60 * 24);
  return days <= NEW_THRESHOLD_DAYS;
}

export function getNewRegistryItems(registryTypeSlug?: string) {
  const items = registryTypeSlug
    ? getRegistryItemByRegistryType(registryTypeSlug)
    : getAllRegistryItems();

  return items
    .filter((item) => isNewRegistryItem(item.catalog.publishedAt))
    .sort(
      (a, b) =>
        new Date(b.catalog.publishedAt).getTime() -
        new Date(a.catalog.publishedAt).getTime(),
    );
}

export function getRegistryItemsWithStatus(
  registryTypeSlug?: string,
): RegistryItemWithStatus[] {
  const items = registryTypeSlug
    ? getRegistryItemByRegistryType(registryTypeSlug)
    : getAllRegistryItems();

  return items
    .map((item) => ({
      ...item,
      isNew: isNewRegistryItem(item.catalog.publishedAt),
    }))
    .sort((a, b) => {
      // New items first
      if (a.isNew !== b.isNew) {
        return Number(b.isNew) - Number(a.isNew);
      }

      // New items: newest first
      if (a.isNew) {
        return (
          new Date(b.catalog.publishedAt).getTime() -
          new Date(a.catalog.publishedAt).getTime()
        );
      }

      // Older items: alphabetical
      return a.name.localeCompare(b.name);
    });
}

/**
 * Get registry items filtered by a specific category type with isNew status.
 * If no category is provided, returns all items with isNew status.
 */
export function getComponentRegistryItemByCategory(
  category?: keyof typeof REGISTRY_ITEM_CATEGORY,
): RegistryItemWithStatus[] {
  const items = getAllRegistryItems();

  return items
    .filter((item) => !category || item.catalog.category.includes(category))
    .map((item) => ({
      ...item,
      isNew: isNewRegistryItem(item.catalog.publishedAt),
    }))
    .sort((a, b) => {
      // New items first
      if (a.isNew !== b.isNew) {
        return Number(b.isNew) - Number(a.isNew);
      }

      // New items: newest first
      if (a.isNew) {
        return (
          new Date(b.catalog.publishedAt).getTime() -
          new Date(a.catalog.publishedAt).getTime()
        );
      }

      // Older items: alphabetical
      return a.name.localeCompare(b.name);
    });
}

/**
 * Get counts of registry items for each category in a specific registry type.
 * Returns a Record keyed by category keys (e.g., "reveal", "text") with their item counts, plus "all" for total.
 */
export function getRegistryItemCategoryCounts(registryTypeSlug: string): Record<string, number> {
  const items = getRegistryItemByRegistryType(registryTypeSlug);

  const counts: Record<string, number> = {
    all: items.length,
  };

  items.forEach((item) => {
    item.catalog.category.forEach((cat) => {
      counts[cat] = (counts[cat] ?? 0) + 1;
    });
  });

  return counts;
}
