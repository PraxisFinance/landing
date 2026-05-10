"use client";

import { useMobileViewport } from "@/components/providers/mobile-context";
import { UserFlowSectionDesktop } from "@/components/sections/user-flow/UserFlowSectionDesktop";
import { UserFlowSectionMobile } from "@/components/sections/user-flow/UserFlowSectionMobile";
import { SectionViewportPlaceholder } from "@/components/viewport/viewport-skeletons";

export type UserFlowSectionProps = {
  className?: string;
};

/** User Flow branches after viewport snapshot. */
export function UserFlowSectionResponsive({ className }: UserFlowSectionProps) {
  const { isMobile, isViewportReady } = useMobileViewport();

  if (!isViewportReady) {
    return <SectionViewportPlaceholder className={className} minHeightClass="min-h-[560px]" />;
  }

  return isMobile ? (
    <UserFlowSectionMobile className={className} />
  ) : (
    <UserFlowSectionDesktop className={className} />
  );
}
