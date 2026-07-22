"use client";

import React, { MouseEvent, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const BUTTON_TEXT = "Click anywhere near me";

function RippleButton() {
  const [ripples, setRipples] = useState<
    {
      id: string;
      x: number;
      y: number;
      size: number;
    }[]
  >([]);
  const [hovered, setHovered] = useState(false);

  const handleClick = (e: MouseEvent) => {
    const { clientX, clientY, currentTarget, detail } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const size = Math.max(width, height);

    // For keyboard events there is no mouse pointer so we will create the riplle from the center of the button

    if (detail === 0) {
      const newRipple = {
        id: crypto.randomUUID(),
        size,
        x: width / 2 - size / 2,
        y: height / 2 - size / 2,
      };
      setRipples((prev) => [...prev, newRipple]);
    }

    const newRipple = {
      id: crypto.randomUUID(),
      size,
      x: clientX - left - size / 2,
      y: clientY - top - size / 2,
    };
    setRipples((prev) => [...prev, newRipple]);
  };
  return (
    <motion.button
      aria-label={BUTTON_TEXT}
      className="bg-secondary text-secondary-foreground relative overflow-hidden rounded-lg px-4 py-2 text-sm"
      onClick={handleClick}
      whileTap={{
        scale: 0.95,
        transition: { duration: 0.2, ease: "easeInOut" },
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <AnimatePresence initial={false} mode="popLayout">
        {hovered ? (
          <motion.span
            key="hovered"
            className="absolute inset-0 flex items-center justify-center"
            initial={{ y: 100, opacity: 0, filter: "blur(10px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            exit={{ y: 100, opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {BUTTON_TEXT}
          </motion.span>
        ) : (
          <motion.span
            key="original"
            className="absolute inset-0 flex items-center justify-center"
            initial={{ y: -100, opacity: 0, filter: "blur(10px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            exit={{ y: -100, opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {BUTTON_TEXT}
          </motion.span>
        )}
      </AnimatePresence>
      <span className="opacity-0" aria-hidden="true">
        {BUTTON_TEXT}
      </span>
      <AnimatePresence>
        {ripples.map((ripple) => {
          return (
            <motion.div
              aria-hidden="true"
              key={ripple.id}
              style={{
                left: ripple.x,
                top: ripple.y,
                width: ripple.size,
                height: ripple.size,
              }}
              initial={{ opacity: 0.5, scale: 0 }}
              animate={{ opacity: 0, scale: 3.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeIn" }}
              className="bg-foreground/80 pointer-events-none absolute rounded-full"
              onAnimationComplete={() =>
                setRipples((prev) =>
                  prev.filter((item) => item.id !== ripple.id),
                )
              }
            />
          );
        })}
      </AnimatePresence>
    </motion.button>
  );
}

export default RippleButton;
