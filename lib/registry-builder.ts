import fs from "fs";
import path from "path";
import { registryItemSchema } from "shadcn/schema";
import type { RegistryItem } from "shadcn/schema";
import { getAllComponents, getComponentByName } from "@/registry/config";

const ROOT = process.cwd();
const REGISTRY_NAME = "themainakb";
const REGISTRY_HOMEPAGE =
  "https://develop-themainakb-portfolio.vercel.app/labs";

export class RegistryItemNotFoundError extends Error {
  constructor(name: string) {
    super(`Registry item "${name}" was not found.`);
    this.name = "RegistryItemNotFoundError";
  }
}

function toRegistryItem(
  entry: ReturnType<typeof getAllComponents>[number],
): RegistryItem {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { preview, categorySlug, propTypes, ...item } = entry;
  return item;
}

function withFileContents(item: RegistryItem): RegistryItem {
  return {
    ...item,
    files: item.files?.map((file) => {
      const fullPath = path.join(ROOT, file.path);
      const content = fs.readFileSync(fullPath, "utf-8");
      return { ...file, content };
    }),
  };
}

/** Validates a single item using shadcn's own schema */
function assertValid(item: RegistryItem, context: string) {
  const result = registryItemSchema.safeParse(item);
  if (!result.success) {
    const messages = result.error.issues
      .map((i) => `${i.path.join(".")}: ${i.message}`)
      .join("; ");
    throw new Error(`"${context}" failed schema validation: ${messages}`);
  }
}

export function buildRegistry() {
  const items = getAllComponents().map(toRegistryItem);
  items.forEach((item) => assertValid(item, item.name));

  return {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: REGISTRY_NAME,
    homepage: REGISTRY_HOMEPAGE,
    items,
  };
}

export function buildRegistryItem(name: string): RegistryItem {
  const entry = getComponentByName(name);
  if (!entry) {
    throw new RegistryItemNotFoundError(name);
  }

  const item = toRegistryItem(entry);
  assertValid(item, name);

  return withFileContents(item);
}
