"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ABOUT_SECTION_CARDS,
  ABOUT_SECTION_HEADLINE,
} from "@/components/constants/about-section";
import { FirstPredictionCard } from "@/components/sections/FirstPredictionCard";
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
const cardsStartDelay = headlineTotalDuration + 0.12;

type CardTarget = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type CardStackOffset = {
  x: number;
  y: number;
  scale: number;
};

type AnimatedCardCustom = {
  index: number;
  stackOffset: CardStackOffset;
};

const cardVariants = {
  hidden: ({ stackOffset }: AnimatedCardCustom) => ({
    opacity: 1,
    x: stackOffset.x,
    y: stackOffset.y,
    scale: stackOffset.scale,
  }),
  visible: ({ index }: AnimatedCardCustom) => ({
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      duration: 0.58,
      delay: cardsStartDelay + index * CARD_STAGGER,
      stiffness: 110,
      damping: 22,
      mass: 0.85,
    },
  }),
};

export function AboutSection({ className }: AboutSectionProps) {
  const measureCardsRef = useRef<Array<HTMLDivElement | null>>([]);
  const [cardTargets, setCardTargets] = useState<CardTarget[]>([]);

  useLayoutEffect(() => {
    const measure = () => {
      const nodes = measureCardsRef.current.filter(Boolean) as HTMLDivElement[];
      if (nodes.length !== ABOUT_SECTION_CARDS.length) return;

      const parentRect = nodes[0].parentElement?.getBoundingClientRect();
      if (!parentRect) return;

      const nextTargets = nodes.map((node) => {
        const rect = node.getBoundingClientRect();
        return {
          x: rect.left - parentRect.left,
          y: rect.top - parentRect.top,
          width: rect.width,
          height: rect.height,
        };
      });

      setCardTargets(nextTargets);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const stackOffsets: CardStackOffset[] =
    cardTargets.length === ABOUT_SECTION_CARDS.length
      ? (() => {
          const first = cardTargets[0];
          const stackAnchorX = first.x + first.width * 0.33;
          const stackAnchorY = first.y;

          return cardTargets.map((target, index) => ({
            x: stackAnchorX - target.x + index * 18,
            y: stackAnchorY - target.y,
            scale: 1 - index * 0.02,
          }));
        })()
      : [];

  const cardsHeight =
    cardTargets.length === ABOUT_SECTION_CARDS.length
      ? Math.max(...cardTargets.map((target) => target.y + target.height))
      : 0;

  return (
    <section
      id="about"
      className={cn(
        "mx-auto w-full max-w-screen-2xl px-4 pb-8 pt-4 sm:px-6 sm:pb-10 sm:pt-6 lg:px-10 lg:pb-12 lg:pt-8",
        className
      )}
    >
      <div className="relative isolate flex flex-col gap-12 sm:gap-16 lg:gap-20">
        <div className="relative z-0 w-full px-1 sm:px-2">
          <h2 className="w-full text-left text-brand-black">
            <HeadlineWave text={ABOUT_SECTION_HEADLINE} className="ui-headline-1 block w-full" />
          </h2>
        </div>

        <div
          className={cn(
            "relative z-10",
            "-mt-16 px-1 sm:-mt-20 sm:px-2 lg:-mt-28"
          )}
        >
          <div className="invisible flex flex-wrap justify-end gap-4 sm:gap-5" aria-hidden>
            {ABOUT_SECTION_CARDS.map((card, index) => (
              <div
                key={`measure-${card.title}`}
                ref={(node) => {
                  measureCardsRef.current[index] = node;
                }}
              >
                <FirstPredictionCard {...card} />
              </div>
            ))}
          </div>

          {cardTargets.length === ABOUT_SECTION_CARDS.length && (
            <motion.div
              className="absolute inset-0"
              style={{ height: cardsHeight }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.7 }}
            >
              {ABOUT_SECTION_CARDS.map((card, index) => (
                <motion.div
                  key={card.title}
                  custom={{ index, stackOffset: stackOffsets[index] }}
                  variants={cardVariants}
                  className="absolute left-0 top-0"
                  style={{
                    width: cardTargets[index].width,
                    height: cardTargets[index].height,
                    left: cardTargets[index].x,
                    top: cardTargets[index].y,
                    willChange: "transform",
                    zIndex: ABOUT_SECTION_CARDS.length - index,
                  }}
                >
                  <FirstPredictionCard {...card} className="!h-full !w-full" />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
