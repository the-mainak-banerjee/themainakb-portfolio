import { cache } from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { getComponentByName } from "@/registry/config";
import { ComponentDoc } from "../types/document";

const CONTENT_ROOT = path.join(process.cwd(), "features/doc/content");
const PREVIEW_ROOT = path.join(process.cwd(), "registry/previews");
const IMPORT_ALIASES = {
  "@/registry/components/": "@/components/",
  "@/registry/hooks/": "@/hooks/",
  "@/registry/lib/": "@/lib/",
  "@/registry/ui/": "@/components/ui/",
};

export const getComponentDoc = cache((name: string): ComponentDoc | null => {
  const entry = getComponentByName(name);
  if (!entry) return null;

  const filePath = path.join(CONTENT_ROOT, entry.categorySlug, `${name}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { content, data } = matter(raw);

  return { content, frontmatter: data, ...entry };
});

function transformImports(source: string) {
  for (const [from, to] of Object.entries(IMPORT_ALIASES)) {
    source = source.replaceAll(from, to);
  }

  return source;
}

const getFile = (filePath: string) => {
  try {
    if (!fs.existsSync(filePath)) return null;
    const source = fs.readFileSync(filePath, "utf8");
    return transformImports(source);
  } catch (error) {
    throw new Error(`Failed to read the file: ${filePath}`, { cause: error });
  }
};

export function getPreviewComponentCode(name: string) {
  try {
    const filePath = path.join(PREVIEW_ROOT, `${name}-demo.tsx`);
    return getFile(filePath);
  } catch (error) {
    throw new Error(`Missing source file: ${name}`, { cause: error });
  }
}

export function getComponentSourceCode(filePath: string) {
  try {
    const fullFilePath = path.join(process.cwd(), filePath);
    return getFile(fullFilePath);
  } catch (error) {
    throw new Error(`Missing source file: ${name}`, { cause: error });
  }
}