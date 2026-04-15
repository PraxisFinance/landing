"use client";

import {
  WaveRevealFadeUp,
  WaveRevealHeadlineLines,
  waveRevealTiming,
} from "@/components/motion/wave-reveal";
import {
  FIRST_PREDICTION_CARDS,
  FIRST_PREDICTION_HEADLINE,
} from "@/components/constants/first-prediction-section";
import { FirstPredictionCard } from "@/components/sections/FirstPredictionCard";
import { cn } from "@/lib/utils";
const headlineWordCount = FIRST_PREDICTION_HEADLINE.trim().split(/\s+/).length;

const cardsDelayBase =
  waveRevealTiming.initialDelay +
  headlineWordCount * waveRevealTiming.wordStagger +
  waveRevealTiming.wordDuration * 0.25;

const cardStagger = 0.09;

type FirstPredictionSectionProps = {
  className?: string;
};

export function FirstPredictionSection({ className }: FirstPredictionSectionProps) {
  return (
    <section
      id="first-prediction"
      className={cn(
        "mx-auto w-full max-w-screen-2xl px-4 pb-8 pt-4 sm:px-6 sm:pb-10 sm:pt-6 lg:px-10 lg:pb-12 lg:pt-8",
        className
      )}
    >
      <div className="relative isolate flex flex-col gap-12 sm:gap-16 lg:gap-20">
        <div className="relative z-0 px-1 sm:px-2">
          <h2 className="max-w-[95%] text-balance text-left font-semibold leading-[1.05] tracking-tight text-brand-black sm:max-w-[90%]">
            <WaveRevealHeadlineLines
              lines={[FIRST_PREDICTION_HEADLINE]}
              lineClassName="text-[clamp(1.75rem,6.5vw,110px)] leading-[1.05]"
            />
          </h2>
        </div>

        <div
          className={cn(
            "relative z-10 flex flex-wrap justify-end gap-4 sm:gap-5",
            "-mt-16 px-1 sm:-mt-20 sm:px-2 lg:-mt-28"
          )}
        >
          {FIRST_PREDICTION_CARDS.map((card, i) => (
            <WaveRevealFadeUp key={card.title} delay={cardsDelayBase + i * cardStagger}>
              <FirstPredictionCard {...card} />
            </WaveRevealFadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
