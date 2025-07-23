import { useState, useLayoutEffect } from "react";

export function useScrollPosition(elementId: string) {
  const [scrollPosition, setScrollPosition] = useState(0);

  useLayoutEffect(() => {
    const el = document.getElementById(elementId);

    if (!el) return;
    const handleScroll = () => {
      setScrollPosition(el.scrollTop);
    };

    el.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      el.removeEventListener("scroll", handleScroll);
    };
  }, [elementId]);

  return scrollPosition;
}
