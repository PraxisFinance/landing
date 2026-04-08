import type { SVGProps } from "react";
import Link from "next/link";

import { LogoIcon } from "@/components/assets/logo-icon";
import { HeaderDesktopNav, HeaderMobileMenuButton } from "@/components/navigation";

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
  return (
    <header className="bg-brand-white">
      <div className="mx-auto grid w-full max-w-screen-2xl grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3 px-4 py-4 sm:px-6 lg:px-10">
        <div className="flex min-w-0 items-center">
          <Link
            href="/"
            className="inline-flex shrink-0 text-brand-black"
            aria-label="Praxis, home"
          >
            <LogoIcon className="h-8 w-auto sm:h-9" aria-hidden />
          </Link>
        </div>
        <HeaderDesktopNav />
        <div className="flex items-center justify-end gap-2">
          <HeaderMobileMenuButton />
          <button
            type="button"
            className="hidden items-center gap-2 rounded-xl bg-brand-black px-5 py-2.5 text-sm font-medium text-brand-white transition hover:opacity-90 md:inline-flex"
          >
            Join Waitlist
            <ArrowRightIcon className="size-4 shrink-0" />
          </button>
        </div>
      </div>
    </header>
  );
}
