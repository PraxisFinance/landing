"use client";

import { ArrowRightIcon } from "lucide-react";
import { motion } from "framer-motion";

import {
  COVER_SECTION_BG,
  COVER_SECTION_HEADLINE_LINES,
  COVER_SECTION_SUBHEAD_COPY,
  COVER_SECTION_WAITLIST_BUTTON_TEXT,
} from "@/components/constants/cover-section";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CoverSectionProps = {
  className?: string;
};

const WAVE_STAGGER = 0.045;
const WAVE_ITEM_DURATION = 0.48;
const WAVE_LINE_DELAY = 0.34;
const HEADLINE_START_DELAY = 0.08;

const headlineMaxWordsPerLine = Math.max(
  ...COVER_SECTION_HEADLINE_LINES.map((line) => line.trim().split(/\s+/).length)
);
const headlineLineDuration = (headlineMaxWordsPerLine - 1) * WAVE_STAGGER + WAVE_ITEM_DURATION;
const headlineTotalDuration =
  headlineLineDuration + (COVER_SECTION_HEADLINE_LINES.length - 1) * WAVE_LINE_DELAY;
const subheadStartDelay = HEADLINE_START_DELAY + headlineTotalDuration + 0.12;

const backgroundReveal = {
  hidden: { opacity: 0, y: 46, scale: 1.04 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, delay: 0.55 },
  },
};

function WaveText({
  text,
  className,
  startDelay = 0,
}: {
  text: string;
  className: string;
  startDelay?: number;
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
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: WAVE_ITEM_DURATION,
                delay: startDelay + lineIndex * WAVE_LINE_DELAY + wordIndex * WAVE_STAGGER,
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

export function CoverSection({ className }: CoverSectionProps) {
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
      className={cn(
        "mx-auto w-full max-w-screen-2xl px-4 pb-2 pt-6 sm:px-6 sm:pb-3 sm:pt-8 lg:px-10 lg:pt-10",
        className
      )}
    >
      <div
        className={cn(
          "relative min-h-[28rem] overflow-hidden rounded-[2rem] sm:min-h-[32rem] sm:rounded-[2.25rem] md:min-h-[36rem] lg:min-h-[40rem]"
        )}
      >
        <motion.div
          aria-hidden
          className="absolute inset-0 z-0 bg-cover bg-bottom bg-no-repeat pointer-events-none select-none"
          style={{ backgroundImage: `url(${COVER_SECTION_BG})` }}
          variants={backgroundReveal}
          initial="hidden"
          animate="visible"
        />

        <div
          aria-hidden
          className={cn(
            "absolute inset-0 z-[1] bg-gradient-to-b from-transparent to-brand-light-purple",
            "pointer-events-none"
          )}
        />

        <div className="relative z-10 flex flex-col items-center px-5 pb-16 pt-7 text-center sm:px-8 sm:pb-20 sm:pt-9 md:pb-24 md:pt-10 lg:pt-12">
          <h1 className="max-w-5xl text-balance text-brand-black">
            <WaveText
              text={COVER_SECTION_HEADLINE_LINES.join("\n")}
              className="ui-headline-3 whitespace-pre-line"
              startDelay={HEADLINE_START_DELAY}
            />
          </h1>

          <WaveText
            text={COVER_SECTION_SUBHEAD_COPY}
            className="ui-text-3 mt-[15px] max-w-xl whitespace-pre-line text-brand-black"
            startDelay={subheadStartDelay}
          />

          <motion.div
            className="mt-[15px]"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: subheadStartDelay + 0.35 }}
          >
            <Button
              type="button"
              onClick={scrollToWaitlist}
              size="lg"
              className={cn(
                "h-12 gap-2 rounded-xl px-8 text-base font-semibold shadow-none",
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
