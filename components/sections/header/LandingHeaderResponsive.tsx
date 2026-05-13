"use client";

import { useIsMobile } from "@/components/providers/mobile-context";
import { LandingHeaderDesktop } from "@/components/sections/header/LandingHeaderDesktop";
import { LandingHeaderMobile } from "@/components/sections/header/LandingHeaderMobile";

/** Mobile vs desktop header chrome from `matchMedia` (desktop assumed until layout effect). */
export function LandingHeaderResponsive() {
  const isMobile = useIsMobile();

  return isMobile ? <LandingHeaderMobile /> : <LandingHeaderDesktop />;
}
