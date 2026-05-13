"use client";

import { motion } from "framer-motion";

import { ABOUT_SECTION_HEADLINE } from "@/components/constants/about-section";
import { landingLenientMotionViewport } from "@/components/motion/lenient-in-view";

export const ABOUT_WAVE_STAGGER = 0.045;
export const ABOUT_WAVE_ITEM_DURATION = 0.48;

const headlineLines = ABOUT_SECTION_HEADLINE.split("\n");
const headlineMaxWordsPerLine = Math.max(
  ...headlineLines.map((line) => line.trim().split(/\s+/).length)
);
const headlineLineDuration =
  (headlineMaxWordsPerLine - 1) * ABOUT_WAVE_STAGGER + ABOUT_WAVE_ITEM_DURATION;
const headlineTotalDuration = headlineLineDuration + (headlineLines.length - 1) * 0.32;

/** Pull card start earlier vs headline-end estimate so there is no dead gap after the headline wave. */
const CARDS_ANIMATION_EARLIER_BY_SEC = 0.52;

export const ABOUT_CARDS_START_DELAY = Math.max(
  0.04,
  headlineTotalDuration - CARDS_ANIMATION_EARLIER_BY_SEC
);

export function AboutHeadlineWave({ text, className }: { text: string; className: string }) {
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
              viewport={landingLenientMotionViewport}
              transition={{
                duration: ABOUT_WAVE_ITEM_DURATION,
                delay: lineIndex * 0.32 + wordIndex * ABOUT_WAVE_STAGGER,
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
