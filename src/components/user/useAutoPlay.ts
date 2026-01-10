import { useEffect, useRef } from "react";

interface AutoPlayOptions {
  enabled: boolean;
  onNext: () => void;
  delay?: number; // optional
}

const DEFAULT_DELAY = 5000;

export const useAutoPlay = ({
  enabled,
  onNext,
  delay = DEFAULT_DELAY,
}: AutoPlayOptions) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const paused = useRef(false);

  const start = () => {
    if (!enabled) return;
    stop();

    timerRef.current = setInterval(() => {
      if (!paused.current) onNext();
    }, delay);
  };

  const stop = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const pause = () => {
    paused.current = true;
  };

  const resume = () => {
    paused.current = false;
  };

  useEffect(() => {
    start();
    return stop;
  }, [enabled, delay]);

  return { start, stop, pause, resume };
};
