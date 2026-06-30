import { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "body"
  | "body-lg"
  | "body-sm"
  | "caption"
  | "label";

type TypographyProps<T extends ElementType = "p"> = {
  variant?: TypographyVariant;
  as?: T;
  children: ReactNode;
  className?: string;
} & React.ComponentPropsWithoutRef<T>;

const variants: Record<TypographyVariant, string> = {
  h1: `
    font-mono
    text-4xl
    md:text-5xl
    lg:text-7xl
    font-medium
    tracking-tight
    leading-[0.95]
  `,

  h2: `
    font-mono
    text-3xl
    md:text-4xl
    lg:text-5xl
    font-medium
    tracking-tight
    leading-tight
  `,

  h3: `
    font-mono
    text-2xl
    md:text-3xl
    lg:text-4xl
    font-medium
    leading-tight
  `,

  h4: `
    font-mono
    text-xl
    md:text-2xl
    lg:text-3xl
    font-medium
    leading-tight
  `,

  h5: `
    font-mono
    text-lg
    md:text-xl
    lg:text-2xl
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

  label: `
    font-geist-sans
    text-sm
    font-medium
    tracking-wide
    uppercase
  `,
};

export function Typography<T extends ElementType = "p">({
  variant = "body",
  as,
  className,
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
      h5: "h5",
      body: "p",
      "body-lg": "p",
      "body-sm": "p",
      caption: "span",
      label: "span",
    }[variant] as ElementType);

  return (
    <Component className={cn(variants[variant], className)} {...props}>
      {children}
    </Component>
  );
}
