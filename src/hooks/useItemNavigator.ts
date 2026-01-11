import { useCallback, useState } from "react";

export const useItemNavigator = (total: number, InitialIndex?: number) => {
  const [index, setIndex] = useState(InitialIndex || 0);

  const hasItems = total > 0;

  const next = useCallback(() => {
    if (!hasItems) return;
    setIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  }, [total, hasItems]);

  const prev = useCallback(() => {
    if (!hasItems) return;
    setIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  }, [total, hasItems]);

  const goTo = useCallback(
    (i: number) => {
      if (!hasItems) return;
      if (i < 0 || i >= total) return;
      setIndex(i);
    },
    [total, hasItems]
  );

  return {
    index,
    setIndex,
    next,
    prev,
    goTo,
    canNext: hasItems && total > 1,
    canPrev: hasItems && total > 1,
  };
};
