"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

import {
  FREQUENCY_QUESTIONS_HEADLINE,
  FREQUENCY_QUESTIONS_ITEMS,
} from "@/components/constants/frequency-questions-section";
import type { FaqEntry } from "@/components/constants/frequency-questions-section";
import { WaveRevealFadeUp, waveRevealTiming } from "@/components/motion/wave-reveal";
import { FAQAccordionPanel } from "@/components/sections/faq/FAQAccordionPanel";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const WAVE_STAGGER = 0.045;
const WAVE_ITEM_DURATION = 0.48;
const WAVE_LINE_DELAY = 0.34;
const INITIAL_VISIBLE_FAQ_ITEMS = 6;

const headlineWordCount = FREQUENCY_QUESTIONS_HEADLINE.trim().split(/\s+/).length;
const contentDelayBase =
  waveRevealTiming.initialDelay +
  headlineWordCount * waveRevealTiming.wordStagger +
  waveRevealTiming.wordDuration * 0.3;

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

type FAQSectionProps = {
  className?: string;
  items?: FaqEntry[];
};

export function FAQSection({
  className,
  items = FREQUENCY_QUESTIONS_ITEMS,
}: FAQSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const sectionInView = useInView(sectionRef, { once: true, amount: 0.35 });
  const [showAllItems, setShowAllItems] = useState(false);
  const visibleItems = showAllItems ? items : items.slice(0, INITIAL_VISIBLE_FAQ_ITEMS);
  const shouldShowMoreButton = !showAllItems && items.length > INITIAL_VISIBLE_FAQ_ITEMS;

  return (
    <section
      ref={sectionRef}
      id="faqSection"
      className={cn(
        "mx-auto w-full max-w-screen-2xl px-4 py-10 sm:px-6 sm:py-12 lg:px-10 lg:py-16",
        className
      )}
    >
      <h2 className="mb-8 text-center text-brand-black sm:mb-10 lg:mb-12">
        <WaveText
          text={FREQUENCY_QUESTIONS_HEADLINE}
          className="ui-headline-1 block text-center"
          start={sectionInView}
        />
      </h2>

      <WaveRevealFadeUp delay={contentDelayBase} className="mx-auto w-full max-w-3xl">
        <Accordion defaultValue={[]} className="gap-0">
          {visibleItems.map((item) => (
            <FAQAccordionPanel key={item.id} item={item} />
          ))}
        </Accordion>

        {shouldShowMoreButton ? (
          <div className="mt-6 flex justify-center sm:mt-7">
            <Button
              type="button"
              variant="landing-dark-purple"
              size="landing-sm"
              onClick={() => setShowAllItems(true)}
            >
              Show more
            </Button>
          </div>
        ) : null}
      </WaveRevealFadeUp>
    </section>
  );
}
