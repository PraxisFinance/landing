"use client";

import { useIsMobile } from "@/components/providers/mobile-context";
import { UserFlowSectionDesktop } from "@/components/sections/user-flow/UserFlowSectionDesktop";
import { UserFlowSectionMobile } from "@/components/sections/user-flow/UserFlowSectionMobile";

type UserFlowSectionProps = {
  className?: string;
};

export function UserFlowSection({ className }: UserFlowSectionProps) {
  const isMobile = useIsMobile();
  return isMobile ? (
    <UserFlowSectionMobile className={className} />
  ) : (
    <UserFlowSectionDesktop className={className} />
  );
}
