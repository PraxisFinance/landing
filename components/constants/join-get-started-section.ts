import type { ComponentType } from "react";

import { RedditIcon } from "@/components/assets/reddit-icon";
import { SocialDiscordIcon } from "@/components/assets/social-discord-icon";
import { SocialTelegramIcon } from "@/components/assets/social-telegram-icon";
import { SocialXIcon } from "@/components/assets/social-x-icon";

export const JOIN_GET_STARTED_CARDS = {
  web: "/main/join-web.png",
  mobile: "/main/join-mobile.png",
  community: "/main/join-social-media.png",
} as const;

export const JOIN_GET_STARTED_WEB_CARD_BG = "#9D94FF";
export const JOIN_GET_STARTED_MOBILE_CARD_BG = "#0B5350";

export const JOIN_GET_STARTED_PRODUCT_BG_CIRCLE_PX_DESKTOP = 145;
export const JOIN_GET_STARTED_PRODUCT_BG_CIRCLE_COUNT_DESKTOP = 6;
/** Praxis Web / Mobile cards: `useIsMobile()` — left-aligned grid, may clip on the right */
export const JOIN_GET_STARTED_PRODUCT_BG_CIRCLE_PX_MOBILE = 90;
export const JOIN_GET_STARTED_PRODUCT_BG_CIRCLE_COUNT_MOBILE = 8;

export const JOIN_GET_STARTED_PRODUCT_CARD_MAX_W = 710;
export const JOIN_GET_STARTED_PRODUCT_CARD_MIN_H = 310;
/** Praxis Web / Praxis Mobile cards below `md` */
export const JOIN_GET_STARTED_PRODUCT_CARD_HEIGHT_MOBILE_PX = 245;

export const JOIN_GET_STARTED_SECTION_TITLE = "Join Praxis to get started";
export const JOIN_GET_STARTED_WEB_TITLE = "Praxis Web";
export const JOIN_GET_STARTED_WEB_DESCRIPTION =
  "Full functionality available in your browser.";
export const JOIN_GET_STARTED_MOBILE_TITLE = "Praxis for Mobile";
export const JOIN_GET_STARTED_MOBILE_DESCRIPTION = "Mobile application in BaseApp.";
export const JOIN_GET_STARTED_MOBILE_BUTTON_TEXT = "Get early access";
export const JOIN_GET_STARTED_COMMUNITY_TITLE = "Join the Praxis community";
export const JOIN_GET_STARTED_COMMUNITY_DESCRIPTION =
  "Here you will find protocol news, updates on upcoming and live esport events, and guides on how to yield, earn, and predict efficiently.";

export type JoinGetStartedCommunityLink = {
  label: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
};

export const JOIN_GET_STARTED_COMMUNITY_LINKS: JoinGetStartedCommunityLink[] = [
  { label: "Twitter", href: "https://x.com/praxis_Base", icon: SocialXIcon },
  { label: "Discord", href: "#", icon: SocialDiscordIcon },
  { label: "Telegram", href: "#", icon: SocialTelegramIcon },
  { label: "Reddit", href: "#", icon: RedditIcon },
];

export const JOIN_GET_STARTED_WEB_STATUS = {
  label: "MVP",
  text: "In development",
} as const;

export const JOIN_GET_STARTED_MOBILE_STATUS = {
  label: "MVP",
  text: "Waitlist opened",
} as const;

export const JOIN_GET_STARTED_IMAGE_ALT = {
  web: "Praxis Web",
  mobile: "Praxis for Mobile",
  community: "Discord, Telegram, X, and Reddit",
} as const;
