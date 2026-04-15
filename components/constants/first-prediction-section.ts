export const FIRST_PREDICTION_HEADLINE =
  "Praxis — the first prediction market where you trade outcomes with yield, not principal" as const;

export const FIRST_PREDICTION_CARDS = [
  {
    title: "Safer by design",
    body: "Bet with yield — keep your principal in the vault. You can only lose allocated yield.",
    backgroundImage: "/main/safer-card.png",
    fallbackClassName: "bg-brand-gray",
    titleClassName: "text-brand-black",
    bodyClassName: "text-brand-black",
  },
  {
    title: "All-in-one dashboard",
    body: "Deposits, yield, predictions, and events — in one view. Track your vault balance, available yield, open predictions, and upcoming matches.",
    backgroundImage: "/main/all-in-one-dashboard-card.png",
    fallbackClassName: "bg-brand-dark-purple",
    titleClassName: "text-white",
    bodyClassName: "text-white",
  },
  {
    title: "On-chain security",
    body: "Transparent markets and payouts. Smart contracts manage positions and settlement on-chain.",
    backgroundImage: "/main/on-chain-security-card.png",
    fallbackClassName: "bg-brand-light-green",
    titleClassName: "text-brand-black",
    bodyClassName: "text-brand-black",
  },
] as const;
