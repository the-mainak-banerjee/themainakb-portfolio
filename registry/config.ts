import { RegistryItem } from "shadcn/schema";

export type ComponentPreview = {
  path: string;
  description?: string;
};

export type ComponentEntry = RegistryItem & {
  preview?: ComponentPreview;
};

export type ComponentEntryWithCategorySlug = ComponentEntry & {
  categorySlug: string;
};

export type CategoryEntry = {
  slug: string;
  name: string;
  description?: string;
  components: ComponentEntry[];
};

export const registry: CategoryEntry[] = [
  {
    name: "Components",
    slug: "components",
    components: [
      {
        name: "magnetic-button",
        type: "registry:component",
        title: "Magnetic Button",
        description: "A button with magnet effect on hover",
        dependencies: ["motion"],
        files: [
          {
            path: "registry/components/magnetic-button/magnetic-button.tsx",
            type: "registry:component",
            target: "@components/magnetic-button.tsx",
          },
        ],
      },
    ],
  },
];

// ---- Derived helpers ----

/** Flat list of every component across all categories — for registry generation, search, lookups. */
export function getAllComponents(): ComponentEntryWithCategorySlug[] {
  return registry.flatMap((cat) =>
    cat.components.map((c) => ({ ...c, categorySlug: cat.slug })),
  );
}

/** Look up a single entry by name, across all categories. */
export function getComponentByName(name: string) {
  return getAllComponents().find((c) => c.name === name);
}

/** All entries that have a preview defined. */
export function getPreviewableComponents() {
  return getAllComponents().filter(
    (
      c,
    ): c is ComponentEntryWithCategorySlug & {
      preview: ComponentPreview;
    } => !!c.preview,
  );
}
