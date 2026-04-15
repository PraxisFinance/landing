"use client";

import { ArrowRightIcon } from "lucide-react";

import {
  WaveRevealFadeUp,
  WaveRevealHeadlineLines,
  WaveRevealWords,
  waveRevealTiming,
} from "@/components/motion/wave-reveal";
import {
  JOIN_SECTION_BG,
  JOIN_SECTION_HEADLINE_LINES,
  JOIN_SECTION_SUBHEAD_COPY,
  JOIN_SECTION_WAITLIST_BUTTON_TEXT,
} from "@/components/constants/join-section";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const headlineWordCount = JOIN_SECTION_HEADLINE_LINES.join(" ").trim().split(/\s+/).length;
const subheadWordCount = JOIN_SECTION_SUBHEAD_COPY.trim().split(/\s+/).length;

/** Slight overlap with headline so the “wave” reads as one motion (similar to aave.com hero). */
const subheadDelayStart =
  waveRevealTiming.initialDelay + headlineWordCount * waveRevealTiming.wordStagger * 0.42;

const buttonDelay =
  subheadDelayStart +
  subheadWordCount * waveRevealTiming.wordStagger +
  waveRevealTiming.wordDuration * 0.35;

type JoinSectionProps = {
  className?: string;
};

export function JoinSection({ className }: JoinSectionProps) {
  return (
    <section
      className={cn(
        "mx-auto w-full max-w-screen-2xl px-4 pb-2 pt-6 sm:px-6 sm:pb-3 sm:pt-8 lg:px-10 lg:pt-10",
        className
      )}
    >
      <div
        className={cn(
          "relative min-h-[28rem] overflow-hidden rounded-[2rem] sm:min-h-[32rem] sm:rounded-[2.25rem] md:min-h-[36rem] lg:min-h-[40rem]"
        )}
      >
        <div
          aria-hidden
          className="absolute inset-0 z-0 bg-cover bg-bottom bg-no-repeat pointer-events-none select-none"
          style={{ backgroundImage: `url(${JOIN_SECTION_BG})` }}
        />

        <div
          aria-hidden
          className={cn(
            "absolute inset-0 z-[1] bg-gradient-to-b from-transparent to-brand-light-purple",
            "pointer-events-none"
          )}
        />

        <div className="relative z-10 flex flex-col items-center px-5 pt-7 text-center sm:px-8 sm:pt-9 md:pt-10 lg:pt-12 pb-16 sm:pb-20 md:pb-24">
          <h1 className="max-w-5xl text-balance font-bold leading-[1.05] tracking-tight text-brand-black">
            <WaveRevealHeadlineLines
              lines={[...JOIN_SECTION_HEADLINE_LINES]}
              lineClassName="text-4xl sm:text-5xl lg:text-6xl xl:text-[3.5rem]"
            />
          </h1>

          <WaveRevealWords
            text={JOIN_SECTION_SUBHEAD_COPY}
            delayStart={subheadDelayStart}
            className="mt-6 max-w-xl text-pretty text-base leading-snug text-brand-black sm:text-lg md:mt-8"
          />

          <WaveRevealFadeUp delay={buttonDelay} className="mt-8 sm:mt-10">
            <Button
              nativeButton={false}
              render={<a href="#" />}
              size="lg"
              className={cn(
                "h-12 gap-2 rounded-xl px-8 text-base font-semibold shadow-none",
                "bg-brand-black text-white hover:bg-brand-black/90",
                "focus-visible:ring-brand-dark-purple/40"
              )}
            >
              {JOIN_SECTION_WAITLIST_BUTTON_TEXT}
              <ArrowRightIcon className="size-4 shrink-0" strokeWidth={1.75} aria-hidden />
            </Button>
          </WaveRevealFadeUp>
        </div>
      </div>
    </section>
  );
}
