"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { BookOpenText } from "lucide-react";
import { cn } from "@/lib/utils";
import { RegistryItemEntry } from "@/registry/config";
import { ComponentCliCommand } from "@/features/doc/components/component-cli-command";
import { Typography } from "../ui/typography";
import { TABLET_OR_BELOW_QUERY, useMediaQuery } from "@/hooks/useMobile";

function EntryCardTopSection({
  entry,
  hovered,
  isNew,
  docUrl,
  miniVersion = false,
}: {
  entry: RegistryItemEntry;
  hovered: boolean;
  isNew?: boolean;
  docUrl: string;
  miniVersion?: boolean;
}) {
  const isTabletOrLess = useMediaQuery(TABLET_OR_BELOW_QUERY);

  return (
    <div className="relative flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <motion.div className="bg-accent text-accent-foreground flex size-7 items-center justify-center rounded-md">
            <entry.catalog.icon className="size-3.5" />
          </motion.div>
          <code className="text-card-foreground font-mono text-sm">
            {entry.title}
          </code>
          {isNew && (
            <div className="border-border bg-accent text-chart-1 flex items-center justify-center rounded-xl border px-2 py-1 text-[10px] leading-none font-medium uppercase">
              <span>New</span>
            </div>
          )}
        </div>

        <motion.span
          initial={{ opacity: 0.6 }}
          animate={{ opacity: hovered ? 1 : 0.6 }}
          className="text-muted-foreground font-mono text-[10px] tracking-wide uppercase"
        >
          {entry.catalog.subCategory}
        </motion.span>
      </div>

      {!miniVersion && (
        <Typography
          variant="body-sm"
          className="text-muted-foreground text-xs leading-relaxed"
        >
          {entry.description}
        </Typography>
      )}

      {isTabletOrLess && (
        <Link
          href={docUrl}
          className="border-border bg-secondary font-geist-sans mt-4 flex w-full items-center justify-center gap-2 rounded-lg border py-2 text-sm lg:hidden"
        >
          <BookOpenText className="size-4" />
          Read Docs
        </Link>
      )}
    </div>
  );
}

export function EntryCard({
  entry,
  registryTypeSlug,
  isNew,
  miniVersion = false,
  className,
}: {
  entry: RegistryItemEntry;
  registryTypeSlug: string;
  isNew?: boolean;
  miniVersion?: boolean;
  className?: string;
}) {
  const [hovered, setHovered] = useState(false);
  const isTabletOrLess = useMediaQuery(TABLET_OR_BELOW_QUERY);
  const docUrl = `/${registryTypeSlug}/${entry.name}`;
  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "group border-border bg-card hover:bg-accent active:bg-card flex flex-col rounded-lg border",
        className,
      )}
    >
      {isTabletOrLess ? (
        <div className="p-5">
          <EntryCardTopSection
            entry={entry}
            hovered={hovered}
            isNew={isNew}
            docUrl={docUrl}
            miniVersion={miniVersion}
          />
        </div>
      ) : (
        <>
          <Link
            href={docUrl}
            className={cn(
              "relative hidden flex-1 rounded-b-lg p-5 lg:block",
              hovered ? "" : "rounded-t-lg",
              "transition-colors",
            )}
          >
            <EntryCardTopSection
              entry={entry}
              hovered={hovered}
              isNew={isNew}
              docUrl={docUrl}
              miniVersion={miniVersion}
            />
          </Link>

          <div
            className={cn(
              "grid transition-[grid-template-rows] duration-300 ease-out",
              hovered && !miniVersion ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
            )}
          >
            <div className="overflow-hidden">
              <motion.div
                animate={{ y: hovered ? 0 : 8, opacity: hovered ? 1 : 0 }}
                transition={{
                  type: "spring",
                  stiffness: 420,
                  damping: 32,
                }}
                className="bg-popover border-border rounded-b-lg border-t px-3 py-2"
              >
                <ComponentCliCommand name={entry.name} />
              </motion.div>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
}
