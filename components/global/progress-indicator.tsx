"use client"
import { cn } from "@/lib/utils";
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "motion/react";
import React, { ReactNode, useState } from "react";


function ProgressIndicator({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
    }) {
    const [progress, setProgress] = useState(0)
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 200,
        damping: 30
    })
    const cardLeft = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "100%"]), {
        stiffness: 200,
        damping: 30
    })

    useMotionValueEvent(scrollYProgress, "change", latest => {
        setProgress(Math.round(latest * 100))
    })

  return (
    <>
      <div className={cn("relative space-y-10", className)}>
        <div className="bg-hover-fill-icon sticky top-14 z-50 h-2">
          <motion.div
            className="from-primary via-ring to-text-accent h-full w-full origin-left rounded-r-full bg-linear-to-r"
            style={{ scaleX }}
          />
          <motion.div
            style={{
              left: cardLeft,
            }}
            className="tabular-nums min-w-12.5 flex items-center justify-center bg-card absolute -top-3 -translate-x-1/2 rounded-full border px-2 py-1 text-xs font-medium"
          >
            {progress}%
          </motion.div>
        </div>
        {children}
      </div>
    </>
  );
}

export default ProgressIndicator;
