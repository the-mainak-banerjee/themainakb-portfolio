import { CodeBlock } from "@/components/global/code-block";
import * as React from "react";

/**
 * Pulls the raw code string + language out of the <code> element MDX
 * generates for a fenced block, e.g.:
 *
 *   ```tsx
 *   const x = 1;
 *   ```
 *
 * compiles to:
 *   <pre><code className="language-tsx">const x = 1;\n</code></pre>
 */
function extractCodeProps(children: React.ReactNode) {
  if (
    React.isValidElement(children) &&
    typeof children.props === "object" &&
    children.props !== null
  ) {
    const props = children.props as {
      className?: string;
      children?: React.ReactNode;
    };

    const match = /language-(\w+)/.exec(props.className ?? "");
    const lang = match?.[1] ?? "tsx";
    const code = String(props.children ?? "").replace(/\n$/, "");

    return { code, lang };
  }

  return { code: "", lang: "tsx" };
}

/**
 * Drop-in replacement for the default `pre` tag. Every ```tsx fenced block
 * in any .mdx file now renders through the same styled, shiki-highlighted
 * CodeBlock as <ComponentSource> — no manual JSX needed per doc.
 */
export async function Pre({ children }: { children: React.ReactNode }) {
  const { code, lang } = extractCodeProps(children);

  if (!code) {
    // Fallback for anything that isn't a recognizable fenced code block.
    return <pre className="not-prose">{children}</pre>;
  }

  return <CodeBlock code={code} lang={lang} allowCopy={true} />;
}

