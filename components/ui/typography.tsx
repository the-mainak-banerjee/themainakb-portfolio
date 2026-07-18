import { ElementType, ReactNode } from "react";
import { Link as LinkIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "body"
  | "body-lg"
  | "body-sm"
  | "caption"
  | "caption-sm"
  | "label";

export type TypographyProps<T extends ElementType = "p"> = {
  variant?: TypographyVariant;
  as?: T;
  children?: ReactNode;
  className?: string;
  allowProse?: boolean
} & React.ComponentPropsWithoutRef<T>;

const variants: Record<TypographyVariant, string> = {
  h1: `
    font-mono
    text-2xl
    md:text-3xl
    lg:text-4xl
    font-medium
    tracking-tight
    leading-tight
  `,

  h2: `
    font-mono
    text-xl
    md:text-2xl
    lg:text-3xl
    font-medium
    tracking-tight
    leading-tight
  `,

  h3: `
    font-mono
    text-lg
    md:text-xl
    lg:text-2xl
    font-medium
    leading-tight
  `,

  h4: `
    font-mono
    text-base
    md:text-lg
    lg:text-xl
    font-medium
    leading-tight
  `,

  body: `
    font-geist-sans
    text-base
    md:text-lg
    leading-7
    text-foreground
  `,

  "body-lg": `
    font-geist-sans
    text-lg
    md:text-xl
    leading-8
    text-foreground
  `,

  "body-sm": `
    font-geist-sans
    text-sm
    md:text-base
    leading-6
    text-muted-foreground
  `,

  caption: `
    font-geist-sans
    text-xs
    md:text-sm
    leading-5
    text-muted-foreground
  `,

  "caption-sm": `
    text-muted-foreground
    font-mono
    text-xs
    tracking-widest
    uppercase
  `,

  label: `
    font-geist-sans
    text-xs
    font-medium
    tracking-wide
    uppercase
  `,
};

export function Typography<T extends ElementType = "p">({
  variant = "body",
  as,
  className,
  allowProse,
  children,
  ...props
}: TypographyProps<T>) {
  const Component =
    as ||
    ({
      h1: "h1",
      h2: "h2",
      h3: "h3",
      h4: "h4",
      body: "p",
      "body-lg": "p",
      "body-sm": "p",
      caption: "span",
      "caption-sm": "span",
      label: "span",
    }[variant] as ElementType);

  const id = (props as { id?: string }).id;
  const isHeading = ["h1", "h2", "h3", "h4"].includes(variant);

  return (
    <Component
      className={cn(
        variants[variant],
        className,
        allowProse ? "" : "not-prose",
      )}
      {...props}
    >
      {isHeading && id ? (
        <a
          href={`#${id}`}
          className="group inline-flex scroll-mt-24 items-center gap-2 hover:underline hover:underline-offset-4"
        >
          <span>{children}</span>

          <LinkIcon className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
        </a>
      ) : (
        children
      )}
    </Component>
  );
}
