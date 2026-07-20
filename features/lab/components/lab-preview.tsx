"use client";
import { useEffect, useRef, useState } from "react";
import { labs } from "../data/labs-data";

function PreviewLoader() {
  return (
    <div
      className="flex items-center justify-center"
      role="status"
      aria-label="Loading preview"
    >
      <span className="border-border border-t-foreground h-5 w-5 animate-spin rounded-full border-2" />
    </div>
  );
}

interface LabPreviewProps {
  slug: string;
}

export function LabPreview({ slug }: LabPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  const lab = labs.find((item) => item.slug === slug);


  const Demo = lab?.component;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        // Mount once the first time it enters view, then never unmount again —
        // avoids remount jank and state loss as the user scrolls back and forth.
        if (entry.isIntersecting) setHasMounted(true);
      },
      {
        rootMargin: "200px", // start loading slightly before it's actually visible
        threshold: 0.1,
      },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (!lab) return null;

  return (
    <div
      ref={containerRef}
      // Fixed box: w-full + explicit height + overflow-hidden means this
      // container's size never depends on whether the demo has loaded yet,
      // so nothing in the card layout shifts when the chunk arrives.
      className="bg-muted border-border relative flex h-[140px] w-full min-w-0 items-center justify-center overflow-hidden border-b p-6"
      style={{
        // Browser skips layout/paint work entirely for cards far off-screen.
        contentVisibility: "auto",
        containIntrinsicSize: "0 140px",
      }}
    >
      {!hasMounted && <PreviewLoader />}
      {hasMounted && Demo ? <Demo isPlaying={isInView} /> : null}
    </div>
  );
}
