"use client";

import { useEffect, useRef, useState } from "react";

const GLYPHS = "!<>-_\\/[]{}—=+*^?#";

interface UseScrambleOptions {
  /** ms for the text to fully resolve */
  duration?: number;
  /** ms to wait before starting */
  delay?: number;
}

/**
 * Classic "decode" text effect: characters cycle through random
 * glyphs, then lock into the real text left-to-right as progress
 * increases. Spaces are preserved as-is (never scrambled).
 */
export function useScramble(
  text: string,
  { duration = 600, delay = 0 }: UseScrambleOptions = {},
) {
  const [display, setDisplay] = useState("");
  const frameRef = useRef<number>(null);

  useEffect(() => {
    const totalFrames = Math.max(1, Math.round((duration / 1000) * 60));
    let frame = 0;

    const timeout = setTimeout(() => {
      const tick = () => {
        frame++;
        const progress = Math.min(frame / totalFrames, 1);
        const revealCount = Math.floor(progress * text.length);

        setDisplay(
          text
            .split("")
            .map((char, i) => {
              if (char === " ") return " ";
              if (i < revealCount) return char;
              return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
            })
            .join(""),
        );

        if (progress < 1) {
          frameRef.current = requestAnimationFrame(tick);
        }
      };

      frameRef.current = requestAnimationFrame(tick);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [text, duration, delay]);

  return display;
}
