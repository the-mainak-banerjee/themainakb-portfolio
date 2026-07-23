"use client";
import { animate } from "motion";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "motion/react";
import { Dispatch, PointerEvent, SetStateAction, useState } from "react";

const SCRAMBLE_CHARS = "0123456789";

const scrambleIn = (
  finalText: string,
  setDisplay: Dispatch<SetStateAction<string>>,
  duration = 0.5,
) => {
  animate(0, finalText.length, {
    duration,
    onUpdate: (latest) => {
      const revealCount = Math.floor(latest);
      let out = "";
      for (let i = 0; i < finalText.length; i++) {
        out +=
          i < revealCount
            ? finalText[i]
            : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      }
      setDisplay(out);
    },
  });
};

export default function PricingCard() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const [pricingDisplay, setPricingDisplay] = useState("12");
  const [displayFeatures, setDisplayFeatures] = useState(true);

  const x = useMotionValue(50);
  const y = useMotionValue(0);

  const springX = useSpring(x);
  const springY = useSpring(y);

  const backgroundGradient = useMotionTemplate`radial-gradient(450px circle at ${springX}% ${springY}%, #c8f31d, transparent 70%)`;

  const handlePointerMove = (e: PointerEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();

    const mouseX = clientX - left;
    const mouseY = clientY - top;

    const xPct = (mouseX / width) * 100;
    const yPct = (mouseY / height) * 100;

    x.set(xPct);
    y.set(yPct);
  };

  const handlePointerLeave = () => {
    x.set(50);
    y.set(0);
  };

  const handleBillingTypeChange = (billing: "monthly" | "yearly") => {
    setBilling(billing);
    if (billing === "yearly") {
      scrambleIn("130", setPricingDisplay);
    } else {
      scrambleIn("12", setPricingDisplay);
    }
  };

  return (
    <motion.div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="h-fit rounded-2xl p-1"
      style={{
        background: backgroundGradient,
      }}
    >
      <div className="font-inter w-97 max-w-95 rounded-2xl border border-zinc-200 bg-linear-to-b from-white to-zinc-100 p-6 shadow-sm dark:border-zinc-800 dark:from-zinc-800 dark:to-zinc-900">
        <div className="mx-auto mb-6 flex w-fit justify-center rounded-full bg-zinc-100 dark:bg-zinc-600">
          {(["monthly", "yearly"] as const).map((option) => (
            <button
              key={option}
              onClick={() => handleBillingTypeChange(option)}
              className={`font-inter relative z-10 cursor-pointer px-4 py-2 text-[11px] font-bold capitalize transition-colors ${
                billing === option
                  ? "text-zinc-900"
                  : "text-zinc-500 dark:text-zinc-400"
              }`}
            >
              {billing === option && (
                <motion.div
                  layoutId="billing-highlight"
                  className="absolute inset-0 -z-10 rounded-full bg-lime-400"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
              {option}
            </button>
          ))}
        </div>

        <div className="text-center">
          <span className="font-inter text-[11px] tracking-wider text-lime-600 uppercase dark:text-lime-400">
            Registry Pro
          </span>

          <div className="mt-2 mb-1">
            <span className="font-inter text-4xl font-bold text-zinc-900 dark:text-zinc-50">
              ${pricingDisplay}
            </span>
            <span className="text-sm text-zinc-500 dark:text-zinc-400">
              {billing === "monthly" ? "/mo" : "/yr"}
            </span>
          </div>
          <p className="mb-5 text-xs text-zinc-500 dark:text-zinc-400">
            Full source access, all 19 components
          </p>
        </div>

        <button className="mb-4 w-full cursor-pointer rounded-4xl bg-zinc-900 px-4 py-2 text-white transition-colors hover:bg-zinc-800 dark:bg-lime-400 dark:text-zinc-900 dark:hover:bg-lime-300">
          Get Started
        </button>

        <button
          onClick={() => setDisplayFeatures((prevState) => !prevState)}
          className="flex w-full cursor-pointer items-center justify-between border-t border-zinc-200 py-3.5 dark:border-zinc-800"
        >
          <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            What&apos;s included
          </span>
          <motion.svg
            className="h-4 w-4 text-zinc-500 dark:text-zinc-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            animate={{ rotate: displayFeatures ? 180 : 0 }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
            }}
          >
            <path
              d="M6 9l6 6 6-6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        </button>

        <AnimatePresence initial={false}>
          {displayFeatures && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0.5, transition: { duration: 0.15 } }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="overflow-hidden pt-1.5"
            >
              {[
                "All 19 components — full TSX source, no obfuscation",
                "Slide-to-Confirm, Live Filter Panel & Inline AI Rewrite",
                "shadcn-style CLI: npx add [component-name]",
                "Private Discord channel for support & requests",
              ].map((feature) => (
                <div
                  key={feature}
                  className="flex items-start gap-2 py-2 text-sm text-zinc-500 dark:text-zinc-400"
                >
                  <svg
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-lime-600 dark:text-lime-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <path
                      d="M20 6L9 17l-5-5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {feature}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
