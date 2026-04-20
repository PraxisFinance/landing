import type { TeamSocialLink } from "@/components/sections/team/team-social-links";

export type ExpertEntry = {
  name: string;
  role: string;
  image: string;
  bio: string;
  socials?: TeamSocialLink[];
};

export const EXPERTS_SECTION_HEADLINE = "Experts in DeFi Product Development" as const;

export const EXPERTS_SECTION_AUTO_ADVANCE_MS = 3000;

export const EXPERTS_SECTION_ITEMS: ExpertEntry[] = [
  {
    name: "Alex Ivlev",
    role: "Co-founder, CEO",
    image: "/team/alex-ivlev.png",
    bio: "Sets product direction and partnerships, bringing years of experience scaling DeFi teams and go-to-market.",
    socials: [
      { label: "X (Twitter)", href: "https://x.com/ivlevspace", kind: "x" },
      { label: "Telegram", href: "https://t.me/SpaceBanana", kind: "telegram" },
    ],
  },
  {
    name: "Mizori Shirouki",
    role: "Co-founder, CPO",
    image: "/team/mizori-shirouki.png",
    bio: "Product, marketing, and design. DeFi and gaming background with focus on UX and growth.",
    socials: [
      { label: "X (Twitter)", href: "https://x.com/AlexScherbatyuk", kind: "x" },
      { label: "Telegram", href: "https://t.me/@AlexScherbatyuk", kind: "telegram" },
    ],
  },
  {
    name: "Alexander Scherbatuk",
    role: "Backend & Smart Contracts",
    image: "/team/alex-sherbatuk.png",
    bio: "Architects on-chain logic and backend services with a focus on security, gas efficiency, and reliability.",
    socials: [
      { label: "X (Twitter)", href: "https://x.com/Scherbatuk", kind: "x" },
      { label: "Telegram", href: "https://t.me/Scherbatuk", kind: "telegram" },
    ],
  },
  {
    name: "Anton Solover",
    role: "Content & Community Lead",
    image: "/team/anton-solover.png",
    bio: "Owns narrative, community programs, and ecosystem communications across channels.",
    socials: [
      { label: "X (Twitter)", href: "https://x.com/Anthony_Solover", kind: "x" },
      { label: "Telegram", href: "https://t.me/@FOS085", kind: "telegram" },
    ],
  },
  {
    name: "Ivan Kireev",
    role: "Frontend Engineer",
    image: "/team/ivan-kireev.png",
    bio: "Builds fast, accessible interfaces and design systems for the Praxis web experience.",
    socials: [{ label: "Telegram", href: "https://t.me/sm4chnik", kind: "telegram" }],
  },
];
