import { CodeBlock } from "@/components/global/code-block";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { FileCodeIcon } from "lucide-react";
import CopyButton from "@/components/global/copy-button";

export type SourceCodeViewerProps = {
  /** The raw source code to display */
  code: string;
  /** Optional header shown above the code, e.g. "components/magnetic-button.tsx" */
  title?: string;
  /** Cap the height and fade the bottom edge for long files. Default: true */
  collapsible?: boolean;
  lang?: string;
};

export function SourceCodeViewer({
  code,
  title,
  collapsible = true,
  lang = "tsx",
}: SourceCodeViewerProps) {
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

          <div className="z-60 flex items-center">
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
              <div className="bg-border h-4 w-0.5" aria-hidden="true" />
            )}
            <CopyButton
              value={code}
              className="border-0 bg-transparent hover:bg-transparent"
            />
          </div>
        </div>
      )}

      <CollapsibleContent
        className={cn(
          showHeader && "border-border border-t",
          "relative overflow-hidden max-h-150",
          collapsible && "data-[state=closed]:max-h-80",
          "data-[state=closed]:overflow-y-hidden",
          "overflow-y-auto [&::-webkit-scrollbar]:hidden",
        )}
        forceMount
      >
        <CodeBlock
          code={code}
          lang={lang}
          className="rounded-none border-0"
          allowCopy={!showHeader}
        />
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

export default SourceCodeViewer;
