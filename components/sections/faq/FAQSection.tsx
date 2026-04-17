"use client";

import { useRef } from "react";
import { Minus, Plus } from "lucide-react";
import { motion, useInView } from "framer-motion";

import {
  FREQUENCY_QUESTIONS_ANSWER_PLACEHOLDER,
  FREQUENCY_QUESTIONS_HEADLINE,
  FREQUENCY_QUESTIONS_ITEMS,
} from "@/components/constants/frequency-questions-section";
import type { FaqEntry } from "@/components/constants/frequency-questions-section";
import { WaveRevealFadeUp, waveRevealTiming } from "@/components/motion/wave-reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const WAVE_STAGGER = 0.045;
const WAVE_ITEM_DURATION = 0.48;
const WAVE_LINE_DELAY = 0.34;

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

  return (
    <section
      ref={sectionRef}
      id="faq"
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
          {items.map((item) => {
            const body = item.answer ?? FREQUENCY_QUESTIONS_ANSWER_PLACEHOLDER;

            return (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="mb-3 overflow-hidden rounded-2xl border-0 !border-b-0 bg-brand-gray/90 shadow-sm ring-1 ring-black/[0.05] last:mb-0"
              >
                <AccordionTrigger
                  className={cn(
                    "items-center gap-4 px-4 py-4 sm:px-5 sm:py-5",
                    "text-left text-base font-bold text-brand-black sm:text-lg",
                    "hover:no-underline",
                    "[&_[data-slot=accordion-trigger-icon]]:hidden"
                  )}
                >
                  <span className="min-w-0 flex-1">{item.question}</span>
                  <span
                    className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-black/[0.06]"
                    aria-hidden
                  >
                    <Plus className="size-4 text-brand-dark-purple group-aria-expanded/accordion-trigger:hidden" />
                    <Minus className="hidden size-4 text-brand-dark-purple group-aria-expanded/accordion-trigger:inline" />
                  </span>
                </AccordionTrigger>
                <AccordionContent
                  className={cn(
                    "px-4 pt-0 pb-4 text-pretty text-sm leading-relaxed text-brand-black/80 sm:px-5 sm:pb-5 sm:text-[0.9375rem]",
                    "[&_a]:text-brand-dark-purple [&_a]:underline",
                    "[&_strong]:font-semibold [&_strong]:text-brand-black/90"
                  )}
                >
                  {body}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </WaveRevealFadeUp>
    </section>
  );
}
