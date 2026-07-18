"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";

import { findRelatedLinks } from "@/lib/match-nav";
import { useTypewriter } from "@/hooks/useTypeWriter";
import { useScramble } from "@/hooks/useScramble";
import { MAIN_NAV, MOBILE_NAV } from "@/config/site";

const EASE = [0.16, 1, 0.3, 1] as const;
const TYPE_SPEED = 25;
const TYPE_SPEED_SECONDARY = 18;

export default function NotFound() {
  const pathname = usePathname();

  const related = findRelatedLinks(pathname, MAIN_NAV, {
    limit: 3,
    threshold: 0.25,
  });
  const isGuess = related.length > 0;
  const suggestions = isGuess ? related : MOBILE_NAV;

  const cmdText = `curl ${pathname}`;
  const searchText = isGuess
    ? "resolving nearest routes..."
    : "no close match, showing main routes";
  const statusText = "404 connection refused";

  // Each stage starts once the previous one's known duration has elapsed.
  const stage2 = cmdText.length * TYPE_SPEED + 150; // status scramble
  const stage3 = stage2 + 650; // "searching" line

  const command = useTypewriter(cmdText, { speed: TYPE_SPEED });
  const status = useScramble(statusText, { duration: 600, delay: stage2 });
  const searching = useTypewriter(searchText, {
    speed: TYPE_SPEED_SECONDARY,
    delay: stage3,
  });

  const commandDone = command.length === cmdText.length;
  const statusDone = status === statusText;
  const searchingDone = searching.length === searchText.length;

  const phase: "command" | "status" | "searching" | "done" = !commandDone
    ? "command"
    : !statusDone
      ? "status"
      : !searchingDone
        ? "searching"
        : "done";

  return (
    <main className="relative flex min-h-dvh items-center justify-center overflow-hidden px-6">
      <BackgroundPattern />

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: EASE }}
        className="border-border/60 bg-background/80 relative w-full max-w-xl overflow-hidden rounded-xl border shadow-sm backdrop-blur-sm"
      >
        {/* window chrome */}
        <div className="border-border/60 flex items-center gap-2 border-b px-5 py-3">
          <span className="bg-muted-foreground/25 size-3 rounded-full" />
          <span className="bg-muted-foreground/25 size-3 rounded-full" />
          <span className="bg-muted-foreground/25 size-3 rounded-full" />
        </div>

        <div className="space-y-2.5 px-6 py-7 font-mono text-[15px] leading-relaxed">
          {/* $ curl /broken-path */}
          <div className="text-muted-foreground">
            <span className="text-foreground">$</span> {command}
            {phase === "command" && <Caret />}
          </div>

          {/* 404 connection refused */}
          {commandDone && (
            <div className="text-red-400/80">
              {status}
              {phase === "status" && <Caret />}
            </div>
          )}

          {/* > resolving nearest routes... */}
          {statusDone && (
            <div className="text-muted-foreground">
              <span className="text-foreground">&gt;</span> {searching}
              {phase === "searching" && <Caret />}
            </div>
          )}

          {/* results + resting prompt */}
          {searchingDone && (
            <>
              <motion.ul
                className="border-border/60 mt-3 flex flex-col gap-1.5 border-t pt-3"
                initial="hidden"
                animate="show"
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.08 } },
                }}
              >
                {suggestions.map((item) => (
                  <motion.li
                    key={item.href}
                    variants={{
                      hidden: { opacity: 0, x: -6 },
                      show: { opacity: 1, x: 0 },
                    }}
                    transition={{ duration: 0.3, ease: EASE }}
                  >
                    <Link
                      href={item.href}
                      className="group text-muted-foreground hover:bg-muted/40 hover:text-foreground -mx-2 flex items-center gap-2 rounded px-2 py-1.5 transition-colors"
                    >
                      <item.icon className="size-4 shrink-0" />
                      <span className="text-foreground/80">{item.href}</span>
                      <span className="text-muted-foreground/50">
                        — {item.title}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.08 * suggestions.length + 0.2 }}
                className="text-muted-foreground pt-1"
              >
                <span className="text-foreground">$</span> <Caret />
              </motion.div>
            </>
          )}
        </div>
      </motion.div>
    </main>
  );
}

/** Hard on/off blink (via keyframe `times`), closer to a real terminal cursor than a smooth pulse. */
function Caret() {
  return (
    <motion.span
      className="bg-foreground/70 ml-0.5 inline-block h-[1em] w-[0.5ch] translate-y-[0.15em]"
      animate={{ opacity: [1, 1, 0, 0] }}
      transition={{
        duration: 1,
        repeat: Infinity,
        times: [0, 0.5, 0.5, 1],
        ease: "linear",
      }}
    />
  );
}

function BackgroundPattern() {
  return (
    <div
      aria-hidden="true"
      className="text-muted-foreground pointer-events-none absolute inset-0"
      style={{
        backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)",
        backgroundSize: "24px 24px",
        opacity: 0.2,
      }}
    />
  );
}
