import { getRegistryItemByName } from "@/registry/config";
import { Typography } from "@/components/ui/typography";
import { getComponentSourceCode } from "../data/documents";
import SourceCodeViewer from "@/components/global/source-code-viewer";

type ComponentSourceCodeProps = {
  /** Look up the file path from the registry by component name. */
  name?: string;
  /** Or point directly at a file, relative to the project root. */
  src?: string;
  /** Optional header shown above the code, e.g. "components/magnetic-button.tsx" */
  title?: string;
  /** Cap the height and fade the bottom edge for long files. Default: true */
  collapsible?: "true" | "false";
  lang?: string;
};

export async function ComponentSourceCode({
  name,
  src,
  title,
  collapsible = "true",
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

  const filePath = src ?? getRegistryItemByName(name ?? "")?.files?.[0]?.path;

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

   if (!code) {
     return (
       <Typography variant="body-sm">File not found: {filePath}</Typography>
     );
   }

   return (
     <SourceCodeViewer
       code={code}
       title={title}
       collapsible={collapsible === "true"}
       lang={lang}
     />
   );
}

export default ComponentSourceCode;
