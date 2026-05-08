"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

import { LANDING_MOBILE_MEDIA_QUERY } from "@/components/constants/responsive";

type MobileContextValue = {
  /** `true` when viewport width is at most 767px (below Tailwind `md`, 768px). */
  isMobile: boolean;
};

const MobileContext = createContext<MobileContextValue | undefined>(undefined);

type MobileProviderProps = {
  children: ReactNode;
};

/**
 * Viewport flag for **section branching** (different mobile/desktop trees). SSR and the first client
 * render use `isMobile === false`, then a microtask syncs `matchMedia`.
 *
 * **Shell chrome** (header/footer) should prefer Tailwind `md:` / `max-md:` in a single component tree
 * so layout does not flash before this context updates.
 */
export function MobileProvider({ children }: MobileProviderProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(LANDING_MOBILE_MEDIA_QUERY);

    const syncMatches = () => setIsMobile(mediaQueryList.matches);
    queueMicrotask(syncMatches);

    mediaQueryList.addEventListener("change", syncMatches);
    return () => mediaQueryList.removeEventListener("change", syncMatches);
  }, []);

  const value = useMemo(() => ({ isMobile }), [isMobile]);

  return <MobileContext.Provider value={value}>{children}</MobileContext.Provider>;
}

export function useIsMobile() {
  const context = useContext(MobileContext);

  if (!context) {
    throw new Error("useIsMobile must be used within MobileProvider");
  }

  return context.isMobile;
}
