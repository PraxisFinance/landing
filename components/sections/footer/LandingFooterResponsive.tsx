"use client";

import { useIsMobile } from "@/components/providers/mobile-context";
import { LandingFooterDesktop } from "@/components/sections/footer/LandingFooterDesktop";
import { LandingFooterMobile } from "@/components/sections/footer/LandingFooterMobile";

/** Footer branches on `isMobile`. */
export function LandingFooterResponsive() {
  const isMobile = useIsMobile();

  return (
    <footer className="mt-auto flex flex-col bg-brand-white lg:min-h-0 lg:flex-1">
      {isMobile ? <LandingFooterMobile /> : <LandingFooterDesktop />}
    </footer>
  );
}
