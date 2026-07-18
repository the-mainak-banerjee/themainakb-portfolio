import { AutoTypeTable as FumaAutoTypeTable } from "fumadocs-typescript/ui";
import { createGenerator } from "fumadocs-typescript";
import path from "node:path";

const generator = createGenerator();

/**
 * <AutoTypeTable path="src/registry/components/line-nav/line-nav.tsx" name="LineNavProps" />
 *
 * Reads the exported type/interface directly from your source file and
 * renders a props table (name, type, default, description from JSDoc).
 * No manual table maintenance — if the prop changes, the doc updates itself.
 *
 * Install: npm install fumadocs-typescript twoslash-lens (peer: typescript)
 */
export function AutoTypeTable({
  path: filePath,
  name,
}: {
  path: string;
  name: string;
}) {
  return (
    <FumaAutoTypeTable
      generator={generator}
      path={path.join(process.cwd(), filePath)}
      name={name}
    />
  );
}
