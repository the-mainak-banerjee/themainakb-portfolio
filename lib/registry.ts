import { registryConfig } from "@/registry/config";

export function getRegistryItemUrl(item: string) {
  return registryConfig.namespaceUrl.replace("{name}", item);
}

export function getItemDocumentationUrl(name: string, categorySlug: string) {
    return `${process.env.NEXT_PUBLIC_APP_URL}/${categorySlug}/${name}`;
}