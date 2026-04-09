"use client";

import {
  WaveRevealFadeUp,
  WaveRevealHeadlineLines,
  waveRevealTiming,
} from "@/components/motion/wave-reveal";
import { FirstPredictionCard } from "@/components/sections/FirstPredictionCard";
import { cn } from "@/lib/utils";

const HEADLINE =
  "Praxis — the first prediction market where you trade outcomes with yield, not principal" as const;

const CARDS = [
  {
    title: "Safer by design",
    body: "Bet with yield — keep your principal in the vault. You can only lose allocated yield.",
    backgroundImage: "/main/safer-card.png",
    fallbackClassName: "bg-brand-gray",
    titleClassName: "text-brand-black",
    bodyClassName: "text-brand-black",
  },
  {
    title: "All-in-one dashboard",
    body: "Deposits, yield, predictions, and events — in one view. Track your vault balance, available yield, open predictions, and upcoming matches.",
    backgroundImage: "/main/all-in-one-dashboard-card.png",
    fallbackClassName: "bg-brand-dark-purple",
    titleClassName: "text-white",
    bodyClassName: "text-white",
  },
  {
    title: "On-chain security",
    body: "Transparent markets and payouts. Smart contracts manage positions and settlement on-chain.",
    backgroundImage: "/main/on-chain-security-card.png",
    fallbackClassName: "bg-brand-light-green",
    titleClassName: "text-brand-black",
    bodyClassName: "text-brand-black",
  },
] as const;

const headlineWordCount = HEADLINE.trim().split(/\s+/).length;

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
              lines={[HEADLINE]}
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
          {CARDS.map((card, i) => (
            <WaveRevealFadeUp key={card.title} delay={cardsDelayBase + i * cardStagger}>
              <FirstPredictionCard {...card} />
            </WaveRevealFadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
