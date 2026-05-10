/**
 * Cover layout variant (`CoverSectionMobile` vs `CoverSectionDesktop`) follows `useIsMobile`
 * (`LANDING_MOBILE_MEDIA_QUERY`, viewport ≤767px). Tailwind `sm:` classes inside `CoverSectionMobile`
 * only refine spacing within that branch (default 640px breakpoint).
 */
export const COVER_SECTION_BG_MOBILE = "/main/cover-section-mobile.png";
export const COVER_SECTION_BG_DESKTOP = "/main/join-section.png";

export const COVER_SECTION_HEADLINE_LINES = [
  "Predict with yield.",
  "Keep your principal.",
] as const;

export const COVER_SECTION_SUBHEAD_COPY =
  "Praxis lets you deposit to a vault, earn yield,\nand place predictions using yield.";

export const COVER_SECTION_WAITLIST_BUTTON_TEXT = "Join Waitlist";
