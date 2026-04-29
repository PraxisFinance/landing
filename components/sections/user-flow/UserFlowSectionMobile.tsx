"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

import {
  USER_FLOW_CARDS,
  USER_FLOW_SECTION_HEADLINE,
  USER_FLOW_SECTION_STEPS,
  type UserFlowCardState,
} from "@/components/constants/user-flow-section";
import { UserFlowCardsStage } from "@/components/sections/user-flow/UserFlowCardsStage";
import { UserFlowSectionHeading } from "@/components/sections/user-flow/UserFlowSectionHeading";
import { cn } from "@/lib/utils";

const STEP_COUNT = USER_FLOW_SECTION_STEPS.length;
const MOBILE_FLOW_STEP_COUNT = STEP_COUNT + 1;
const SCROLL_PROGRESS_MAX = 0.9999;
const SCROLL_STEP_SENSITIVITY = 520;
const MOBILE_ANIMATION_START_TOP_PX = 110;

type UserFlowSectionMobileProps = {
  className?: string;
};

const hiddenCardState: UserFlowCardState = {
  visible: false,
  opacity: 0,
  top: 0,
  height: 0,
};

export function UserFlowSectionMobile({ className }: UserFlowSectionMobileProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const touchStartYRef = useRef<number | null>(null);
  const progressRef = useRef(0);
  const inViewRef = useRef(false);
  const hasEnteredViewportRef = useRef(false);
  const sectionInView = useInView(sectionRef, { amount: 0.2 });
  const [hasEnteredViewport, setHasEnteredViewport] = useState(false);
  const mobileFlowStepIndex = Math.min(
    MOBILE_FLOW_STEP_COUNT - 1,
    Math.round(scrollProgress * (MOBILE_FLOW_STEP_COUNT - 1))
  );
  const activeStepIndex = Math.max(0, Math.min(STEP_COUNT - 1, mobileFlowStepIndex - 1));

  progressRef.current = scrollProgress;
  inViewRef.current = sectionInView;
  hasEnteredViewportRef.current = hasEnteredViewport;

  const isAnimationStartPointReached = () => {
    if (!inViewRef.current) {
      return false;
    }

    const section = sectionRef.current;
    if (!section) {
      return false;
    }

    const rect = section.getBoundingClientRect();
    return rect.top <= MOBILE_ANIMATION_START_TOP_PX;
  };

  const markViewportEntered = () => {
    if (!hasEnteredViewportRef.current && isAnimationStartPointReached()) {
      setHasEnteredViewport(true);
    }
  };

  const updateProgressByDelta = (delta: number) => {
    setScrollProgress((prev) => {
      const next = Math.max(0, Math.min(SCROLL_PROGRESS_MAX, prev + delta / SCROLL_STEP_SENSITIVITY));
      return next;
    });
  };

  const shouldCaptureScroll = (delta: number) => {
    if (!isAnimationStartPointReached()) {
      return false;
    }

    if (delta > 0) {
      return progressRef.current < SCROLL_PROGRESS_MAX;
    }

    if (delta < 0) {
      return progressRef.current > 0;
    }

    return false;
  };

  const handleWheel = (event: WheelEvent) => {
    markViewportEntered();

    if (!shouldCaptureScroll(event.deltaY)) {
      return;
    }

    event.preventDefault();
    updateProgressByDelta(event.deltaY);
  };

  const handleTouchStart = (event: TouchEvent) => {
    touchStartYRef.current = event.touches[0]?.clientY ?? null;
  };

  const handleTouchMove = (event: TouchEvent) => {
    markViewportEntered();

    const currentY = event.touches[0]?.clientY;
    const previousY = touchStartYRef.current;

    if (typeof currentY !== "number" || typeof previousY !== "number") {
      return;
    }

    const deltaY = previousY - currentY;
    if (!shouldCaptureScroll(deltaY)) {
      touchStartYRef.current = currentY;
      return;
    }

    event.preventDefault();
    updateProgressByDelta(deltaY);
    touchStartYRef.current = currentY;
  };

  const handleTouchEnd = () => {
    touchStartYRef.current = null;
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) {
      return;
    }

    section.addEventListener("wheel", handleWheel, { passive: false });
    section.addEventListener("touchstart", handleTouchStart, { passive: true });
    section.addEventListener("touchmove", handleTouchMove, { passive: false });
    section.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      section.removeEventListener("wheel", handleWheel);
      section.removeEventListener("touchstart", handleTouchStart);
      section.removeEventListener("touchmove", handleTouchMove);
      section.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  const activeStep = USER_FLOW_SECTION_STEPS[activeStepIndex];
  const leftCards = USER_FLOW_CARDS.filter((item) => item.id === "connect-wallet" || item.id === "earn-yield");
  const rightCards = USER_FLOW_CARDS.filter(
    (item) => item.id === "deposit-funds" || item.id === "allocate-yield"
  );

  return (
    <section
      ref={sectionRef}
      id="user-flow"
      className={cn("mx-auto w-full max-w-screen-2xl touch-pan-y bg-brand-white pb-8", className)}
    >
      <div className="px-4 sm:px-6 lg:px-10">
        <div className="mx-auto flex w-full max-w-[min(100%,90rem)] flex-col gap-2">
          <UserFlowSectionHeading title={USER_FLOW_SECTION_HEADLINE} show={sectionInView} />
          <UserFlowCardsStage
            isMobile
            shouldRevealMobileCards={hasEnteredViewport}
            mobileFlowStepIndex={mobileFlowStepIndex}
            activeStep={activeStep}
            activeStepIndex={activeStepIndex}
            leftCards={leftCards}
            rightCards={rightCards}
            getInterpolatedCardState={() => hiddenCardState}
          />
        </div>
      </div>
    </section>
  );
}
