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

const packageManagers: {
  id: PackageManager;
  label: string;
}[] = [
  {
    id: "pnpm",
    label: "pnpm",
  },
  {
    id: "yarn",
    label: "yarn",
  },
  {
    id: "npm",
    label: "npm",
  },
  {
    id: "bun",
    label: "bun",
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

type BasePackageManagerCommandProps = {
  className?: string;
  axis?: "x" | "y";
  // id: string;
};

export type PackageManagerCommandProps = BasePackageManagerCommandProps &
  (
    | {
        /** An npm command that will be converted to all package managers. */
        npmCommand: string;
        commands?: never;
      }
    | {
        /** Explicit commands for each package manager. */
        commands: PackageManagerCommandsList;
        npmCommand?: never;
      }
  );

export function PackageManagerCommand({
  commands,
  npmCommand,
  className,
  axis = "x",
}: PackageManagerCommandProps) {
  const [pm, setPm] = useAtom(packageManagerAtom);
  const [copied, setCopied] = React.useState(false);
  const [direction, setDirection] = React.useState(0);
  const copiedTimeout = React.useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const underlineId = React.useId();

  const allCommands = commands
    ? commands
    : getPackageManagerCommands(npmCommand);

  const command = allCommands[pm];
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
            {packageManagers.map(({ id, label }) => {
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
                  {label}
                  {active && (
                    <motion.span
                      layoutId={`${underlineId}-install-command-underline`}
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
        <AnimatePresence
          mode="wait"
          initial={false}
          custom={{ direction, axis: axis }}
        >
          <motion.div
            key={pm}
            custom={{ direction, axis: axis }}
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

export function getPackageManagerCommands(
  npmCommand: string,
): PackageManagerCommandsList {
  const command = npmCommand.trim();

  // npm install -D / --save-dev
  let match = command.match(/^npm\s+(?:install|i)\s+(-D|--save-dev)\s+(.+)$/);

  if (match) {
    const [, , packages] = match;

    return {
      npm: command,
      pnpm: `pnpm add -D ${packages}`,
      yarn: `yarn add -D ${packages}`,
      bun: `bun add -D ${packages}`,
    };
  }

  // npm install / i
  match = command.match(/^npm\s+(?:install|i)\s+(.+)$/);

  if (match) {
    const packages = match[1];

    return {
      npm: command,
      pnpm: `pnpm add ${packages}`,
      yarn: `yarn add ${packages}`,
      bun: `bun add ${packages}`,
    };
  }

  // npm uninstall
  match = command.match(/^npm\s+uninstall\s+(.+)$/);

  if (match) {
    const packages = match[1];

    return {
      npm: command,
      pnpm: `pnpm remove ${packages}`,
      yarn: `yarn remove ${packages}`,
      bun: `bun remove ${packages}`,
    };
  }

  // npm run
  match = command.match(/^npm\s+run\s+(.+)$/);

  if (match) {
    const script = match[1];

    return {
      npm: command,
      pnpm: `pnpm ${script}`,
      yarn: `yarn ${script}`,
      bun: `bun run ${script}`,
    };
  }

  // npx
  match = command.match(/^npx\s+(.+)$/);

  if (match) {
    const args = match[1];

    return {
      npm: command,
      pnpm: `pnpm dlx ${args}`,
      yarn: `yarn dlx ${args}`,
      bun: `bunx ${args}`,
    };
  }

  // npm create
  match = command.match(/^npm\s+create\s+(.+)$/);

  if (match) {
    const args = match[1];

    return {
      npm: command,
      pnpm: `pnpm create ${args}`,
      yarn: `yarn create ${args}`,
      bun: `bun create ${args}`,
    };
  }

  throw new Error(`Unsupported npm command: "${npmCommand}"`);
}
