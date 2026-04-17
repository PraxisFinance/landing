import Link from "next/link";

import { LogoIcon } from "@/components/assets/logo-icon";
import { SocialDiscordIcon } from "@/components/assets/social-discord-icon";
import { SocialTelegramIcon } from "@/components/assets/social-telegram-icon";
import { SocialXIcon } from "@/components/assets/social-x-icon";
import {
  LANDING_FOOTER_GROUPS,
  LANDING_FOOTER_HOME_ARIA_LABEL,
  LANDING_FOOTER_SOCIAL_LINKS,
} from "@/components/constants/landing-footer";
import { cn } from "@/lib/utils";

export function LandingFooter() {
  const socialIcons = {
    x: SocialXIcon,
    telegram: SocialTelegramIcon,
    discord: SocialDiscordIcon,
  } as const;

  return (
    <footer className="bg-brand-white">
      <div className="mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-10">
        <div
          className={cn(
            "rounded-t-[2rem] bg-brand-gray/90",
            "p-[50px] pb-[20px]",
            "lg:flex lg:min-h-[416px] lg:flex-col"
          )}
        >
          <div className="grid h-full flex-1 gap-10 lg:grid-cols-[minmax(0,240px)_1fr] lg:items-stretch lg:gap-12">
            <div className="space-y-6">
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
              className="grid h-full auto-rows-fr grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4 sm:gap-x-10 lg:gap-x-12"
            >
              {LANDING_FOOTER_GROUPS.map((group) => (
                <div key={group.title} className="flex h-full min-h-0 flex-col gap-2.5">
                  <h3 className="text-sm font-bold text-brand-black">{group.title}</h3>
                  <ul className="space-y-1 text-sm text-brand-black/75">
                    {group.links.map((link) => (
                      <li key={link}>
                        <Link href="#" className="transition hover:text-brand-black">
                          {link}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto border-t border-brand-gray/80 pt-4">
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
          </div>
        </div>
      </div>
    </footer>
  );
}
