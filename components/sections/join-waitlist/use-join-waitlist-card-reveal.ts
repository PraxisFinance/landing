"use client";

import { useEffect, useRef, useState } from "react";

export function useJoinWaitlistCardReveal() {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [shouldAnimateIn, setShouldAnimateIn] = useState(false);

  useEffect(() => {
    const checkVisibility = () => {
      const node = cardRef.current;
      if (!node || shouldAnimateIn) return;
      const rect = node.getBoundingClientRect();
      const isVisible = rect.top <= window.innerHeight * 0.78 && rect.bottom >= 0;
      if (isVisible) {
        setShouldAnimateIn(true);
      }
    };

    checkVisibility();
    window.addEventListener("scroll", checkVisibility, { passive: true });
    return () => window.removeEventListener("scroll", checkVisibility);
  }, [shouldAnimateIn]);

  return { cardRef, shouldAnimateIn };
}

export type JoinWaitlistCardRevealBag = ReturnType<typeof useJoinWaitlistCardReveal>;
