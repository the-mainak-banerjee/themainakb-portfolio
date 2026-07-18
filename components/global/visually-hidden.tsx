export function VisuallyHidden({
  as: Component = "span",
  children,
  ...props
}: {
  as?: React.ElementType;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>) {
  return (
    <Component className="sr-only" {...props}>
      {children}
    </Component>
  );
}
