"use client";
import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  Variants,
} from "motion/react";
import useMeasure from "react-use-measure";

interface FormData {
  email: string;
  password: string;
  name: string;
  bio: string;
}

type StepKey = 0 | 1 | 2;

const stepContent: Record<StepKey, { heading: string; subheading: string }> = {
  0: {
    heading: "Create your account",
    subheading: "Let's start with the basics.",
  },
  1: {
    heading: "Tell us about yourself",
    subheading: "This helps personalize your profile.",
  },
  2: {
    heading: "Review & confirm",
    subheading: "Make sure everything looks right.",
  },
};

const TOTAL_STEPS = 3;

const stepVariants: Variants = {
  initial: (direction) => ({ x: `${100 * direction}%`, opacity: 0 }),
  animate: { x: 0, opacity: 1 },
  exit: (direction) => ({ x: `${-100 * direction}%`, opacity: 0 }),
};

const variantsWithReduceMotion: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export default function MultiStepForm() {
  const [step, setStep] = useState<StepKey>(0);
  const [direction, setDirection] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    name: "",
    bio: "",
  });
  const [ref, bounds] = useMeasure();
  const shouldReduceMotion = useReducedMotion();

  const updateField = <K extends keyof FormData>(
    field: K,
    value: FormData[K],
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const next = () => {
    setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1) as StepKey);
    setDirection(1);
  };
  const back = () => {
    setStep((s) => Math.max(s - 1, 0) as StepKey);
    setDirection(-1);
  };

  const handleSubmit = () => {
    console.log("Submitted:", formData);
    alert("Form submitted! Check console.");
  };

  const { heading, subheading } = stepContent[step];

  return (
    <motion.div
      className="relative mx-auto w-2xl overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.08)]"
      animate={shouldReduceMotion ? {} : { height: bounds.height }}
      transition={{ duration: 0.5, type: "spring", bounce: 0 }}
    >
      <div ref={ref} className="p-8">
        <AnimatePresence mode="popLayout" initial={false} custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={
              shouldReduceMotion ? variantsWithReduceMotion : stepVariants
            }
            transition={{ duration: 0.5, type: "spring", bounce: 0 }}
          >
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900">{heading}</h2>
              <p className="mt-1 text-sm text-gray-500">{subheading}</p>
            </div>
            <div className="mb-8 min-h-45">
              {step === 0 && (
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="email"
                      className="text-xs font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      className="rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm transition outline-none focus:border-gray-900 focus:ring-4 focus:ring-gray-900/5"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="password"
                      className="text-xs font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => updateField("password", e.target.value)}
                      className="rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm transition outline-none focus:border-gray-900 focus:ring-4 focus:ring-gray-900/5"
                    />
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="name"
                      className="text-xs font-medium text-gray-700"
                    >
                      Full name
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      className="rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm transition outline-none focus:border-gray-900 focus:ring-4 focus:ring-gray-900/5"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="bio"
                      className="text-xs font-medium text-gray-700"
                    >
                      Short bio
                    </label>
                    <textarea
                      id="bio"
                      placeholder="A little about you..."
                      value={formData.bio}
                      onChange={(e) => updateField("bio", e.target.value)}
                      rows={4}
                      className="resize-none rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm transition outline-none focus:border-gray-900 focus:ring-4 focus:ring-gray-900/5"
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="flex flex-col gap-3 text-sm">
                  <div className="flex justify-between border-b border-gray-100 py-2.5">
                    <span className="text-gray-500">Email</span>
                    <span className="font-medium text-gray-900">
                      {formData.email || "—"}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 py-2.5">
                    <span className="text-gray-500">Name</span>
                    <span className="font-medium text-gray-900">
                      {formData.name || "—"}
                    </span>
                  </div>
                  <div className="flex justify-between py-2.5">
                    <span className="text-gray-500">Bio</span>
                    <span className="max-w-50 text-right font-medium text-gray-900">
                      {formData.bio || "—"}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        <motion.div
          layout={!shouldReduceMotion}
          className="flex justify-between border-t border-gray-100 pt-6"
        >
          <button
            type="button"
            onClick={back}
            disabled={step === 0}
            className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Back
          </button>

          {step < TOTAL_STEPS - 1 ? (
            <button
              type="button"
              onClick={next}
              className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
            >
              Submit
            </button>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
