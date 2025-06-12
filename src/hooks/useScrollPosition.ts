import { useEffect, useState } from "react";

export const useScrollPosition = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const updateScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", updateScroll);
    updateScroll(); // Set initial value

    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  return scrollY;
};
