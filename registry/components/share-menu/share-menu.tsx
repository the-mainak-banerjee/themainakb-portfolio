"use client";

import * as React from "react";
import { DropdownMenu as DropdownMenuPrimitive } from "radix-ui";
import {
  AnimatePresence,
  motion,
  stagger,
  Target,
  Transition,
} from "motion/react";
import { toast } from "sonner";
import { Check, Copy as CopyIcon, Share2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ShareContextValue = {
  title: string;
  url: string;
  encodedUrl: string;
  canNativeShare: boolean;
  copied: boolean;
  copy: () => Promise<void>;
  nativeShare: () => Promise<void>;
  open: boolean;
  setOpen: (open: boolean) => void;
};

const ShareContext = React.createContext<ShareContextValue | null>(null);

function useShare() {
  const ctx = React.useContext(ShareContext);
  if (!ctx) {
    throw new Error("ShareMenu.* components must be used inside <ShareMenu>");
  }
  return ctx;
}

export type ShareMenuProps = React.ComponentProps<
  typeof DropdownMenuPrimitive.Root
> & {
  title: string;
  url: string;
};

function ShareMenu({
  title,
  url,
  open: openProp,
  defaultOpen,
  onOpenChange,
  children,
  ...props
}: ShareMenuProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(
    defaultOpen ?? false,
  );
  const [copied, setCopied] = React.useState(false);
  const isControlled = openProp !== undefined;
  const copiedTimeout = React.useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const open = isControlled ? openProp : uncontrolledOpen;

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (!isControlled) setUncontrolledOpen(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  const absoluteUrl = React.useMemo(() => {
    if (/^https?:\/\//i.test(url)) return url;
    if (typeof window === "undefined") return url;
    try {
      return new URL(url, window.location.origin).toString();
    } catch {
      return url;
    }
  }, [url]);

  React.useEffect(() => {
    return () => {
      if (copiedTimeout.current) clearTimeout(copiedTimeout.current);
    };
  }, []);

  const copy = React.useCallback(async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(absoluteUrl);
      } else {
        throw new Error("Clipboard unavailable");
      }

      setCopied(true);
      toast.success("Link copied");
      if (copiedTimeout.current) clearTimeout(copiedTimeout.current);
      copiedTimeout.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Couldn't copy the link");
    }
  }, [absoluteUrl]);

  const nativeShare = React.useCallback(async () => {
    if (typeof navigator === "undefined" || !("share" in navigator)) return;
    try {
      await navigator.share({ title, url: absoluteUrl });
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") return;
      toast.error("Couldn't open the share sheet");
    }
  }, [title, absoluteUrl]);

  const value = React.useMemo<ShareContextValue>(
    () => ({
      title,
      url: absoluteUrl,
      encodedUrl: encodeURIComponent(absoluteUrl),
      canNativeShare: typeof navigator !== "undefined" && "share" in navigator,
      copied,
      copy,
      nativeShare,
      open,
      setOpen,
    }),
    [title, absoluteUrl, copied, copy, nativeShare, open, setOpen],
  );

  return (
    <ShareContext.Provider value={value}>
      <DropdownMenu open={open} onOpenChange={setOpen} {...props}>
        {children}
      </DropdownMenu>
    </ShareContext.Provider>
  );
}

export type ShareMenuTriggerProps = React.ComponentProps<
  typeof DropdownMenuPrimitive.Trigger
> & {
  buttonClassName?: string;
};

function ShareMenuTrigger({
  children,
  buttonClassName,
  ...props
}: ShareMenuTriggerProps) {
  return (
    <DropdownMenuTrigger asChild {...props}>
      <Button
        variant="outline"
        size="icon"
        aria-label="Share"
        className={buttonClassName}
        {...props}
      >
        {children ?? <Share2 className="size-4" />}
      </Button>
    </DropdownMenuTrigger>
  );
}

const AnimatedDropdownContent = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal forceMount>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "bg-popover text-popover-foreground z-50 min-w-32 overflow-hidden rounded-md border p-1 shadow-md",
        className,
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));
AnimatedDropdownContent.displayName = "AnimatedDropdownContent";

type ShareMenuVariant = {
    opacity?: number;
    scale?: number;
    y?: number;
    x?: number;
    filter?: string;
    clipPath?: string;
    rotateX?: number;
    transition?: Transition;
} & Target;

