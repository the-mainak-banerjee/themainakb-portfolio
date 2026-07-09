import { cn } from "@/lib/utils";

export function Steps({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "[&>h4]:step steps mb-8 ml-4 border-l pl-6 [counter-reset:step]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Step({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h4
      className={cn(
        "mt-8 mb-2 scroll-m-20 text-base font-medium tracking-tight",
        "[counter-increment:step]",
        "before:bg-muted before:text-muted-foreground before:border-border",
        "before:absolute before:-ml-10.25 before:flex before:size-7 before:items-center",
        "before:justify-center before:rounded-full before:border before:text-sm",
        "before:content-[counter(step)]",
        "relative",
        className,
      )}
    >
      {children}
    </h4>
  );
}
