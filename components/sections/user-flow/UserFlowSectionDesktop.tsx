"use client";

import { useRef, useState } from "react";
import { useInView, useMotionValueEvent, useScroll } from "framer-motion";

import { landingLenientInViewOnce } from "@/components/motion/lenient-in-view";
import {
  USER_FLOW_CARDS,
  USER_FLOW_SECTION_HEADLINE,
  USER_FLOW_SECTION_HEIGHT,
  USER_FLOW_SECTION_STEPS,
} from "@/components/constants/user-flow-section";
import { UserFlowCardsStageDesktop } from "@/components/sections/user-flow/UserFlowCardsStageDesktop";
import { UserFlowSectionHeading } from "@/components/sections/user-flow/UserFlowSectionHeading";
import { cn } from "@/lib/utils";

const STEP_COUNT = USER_FLOW_SECTION_STEPS.length;
const STEP_POINTS = USER_FLOW_SECTION_STEPS.map((_, i) => i / (STEP_COUNT - 1));
const SCROLL_PROGRESS_MAX = 0.9999;
const USER_FLOW_SCROLL_LENGTH_MULTIPLIER = 2.35;
const CARD_PROGRESS_OFFSET: Record<string, number> = {
  "connect-wallet": 0,
  "earn-yield": 0,
  "deposit-funds": 0.03,
  "allocate-yield": 0.02,
};

function lerp(from: number, to: number, t: number) {
  return from + (to - from) * t;
}

type UserFlowSectionDesktopProps = {
  className?: string;
};

export function UserFlowSectionDesktop({ className }: UserFlowSectionDesktopProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionInView = useInView(sectionRef, landingLenientInViewOnce);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const shouldShowHeading = sectionInView || scrollProgress > 0.001;

  const updateStepFromProgress = (progress: number) => {
    const nextIndex = Math.min(STEP_COUNT - 1, Math.floor(progress * STEP_COUNT));
    setActiveStepIndex((prev) => (prev === nextIndex ? prev : nextIndex));
  };

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const clamped = Math.max(0, Math.min(SCROLL_PROGRESS_MAX, latest));
    setScrollProgress(clamped);
    updateStepFromProgress(clamped);
  });

  const activeStep = USER_FLOW_SECTION_STEPS[activeStepIndex];
  const leftCards = USER_FLOW_CARDS.filter((item) => item.id === "connect-wallet" || item.id === "earn-yield");
  const rightCards = USER_FLOW_CARDS.filter(
    (item) => item.id === "deposit-funds" || item.id === "allocate-yield"
  );
  const getInterpolatedCardState = (cardId: string) => {
    const offset = CARD_PROGRESS_OFFSET[cardId] ?? 0;
    const shiftedProgress = Math.max(0, Math.min(1, (scrollProgress - offset) / (1 - offset)));

    if (shiftedProgress <= STEP_POINTS[0]) {
      const state = USER_FLOW_SECTION_STEPS[0].cards[cardId];
      return { ...state, opacity: state.visible ? 1 : 0 };
    }

    if (shiftedProgress >= STEP_POINTS[STEP_POINTS.length - 1]) {
      const state = USER_FLOW_SECTION_STEPS[STEP_POINTS.length - 1].cards[cardId];
      return { ...state, opacity: state.visible ? 1 : 0 };
    }

    let segmentIndex = 0;
    for (let i = 0; i < STEP_POINTS.length - 1; i += 1) {
      if (shiftedProgress >= STEP_POINTS[i] && shiftedProgress <= STEP_POINTS[i + 1]) {
        segmentIndex = i;
        break;
      }
    }

    const startPoint = STEP_POINTS[segmentIndex];
    const endPoint = STEP_POINTS[segmentIndex + 1];
    const segmentProgress = (shiftedProgress - startPoint) / (endPoint - startPoint);
    const fromState = USER_FLOW_SECTION_STEPS[segmentIndex].cards[cardId];
    const toState = USER_FLOW_SECTION_STEPS[segmentIndex + 1].cards[cardId];
    const fromOpacity = fromState.visible ? 1 : 0;
    const toOpacity = toState.visible ? 1 : 0;

    return {
      visible: lerp(fromOpacity, toOpacity, segmentProgress) > 0.02,
      opacity: lerp(fromOpacity, toOpacity, segmentProgress),
      top: lerp(fromState.top, toState.top, segmentProgress),
      height: lerp(fromState.height, toState.height, segmentProgress),
    };
  };

  return (
    <section
      ref={sectionRef}
      id="user-flow"
      style={{ height: USER_FLOW_SECTION_HEIGHT * USER_FLOW_SCROLL_LENGTH_MULTIPLIER }}
      className={cn("relative mx-auto w-full max-w-screen-2xl bg-brand-white", className)}
    >
      <div
        className="sticky top-0 flex items-center overflow-hidden px-4 sm:px-6 lg:px-10"
        style={{ height: USER_FLOW_SECTION_HEIGHT }}
      >
        <div className="mx-auto flex h-full w-full max-w-[min(100%,90rem)] min-h-0 flex-col">
          <div className="shrink-0">
            <UserFlowSectionHeading
              title={USER_FLOW_SECTION_HEADLINE}
              show={shouldShowHeading}
              textSizeVariant="desktop"
            />
          </div>
          <div className="min-h-0 flex-1">
            <UserFlowCardsStageDesktop
              activeStep={activeStep}
              activeStepIndex={activeStepIndex}
              leftCards={leftCards}
              rightCards={rightCards}
              getInterpolatedCardState={getInterpolatedCardState}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
