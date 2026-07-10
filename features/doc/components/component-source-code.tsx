import { getComponentByName } from "@/registry/config";
import { CodeBlock } from "@/components/global/code-block";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { FileCodeIcon } from "lucide-react";
import CopyButton from "@/components/global/copy-button";
import { getComponentSourceCode } from "../data/documents";

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

  let code
  try {
    code = getComponentSourceCode(filePath)
  } catch {
    return (
      <Typography variant="body-sm">File not found: {filePath}</Typography>
    );
  }

  const showHeader = Boolean(title) || collapsible;

  return (
    <Collapsible
      defaultOpen={!collapsible}
      className={cn(
        "group/collapsible border-border bg-muted text-card-foreground",
        "relative w-full overflow-hidden rounded-md border",
      )}
    >
      {showHeader && (
        <div className="flex justify-between px-4 py-2.5 md:items-center">
          {title ? (
            <div className="text-muted-foreground flex gap-1 font-mono text-sm">
              <FileCodeIcon size={14} className="mt-1" />
              <span>{title}</span>
            </div>
          ) : (
            <span />
          )}

          <div className="flex items-center z-60">
            {collapsible && (
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground h-auto px-2 py-1 text-xs"
                >
                  <span className="hidden group-data-[state=closed]/collapsible:inline">
                    Expand
                  </span>
                  <span className="hidden group-data-[state=open]/collapsible:inline">
                    Collapse
                  </span>
                </Button>
              </CollapsibleTrigger>
            )}
            {collapsible && (
              <div className="h-4 w-0.5 bg-border" aria-hidden="true" />
            )}
            <CopyButton
              value={code!}
              className="border-0 bg-transparent hover:bg-transparent"
            />
          </div>
        </div>
      )}

      <CollapsibleContent
        className={cn(
          showHeader && "border-border border-t",
          "relative overflow-hidden",
          collapsible && "data-[state=closed]:max-h-80",
          "data-[state=closed]:overflow-y-hidden",
          "overflow-y-auto [&::-webkit-scrollbar]:hidden",
        )}
        forceMount
      >
        {code && (
          <CodeBlock
            code={code}
            lang={lang}
            className="rounded-none border-0"
            allowCopy={!showHeader}
          />
        )}
      </CollapsibleContent>

      {collapsible && (
        <div className="absolute inset-x-0 bottom-0 flex h-24 items-center justify-center group-data-[state=open]/collapsible:hidden">
          <div className="from-background pointer-events-none absolute inset-0 bg-linear-to-t to-transparent mask-[linear-gradient(to_top,black_50%,transparent_100%)] backdrop-blur-[1px]" />

          <CollapsibleTrigger asChild>
            <Button
              variant="secondary"
              className="border-border text-muted-foreground relative rounded-md"
            >
              View Code
            </Button>
          </CollapsibleTrigger>
        </div>
      )}
    </Collapsible>
  );
}

export default ComponentSourceCode;
