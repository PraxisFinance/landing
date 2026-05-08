"use client";

import { useState } from "react";
import Link from "next/link";

import { LogoIcon } from "@/components/assets/logo-icon";
import {
  LANDING_HEADER_HOME_ARIA_LABEL,
  LANDING_HEADER_WAITLIST_BUTTON_TEXT,
} from "@/components/constants/landing-header";
import { HeaderMobileMenuButton, HeaderMobileNav } from "@/components/navigation";
import {
  landingHeaderScrollToSectionHref,
  landingHeaderScrollToWaitlist,
} from "@/components/sections/header/landing-header-shared";
import { Button } from "@/components/ui/button";

export function LandingHeaderMobile() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center">
            <Link
              href="/"
              className="inline-flex shrink-0 text-brand-black"
              aria-label={LANDING_HEADER_HOME_ARIA_LABEL}
            >
              <LogoIcon className="h-8 w-auto sm:h-9" aria-hidden />
            </Link>
          </div>

          <div className="flex items-center justify-end gap-2">
            <Button
              type="button"
              variant="landing-black"
              size="landing-sm"
              className="items-center justify-end rounded-md ui-text-8"
              onClick={handleWaitlistClick}
            >
              {LANDING_HEADER_WAITLIST_BUTTON_TEXT}
            </Button>
            <HeaderMobileMenuButton
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
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
