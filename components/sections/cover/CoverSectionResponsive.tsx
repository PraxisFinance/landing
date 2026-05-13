"use client";

import { useIsMobile } from "@/components/providers/mobile-context";
import { CoverSectionDesktop } from "@/components/sections/cover/CoverSectionDesktop";
import { CoverSectionMobile } from "@/components/sections/cover/CoverSectionMobile";

export type CoverSectionProps = {
  className?: string;
};

/** Single cover branch per `isMobile` (767px threshold). */
export function CoverSectionResponsive({ className }: CoverSectionProps) {
  const isMobile = useIsMobile();

  return isMobile ? (
    <CoverSectionMobile className={className} />
  ) : (
    <CoverSectionDesktop className={className} />
  );
}
