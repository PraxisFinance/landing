"use client";

import { motion } from "framer-motion";

import { ABOUT_SECTION_HEADLINE } from "@/components/constants/about-section";
import { SECTION_TEXT_SIZES } from "@/components/constants/text-sizes";
import { useIsMobile } from "@/components/providers/mobile-context";
import { AboutSectionCardsDesktop } from "@/components/sections/about/AboutSectionCardsDesktop";
import { AboutSectionCardsMobile } from "@/components/sections/about/AboutSectionCardsMobile";
import { cn } from "@/lib/utils";

type AboutSectionProps = {
  className?: string;
};

const WAVE_STAGGER = 0.045;
const WAVE_ITEM_DURATION = 0.48;
const CARD_STAGGER = 0.11;

function HeadlineWave({ text, className }: { text: string; className: string }) {
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
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{
                duration: WAVE_ITEM_DURATION,
                delay: lineIndex * 0.32 + wordIndex * WAVE_STAGGER,
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

const headlineLines = ABOUT_SECTION_HEADLINE.split("\n");
const headlineMaxWordsPerLine = Math.max(
  ...headlineLines.map((line) => line.trim().split(/\s+/).length)
);
const headlineLineDuration = (headlineMaxWordsPerLine - 1) * WAVE_STAGGER + WAVE_ITEM_DURATION;
const headlineTotalDuration = headlineLineDuration + (headlineLines.length - 1) * 0.32;
/** Pull card start earlier vs headline-end estimate so there is no dead gap after the headline wave. */
const CARDS_ANIMATION_EARLIER_BY_SEC = 0.52;
const cardsStartDelay = Math.max(0.04, headlineTotalDuration - CARDS_ANIMATION_EARLIER_BY_SEC);

export function AboutSection({ className }: AboutSectionProps) {
  const isMobile = useIsMobile();

  const aboutTextSizes = SECTION_TEXT_SIZES.about;
  const cardTitleTextSizeClassName = isMobile
    ? aboutTextSizes.cardTitle.mobile
    : aboutTextSizes.cardTitle.desktop;
  const cardDescriptionTextSizeClassName = isMobile
    ? aboutTextSizes.cardDescription.mobile
    : aboutTextSizes.cardDescription.desktop;

  return (
    <section
      id="about"
      className={cn(
        "mx-auto w-full max-w-screen-2xl px-4 pb-8 pt-4 sm:px-6 sm:pb-10 sm:pt-6 lg:px-10 lg:pb-12 lg:pt-8",
        className
      )}
    >
      <div className="relative isolate flex flex-col gap-2 sm:gap-4 lg:gap-20">
        <div className="relative z-0 w-full px-1 sm:px-2">
          <h2 className="w-full text-left text-brand-black">
            <HeadlineWave
              text={ABOUT_SECTION_HEADLINE}
              className={cn(
                "block w-full",
                isMobile ? aboutTextSizes.title.mobile : aboutTextSizes.title.desktop
              )}
            />
          </h2>
        </div>

        <div className={cn("relative z-10", "mt-0 px-1 sm:-mt-20 sm:px-2 lg:-mt-28")}>
          <AboutSectionCardsMobile
            titleTextSizeClassName={cardTitleTextSizeClassName}
            bodyTextSizeClassName={cardDescriptionTextSizeClassName}
          />

          <AboutSectionCardsDesktop
            titleTextSizeClassName={cardTitleTextSizeClassName}
            bodyTextSizeClassName={cardDescriptionTextSizeClassName}
            cardsStartDelay={cardsStartDelay}
          />
        </div>
      </div>
    </section>
  );
}