type ShareMenuVariants = {
  hidden: ShareMenuVariant;
  visible: ShareMenuVariant;
  exit: ShareMenuVariant;
};

type ShareMenuAnimationPreset =
  "fade" | "scale" | "slide" | "inset" | "ellipse" | "blur" | "pop";

type ShareMenuAnimationConfig = {
  menuVariants: ShareMenuVariants;
  itemVariants: ShareMenuVariants;
};

// ── Shared item animation ──
const subtleItemVariants: ShareMenuVariants = {
  hidden: { opacity: 0, y: -4 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.05, ease: "easeOut" },
  },
  exit: { opacity: 0, y: -4 },
};

const scaleItemVariants: ShareMenuVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.08, ease: "easeOut" },
  },
  exit: { opacity: 0, scale: 0.9 },
};

const shareMenuAnimationPresets: Record<
  ShareMenuAnimationPreset,
  ShareMenuAnimationConfig
> = {
  /** Simple, minimal — opacity + scale + y. Safe default for most UIs. */
  fade: {
    menuVariants: {
      hidden: { opacity: 0, scale: 0.95, y: -4 },
      visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
          duration: 0.15,
          ease: "easeOut",
          delayChildren: stagger(0.03),
        },
      },
      exit: {
        opacity: 0,
        scale: 0.95,
        y: -4,
        transition: { duration: 0.12, ease: "easeOut" },
      },
    },
    itemVariants: subtleItemVariants,
  },

  /** Pure scale-in from center, no positional movement. Feels tighter/snappier. */
  scale: {
    menuVariants: {
      hidden: { opacity: 0, scale: 0.9 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: {
          duration: 0.18,
          ease: "easeOut",
          delayChildren: stagger(0.025),
        },
      },
      exit: {
        opacity: 0,
        scale: 0.9,
        transition: { duration: 0.12, ease: "easeOut" },
      },
    },
    itemVariants: scaleItemVariants,
  },

  /** Directional slide down from the trigger, subtle and fast. */
  slide: {
    menuVariants: {
      hidden: { opacity: 0, y: -8 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.2,
          ease: [0.16, 1, 0.3, 1], // easeOutExpo-ish
          delayChildren: stagger(0.03),
        },
      },
      exit: {
        opacity: 0,
        y: -6,
        transition: { duration: 0.15, ease: "easeIn" },
      },
    },
    itemVariants: subtleItemVariants,
  },

  /** Rectangular wipe reveal, top-down — like a blind opening. */
  inset: {
    menuVariants: {
      hidden: {y: -4, clipPath: "inset(0 0 100% 0)" },
      visible: {
        y: 0,
        clipPath: "inset(0 0 0% 0)",
        transition: {
          duration: 0.3,
          ease: "easeOut",
          delayChildren: stagger(0.03),
        },
      },
      exit: {
        y: -4,
        clipPath: "inset(0 0 100% 0)",
        transition: {
          duration: 0.2,
          ease: "easeOut",
          delayChildren: stagger(0.03, { from: "last" }),
        },
      },
    },
    itemVariants: subtleItemVariants,
  },

  /** Radial iris reveal from center */
  ellipse: {
    menuVariants: {
      hidden: { y: -4, clipPath: "ellipse(0% 0% at 50% 50%)" },
      visible: {
        y: 0,
        clipPath: "ellipse(100% 100% at 50% 50%)",
        transition: {
          duration: 0.3,
          ease: "easeOut",
          delayChildren: stagger(0.03),
        },
      },
      exit: {
        y: -4,
        clipPath: "ellipse(0% 0% at 50% 50%)",
        transition: {
          duration: 0.2,
          ease: "easeOut",
          delayChildren: stagger(0.03, { from: "last" }),
        },
      },
    },
    itemVariants: subtleItemVariants,
  },

  /** Frosted blur resolve — soft, modern. Heavier on GPU than others. */
  blur: {
    menuVariants: {
      hidden: { opacity: 0, scale: 0.96, filter: "blur(8px)" },
      visible: {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        transition: {
          duration: 0.25,
          ease: "easeOut",
          delayChildren: stagger(0.03),
        },
      },
      exit: {
        opacity: 0,
        scale: 0.96,
        filter: "blur(6px)",
        transition: { duration: 0.15, ease: "easeIn" },
      },
    },
    itemVariants: subtleItemVariants,
  },

  /** Springy overshoot pop — playful, tactile. Uses spring physics, not easing curves. */
  pop: {
    menuVariants: {
      hidden: { opacity: 0, scale: 0.85, y: -6 },
      visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
          type: "spring",
          stiffness: 450,
          damping: 28,
          delayChildren: stagger(0.03),
        },
      },
      exit: {
        opacity: 0,
        scale: 0.9,
        y: -4,
        transition: { duration: 0.12, ease: "easeIn" },
      },
    },
    itemVariants: scaleItemVariants,
  },
};

