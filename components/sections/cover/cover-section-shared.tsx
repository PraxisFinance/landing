"use client";

import { motion } from "framer-motion";

import { COVER_SECTION_HEADLINE_LINES } from "@/components/constants/cover-section";

export const COVER_WAVE_STAGGER = 0.045;
export const COVER_WAVE_ITEM_DURATION = 0.48;
export const COVER_WAVE_LINE_DELAY = 0.34;
export const COVER_HEADLINE_START_DELAY = 0.08;

const headlineMaxWordsPerLine = Math.max(
  ...COVER_SECTION_HEADLINE_LINES.map((line) => line.trim().split(/\s+/).length)
);
const headlineLineDuration =
  (headlineMaxWordsPerLine - 1) * COVER_WAVE_STAGGER + COVER_WAVE_ITEM_DURATION;
const headlineTotalDuration =
  headlineLineDuration + (COVER_SECTION_HEADLINE_LINES.length - 1) * COVER_WAVE_LINE_DELAY;

export const COVER_SUBHEAD_START_DELAY =
  COVER_HEADLINE_START_DELAY + headlineTotalDuration + 0.12;

export const coverBackgroundReveal = {
  hidden: { opacity: 0, y: 46, scale: 1.04 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, delay: 0.55 },
  },
};

export function scrollCoverToWaitlist() {
  const waitlistSection = document.getElementById("join-waitlist");
  if (!waitlistSection) {
    return;
  }
  waitlistSection.scrollIntoView({
    behavior: "smooth",
    block: "center",
    inline: "nearest",
  });
}

export function CoverWaveText({
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
                duration: COVER_WAVE_ITEM_DURATION,
                delay:
                  startDelay + lineIndex * COVER_WAVE_LINE_DELAY + wordIndex * COVER_WAVE_STAGGER,
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
