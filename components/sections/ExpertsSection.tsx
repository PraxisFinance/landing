"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import {
  EXPERTS_SECTION_AUTO_ADVANCE_MS,
  EXPERTS_SECTION_HEADLINE,
  EXPERTS_SECTION_ITEMS,
} from "@/components/constants/experts-section";
import { ExpertCarouselTrack } from "@/components/sections/expert-carousel-track";
import { ExpertCard } from "@/components/sections/expert-card";
import {
  WaveRevealFadeUp,
  WaveRevealHeadlineLines,
  waveRevealTiming,
} from "@/components/motion/wave-reveal";
import { cn } from "@/lib/utils";

const headlineWordCount = EXPERTS_SECTION_HEADLINE.trim().split(/\s+/).length;

const cardsDelayBase =
  waveRevealTiming.initialDelay +
  headlineWordCount * waveRevealTiming.wordStagger +
  waveRevealTiming.wordDuration * 0.3;

type ExpertsSectionProps = {
  className?: string;
};

export function ExpertsSection({ className }: ExpertsSectionProps) {
  const [activeIndex, setActiveIndex] = useState(1);
  /** When false: interval + ping-pong scroll run. When true: frozen until user clicks the same card again. */
  const [manualPaused, setManualPaused] = useState(false);

  useEffect(() => {
    if (manualPaused) return;
    const id = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % EXPERTS_SECTION_ITEMS.length);
    }, EXPERTS_SECTION_AUTO_ADVANCE_MS);
    return () => window.clearInterval(id);
  }, [manualPaused]);

  const goPrev = useCallback(() => {
    setActiveIndex(
      (i) => (i - 1 + EXPERTS_SECTION_ITEMS.length) % EXPERTS_SECTION_ITEMS.length
    );
  }, []);

  const goNext = useCallback(() => {
    setActiveIndex((i) => (i + 1) % EXPERTS_SECTION_ITEMS.length);
  }, []);

  const handleCardActivate = useCallback(
    (index: number) => {
      if (manualPaused && activeIndex === index) {
        setManualPaused(false);
        return;
      }
      setManualPaused(true);
      setActiveIndex(index);
    },
    [manualPaused, activeIndex]
  );

  return (
    <section
      id="experts"
      className={cn(
        "mx-auto w-full max-w-screen-2xl px-4 py-10 sm:px-6 sm:py-12 lg:px-10 lg:py-16",
        className
      )}
    >
      <div>
        <div className="relative mx-auto w-full max-w-[min(100%,85rem)] px-2 sm:px-14">
          <h2 className="pr-24 text-center font-bold tracking-tight text-brand-black sm:pr-28">
            <WaveRevealHeadlineLines
              lines={[EXPERTS_SECTION_HEADLINE]}
              className="block text-center"
              lineClassName="text-[clamp(1.75rem,6.5vw,110px)] leading-[1.05]"
            />
          </h2>

          <WaveRevealFadeUp
            delay={cardsDelayBase}
            className="absolute right-2 top-1/2 flex -translate-y-1/2 gap-2 sm:right-4 lg:right-6"
          >
            <button
              type="button"
              onClick={goPrev}
              className={cn(
                "inline-flex size-10 items-center justify-center rounded-xl transition",
              "bg-brand-dark-purple text-white hover:bg-brand-dark-purple/85",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark-purple/50"
              )}
              aria-label="Previous expert"
            >
              <ChevronLeft className="size-5" strokeWidth={2} aria-hidden />
            </button>
            <button
              type="button"
              onClick={goNext}
              className={cn(
                "inline-flex size-10 items-center justify-center rounded-xl transition",
              "bg-brand-dark-purple text-white hover:bg-brand-dark-purple/85",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark-purple/50"
              )}
              aria-label="Next expert"
            >
              <ChevronRight className="size-5" strokeWidth={2} aria-hidden />
            </button>
          </WaveRevealFadeUp>
        </div>
      </div>

      <WaveRevealFadeUp delay={cardsDelayBase + 0.08} className="min-w-0 max-w-full">
        <ExpertCarouselTrack className="max-w-full">
          {EXPERTS_SECTION_ITEMS.map((expert, i) => (
            <ExpertCard
              key={expert.name}
              expertIndex={i}
              name={expert.name}
              role={expert.role}
              image={expert.image}
              bio={expert.bio}
              socials={expert.socials}
              selected={i === activeIndex}
              onSelect={() => handleCardActivate(i)}
              priority={i < 4}
            />
          ))}
        </ExpertCarouselTrack>
      </WaveRevealFadeUp>
    </section>
  );
}
