"use client";

import { CopyButton } from "@/registry/components/copy-button";

function DemoSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-border bg-card flex w-full max-w-md flex-col gap-3 rounded-lg border p-4">
      <div className="space-y-1">
        <h3 className="text-foreground text-sm font-medium">{title}</h3>
        {description && (
          <p className="text-muted-foreground text-xs">{description}</p>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  );
}

export default function CopyButtonDemo() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-6 p-8 not-prose">
      <DemoSection
        title="Icon only"
        description="Compact, ideal for inline code blocks or toolbars"
      >
        <CopyButton value="npm install motion" />
      </DemoSection>

      <DemoSection
        title="With label"
        description="Shows text alongside the icon, animates width on state change"
      >
        <CopyButton
          value="npm install motion"
          buttonText="Copy command"
          copiedText="Copied Successfully!"
        />
      </DemoSection>
    </div>
  );
}
