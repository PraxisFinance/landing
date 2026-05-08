"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { LogoIcon } from "@/components/assets/logo-icon";
import { LANDING_MOBILE_MEDIA_QUERY } from "@/components/constants/responsive";
import {
  LANDING_HEADER_HOME_ARIA_LABEL,
  LANDING_HEADER_WAITLIST_BUTTON_TEXT,
} from "@/components/constants/landing-header";
import { HeaderDesktopNav, HeaderMobileMenuButton, HeaderMobileNav } from "@/components/navigation";
import {
  LandingHeaderArrowRightIcon,
  landingHeaderScrollToSectionHref,
  landingHeaderScrollToWaitlist,
} from "@/components/sections/header/landing-header-shared";
import { Button } from "@/components/ui/button";

/** Single chrome tree: desktop dropdown nav hidden below `md` via Tailwind (no viewport-context flicker). */
export function LandingHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const mqMobile = window.matchMedia(LANDING_MOBILE_MEDIA_QUERY);

    const closeMenuWhenLeavingMobileLayout = () => {
      if (!mqMobile.matches) {
        setIsMobileMenuOpen(false);
      }
    };

    queueMicrotask(closeMenuWhenLeavingMobileLayout);

    mqMobile.addEventListener("change", closeMenuWhenLeavingMobileLayout);

    return () => mqMobile.removeEventListener("change", closeMenuWhenLeavingMobileLayout);
  }, []);

  const handleWaitlistClick = () => {
    landingHeaderScrollToWaitlist();
    setIsMobileMenuOpen(false);
  };

  const handleMobileNavClick = (href: string) => {
    if (!href.startsWith("#")) {
      setIsMobileMenuOpen(false);
      return;
    }

    landingHeaderScrollToSectionHref(href);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-brand-white px-5 sm:px-6 lg:px-10">
      <div className="relative z-40 mx-auto w-full max-w-screen-2xl py-4">
        <div className="flex items-center justify-between gap-3 md:grid md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:items-center">
          <div className="flex min-w-0 items-center">
            <Link
              href="/"
              className="inline-flex shrink-0 text-brand-black"
              aria-label={LANDING_HEADER_HOME_ARIA_LABEL}
            >
              <LogoIcon className="h-8 w-auto sm:h-9" aria-hidden />
            </Link>
          </div>

          <HeaderDesktopNav />

          <div className="flex items-center justify-end gap-2">
            <Button
              type="button"
              variant="landing-black"
              size="landing-sm"
              className="items-center justify-end rounded-md ui-text-8 md:ui-button-2"
              onClick={handleWaitlistClick}
            >
              {LANDING_HEADER_WAITLIST_BUTTON_TEXT}
              <LandingHeaderArrowRightIcon className="hidden size-4 shrink-0 md:block" />
            </Button>
            <HeaderMobileMenuButton
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((open) => !open)}
            />
          </div>
        </div>

        <HeaderMobileNav
          isOpen={isMobileMenuOpen}
          onNavigate={handleMobileNavClick}
          onWaitlistClick={handleWaitlistClick}
          waitlistLabel={LANDING_HEADER_WAITLIST_BUTTON_TEXT}
        />
      </div>
    </header>
  );
}
