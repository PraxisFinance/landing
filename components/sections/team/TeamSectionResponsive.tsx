"use client";

import { SECTION_TEXT_SIZES } from "@/components/constants/text-sizes";
import { useMobileViewport } from "@/components/providers/mobile-context";
import { TeamSectionDesktop } from "@/components/sections/team/TeamSectionDesktop";
import { TeamSectionMobile } from "@/components/sections/team/TeamSectionMobile";
import { useTeamCarousel } from "@/components/sections/team/use-team-carousel";
import { SectionViewportPlaceholder } from "@/components/viewport/viewport-skeletons";

export type TeamSectionProps = {
  className?: string;
};

/** Team branches after viewport snapshot (carousel hook tracks pending desktop assumption briefly). */
export function TeamSectionResponsive({ className }: TeamSectionProps) {
  const { isMobile, isViewportReady } = useMobileViewport();
  const carousel = useTeamCarousel(isMobile);

  const team = SECTION_TEXT_SIZES.team;
  const textClasses = {
    titleTextClass: isMobile ? team.title.mobile : team.title.desktop,
    cardNameTextClass: isMobile ? team.cardName.mobile : team.cardName.desktop,
    cardBioTextClass: isMobile ? team.cardBio.mobile : team.cardBio.desktop,
    roleBadgeTextClass: isMobile ? team.roleBadge.mobile : team.roleBadge.desktop,
  };

  if (!isViewportReady) {
    return <SectionViewportPlaceholder className={className} minHeightClass="min-h-[520px]" />;
  }

  return isMobile ? (
    <TeamSectionMobile className={className} {...carousel} {...textClasses} />
  ) : (
    <TeamSectionDesktop className={className} {...carousel} {...textClasses} />
  );
}
