import { useEffect, useState } from "react";

const useScrollNav = (
  imageRef: React.RefObject<HTMLImageElement | null>,
  clientWidth: number
): [boolean, number] => {
  const [imageHeight, setImageHeight] = useState<number>(1000);
  const [isFixedNav, setIsFixedNav] = useState<boolean>(false);

  useEffect(() => {
    if (imageRef.current) {
      setImageHeight(imageRef.current.clientHeight);
    }
  }, [clientWidth]);

  useEffect(() => {
    const scrollNav = (): void => {
      const shouldBeFixed = window.scrollY > imageHeight;
      if (shouldBeFixed !== isFixedNav) {
        setIsFixedNav(shouldBeFixed);
      }
    };
    //todo: handle scroll
    window.addEventListener("scroll", scrollNav);

    return () => window.removeEventListener("scroll", scrollNav);
  });

  return [isFixedNav, imageHeight];
};

export default useScrollNav;
