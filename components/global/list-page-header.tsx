import React from "react";
import { Typography } from "../ui/typography";

export interface IListPageHeaderProps {
  title: string;
  description: string;
}

function ListPageHeader({ title, description }: IListPageHeaderProps) {
  return (
    <div className="flex flex-col gap-2">
      <Typography variant="h1" className="font-geist-sans">
        {title}
      </Typography>
      <Typography variant="body-lg" className="text-muted-foreground">
        {description}
      </Typography>
    </div>
  );
}

export default ListPageHeader;
