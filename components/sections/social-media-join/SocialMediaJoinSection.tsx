"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion, useInView } from "framer-motion";

import { WaveRevealFadeUp, WaveRevealHeadlineLines, WaveRevealWords, waveRevealTiming } from "@/components/motion/wave-reveal";
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
  JOIN_GET_STARTED_PRODUCT_BG_CIRCLE_COUNT,
  JOIN_GET_STARTED_PRODUCT_BG_CIRCLE_PX,
  JOIN_GET_STARTED_PRODUCT_CARD_MAX_W,
  JOIN_GET_STARTED_PRODUCT_CARD_MIN_H,
  JOIN_GET_STARTED_SECTION_TITLE,
  JOIN_GET_STARTED_WEB_CARD_BG,
  JOIN_GET_STARTED_WEB_DESCRIPTION,
  JOIN_GET_STARTED_WEB_STATUS,
  JOIN_GET_STARTED_WEB_TITLE,
} from "@/components/constants/join-get-started-section";
import { SocialMediaCloudPanel } from "@/components/sections/social-media-join/SocialMediaCloudPanel";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SocialMediaJoinSectionProps = {
  className?: string;
};

const WAVE_STAGGER = 0.045;
const WAVE_ITEM_DURATION = 0.48;
const WAVE_LINE_DELAY = 0.34;
const CARD_FLOAT_DURATION = 1.25;
const CARD_FLOAT_STAGGER = 0.42;
const CARD_FLOAT_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const webTitleWordCount = JOIN_GET_STARTED_WEB_TITLE.trim().split(/\s+/).length;
const sectionTitleWordCount = JOIN_GET_STARTED_SECTION_TITLE.trim().split(/\s+/).length;
const cardsDelayBase =
  waveRevealTiming.initialDelay +
  sectionTitleWordCount * waveRevealTiming.wordStagger +
  waveRevealTiming.wordDuration * 0.25;

const webDescriptionDelay =
  waveRevealTiming.initialDelay +
  webTitleWordCount * waveRevealTiming.wordStagger +
  waveRevealTiming.wordDuration * 0.2;

const mobileTitleWordCount = JOIN_GET_STARTED_MOBILE_TITLE.trim().split(/\s+/).length;
const mobileDescriptionWordCount = JOIN_GET_STARTED_MOBILE_DESCRIPTION.trim().split(/\s+/).length;
const mobileDescriptionDelay =
  waveRevealTiming.initialDelay +
  mobileTitleWordCount * waveRevealTiming.wordStagger +
  waveRevealTiming.wordDuration * 0.2;
const mobileButtonDelay =
  mobileDescriptionDelay +
  mobileDescriptionWordCount * waveRevealTiming.wordStagger +
  waveRevealTiming.wordDuration * 0.2;

const communityTitleWordCount = JOIN_GET_STARTED_COMMUNITY_TITLE.trim().split(/\s+/).length;
const communityDescriptionWordCount = JOIN_GET_STARTED_COMMUNITY_DESCRIPTION.trim().split(/\s+/).length;
const communityDescriptionDelay =
  waveRevealTiming.initialDelay +
  communityTitleWordCount * waveRevealTiming.wordStagger +
  waveRevealTiming.wordDuration * 0.2;
const communityLinksDelay =
  communityDescriptionDelay +
  communityDescriptionWordCount * waveRevealTiming.wordStagger +
  waveRevealTiming.wordDuration * 0.15;

