import { useEffect, useRef, RefObject } from "react";

type OutsideClickTarget =
  Document | HTMLElement | RefObject<HTMLElement | null> | null;

export function useOutsideClick<T extends HTMLElement = HTMLDivElement>(
  callback: () => void,
  target?: OutsideClickTarget,
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    // Resolve the actual DOM node/document to attach the listener to
    const resolvedTarget =
      target ?? (typeof document !== "undefined" ? document : null);
    const node: EventTarget | null =
      resolvedTarget && "current" in resolvedTarget
        ? resolvedTarget.current
        : resolvedTarget;

    if (!node) return;

    node.addEventListener("click", handleClick as EventListener);

    return () =>
      node.removeEventListener("click", handleClick as EventListener);
  }, [callback, target]);

  return ref;
}
