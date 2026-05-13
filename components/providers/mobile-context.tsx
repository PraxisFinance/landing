"use client";

import { createContext, useContext, useMemo, useSyncExternalStore, type ReactNode } from "react";

import { LANDING_MOBILE_MEDIA_QUERY } from "@/components/constants/responsive";

function subscribeToMobileMediaQuery(onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => undefined;
  }
  const mq = window.matchMedia(LANDING_MOBILE_MEDIA_QUERY);
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

function readMobileMediaQuery(): boolean {
  if (typeof window === "undefined") {
    return false;
  }
  return window.matchMedia(LANDING_MOBILE_MEDIA_QUERY).matches;
}

type MobileContextValue = {
  /**
   * `true` when viewport width is at most 767px (below Tailwind `md`, 768px).
   * Server snapshot is desktop (`false`); client reads `matchMedia` via `useSyncExternalStore`.
   */
  isMobile: boolean;
};

const MobileContext = createContext<MobileContextValue | undefined>(undefined);

type MobileProviderProps = {
  children: ReactNode;
};

/**
 * Viewport flag for branching mobile vs desktop trees.
 */
export function MobileProvider({ children }: MobileProviderProps) {
  const isMobile = useSyncExternalStore(subscribeToMobileMediaQuery, readMobileMediaQuery, () => false);

  const value = useMemo(() => ({ isMobile }), [isMobile]);

  return <MobileContext.Provider value={value}>{children}</MobileContext.Provider>;
}

export function useMobileViewport(): MobileContextValue {
  const context = useContext(MobileContext);

  if (!context) {
    throw new Error("useMobileViewport must be used within MobileProvider");
  }

  return context;
}

export function useIsMobile(): boolean {
  return useMobileViewport().isMobile;
}
