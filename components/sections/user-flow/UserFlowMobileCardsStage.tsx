"use client";

import type { UserFlowCardDefinition, UserFlowCardState } from "@/components/constants/user-flow-section";
import { USER_FLOW_CARD_COLLAPSED_HEIGHT } from "@/components/constants/user-flow-section";
import { UserFlowFloatingCard } from "@/components/sections/user-flow/UserFlowFloatingCard";

type UserFlowMobileCardsStageProps = {
  activeStepIndex: number;
  cards: UserFlowCardDefinition[];
  shouldReveal: boolean;
};

const MOBILE_STAGE_COUNT = 4;
const MOBILE_CARD_EXPANDED_HEIGHT = 290;
const MOBILE_CARD_GAP = 20;
const MOBILE_CARDS_STAGE_HEIGHT =
  USER_FLOW_CARD_COLLAPSED_HEIGHT + MOBILE_CARD_GAP + MOBILE_CARD_EXPANDED_HEIGHT;

export function UserFlowMobileCardsStage({
  activeStepIndex,
  cards,
  shouldReveal,
}: UserFlowMobileCardsStageProps) {
  const mobileVisualStepIndex = Math.max(0, activeStepIndex);
  const isInitialExpandedState = mobileVisualStepIndex === 0;
  const isFinalCompactState = mobileVisualStepIndex >= MOBILE_STAGE_COUNT + 1;
  const expandedCardIndex = isFinalCompactState
    ? -1
    : Math.min(mobileVisualStepIndex, MOBILE_STAGE_COUNT - 1);
  const compactCardIndex = isFinalCompactState
    ? MOBILE_STAGE_COUNT - 1
    : expandedCardIndex > 0
      ? expandedCardIndex - 1
      : -1;
  const hasExpandedCard = expandedCardIndex !== -1;
  const stageHeight = hasExpandedCard ? MOBILE_CARDS_STAGE_HEIGHT : USER_FLOW_CARD_COLLAPSED_HEIGHT;
  const effectiveStageHeight = isInitialExpandedState ? MOBILE_CARD_EXPANDED_HEIGHT : stageHeight;
  const hiddenTop = effectiveStageHeight + 32;
  const hiddenTopAbove = -USER_FLOW_CARD_COLLAPSED_HEIGHT - 24;

  const getMobileCardState = (cardId: string): UserFlowCardState => {
    const cardIndex = cards.findIndex((card) => card.id === cardId);

    if (isInitialExpandedState && cardIndex === expandedCardIndex && shouldReveal) {
      return {
        visible: true,
        opacity: 1,
        top: 0,
        height: MOBILE_CARD_EXPANDED_HEIGHT,
      };
    }

    if (cardIndex === compactCardIndex && shouldReveal) {
      return {
        visible: true,
        opacity: 1,
        top: 0,
        height: USER_FLOW_CARD_COLLAPSED_HEIGHT,
      };
    }

    if (cardIndex === expandedCardIndex && shouldReveal) {
      return {
        visible: true,
        opacity: 1,
        top: USER_FLOW_CARD_COLLAPSED_HEIGHT + MOBILE_CARD_GAP,
        height: MOBILE_CARD_EXPANDED_HEIGHT,
      };
    }

    if (cardIndex >= 0 && cardIndex < compactCardIndex) {
      return {
        visible: false,
        opacity: 0,
        top: hiddenTopAbove,
        height: USER_FLOW_CARD_COLLAPSED_HEIGHT,
      };
    }

    return {
      visible: false,
      opacity: 0,
      top: hiddenTop,
      height: MOBILE_CARD_EXPANDED_HEIGHT,
    };
  };

  return (
    <div className="relative mx-auto w-full max-w-[345px]" style={{ height: effectiveStageHeight }}>
      {cards.map((card) => (
        <UserFlowFloatingCard
          key={`mobile-${card.id}`}
          card={card}
          state={getMobileCardState(card.id)}
          useMobileChrome
        />
      ))}
    </div>
  );
}
