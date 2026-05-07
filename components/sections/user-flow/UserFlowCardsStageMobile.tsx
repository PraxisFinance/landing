"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

import type { UserFlowCardDefinition, UserFlowStepState } from "@/components/constants/user-flow-section";
import {
  USER_FLOW_SECTION_CENTER_MAX_PX,
  USER_FLOW_SECTION_IMAGE_ALT,
} from "@/components/constants/user-flow-section";
import { UserFlowMobileCardsStage } from "@/components/sections/user-flow/UserFlowMobileCardsStage";
import { cn } from "@/lib/utils";

type UserFlowCardsStageMobileProps = {
  shouldRevealMobileCards?: boolean;
  mobileFlowStepIndex?: number;
  activeStep: UserFlowStepState;
  activeStepIndex: number;
  leftCards: UserFlowCardDefinition[];
  rightCards: UserFlowCardDefinition[];
};

export function UserFlowCardsStageMobile({
  shouldRevealMobileCards = true,
  mobileFlowStepIndex,
  activeStep,
  activeStepIndex,
  leftCards,
  rightCards,
}: UserFlowCardsStageMobileProps) {
  return (
    <div className="grid min-h-0 grid-cols-1 items-start gap-2" style={{ height: "auto" }}>
      <div
        style={{ maxWidth: `${USER_FLOW_SECTION_CENTER_MAX_PX}px` }}
        className={cn(
          "order-1 relative aspect-square w-full justify-self-center rounded-2xl p-4 sm:p-5",
          "bg-brand-gray"
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
    </div>
  );
}
