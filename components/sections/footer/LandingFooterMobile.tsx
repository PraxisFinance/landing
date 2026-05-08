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

export function LandingFooterMobile() {
  return (
    <footer className="bg-brand-white">
      <div className="mx-auto w-full max-w-screen-2xl px-0">
        <div className="rounded-t-[2rem] bg-brand-gray/90 p-[20px]">
          <div className="flex flex-col gap-0">
            <div className="space-y-[30px]">
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
              className="mt-[30px] grid w-full min-w-0 grid-cols-2 content-start items-start gap-x-8 gap-y-[30px] sm:grid-cols-4 sm:gap-x-10"
            >
              {LANDING_FOOTER_GROUPS.map((group) => (
                <div key={group.title} className="flex min-h-0 min-w-0 flex-col gap-2.5">
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
                </div>
              ))}
            </nav>

            <div className="mt-[50px] flex flex-wrap items-center justify-between gap-x-4 gap-y-3 border-t border-brand-gray/80 pt-5">
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
