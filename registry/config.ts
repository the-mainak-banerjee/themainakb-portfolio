import { getItemDocumentationUrl, getRegistryItemUrl } from "@/lib/registry";
import { Copy, LucideIcon, Magnet, Share2, Terminal } from "lucide-react";
import dynamic from "next/dynamic";
import { ComponentType } from "react";
import { RegistryItem } from "shadcn/schema";


export const COMPONENT_SUB_CATEGORIES = {
  button: "Button",
  navigation: "Navigation",
  overlay: "Overlay",
  form: "Form",
  feedback: "Feedback",
  layout: "Layout",
  utility: "Utility",
} as const;

export type ComponentSubCategory =
  (typeof COMPONENT_SUB_CATEGORIES)[keyof typeof COMPONENT_SUB_CATEGORIES];

export type ComponentPreview = {
  component: ComponentType;
  description?: string;
};

export type ComponentEntry = RegistryItem & {
  catalog: {
    preview?: ComponentPreview;
    propTypes?: string[];
    publishedAt: Date;
    subCategory: ComponentSubCategory;
    icon: LucideIcon
  };
};

export type ComponentWithStatus = ComponentEntry & {
  isNew: boolean;
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
        description: "A button with magnet effect on hover.",
        dependencies: ["motion"],
        files: [
          {
            path: "registry/components/magnetic-button/magnetic-button.tsx",
            type: "registry:component",
            target: "@components/magnetic-button.tsx",
          },
        ],
        docs: getItemDocumentationUrl(
          "magnetic-button",
          CATEGORY_SLUGS.components,
        ),
        catalog: {
          publishedAt: new Date("2026-07-04"),
          subCategory: COMPONENT_SUB_CATEGORIES.button,
          propTypes: ["MagneticButtonProps"],
          icon: Magnet,
          preview: {
            component: dynamic(
              () => import("@/registry/previews/magnetic-button-demo"),
            ),
          },
        },
      },
      {
        name: "copy-button",
        type: "registry:component",
        title: "Copy Button",
        description:
          "A customizable copy-to-clipboard button with animated feedback and optional tooltip support.",
        dependencies: ["motion"],
        registryDependencies: ["tooltip"],
        files: [
          {
            path: "registry/components/copy-button/copy-button.tsx",
            type: "registry:component",
            target: "@components/copy-button.tsx",
          },
        ],
        docs: getItemDocumentationUrl("copy-button", CATEGORY_SLUGS.components),
        catalog: {
          publishedAt: new Date("2026-07-10"),
          subCategory: COMPONENT_SUB_CATEGORIES.button,
          propTypes: ["CopyButtonProps"],
          icon: Copy,
          preview: {
            component: dynamic(
              () => import("@/registry/previews/copy-button-demo"),
            ),
          },
        },
      },
      {
        name: "package-manager-command",
        type: "registry:ui",
        title: "Package Manager Command",
        description:
          "Display npm, pnpm, Yarn, and Bun install commands with animated switching and one-click copy.",
        dependencies: ["motion", "jotai"],
        registryDependencies: ["tabs", getRegistryItemUrl("copy-button")],
        files: [
          {
            path: "registry/components/package-manager-command/package-manager-command.tsx",
            type: "registry:component",
            target: "@components/package-manager-command.tsx",
          },
        ],
        docs: getItemDocumentationUrl(
          "package-manager-command",
          CATEGORY_SLUGS.components,
        ),
        catalog: {
          publishedAt: new Date("2026-07-10"),
          subCategory: COMPONENT_SUB_CATEGORIES.utility,
          propTypes: ["PackageManagerCommandProps"],
          icon: Terminal,
          preview: {
            component: dynamic(
              () => import("@/registry/previews/package-manager-command-demo"),
            ),
          },
        },
      },
      {
        name: "share-menu",
        type: "registry:ui",
        title: "Share Menu",
        description:
          "An animated share menu for React and Next.js with social sharing, copy link, native Web Share API support, and customizable animations.",
        dependencies: ["motion", "jotai", "sonner", "lucide-react"],
        registryDependencies: ["dropdown-menu"],
        files: [
          {
            path: "registry/components/share-menu/share-menu.tsx",
            type: "registry:component",
            target: "@components/share-menu.tsx",
          },
        ],
        docs: getItemDocumentationUrl("share-menu", CATEGORY_SLUGS.components),
        catalog: {
          publishedAt: new Date("2026-07-10"),
          subCategory: COMPONENT_SUB_CATEGORIES.navigation,
          propTypes: ["ShareMenuProps"],
          icon: Share2,
          preview: {
            component: dynamic(
              () => import("@/registry/previews/share-menu-demo"),
            ),
          },
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

/** All components belonging to a single category, by slug. */
export function getComponentsByCategory(categorySlug: string): ComponentEntry[] {
  return registry.find((c) => c.slug === categorySlug)?.components ?? [];
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
    } => !!c.catalog.preview,
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
