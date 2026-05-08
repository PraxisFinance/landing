export const LANDING_MOBILE_MAX_WIDTH_PX = 767;
export const LANDING_MOBILE_MEDIA_QUERY = `(max-width: ${LANDING_MOBILE_MAX_WIDTH_PX}px)`;

/** Matches Tailwind default `md:` (`min-width: 768px`). Pair with {@link LANDING_MOBILE_MEDIA_QUERY} for chrome that mirrors Tailwind breakpoints. */
export const LANDING_DESKTOP_MD_BREAKPOINT_PX = 768 as const;
export const LANDING_DESKTOP_MD_MEDIA_QUERY = `(min-width: ${LANDING_DESKTOP_MD_BREAKPOINT_PX}px)`;
