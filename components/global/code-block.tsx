import { cn } from "@/lib/utils";
import { codeToHtml } from "shiki";

export async function CodeBlock({
  code,
  lang = "tsx",
  className,
}: {
  code: string;
  lang?: string;
  className?: string;
}) {
  const html = await codeToHtml(code, {
    lang,
    themes: {
      light: "min-light",
      dark: "nord",
    },
  });

  return (
    <div
      className={cn(
        "bg-card overflow-x-auto rounded-md border text-sm [&_pre]:bg-transparent! [&::-webkit-scrollbar]:hidden [&>pre]:p-4",
        className,
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
