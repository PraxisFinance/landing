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
 * Viewport flag for **branching** mobile vs desktop trees (`useIsMobile`).
 * SSR and the first client render use `isMobile === false`, then a microtask syncs `matchMedia`.
 *
 * Prefer this hook over Tailwind `md:` / `max-md:` when the project intentionally renders a single
 * layout variant (card stacks, section shells). Header/footer follow this pattern via responsive wrappers.
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
