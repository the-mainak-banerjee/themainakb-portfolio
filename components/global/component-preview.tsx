import React from "react";
import { getPreviewComponentCode } from "@/features/doc/data/documents";
import { CodeBlock } from "./code-block";
import ComponentPreviewClient from "./component-preview-client";

function ComponentPreview({ name }: { name: string }) {
  
  const code = getPreviewComponentCode(name);

  return (
    <ComponentPreviewClient name={name} code={code}>
      {code && <CodeBlock code={code} className="border-0 rounded-none bg-transparent"/>}
    </ComponentPreviewClient>
  );
}

export default ComponentPreview;
