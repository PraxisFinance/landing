"use client";

import { useIsMobile } from "@/components/providers/mobile-context";
import { ProjectRoadmapSectionDesktop } from "@/components/sections/roadmap/ProjectRoadmapSectionDesktop";
import { ProjectRoadmapSectionMobile } from "@/components/sections/roadmap/ProjectRoadmapSectionMobile";
import { useProjectRoadmapAnimation } from "@/components/sections/roadmap/use-project-roadmap-animation";

export type ProjectRoadmapSectionProps = {
  className?: string;
};

/** Picks mobile or desktop roadmap layout from global viewport (single tree branch). */
export function ProjectRoadmapSectionResponsive({ className }: ProjectRoadmapSectionProps) {
  const isMobile = useIsMobile();
  const animation = useProjectRoadmapAnimation();

  return isMobile ? (
    <ProjectRoadmapSectionMobile className={className} {...animation} />
  ) : (
    <ProjectRoadmapSectionDesktop className={className} {...animation} />
  );
}
