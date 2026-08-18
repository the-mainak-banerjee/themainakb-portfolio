"use client";
import { usePathname } from "next/navigation";
import { DevHeadphoneIcon } from "./custom-icons/code-headphone-icon";
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";

function MainLogo() {
  const pathName = usePathname();
  const isHomePage = pathName === "/";

  if (isHomePage) {
    return (
      <Popover>
        <PopoverTrigger>
          <DevHeadphoneIcon isHomePage={true} />
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader>
            <PopoverTitle>You are already here</PopoverTitle>
            <PopoverDescription>
              <span className="font-medium">
                You&apos;re standing on the homepage.
              </span>{" "}
              <span>Other pages are one step to the right.</span>
            </PopoverDescription>
          </PopoverHeader>
        </PopoverContent>
      </Popover>
    );
  }
  return (
    <Link href="/">
      <DevHeadphoneIcon />
    </Link>
  );
}

export default MainLogo;
