"use client";
import React, { useRef, useState } from "react";
import { Code, CodeXml, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/button_list";
import CopyButton from "./copy-button";
import { Icon } from "./icons/icon";

const CLIP_VARIANTS = {
  leftToRight: {
    initial: { clipPath: "inset(0 100% 0 0)" },
    animate: { clipPath: "inset(0 0 0 0)" },
    exit: { clipPath: "inset(0 100% 0 0)" },
  },
  rightToLeft: {
    initial: { clipPath: "inset(0 0 0 100%)" },
    animate: { clipPath: "inset(0 0 0 0)" },
    exit: { clipPath: "inset(0 0 0 100%)" },
  },
  topToBottom: {
    initial: { clipPath: "inset(0 0 100% 0)" },
    animate: { clipPath: "inset(0 0 0 0)" },
    exit: { clipPath: "inset(0 0 100% 0)" },
  },
  bottomToTop: {
    initial: { clipPath: "inset(100% 0 0 0)" },
    animate: { clipPath: "inset(0 0 0 0)" },
    exit: { clipPath: "inset(100% 0 0 0)" },
  },
} as const;

type VariantKey = keyof typeof CLIP_VARIANTS;
const VARIANT_KEYS = Object.keys(CLIP_VARIANTS) as VariantKey[];

function getRandomVariantPair(): [VariantKey, VariantKey] {
  const first = VARIANT_KEYS[Math.floor(Math.random() * VARIANT_KEYS.length)];
  let second: VariantKey;
  do {
    second = VARIANT_KEYS[Math.floor(Math.random() * VARIANT_KEYS.length)];
  } while (second === first);
  return [first, second];
}

export interface PreviewFrameProps {
  /** The live, rendered thing being previewed — a component, a blog demo, a lab experiment */
  preview: React.ReactNode;
  /** Label in the header bar. Defaults to "Live Preview" */
  label?: string;
  /** Raw source string, only used for the CopyButton inside the modal */
  code?: string | null;
  /** Rendered source view (e.g. syntax-highlighted code) shown inside the modal */
  sourceView?: React.ReactNode;
  /**
   * Explicit control over whether the "View Source" button/modal exists at all.
   * If omitted, it's inferred: shown only when both `code` and `sourceView` are provided.
   */
  showSource?: boolean;
  /** Fallback while `preview` suspends */
  loadingFallback?: React.ReactNode;
  githubLink?: string,
  className?: string;
}

function PreviewFrame({
  preview,
  label = "Live Preview",
  code,
  sourceView,
  showSource,
  loadingFallback,
  className,
  githubLink,
}: PreviewFrameProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [viewSource, setViewSource] = useState(false);
  const [variantPair, setVariantPair] = useState<[VariantKey, VariantKey]>(() =>
    getRandomVariantPair(),
  );
  const ref = useOutsideClick(onClose, containerRef);

  const canShowSource = showSource ?? Boolean(code && sourceView);

  const onOpen = () => {
    setVariantPair(getRandomVariantPair());
    setViewSource(true);
  };

  function onClose() {
    setViewSource(false);
  }

  const [bgVariant, modalVariant] = variantPair;

  return (
    <div
      className={`border-border bg-muted text-card-foreground rounded-md border ${className ?? ""}`}
    >
      <div className="text-muted-foreground flex items-center justify-between border-b px-4 py-2.5 font-mono text-sm">
        <div className="flex items-center gap-1">
          <CodeXml size={16} />
          <span>{label}</span>
        </div>
        {githubLink && (
          <a
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground flex items-center gap-1.5 transition-colors"
          >
            <Icon name="github" className="h-4 w-4" />
            View source
          </a>
        )}
      </div>
      <div
        className="bg-card relative flex min-h-125 flex-col rounded-b-md py-5"
        ref={containerRef}
      >
        {canShowSource && (
          <div className="mt-2 flex justify-end">
            <Button
              variant="ghost"
              className="flex items-center gap-2 rounded-md"
              onClick={onOpen}
            >
              <Code size={16} />
              <span className="text-xs">View Source</span>
            </Button>
          </div>
        )}
        <div className="flex w-full flex-1 items-center justify-center">
          <React.Suspense
            fallback={
              loadingFallback ?? (
                <div className="text-muted-foreground flex w-full items-center justify-center text-sm">
                  Loading…
                </div>
              )
            }
          >
            {preview}
          </React.Suspense>
        </div>

        {canShowSource && (
          <AnimatePresence>
            {viewSource && (
              <>
                <motion.div
                  key="source_code_modal_bg"
                  initial={CLIP_VARIANTS[bgVariant].initial}
                  animate={CLIP_VARIANTS[bgVariant].animate}
                  exit={{
                    ...CLIP_VARIANTS[bgVariant].exit,
                    transition: { duration: 0.2, delay: 0.15 },
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="bg-foreground/20 absolute inset-0 z-60 h-full w-full rounded-b-lg backdrop-blur-sm"
                />
                <motion.div
                  ref={ref}
                  className="bg-muted no-scrollbar absolute inset-0 z-70 m-auto max-h-[80%] max-w-[80%] overflow-y-auto rounded-md p-3"
                  initial={CLIP_VARIANTS[modalVariant].initial}
                  animate={CLIP_VARIANTS[modalVariant].animate}
                  exit={{
                    ...CLIP_VARIANTS[modalVariant].exit,
                    transition: { duration: 0.2 },
                  }}
                  transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
                >
                  <div className="sticky top-0 z-100 flex justify-end gap-2">
                    {code && (
                      <CopyButton
                        value={code}
                        className="text-foreground h-7 w-8 border-0"
                      />
                    )}
                    <IconButton
                      label="Close Modal"
                      className="h-7 w-8"
                      onClick={onClose}
                    >
                      <X size={16} />
                    </IconButton>
                  </div>
                  {sourceView}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}

export default PreviewFrame;
