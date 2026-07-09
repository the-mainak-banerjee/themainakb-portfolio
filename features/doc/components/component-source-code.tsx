import fs from "node:fs/promises";
import path from "node:path";
import { getComponentByName } from "@/registry/config";
import { CodeBlock } from "@/components/global/code-block";
import { Typography } from "@/components/ui/typography";
import { File } from "lucide-react";
import CollapsableBlock from "@/components/global/collapsable-block";

type ComponentSourceCodeProps = {
  /** Look up the file path from the registry by component name. */
  name?: string;
  /** Or point directly at a file, relative to the project root. */
  src?: string;
  /** Optional header shown above the code, e.g. "components/magnetic-button.tsx" */
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
  if (!name && !src) {
    return (
      <Typography variant="body-sm">
        Please provide either the name of a component or the src of a component
        file relative to project root.
      </Typography>
    );
  }
  const filePath = src ?? getComponentByName(name ?? "")?.files?.[0]?.path;

  if (!filePath) {
    return (
      <Typography variant="body-sm">
        Could not resolve source for &quot;{name ?? src}&quot;.
      </Typography>
    );
  }

  let code: string;
  try {
    code = await fs.readFile(path.join(process.cwd(), filePath), "utf-8");
  } catch {
    return (
      <Typography variant="body-sm">File not found: {filePath}</Typography>
    );
  }

  return (
    <div className="border-border bg-muted text-card-foreground w-full overflow-hidden rounded-md border">
      <div className="flex items-center justify-between px-4 py-2.5">
        {title && (
          <div className="text-muted-foreground flex items-center gap-1 font-mono text-sm">
            <File size={12} />
            {title}
          </div>
        )}
        {/* ToDo_Copy */}
      </div>
      <CollapsableBlock defaultOpen={!collapsible}>
        {code && (
          <CodeBlock
            code={code}
            lang={lang}
            className="rounded-none border-0"
          />
        )}
      </CollapsableBlock>
    </div>
  );
}
