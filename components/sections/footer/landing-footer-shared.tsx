"use client";

import type { MouseEventHandler } from "react";

import { SocialDiscordIcon } from "@/components/assets/social-discord-icon";
import { SocialTelegramIcon } from "@/components/assets/social-telegram-icon";
import { SocialXIcon } from "@/components/assets/social-x-icon";

export const LANDING_FOOTER_LINK_TARGETS: Record<string, string> = {
  "About product": "#about",
  Team: "#team-section",
  Roadmap: "#roadmap-section",
  Contacts: "#social-media-join",
  FAQ: "#faqSection",
  "Web dApp": "#social-media-join",
  "Mobile App": "#social-media-join",
};

export const LANDING_FOOTER_SOCIAL_ICON_COMPONENTS = {
  x: SocialXIcon,
  telegram: SocialTelegramIcon,
  discord: SocialDiscordIcon,
} as const;

export const handleLandingFooterAnchorClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
  const href = event.currentTarget.getAttribute("href");
  if (!href || !href.startsWith("#") || href === "#") {
    return;
  }

  const targetId = href.slice(1);
  const targetElement = document.getElementById(targetId);
  if (!targetElement) {
    return;
  }

  event.preventDefault();
  targetElement.scrollIntoView({
    behavior: "smooth",
    block: "center",
    inline: "nearest",
  });
};
