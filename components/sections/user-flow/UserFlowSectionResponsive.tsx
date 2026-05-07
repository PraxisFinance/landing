"use client";

import { useIsMobile } from "@/components/providers/mobile-context";
import { UserFlowSectionDesktop } from "@/components/sections/user-flow/UserFlowSectionDesktop";
import { UserFlowSectionMobile } from "@/components/sections/user-flow/UserFlowSectionMobile";

export type UserFlowSectionProps = {
  className?: string;
};

/** Picks mobile or desktop User Flow layout from global viewport (single tree branch). */
export function UserFlowSectionResponsive({ className }: UserFlowSectionProps) {
  const isMobile = useIsMobile();

  return isMobile ? (
    <UserFlowSectionMobile className={className} />
  ) : (
    <UserFlowSectionDesktop className={className} />
  );
}
