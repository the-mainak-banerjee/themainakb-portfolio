"use client";
import { getComponentByName } from "@/registry/config";
import React, { useRef, useState } from "react";
import { Code, CodeXml, X } from "lucide-react";
import { Button } from "../ui/button";
import { AnimatePresence, motion } from "motion/react";
import { IconButton } from "../ui/button_list";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import CopyButton from "./copy-button";

// 4 directional clip-path variants
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

// Picks two distinct random variants so bg + modal never match
function getRandomVariantPair(): [VariantKey, VariantKey] {
  const first = VARIANT_KEYS[Math.floor(Math.random() * VARIANT_KEYS.length)];
  let second: VariantKey;
  do {
    second = VARIANT_KEYS[Math.floor(Math.random() * VARIANT_KEYS.length)];
  } while (second === first);
  return [first, second];
}

export interface ComponentPreviewClientProps {
  name: string;
  children: React.ReactNode;
  code: string | null;
}

function ComponentPreviewClient({
  children,
  name,
  code,
}: ComponentPreviewClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [viewSource, setViewSource] = useState<boolean>(false);
  const [variantPair, setVariantPair] = useState<[VariantKey, VariantKey]>(() =>
    getRandomVariantPair(),
  );
  const componentDetails = getComponentByName(name);
  const ref = useOutsideClick(onClose, containerRef);

  if (!componentDetails) {
    return (
      <p className="text-muted-foreground text-sm">
        Component {name} not found in registry.
      </p>
    );
  }

  const Preview = componentDetails?.catalog?.preview?.component;

  const onOpen = () => {
    setVariantPair(getRandomVariantPair());
    setViewSource(true);
  };

  function onClose() {
    setViewSource(false);
  }

  const [bgVariant, modalVariant] = variantPair;

  return (
    <div className="border-border bg-muted text-card-foreground rounded-md border">
      <div className="text-muted-foreground flex items-center gap-1 border-b px-4 py-2.5 font-mono text-sm">
        <CodeXml size={16} />
        <span>Live Preview</span>
      </div>
      <div
        className="bg-card relative flex min-h-125 flex-col rounded-b-md"
        ref={containerRef}
      >
        <div className="mt-2 flex justify-end">
          <Button
            variant={"ghost"}
            className="flex items-center gap-2 rounded-md"
            onClick={onOpen}
          >
            <Code size={16} />
            <span className="text-xs">View Source</span>
          </Button>
        </div>
        <div className="flex flex-1 items-center">
          {Preview ? (
            <React.Suspense
              fallback={
                <div className="text-muted-foreground flex w-full items-center justify-center text-sm">
                  Loading…
                </div>
              }
            >
              <Preview />
            </React.Suspense>
          ) : (
            <div className="flex w-full items-center justify-center">
              <p className="text-muted-foreground text-sm">
                Component {componentDetails?.title} not found in registry.
              </p>
            </div>
          )}
        </div>
        <AnimatePresence>
          {viewSource && (
            <>
              <motion.div
                key={"source_code_modal_bg"}
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
                className="bg-muted absolute inset-0 z-70 m-auto max-h-[80%] max-w-[80%] overflow-y-auto rounded-md p-3 [&::-webkit-scrollbar]:hidden"
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
                {children}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default ComponentPreviewClient;
