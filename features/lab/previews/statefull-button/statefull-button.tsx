"use client";
import React, { useState } from "react";
import { AnimatePresence, motion, useAnimate } from "motion/react";
import { AnimationSequence } from "motion";
import { AlertCircle, CheckCircle, Loader2, Rocket } from "lucide-react";

export function mockDeploy(): Promise<{ url: string }> {
  return new Promise((resolve, reject) => {
    const duration = 3000 + Math.random() * 1500;
    setTimeout(() => {
      const succeeds = Math.random() > 0.25; // ~75% success rate, deliberately not 100%

      if (succeeds) {
        resolve({ url: "https://your-project.vercel.app" });
      } else {
        reject(new Error("Build failed: exceeded function size limit"));
      }
    }, duration);
  });
}

type ButtonState = "idle" | "loading" | "success" | "error";

const bgColorMap: Record<ButtonState, string> = {
  idle: "var(--secondary)",
  loading: "var(--primary)",
  success: "var(--success)",
  error: "var(--destructive)",
};

const fgColorMap: Record<ButtonState, string> = {
  idle: "var(--secondary-foreground)",
  loading: "var(--primary-foreground)",
  success: "var(--success-foreground)",
  error: "var(--destructive-foreground)",
};

function StateFullButton() {
  const [state, setState] = useState<ButtonState>("idle");
  const [scope, animate] = useAnimate();

  const runTransition = (
    next: ButtonState,
    opts?: { shake?: boolean; pop?: boolean },
  ) => {
    if (!scope.current) return;
    const sequence: AnimationSequence = [
      [".bg_card", { clipPath: "inset(0 100% 0 0)" }, { duration: 0 }],
      [
        ".bg_card",
        { backgroundColor: bgColorMap[next] },
        { duration: 0, at: "<" },
      ],
      [
        ".bg_card",
        { clipPath: "inset(0 0% 0 0)" },
        { duration: 0.32, ease: "easeOut" },
      ],
      [
        scope.current,
        { color: fgColorMap[next] },
        { duration: 0.32, ease: "easeOut", at: "<" },
      ],
    ];

    if (opts?.shake) {
      sequence.push([
        scope.current,
        {
          x: [0, -10, 10, -8, 8, -4, 4, 0],
          rotate: [0, -2, 2, -1, 1, 0],
        },
        { type: "spring", stiffness: 900, damping: 12, at: "+0.04" },
      ]);
    }

    if (opts?.pop) {
      sequence.push([
        scope.current,
        { scale: [1, 0.97, 1.08, 1] },
        {
          duration: 0.35,
          ease: "easeOut",
          times: [0, 0.12, 0.35, 1],
          at: "+0.04",
        },
      ]);
    }

    animate(sequence);
  };

  const handleClick = async () => {
    if (state === "loading") return;

    const loadingTimer = setTimeout(() => {
      setState("loading");
      runTransition("loading");
    }, 200);

    try {
      await mockDeploy();
      clearTimeout(loadingTimer);
      runTransition("success", { pop: true });
      setState("success");
    } catch (err) {
      clearTimeout(loadingTimer);
      runTransition("error", { shake: true });
      console.error(err);
      setState("error");
    } finally {
      setTimeout(() => {
        setState("idle");
        runTransition("idle");
      }, 2000);
    }
  };

  return (
    <motion.button
      ref={scope}
      // style={{ originX: 0 }}
      layout
      transition={{ layout: { duration: 0.35, ease: "easeOut" } }}
      className="border-secondary group relative flex h-14 cursor-pointer items-center justify-center gap-2 overflow-hidden border-2 px-4 py-2 font-mono disabled:cursor-default"
      onClick={handleClick}
      whileTap={{
        scale: 0.95,
        transition: { duration: 0.02, ease: "easeOut" },
      }}
      disabled={state !== "idle"}
      aria-busy={state !== "loading"}
      aria-live="polite"
    >
      <span
        className="bg_card absolute inset-0 z-0"
        style={{
          backgroundColor: bgColorMap.idle,
          clipPath: "inset(0 0% 0 0)",
        }}
      />
      <span className="relative z-10 flex h-full items-center">
        <AnimatePresence initial={false} mode="wait">
          {state === "idle" && (
            <motion.span
              key="idle_icon"
              initial={{ opacity: 0, y: 8, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.8 }}
            >
              <Rocket className="size-5 transition-transform duration-300 ease-in-out group-hover:-rotate-45" />
            </motion.span>
          )}
          {state === "loading" && (
            <motion.span
              key="loading_icon"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Loader2 className="size-5 animate-spin" />
            </motion.span>
          )}
          {state === "success" && (
            <motion.span
              key="success_icon"
              initial={{ scale: 0.5, opacity: 0, rotate: -15 }}
              animate={{
                scale: [0.5, 1.15, 1],
                rotate: [-15, 0],
                opacity: 1,
              }}
              exit={{ opacity: 0 }}
            >
              <CheckCircle className="size-5" />
            </motion.span>
          )}
          {state === "error" && (
            <motion.span
              key="error_icon"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <AlertCircle className="size-5" />
            </motion.span>
          )}
        </AnimatePresence>
      </span>

      <span className="relative z-10">
        {state === "idle" && "Create Deployment"}
        {state === "loading" && "Creating Deployment"}
        {state === "success" && "Deployed Successfully"}
        {state === "error" && "Deployment failed"}
      </span>
    </motion.button>
  );
}

export default StateFullButton;
