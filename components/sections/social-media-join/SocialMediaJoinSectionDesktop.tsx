"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

import {
  WaveRevealFadeUp,
  WaveRevealHeadlineLines,
  WaveRevealWords,
} from "@/components/motion/wave-reveal";
import {
  NEXT_IMAGE_SIZES_SMJ_MOBILE_CARD,
  NEXT_IMAGE_SIZES_SMJ_WEB_CARD,
} from "@/components/constants/next-image-sizes";
import {
  JOIN_GET_STARTED_CARDS,
  JOIN_GET_STARTED_COMMUNITY_DESCRIPTION,
  JOIN_GET_STARTED_COMMUNITY_LINKS,
  JOIN_GET_STARTED_COMMUNITY_TITLE,
  JOIN_GET_STARTED_IMAGE_ALT,
  JOIN_GET_STARTED_MOBILE_BUTTON_TEXT,
  JOIN_GET_STARTED_MOBILE_CARD_BG,
  JOIN_GET_STARTED_MOBILE_DESCRIPTION,
  JOIN_GET_STARTED_MOBILE_STATUS,
  JOIN_GET_STARTED_MOBILE_TITLE,
  JOIN_GET_STARTED_PRODUCT_BG_CIRCLE_COUNT_DESKTOP,
  JOIN_GET_STARTED_PRODUCT_BG_CIRCLE_PX_DESKTOP,
  JOIN_GET_STARTED_PRODUCT_CARD_MAX_W,
  JOIN_GET_STARTED_PRODUCT_CARD_MIN_H,
  JOIN_GET_STARTED_SECTION_TITLE,
  JOIN_GET_STARTED_WEB_CARD_BG,
  JOIN_GET_STARTED_WEB_DESCRIPTION,
  JOIN_GET_STARTED_WEB_STATUS,
  JOIN_GET_STARTED_WEB_TITLE,
} from "@/components/constants/join-get-started-section";
import {
  SMJ_CARD_FLOAT_DURATION,
  SMJ_CARD_FLOAT_EASE,
  SMJ_CARD_FLOAT_STAGGER,
  SMJ_CARDS_DELAY_BASE,
  SMJ_COMMUNITY_DESCRIPTION_DELAY,
  SMJ_COMMUNITY_LINKS_DELAY,
  SMJ_MOBILE_BUTTON_DELAY,
  SMJ_MOBILE_DESCRIPTION_DELAY,
  SMJ_WEB_DESCRIPTION_DELAY,
  type SocialMediaJoinTextClasses,
  scrollSocialMediaJoinToWaitlist,
  SocialMediaJoinWaveText,
} from "@/components/sections/social-media-join/social-media-join-section-shared";
import type { SocialMediaJoinSectionStateBag } from "@/components/sections/social-media-join/use-social-media-join-section";
import { SocialMediaCloudPanel } from "@/components/sections/social-media-join/SocialMediaCloudPanel";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const productCardLayoutStyle = {
  maxWidth: JOIN_GET_STARTED_PRODUCT_CARD_MAX_W,
  minHeight: JOIN_GET_STARTED_PRODUCT_CARD_MIN_H,
} as const;

const productDecorationClassName =
  "absolute top-1/2 right-0 grid shrink-0 -translate-y-1/2 grid-cols-3 grid-rows-2 gap-1.5 sm:gap-2 max-[1050px]:scale-[0.55] max-sm:scale-[0.38] max-sm:origin-right";

type SocialMediaJoinSectionDesktopProps = SocialMediaJoinSectionStateBag &
  SocialMediaJoinTextClasses & {
    className?: string;
  };

