"use client";

import Link from "next/link";

import { LogoIcon } from "@/components/assets/logo-icon";
import {
  LANDING_FOOTER_GROUPS,
  LANDING_FOOTER_HOME_ARIA_LABEL,
  LANDING_FOOTER_MOBILE_BOTTOM_LEGAL,
  LANDING_FOOTER_SOCIAL_LINKS,
} from "@/components/constants/landing-footer";
import {
  handleLandingFooterAnchorClick,
  LANDING_FOOTER_LINK_TARGETS,
  LANDING_FOOTER_SOCIAL_ICON_COMPONENTS,
} from "@/components/sections/footer/landing-footer-shared";
import { cn } from "@/lib/utils";

/** Single footer DOM — spacing/layout toggle via Tailwind `max-md:` / `md:` (matches chrome breakpoints). */
export function LandingFooter() {
  return (
    <footer className="mt-auto flex flex-col bg-brand-white lg:min-h-0 lg:flex-1">
      <div className="mx-auto flex w-full max-w-screen-2xl flex-1 flex-col px-0 md:px-[20px] sm:px-6 lg:min-h-0 lg:px-10">
        <div
          className={cn(
            "flex flex-col rounded-t-[2rem] bg-brand-gray/90",
            "p-[20px] md:p-[50px] md:pb-[20px]",
            "lg:min-h-[416px] lg:flex-1"
          )}
        >
          <div
            className={cn(
              "grid flex-1 grid-cols-1 gap-0 lg:min-h-0 lg:grid-cols-[minmax(0,240px)_1fr]",
              "lg:items-stretch lg:gap-x-12 lg:gap-y-10"
            )}
          >
            <div className="space-y-[30px] lg:space-y-6">
              <Link
                href="/"
                className="inline-flex text-brand-black"
                aria-label={LANDING_FOOTER_HOME_ARIA_LABEL}
              >
                <LogoIcon className="h-10 w-auto" aria-hidden />
              </Link>

              <div className="flex items-center gap-2">
                {LANDING_FOOTER_SOCIAL_LINKS.map((item) => {
                  const Icon = LANDING_FOOTER_SOCIAL_ICON_COMPONENTS[item.kind];

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
              className={cn(
                "grid w-full min-w-0 grid-cols-2 gap-x-8 sm:grid-cols-4 sm:gap-x-10 lg:gap-x-12",
                "mt-[30px] content-start items-start gap-y-[30px]",
                "md:mt-0 md:h-full md:auto-rows-fr md:gap-y-10 md:content-stretch"
              )}
            >
              {LANDING_FOOTER_GROUPS.map((group) => (
                <div key={group.title} className="flex min-h-0 min-w-0 flex-col gap-2.5 md:h-full">
                  <h3 className="text-sm font-bold text-brand-black">{group.title}</h3>
                  <ul className="space-y-1 text-sm text-brand-black/75">
                    {group.links.map((link) => {
                      const targetHref = LANDING_FOOTER_LINK_TARGETS[link];
                      const isLinkActive = Boolean(targetHref && targetHref !== "#");

                      return (
                        <li key={link}>
                          {isLinkActive ? (
                            <Link
                              href={targetHref}
                              onClick={handleLandingFooterAnchorClick}
                              className="transition hover:text-brand-black"
                            >
                              {link}
                            </Link>
                          ) : (
                            <span className="cursor-default opacity-50">{link}</span>
                          )}
                        </li>
                      );
                    })}
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
                "col-span-full mt-[50px] flex flex-wrap items-center justify-between gap-x-4 gap-y-3 border-t border-brand-gray/80 pt-5",
                "md:hidden"
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
