"use client";

import { useRef } from "react";

/**
 * Previously `useInView(sectionRef)` drove card `opacity`; on desktop IO often stayed false while
 * the section title (`whileInView` per word) still animated — only the heading appeared. Mobile
 * looked fine because layout thresholds differed. We keep `sectionInView` as always-on for
 * mounted content; use `whileInView` on individual blocks if we need scroll-gated motion again.
 */
export function useSocialMediaJoinSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const sectionInView = true;

  return {
    sectionRef,
    sectionInView,
  };
}

export type SocialMediaJoinSectionStateBag = ReturnType<typeof useSocialMediaJoinSection>;
