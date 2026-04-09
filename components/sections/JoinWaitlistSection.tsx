"use client";

import { ArrowRightIcon, CircleHelp } from "lucide-react";
import Image from "next/image";

import {
  WaveRevealFadeUp,
  WaveRevealHeadlineLines,
  WaveRevealWords,
  waveRevealTiming,
} from "@/components/motion/wave-reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const HEADLINE_LINES = ["Join Waitlist"] as const;
const SUBTEXT =
  "Be among the first to try the new primitive in prediction markets on Base.";

const JOIN_WAITLIST_IMG = "/main/join-waitlist.png";

/** Background pattern: 2×5 circles, 189px diameter each */
const BG_CIRCLE_PX = 189;
const BG_CIRCLE_COUNT = 10;

const headlineWordCount = HEADLINE_LINES.join(" ").trim().split(/\s+/).length;
const subheadWordCount = SUBTEXT.trim().split(/\s+/).length;

const subheadDelayStart =
  waveRevealTiming.initialDelay +
  headlineWordCount * waveRevealTiming.wordStagger * 0.42;

const buttonDelay =
  subheadDelayStart +
  subheadWordCount * waveRevealTiming.wordStagger +
  waveRevealTiming.wordDuration * 0.25;

type JoinWaitlistSectionProps = {
  className?: string;
};

export function JoinWaitlistSection({ className }: JoinWaitlistSectionProps) {
  return (
    <section
      id="join-waitlist"
      className={cn(
        "mx-auto w-full max-w-screen-2xl px-4 pb-5 pt-3 sm:px-6 sm:pb-6 sm:pt-4 lg:px-10 lg:pb-8 lg:pt-5",
        className
      )}
    >
      <div
        className={cn(
          "relative flex h-[450px] flex-col overflow-hidden rounded-[1.75rem] sm:rounded-[2rem]",
          "bg-brand-gray shadow-sm ring-1 ring-black/[0.06]"
        )}
      >
        {/* Decorative circles: 2×5 @ 189px — pinned to the right edge */}
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden
        >
          <div
            className={cn(
              "absolute right-0 top-1/2 grid shrink-0 -translate-y-1/2 grid-cols-5 grid-rows-2 gap-3 sm:gap-4",
              "max-[1050px]:scale-[0.55] max-sm:scale-[0.32] max-sm:origin-right"
            )}
          >
            {Array.from({ length: BG_CIRCLE_COUNT }, (_, i) => (
              <div
                key={i}
                className="shrink-0 rounded-full bg-white opacity-25 sm:opacity-30"
                style={{ width: BG_CIRCLE_PX, height: BG_CIRCLE_PX }}
              />
            ))}
          </div>
        </div>

        <div
          className={cn(
            "relative z-10 flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto overflow-x-hidden p-4 sm:gap-5 sm:p-5",
            "lg:flex-row lg:items-stretch lg:gap-6 lg:overflow-hidden lg:p-6 xl:p-6"
          )}
        >
          <div className="flex min-w-0 flex-1 flex-col lg:max-w-xl lg:py-1">
            <h2 className="text-balance font-bold leading-[1.08] tracking-tight text-brand-black">
              <WaveRevealHeadlineLines
                lines={[...HEADLINE_LINES]}
                lineClassName="text-2xl sm:text-3xl lg:text-[2.25rem] xl:text-[2.5rem]"
              />
            </h2>

            <WaveRevealWords
              text={SUBTEXT}
              delayStart={subheadDelayStart}
              className="mt-3 max-w-lg text-pretty text-base leading-relaxed text-brand-black/70 sm:mt-4 sm:text-lg"
            />

            <WaveRevealFadeUp delay={buttonDelay} className="mt-4 w-full max-w-md sm:mt-5">
              <form
                className="flex flex-col gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <div className="relative w-full">
                  <Input
                    type="text"
                    name="baseapp"
                    autoComplete="off"
                    placeholder="Enter your BaseApp address"
                    className={cn(
                      "h-11 rounded-lg border-0 bg-white px-4 pr-11 text-base shadow-sm ring-1 ring-black/[0.06]",
                      "placeholder:text-brand-black/35",
                      "focus-visible:ring-2 focus-visible:ring-brand-dark-purple/35"
                    )}
                  />
                  <button
                    type="button"
                    className={cn(
                      "absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-brand-black/40",
                      "transition hover:text-brand-black/60",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-dark-purple/40"
                    )}
                    aria-label="What is BaseApp address?"
                  >
                    <CircleHelp className="size-5" strokeWidth={1.75} />
                  </button>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className={cn(
                    "h-11 w-full gap-2 rounded-lg px-7 text-base font-semibold shadow-none sm:w-auto sm:self-start",
                    "bg-brand-black text-white hover:bg-brand-black/90",
                    "focus-visible:ring-brand-dark-purple/40"
                  )}
                >
                  Join Waitlist
                  <ArrowRightIcon className="size-5 shrink-0" strokeWidth={1.75} aria-hidden />
                </Button>
              </form>
            </WaveRevealFadeUp>

            <div className="mt-5 flex items-center gap-2 sm:mt-6">
              <span
                className="size-7 shrink-0 rounded-md bg-[#0052FF]"
                aria-hidden
              />
              <span className="text-lg font-bold lowercase tracking-tight text-brand-black">
                baseapp
              </span>
            </div>
          </div>

          <div
            className={cn(
              "relative flex min-h-0 w-full flex-1 flex-col",
              "lg:flex-[1.15] lg:self-stretch"
            )}
          >
            <div className="relative h-full w-full min-h-0 flex-1">
              <Image
                src={JOIN_WAITLIST_IMG}
                alt="Praxis app on a handheld device"
                fill
                className="object-contain object-left"
                sizes="(max-width: 1024px) 100vw, 45vw"
                priority={false}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
