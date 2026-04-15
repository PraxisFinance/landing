"use client";

import type { ReactNode } from "react";
import { Wallet } from "lucide-react";
import Image from "next/image";

import { DepositFoundsIcon } from "@/components/assets/deposit-founds-icon";
import {
  USER_FLOW_SECTION_ALLOCATE_COPY,
  USER_FLOW_SECTION_CENTER_MAX_PX,
  USER_FLOW_SECTION_CONNECT_WALLET_TEXT,
  USER_FLOW_SECTION_DEPOSIT_FUNDS_TEXT,
  USER_FLOW_SECTION_EARN_YIELD_TEXT,
  USER_FLOW_SECTION_HEADLINE,
  USER_FLOW_SECTION_IMAGE,
  USER_FLOW_SECTION_IMAGE_ALT,
  USER_FLOW_SECTION_YIELD_COPY,
} from "@/components/constants/user-flow-section";
import {
  WaveRevealFadeUp,
  WaveRevealHeadlineLines,
  waveRevealTiming,
} from "@/components/motion/wave-reveal";
import { cn } from "@/lib/utils";

const headlineWordCount = USER_FLOW_SECTION_HEADLINE.trim().split(/\s+/).length;

const flowDelayBase =
  waveRevealTiming.initialDelay +
  headlineWordCount * waveRevealTiming.wordStagger +
  waveRevealTiming.wordDuration * 0.25;

const flowStagger = 0.1;

function Pill({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-white px-3 py-1.5 text-xs font-medium shadow-sm sm:text-sm",
        className
      )}
    >
      {children}
    </span>
  );
}

type UserFlowSectionProps = {
  className?: string;
};

export function UserFlowSection({ className }: UserFlowSectionProps) {
  return (
    <section
      id="user-flow"
      className={cn(
        "mx-auto w-full max-w-screen-2xl px-4 py-14 sm:px-6 sm:py-16 lg:px-10 lg:py-20",
        "bg-brand-gray/35",
        className
      )}
    >
      <h2 className="mb-12 text-center font-bold tracking-tight text-brand-black sm:mb-14 lg:mb-16">
        <WaveRevealHeadlineLines
          lines={[USER_FLOW_SECTION_HEADLINE]}
          className="block text-center"
          lineClassName="text-[clamp(1.75rem,6.5vw,110px)] leading-[1.05]"
        />
      </h2>

      <div
        className={cn(
          "grid min-h-0 gap-10",
          "grid-cols-1 justify-items-center",
          "xl:grid-cols-[minmax(0,320px)_auto_minmax(0,320px)] xl:items-stretch xl:justify-items-stretch xl:gap-4 2xl:gap-8"
        )}
      >
        {/* Left column — source order 1; mobile: order-2 */}
        <div className="order-2 flex h-full min-h-0 w-full max-w-[min(100%,320px)] flex-col gap-4 xl:order-none xl:w-full xl:max-w-none xl:gap-6">
          <WaveRevealFadeUp delay={flowDelayBase} className="w-full">
            <div
              className={cn(
                "flex items-center justify-between gap-3 rounded-xl p-4 sm:p-5",
                "bg-brand-dark-purple text-white shadow-sm ring-1 ring-black/[0.06]"
              )}
            >
              <Pill className="text-brand-black">{USER_FLOW_SECTION_CONNECT_WALLET_TEXT}</Pill>
              <Wallet
                className="size-8 shrink-0 text-white sm:size-9"
                strokeWidth={1.5}
                aria-hidden
              />
            </div>
          </WaveRevealFadeUp>

          <WaveRevealFadeUp delay={flowDelayBase + flowStagger} className="w-full">
            <div
              className={cn(
                "flex min-h-[200px] flex-col justify-between gap-8 rounded-xl p-5 sm:min-h-[220px] sm:p-6",
                "bg-brand-light-green text-brand-black shadow-sm ring-1 ring-black/[0.06]"
              )}
            >
              <p className="text-balance text-lg font-semibold leading-snug sm:text-xl">
                {USER_FLOW_SECTION_YIELD_COPY}
              </p>
              <Pill className="self-start text-brand-black">{USER_FLOW_SECTION_EARN_YIELD_TEXT}</Pill>
            </div>
          </WaveRevealFadeUp>
        </div>

        {/* Center phone — square frame; source order 2; mobile: order-1 */}
        <WaveRevealFadeUp
          delay={flowDelayBase + flowStagger * 0.5}
          className={cn(
            "order-1 flex w-full flex-col xl:order-none xl:w-full xl:justify-self-center xl:self-start",
            `max-w-[min(100%,${USER_FLOW_SECTION_CENTER_MAX_PX}px)] xl:max-w-[min(100%,${USER_FLOW_SECTION_CENTER_MAX_PX}px)]`
          )}
        >
          <div
            className={cn(
              "flex aspect-square w-full min-h-0 flex-col rounded-2xl bg-brand-gray p-4 shadow-sm ring-1 ring-black/[0.06] sm:p-6"
            )}
          >
            <div className="relative min-h-0 flex-1">
              <Image
                src={USER_FLOW_SECTION_IMAGE}
                alt={USER_FLOW_SECTION_IMAGE_ALT}
                fill
                className="object-contain object-center"
                sizes="(max-width: 1280px) 90vw, 680px"
                priority={false}
              />
            </div>
          </div>
        </WaveRevealFadeUp>

        {/* Right column — grid stretches cell height; justify-between pins Allocate to bottom */}
        <div className="order-3 flex h-full min-h-0 w-full max-w-[min(100%,320px)] flex-col justify-between gap-4 xl:order-none xl:max-w-none xl:gap-0">
          <WaveRevealFadeUp delay={flowDelayBase + flowStagger * 2} className="w-full shrink-0">
            <div
              className={cn(
                "flex items-center justify-between gap-3 rounded-xl p-4 sm:p-5",
                "bg-brand-light-green text-brand-black shadow-sm ring-1 ring-black/[0.06]"
              )}
            >
              <Pill className="text-brand-black">{USER_FLOW_SECTION_DEPOSIT_FUNDS_TEXT}</Pill>
              <span
                className="flex size-8 shrink-0 items-center justify-center sm:size-9"
                aria-hidden
              >
                <DepositFoundsIcon />
              </span>
            </div>
          </WaveRevealFadeUp>

          <WaveRevealFadeUp delay={flowDelayBase + flowStagger * 3} className="w-full shrink-0">
            <div
              className={cn(
                "rounded-t-xl rounded-b-none p-5 sm:p-6",
                "bg-brand-dark-green text-white shadow-sm ring-1 ring-black/[0.08]"
              )}
            >
              <p className="text-pretty text-left text-[clamp(1.125rem,4vw,35px)] font-bold leading-snug">
                {USER_FLOW_SECTION_ALLOCATE_COPY}
              </p>
            </div>
          </WaveRevealFadeUp>
        </div>
      </div>
    </section>
  );
}
