"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { USER } from "../../data/user";

function ProfileImage() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const profileImage =
    !mounted || resolvedTheme === "dark"
      ? USER.profileImages.dark
      : USER.profileImages.light;

  return (
    <div className="from-foreground/40 to-foreground/80 relative h-30 w-30 min-w-30 rounded-full bg-linear-to-b p-1 ">
      <Image
        src={profileImage}
        alt="Profile Image"
        className="h-full w-full rounded-full object-cover object-[center_10%]"
        width={120}
        height={120}
      />
    </div>
  );
}

export default ProfileImage;
