"use client";

import { useIsMobile } from "@/components/providers/mobile-context";
import { LandingHeaderDesktop } from "@/components/sections/header/LandingHeaderDesktop";
import { LandingHeaderMobile } from "@/components/sections/header/LandingHeaderMobile";

/** Picks mobile or desktop header layout from global viewport (single tree branch). */
export function LandingHeaderResponsive() {
  const isMobile = useIsMobile();

  return isMobile ? <LandingHeaderMobile /> : <LandingHeaderDesktop />;
}
