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
import { cn } from "@/lib/utils";

type ProjectRoadmapSectionMobileProps = ProjectRoadmapAnimationBag & {
  className?: string;
};

export function ProjectRoadmapSectionMobile({
  className,
  sectionRef,
  hasStarted,
  showProgress,
  progressValues,
}: ProjectRoadmapSectionMobileProps) {
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
          className={cn(roadmapTextSizes.title.mobile)}
          start={hasStarted}
        />
      </h2>

      <div className="flex flex-col gap-3">
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
            className="flex min-h-0 items-stretch gap-3"
          >
            <div className="flex w-2 shrink-0 justify-center pt-1">
              <motion.div
                className="w-full"
                initial={{ opacity: 0, y: 8 }}
                animate={showProgress ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              >
                <div
                  className="relative h-[5.75rem] w-2 overflow-hidden rounded-full bg-brand-gray/90"
                  aria-hidden
                >
                  <div
                    className={cn(
                      "absolute left-0 top-0 w-full rounded-full transition-[height] duration-[2200ms] ease-out",
                      item.progressIndicatorClass
                    )}
                    style={{ height: `${progressValues[index]}%` }}
                  />
                </div>
              </motion.div>
            </div>

            <div
              className={cn(
                "flex min-h-[5.75rem] min-w-0 flex-1 flex-col gap-2 rounded-lg p-3 shadow-sm ring-1 ring-black/[0.06]",
                item.cardClass
              )}
            >
              <Badge
                className={cn(
                  "h-auto w-fit border-0 px-2.5 py-1 font-semibold",
                  roadmapTextSizes.cardQuarter.mobile,
                  item.badgeClass
                )}
              >
                {item.quarter}
              </Badge>
              <p
                className={cn(
                  "text-pretty font-medium leading-snug",
                  roadmapTextSizes.cardBody.mobile,
                  item.bodyClass
                )}
              >
                {item.body}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
