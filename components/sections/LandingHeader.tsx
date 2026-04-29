"use client";

import { useEffect, useState } from "react";
import type { SVGProps } from "react";
import Link from "next/link";

import { LANDING_MOBILE_MEDIA_QUERY } from "@/components/constants/responsive";
import { LogoIcon } from "@/components/assets/logo-icon";
import {
  LANDING_HEADER_HOME_ARIA_LABEL,
  LANDING_HEADER_WAITLIST_BUTTON_TEXT,
} from "@/components/constants/landing-header";
import { HeaderDesktopNav, HeaderMobileMenuButton, HeaderMobileNav } from "@/components/navigation";
import { Button } from "@/components/ui/button";

function ArrowRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden {...props}>
      <path
        d="M4.167 10h11.666m0 0L10 4.167M15.833 10L10 15.833"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LandingHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(LANDING_MOBILE_MEDIA_QUERY);

    const handleViewportChange = (event: MediaQueryListEvent) => {
      if (!event.matches) {
        setIsMobileMenuOpen(false);
      }
    };

    mediaQueryList.addEventListener("change", handleViewportChange);

    return () => {
      mediaQueryList.removeEventListener("change", handleViewportChange);
    };
  }, []);

  const handleWaitlistClick = () => {
    const waitlistSection = document.getElementById("join-waitlist");
    if (!waitlistSection) {
      return;
    }

    waitlistSection.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest",
    });

    setIsMobileMenuOpen(false);
  };

  const handleMobileNavClick = (href: string) => {
    if (!href.startsWith("#")) {
      setIsMobileMenuOpen(false);
      return;
    }

    const section = document.getElementById(href.slice(1));
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }

    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-brand-white px-5 sm:px-6 lg:px-10">
      <div className="relative z-40 mx-auto w-full max-w-screen-2xl py-4">
        <div className="flex items-center justify-between gap-3 md:grid md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
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
              <ArrowRightIcon className="hidden size-4 shrink-0 md:block" />
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
