"use client";

import { motion } from "framer-motion";

import { PROJECT_ROADMAP_HEADLINE, PROJECT_ROADMAP_ITEMS } from "@/components/constants/project-roadmap-section";
import { SECTION_TEXT_SIZES } from "@/components/constants/text-sizes";
import {
  ProjectRoadmapWaveText,
  ROADMAP_CARD_STAGGER,
} from "@/components/sections/roadmap/project-roadmap-section-shared";
import type { ProjectRoadmapAnimationBag } from "@/components/sections/roadmap/use-project-roadmap-animation";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

type ProjectRoadmapSectionDesktopProps = ProjectRoadmapAnimationBag & {
  className?: string;
};

export function ProjectRoadmapSectionDesktop({
  className,
  sectionRef,
  hasStarted,
  showProgress,
  progressValues,
}: ProjectRoadmapSectionDesktopProps) {
  const roadmapTextSizes = SECTION_TEXT_SIZES.roadmap;

  return (
    <section
      ref={sectionRef}
      id="roadmap-section"
      className={cn(
        "mx-auto w-full max-w-screen-2xl px-4 py-10 sm:px-6 sm:py-12 lg:px-10 lg:py-16",
        "bg-brand-white",
        className
      )}
    >
      <h2 className="mb-8 text-center text-brand-black sm:mb-10 lg:mb-12">
        <ProjectRoadmapWaveText
          text={PROJECT_ROADMAP_HEADLINE}
          className={cn(roadmapTextSizes.title.desktop)}
          start={hasStarted}
        />
      </h2>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3.5 lg:grid-cols-4 lg:gap-3">
        {PROJECT_ROADMAP_ITEMS.map((item, index) => (
          <motion.div
            key={item.quarter}
            initial={{ opacity: 0, y: 26 }}
            animate={hasStarted ? { opacity: 1, y: 0 } : { opacity: 0, y: 26 }}
            transition={{
              duration: 0.5,
              delay: index * ROADMAP_CARD_STAGGER,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex min-h-0 flex-col gap-2"
          >
            <div
              className={cn(
                "flex min-h-[5.75rem] flex-col gap-2 rounded-lg p-3 shadow-sm ring-1 ring-black/[0.06] sm:min-h-[6rem] sm:p-3.5",
                item.cardClass
              )}
            >
              <Badge
                className={cn(
                  "h-6 w-fit border-0 px-2.5 py-0 font-semibold sm:text-sm",
                  roadmapTextSizes.cardQuarter.desktop,
                  item.badgeClass
                )}
              >
                {item.quarter}
              </Badge>
              <p
                className={cn(
                  "text-pretty font-medium leading-snug sm:text-[0.9375rem]",
                  roadmapTextSizes.cardBody.desktop,
                  item.bodyClass
                )}
              >
                {item.body}
              </p>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={showProgress ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <Progress
                value={progressValues[index]}
                className={cn(
                  "w-full flex-col gap-0 [&_[data-slot=progress-indicator]]:transition-all [&_[data-slot=progress-indicator]]:duration-[2200ms] [&_[data-slot=progress-indicator]]:ease-out",
                  item.progressClass
                )}
              />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