type ShareMenuContentProps = React.ComponentPropsWithoutRef<
  typeof AnimatedDropdownContent
> & {
  /**
   * Named animation preset for the menu's open/close motion.
   * @default "ellipse"
   */
  animation?: ShareMenuAnimationPreset;
  /**
   * Fully override the container's animation states, bypassing `animation`.
   * Must define `hidden`, `visible`, and `exit`.
   */
  menuVariants?: ShareMenuVariants;
  /**
   * Fully override each item's animation states, bypassing `animation`.
   * Must define `hidden`, `visible`, and `exit`.
   */
  itemVariants?: ShareMenuVariants;
};

function ShareMenuContent({
  children,
  className,
  align = "start",
  animation = "ellipse",
  menuVariants,
  itemVariants,
  ...props
}: ShareMenuContentProps) {
  const { open } = useShare();
  const items = React.Children.toArray(children);
  const preset = shareMenuAnimationPresets[animation];
  const resolvedMenuVariants = menuVariants ?? preset.menuVariants;
  const resolvedItemVariants = itemVariants ?? preset.itemVariants;

  return (
    <AnimatePresence>
      {open && (
        <AnimatedDropdownContent
          asChild
          forceMount
          align={align}
          className={cn("w-56 p-1", className)}
          {...props}
        >
          <motion.div
            variants={resolvedMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            key="share-menu-content"
          >
            {items.map((child, i) => (
              <motion.div key={i} variants={resolvedItemVariants}>
                {child}
              </motion.div>
            ))}
          </motion.div>
        </AnimatedDropdownContent>
      )}
    </AnimatePresence>
  );
}

type ItemProps = React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  href?: string;
  icon?: React.ReactNode;
  onSelect?: (event: Event) => void;
  className?: string;
};

function ShareMenuItem({
  href,
  icon,
  children,
  onSelect,
  className,
  ...props
}: ItemProps) {
  if (href) {
    return (
      <DropdownMenuItem asChild className={className} {...props}>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2"
        >
          {icon}
          <span>{children}</span>
        </a>
      </DropdownMenuItem>
    );
  }

  return (
    <DropdownMenuItem
      className={cn("flex items-center gap-2", className)}
      onSelect={(e) => {
        // Radix closes the menu on select by default; individual items
        // (like Copy) can prevent that to show inline feedback first.
        onSelect?.(e);
      }}
    >
      {icon}
      <span>{children}</span>
    </DropdownMenuItem>
  );
}

function ShareMenuCopy({
  children = "Copy link",
  icon,
  closeDelay = 700,
}: {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  closeDelay?: number;
}) {
  const { copy, copied, setOpen } = useShare();

  return (
    <ShareMenuItem
      icon={
        icon ?? (
          <AnimatePresence mode="wait" initial={false}>
            {copied ? (
              <motion.span
                key="check"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex"
              >
                <Check className="size-4 text-emerald-500" />
              </motion.span>
            ) : (
              <motion.span
                key="copy"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex"
              >
                <CopyIcon className="size-4" />
              </motion.span>
            )}
          </AnimatePresence>
        )
      }
      onSelect={(e) => {
        e.preventDefault(); // keep menu open so the checkmark is visible
        void copy().then(() => {
          setTimeout(() => setOpen(false), closeDelay);
        });
      }}
    >
      {copied ? "Copied!" : children}
    </ShareMenuItem>
  );
}

function ShareMenuNative({
  children = "Other app",
  icon,
  hidden = false,
}: {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  hidden?: boolean;
}) {
  const { nativeShare, canNativeShare } = useShare();

  if (hidden || !canNativeShare) return null;

  return (
    <ShareMenuItem icon={icon} onSelect={() => void nativeShare()}>
      {children}
    </ShareMenuItem>
  );
}

export {
  ShareMenu,
  ShareMenuTrigger,
  ShareMenuContent,
  ShareMenuItem,
  ShareMenuCopy,
  ShareMenuNative,
};
