"use client";
import { Typography } from "@/components/ui/typography";
import { User_Job_Roles } from "@/features/portfolio/types/user";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import {
  Building,
  Calendar,
  Clock,
  Expand,
  MapPin,
  Wifi,
  X,
} from "lucide-react";
import Image from "next/image";
import React from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import RecognizationBox from "./recognization-box";
import { calculateDuration, formatYearMonth } from "@/lib/utils";
import { IconButton } from "@/components/ui/button_list";
import { RevealPill } from "@/componentbank";
import { Portal } from "@/components/global/portal";

export interface IExperienceCard {
  job_role: User_Job_Roles;
  is_active?: boolean;
  is_hovered?: boolean;
  onClick?: () => void;
  onClose?: () => void;
}

function ExperienceCardModal({
  job_role,
  onClose,
}: Pick<IExperienceCard, "job_role" | "onClose">) {
  const ref = useOutsideClick(onClose!);
  return (
    <motion.div
      key={job_role.company_name + "modal"}
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="bg-accent fixed inset-0 z-70 mx-2 my-auto h-150 max-w-xl overflow-y-auto rounded-xl px-6 py-6 md:mx-auto"
    >
      <motion.div
        initial={{ opacity: 0, filter: "blur(10px)", y: 32 }}
        animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
        exit={{ opacity: 0, filter: "blur(8px)", y: 20 }}
        transition={{
          duration: 0.35,
          ease: [0.22, 1, 0.36, 1],
          delay: 0.1,
        }}
      >
        <div className="sticky top-0 z-100 flex justify-end gap-2">
          <IconButton
            label="Close Modal"
            onClick={onClose}
          >
            <X size={16} />
          </IconButton>
        </div>

        <div className="space-y-8">
          {/* Company Details Start */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Image
                src={job_role.company_image.src}
                alt={job_role.company_image.alt}
                width={64}
                height={64}
                className="rounded-md"
              />
              <div className="flex flex-col">
                <Typography>{job_role.company_name}</Typography>
                <Typography variant="caption">{job_role.job_role}</Typography>
              </div>
            </div>

            {/* Company Location and Job Location Start */}
            <div className="flex items-center gap-2">
              <div className="text-muted-foreground flex items-center gap-1">
                <MapPin size={16} />
                <Typography variant="caption">
                  {job_role.company_location},
                </Typography>
              </div>
              <div className="text-muted-foreground flex items-center gap-1">
                {job_role.job_location === "On Site" ? (
                  <Building size={16} />
                ) : (
                  <Wifi size={16} />
                )}
                <Typography variant="caption">
                  {job_role.job_location}
                </Typography>
              </div>
            </div>
          </div>

          {/* Company Experience Start */}
          <div className="divide-border border-border rounded-lg grid grid-cols-3 divide-x border">
            <div className="px-4 py-3">
              <span className="text-muted-foreground flex items-center gap-1.5 text-[10px] tracking-wider uppercase">
                <Calendar size={11} /> Start
              </span>
              <Typography variant="caption">
                {formatYearMonth(job_role.start_date)}
              </Typography>
            </div>
            <div className="px-4 py-3">
              <span className="text-muted-foreground flex items-center gap-1.5 text-[10px] tracking-wider uppercase">
                <Calendar size={11} /> End
              </span>
              <Typography variant="caption">
                {job_role.is_current_company
                  ? "Currently Working"
                  : formatYearMonth(job_role.end_date!)}
              </Typography>
            </div>
            <div className="px-4 py-3">
              <span className="text-muted-foreground flex items-center gap-1.5 text-[10px] tracking-wider uppercase">
                <Clock size={11} /> Duration
              </span>
              <Typography variant="caption" className="text-foreground">
                {job_role.is_current_company
                  ? calculateDuration(job_role.start_date)?.formatted
                  : job_role.duration}
              </Typography>
            </div>
          </div>

          {/* Achievements Start */}
          {job_role.achievements && (
            <RecognizationBox achievements={job_role.achievements} />
          )}

          <div className="space-y-4">
            <Typography variant="label" as="p">
              Tools on board
            </Typography>
            <div className="flex flex-wrap gap-2">
              <LayoutGroup>
                {job_role.tools.map((tool) => {
                  return (
                    <motion.a
                      key={tool.slug}
                      href={tool.url}
                      target="_blank"
                      rel="noopener"
                    >
                      <RevealPill
                        key={tool.slug}
                        icon={tool.icon}
                        label={tool.name}
                        expandCard={true}
                        id={job_role.company_name + tool.name}
                      />
                    </motion.a>
                  );
                })}
              </LayoutGroup>
            </div>
          </div>

          <div className="space-y-4">
            <Typography variant="label" as="p">
              What I did?
            </Typography>
            <Typography variant="body-sm" className="whitespace-pre-line">
              {job_role.description}
            </Typography>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ExperienceCard({
  job_role,
  is_active,
  is_hovered,
  onClick,
  onClose,
}: IExperienceCard) {
  const end_date = job_role.is_current_company
    ? "Present"
    : formatYearMonth(job_role.end_date!);
  const duration = job_role.is_current_company
    ? calculateDuration(job_role.start_date)?.formatted
    : job_role.duration;
  return (
    <div>
      <AnimatePresence>
        {is_active && (
          <Portal>
            <motion.div
              key={job_role.company_name + "modal_bg"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.5 } }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-foreground/20 fixed inset-0 z-60 h-full w-full backdrop-blur-sm"
            />
            <ExperienceCardModal job_role={job_role} onClose={onClose} />
          </Portal>
        )}
        {/* {is_active && (
        )} */}
      </AnimatePresence>

      <motion.button
        className="border-border rounded-lg bg-card relative flex w-full cursor-pointer flex-col items-start justify-between gap-4 border px-4 py-2 text-left md:flex-row"
        onClick={onClick}
        initial="initial"
        whileHover="hover"
        whileTap={{ scale: 0.95 }}
        variants={{
          initial: { scale: 1 },
          hover: {
            scale: 1.01,
            transition: { duration: 0.3, ease: "easeOut" },
          },
        }}
        animate={{ opacity: is_active ? 0 : 1 }}
        transition={{ opacity: { duration: 0.3 } }}
      >
        <motion.div className="z-20 flex items-center gap-2 md:items-end">
          <Image
            src={job_role.company_image.src}
            alt={job_role.company_image.alt}
            width={64}
            height={64}
            className="bg-hover-fill-icon rounded-md"
          />
          <div className="flex flex-col">
            <Typography>{job_role.company_name}</Typography>
            <Typography variant="caption">{job_role.job_role}</Typography>
          </div>
        </motion.div>
        <div className="z-20 flex flex-col gap-1 text-left md:self-end md:text-right">
          <div className="text-muted-foreground flex items-center gap-2">
            <MapPin size={12} />
            <Typography variant="caption">
              {job_role.company_location}({job_role.job_location})
            </Typography>{" "}
          </div>
          <div className="text-muted-foreground flex items-center gap-2">
            <Calendar size={12} />
            <Typography variant="caption">
              {formatYearMonth(job_role.start_date)} - {end_date} ({duration})
            </Typography>
          </div>
        </div>
        <motion.div
          variants={{
            initial: { x: 0, opacity: 0.5 },
            hover: { x: 3, opacity: 1 },
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="text-muted-foreground absolute top-2 right-3 z-20 shrink-0"
        >
          <Expand size={18} />
        </motion.div>
        {is_hovered && (
          <motion.div
            className="bg-accent/40 absolute inset-0 z-10"
            layout
            layoutId="hover_bg"
            // variants={{
            //   initial: { clipPath: "inset(100% 100% 100% 100%)", opacity: 0 },
            //   hover: { clipPath: "inset(0% 0% 0% 0%)", opacity: 1 },
            // }}
            // transition={{ duration: 0.3, ease: "easeOut" }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 35,
            }}
          />
        )}
      </motion.button>
    </div>
  );
}

export default ExperienceCard;
