"use client";

import { motion } from "framer-motion";
import {
  FIRST_PREDICTION_CARDS,
  FIRST_PREDICTION_HEADLINE,
} from "@/components/constants/first-prediction-section";
import { FirstPredictionCard } from "@/components/sections/FirstPredictionCard";
import { cn } from "@/lib/utils";

type FirstPredictionSectionProps = {
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

const headlineLines = FIRST_PREDICTION_HEADLINE.split("\n");
const headlineMaxWordsPerLine = Math.max(
  ...headlineLines.map((line) => line.trim().split(/\s+/).length)
);
const headlineLineDuration = (headlineMaxWordsPerLine - 1) * WAVE_STAGGER + WAVE_ITEM_DURATION;
const headlineTotalDuration = headlineLineDuration + (headlineLines.length - 1) * 0.32;
const cardsStartDelay = headlineTotalDuration + 0.12;

const cardVariants = {
  hidden: (index: number) => ({
    opacity: 1,
    x: `${21 - 82 * index}%`,
    y: 0,
    scale: 1 - index * 0.02,
  }),
  visible: (index: number) => ({
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.42,
      delay: cardsStartDelay + index * CARD_STAGGER,
    },
  }),
};

export function FirstPredictionSection({ className }: FirstPredictionSectionProps) {
  return (
    <section
      id="first-prediction"
      className={cn(
        "mx-auto w-full max-w-screen-2xl px-4 pb-8 pt-4 sm:px-6 sm:pb-10 sm:pt-6 lg:px-10 lg:pb-12 lg:pt-8",
        className
      )}
    >
      <div className="relative isolate flex flex-col gap-12 sm:gap-16 lg:gap-20">
        <div className="relative z-0 w-full px-1 sm:px-2">
          <h2 className="w-full text-left text-brand-black">
            <HeadlineWave text={FIRST_PREDICTION_HEADLINE} className="ui-headline-1 block w-full" />
          </h2>
        </div>

        <motion.div
          className={cn(
            "relative z-10 flex flex-wrap justify-end gap-4 sm:gap-5",
            "-mt-16 px-1 sm:-mt-20 sm:px-2 lg:-mt-28"
          )}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.7 }}
        >
          {FIRST_PREDICTION_CARDS.map((card, index) => (
            <motion.div
              key={card.title}
              custom={index}
              variants={cardVariants}
              style={{ zIndex: FIRST_PREDICTION_CARDS.length - index }}
            >
              <FirstPredictionCard {...card} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
