import React from "react";
import { getComponentByName, type ComponentPreview } from "@/registry/config";
import { getPreviewComponentCode } from "@/features/doc/data/documents";
import { CodeBlock } from "./code-block";

function ComponentPreview({ name }: { name: string }) {
  const componentDetails = getComponentByName(name);

  if (!componentDetails) {
    return (
      <p className="text-muted-foreground text-sm">
        Component {name} not found in registry.
      </p>
    );
  }

  const Preview = componentDetails?.preview?.component;
  const code = getPreviewComponentCode(name)

  return (
    <div>
      {Preview ? (
        <React.Suspense
          fallback={
            <div className="text-muted-foreground flex items-center justify-center text-sm">
              Loading…
            </div>
          }
        >
          <Preview />
        </React.Suspense>
      ) : (
        <p className="text-muted-foreground text-sm">
          Component {componentDetails?.title} not found in registry.
        </p>
      )}
      {code && <CodeBlock code={code} />}
    </div>
  );
}

export default ComponentPreview;
