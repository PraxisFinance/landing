"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

import { LANDING_MOBILE_MEDIA_QUERY } from "@/components/constants/responsive";

type MobileContextValue = {
  /** Reliable after `isViewportReady` is true (matches `LANDING_MOBILE_MEDIA_QUERY`). */
  isMobile: boolean;
  /** False during SSR and until the first client `matchMedia` read (same microtask batch). */
  isViewportReady: boolean;
};

const MobileContext = createContext<MobileContextValue | undefined>(undefined);

type MobileProviderProps = {
  children: ReactNode;
};

/**
 * Central viewport store for mobile vs desktop branches. Consumers that render **different trees**
 * should wait for `isViewportReady` (see `useMobileViewport`) and show a skeleton/placeholder until
 * then—otherwise the first paint assumes desktop (`isMobile === false`) before sync.
 */
export function MobileProvider({ children }: MobileProviderProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isViewportReady, setViewportReady] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(LANDING_MOBILE_MEDIA_QUERY);

    const applyInitialViewport = () => {
      setIsMobile(mq.matches);
      setViewportReady(true);
    };

    queueMicrotask(applyInitialViewport);

    const onChange = () => {
      setIsMobile(mq.matches);
    };

    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const value = useMemo(() => ({ isMobile, isViewportReady }), [isMobile, isViewportReady]);

  return <MobileContext.Provider value={value}>{children}</MobileContext.Provider>;
}

export function useMobileViewport(): MobileContextValue {
  const context = useContext(MobileContext);

  if (!context) {
    throw new Error("useMobileViewport must be used within MobileProvider");
  }

  return context;
}

/** Current mobile flag; safe once ancestors gated on `isViewportReady` before branching. */
export function useIsMobile(): boolean {
  return useMobileViewport().isMobile;
}
