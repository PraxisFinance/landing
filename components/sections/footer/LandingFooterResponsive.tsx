"use client";

import { useMobileViewport } from "@/components/providers/mobile-context";
import { LandingFooterDesktop } from "@/components/sections/footer/LandingFooterDesktop";
import { LandingFooterMobile } from "@/components/sections/footer/LandingFooterMobile";
import { LandingFooterViewportSkeleton } from "@/components/viewport/viewport-skeletons";

/** Footer branches after viewport snapshot; skeleton preserves flex height shell. */
export function LandingFooterResponsive() {
  const { isMobile, isViewportReady } = useMobileViewport();

  if (!isViewportReady) {
    return <LandingFooterViewportSkeleton />;
  }

  return (
    <footer className="mt-auto flex flex-col bg-brand-white lg:min-h-0 lg:flex-1">
      {isMobile ? <LandingFooterMobile /> : <LandingFooterDesktop />}
    </footer>
  );
}
