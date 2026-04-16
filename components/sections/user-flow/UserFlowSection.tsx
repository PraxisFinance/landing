"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValueEvent, useScroll } from "framer-motion";

import {
  USER_FLOW_CARDS,
  USER_FLOW_SECTION_HEADLINE,
  USER_FLOW_SECTION_HEIGHT,
  USER_FLOW_SECTION_STEPS,
} from "@/components/constants/user-flow-section";
import { UserFlowCardsStage } from "@/components/sections/user-flow/UserFlowCardsStage";
import { UserFlowSectionHeading } from "@/components/sections/user-flow/UserFlowSectionHeading";
import { cn } from "@/lib/utils";

const STEP_COUNT = USER_FLOW_SECTION_STEPS.length;
const STEP_POINTS = USER_FLOW_SECTION_STEPS.map((_, i) => i / (STEP_COUNT - 1));
const WHEEL_TO_PROGRESS = 0.00125;
const PROGRESS_EPSILON = 0.0005;
const CARD_PROGRESS_OFFSET: Record<string, number> = {
  "connect-wallet": 0,
  "earn-yield": 0,
  "deposit-funds": 0.03,
  "allocate-yield": 0.02,
};

function lerp(from: number, to: number, t: number) {
  return from + (to - from) * t;
}

type UserFlowSectionProps = {
  className?: string;
};

export function UserFlowSection({ className }: UserFlowSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const capturedProgressRef = useRef<number | null>(null);
  const releaseDirectionRef = useRef<"up" | "down" | null>(null);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionInView = useInView(sectionRef, { amount: 0.2, once: true });
  /** Progress 0→1 пока секция проходит мимо viewport: от «верх совпал с верхом» до «низ совпал с верхом» — ровно ~высота секции скролла, без лишней minHeight. */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const shouldShowHeading = sectionInView || scrollProgress > 0.001;

  const updateStepFromProgress = (progress: number) => {
    const nextIndex = Math.min(STEP_COUNT - 1, Math.floor(progress * STEP_COUNT));
    setActiveStepIndex((prev) => (prev === nextIndex ? prev : nextIndex));
  };

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (capturedProgressRef.current !== null || releaseDirectionRef.current !== null) return;
    const clamped = Math.max(0, Math.min(0.9999, latest));
    setScrollProgress(clamped);
    updateStepFromProgress(clamped);
  });

  useEffect(() => {
    const onWheel = (event: WheelEvent) => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const sectionActive = rect.top <= viewportCenter && rect.bottom >= viewportCenter;
      if (!sectionActive) {
        capturedProgressRef.current = null;
        releaseDirectionRef.current = null;
        return;
      }

      // After reaching a boundary (0 or 1), do not re-capture wheel inside the same
      // viewport pass. Let page scroll naturally until section leaves active zone.
      if (releaseDirectionRef.current !== null) {
        return;
      }

      const currentProgress = capturedProgressRef.current ?? scrollProgress;
      const direction = Math.sign(event.deltaY);
      if (direction === 0) return;

      const atStart = currentProgress <= PROGRESS_EPSILON;
      const atEnd = currentProgress >= 1 - PROGRESS_EPSILON;
      const leavingUp = atStart && direction < 0;
      const leavingDown = atEnd && direction > 0;

      if (leavingUp || leavingDown) {
        capturedProgressRef.current = null;
        releaseDirectionRef.current = leavingDown ? "down" : "up";
        const boundaryProgress = leavingDown ? 1 : 0;
        setScrollProgress(boundaryProgress);
        updateStepFromProgress(boundaryProgress);
        return;
      }

      event.preventDefault();
      const nextProgress = Math.max(
        0,
        Math.min(1, currentProgress + event.deltaY * WHEEL_TO_PROGRESS)
      );
      const snappedProgress =
        nextProgress <= PROGRESS_EPSILON
          ? 0
          : nextProgress >= 1 - PROGRESS_EPSILON
            ? 1
            : nextProgress;
      capturedProgressRef.current = snappedProgress;
      setScrollProgress(snappedProgress);
      updateStepFromProgress(snappedProgress);

      if (snappedProgress === 1 && direction > 0) {
        capturedProgressRef.current = null;
        releaseDirectionRef.current = "down";
        setScrollProgress(1);
        updateStepFromProgress(1);
      } else if (snappedProgress === 0 && direction < 0) {
        capturedProgressRef.current = null;
        releaseDirectionRef.current = "up";
        setScrollProgress(0);
        updateStepFromProgress(0);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [scrollProgress]);

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
      style={{ height: USER_FLOW_SECTION_HEIGHT }}
      className={cn(
        "relative mx-auto w-full max-w-screen-2xl overflow-hidden bg-brand-white",
        className
      )}
    >
      <div className="flex h-full items-center px-4 sm:px-6 lg:px-10">
        <div
          className="mx-auto flex h-full w-full max-w-[min(100%,90rem)] min-h-0 flex-col"
        >
          <div className="shrink-0">
            <UserFlowSectionHeading title={USER_FLOW_SECTION_HEADLINE} show={shouldShowHeading} />
          </div>

          <div className="min-h-0 flex-1">
            <UserFlowCardsStage
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
