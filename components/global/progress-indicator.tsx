"use client";
import { cn } from "@/lib/utils";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import React, { ReactNode, useRef, useState } from "react";

function ProgressIndicator({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
  });
  const cardLeft = useSpring(
    useTransform(scrollYProgress, [0, 1], ["0%", "100%"]),
    {
      stiffness: 200,
      damping: 30,
    },
  );

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setProgress(Math.round(latest * 100));
  });

  return (
    <div className={cn("relative space-y-10", className)} ref={containerRef}>
      <div className="bg-hover-fill-icon sticky top-14 z-50 h-2 max-lg:mx-4">
        <motion.div
          className="from-primary via-ring to-text-accent h-full w-full origin-left rounded-r-full bg-linear-to-r"
          style={{ scaleX }}
        />
        <motion.div
          style={{
            left: cardLeft,
          }}
          className="bg-card absolute -top-3 flex min-w-12.5 -translate-x-1/2 items-center justify-center rounded-full border px-2 py-1 text-xs font-medium tabular-nums"
        >
          {progress}%
        </motion.div>
      </div>
      {children}
    </div>
  );
}

export default ProgressIndicator;
