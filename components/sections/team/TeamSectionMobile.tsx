"use client";

import { motion } from "framer-motion";

import { EXPERTS_SECTION_HEADLINE, EXPERTS_SECTION_ITEMS } from "@/components/constants/experts-section";
import { TeamCarouselMobile } from "@/components/sections/team/team-carousel-mobile";
import { TeamCard } from "@/components/sections/team/team-card";
import {
  TEAM_STACK_START_DELAY,
  TEAM_STACK_STAGGER,
  TeamSectionWaveText,
} from "@/components/sections/team/team-section-shared";
import type { TeamCarouselBag } from "@/components/sections/team/use-team-carousel";
import { cn } from "@/lib/utils";

export type TeamSectionTextClasses = {
  titleTextClass: string;
  cardNameTextClass: string;
  cardBioTextClass: string;
  roleBadgeTextClass: string;
};

type TeamSectionMobileProps = TeamCarouselBag & TeamSectionTextClasses & { className?: string };

export function TeamSectionMobile({
  className,
  sectionRef,
  trackRef,
  sectionInView,
  handleTrackScroll,
  titleTextClass,
  cardNameTextClass,
  cardBioTextClass,
  roleBadgeTextClass,
}: TeamSectionMobileProps) {
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
        </div>
      </div>

      <div className="w-full min-w-0">
        <TeamCarouselMobile ref={trackRef} onScroll={handleTrackScroll} className="max-w-full">
          {EXPERTS_SECTION_ITEMS.map((expert, i) => (
            <motion.div
              key={expert.name}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.55,
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
                compact
                nameTextClassName={cardNameTextClass}
                bioTextClassName={cardBioTextClass}
                roleBadgeTextClassName={roleBadgeTextClass}
              />
            </motion.div>
          ))}
        </TeamCarouselMobile>
      </div>
    </section>
  );
}
