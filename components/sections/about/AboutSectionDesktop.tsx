"use client";

import { ABOUT_SECTION_HEADLINE } from "@/components/constants/about-section";
import { SECTION_TEXT_SIZES } from "@/components/constants/text-sizes";
import {
  ABOUT_CARDS_START_DELAY,
  AboutHeadlineWave,
} from "@/components/sections/about/about-section-shared";
import { AboutSectionCardsDesktop } from "@/components/sections/about/AboutSectionCardsDesktop";
import { cn } from "@/lib/utils";

type AboutSectionDesktopProps = {
  className?: string;
};

export function AboutSectionDesktop({ className }: AboutSectionDesktopProps) {
  const aboutTextSizes = SECTION_TEXT_SIZES.about;

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
            <AboutHeadlineWave
              text={ABOUT_SECTION_HEADLINE}
              className={cn("block w-full", aboutTextSizes.title.desktop)}
            />
          </h2>
        </div>

        <div className={cn("relative z-10", "mt-0 px-1 sm:-mt-20 sm:px-2 lg:-mt-28")}>
          <AboutSectionCardsDesktop
            titleTextSizeClassName={aboutTextSizes.cardTitle.desktop}
            bodyTextSizeClassName={aboutTextSizes.cardDescription.desktop}
            cardsStartDelay={ABOUT_CARDS_START_DELAY}
          />
        </div>
      </div>
    </section>
  );
}
