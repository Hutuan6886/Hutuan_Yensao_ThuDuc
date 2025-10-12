import { useRef } from "react";

export function useClickTrigger<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  const trigger = () => {
    if (ref.current) {
      ref.current.click();
    }
  };
  return { ref, trigger };
}
