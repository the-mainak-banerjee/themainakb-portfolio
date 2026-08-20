"use client";

import { useAnimate, motion } from "motion/react";

type Status = "idle" | "happy" | "curious";

const eyeStates = {
  idle: {
    left: {
      cx: 129,
      cy: 76,
      rx: 6,
      ry: 12,
      rotate: -20,
    },
    right: {
      cx: 157,
      cy: 70,
      rx: 5,
      ry: 10,
      rotate: -25,
    },
  },

  happy: {
    left: {
      cx: 120,
      cy: 150,
      rx: 20,
      ry: 50,
      rotate: 10,
    },
    right: {
      cx: 180,
      cy: 150,
      rx: 20,
      ry: 50,
      rotate: 10,
    },
  },

  curious: {
    left: {
      cx: 40,
      cy: 125,
      rx: 30,
      ry: 32,
      rotate: 10,
    },
    right: {
      cx: 120,
      cy: 110,
      rx: 30,
      ry: 30,
      rotate: 10,
    },
  },
};

const faceStates = {
  idle: { rotate: 0, scaleX: 1, scaleY: 1, x: 0, y: 0 },
  happy: { rotate: -3, scaleX: 1, scaleY: 0.99, x: 2, y: -2 },
  curious: { rotate: 4, scaleX: 1, scaleY: 1.02, x: -3, y: 1 },
};

const eyeTransition = {
  duration: 0.5,
  ease: [0.49, 0.88, 0.09, 0.97],
} as const;

const blinkTransition = {
  duration: 0.18,
  times: [0, 0.5, 1],
  ease: "easeInOut" as const,
};

function GrokBot() {
  const [scope, animate] = useAnimate();

  const changeStatus = async (newStatus: Status) => {
    const state = eyeStates[newStatus];
    const face = faceStates[newStatus];

    await Promise.all([
      animate("[data-face]", { ...face }, eyeTransition),

      animate(
        "[data-blink='left'], [data-blink='right']",
        {
          scaleY: [1, 0.05, 1],
        },
        {
          ...blinkTransition,
        },
      ),
      animate(
        "[data-eye='left']",
        {
          cx: state.left.cx,
          cy: state.left.cy,
          rx: state.left.rx,
          ry: state.left.ry,
          rotate: state.left.rotate,
        },
        eyeTransition,
      ),

      animate(
        "[data-eye='right']",
        {
          cx: state.right.cx,
          cy: state.right.cy,
          rx: state.right.rx,
          ry: state.right.ry,
          rotate: state.right.rotate,
        },
        eyeTransition,
      ),
    ]);

    animate(
      "[data-blink='left'], [data-blink='right']",
      {
        scaleY: [1, 0.05, 1],
      },
      {
        ...blinkTransition,
        repeat: Infinity,
        repeatDelay: 3,
      },
    );
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <svg
        ref={scope}
        width={240}
        height={240}
        viewBox="0 0 240 240"
        className="overflow-visible"
      >
        <motion.g
          data-face
          style={{
            transformOrigin: "120px 120px",
          }}
        >
          <circle cx={120} cy={120} r={120} fill="white" />

          <g data-blink="left">
            <ellipse
              data-eye="left"
              cx={80}
              cy={120}
              rx={20}
              ry={30}
              fill="black"
            />
          </g>

          <g data-blink="right">
            <ellipse
              data-eye="right"
              cx={160}
              cy={120}
              rx={20}
              ry={30}
              fill="black"
            />
          </g>
        </motion.g>
      </svg>

      <div className="flex gap-2">
        <button
          onClick={() => changeStatus("idle")}
          className="cursor-pointer rounded-md border px-3 py-2"
        >
          Idle
        </button>

        <button
          onClick={() => changeStatus("happy")}
          className="cursor-pointer rounded-md border px-3 py-2"
        >
          Happy
        </button>

        <button
          onClick={() => changeStatus("curious")}
          className="cursor-pointer rounded-md border px-3 py-2"
        >
          Curious
        </button>
      </div>
    </div>
  );
}

export default GrokBot;
