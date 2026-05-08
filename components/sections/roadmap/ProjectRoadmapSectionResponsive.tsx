"use client";

import { useMobileViewport } from "@/components/providers/mobile-context";
import { ProjectRoadmapSectionDesktop } from "@/components/sections/roadmap/ProjectRoadmapSectionDesktop";
import { ProjectRoadmapSectionMobile } from "@/components/sections/roadmap/ProjectRoadmapSectionMobile";
import { useProjectRoadmapAnimation } from "@/components/sections/roadmap/use-project-roadmap-animation";
import { SectionViewportPlaceholder } from "@/components/viewport/viewport-skeletons";

export type ProjectRoadmapSectionProps = {
  className?: string;
};

/** Roadmap branches after viewport snapshot. */
export function ProjectRoadmapSectionResponsive({ className }: ProjectRoadmapSectionProps) {
  const { isMobile, isViewportReady } = useMobileViewport();
  const animation = useProjectRoadmapAnimation();

  if (!isViewportReady) {
    return <SectionViewportPlaceholder className={className} minHeightClass="min-h-[640px]" />;
  }

  return isMobile ? (
    <ProjectRoadmapSectionMobile className={className} {...animation} />
  ) : (
    <ProjectRoadmapSectionDesktop className={className} {...animation} />
  );
}
