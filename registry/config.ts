import dynamic from "next/dynamic";
import { ComponentType } from "react";
import { RegistryItem } from "shadcn/schema";

export type ComponentPreview = {
  component: ComponentType;
  description?: string;
};

export type ComponentEntry = RegistryItem & {
  preview?: ComponentPreview;
  propTypes?: string[]
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

type ComponentNavigation = {
  previous: CategoryEntry["components"][number] | null;
  next: CategoryEntry["components"][number] | null;
};

export const CATEGORY_NAMES = {
  components: "Components",
};

export const CATEGORY_SLUGS = {
  components: "components",
};


export const registry: CategoryEntry[] = [
  {
    name: CATEGORY_NAMES.components,
    slug: CATEGORY_SLUGS.components,
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
        propTypes:["MagneticButtonProps"],
        preview: {
          component: dynamic(
            () => import("@/registry/previews/magnetic-button-demo"),
          ),
        },
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


export function getComponentNavigation(
  categorySlug: CategoryEntry["slug"],
  componentName: string,
): ComponentNavigation {
  const category = registry.find((category) => category.slug === categorySlug);

  if (!category) {
    return {
      previous: null,
      next: null,
    };
  }

  const index = category.components.findIndex(
    (component) => component.name === componentName,
  );

  if (index === -1) {
    return {
      previous: null,
      next: null,
    };
  }

  return {
    previous: category.components[index - 1] ?? null,
    next: category.components[index + 1] ?? null,
  };
}