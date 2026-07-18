"use client";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "motion/react";
import { MouseEvent, TouchEvent } from "react";

function AnimatedWatermark() {
  const clipRight = useMotionValue(100);
  const springClipRight = useSpring(clipRight, { damping: 50, stiffness: 200 });

  const updateClipRight = (clientX: number, rect: DOMRect) => {
    clipRight.set(Math.round(((rect.right - clientX) / rect.width) * 100));
  };

  const resetClipRight = () => {
    clipRight.set(100)
  }

  const handleHoverStart = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    updateClipRight(e.clientX, rect);
  };

   const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
     const touch = e.touches[0];
     if (!touch) return;
     updateClipRight(touch.clientX, e.currentTarget.getBoundingClientRect());
   };


  return (
    <motion.div
      className="relative -mb-5"
      onMouseMove={handleHoverStart}
      onMouseLeave={resetClipRight}
      onTouchMove={handleTouchMove}
      onTouchEnd={resetClipRight}
      onTouchCancel={resetClipRight}
      aria-hidden={true}
    >
      <div className="pointer-events-none pb-0 text-center text-[15vw] leading-none font-medium tracking-tight text-transparent select-none [-webkit-text-stroke:1px_var(--border)]">
        themainakb
      </div>
      <motion.div
        style={{
          clipPath: useMotionTemplate`inset(0 ${springClipRight}% 0 0)`,
        }}
        className="text-foreground/50 pointer-events-none absolute inset-0 pb-0 text-center text-[15vw] leading-none font-medium tracking-tight select-none"
      >   
        themainakb
      </motion.div>
    </motion.div>
  );
}

export default AnimatedWatermark;
