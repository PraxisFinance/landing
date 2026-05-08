"use client";

import { useIsMobile } from "@/components/providers/mobile-context";
import { LandingHeaderDesktop } from "@/components/sections/header/LandingHeaderDesktop";
import { LandingHeaderMobile } from "@/components/sections/header/LandingHeaderMobile";

/** Mobile vs desktop chrome from centralized viewport (`useIsMobile` / `LANDING_MOBILE_MEDIA_QUERY`). */
export function LandingHeaderResponsive() {
  const isMobile = useIsMobile();

  return isMobile ? <LandingHeaderMobile /> : <LandingHeaderDesktop />;
}
