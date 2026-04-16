export const USER_FLOW_SECTION_HEADLINE = "Praxis User Flow" as const;

export const USER_FLOW_SECTION_IMAGE_ALT = "Praxis app screen by current flow step";
export const USER_FLOW_SECTION_HEIGHT = 862;
export const USER_FLOW_SECTION_CONTENT_HEIGHT = 560;
export const USER_FLOW_SECTION_CENTER_MAX_PX = 720;

export const USER_FLOW_CARD_WIDTH = 345;
export const USER_FLOW_CARD_COLLAPSED_HEIGHT = 65;
export const USER_FLOW_CARD_EXPANDED_HEIGHT = 400;
export const USER_FLOW_CARD_HIDDEN_Y = 620;

export type UserFlowCardTone = "purple" | "green" | "darkGreen";
export type UserFlowCardIcon =
  | "wallet"
  | "deposit"
  | "earn-yield-custom"
  | "predict-events-custom";

export type UserFlowCardDefinition = {
  id: string;
  icon: UserFlowCardIcon;
  label: string;
  title?: string;
  tone: UserFlowCardTone;
};

export type UserFlowCardState = {
  visible: boolean;
  top: number;
  height: number;
  opacity?: number;
  delay?: number;
};

export type UserFlowStepState = {
  id: number;
  image: string;
  cards: Record<string, UserFlowCardState>;
};

export const USER_FLOW_CARDS: UserFlowCardDefinition[] = [
  {
    id: "connect-wallet",
    icon: "wallet",
    label: "Connect Wallet",
    title: "Connect your wallet to our application",
    tone: "purple",
  },
  {
    id: "earn-yield",
    icon: "earn-yield-custom",
    label: "Earn Yield",
    title: "Yield accumulates in the vault",
    tone: "green",
  },
  {
    id: "deposit-funds",
    icon: "deposit",
    label: "Deposit Funds",
    title: "Deposit funds into vault to start yield",
    tone: "green",
  },
  {
    id: "allocate-yield",
    icon: "predict-events-custom",
    label: "Predict Events",
    title: "Allocate yield to outcomes across various events",
    tone: "darkGreen",
  },
] as const;

export const USER_FLOW_SECTION_STEPS: UserFlowStepState[] = [
  {
    id: 1,
    image: "/user-flow/1.png",
    cards: {
      "connect-wallet": { visible: true, top: 120, height: USER_FLOW_CARD_EXPANDED_HEIGHT },
      "earn-yield": { visible: false, top: USER_FLOW_CARD_HIDDEN_Y, height: USER_FLOW_CARD_EXPANDED_HEIGHT },
      "deposit-funds": {
        visible: true,
        top: 190,
        height: USER_FLOW_CARD_EXPANDED_HEIGHT,
        delay: 0.12,
      },
      "allocate-yield": { visible: false, top: USER_FLOW_CARD_HIDDEN_Y, height: USER_FLOW_CARD_EXPANDED_HEIGHT },
    },
  },
  {
    id: 2,
    image: "/user-flow/2.png",
    cards: {
      "connect-wallet": { visible: true, top: 0, height: USER_FLOW_CARD_COLLAPSED_HEIGHT },
      "earn-yield": { visible: true, top: 465, height: USER_FLOW_CARD_EXPANDED_HEIGHT },
      "deposit-funds": { visible: true, top: 130, height: USER_FLOW_CARD_EXPANDED_HEIGHT },
      "allocate-yield": { visible: false, top: USER_FLOW_CARD_HIDDEN_Y, height: USER_FLOW_CARD_EXPANDED_HEIGHT },
    },
  },
  {
    id: 3,
    image: "/user-flow/3.png",
    cards: {
      "connect-wallet": { visible: true, top: 0, height: USER_FLOW_CARD_COLLAPSED_HEIGHT },
      "earn-yield": { visible: true, top: 82, height: USER_FLOW_CARD_EXPANDED_HEIGHT },
      "deposit-funds": { visible: true, top: 0, height: USER_FLOW_CARD_COLLAPSED_HEIGHT },
      "allocate-yield": { visible: true, top: 465, height: USER_FLOW_CARD_EXPANDED_HEIGHT },
    },
  },
  {
    id: 4,
    image: "/user-flow/4.png",
    cards: {
      "connect-wallet": { visible: true, top: 0, height: USER_FLOW_CARD_COLLAPSED_HEIGHT },
      "earn-yield": { visible: true, top: 76, height: USER_FLOW_CARD_COLLAPSED_HEIGHT },
      "deposit-funds": { visible: true, top: 0, height: USER_FLOW_CARD_COLLAPSED_HEIGHT },
      "allocate-yield": { visible: true, top: 84, height: USER_FLOW_CARD_EXPANDED_HEIGHT },
    },
  },
  {
    id: 5,
    image: "/user-flow/4.png",
    cards: {
      "connect-wallet": { visible: true, top: 0, height: USER_FLOW_CARD_COLLAPSED_HEIGHT },
      "earn-yield": { visible: true, top: 76, height: USER_FLOW_CARD_COLLAPSED_HEIGHT },
      "deposit-funds": { visible: true, top: 0, height: USER_FLOW_CARD_COLLAPSED_HEIGHT },
      "allocate-yield": { visible: true, top: 76, height: USER_FLOW_CARD_COLLAPSED_HEIGHT },
    },
  },
];
