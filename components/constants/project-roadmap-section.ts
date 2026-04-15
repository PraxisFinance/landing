import { cn } from "@/lib/utils";

export const PROJECT_ROADMAP_HEADLINE = "Project Roadmap" as const;

export const PROJECT_ROADMAP_CARD_STAGGER = 0.1;

export const PROJECT_ROADMAP_ITEMS = [
  {
    quarter: "Q1 2026",
    body: "MVP on BaseApp (Core vault, prediction flow)",
    value: 100,
    cardClass: "bg-brand-dark-green",
    badgeClass: "bg-white text-brand-dark-green",
    bodyClass: "text-white",
    progressClass: cn(
      "[&_[data-slot=progress-track]]:h-1.5 [&_[data-slot=progress-track]]:rounded-full [&_[data-slot=progress-track]]:bg-brand-gray/90",
      "[&_[data-slot=progress-indicator]]:rounded-full [&_[data-slot=progress-indicator]]:bg-brand-dark-green"
    ),
  },
  {
    quarter: "Q2 2026",
    body: "MVP launch (vaults, yield games, dashboards)",
    value: 45,
    cardClass: "bg-brand-dark-purple",
    badgeClass: "bg-white text-brand-dark-purple",
    bodyClass: "text-white",
    progressClass: cn(
      "[&_[data-slot=progress-track]]:h-1.5 [&_[data-slot=progress-track]]:rounded-full [&_[data-slot=progress-track]]:bg-brand-gray/90",
      "[&_[data-slot=progress-indicator]]:rounded-full [&_[data-slot=progress-indicator]]:bg-brand-dark-purple"
    ),
  },
  {
    quarter: "Q3 2026",
    body: "Prediction markets (sports, esports, finance)",
    value: 0,
    cardClass: "bg-brand-light-green",
    badgeClass: "bg-brand-black text-brand-light-green",
    bodyClass: "text-brand-black",
    progressClass: cn(
      "[&_[data-slot=progress-track]]:h-1.5 [&_[data-slot=progress-track]]:rounded-full [&_[data-slot=progress-track]]:bg-brand-gray/90",
      "[&_[data-slot=progress-indicator]]:rounded-full [&_[data-slot=progress-indicator]]:bg-brand-light-green"
    ),
  },
  {
    quarter: "Q4 2026",
    body: "Agent-based systems & ecosystem expansion",
    value: 0,
    cardClass: "bg-brand-light-purple",
    badgeClass: "bg-brand-black text-brand-light-purple",
    bodyClass: "text-brand-black",
    progressClass: cn(
      "[&_[data-slot=progress-track]]:h-1.5 [&_[data-slot=progress-track]]:rounded-full [&_[data-slot=progress-track]]:bg-brand-gray/90",
      "[&_[data-slot=progress-indicator]]:rounded-full [&_[data-slot=progress-indicator]]:bg-brand-light-purple"
    ),
  },
] as const;
