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
        "md:ml-4 md:pl-6.5 md:border-l [counter-reset:step] space-y-8",
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
        "mb-2 scroll-m-20 text-base font-medium tracking-tight ml-10 md:ml-0",
        "[counter-increment:step]",
        "before:bg-muted before:text-muted-foreground before:border-border",
        "before:absolute before:-ml-10 before:-mt-0.5 before:flex before:size-7 before:items-center",
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
