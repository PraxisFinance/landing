"use client";

import type { ReactNode } from "react";
import { Wallet } from "lucide-react";
import Image from "next/image";

import { DepositFoundsIcon } from "@/components/assets/deposit-founds-icon";
import {
  WaveRevealFadeUp,
  WaveRevealHeadlineLines,
  waveRevealTiming,
} from "@/components/motion/wave-reveal";
import { cn } from "@/lib/utils";

const HEADLINE = "Praxis User Flow" as const;

const headlineWordCount = HEADLINE.trim().split(/\s+/).length;

const flowDelayBase =
  waveRevealTiming.initialDelay +
  headlineWordCount * waveRevealTiming.wordStagger +
  waveRevealTiming.wordDuration * 0.25;

const flowStagger = 0.1;

const USER_FLOW_IMG = "/main/user-flow.png";

/** Central mockup frame: 2× previous 340px cap */
const USER_FLOW_CENTER_MAX_PX = 680;

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
          lines={[HEADLINE]}
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
              <Pill className="text-brand-black">Connect Wallet</Pill>
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
                Yield accumulates in the vault.
              </p>
              <Pill className="self-start text-brand-black">Earn Yield</Pill>
            </div>
          </WaveRevealFadeUp>
        </div>

        {/* Center phone — square frame; source order 2; mobile: order-1 */}
        <WaveRevealFadeUp
          delay={flowDelayBase + flowStagger * 0.5}
          className={cn(
            "order-1 flex w-full flex-col xl:order-none xl:w-full xl:justify-self-center xl:self-start",
            `max-w-[min(100%,${USER_FLOW_CENTER_MAX_PX}px)] xl:max-w-[min(100%,${USER_FLOW_CENTER_MAX_PX}px)]`
          )}
        >
          <div
            className={cn(
              "flex aspect-square w-full min-h-0 flex-col rounded-2xl bg-brand-gray p-4 shadow-sm ring-1 ring-black/[0.06] sm:p-6"
            )}
          >
            <div className="relative min-h-0 flex-1">
              <Image
                src={USER_FLOW_IMG}
                alt="Praxis app: balances, pools, and navigation"
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
              <Pill className="text-brand-black">Deposit Funds</Pill>
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
                Allocate yield to outcomes across various events.
              </p>
            </div>
          </WaveRevealFadeUp>
        </div>
      </div>
    </section>
  );
}
