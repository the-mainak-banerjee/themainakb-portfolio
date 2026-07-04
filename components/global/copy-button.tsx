"use client";

import { useState, useRef, useCallback } from "react";
import { Copy, Check } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Typography } from "../ui/typography";
import { VisuallyHidden } from "./visually-hidden";

interface CopyButtonProps {
  /** The text that gets copied to the clipboard */
  value: string;
  /** Optional label shown in the tooltip before copying */
  label?: string;
  /** How long (ms) the "copied" state stays before reverting */
  resetDelay?: number;
  size?: number;
  className?: string;
}

export function CopyButton({
  value,
  label = "Copy",
  resetDelay = 1800,
  size = 12,
  className,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCopy = useCallback(async () => {
    try {
      if (copied) return;
      await navigator.clipboard.writeText(value);
      setCopied(true);

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), resetDelay);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [value, resetDelay]);

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            onClick={handleCopy}
            aria-label={copied ? "Copied" : label}
            className={cn(
              "relative inline-flex h-8 w-8 items-center justify-center rounded-md",
              "border-border text-muted-foreground border",
              "hover:text-foreground hover:bg-hover-fill-icon transition-colors",
              "focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none disabled:cursor-not-allowed",
              className,
            )}
            disabled={copied}
          >
            <AnimatePresence mode="wait" initial={false}>
              {copied ? (
                <motion.span
                  key="check"
                  initial={{
                    opacity: 0,
                    scale: 0.4,
                    rotate: -90,
                    filter: "blur(4px)",
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    rotate: 0,
                    filter: "blur(0px)",
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.4,
                    rotate: 90,
                    filter: "blur(4px)",
                  }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <Check size={size} strokeWidth={2.25} />
                </motion.span>
              ) : (
                <motion.span
                  key="copy"
                  initial={{
                    opacity: 0,
                    scale: 0.4,
                    rotate: 90,
                    filter: "blur(4px)",
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    rotate: 0,
                    filter: "blur(0px)",
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.4,
                    rotate: -90,
                    filter: "blur(4px)",
                  }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <Copy size={size} strokeWidth={2} />
                </motion.span>
              )}
            </AnimatePresence>

            {/* keeps the button's own size stable since children are absolutely positioned */}
            <span className="invisible">
              <Copy size={size} />
            </span>
            <VisuallyHidden>{copied ? "Copied!" : label }</VisuallyHidden>
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <Typography variant="caption" className="text-background">
            {copied ? "Copied!" : label}
          </Typography>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
