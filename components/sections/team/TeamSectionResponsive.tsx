"use client";

import { SECTION_TEXT_SIZES } from "@/components/constants/text-sizes";
import { useIsMobile } from "@/components/providers/mobile-context";
import { TeamSectionDesktop } from "@/components/sections/team/TeamSectionDesktop";
import { TeamSectionMobile } from "@/components/sections/team/TeamSectionMobile";
import { useTeamCarousel } from "@/components/sections/team/use-team-carousel";

export type TeamSectionProps = {
  className?: string;
};

/** One carousel hook (refs attach to the mounted section); separate mobile/desktop tracks & layouts. */
export function TeamSectionResponsive({ className }: TeamSectionProps) {
  const isMobile = useIsMobile();
  const carousel = useTeamCarousel(isMobile);

  const team = SECTION_TEXT_SIZES.team;
  const textClasses = {
    titleTextClass: isMobile ? team.title.mobile : team.title.desktop,
    cardNameTextClass: isMobile ? team.cardName.mobile : team.cardName.desktop,
    cardBioTextClass: isMobile ? team.cardBio.mobile : team.cardBio.desktop,
    roleBadgeTextClass: isMobile ? team.roleBadge.mobile : team.roleBadge.desktop,
  };

  return isMobile ? (
    <TeamSectionMobile className={className} {...carousel} {...textClasses} />
  ) : (
    <TeamSectionDesktop className={className} {...carousel} {...textClasses} />
  );
}
