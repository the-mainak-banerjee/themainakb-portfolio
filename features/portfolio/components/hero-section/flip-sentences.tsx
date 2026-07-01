"use client";
import { AnimatePresence, motion } from "motion/react";
import React, { useEffect } from "react";

export interface IFlipSentencesProps {
  variant?: "slide-blur" | "word-stagger" | "vertical-flip" | "fade-scale";
  sentences: string[];
}

function FlipSentences({ sentences }: IFlipSentencesProps) {
  const [index, setIndex] = React.useState<number>(0);
  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % sentences.length);
    }, 3000);

    return () => clearInterval(id);
  }, [sentences.length]);
  return (
    <div className="relative h-10 text-sm md:h-fit">
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{
            opacity: 0,
            scale: 0.98,
            color: "var(--muted-foreground)",
          }}
          animate={{
            opacity: 0.7,
            scale: 1,
            color: "var(--foreground)",
          }}
          exit={{
            opacity: 0,
            scale: 1.02,
            color: "var(--muted-foreground)",
            transition: {
              duration: 0.4,
              delay: 0.4,
            },
          }}
          transition={{
            duration: 0.45,
          }}
        >
          {sentences[index]}
        </motion.p>
      </AnimatePresence>
      <AnimatePresence mode="wait">
        <motion.p
          key={sentences[index] + "-highlight"}
          className="absolute inset-0"
          initial={{
            //   clipPath: "inset(0 100% 0 0)",
            opacity: 0,
          }}
          animate={{
            //   clipPath: "inset(0 0% 0 0)",
            opacity: 1,
            transition: { duration: 0.5, ease: "easeInOut", delay: 0.9 },
          }}
          exit={{
            // clipPath: "inset(0 0 0 100%)",
            opacity: 0,
            transition: { duration: 0.3, ease: "easeInOut" },
          }}
        >
          {sentences[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

export default FlipSentences;
