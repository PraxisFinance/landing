"use client";

import { useMobileViewport } from "@/components/providers/mobile-context";
import { LandingHeaderDesktop } from "@/components/sections/header/LandingHeaderDesktop";
import { LandingHeaderMobile } from "@/components/sections/header/LandingHeaderMobile";
import { LandingHeaderViewportSkeleton } from "@/components/viewport/viewport-skeletons";

/** Mobile vs desktop chrome after viewport snapshot (`matchMedia`), never wrong-branch flash. */
export function LandingHeaderResponsive() {
  const { isMobile, isViewportReady } = useMobileViewport();

  if (!isViewportReady) {
    return <LandingHeaderViewportSkeleton />;
  }

  return isMobile ? <LandingHeaderMobile /> : <LandingHeaderDesktop />;
}
