"use client";

import { useMobileViewport } from "@/components/providers/mobile-context";
import { JoinWaitlistSectionDesktop } from "@/components/sections/join-waitlist/JoinWaitlistSectionDesktop";
import { JoinWaitlistSectionMobile } from "@/components/sections/join-waitlist/JoinWaitlistSectionMobile";
import { useJoinWaitlistCardReveal } from "@/components/sections/join-waitlist/use-join-waitlist-card-reveal";
import { useJoinWaitlistForm } from "@/components/sections/join-waitlist/use-join-waitlist-form";
import { SectionViewportPlaceholder } from "@/components/viewport/viewport-skeletons";

export type JoinWaitlistSectionProps = {
  className?: string;
};

/** Waitlist branches after viewport snapshot (hooks stay mounted through placeholder). */
export function JoinWaitlistSectionResponsive({ className }: JoinWaitlistSectionProps) {
  const { isMobile, isViewportReady } = useMobileViewport();
  const form = useJoinWaitlistForm();
  const reveal = useJoinWaitlistCardReveal();

  if (!isViewportReady) {
    return <SectionViewportPlaceholder className={className} minHeightClass="min-h-[480px]" />;
  }

  return isMobile ? (
    <JoinWaitlistSectionMobile className={className} {...form} {...reveal} />
  ) : (
    <JoinWaitlistSectionDesktop className={className} {...form} {...reveal} />
  );
}
