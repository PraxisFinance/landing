"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

import { LANDING_MOBILE_MEDIA_QUERY } from "@/components/constants/responsive";

type MobileContextValue = {
  isMobile: boolean;
};

const MobileContext = createContext<MobileContextValue | undefined>(undefined);

type MobileProviderProps = {
  children: ReactNode;
};

export function MobileProvider({ children }: MobileProviderProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(LANDING_MOBILE_MEDIA_QUERY);

    setIsMobile(mediaQueryList.matches);

    const handleViewportChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    mediaQueryList.addEventListener("change", handleViewportChange);
    return () => mediaQueryList.removeEventListener("change", handleViewportChange);
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
