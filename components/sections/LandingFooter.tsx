"use client";

import type { MouseEventHandler } from "react";
import Link from "next/link";

import { LogoIcon } from "@/components/assets/logo-icon";
import { SocialDiscordIcon } from "@/components/assets/social-discord-icon";
import { SocialTelegramIcon } from "@/components/assets/social-telegram-icon";
import { SocialXIcon } from "@/components/assets/social-x-icon";
import {
  LANDING_FOOTER_GROUPS,
  LANDING_FOOTER_HOME_ARIA_LABEL,
  LANDING_FOOTER_MOBILE_BOTTOM_LEGAL,
  LANDING_FOOTER_SOCIAL_LINKS,
} from "@/components/constants/landing-footer";
import { cn } from "@/lib/utils";

export function LandingFooter() {
  const footerLinkTargets: Record<string, string> = {
    "About product": "#about",
    Team: "#team-section",
    Roadmap: "#roadmap-section",
    Contacts: "#social-media-join",
    FAQ: "#faqSection",
    "Web dApp": "#social-media-join",
    "Mobile App": "#social-media-join",
  };

  const handleAnchorClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
    const href = event.currentTarget.getAttribute("href");
    if (!href || !href.startsWith("#") || href === "#") {
      return;
    }

    const targetId = href.slice(1);
    const targetElement = document.getElementById(targetId);
    if (!targetElement) {
      return;
    }

    event.preventDefault();
    targetElement.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest",
    });
  };

  const socialIcons = {
    x: SocialXIcon,
    telegram: SocialTelegramIcon,
    discord: SocialDiscordIcon,
  } as const;

  return (
    <footer className="bg-brand-white">
      <div className="mx-auto w-full max-w-screen-2xl px-[20px] sm:px-6 lg:px-10">
        <div
          className={cn(
            "rounded-t-[2rem] bg-brand-gray/90",
            "p-[20px] md:p-[50px] md:pb-[20px]",
            "lg:flex lg:min-h-[416px] lg:flex-col"
          )}
        >
          <div className="grid h-full flex-1 max-md:gap-0 gap-10 lg:grid-cols-[minmax(0,240px)_1fr] lg:items-stretch lg:gap-12">
            <div className="space-y-6 max-md:space-y-[30px]">
              <Link
                href="/"
                className="inline-flex text-brand-black"
                aria-label={LANDING_FOOTER_HOME_ARIA_LABEL}
              >
                <LogoIcon className="h-10 w-auto" aria-hidden />
              </Link>

              <div className="flex items-center gap-2">
                {LANDING_FOOTER_SOCIAL_LINKS.map((item) => {
                  const Icon = socialIcons[item.kind];

                  return (
                    <Link
                      key={item.ariaLabel}
                      href={item.href}
                      aria-label={item.ariaLabel}
                      className="inline-flex size-9 items-center justify-center rounded-lg bg-brand-dark-purple transition hover:bg-brand-dark-purple/90"
                    >
                      <Icon className="size-5" aria-hidden />
                    </Link>
                  );
                })}
              </div>
            </div>

            <nav
              aria-label="Footer navigation"
              className="grid h-full auto-rows-fr grid-cols-2 gap-x-8 gap-y-10 max-md:mt-[30px] max-md:gap-y-[30px] sm:grid-cols-4 sm:gap-x-10 lg:gap-x-12"
            >
              {LANDING_FOOTER_GROUPS.map((group) => (
                <div key={group.title} className="flex h-full min-h-0 flex-col gap-2.5">
                  <h3 className="text-sm font-bold text-brand-black">{group.title}</h3>
                  <ul className="space-y-1 text-sm text-brand-black/75">
                    {group.links.map((link) => (
                      <li key={link}>
                        <Link
                          href={footerLinkTargets[link] ?? "#"}
                          onClick={handleAnchorClick}
                          className="transition hover:text-brand-black"
                        >
                          {link}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto hidden border-t border-brand-gray/80 pt-4 md:block">
                    <Link
                      href="#"
                      className="text-xs font-medium text-brand-black/75 transition hover:text-brand-black"
                    >
                      {group.legal}
                    </Link>
                  </div>
                </div>
              ))}
            </nav>

            <div
              className={cn(
                "flex flex-wrap items-center justify-between gap-x-4 gap-y-3 border-t border-brand-gray/80 pt-5",
                "max-md:mt-[50px] md:hidden"
              )}
            >
              {LANDING_FOOTER_MOBILE_BOTTOM_LEGAL.map((label) => (
                <Link
                  key={label}
                  href="#"
                  className="text-xs font-medium text-brand-black/75 transition hover:text-brand-black"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
