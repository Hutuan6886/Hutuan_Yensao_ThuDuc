import { useEffect, RefObject } from "react";

type AnyEvent = MouseEvent | TouchEvent;

export function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T | null>,
  handler: (event: AnyEvent) => void,
  enabled: boolean = true
) {
  useEffect(() => {
    if (!enabled) return;

    const listener = (event: AnyEvent) => {
      const el = ref.current;
      if (!el) return;

      // click inside → ignore
      if (el.contains(event.target as Node)) return;

      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler, enabled]);
}
