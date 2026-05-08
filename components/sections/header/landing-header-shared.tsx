"use client";

import type { SVGProps } from "react";

export function LandingHeaderArrowRightIcon(props: SVGProps<SVGSVGElement>) {
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

export function landingHeaderScrollToWaitlist() {
  const waitlistSection = document.getElementById("join-waitlist");
  if (!waitlistSection) {
    return;
  }

  waitlistSection.scrollIntoView({
    behavior: "smooth",
    block: "center",
    inline: "nearest",
  });
}

/** Scroll to hash target; returns whether navigation was handled as in-page anchor. */
export function landingHeaderScrollToSectionHref(href: string) {
  if (!href.startsWith("#")) {
    return false;
  }

  const section = document.getElementById(href.slice(1));
  if (!section) {
    return false;
  }

  section.scrollIntoView({
    behavior: "smooth",
    block: "start",
    inline: "nearest",
  });

  return true;
}
