import { getItemDocumentationUrl, getRegistryItemUrl } from "@/lib/registry";
import { Copy, LucideIcon, Magnet, Share2, Terminal } from "lucide-react";
import dynamic from "next/dynamic";
import { ComponentType } from "react";
import { RegistryItem } from "shadcn/schema";


export const REGISTRY_ITEM_SUB_CATEGORIES = {
  button: "Button",
  navigation: "Navigation",
  overlay: "Overlay",
  form: "Form",
  feedback: "Feedback",
  layout: "Layout",
  utility: "Utility",
} as const;

export type RegistryItemSubCategory =
  (typeof REGISTRY_ITEM_SUB_CATEGORIES)[keyof typeof REGISTRY_ITEM_SUB_CATEGORIES];

export type RegistryItemPreview = {
  component: ComponentType;
  description?: string;
};

export type RegistryItemEntry = RegistryItem & {
  catalog: {
    preview?: RegistryItemPreview;
    propTypes?: string[];
    publishedAt: Date;
    subCategory: RegistryItemSubCategory;
    icon: LucideIcon
  };
};

export type RegistryItemWithStatus = RegistryItemEntry & {
  isNew: boolean;
};

export type RegistryItemEntryWithRegistryTypeSlug = RegistryItemEntry & {
  registryTypeSlug: string;
};

export type RegistryTypeEntry = {
  slug: string;
  name: string;
  description?: string;
  components: RegistryItemEntry[];
};

type RegistryItemNavigation = {
  previous: RegistryTypeEntry["components"][number] | null;
  next: RegistryTypeEntry["components"][number] | null;
};


export const REGISTRY_TYPES = {
  components: "Components",
};

export const REGISTRY_TYPE_SLUGS = {
  components: "components",
};

export const registry: RegistryTypeEntry[] = [
  {
    name: REGISTRY_TYPES.components,
    slug: REGISTRY_TYPE_SLUGS.components,
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
          REGISTRY_TYPE_SLUGS.components,
        ),
        catalog: {
          publishedAt: new Date("2026-07-04"),
          subCategory: REGISTRY_ITEM_SUB_CATEGORIES.button,
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
        docs: getItemDocumentationUrl("copy-button", REGISTRY_TYPE_SLUGS.components),
        catalog: {
          publishedAt: new Date("2026-07-10"),
          subCategory: REGISTRY_ITEM_SUB_CATEGORIES.button,
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
          REGISTRY_TYPE_SLUGS.components,
        ),
        catalog: {
          publishedAt: new Date("2026-07-10"),
          subCategory: REGISTRY_ITEM_SUB_CATEGORIES.utility,
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
        docs: getItemDocumentationUrl("share-menu", REGISTRY_TYPE_SLUGS.components),
        catalog: {
          publishedAt: new Date("2026-07-10"),
          subCategory: REGISTRY_ITEM_SUB_CATEGORIES.navigation,
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

/** Flat list of every registry item across all categories — for registry generation, search, lookups. */
export function getAllRegistryItems(): RegistryItemEntryWithRegistryTypeSlug[] {
  return registry.flatMap((cat) =>
    cat.components.map((c) => ({ ...c, registryTypeSlug: cat.slug })),
  );
}

/** All registry items belonging to a single registry type, by slug. */
export function getRegistryItemByRegistryType(registryTypeSlug: string): RegistryItemEntry[] {
  return registry.find((c) => c.slug === registryTypeSlug)?.components ?? [];
}

/** Look up a single entry by name, across all categories. */
export function getRegistryItemByName(name: string) {
  return getAllRegistryItems().find((c) => c.name === name);
}

/** All entries that have a preview defined. */
export function getPreviewableRegistryItems() {
  return getAllRegistryItems().filter(
    (
      c,
    ): c is RegistryItemEntryWithRegistryTypeSlug & {
      preview: RegistryItemPreview;
    } => !!c.catalog.preview,
  );
}

export function getRegistryItemNavigation(
  registryTypeSlug: RegistryTypeEntry["slug"],
  itemName: string,
): RegistryItemNavigation {
  const category = registry.find((category) => category.slug === registryTypeSlug);

  if (!category) {
    return {
      previous: null,
      next: null,
    };
  }

  const index = category.components.findIndex(
    (component) => component.name === itemName,
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
