import { Info } from "lucide-react";

export function LabDisclaimer() {
  return (
    <div className="bg-card border-border rounded-xl border p-5">
      <div className="flex items-start gap-3">
        <div className="bg-accent text-accent-foreground flex size-8 shrink-0 items-center justify-center rounded-full">
          <Info className="size-4" />
        </div>

        <div className="min-w-0">
          <h3 className="text-card-foreground text-sm font-semibold">
            Just a heads up
          </h3>

          <div className="text-muted-foreground mt-2 space-y-3 text-sm leading-6">
            <p>
              These components are part of my learning journey. I&apos;m building
              them to practice motion, interactions, and UI engineering, so
              think of them as experiments rather than production-ready
              components.
            </p>

            <p>
              Most of the ideas are inspired by incredible work from designers
              and developers across the internet. I&apos;m not the original creator
              of those concepts, and I&apos;ve added proper credit and links to the
              original sources wherever I could.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
