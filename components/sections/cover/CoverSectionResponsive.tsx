"use client";

import { useMobileViewport } from "@/components/providers/mobile-context";
import { CoverSectionDesktop } from "@/components/sections/cover/CoverSectionDesktop";
import { CoverSectionMobile } from "@/components/sections/cover/CoverSectionMobile";
import { CoverSectionViewportSkeleton } from "@/components/viewport/viewport-skeletons";

export type CoverSectionProps = {
  className?: string;
};

/** After viewport snapshot (`matchMedia`), mounts exactly one cover branch (767px threshold). */
export function CoverSectionResponsive({ className }: CoverSectionProps) {
  const { isMobile, isViewportReady } = useMobileViewport();

  if (!isViewportReady) {
    return <CoverSectionViewportSkeleton className={className} />;
  }

  return isMobile ? (
    <CoverSectionMobile className={className} />
  ) : (
    <CoverSectionDesktop className={className} />
  );
}
