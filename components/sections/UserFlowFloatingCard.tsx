"use client";

import { Crosshair, HandCoins, Wallet } from "lucide-react";
import { motion } from "framer-motion";

import { DepositFoundsIcon } from "@/components/assets/deposit-founds-icon";
import type {
  UserFlowCardDefinition,
  UserFlowCardState,
} from "@/components/constants/user-flow-section";
import { USER_FLOW_CARD_COLLAPSED_HEIGHT, USER_FLOW_CARD_WIDTH } from "@/components/constants/user-flow-section";
import { cn } from "@/lib/utils";

function UserFlowCardIcon({ icon }: { icon: UserFlowCardDefinition["icon"] }) {
  if (icon === "wallet") {
    return <Wallet className="size-4 sm:size-5" strokeWidth={1.8} aria-hidden />;
  }

  if (icon === "earn") {
    return <HandCoins className="size-4 sm:size-5" strokeWidth={1.8} aria-hidden />;
  }

  if (icon === "predict") {
    return <Crosshair className="size-4 sm:size-5" strokeWidth={1.8} aria-hidden />;
  }

  return <DepositFoundsIcon />;
}

export function UserFlowFloatingCard({
  card,
  state,
}: {
  card: UserFlowCardDefinition;
  state: UserFlowCardState;
}) {
  const toneClassName =
    card.tone === "purple"
      ? "bg-brand-light-purple text-brand-black"
      : card.tone === "darkGreen"
        ? "bg-brand-dark-green text-white"
        : "bg-brand-light-green text-brand-black";

  const compact = state.height <= USER_FLOW_CARD_COLLAPSED_HEIGHT + 4;

  return (
    <motion.article
      initial={false}
      animate={{
        opacity: state.visible ? 1 : 0,
        top: state.top,
        height: state.height,
      }}
      transition={{
        duration: 0.52,
        ease: [0.22, 1, 0.36, 1],
        delay: state.delay ?? 0,
      }}
      className={cn(
        "absolute left-1/2 w-full -translate-x-1/2 overflow-hidden rounded-xl px-4 py-3 sm:px-5",
        toneClassName
      )}
      style={{ maxWidth: USER_FLOW_CARD_WIDTH }}
    >
      <div className={cn("flex items-center justify-between gap-3", compact ? "mb-0" : "mb-4")}>
        <span className="inline-flex items-center rounded-full bg-white px-3 py-1.5 text-[11px] font-medium leading-none text-brand-black sm:text-xs">
          {card.label}
        </span>
        <span className="inline-flex size-6 items-center justify-center sm:size-7">
          <UserFlowCardIcon icon={card.icon} />
        </span>
      </div>

      {!compact && card.title ? (
        <p className="text-pretty text-[clamp(1.45rem,2.2vw,2.2rem)] font-semibold leading-[1.02]">
          {card.title}
        </p>
      ) : null}
    </motion.article>
  );
}
