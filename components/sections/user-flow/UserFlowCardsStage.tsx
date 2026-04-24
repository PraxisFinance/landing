"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

import type {
  UserFlowCardDefinition,
  UserFlowCardState,
  UserFlowStepState,
} from "@/components/constants/user-flow-section";
import {
  USER_FLOW_SECTION_CENTER_MAX_PX,
  USER_FLOW_SECTION_CONTENT_HEIGHT,
  USER_FLOW_SECTION_IMAGE_ALT,
} from "@/components/constants/user-flow-section";
import { UserFlowFloatingCard } from "@/components/sections/user-flow/UserFlowFloatingCard";
import { UserFlowMobileCardsStage } from "@/components/sections/user-flow/UserFlowMobileCardsStage";
import { cn } from "@/lib/utils";

type UserFlowCardsStageProps = {
  isMobile: boolean;
  shouldRevealMobileCards?: boolean;
  mobileFlowStepIndex?: number;
  activeStep: UserFlowStepState;
  activeStepIndex: number;
  leftCards: UserFlowCardDefinition[];
  rightCards: UserFlowCardDefinition[];
  getInterpolatedCardState: (cardId: string) => UserFlowCardState;
};

export function UserFlowCardsStage({
  isMobile,
  shouldRevealMobileCards = true,
  mobileFlowStepIndex,
  activeStep,
  activeStepIndex,
  leftCards,
  rightCards,
  getInterpolatedCardState,
}: UserFlowCardsStageProps) {
  return (
    <div
      className={cn(
        "grid min-h-0 items-start",
        isMobile ? "gap-2" : "gap-4",
        "grid-cols-1 lg:grid-cols-[345px_minmax(0,1fr)_345px]",
        "xl:gap-6 2xl:gap-8"
      )}
      style={{ height: isMobile ? "auto" : USER_FLOW_SECTION_CONTENT_HEIGHT }}
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
          "order-1 relative aspect-square w-full justify-self-center rounded-2xl p-4 sm:p-5 lg:order-none",
          isMobile ? "bg-brand-gray" : "bg-brand-gray/45"
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

      <div className="order-2">
        <UserFlowMobileCardsStage
          activeStepIndex={mobileFlowStepIndex ?? activeStepIndex}
          cards={[...leftCards, ...rightCards]}
          shouldReveal={shouldRevealMobileCards}
        />
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
  );
}
