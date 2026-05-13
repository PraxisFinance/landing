"use client";

import { useIsMobile } from "@/components/providers/mobile-context";
import { UserFlowSectionDesktop } from "@/components/sections/user-flow/UserFlowSectionDesktop";
import { UserFlowSectionMobile } from "@/components/sections/user-flow/UserFlowSectionMobile";

export type UserFlowSectionProps = {
  className?: string;
};

/** User Flow branches on `isMobile`. */
export function UserFlowSectionResponsive({ className }: UserFlowSectionProps) {
  const isMobile = useIsMobile();

  return isMobile ? (
    <UserFlowSectionMobile className={className} />
  ) : (
    <UserFlowSectionDesktop className={className} />
  );
}
