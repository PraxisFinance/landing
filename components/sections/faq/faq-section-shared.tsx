"use client";

import { motion } from "framer-motion";

import { FREQUENCY_QUESTIONS_HEADLINE } from "@/components/constants/frequency-questions-section";
import { landingLenientMotionViewport } from "@/components/motion/lenient-in-view";
import { waveRevealTiming } from "@/components/motion/wave-reveal";

export type FAQSectionTextClasses = {
  titleTextClass: string;
  questionTextClass: string;
  answerTextClass: string;
};

export const FAQ_WAVE_STAGGER = 0.045;
export const FAQ_WAVE_ITEM_DURATION = 0.48;
export const FAQ_WAVE_LINE_DELAY = 0.34;

export const INITIAL_VISIBLE_FAQ_ITEMS = 6;

const headlineWordCount = FREQUENCY_QUESTIONS_HEADLINE.trim().split(/\s+/).length;

export const FAQ_CONTENT_DELAY_BASE =
  waveRevealTiming.initialDelay +
  headlineWordCount * waveRevealTiming.wordStagger +
  waveRevealTiming.wordDuration * 0.3;

export function FAQSectionWaveText({
  text,
  className,
}: {
  text: string;
  className: string;
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
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={landingLenientMotionViewport}
              transition={{
                duration: FAQ_WAVE_ITEM_DURATION,
                delay: lineIndex * FAQ_WAVE_LINE_DELAY + wordIndex * FAQ_WAVE_STAGGER,
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
