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
  },
  {
    name: "Mizori Shirouki",
    role: "Co-founder, CPO",
    image: "/team/mizori-shirouki.png",
    bio: "Product, marketing, and design. DeFi and gaming background with focus on UX and growth.",
    socials: [
      { label: "X (Twitter)", href: "#", kind: "x" },
      { label: "Telegram", href: "#", kind: "telegram" },
      { label: "Discord", href: "#", kind: "discord" },
    ],
  },
  {
    name: "Alexander Scherbatuk",
    role: "Backend & Smart Contracts",
    image: "/team/alex-sherbatuk.png",
    bio: "Architects on-chain logic and backend services with a focus on security, gas efficiency, and reliability.",
  },
  {
    name: "Anton Solover",
    role: "Content & Community Lead",
    image: "/team/anton-solover.png",
    bio: "Owns narrative, community programs, and ecosystem communications across channels.",
  },
  {
    name: "Ivan Kireev",
    role: "Frontend Engineer",
    image: "/team/ivan-kireev.png",
    bio: "Builds fast, accessible interfaces and design systems for the Praxis web experience.",
  },
];
