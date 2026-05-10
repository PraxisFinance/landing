"use client";

import { Wallet } from "lucide-react";
import { motion } from "framer-motion";

import { DepositFoundsIcon } from "@/components/assets/deposit-founds-icon";
import { UserFlowEarnYieldIcon } from "@/components/assets/user-flow-earn-yield-icon";
import { UserFlowPredictEventsIcon } from "@/components/assets/user-flow-predict-events-icon";
import type {
  UserFlowCardDefinition,
  UserFlowCardState,
} from "@/components/constants/user-flow-section";
import {
  USER_FLOW_CARD_COLLAPSED_HEIGHT,
  USER_FLOW_CARD_WIDTH,
} from "@/components/constants/user-flow-section";
import { SECTION_TEXT_SIZES } from "@/components/constants/text-sizes";
import { useIsMobile } from "@/components/providers/mobile-context";
import { cn } from "@/lib/utils";

type UserFlowFloatingCardProps = {
  card: UserFlowCardDefinition;
  state: UserFlowCardState;
  /** Mobile-only stack: use mobile typography/expanded chrome without relying on viewport context (avoids wrong layout before hydration). */
  useMobileChrome?: boolean;
};

function UserFlowCardIcon({ icon }: { icon: UserFlowCardDefinition["icon"] }) {
  if (icon === "wallet") {
    return <Wallet className="size-4 text-white sm:size-5" strokeWidth={1.8} aria-hidden />;
  }

  if (icon === "earn-yield-custom") {
    return <UserFlowEarnYieldIcon />;
  }

  if (icon === "predict-events-custom") {
    return <UserFlowPredictEventsIcon />;
  }

  return <DepositFoundsIcon />;
}

export function UserFlowFloatingCard({ card, state, useMobileChrome }: UserFlowFloatingCardProps) {
  const isMobileFromContext = useIsMobile();
  const isMobileLayout = useMobileChrome ?? isMobileFromContext;
  const userFlowTextSizes = SECTION_TEXT_SIZES.userFlow;
  const cardLabelTextSizeClassName = isMobileLayout
    ? userFlowTextSizes.cardLabel.mobile
    : userFlowTextSizes.cardLabel.desktop;
  const cardTitleTextSizeClassName = isMobileLayout
    ? userFlowTextSizes.cardTitle.mobile
    : userFlowTextSizes.cardTitle.desktop;

  const toneClassName =
    card.tone === "purple"
      ? "bg-brand-light-purple text-brand-black"
      : card.tone === "darkGreen"
        ? "bg-brand-dark-green text-white"
        : "bg-brand-light-green text-brand-black";

  const compact = state.height <= USER_FLOW_CARD_COLLAPSED_HEIGHT + 4;
  const isMobileExpanded = isMobileLayout && !compact;

  return (
    <motion.article
      initial={false}
      animate={{
        opacity: state.opacity ?? (state.visible ? 1 : 0),
        top: state.top,
        height: state.height,
      }}
      transition={{
        duration: 0.12,
        ease: "linear",
        delay: 0,
      }}
      className={cn(
        "absolute left-1/2 w-full -translate-x-1/2 overflow-hidden rounded-xl px-4 py-5 sm:px-5",
        toneClassName
      )}
      style={{ maxWidth: USER_FLOW_CARD_WIDTH }}
    >
      {isMobileExpanded ? (
        <div className="flex h-full flex-col justify-between gap-4">
          <p className={cn("text-pretty font-semibold leading-[1.02]", cardTitleTextSizeClassName)}>
            {card.title}
          </p>
          <div className="flex items-center justify-between gap-3">
            <span
              className={cn(
                "inline-flex items-center rounded-full bg-white px-3 py-1.5 font-medium leading-none text-brand-black",
                cardLabelTextSizeClassName
              )}
            >
              {card.label}
            </span>
            <span className="inline-flex size-6 items-center justify-center sm:size-7">
              <UserFlowCardIcon icon={card.icon} />
            </span>
          </div>
        </div>
      ) : (
        <>
          <div className={cn("flex items-center justify-between gap-3", compact ? "mb-0" : "mb-4")}>
            <span
              className={cn(
                "inline-flex items-center rounded-full bg-white px-3 py-1.5 font-medium leading-none text-brand-black",
                cardLabelTextSizeClassName
              )}
            >
              {card.label}
            </span>
            <span className="inline-flex size-6 items-center justify-center sm:size-7">
              <UserFlowCardIcon icon={card.icon} />
            </span>
          </div>

          {!compact && card.title ? (
            <p className={cn("text-pretty font-semibold leading-[1.02]", cardTitleTextSizeClassName)}>
              {card.title}
            </p>
          ) : null}
        </>
      )}
    </motion.article>
  );
}
