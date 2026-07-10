"use client";

import { PackageManagerCommand } from "@/registry/components/package-manager-command";

export default function PackageManagerCommandDemo() {
  return (
    <div className="w-full md:w-[80%] mx-4 md:mx-auto max-w-2xl">
      <PackageManagerCommand npmCommand="npm install motion" />
    </div>
  );
}
