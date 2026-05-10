"use client";

import { ArrowRightIcon } from "lucide-react";
import { motion } from "framer-motion";

import {
  COVER_SECTION_BG_MOBILE,
  COVER_SECTION_HEADLINE_LINES,
  COVER_SECTION_SUBHEAD_COPY,
  COVER_SECTION_WAITLIST_BUTTON_TEXT,
} from "@/components/constants/cover-section";
import { SECTION_TEXT_SIZES } from "@/components/constants/text-sizes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import {
  COVER_HEADLINE_START_DELAY,
  COVER_SUBHEAD_START_DELAY,
  CoverWaveText,
  coverBackgroundReveal,
  scrollCoverToWaitlist,
} from "@/components/sections/cover/cover-section-shared";

type CoverSectionMobileProps = {
  className?: string;
};

export function CoverSectionMobile({ className }: CoverSectionMobileProps) {
  const coverTextSizes = SECTION_TEXT_SIZES.cover;

  return (
    <section id="cover" className={cn("w-full px-0 pb-2 pt-6 sm:pb-3 sm:pt-8 lg:pt-10", className)}>
      <div className="relative min-h-[515px] overflow-hidden rounded-[2rem] sm:rounded-[2.25rem] md:min-h-[36rem] lg:min-h-[40rem]">
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -right-6 bottom-0 -left-6 z-[1] h-[210px] bg-bottom bg-[length:100%_210px] bg-no-repeat select-none"
          style={{ backgroundImage: `url(${COVER_SECTION_BG_MOBILE})` }}
          variants={coverBackgroundReveal}
          initial="hidden"
          animate="visible"
        />

        <div
          aria-hidden
          className={cn(
            "absolute inset-0 z-0 bg-gradient-to-b from-transparent to-brand-light-purple",
            "pointer-events-none"
          )}
        />

        <div className="relative z-10 flex min-h-[515px] -translate-y-8 flex-col items-center justify-center px-5 text-center sm:min-h-[32rem] sm:px-8 md:min-h-[36rem] lg:min-h-[40rem]">
          <h1 className="max-w-5xl text-balance text-brand-black">
            <CoverWaveText
              text={COVER_SECTION_HEADLINE_LINES.join("\n")}
              className={cn("whitespace-pre-line", coverTextSizes.title.mobile)}
              startDelay={COVER_HEADLINE_START_DELAY}
            />
          </h1>

          <CoverWaveText
            text={COVER_SECTION_SUBHEAD_COPY}
            className={cn(
              "mt-[15px] max-w-xl whitespace-pre-line text-brand-black",
              coverTextSizes.description.mobile
            )}
            startDelay={COVER_SUBHEAD_START_DELAY}
          />

          <motion.div
            className="mt-[15px] w-full px-[10px] sm:w-auto sm:px-0"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: COVER_SUBHEAD_START_DELAY + 0.35 }}
          >
            <Button
              type="button"
              onClick={scrollCoverToWaitlist}
              size="lg"
              className={cn(
                "ui-text-8 h-12 w-full gap-2 rounded-xl px-8 shadow-none sm:w-auto",
                "bg-brand-black text-white hover:bg-brand-black/90",
                "focus-visible:ring-brand-dark-purple/40"
              )}
            >
              {COVER_SECTION_WAITLIST_BUTTON_TEXT}
              <ArrowRightIcon className="size-4 shrink-0" strokeWidth={1.75} aria-hidden />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
