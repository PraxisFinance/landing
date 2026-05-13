"use client";

import { useIsMobile } from "@/components/providers/mobile-context";
import { AboutSectionDesktop } from "@/components/sections/about/AboutSectionDesktop";
import { AboutSectionMobile } from "@/components/sections/about/AboutSectionMobile";

export type AboutSectionProps = {
  className?: string;
};

/** About branches on `isMobile`. */
export function AboutSectionResponsive({ className }: AboutSectionProps) {
  const isMobile = useIsMobile();

  return isMobile ? (
    <AboutSectionMobile className={className} />
  ) : (
    <AboutSectionDesktop className={className} />
  );
}
