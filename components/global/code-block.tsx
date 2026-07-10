import { cn } from "@/lib/utils";
import { codeToHtml } from "shiki";
import CopyButton from "./copy-button";

export async function CodeBlock({
  code,
  lang = "tsx",
  className,
  allowCopy,
}: {
  code: string;
  lang?: string;
  className?: string;
  allowCopy?: boolean;
}) {
  const html = await codeToHtml(code, {
    lang,
    themes: {
      light: "min-light",
      dark: "nord",
    },
  });

  return (
    <div className="group relative">
      <div
        className={cn(
          "bg-card not-prose overflow-x-auto rounded-md border text-sm [&_pre]:bg-transparent! [&::-webkit-scrollbar]:hidden [&>pre]:p-4",
          className,
        )}
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {allowCopy && (
        <CopyButton
          value={code}
          className="absolute top-2 right-2 border-0 bg-transparent opacity-0 group-hover:opacity-100 hover:bg-transparent"
        />
      )}
    </div>
  );
}
