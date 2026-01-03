import { useEffect, useState } from "react";
const useSize = () => {
  const [clientWidth, setClientWidth] = useState<number>(0);
  const [clientHeight, setClientHeight] = useState<number>(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const windowSizeHandler = () => {
      setClientWidth(window.innerWidth);
      setClientHeight(window.innerHeight);
    };
    windowSizeHandler(); // Init once when mounted
    window.addEventListener("resize", windowSizeHandler);

    return () => {
      window.removeEventListener("resize", windowSizeHandler);
    };
  }, []);

  return { clientWidth, clientHeight };
};

export default useSize;
