import { useCallback, useRef, useState } from "react";

function useLoading<T extends (...args: any[]) => Promise<any>>(fn: T) {
  const [isLoading, setIsLoading] = useState(false);
  const controllerRef = useRef<AbortController | null>(null);

  const wrappedFn = useCallback(
    async (...args: Parameters<T>): Promise<ReturnType<T>> => {
      // Hủy request trước nếu đang có
      controllerRef.current?.abort();
      // Tạo đối tượng controller mới
      const controller = new AbortController();
      controllerRef.current = controller;
      setIsLoading(true);
      try {
        // @ts-ignore preserve typing of fn return
        // Truyền signal vào fn
        return await fn(...(args as any), controller.signal);
      } finally {
        setIsLoading(false);
        controllerRef.current = null;
      }
    },
    [fn]
  );

  const cancelRequest = useCallback(() => {
    controllerRef.current?.abort();
    controllerRef.current = null;
  }, []);

  return { isLoading, run: wrappedFn, cancelRequest };
}

export default useLoading;
