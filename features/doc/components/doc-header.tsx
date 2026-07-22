"use client";
import { ComponentDoc } from "../types/document";
import { REGISTRY_TYPES, getRegistryItemNavigation } from "@/registry/config";
import DetailsPageHeader from "@/components/headers/details-page-header";

export interface DocHeaderProps {
  registryTypeSlug: ComponentDoc["registryTypeSlug"];
  itemTitle: ComponentDoc["title"];
  itemName: ComponentDoc["name"];
  slug: string;
}

function DocHeader({
  registryTypeSlug,
  itemTitle,
  itemName,
  slug,
}: DocHeaderProps) {

  const category =
    REGISTRY_TYPES[registryTypeSlug as keyof typeof REGISTRY_TYPES];

  const { previous, next } = getRegistryItemNavigation(
    registryTypeSlug,
    itemName,
  );

  return (
    <DetailsPageHeader
      category={category}
      categorySlug={registryTypeSlug}
      itemTitle={itemTitle!}
      next={{
        slug: next?.name,
        title: next?.title,
      }}
      previous={{
        slug: previous?.name,
        title: previous?.title,
      }}
      slug={slug}
    />
  );
}

export default DocHeader;
