"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

import { EXPERTS_SECTION_HEADLINE, EXPERTS_SECTION_ITEMS } from "@/components/constants/experts-section";
import { TeamCarouselDesktop } from "@/components/sections/team/team-carousel-desktop";
import { TeamCard } from "@/components/sections/team/team-card";
import {
  TEAM_SCROLL_STEP_PX,
  TEAM_STACK_START_DELAY,
  TEAM_STACK_STAGGER,
  TeamSectionWaveText,
} from "@/components/sections/team/team-section-shared";
import type { TeamCarouselBag } from "@/components/sections/team/use-team-carousel";
import type { TeamSectionTextClasses } from "@/components/sections/team/TeamSectionMobile";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type TeamSectionDesktopProps = TeamCarouselBag &
  TeamSectionTextClasses & {
    className?: string;
  };

export function TeamSectionDesktop({
  className,
  sectionRef,
  trackRef,
  sectionInView,
  hasMeasuredTrack,
  stackOffsets,
  shouldSpreadCards,
  handleTrackScroll,
  scrollTrackBy,
  canScrollPrev,
  canScrollNext,
  titleTextClass,
  cardNameTextClass,
  cardBioTextClass,
  roleBadgeTextClass,
}: TeamSectionDesktopProps) {
  return (
    <section
      ref={sectionRef}
      id="team-section"
      className={cn(
        "mx-auto w-full max-w-screen-2xl px-4 py-10 sm:px-6 sm:py-12 lg:px-10 lg:py-16",
        className
      )}
    >
      <div>
        <div className="relative mx-auto w-full max-w-[min(100%,85rem)] px-2">
          <h2 className="text-center font-bold tracking-tight text-brand-black">
            <TeamSectionWaveText
              text={EXPERTS_SECTION_HEADLINE}
              className={cn(titleTextClass, "block text-center")}
              start={sectionInView}
            />
          </h2>
          <div className="mt-4 flex justify-end gap-2">
            <Button
              onClick={() => scrollTrackBy(-TEAM_SCROLL_STEP_PX)}
              disabled={!canScrollPrev}
              variant="landing-dark-purple"
              size="landing-icon-sm"
              className="w-10 disabled:cursor-not-allowed"
              aria-label="Scroll team cards left"
            >
              <ChevronLeft className="size-5" strokeWidth={2} aria-hidden />
            </Button>
            <Button
              onClick={() => scrollTrackBy(TEAM_SCROLL_STEP_PX)}
              disabled={!canScrollNext}
              variant="landing-dark-purple"
              size="landing-icon-sm"
              className="w-20 justify-end pr-3 disabled:cursor-not-allowed"
              aria-label="Scroll team cards right"
            >
              <ChevronRight className="size-5" strokeWidth={2} aria-hidden />
            </Button>
          </div>
        </div>
      </div>

      <div className="w-full min-w-0">
        <TeamCarouselDesktop ref={trackRef} onScroll={handleTrackScroll} className="max-w-full">
          {hasMeasuredTrack
            ? EXPERTS_SECTION_ITEMS.map((expert, i) => (
                <motion.div
                  key={expert.name}
                  initial={{ opacity: 1, x: stackOffsets[i].x, scale: stackOffsets[i].scale }}
                  animate={shouldSpreadCards ? { opacity: 1, x: 0, scale: 1 } : undefined}
                  transition={{
                    duration: 1.2,
                    delay: TEAM_STACK_START_DELAY + i * TEAM_STACK_STAGGER,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="shrink-0 will-change-transform"
                  style={{ zIndex: EXPERTS_SECTION_ITEMS.length - i }}
                >
                  <TeamCard
                    memberIndex={i}
                    name={expert.name}
                    role={expert.role}
                    image={expert.image}
                    bio={expert.bio}
                    socials={expert.socials}
                    priority={i < 4}
                    compact={false}
                    nameTextClassName={cardNameTextClass}
                    bioTextClassName={cardBioTextClass}
                    roleBadgeTextClassName={roleBadgeTextClass}
                  />
                </motion.div>
              ))
            : null}
        </TeamCarouselDesktop>
      </div>
    </section>
  );
}
