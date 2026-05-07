"use client";

import { useIsMobile } from "@/components/providers/mobile-context";
import { CoverSectionDesktop } from "@/components/sections/cover/CoverSectionDesktop";
import { CoverSectionMobile } from "@/components/sections/cover/CoverSectionMobile";
import { cn } from "@/lib/utils";

export type CoverSectionProps = {
  className?: string;
};

/** Picks mobile or desktop cover layout from global viewport (single tree branch). */
export function CoverSectionResponsive({ className }: CoverSectionProps) {
  const isMobile = useIsMobile();

  return isMobile ? (
    <CoverSectionMobile className={className} />
  ) : (
    <CoverSectionDesktop className={className} />
  );
}
