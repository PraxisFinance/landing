/**
 * Module specifiers for below-the-fold landing chunks. Keep in sync with
 * `next/dynamic` imports in `app/page.tsx` so prefetch warms the same webpack chunks.
 */
export const LANDING_BELOW_FOLD_IMPORTS = [
  () => import("@/components/sections/join-waitlist/JoinWaitlistSection"),
  () => import("@/components/sections/roadmap/ProjectRoadmapSection"),
  () => import("@/components/sections/team/TeamSection"),
  () => import("@/components/sections/faq/FAQSection"),
  () => import("@/components/sections/social-media-join/SocialMediaJoinSection"),
  () => import("@/components/sections/LandingFooter"),
] as const;

/**
 * After first paint, loads below-fold section chunks sequentially during idle time
 * so scrolling usually hits already-fetched JS (best-effort; hydration may overlap).
 */
export function prefetchLandingBelowFoldChunksInOrder(): void {
  if (typeof window === "undefined") {
    return;
  }

  const run = async () => {
    for (const load of LANDING_BELOW_FOLD_IMPORTS) {
      try {
        await load();
      } catch {
        /* ignore failed prefetch */
      }
    }
  };

  if (typeof requestIdleCallback !== "undefined") {
    requestIdleCallback(() => {
      void run();
    });
    return;
  }

  setTimeout(() => {
    void run();
  }, 1);
}
