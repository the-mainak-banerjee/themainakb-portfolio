import {
  ComponentEntry,
  getAllComponents,
  getComponentsByCategory,
} from "@/registry/config";

export function getRegistryItemUrl(item: string) {
  const namespaceUrl =
    process.env.NEXT_PUBLIC_REGISTRY_NAMESPACE_URL ||
    "https://develop-themainakb-portfolio.vercel.app/r/{name}.json";
  return namespaceUrl?.replace("{name}", item);
}

export function getItemDocumentationUrl(name: string, categorySlug: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}/${categorySlug}/${name}`;
}

const NEW_THRESHOLD_DAYS = 2;

export function isNewComponent(
  publishedAt: ComponentEntry["catalog"]["publishedAt"],
): boolean {
  const days =
    (Date.now() - new Date(publishedAt).getTime()) / (1000 * 60 * 60 * 24);
  return days <= NEW_THRESHOLD_DAYS;
}

export function getNewComponents(categorySlug?: string) {
  const components = categorySlug
    ? getComponentsByCategory(categorySlug)
    : getAllComponents();

  return components
    .filter((item) => isNewComponent(item.catalog.publishedAt))
    .sort(
      (a, b) =>
        new Date(b.catalog.publishedAt).getTime() -
        new Date(a.catalog.publishedAt).getTime(),
    );
}

export function getComponentsListPageData(categorySlug?: string) {
  const components = getComponentsByCategory(categorySlug ?? "components");

  const newComponents = getNewComponents(categorySlug)

  const olderComponents = components
    .filter((c) => !isNewComponent(c.catalog.publishedAt))
    .sort((a, b) => a.name.localeCompare(b.name));

  return { newComponents, olderComponents };
}