/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

const useOutSideClick = (ref: any) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClickOutside = (event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);
  return { isOpen, setIsOpen };
};

export default useOutSideClick;
