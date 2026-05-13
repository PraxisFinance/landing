"use client";

import { useIsMobile } from "@/components/providers/mobile-context";
import { ProjectRoadmapSectionDesktop } from "@/components/sections/roadmap/ProjectRoadmapSectionDesktop";
import { ProjectRoadmapSectionMobile } from "@/components/sections/roadmap/ProjectRoadmapSectionMobile";
import { useProjectRoadmapAnimation } from "@/components/sections/roadmap/use-project-roadmap-animation";

export type ProjectRoadmapSectionProps = {
  className?: string;
};

/** Roadmap branches on `isMobile`. */
export function ProjectRoadmapSectionResponsive({ className }: ProjectRoadmapSectionProps) {
  const isMobile = useIsMobile();
  const animation = useProjectRoadmapAnimation();

  return isMobile ? (
    <ProjectRoadmapSectionMobile className={className} {...animation} />
  ) : (
    <ProjectRoadmapSectionDesktop className={className} {...animation} />
  );
}
