import { IDuration } from "@/types/common";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isActiveNavItem(itemLink: string, pathName: string) {
  const mainPathName = pathName.split("/")[1];
  return itemLink === `/${mainPathName}`;
}

export function getGreeting(hour: number): string {
  if (hour >= 5 && hour < 12) {
    return "Good Morning";
  } else if (hour >= 12 && hour < 17) {
    return "Good Afternoon";
  } else {
    return "Good Evening";
  }
}

export function formatYearMonth(dateString: string) {
  const [year, month] = dateString.split("-").map(Number);

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  }).format(new Date(year, month - 1));
}

export function calculateDuration(
  startDate: string, // "2023-01"
): IDuration {
  const [startYear, startMonth] = startDate.split("-").map(Number);

  const end = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  };

  const totalMonths = (end.year - startYear) * 12 + (end.month - startMonth);

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  let formatted = "";

  if (years > 0) {
    formatted += `${years} yr${years > 1 ? "s" : ""}`;
  }

  if (months > 0) {
    formatted += `${formatted ? " " : ""}${months} mo${months > 1 ? "s" : ""}`;
  }

  if (!formatted) {
    formatted = "0 mos";
  }

  return {
    years,
    months,
    totalMonths,
    formatted,
  };
}
