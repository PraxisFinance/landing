export const LANDING_FOOTER_GROUPS = [
  {
    title: "About",
    links: ["About product", "Team", "Roadmap", "Contacts"],
    legal: "Terms & Conditions",
  },
  {
    title: "Products",
    links: ["Web dApp", "Mobile App", "Praxis token", "Governance"],
    legal: "Privacy Politics",
  },
  {
    title: "Resources",
    links: ["FAQ", "Blog", "Brand Assets"],
    legal: "Whitepaper",
  },
  {
    title: "Development",
    links: ["Documentation", "Security", "Bug bounty"],
    legal: "Risk Management",
  },
] as const;

/** Bottom row on mobile only (no Whitepaper); desktop keeps per-column `legal` in groups. */
export const LANDING_FOOTER_MOBILE_BOTTOM_LEGAL = [
  "Terms & Conditions",
  "Privacy Politics",
  "Risk Management",
] as const;

export const LANDING_FOOTER_HOME_ARIA_LABEL = "Praxis, home";

export const LANDING_FOOTER_SOCIAL_LINKS = [
  { href: "#", ariaLabel: "Praxis on X", kind: "x" },
  { href: "#", ariaLabel: "Praxis on Telegram", kind: "telegram" },
  { href: "#", ariaLabel: "Praxis on Discord", kind: "discord" },
] as const;
