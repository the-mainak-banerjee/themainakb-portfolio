"use client";
import * as React from "react";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export type PackageManager = "pnpm" | "yarn" | "npm" | "bun";

export const packageManagerAtom = atomWithStorage<PackageManager>(
  "preferred-package-manager",
  "pnpm",
  undefined,
  { getOnInit: true }, // read localStorage synchronously on mount, avoids a flash
);

function IconBadge({
  bg,
  textClassName,
  children,
}: {
  bg: string;
  textClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "flex size-3.5 shrink-0 items-center justify-center rounded-[3px] text-[8px] leading-none font-bold",
        textClassName,
      )}
      style={{ backgroundColor: bg }}
    >
      {children}
    </span>
  );
}

const packageManagers: {
  id: PackageManager;
  label: string;
  icon: React.ReactNode;
}[] = [
  {
    id: "pnpm",
    label: "pnpm",
    icon: (
      <IconBadge bg="#F9AD00" textClassName="text-neutral-900">
        p
      </IconBadge>
    ),
  },
  {
    id: "yarn",
    label: "yarn",
    icon: (
      <IconBadge bg="#2C8EBB" textClassName="text-white">
        y
      </IconBadge>
    ),
  },
  {
    id: "npm",
    label: "npm",
    icon: (
      <IconBadge bg="#CB3837" textClassName="text-white">
        n
      </IconBadge>
    ),
  },
  {
    id: "bun",
    label: "bun",
    icon: (
      <IconBadge bg="#FBF0DF" textClassName="text-neutral-900">
        b
      </IconBadge>
    ),
  },
];

export type PackageManagerCommandsList = Record<PackageManager, string>;

type VariantCustom = {
  direction: number;
  axis: "x" | "y";
};

// Slide direction depends on whether the newly selected tab sits to the
// right or left of the previously selected one in `packageManagers`.
const commandVariants: Variants = {
  hidden: ({ direction, axis }: VariantCustom) => {
    const offset = direction > 0 ? 10 : -10;

    return {
      opacity: 0,
      x: axis === "x" ? offset : 0,
      y: axis === "y" ? offset : 0,
      filter: "blur(10px)",
    };
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.16, ease: "easeOut" },
  },
  exit: ({ direction, axis }: VariantCustom) => {
    const offset = direction > 0 ? 20 : -20;

    return {
      opacity: 0,
      x: axis === "x" ? offset : 0,
      y: axis === "y" ? offset : 0,
      filter: "blur(10px)",
      transition: { duration: 0.12, ease: "easeIn" },
    };
  },
};

export type PackageManagerCommandProps = {
  /** Command string per package manager. */
  commands: PackageManagerCommandsList;
  className?: string;
};

export function PackageManagerCommand({
  commands,
  className,
}: PackageManagerCommandProps) {
  const [pm, setPm] = useAtom(packageManagerAtom);
  const [copied, setCopied] = React.useState(false);
  const [direction, setDirection] = React.useState(0);
  const copiedTimeout = React.useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  const command = commands[pm];
  const activeIndex = packageManagers.findIndex((p) => p.id === pm);

  const selectTab = (id: PackageManager) => {
    const newIndex = packageManagers.findIndex((p) => p.id === id);
    setDirection(newIndex > activeIndex ? 1 : -1);
    setPm(id);
  };

  React.useEffect(() => {
    return () => {
      if (copiedTimeout.current) clearTimeout(copiedTimeout.current);
    };
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      toast.success("Copied to clipboard");
      if (copiedTimeout.current) clearTimeout(copiedTimeout.current);
      copiedTimeout.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Couldn't copy the command");
    }
  };

  return (
    <div
      className={cn(
        "border-border bg-muted text-card-foreground w-full overflow-hidden rounded-md border",
        className,
      )}
    >
      <div className="flex items-center justify-between px-4 py-2.5">
        <Tabs
          value={pm}
          onValueChange={(value) => selectTab(value as PackageManager)}
        >
          <TabsList className="h-auto gap-4 bg-transparent p-0">
            {packageManagers.map(({ id, label, icon }) => {
              const active = pm === id;
              return (
                <TabsTrigger
                  key={id}
                  value={id}
                  className={cn(
                    "relative flex items-center gap-1.5 rounded-none border-0 bg-transparent px-1 text-sm font-medium shadow-none transition-colors ease-out",
                    "data-[state=active]:bg-transparent data-[state=active]:shadow-none",
                    active
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {/* {icon} */}
                  {label}
                  {active && (
                    <motion.span
                      layoutId="install-command-underline"
                      className="bg-foreground absolute right-0 -bottom-2.75 left-0 h-px w-full"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 25,
                      }}
                    />
                  )}
                </TabsTrigger>
              );
            })}
          </TabsList>
        </Tabs>

        <button
          type="button"
          onClick={copy}
          aria-label="Copy command"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <AnimatePresence mode="wait" initial={false}>
            {copied ? (
              <motion.span
                key="check"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.12 }}
                className="flex"
              >
                <Check className="size-4 text-emerald-500" />
              </motion.span>
            ) : (
              <motion.span
                key="copy"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.12 }}
                className="flex"
              >
                <Copy className="size-4" />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      <div className="border-border bg-card overflow-x-auto overscroll-x-contain border-t px-4 py-3.5 [&::-webkit-scrollbar]:hidden">
        <AnimatePresence mode="wait" initial={false} custom={{direction, axis: "y"}}>
          <motion.div
            key={pm}
            custom={{direction, axis: "y"}}
            variants={commandVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex items-center gap-2 font-mono text-sm"
          >
            <pre className="leading-5">
              <code className="text-muted-foreground text-sm/none">
                $ {command}
              </code>
            </pre>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
