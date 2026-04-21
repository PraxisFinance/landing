import type { ComponentType } from "react";

import { AboutProjectIcon } from "@/components/assets/about-project-icon";
import { BaseAppIcon } from "@/components/assets/base-app-icon";
import { BlogIcon } from "@/components/assets/blog-icon";
import { BrandAssetsIcon } from "@/components/assets/brand-assets-icon";
import { BugBountyIcon } from "@/components/assets/bug-bounty-icon";
import { ContactsIcon } from "@/components/assets/contacts-icon";
import { DocumentationIcon } from "@/components/assets/documentation-icon";
import { FaqIcon } from "@/components/assets/faq-icon";
import { RoadmapIcon } from "@/components/assets/roadmap-icon";
import { SecurityIcon } from "@/components/assets/security-icon";
import { TeamIcon } from "@/components/assets/team-icon";
import { WebAppIcon } from "@/components/assets/web-app-icon";

export type NavDropdownEntry = {
  href: string;
  title: string;
  description: string;
  Icon: ComponentType;
};

export type NavSection = {
  id: string;
  label: string;
  items: NavDropdownEntry[];
};

export type MobileNavEntry = {
  href: string;
  title: string;
  Icon: ComponentType;
};

export const navSections: NavSection[] = [
  {
    id: "about",
    label: "About",
    items: [
      {
        href: "#about",
        title: "About product",
        description: "What is Praxis and how it work",
        Icon: AboutProjectIcon,
      },
      {
        href: "#team-section",
        title: "Team",
        description: "Experts in DeFi and web3 Gaming.",
        Icon: TeamIcon,
      },
      {
        href: "#roadmap-section",
        title: "Roadmap",
        description: "Experts in DeFi and web3 Gaming.",
        Icon: RoadmapIcon,
      },
      {
        href: "#social-media-join",
        title: "Contacts",
        description: "Join the community.",
        Icon: ContactsIcon,
      },
    ],
  },
  {
    id: "products",
    label: "Products",
    items: [
      {
        href: "#social-media-join",
        title: "BaseApp",
        description: "Mobile application in BaseApp.",
        Icon: BaseAppIcon,
      },
      {
        href: "#social-media-join",
        title: "Web App (Soon)",
        description: "Full functionality available in your browser.",
        Icon: WebAppIcon,
      },
    ],
  },
  {
    id: "resources",
    label: "Resources",
    items: [
      {
        href: "#faqSection",
        title: "FAQ",
        description: "Answers to common questions.",
        Icon: FaqIcon,
      },
      {
        href: "#",
        title: "Blog (Soon)",
        description: "The latest news and updates.",
        Icon: BlogIcon,
      },
      {
        href: "#",
        title: "Brand Assets (Soon)",
        description: "Assets, examples and guides.",
        Icon: BrandAssetsIcon,
      },
    ],
  },
  {
    id: "development",
    label: "Development",
    items: [
      {
        href: "#",
        title: "Documentation (Soon)",
        description: "Architecture and more about product.",
        Icon: DocumentationIcon,
      },
      {
        href: "#",
        title: "Security (Soon)",
        description: "Audit reports and information.",
        Icon: SecurityIcon,
      },
      {
        href: "#",
        title: "Bug Bounty (Soon)",
        description: "Report responsibly and get rewarded.",
        Icon: BugBountyIcon,
      },
    ],
  },
];

export const mobileProductNavItems: MobileNavEntry[] = [
  {
    href: "#social-media-join",
    title: "BaseApp",
    Icon: BaseAppIcon,
  },
  {
    href: "#social-media-join",
    title: "Web App (Soon)",
    Icon: WebAppIcon,
  },
];

export const mobileSectionNavItems: MobileNavEntry[] = [
  {
    href: "#about",
    title: "About product",
    Icon: AboutProjectIcon,
  },
  {
    href: "#roadmap-section",
    title: "Roadmap",
    Icon: RoadmapIcon,
  },
  {
    href: "#team-section",
    title: "Team",
    Icon: TeamIcon,
  },
  {
    href: "#faqSection",
    title: "FAQ",
    Icon: FaqIcon,
  },
  {
    href: "#social-media-join",
    title: "Contacts",
    Icon: ContactsIcon,
  },
];
