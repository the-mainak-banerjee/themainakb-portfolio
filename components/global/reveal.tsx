"use client";

import { ReactNode } from "react";
import { motion } from "motion/react";

function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: "some" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function RevealHeader({ children }: { children: ReactNode }) {
  return (
    <motion.header
      initial={{ opacity: 0, filter: "blur(2px)" }}
      whileInView={{ opacity: 1, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-background supports-backdrop-filter:bg-background/60 sticky top-0 z-50 backdrop-blur"
    >
      {children}
    </motion.header>
  );
}

export { Reveal, RevealHeader };
