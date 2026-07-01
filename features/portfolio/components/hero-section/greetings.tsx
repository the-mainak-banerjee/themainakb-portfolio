"use client";
import { Typography } from "@/components/ui/typography";
import { cn, getGreeting } from "@/lib/utils";
import { useEffect, useState } from "react";


function Greetings({className}: {className?: string}) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const greeting = getGreeting(currentTime.getHours());

  return (
    <Typography variant="body-lg" className={cn("font-semibold", className)}>
      {greeting},
    </Typography>
  );
}

export default Greetings;
