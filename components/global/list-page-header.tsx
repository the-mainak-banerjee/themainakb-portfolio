import { padZero } from "@/lib/utils";
import { Typography } from "../ui/typography";
import AccentHeading from "./accent-heading";

export interface IListPageHeaderProps {
  eyebrow?: string;
  title: string;
  description: string;
  count?: number;
  countLabel?: string;
}

function ListPageHeader({
  eyebrow,
  title,
  description,
  count,
  countLabel = "posts",
}: IListPageHeaderProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-end justify-between gap-6">
        <AccentHeading label={eyebrow} heading={title} headingVariant="h1" />

        {count && (
          <div className="text-right">
            <Typography className="text-text-accent text-xl font-medium">
              {padZero(count)}
            </Typography>
            <Typography
              variant="caption"
              className="text-[11px] tracking-wide uppercase"
            >
              {countLabel}
            </Typography>
          </div>
        )}
      </div>

      <div className="border-border border-t" />

      <Typography
        variant="body-lg"
        className="text-muted-foreground lg:max-w-135"
      >
        {description}
      </Typography>
    </div>
  );
}

export default ListPageHeader;
