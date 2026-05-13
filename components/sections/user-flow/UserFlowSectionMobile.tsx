"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

import { landingLenientInView, landingLenientInViewOnce } from "@/components/motion/lenient-in-view";
import {
  USER_FLOW_CARDS,
  USER_FLOW_SECTION_HEADLINE,
  USER_FLOW_SECTION_STEPS,
} from "@/components/constants/user-flow-section";
import { UserFlowCardsStageMobile } from "@/components/sections/user-flow/UserFlowCardsStageMobile";
import { UserFlowSectionHeading } from "@/components/sections/user-flow/UserFlowSectionHeading";
import { cn } from "@/lib/utils";

const STEP_COUNT = USER_FLOW_SECTION_STEPS.length;
const MOBILE_FLOW_STEP_COUNT = STEP_COUNT + 1;
const SCROLL_PROGRESS_MAX = 0.9999;
const SCROLL_STEP_SENSITIVITY = 520;
/** Section top must be at or above this (px) before wheel/touch drives step progress. */
const MOBILE_ANIMATION_START_TOP_PX = 160;

type UserFlowSectionMobileProps = {
  className?: string;
};

export function UserFlowSectionMobile({ className }: UserFlowSectionMobileProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const touchStartYRef = useRef<number | null>(null);
  const scrollProgressRef = useRef(0);
  const sectionInViewRef = useRef(false);
  /** Reveal card stack when the section enters view (works for page scroll; not only wheel on the section). */
  const sectionInViewForCards = useInView(sectionRef, landingLenientInViewOnce);
  const sectionInView = useInView(sectionRef, landingLenientInView);
  const mobileFlowStepIndex = Math.min(
    MOBILE_FLOW_STEP_COUNT - 1,
    Math.round(scrollProgress * (MOBILE_FLOW_STEP_COUNT - 1))
  );
  const activeStepIndex = Math.max(0, Math.min(STEP_COUNT - 1, mobileFlowStepIndex - 1));

  useEffect(() => {
    sectionInViewRef.current = sectionInView;
  }, [sectionInView]);

  const isAnimationStartPointReached = () => {
    if (!sectionInViewRef.current) {
      return false;
    }

    const section = sectionRef.current;
    if (!section) {
      return false;
    }

    const rect = section.getBoundingClientRect();
    return rect.top <= MOBILE_ANIMATION_START_TOP_PX;
  };

  const updateProgressByDelta = (delta: number) => {
    setScrollProgress((prev) => {
      const next = Math.max(0, Math.min(SCROLL_PROGRESS_MAX, prev + delta / SCROLL_STEP_SENSITIVITY));
      scrollProgressRef.current = next;
      return next;
    });
  };

  const shouldCaptureScroll = (delta: number) => {
    if (!isAnimationStartPointReached()) {
      return false;
    }

    if (delta > 0) {
      return scrollProgressRef.current < SCROLL_PROGRESS_MAX;
    }

    if (delta < 0) {
      return scrollProgressRef.current > 0;
    }

    return false;
  };

  const handleWheel = (event: WheelEvent) => {
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

  const interactionHandlersRef = useRef({
    handleWheel,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  });

  useLayoutEffect(() => {
    interactionHandlersRef.current = {
      handleWheel,
      handleTouchStart,
      handleTouchMove,
      handleTouchEnd,
    };
  });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) {
      return;
    }

    const onWheel = (event: WheelEvent) => interactionHandlersRef.current.handleWheel(event);
    const onTouchStart = (event: TouchEvent) =>
      interactionHandlersRef.current.handleTouchStart(event);
    const onTouchMove = (event: TouchEvent) =>
      interactionHandlersRef.current.handleTouchMove(event);
    const onTouchEnd = () => interactionHandlersRef.current.handleTouchEnd();

    section.addEventListener("wheel", onWheel, { passive: false });
    section.addEventListener("touchstart", onTouchStart, { passive: true });
    section.addEventListener("touchmove", onTouchMove, { passive: false });
    section.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      section.removeEventListener("wheel", onWheel);
      section.removeEventListener("touchstart", onTouchStart);
      section.removeEventListener("touchmove", onTouchMove);
      section.removeEventListener("touchend", onTouchEnd);
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
          <UserFlowSectionHeading
            title={USER_FLOW_SECTION_HEADLINE}
            show={sectionInView}
            textSizeVariant="mobile"
          />
          <UserFlowCardsStageMobile
            shouldRevealMobileCards={sectionInViewForCards}
            mobileFlowStepIndex={mobileFlowStepIndex}
            activeStep={activeStep}
            activeStepIndex={activeStepIndex}
            leftCards={leftCards}
            rightCards={rightCards}
          />
        </div>
      </div>
    </section>
  );
}
