import fs from "node:fs/promises";
import path from "node:path";
import { getComponentByName } from "@/registry/config";
import { cn } from "@/lib/utils";
import { CodeBlock } from "@/components/global/code-block";

type ComponentSourceCodeProps = {
  /** Look up the file path from the registry by component name. */
  name?: string;
  /** Or point directly at a file, relative to the project root. */
  src?: string;
  /** Optional header shown above the code, e.g. "components/line-nav.tsx" */
  title?: string;
  /** Cap the height and fade the bottom edge for long files. Default: true */
  collapsible?: boolean;
  lang?: string;
};

export async function ComponentSourceCode({
  name,
  src,
  title,
  collapsible = true,
  lang = "tsx",
}: ComponentSourceCodeProps) {
 const filePath = src ?? getComponentByName(name ?? "")?.files?.[0]?.path;

 if (!filePath) {
   return (
     <p className="text-muted-foreground text-sm">
       Could not resolve source for &quot;{name ?? src}&quot;.
     </p>
   );
 }

 let code: string;
 try {
   code = await fs.readFile(path.join(process.cwd(), filePath), "utf-8");
 } catch {
   return (
     <p className="text-muted-foreground text-sm">File not found: {filePath}</p>
   );
 }

  return (
    <div className="my-6 overflow-hidden rounded-md border">
      {title && (
        <div className="text-muted-foreground bg-muted border-b px-4 py-2 font-mono text-xs">
          {title}
        </div>
      )}
      <div
        className={cn(
          "relative",
          collapsible &&
            "max-h-125 overflow-y-auto [&:not(:hover)::after]:opacity-100",
        )}
      >
        {code && <CodeBlock code={code} lang={lang} />}
      </div>
    </div>
  );
}
