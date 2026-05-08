"use client";

import Link from "next/link";

import { LogoIcon } from "@/components/assets/logo-icon";
import {
  LANDING_HEADER_HOME_ARIA_LABEL,
  LANDING_HEADER_WAITLIST_BUTTON_TEXT,
} from "@/components/constants/landing-header";
import { HeaderDesktopNav } from "@/components/navigation";
import {
  LandingHeaderArrowRightIcon,
  landingHeaderScrollToWaitlist,
} from "@/components/sections/header/landing-header-shared";
import { Button } from "@/components/ui/button";

export function LandingHeaderDesktop() {
  return (
    <header className="bg-brand-white px-5 sm:px-6 lg:px-10">
      <div className="relative z-40 mx-auto w-full max-w-screen-2xl py-4">
        <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3">
          <div className="flex min-w-0 items-center">
            <Link
              href="/"
              className="inline-flex shrink-0 text-brand-black"
              aria-label={LANDING_HEADER_HOME_ARIA_LABEL}
            >
              <LogoIcon className="h-8 w-auto sm:h-9" aria-hidden />
            </Link>
          </div>

          <HeaderDesktopNav forceVisible />

          <div className="flex items-center justify-end gap-2">
            <Button
              type="button"
              variant="landing-black"
              size="landing-sm"
              className="items-center justify-end rounded-md ui-button-2"
              onClick={landingHeaderScrollToWaitlist}
            >
              {LANDING_HEADER_WAITLIST_BUTTON_TEXT}
              <LandingHeaderArrowRightIcon className="size-4 shrink-0" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
