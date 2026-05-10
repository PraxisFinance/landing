"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";

export function useSocialMediaJoinSection(inViewAmount = 0.35) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const sectionInView = useInView(sectionRef, { once: true, amount: inViewAmount });

  return {
    sectionRef,
    sectionInView,
  };
}

export type SocialMediaJoinSectionStateBag = ReturnType<typeof useSocialMediaJoinSection>;
