"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Typography } from "../ui/typography";
import { VisuallyHidden } from "./visually-hidden";

interface BaseCopyButtonProps {
  /** The text that gets copied to the clipboard */
  value: string;

  /** Size of the icons */
  size?: number;

  /** Duration (in milliseconds) before the copied state resets */
  resetDelay?: number;

  /** Additional class names applied to the button */
  className?: string;

  /** Text displayed on the button before copying */
  buttonText?: string;

  /** Text displayed on the button after a successful copy */
  copiedText?: string;

  /** Called after the text is successfully copied to the clipboard */
  onCopySuccess?: () => void;

  /** Called if copying to the clipboard fails */
  onCopyError?: () => void;
}

type CopyButtonProps = BaseCopyButtonProps &
  (
    | {
        /** Enable the tooltip */
        withTooltip: true;

        /** Custom tooltip text */
        tooltipLabel?: string;
      }
    | {
        /** Tooltip is disabled */
        withTooltip?: false;

        /** Cannot be used unless withTooltip is true */
        tooltipLabel?: never;
      }
  );

const CopyButtonSkeleton = React.forwardRef<
  HTMLButtonElement,
  Omit<CopyButtonProps, "tooltipLabel" | "withTooltip"> & {
    copied: boolean;
    setCopied: React.Dispatch<React.SetStateAction<boolean>>;
  }
>(
  (
    {
      buttonText,
      copiedText,
      className,
      value,
      size = 16,
      resetDelay = 2000,
      onCopySuccess,
      onCopyError,
      copied,
      setCopied,
      ...rest
    },
    ref,
  ) => {
    const copiedTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(value);
        setCopied(true);
        onCopySuccess?.();
        if (copiedTimeout.current) clearTimeout(copiedTimeout.current);
        copiedTimeout.current = setTimeout(() => setCopied(false), resetDelay);
      } catch (err) {
        console.error("Failed to copy:", err);
        if (copiedTimeout.current) clearTimeout(copiedTimeout.current);
        onCopyError?.();
      }
    };

    const label = buttonText ?? "Copy";
    const copiedLabel = copiedText ?? "Copied";
    const isLabelWider = label.length > copiedLabel.length;

    useEffect(() => {
      return () => {
        if (copiedTimeout.current) clearTimeout(copiedTimeout.current);
      };
    }, []);

    return (
      <motion.button
        ref={ref}
        layout
        initial={false}
        aria-label={copied ? copiedLabel : label}
        className={cn(
          "relative items-center justify-center overflow-hidden rounded-md",
          "border-border text-muted-foreground border",
          "hover:text-foreground hover:bg-hover-fill-icon",
          "disabled:cursor-not-allowed",
          buttonText ? "flex gap-2 px-2 py-1" : "inline-flex h-8 w-8",
          className,
        )}
        disabled={copied}
        whileTap={{ scale: 0.92 }}
        transition={{ ease: "easeInOut" }}
        {...rest}
        onClick={handleCopy}
      >
        <motion.span className="shrink-0" layout>
          <AnimatePresence mode="wait" initial={false}>
            {copied ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={size}
                height={size}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.25"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                key="check"
              >
                <motion.path
                  d="M4 12 9 17 20 6"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  exit={{
                    pathLength: 0,
                    opacity: 0,
                    transition: { opacity: { delay: 0.1 } },
                  }}
                  transition={{
                    pathLength: {
                      duration: 0.35,
                      ease: [0.65, 0, 0.35, 1],
                      delay: 0.15,
                    },
                    opacity: { duration: 0.1, delay: 0.1 },
                  }}
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={size}
                height={size}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                key="copy"
              >
                <motion.rect
                  width="14"
                  height="14"
                  x="8"
                  y="8"
                  rx="2"
                  ry="2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  exit={{
                    pathLength: 0,
                    opacity: 0,
                    transition: { opacity: { delay: 0.1 } },
                  }}
                  strokeDasharray="1 1"
                  transition={{
                    pathLength: {
                      duration: 0.35,
                      ease: [0.65, 0, 0.35, 1],
                      delay: 0.05,
                    },
                    opacity: { duration: 0.1 },
                  }}
                />
                <motion.path
                  d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  exit={{
                    pathLength: 0,
                    opacity: 0,
                    transition: { opacity: { delay: 0.1 } },
                  }}
                  transition={{
                    pathLength: {
                      duration: 0.35,
                      ease: [0.65, 0, 0.35, 1],
                      delay: 0.05,
                    },
                    opacity: { duration: 0.1 },
                  }}
                />
              </svg>
            )}
          </AnimatePresence>
        </motion.span>
        {buttonText && (
          <motion.span
            className="relative inline-block shrink-0 overflow-hidden"
            layout
          >
            {/* Invisible sizer: reserves space for whichever label is currently active,
        so the visible AnimatePresence content below can be absolutely positioned */}
            <span className="invisible" aria-hidden="true">
              {copied ? copiedLabel : label}
            </span>

            <AnimatePresence mode="popLayout" initial={false}>
              {copied ? (
                <motion.span
                  key="copied_text"
                  className="absolute inset-0"
                  initial={{ y: isLabelWider ? 10 : -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ x: isLabelWider ? 10 : -10, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
                  layout
                >
                  {copiedLabel}
                </motion.span>
              ) : (
                <motion.span
                  key="copy_text"
                  className="absolute inset-0"
                  initial={{ y: isLabelWider ? -10 : 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{
                    x: isLabelWider ? -10 : 10,
                    opacity: 0,
                  }}
                  transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
                  layout
                >
                  {label}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.span>
        )}
        <VisuallyHidden>{copied ? "Copied to clipboard" : "Copy"}</VisuallyHidden>
      </motion.button>
    );
  },
);

CopyButtonSkeleton.displayName = "CopyButtonSkeleton";

function CopyButton({ withTooltip, tooltipLabel, ...props }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const { buttonText } = props;
  const formattedTooltipLabel = tooltipLabel ?? buttonText ?? "Copy";
  if (!withTooltip)
    return (
      <CopyButtonSkeleton copied={copied} setCopied={setCopied} {...props} />
    );

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <CopyButtonSkeleton
            copied={copied}
            setCopied={setCopied}
            {...props}
          />
        </TooltipTrigger>
        <TooltipContent>
          <Typography variant="caption" className="text-background">
            {copied ? "Copied!" : formattedTooltipLabel}
          </Typography>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default CopyButton;
