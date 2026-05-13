/**
 * Shared Framer in-view tuning. Strict numeric `amount` often never fires in production (layout,
 * fonts, images) so copy-driven blocks stay at `opacity: 0`. Use with `useInView` / `viewport`.
 */
export const landingLenientInViewOnce = {
  once: true,
  amount: "some" as const,
  margin: "0px 0px 45% 0px" as const,
};

/** Same thresholds but without `once` (for state that should track enter/leave). */
export const landingLenientInView = {
  amount: "some" as const,
  margin: "0px 0px 40% 0px" as const,
};

/** For `motion` / `whileInView` `viewport` prop (same thresholds as {@link landingLenientInViewOnce}). */
export const landingLenientMotionViewport = {
  once: true,
  amount: "some" as const,
  margin: "0px 0px 45% 0px" as const,
};
