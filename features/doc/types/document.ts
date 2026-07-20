import { RegistryItemEntryWithRegistryTypeSlug } from "@/registry/config";

export type ComponentDoc = RegistryItemEntryWithRegistryTypeSlug & {
  content: string;
  frontmatter: Record<string, unknown>;
};
