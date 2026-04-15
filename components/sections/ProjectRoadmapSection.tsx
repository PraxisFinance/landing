"use client";

import {
  WaveRevealFadeUp,
  WaveRevealHeadlineLines,
  waveRevealTiming,
} from "@/components/motion/wave-reveal";
import {
  PROJECT_ROADMAP_CARD_STAGGER,
  PROJECT_ROADMAP_HEADLINE,
  PROJECT_ROADMAP_ITEMS,
} from "@/components/constants/project-roadmap-section";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
const headlineWordCount = PROJECT_ROADMAP_HEADLINE.trim().split(/\s+/).length;

const cardsDelayBase =
  waveRevealTiming.initialDelay +
  headlineWordCount * waveRevealTiming.wordStagger +
  waveRevealTiming.wordDuration * 0.35;

type ProjectRoadmapSectionProps = {
  className?: string;
};

export function ProjectRoadmapSection({ className }: ProjectRoadmapSectionProps) {
  return (
    <section
      id="project-roadmap"
      className={cn(
        "mx-auto w-full max-w-screen-2xl px-4 py-10 sm:px-6 sm:py-12 lg:px-10 lg:py-16",
        "bg-brand-white",
        className
      )}
    >
      <h2 className="mb-8 text-center font-bold tracking-tight text-brand-black sm:mb-10 lg:mb-12">
        <WaveRevealHeadlineLines
          lines={[PROJECT_ROADMAP_HEADLINE]}
          className="block text-center"
          lineClassName="text-[clamp(1.75rem,6.5vw,110px)] leading-[1.05]"
        />
      </h2>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3.5 lg:grid-cols-4 lg:gap-3">
        {PROJECT_ROADMAP_ITEMS.map((item, i) => (
          <WaveRevealFadeUp
            key={item.quarter}
            delay={cardsDelayBase + i * PROJECT_ROADMAP_CARD_STAGGER}
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
                  "h-6 w-fit border-0 px-2.5 py-0 text-xs font-semibold sm:text-sm",
                  item.badgeClass
                )}
              >
                {item.quarter}
              </Badge>
              <p
                className={cn(
                  "text-pretty text-sm font-medium leading-snug sm:text-[0.9375rem]",
                  item.bodyClass
                )}
              >
                {item.body}
              </p>
            </div>
            <Progress
              value={item.value}
              className={cn("w-full flex-col gap-0", item.progressClass)}
            />
          </WaveRevealFadeUp>
        ))}
      </div>
    </section>
  );
}
