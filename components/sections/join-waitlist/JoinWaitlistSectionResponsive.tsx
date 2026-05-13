"use client";

import { useIsMobile } from "@/components/providers/mobile-context";
import { JoinWaitlistSectionDesktop } from "@/components/sections/join-waitlist/JoinWaitlistSectionDesktop";
import { JoinWaitlistSectionMobile } from "@/components/sections/join-waitlist/JoinWaitlistSectionMobile";
import { useJoinWaitlistCardReveal } from "@/components/sections/join-waitlist/use-join-waitlist-card-reveal";
import { useJoinWaitlistForm } from "@/components/sections/join-waitlist/use-join-waitlist-form";

export type JoinWaitlistSectionProps = {
  className?: string;
};

/** Waitlist branches on `isMobile`. */
export function JoinWaitlistSectionResponsive({ className }: JoinWaitlistSectionProps) {
  const isMobile = useIsMobile();
  const form = useJoinWaitlistForm();
  const reveal = useJoinWaitlistCardReveal();

  return isMobile ? (
    <JoinWaitlistSectionMobile className={className} {...form} {...reveal} />
  ) : (
    <JoinWaitlistSectionDesktop className={className} {...form} {...reveal} />
  );
}
