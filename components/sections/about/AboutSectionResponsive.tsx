"use client";

import { useMobileViewport } from "@/components/providers/mobile-context";
import { AboutSectionDesktop } from "@/components/sections/about/AboutSectionDesktop";
import { AboutSectionMobile } from "@/components/sections/about/AboutSectionMobile";
import { SectionViewportPlaceholder } from "@/components/viewport/viewport-skeletons";

export type AboutSectionProps = {
  className?: string;
};

/** About branches after viewport snapshot. */
export function AboutSectionResponsive({ className }: AboutSectionProps) {
  const { isMobile, isViewportReady } = useMobileViewport();

  if (!isViewportReady) {
    return <SectionViewportPlaceholder className={className} minHeightClass="min-h-[520px]" />;
  }

  return isMobile ? (
    <AboutSectionMobile className={className} />
  ) : (
    <AboutSectionDesktop className={className} />
  );
}
