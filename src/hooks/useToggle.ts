import { useCallback, useState } from "react";

const useToggle = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggle = useCallback(() => setIsOpen(prev => !prev), [])
  return { isOpen, setIsOpen, toggle };
};

export default useToggle;
