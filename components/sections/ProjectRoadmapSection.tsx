"use client";

import {
  WaveRevealFadeUp,
  WaveRevealHeadlineLines,
  waveRevealTiming,
} from "@/components/motion/wave-reveal";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const HEADLINE = "Project Roadmap" as const;

const headlineWordCount = HEADLINE.trim().split(/\s+/).length;

const cardStagger = 0.1;

const ROADMAP = [
  {
    quarter: "Q1 2026",
    body: "MVP on BaseApp (Core vault, prediction flow)",
    value: 100,
    cardClass: "bg-brand-dark-green",
    badgeClass: "bg-white text-brand-dark-green",
    bodyClass: "text-white",
    progressClass: cn(
      "[&_[data-slot=progress-track]]:h-1.5 [&_[data-slot=progress-track]]:rounded-full [&_[data-slot=progress-track]]:bg-brand-gray/90",
      "[&_[data-slot=progress-indicator]]:rounded-full [&_[data-slot=progress-indicator]]:bg-brand-dark-green"
    ),
  },
  {
    quarter: "Q2 2026",
    body: "MVP launch (vaults, yield games, dashboards)",
    value: 45,
    cardClass: "bg-brand-dark-purple",
    badgeClass: "bg-white text-brand-dark-purple",
    bodyClass: "text-white",
    progressClass: cn(
      "[&_[data-slot=progress-track]]:h-1.5 [&_[data-slot=progress-track]]:rounded-full [&_[data-slot=progress-track]]:bg-brand-gray/90",
      "[&_[data-slot=progress-indicator]]:rounded-full [&_[data-slot=progress-indicator]]:bg-brand-dark-purple"
    ),
  },
  {
    quarter: "Q3 2026",
    body: "Prediction markets (sports, esports, finance)",
    value: 0,
    cardClass: "bg-brand-light-green",
    badgeClass: "bg-brand-black text-brand-light-green",
    bodyClass: "text-brand-black",
    progressClass: cn(
      "[&_[data-slot=progress-track]]:h-1.5 [&_[data-slot=progress-track]]:rounded-full [&_[data-slot=progress-track]]:bg-brand-gray/90",
      "[&_[data-slot=progress-indicator]]:rounded-full [&_[data-slot=progress-indicator]]:bg-brand-light-green"
    ),
  },
  {
    quarter: "Q4 2026",
    body: "Agent-based systems & ecosystem expansion",
    value: 0,
    cardClass: "bg-brand-light-purple",
    badgeClass: "bg-brand-black text-brand-light-purple",
    bodyClass: "text-brand-black",
    progressClass: cn(
      "[&_[data-slot=progress-track]]:h-1.5 [&_[data-slot=progress-track]]:rounded-full [&_[data-slot=progress-track]]:bg-brand-gray/90",
      "[&_[data-slot=progress-indicator]]:rounded-full [&_[data-slot=progress-indicator]]:bg-brand-light-purple"
    ),
  },
] as const;

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
          lines={[HEADLINE]}
          className="block text-center"
          lineClassName="text-3xl sm:text-4xl lg:text-5xl"
        />
      </h2>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3.5 lg:grid-cols-4 lg:gap-3">
        {ROADMAP.map((item, i) => (
          <WaveRevealFadeUp
            key={item.quarter}
            delay={cardsDelayBase + i * cardStagger}
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
