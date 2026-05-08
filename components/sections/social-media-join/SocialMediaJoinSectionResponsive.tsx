"use client";

import { SECTION_TEXT_SIZES } from "@/components/constants/text-sizes";
import { useIsMobile } from "@/components/providers/mobile-context";
import { SocialMediaJoinSectionDesktop } from "@/components/sections/social-media-join/SocialMediaJoinSectionDesktop";
import { SocialMediaJoinSectionMobile } from "@/components/sections/social-media-join/SocialMediaJoinSectionMobile";
import { useSocialMediaJoinSection } from "@/components/sections/social-media-join/use-social-media-join-section";

export type SocialMediaJoinSectionProps = {
  className?: string;
};

/** Picks mobile or desktop layout from global viewport (single tree branch). */
export function SocialMediaJoinSectionResponsive({ className }: SocialMediaJoinSectionProps) {
  const isMobile = useIsMobile();
  const smj = SECTION_TEXT_SIZES.socialMediaJoin;
  const { sectionRef, sectionInView } = useSocialMediaJoinSection(isMobile ? 0.15 : 0.35);

  const shared = {
    className,
    sectionRef,
    sectionInView,
    sectionTitleClass: isMobile ? smj.sectionTitle.mobile : smj.sectionTitle.desktop,
    productCardTitleClass: isMobile ? smj.productCardTitle.mobile : smj.productCardTitle.desktop,
    productCardDescriptionClass: isMobile
      ? smj.productCardDescription.mobile
      : smj.productCardDescription.desktop,
    statusPillClass: isMobile ? smj.statusPill.mobile : smj.statusPill.desktop,
    communityCardTitleClass: isMobile
      ? smj.communityCardTitle.mobile
      : smj.communityCardTitle.desktop,
    communityCardDescriptionClass: isMobile
      ? smj.communityCardDescription.mobile
      : smj.communityCardDescription.desktop,
    productCtaButtonClass: isMobile ? smj.productCtaButton.mobile : smj.productCtaButton.desktop,
  };

  return isMobile ? (
    <SocialMediaJoinSectionMobile {...shared} />
  ) : (
    <SocialMediaJoinSectionDesktop {...shared} />
  );
}
