"use client";

import { useIsMobile } from "@/components/providers/mobile-context";
import { CoverSectionDesktop } from "@/components/sections/cover/CoverSectionDesktop";
import { CoverSectionMobile } from "@/components/sections/cover/CoverSectionMobile";

export type CoverSectionProps = {
  className?: string;
};

/** Picks mobile or desktop cover layout from global viewport (single tree branch). Threshold matches `LANDING_MOBILE_MEDIA_QUERY` (767px), aligned with `next/image` sizes helpers and Tailwind below `md` (768px). */
export function CoverSectionResponsive({ className }: CoverSectionProps) {
  const isMobile = useIsMobile();

  return isMobile ? (
    <CoverSectionMobile className={className} />
  ) : (
    <CoverSectionDesktop className={className} />
  );
}
