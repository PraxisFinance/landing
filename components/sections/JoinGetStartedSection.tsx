import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { RedditIcon } from "@/components/assets/reddit-icon";
import { SocialDiscordIcon } from "@/components/assets/social-discord-icon";
import { SocialTelegramIcon } from "@/components/assets/social-telegram-icon";
import { SocialXIcon } from "@/components/assets/social-x-icon";
import { cn } from "@/lib/utils";

const GET_STARTED_CARDS = {
  web: "/main/join-web.png",
  mobile: "/main/join-mobile.png",
  community: "/main/join-social-media.png",
} as const;

const WEB_CARD_BG = "#9D94FF";
const MOBILE_CARD_BG = "#0B5350";

/** Background pattern: 3×2 circles (same idea as Join Waitlist, smaller for product cards) */
const PRODUCT_BG_CIRCLE_PX = 145;
const PRODUCT_BG_CIRCLE_COUNT = 6;

/** Top product cards: design width / min height */
const PRODUCT_CARD_MAX_W = 710;
/** Room for larger hero images + copy (mobile card) */
const PRODUCT_CARD_MIN_H = 310;

type JoinGetStartedSectionProps = {
  className?: string;
};

const communityLinks = [
  { label: "Twitter", href: "#", icon: SocialXIcon },
  { label: "Discord", href: "#", icon: SocialDiscordIcon },
  { label: "Telegram", href: "#", icon: SocialTelegramIcon },
  { label: "Reddit", href: "#", icon: RedditIcon },
] as const;

