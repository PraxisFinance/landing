"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

import {
  USER_FLOW_CARDS,
  USER_FLOW_CARD_HIDDEN_Y,
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

type UserFlowSectionProps = {
  className?: string;
};

export function UserFlowSection({ className }: UserFlowSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const titleOpacity = useTransform(scrollYProgress, [0, 0.07, 0.16], [0, 1, 1]);
  const titleY = useTransform(scrollYProgress, [0, 0.08], [40, 0]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const clamped = Math.max(0, Math.min(0.9999, latest));
    const nextIndex = Math.min(STEP_COUNT - 1, Math.floor(clamped * STEP_COUNT));
    setActiveStepIndex((prev) => (prev === nextIndex ? prev : nextIndex));
  });

  const activeStep = USER_FLOW_SECTION_STEPS[activeStepIndex];
  const leftCards = USER_FLOW_CARDS.filter((item) => item.id === "connect-wallet" || item.id === "earn-yield");
  const rightCards = USER_FLOW_CARDS.filter(
    (item) => item.id === "deposit-funds" || item.id === "allocate-yield"
  );

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
            style={{ opacity: titleOpacity, y: titleY }}
            className="mb-8 text-center text-[clamp(2rem,6vw,6rem)] font-bold leading-[1.02] tracking-tight text-brand-black sm:mb-10"
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
                  state={
                    activeStep.cards[card.id] ?? {
                      visible: false,
                      top: USER_FLOW_CARD_HIDDEN_Y,
                      height: 0,
                    }
                  }
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
                  initial={{ opacity: 0, y: 22, scale: 0.985 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.985 }}
                  transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
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
                  state={
                    activeStep.cards[card.id] ?? {
                      visible: false,
                      top: USER_FLOW_CARD_HIDDEN_Y,
                      height: 0,
                    }
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
