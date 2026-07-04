import { Typography } from "@/components/ui/typography";
import { Award, ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import React, { useState } from "react";
import { User_Job_Roles } from "../../types/user";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { IconButton } from "@/components/ui/button_list";

export interface IRecognizationBox {
  achievements: User_Job_Roles["achievements"];
}
function RecognizationBox({ achievements }: IRecognizationBox) {
  const [activeBox, setActiveBox] = useState<Set<number>>();

  const handleActiveBox = (idx: number) => {
    setActiveBox((prev) => {
      const next = new Set(prev);

      if (next.has(idx)) {
        next.delete(idx);
      } else {
        next.add(idx);
      }

      return next;
    });
  };
  return (
    <div className="space-y-2">
      <Typography variant="label" as="p">
        Recognization
      </Typography>
      {achievements?.map((item, idx) => {
        const isActive = activeBox?.has(idx);
        return (
          <motion.div
            key={idx}
            className="border-border border px-4 py-3"
          >
            <div className="flex justify-between max-w-full">
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <span className="border-ring text-ring flex h-9 w-9 min-w-9 items-center justify-center rounded-full border-2">
                  <Award size={17} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="text-ring block text-[11px] tracking-wider uppercase">
                    {item.title}
                  </span>
                  <span className="text-foreground block text-[13px] font-medium">
                    {item.description}
                  </span>
                </span>
              </div>
              {item.image?.src && (
                <IconButton
                  onClick={() => handleActiveBox(idx)}
                  label="Expand the card"
                >
                  <ChevronDownIcon
                    className={cn(
                      "absolute left-1/2 z-50 h-[1.2rem] w-[1.2rem] -translate-x-1/2 transition-all duration-300 ease-out",
                      isActive
                        ? "scale-0 rotate-45 opacity-0"
                        : "scale-100 rotate-0 opacity-100",
                    )}
                  />
                  <ChevronUpIcon
                    className={cn(
                      "absolute left-1/2 z-50 h-[1.2rem] w-[1.2rem] -translate-x-1/2 transition-all duration-300 ease-out",
                      isActive
                        ? "scale-100 rotate-0 opacity-100"
                        : "scale-0 rotate-45 opacity-0",
                    )}
                  />
                </IconButton>
              )}
            </div>

            {item.image?.src && (
              <div
                className={cn(
                  "grid overflow-hidden transition-[grid-template-rows] duration-500 ease-out",
                  isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                )}
              >
                <div className="overflow-hidden">
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        key={item.image.src}
                        initial={{ opacity: 0, y: -8, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.9 }}
                        transition={{ duration: 0.5 }}
                        className="mt-4"
                      >
                        <Image
                          src={item.image.src}
                          alt={item.image.alt}
                          width={600}
                          height={600}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

export default RecognizationBox;
