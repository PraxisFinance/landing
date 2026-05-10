"use client";

import { SECTION_TEXT_SIZES } from "@/components/constants/text-sizes";
import { useMobileViewport } from "@/components/providers/mobile-context";
import { SocialMediaJoinSectionDesktop } from "@/components/sections/social-media-join/SocialMediaJoinSectionDesktop";
import { SocialMediaJoinSectionMobile } from "@/components/sections/social-media-join/SocialMediaJoinSectionMobile";
import { useSocialMediaJoinSection } from "@/components/sections/social-media-join/use-social-media-join-section";
import { SectionViewportPlaceholder } from "@/components/viewport/viewport-skeletons";

export type SocialMediaJoinSectionProps = {
  className?: string;
};

/** Social / Get started branches after viewport snapshot. */
export function SocialMediaJoinSectionResponsive({ className }: SocialMediaJoinSectionProps) {
  const { isMobile, isViewportReady } = useMobileViewport();
  const smj = SECTION_TEXT_SIZES.socialMediaJoin;

  const inViewAmount = !isViewportReady ? 0.35 : isMobile ? 0.15 : 0.35;
  const { sectionRef, sectionInView } = useSocialMediaJoinSection(inViewAmount);

  if (!isViewportReady) {
    return <SectionViewportPlaceholder className={className} minHeightClass="min-h-[720px]" />;
  }

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
