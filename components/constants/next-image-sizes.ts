import { LANDING_MOBILE_MAX_WIDTH_PX } from "@/components/constants/responsive";

/** Shared fragment for `next/image` `sizes`. Matches `useIsMobile` (`LANDING_MOBILE_MEDIA_QUERY`, max-width 767px). */
export const NEXT_IMAGE_LANDING_MOBILE_MEDIA = `(max-width: ${LANDING_MOBILE_MAX_WIDTH_PX}px)`;

/** Join waitlist handheld mock — mobile-only branch (`clamp` slot ≤315px wide). */
export const NEXT_IMAGE_SIZES_JOIN_WAITLIST_MOBILE = `min(94vw, 315px)`;

/**
 * Join waitlist handheld mock — desktop branch (~54% of card). Keeps modest widths so Next doesn’t
 * overserve raster when the slot is smaller than half the viewport.
 */
export const NEXT_IMAGE_SIZES_JOIN_WAITLIST_DESKTOP =
  `(max-width: 1024px) min(42vw, 340px), min(340px, 26vw)`;

/** Social “Get started” web card illustration (bottom-right slot). */
export const NEXT_IMAGE_SIZES_SMJ_WEB_CARD =
  `${NEXT_IMAGE_LANDING_MOBILE_MEDIA} min(100vw - 32px, 680px), 420px`;

/** Social mobile product card illustration (bottom area). */
export const NEXT_IMAGE_SIZES_SMJ_MOBILE_CARD =
  `${NEXT_IMAGE_LANDING_MOBILE_MEDIA} min(100vw - 32px, 680px), 480px`;

/** User Flow central step imagery (hero-sized panel on desktop, nearly full width on mobile branch). */
export const NEXT_IMAGE_SIZES_USER_FLOW_STEP =
  `${NEXT_IMAGE_LANDING_MOBILE_MEDIA} min(92vw, 560px), (max-width: 1280px) min(80vw, 720px), 720px`;
