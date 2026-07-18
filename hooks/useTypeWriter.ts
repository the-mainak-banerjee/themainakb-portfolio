"use client";

import { useEffect, useState } from "react";

interface UseTypewriterOptions {
  /** ms per character */
  speed?: number;
  /** ms to wait before typing starts */
  delay?: number;
}

/**
 * Reveals `text` one character at a time. Re-runs whenever `text`,
 * `speed`, or `delay` change.
 */
export function useTypewriter(
  text: string,
  { speed = 30, delay = 0 }: UseTypewriterOptions = {},
) {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDisplay("");
    let index = 0;
    let interval: ReturnType<typeof setInterval>;

    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        index++;
        setDisplay(text.slice(0, index));
        if (index >= text.length) clearInterval(interval);
      }, speed);
    }, delay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, speed, delay]);

  return display;
}
