import { codeToHtml } from "shiki";

export async function CodeBlock({
  code,
  lang = "tsx",
}: {
  code: string;
  lang?: string;
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
      className="overflow-x-auto rounded-md border text-sm [&_pre]:bg-transparent! bg-card [&>pre]:p-4"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
