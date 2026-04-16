"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useMotionValueEvent, useScroll } from "framer-motion";
import Image from "next/image";

import {
  USER_FLOW_CARDS,
  USER_FLOW_SECTION_CENTER_MAX_PX,
  USER_FLOW_SECTION_CONTENT_HEIGHT,
  USER_FLOW_SECTION_HEADLINE,
  USER_FLOW_SECTION_HEIGHT,
  USER_FLOW_SECTION_IMAGE_ALT,
  USER_FLOW_SECTION_STEPS,
} from "@/components/constants/user-flow-section";
import { UserFlowFloatingCard } from "@/components/sections/UserFlowFloatingCard";
import { cn } from "@/lib/utils";

const STEP_COUNT = USER_FLOW_SECTION_STEPS.length;
const FLOW_SCROLL_MULTIPLIER = 5.4;
const STEP_POINTS = USER_FLOW_SECTION_STEPS.map((_, i) => i / (STEP_COUNT - 1));
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
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionInView = useInView(sectionRef, { amount: 0.2, once: true });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const shouldShowHeading = sectionInView || scrollProgress > 0.001;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const clamped = Math.max(0, Math.min(0.9999, latest));
    setScrollProgress(clamped);
    const nextIndex = Math.min(STEP_COUNT - 1, Math.floor(clamped * STEP_COUNT));
    setActiveStepIndex((prev) => (prev === nextIndex ? prev : nextIndex));
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
      style={{ minHeight: `${FLOW_SCROLL_MULTIPLIER * 100}vh` }}
      className={cn(
        "relative mx-auto w-full max-w-screen-2xl bg-brand-white",
        className
      )}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden px-4 sm:px-6 lg:px-10">
        <div
          className="mx-auto w-full max-w-[min(100%,90rem)]"
          style={{ height: USER_FLOW_SECTION_HEIGHT }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 36 }}
            animate={shouldShowHeading ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
            transition={{ duration: 0.55, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-30 mb-8 text-center text-[clamp(2rem,6vw,6rem)] font-bold leading-[1.02] tracking-tight text-brand-black sm:mb-10"
          >
            {USER_FLOW_SECTION_HEADLINE}
          </motion.h2>

          <div
            className={cn(
              "grid min-h-0 items-start gap-4",
              "grid-cols-1 lg:grid-cols-[345px_minmax(0,1fr)_345px]",
              "xl:gap-6 2xl:gap-8"
            )}
            style={{ height: USER_FLOW_SECTION_CONTENT_HEIGHT }}
          >
            <div
              className="order-2 relative mx-auto hidden w-full lg:order-none lg:block"
              style={{ width: 345, height: USER_FLOW_SECTION_CONTENT_HEIGHT }}
            >
              {leftCards.map((card) => (
                <UserFlowFloatingCard
                  key={card.id}
                  card={card}
                  state={getInterpolatedCardState(card.id)}
                />
              ))}
            </div>

            <div
              style={{ maxWidth: `${USER_FLOW_SECTION_CENTER_MAX_PX}px` }}
              className={cn(
                "order-1 relative aspect-square w-full justify-self-center rounded-2xl bg-brand-gray/45 p-4 sm:p-5 lg:order-none"
              )}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeStep.image}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="relative h-full w-full"
                >
                  <Image
                    src={activeStep.image}
                    alt={USER_FLOW_SECTION_IMAGE_ALT}
                    fill
                    className="object-contain object-center"
                    sizes="(max-width: 1280px) 80vw, 720px"
                    priority={activeStepIndex <= 1}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <div
              className="order-3 relative mx-auto hidden w-full lg:order-none lg:block"
              style={{ width: 345, height: USER_FLOW_SECTION_CONTENT_HEIGHT }}
            >
              {rightCards.map((card) => (
                <UserFlowFloatingCard
                  key={card.id}
                  card={card}
                  state={getInterpolatedCardState(card.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
