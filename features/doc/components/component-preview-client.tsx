"use client";
import PreviewFrame from "@/components/global/preview-frame";
import { getRegistryItemByName } from "@/registry/config";
import React from "react";

export interface ComponentPreviewClientProps {
  name: string;
  children: React.ReactNode; // the rendered source view
  code: string | null;
}

function ComponentPreviewClient({
  name,
  children,
  code,
}: ComponentPreviewClientProps) {
  const componentDetails = getRegistryItemByName(name);

  if (!componentDetails) {
    return (
      <p className="text-muted-foreground text-sm">
        Component {name} not found in registry.
      </p>
    );
  }

  const Preview = componentDetails.catalog?.preview?.component;

  return (
    <PreviewFrame
      preview={
        Preview ? (
          <Preview />
        ) : (
          <div className="flex w-full items-center justify-center">
            <p className="text-muted-foreground text-sm">
              Component {componentDetails.title} not found in registry.
            </p>
          </div>
        )
      }
      code={code}
      sourceView={children}
    />
  );
}

export default ComponentPreviewClient;