export function SocialMediaJoinSectionDesktop({
  className,
  sectionRef,
  sectionInView,
  sectionTitleClass,
  productCardTitleClass,
  productCardDescriptionClass,
  statusPillClass,
  communityCardTitleClass,
  communityCardDescriptionClass,
  productCtaButtonClass,
}: SocialMediaJoinSectionDesktopProps) {
  const productCircleCount = JOIN_GET_STARTED_PRODUCT_BG_CIRCLE_COUNT_DESKTOP;
  const productCirclePx = JOIN_GET_STARTED_PRODUCT_BG_CIRCLE_PX_DESKTOP;

  return (
    <section
      ref={sectionRef}
      id="social-media-join"
      className={cn(
        "mx-auto w-full max-w-screen-2xl px-4 pt-4 sm:px-6 sm:pt-5 lg:px-10 lg:pt-6",
        className
      )}
    >
      <div className="mx-auto w-full max-w-[min(100%,85rem)]">
        <h2 className="text-center text-brand-black">
          <SocialMediaJoinWaveText
            text={JOIN_GET_STARTED_SECTION_TITLE}
            className={cn(sectionTitleClass, "block text-center")}
          />
        </h2>

        <div className="mt-4 grid grid-cols-1 justify-items-center gap-3 md:mt-7 md:grid-cols-2 md:gap-4 lg:mt-8">
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 48 }}
            animate={sectionInView ? { opacity: 1, y: 0 } : undefined}
            transition={{
              duration: SMJ_CARD_FLOAT_DURATION,
              delay: SMJ_CARDS_DELAY_BASE,
              ease: SMJ_CARD_FLOAT_EASE,
            }}
          >
            <article
              className={cn(
                "relative w-full overflow-hidden rounded-3xl p-[15px] md:p-6 lg:p-8",
                "bg-[#9D94FF]"
              )}
              style={productCardLayoutStyle}
            >
              <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
                <div className={productDecorationClassName}>
                  {Array.from({ length: productCircleCount }, (_, i) => (
                    <div
                      key={i}
                      className="shrink-0 rounded-full bg-brand-light-purple/45 sm:bg-brand-light-purple/50"
                      style={{ width: productCirclePx, height: productCirclePx }}
                    />
                  ))}
                </div>
              </div>
              <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-[#7B72E8]/25 to-transparent" />

              <div className="absolute bottom-4 left-4 z-20 md:bottom-auto md:left-auto md:right-4 md:top-4 lg:right-5 lg:top-5">
                <span
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 leading-none text-brand-black shadow-sm ring-1 ring-black/[0.06]",
                    statusPillClass,
                    "font-medium"
                  )}
                >
                  <span className="font-normal" style={{ color: JOIN_GET_STARTED_WEB_CARD_BG }}>
                    {JOIN_GET_STARTED_WEB_STATUS.label}
                  </span>
                  <span
                    className="size-1 shrink-0 rounded-full"
                    style={{ backgroundColor: JOIN_GET_STARTED_WEB_CARD_BG }}
                    aria-hidden
                  />
                  <span style={{ color: JOIN_GET_STARTED_WEB_CARD_BG }}>
                    {JOIN_GET_STARTED_WEB_STATUS.text}
                  </span>
                </span>
              </div>

              <div className="pointer-events-none absolute bottom-0 right-0 z-[5] h-[13rem] w-[15.5rem] sm:h-[15rem] sm:w-[18.5rem] lg:h-[17rem] lg:w-[22rem]">
                <Image
                  src={JOIN_GET_STARTED_CARDS.web}
                  alt={JOIN_GET_STARTED_IMAGE_ALT.web}
                  fill
                  className="object-contain object-right object-bottom"
                  sizes={NEXT_IMAGE_SIZES_SMJ_WEB_CARD}
                />
              </div>

              <div className="relative z-10 max-w-[min(18rem,72%)]">
                <h3 className={cn(productCardTitleClass, "font-bold leading-tight text-white")}>
                  <WaveRevealHeadlineLines lines={[JOIN_GET_STARTED_WEB_TITLE]} />
                </h3>
                <WaveRevealWords
                  text={JOIN_GET_STARTED_WEB_DESCRIPTION}
                  delayStart={SMJ_WEB_DESCRIPTION_DELAY}
                  className={cn("mt-1 text-white/95", productCardDescriptionClass)}
                />
              </div>
            </article>
          </motion.div>

          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 48 }}
            animate={sectionInView ? { opacity: 1, y: 0 } : undefined}
            transition={{
              duration: SMJ_CARD_FLOAT_DURATION,
              delay: SMJ_CARDS_DELAY_BASE + SMJ_CARD_FLOAT_STAGGER,
              ease: SMJ_CARD_FLOAT_EASE,
            }}
          >
            <article
              className={cn(
                "relative w-full overflow-hidden rounded-3xl p-[15px] md:p-6 lg:p-8",
                "bg-[#0B5350]"
              )}
              style={productCardLayoutStyle}
            >
              <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
                <div className={productDecorationClassName}>
                  {Array.from({ length: productCircleCount }, (_, i) => (
                    <div
                      key={i}
                      className="shrink-0 rounded-full bg-[#00614D]"
                      style={{ width: productCirclePx, height: productCirclePx }}
                    />
                  ))}
                </div>
              </div>
              <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-black/18 to-transparent" />

              <div className="absolute bottom-4 left-4 z-20 md:bottom-auto md:left-auto md:right-4 md:top-4 lg:right-5 lg:top-5">
                <span
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 leading-none text-brand-black shadow-sm ring-1 ring-black/[0.06]",
                    statusPillClass,
                    "font-medium"
                  )}
                >
                  <span className="font-normal" style={{ color: JOIN_GET_STARTED_MOBILE_CARD_BG }}>
                    {JOIN_GET_STARTED_MOBILE_STATUS.label}
                  </span>
                  <span
                    className="size-1 shrink-0 rounded-full"
                    style={{ backgroundColor: JOIN_GET_STARTED_MOBILE_CARD_BG }}
                    aria-hidden
                  />
                  <span style={{ color: JOIN_GET_STARTED_MOBILE_CARD_BG }}>
                    {JOIN_GET_STARTED_MOBILE_STATUS.text}
                  </span>
                </span>
              </div>

              <div className="pointer-events-none absolute bottom-0 right-0 z-[5] h-[14rem] w-[min(100%,40rem)] sm:h-[17rem] sm:w-[min(100%,44rem)] lg:h-[19rem] lg:w-[min(100%,48rem)]">
                <div className="relative h-full w-full max-md:flex max-md:items-end max-md:justify-end">
                  <div className="relative h-full w-full max-md:h-[98%] max-md:w-[min(96%,21.5rem)] max-md:shrink-0 max-md:-mr-20 max-md:min-w-0">
                    <Image
                      src={JOIN_GET_STARTED_CARDS.mobile}
                      alt={JOIN_GET_STARTED_IMAGE_ALT.mobile}
                      fill
                      className="object-contain object-[right_bottom]"
                      sizes={NEXT_IMAGE_SIZES_SMJ_MOBILE_CARD}
                    />
                  </div>
                </div>
              </div>

              <div className="relative z-10 flex max-w-[18rem] flex-col items-start">
                <div>
                  <h3 className={cn(productCardTitleClass, "font-bold leading-tight text-white")}>
                    <WaveRevealHeadlineLines lines={[JOIN_GET_STARTED_MOBILE_TITLE]} />
                  </h3>
                  <WaveRevealWords
                    text={JOIN_GET_STARTED_MOBILE_DESCRIPTION}
                    delayStart={SMJ_MOBILE_DESCRIPTION_DELAY}
                    className={cn("mt-1 text-white/95", productCardDescriptionClass)}
                  />
                </div>

                <WaveRevealFadeUp delay={SMJ_MOBILE_BUTTON_DELAY}>
                  <Link
                    href="#"
                    onClick={(event) => {
                      event.preventDefault();
                      scrollSocialMediaJoinToWaitlist();
                    }}
                    className={cn(
                      "mt-4 inline-flex h-10 items-center gap-2 rounded-sm bg-white px-4 text-brand-black",
                      productCtaButtonClass,
                      "font-semibold transition hover:bg-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70"
                    )}
                  >
                    {JOIN_GET_STARTED_MOBILE_BUTTON_TEXT}
                    <ArrowRight className="size-4" strokeWidth={2} aria-hidden />
                  </Link>
                </WaveRevealFadeUp>
              </div>
            </article>
          </motion.div>

          <motion.div
            className="w-full md:col-span-2"
            initial={{ opacity: 0, y: 48 }}
            animate={sectionInView ? { opacity: 1, y: 0 } : undefined}
            transition={{
              duration: SMJ_CARD_FLOAT_DURATION,
              delay: SMJ_CARDS_DELAY_BASE + SMJ_CARD_FLOAT_STAGGER * 2,
              ease: SMJ_CARD_FLOAT_EASE,
            }}
          >
            <article
              className={cn(
                "relative w-full min-h-[18rem] justify-self-stretch overflow-hidden rounded-3xl bg-brand-gray",
                "max-md:rounded-b-none",
                "sm:min-h-[20rem] lg:min-h-[24rem]"
              )}
            >
              <div className="grid min-h-0 grid-cols-1 items-stretch gap-6 p-[15px] max-md:gap-0 md:gap-8 md:px-8 md:py-10 lg:grid-cols-2 lg:gap-8 lg:px-10 lg:py-12">
                <div className="flex h-full min-h-0 min-w-0 flex-col max-md:items-center max-md:text-center">
                  <h3
                    className={cn(
                      communityCardTitleClass,
                      "w-full font-bold leading-[0.96] tracking-tight text-brand-black max-md:text-balance"
                    )}
                  >
                    <WaveRevealHeadlineLines lines={[JOIN_GET_STARTED_COMMUNITY_TITLE]} />
                  </h3>
                  <WaveRevealWords
                    text={JOIN_GET_STARTED_COMMUNITY_DESCRIPTION}
                    delayStart={SMJ_COMMUNITY_DESCRIPTION_DELAY}
                    className={cn(
                      "mt-4 w-full leading-relaxed text-brand-black/75 sm:mt-5 max-md:text-balance max-md:text-center",
                      communityCardDescriptionClass
                    )}
                  />

                  <WaveRevealFadeUp
                    delay={SMJ_COMMUNITY_LINKS_DELAY}
                    className={cn(
                      "flex w-full max-w-[288px] flex-wrap gap-2 max-md:max-w-none",
                      "max-md:mx-auto max-md:mt-6 max-md:flex-col max-md:items-stretch max-md:pt-0",
                      "md:mt-6 md:flex-row md:flex-wrap md:items-center md:pt-6 lg:mt-auto lg:pt-7"
                    )}
                  >
                    {JOIN_GET_STARTED_COMMUNITY_LINKS.map((item) => {
                      const isTwitter = item.label === "Twitter";
                      return (
                        <Button
                          key={item.label}
                          type="button"
                          variant="landing-dark-purple"
                          size="default"
                          disabled={!isTwitter}
                          onClick={
                            isTwitter
                              ? () => window.open(item.href, "_blank", "noopener,noreferrer")
                              : undefined
                          }
                          className={cn(
                            "h-10 w-full gap-2 rounded-lg px-3 text-xs font-semibold md:w-[140px]",
                            !isTwitter &&
                              "cursor-not-allowed bg-brand-dark-purple/45 text-white/70 hover:bg-brand-dark-purple/45"
                          )}
                          aria-label={item.label}
                        >
                          <item.icon className="size-[1.125rem] shrink-0" aria-hidden />
                          <span className="truncate">{item.label}</span>
                        </Button>
                      );
                    })}
                  </WaveRevealFadeUp>
                </div>

                <SocialMediaCloudPanel
                  links={JOIN_GET_STARTED_COMMUNITY_LINKS}
                  revealDelay={SMJ_COMMUNITY_LINKS_DELAY}
                  className="max-md:mt-0 max-md:min-w-0 max-md:self-stretch"
                />
              </div>
            </article>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