export function JoinGetStartedSection({ className }: JoinGetStartedSectionProps) {
  return (
    <section
      id="get-started"
      className={cn(
        "mx-auto w-full max-w-screen-2xl px-4 pb-8 pt-4 sm:px-6 sm:pb-10 sm:pt-5 lg:px-10 lg:pb-12 lg:pt-6",
        className
      )}
    >
      <div className="mx-auto w-full max-w-[min(100%,85rem)]">
        <h2 className="text-center text-[clamp(1.9rem,6.2vw,5.4rem)] font-bold leading-[1.03] tracking-tight text-brand-black">
          Join Praxis to get started
        </h2>

        <div className="mt-6 grid justify-items-center gap-3 sm:mt-7 sm:grid-cols-2 sm:gap-4 lg:mt-8">
          <article
            className={cn("relative w-full overflow-hidden rounded-3xl p-6 sm:p-8", "bg-[#9D94FF]")}
            style={{ maxWidth: PRODUCT_CARD_MAX_W, minHeight: PRODUCT_CARD_MIN_H }}
          >
            <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
              <div
                className={cn(
                  "absolute right-0 top-1/2 grid shrink-0 -translate-y-1/2 grid-cols-3 grid-rows-2 gap-1.5 sm:gap-2",
                  "max-[1050px]:scale-[0.55] max-sm:scale-[0.38] max-sm:origin-right"
                )}
              >
                {Array.from({ length: PRODUCT_BG_CIRCLE_COUNT }, (_, i) => (
                  <div
                    key={i}
                    className="shrink-0 rounded-full bg-brand-light-purple/45 sm:bg-brand-light-purple/50"
                    style={{ width: PRODUCT_BG_CIRCLE_PX, height: PRODUCT_BG_CIRCLE_PX }}
                  />
                ))}
              </div>
            </div>
            <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-[#7B72E8]/25 to-transparent" />

            <div className="absolute right-4 top-4 z-20 sm:right-5 sm:top-5">
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[0.6875rem] font-medium leading-none text-brand-black shadow-sm ring-1 ring-black/[0.06] sm:text-xs">
                <span className="font-normal" style={{ color: WEB_CARD_BG }}>
                  MVP
                </span>
                <span
                  className="size-1 shrink-0 rounded-full"
                  style={{ backgroundColor: WEB_CARD_BG }}
                  aria-hidden
                />
                <span style={{ color: WEB_CARD_BG }}>In development</span>
              </span>
            </div>

            <div className="pointer-events-none absolute bottom-0 right-0 z-[5] h-[13rem] w-[15.5rem] sm:h-[15rem] sm:w-[18.5rem] lg:h-[17rem] lg:w-[22rem]">
              <Image
                src={GET_STARTED_CARDS.web}
                alt="Praxis Web"
                fill
                className="object-contain object-right object-bottom"
                sizes="(max-width: 768px) min(100vw, 710px), 420px"
              />
            </div>

            <div className="relative z-10 max-w-[min(18rem,72%)]">
              <h3 className="text-xl font-bold leading-tight text-white sm:text-2xl">Praxis Web</h3>
              <p className="mt-1 text-sm text-white/95 sm:text-base">
                Full functionality available in your browser.
              </p>
            </div>
          </article>

          <article
            className={cn("relative w-full overflow-hidden rounded-3xl p-6 sm:p-8", "bg-[#0B5350]")}
            style={{ maxWidth: PRODUCT_CARD_MAX_W, minHeight: PRODUCT_CARD_MIN_H }}
          >
            <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
              <div
                className={cn(
                  "absolute right-0 top-1/2 grid shrink-0 -translate-y-1/2 grid-cols-3 grid-rows-2 gap-1.5 sm:gap-2",
                  "max-[1050px]:scale-[0.55] max-sm:scale-[0.38] max-sm:origin-right"
                )}
              >
                {Array.from({ length: PRODUCT_BG_CIRCLE_COUNT }, (_, i) => (
                  <div
                    key={i}
                    className="shrink-0 rounded-full bg-[#00614D]"
                    style={{ width: PRODUCT_BG_CIRCLE_PX, height: PRODUCT_BG_CIRCLE_PX }}
                  />
                ))}
              </div>
            </div>
            <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-black/18 to-transparent" />

            <div className="absolute right-4 top-4 z-20 sm:right-5 sm:top-5">
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[0.6875rem] font-medium leading-none text-brand-black shadow-sm ring-1 ring-black/[0.06] sm:text-xs">
                <span className="font-normal" style={{ color: MOBILE_CARD_BG }}>
                  MVP
                </span>
                <span
                  className="size-1 shrink-0 rounded-full"
                  style={{ backgroundColor: MOBILE_CARD_BG }}
                  aria-hidden
                />
                <span style={{ color: MOBILE_CARD_BG }}>Waitlist opened</span>
              </span>
            </div>

            <div className="pointer-events-none absolute bottom-0 right-0 z-[5] h-[14rem] w-[min(100%,40rem)] sm:h-[17rem] sm:w-[min(100%,44rem)] lg:h-[19rem] lg:w-[min(100%,48rem)]">
              <div className="relative h-full w-full">
                <Image
                  src={GET_STARTED_CARDS.mobile}
                  alt="Praxis for Mobile"
                  fill
                  className="object-contain object-bottom object-right"
                  sizes="(max-width: 768px) min(100vw, 710px), 480px"
                />
              </div>
            </div>

            <div className="relative z-10 flex max-w-[18rem] flex-col items-start">
              <div>
                <h3 className="text-xl font-bold leading-tight text-white sm:text-2xl">
                  Praxis for Mobile
                </h3>
                <p className="mt-1 text-sm text-white/95 sm:text-base">
                  Mobile application in BaseApp.
                </p>
              </div>

              <Link
                href="#"
                className={cn(
                  "mt-4 inline-flex h-10 items-center gap-2 rounded-sm bg-white px-4 text-sm font-semibold text-brand-black",
                  "transition hover:bg-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70"
                )}
              >
                Get early access
                <ArrowRight className="size-4" strokeWidth={2} aria-hidden />
              </Link>
            </div>
          </article>

          <article
            className={cn(
              "relative w-full min-h-[18rem] justify-self-stretch overflow-hidden rounded-3xl bg-brand-gray sm:col-span-2",
              "sm:min-h-[20rem] lg:min-h-[24rem]"
            )}
          >
            <div className="grid min-h-0 grid-cols-1 items-stretch gap-8 px-6 py-8 sm:gap-10 sm:px-8 sm:py-10 lg:grid-cols-2 lg:gap-8 lg:px-10 lg:py-12">
              <div className="flex h-full min-h-0 min-w-0 flex-col">
                <h3 className="text-[clamp(1.8rem,4vw,4rem)] font-bold leading-[0.96] tracking-tight text-brand-black">
                  Join the Praxis community
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-brand-black/75 sm:mt-5 sm:text-base">
                  Here you will find protocol news, updates on upcoming and live esport events, and
                  guides on how to yield, earn, and predict efficiently.
                </p>

                <div className="mt-6 flex w-full max-w-[288px] flex-wrap gap-2 sm:mt-7">
                  {communityLinks.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={cn(
                        "inline-flex h-10 w-[140px] shrink-0 items-center justify-center gap-2 rounded-lg px-3 text-xs font-semibold",
                        "bg-brand-dark-purple text-white transition hover:bg-brand-dark-purple/90",
                        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark-purple/40"
                      )}
                    >
                      <item.icon className="size-[1.125rem] shrink-0" aria-hidden />
                      <span className="truncate">{item.label}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="relative h-full min-h-[14rem] w-full lg:min-h-[min(20rem,45vh)]">
                <Image
                  src={GET_STARTED_CARDS.community}
                  alt="Discord, Telegram, X, and Reddit"
                  fill
                  className="object-contain object-center lg:object-left"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
