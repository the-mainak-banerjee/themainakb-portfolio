import { cn } from "@/lib/utils";
import { Typography, TypographyProps } from "../ui/typography";

export interface IAccentHeadingProps {
  label?: string;
  heading?: string;
  headingVariant?: TypographyProps["variant"];
  headingId?: string;
  className?: string;
}

function AccentHeading({
  label,
  heading,
  headingVariant = "h2",
  headingId,
  className,
}: IAccentHeadingProps) {
  return (
    <div className={cn("flex gap-3.5", className)}>
      <div className="bg-text-accent w-0.75 shrink-0 self-stretch rounded-full" />
      <div className="space-y-1.5">
        {label && (
          <Typography
            variant="caption-sm"
            className="text-text-accent font-mono tracking-wide uppercase"
          >
            {label}
          </Typography>
        )}
        {heading && (
          <Typography
            variant={headingVariant}
            {...(headingId && { id: headingId })}
            className={
              headingVariant === "h1"
                ? "font-geist-sans leading-[1.15]"
                : undefined
            }
          >
            {heading}
          </Typography>
        )}
      </div>
    </div>
  );
}

export default AccentHeading;
