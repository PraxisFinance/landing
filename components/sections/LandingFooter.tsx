import Link from "next/link";

import { LogoIcon } from "@/components/assets/logo-icon";
import { SocialDiscordIcon } from "@/components/assets/social-discord-icon";
import { SocialTelegramIcon } from "@/components/assets/social-telegram-icon";
import { SocialXIcon } from "@/components/assets/social-x-icon";
import { cn } from "@/lib/utils";

const footerGroups = [
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

export function LandingFooter() {
  return (
    <footer className="bg-brand-white pb-5">
      <div className="mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-10">
        <div
          className={cn(
            "rounded-t-[2rem] bg-brand-gray/90",
            "p-[50px]",
            "lg:min-h-[416px]"
          )}
        >
          <div className="grid gap-10 lg:h-full lg:grid-cols-[minmax(0,240px)_1fr] lg:gap-12">
            <div className="space-y-6">
              <Link href="/" className="inline-flex text-brand-black" aria-label="Praxis, home">
                <LogoIcon className="h-10 w-auto" aria-hidden />
              </Link>

              <div className="flex items-center gap-2">
                <Link
                  href="#"
                  aria-label="Praxis on X"
                  className="inline-flex size-9 items-center justify-center rounded-lg bg-brand-dark-purple transition hover:bg-brand-dark-purple/90"
                >
                  <SocialXIcon className="size-5" aria-hidden />
                </Link>
                <Link
                  href="#"
                  aria-label="Praxis on Telegram"
                  className="inline-flex size-9 items-center justify-center rounded-lg bg-brand-dark-purple transition hover:bg-brand-dark-purple/90"
                >
                  <SocialTelegramIcon className="size-5" aria-hidden />
                </Link>
                <Link
                  href="#"
                  aria-label="Praxis on Discord"
                  className="inline-flex size-9 items-center justify-center rounded-lg bg-brand-dark-purple transition hover:bg-brand-dark-purple/90"
                >
                  <SocialDiscordIcon className="size-5" aria-hidden />
                </Link>
              </div>
            </div>

            <nav
              aria-label="Footer navigation"
              className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4 sm:gap-x-10 lg:h-full lg:gap-x-12"
            >
              {footerGroups.map((group) => (
                <div key={group.title} className="flex min-h-0 flex-col gap-2.5 lg:h-full">
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
