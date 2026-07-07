import { ComponentEntryWithCategorySlug } from "@/registry/config";

export type ComponentDoc = ComponentEntryWithCategorySlug & {
  content: string;
  frontmatter: Record<string, unknown>;
};