function WaveText({
  text,
  className,
  start,
}: {
  text: string;
  className: string;
  start: boolean;
}) {
  const lines = text.split("\n");

  return (
    <div className={className}>
      {lines.map((line, lineIndex) => (
        <div key={`${line}-${lineIndex}`} className="block">
          {line.split(" ").map((word, wordIndex) => (
            <motion.span
              key={`${word}-${wordIndex}`}
              className="mr-[0.3em] inline-block"
              initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
              animate={start ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
              transition={{
                duration: WAVE_ITEM_DURATION,
                delay: lineIndex * WAVE_LINE_DELAY + wordIndex * WAVE_STAGGER,
              }}
            >
              {word}
            </motion.span>
          ))}
        </div>
      ))}
    </div>
  );
}

export function SocialMediaJoinSection({ className }: SocialMediaJoinSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const sectionInView = useInView(sectionRef, { once: true, amount: 0.35 });
  const scrollToWaitlist = () => {
    const waitlistSection = document.getElementById("join-waitlist");
    if (!waitlistSection) {
      return;
    }

    waitlistSection.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest",
    });
  };

  return (
    <section
      ref={sectionRef}
      id="social-media-join"
      className={cn(
        "mx-auto w-full max-w-screen-2xl px-4 pb-8 pt-4 sm:px-6 sm:pb-10 sm:pt-5 lg:px-10 lg:pb-12 lg:pt-6",
        className
      )}
    >
      <div className="mx-auto w-full max-w-[min(100%,85rem)]">
        <h2 className="text-center text-brand-black">
          <WaveText
            text={JOIN_GET_STARTED_SECTION_TITLE}
            className="ui-headline-1 block text-center"
            start={sectionInView}
          />
        </h2>

        <div className="mt-6 grid justify-items-center gap-3 sm:mt-7 sm:grid-cols-2 sm:gap-4 lg:mt-8">
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 48 }}
            animate={sectionInView ? { opacity: 1, y: 0 } : undefined}
            transition={{
              duration: CARD_FLOAT_DURATION,
              delay: cardsDelayBase,
              ease: CARD_FLOAT_EASE,
            }}
          >
            <article
              className={cn("relative w-full overflow-hidden rounded-3xl p-6 sm:p-8", "bg-[#9D94FF]")}
              style={{ maxWidth: JOIN_GET_STARTED_PRODUCT_CARD_MAX_W, minHeight: JOIN_GET_STARTED_PRODUCT_CARD_MIN_H }}
            >
              <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
                <div
                  className={cn(
                    "absolute right-0 top-1/2 grid shrink-0 -translate-y-1/2 grid-cols-3 grid-rows-2 gap-1.5 sm:gap-2",
                    "max-[1050px]:scale-[0.55] max-sm:scale-[0.38] max-sm:origin-right"
                  )}
                >
                  {Array.from({ length: JOIN_GET_STARTED_PRODUCT_BG_CIRCLE_COUNT }, (_, i) => (
                    <div
                      key={i}
                      className="shrink-0 rounded-full bg-brand-light-purple/45 sm:bg-brand-light-purple/50"
                      style={{ width: JOIN_GET_STARTED_PRODUCT_BG_CIRCLE_PX, height: JOIN_GET_STARTED_PRODUCT_BG_CIRCLE_PX }}
                    />
                  ))}
                </div>
              </div>
              <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-[#7B72E8]/25 to-transparent" />

              <div className="absolute right-4 top-4 z-20 sm:right-5 sm:top-5">
                <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[0.6875rem] font-medium leading-none text-brand-black shadow-sm ring-1 ring-black/[0.06] sm:text-xs">
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
                  sizes="(max-width: 768px) min(100vw, 710px), 420px"
                />
              </div>

              <div className="relative z-10 max-w-[min(18rem,72%)]">
                <h3 className="text-xl font-bold leading-tight text-white sm:text-2xl">
                  <WaveRevealHeadlineLines lines={[JOIN_GET_STARTED_WEB_TITLE]} />
                </h3>
                <WaveRevealWords
                  text={JOIN_GET_STARTED_WEB_DESCRIPTION}
                  delayStart={webDescriptionDelay}
                  className="mt-1 text-sm text-white/95 sm:text-base"
                />
              </div>
            </article>
          </motion.div>

          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 48 }}
            animate={sectionInView ? { opacity: 1, y: 0 } : undefined}
            transition={{
              duration: CARD_FLOAT_DURATION,
              delay: cardsDelayBase + CARD_FLOAT_STAGGER,
              ease: CARD_FLOAT_EASE,
            }}
          >
            <article
              className={cn("relative w-full overflow-hidden rounded-3xl p-6 sm:p-8", "bg-[#0B5350]")}
              style={{ maxWidth: JOIN_GET_STARTED_PRODUCT_CARD_MAX_W, minHeight: JOIN_GET_STARTED_PRODUCT_CARD_MIN_H }}
            >
              <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
                <div
                  className={cn(
                    "absolute right-0 top-1/2 grid shrink-0 -translate-y-1/2 grid-cols-3 grid-rows-2 gap-1.5 sm:gap-2",
                    "max-[1050px]:scale-[0.55] max-sm:scale-[0.38] max-sm:origin-right"
                  )}
                >
                  {Array.from({ length: JOIN_GET_STARTED_PRODUCT_BG_CIRCLE_COUNT }, (_, i) => (
                    <div
                      key={i}
                      className="shrink-0 rounded-full bg-[#00614D]"
                      style={{ width: JOIN_GET_STARTED_PRODUCT_BG_CIRCLE_PX, height: JOIN_GET_STARTED_PRODUCT_BG_CIRCLE_PX }}
                    />
                  ))}
                </div>
              </div>
              <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-black/18 to-transparent" />

              <div className="absolute right-4 top-4 z-20 sm:right-5 sm:top-5">
                <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[0.6875rem] font-medium leading-none text-brand-black shadow-sm ring-1 ring-black/[0.06] sm:text-xs">
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
                <div className="relative h-full w-full">
                  <Image
                    src={JOIN_GET_STARTED_CARDS.mobile}
                    alt={JOIN_GET_STARTED_IMAGE_ALT.mobile}
                    fill
                    className="object-contain object-bottom object-right"
                    sizes="(max-width: 768px) min(100vw, 710px), 480px"
                  />
                </div>
              </div>

              <div className="relative z-10 flex max-w-[18rem] flex-col items-start">
                <div>
                  <h3 className="text-xl font-bold leading-tight text-white sm:text-2xl">
                    <WaveRevealHeadlineLines lines={[JOIN_GET_STARTED_MOBILE_TITLE]} />
                  </h3>
                  <WaveRevealWords
                    text={JOIN_GET_STARTED_MOBILE_DESCRIPTION}
                    delayStart={mobileDescriptionDelay}
                    className="mt-1 text-sm text-white/95 sm:text-base"
                  />
                </div>

                <WaveRevealFadeUp delay={mobileButtonDelay}>
                  <Link
                    href="#"
                    onClick={(event) => {
                      event.preventDefault();
                      scrollToWaitlist();
                    }}
                    className={cn(
                      "mt-4 inline-flex h-10 items-center gap-2 rounded-sm bg-white px-4 text-sm font-semibold text-brand-black",
                      "transition hover:bg-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70"
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
            className="w-full sm:col-span-2"
            initial={{ opacity: 0, y: 48 }}
            animate={sectionInView ? { opacity: 1, y: 0 } : undefined}
            transition={{
              duration: CARD_FLOAT_DURATION,
              delay: cardsDelayBase + CARD_FLOAT_STAGGER * 2,
              ease: CARD_FLOAT_EASE,
            }}
          >
            <article
              className={cn(
                "relative w-full min-h-[18rem] justify-self-stretch overflow-hidden rounded-3xl bg-brand-gray",
                "sm:min-h-[20rem] lg:min-h-[24rem]"
              )}
            >
              <div className="grid min-h-0 grid-cols-1 items-stretch gap-8 px-6 py-8 sm:gap-10 sm:px-8 sm:py-10 lg:grid-cols-2 lg:gap-8 lg:px-10 lg:py-12">
                <div className="flex h-full min-h-0 min-w-0 flex-col">
                  <h3 className="text-[clamp(1.8rem,4vw,4rem)] font-bold leading-[0.96] tracking-tight text-brand-black">
                    <WaveRevealHeadlineLines lines={[JOIN_GET_STARTED_COMMUNITY_TITLE]} />
                  </h3>
                  <WaveRevealWords
                    text={JOIN_GET_STARTED_COMMUNITY_DESCRIPTION}
                    delayStart={communityDescriptionDelay}
                    className="mt-4 text-sm leading-relaxed text-brand-black/75 sm:mt-5 sm:text-base"
                  />

                  <WaveRevealFadeUp
                    delay={communityLinksDelay}
                    className="mt-6 flex w-full max-w-[288px] flex-wrap gap-2 sm:mt-7"
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
                            "h-10 w-[140px] gap-2 rounded-lg px-3 text-xs font-semibold",
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
                  revealDelay={communityLinksDelay}
                />
              </div>
            </article>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
