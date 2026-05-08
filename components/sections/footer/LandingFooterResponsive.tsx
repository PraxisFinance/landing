"use client";

import { useIsMobile } from "@/components/providers/mobile-context";
import { LandingFooterDesktop } from "@/components/sections/footer/LandingFooterDesktop";
import { LandingFooterMobile } from "@/components/sections/footer/LandingFooterMobile";

/** Picks mobile or desktop footer layout from global viewport (single tree branch). */
export function LandingFooterResponsive() {
  const isMobile = useIsMobile();

  return isMobile ? <LandingFooterMobile /> : <LandingFooterDesktop />;
}
