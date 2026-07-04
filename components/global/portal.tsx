"use client";

import { createPortal } from "react-dom";

export function Portal({ children }: { children: React.ReactNode }) {
  if (typeof window === "undefined") {
    return null;
  }

  const portalRoot = document.getElementById("portal-root");

  if (!portalRoot) {
    return null;
  }

  return createPortal(children, portalRoot);
}
