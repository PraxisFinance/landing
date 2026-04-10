"use client";

import { Minus, Plus } from "lucide-react";

import {
  WaveRevealFadeUp,
  WaveRevealHeadlineLines,
  waveRevealTiming,
} from "@/components/motion/wave-reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const HEADLINE = "Frequently Asked Questions" as const;

const headlineWordCount = HEADLINE.trim().split(/\s+/).length;

const contentDelayBase =
  waveRevealTiming.initialDelay +
  headlineWordCount * waveRevealTiming.wordStagger +
  waveRevealTiming.wordDuration * 0.3;

/** Replace with real copy when ready. */
const ANSWER_PLACEHOLDER =
  "We are finalizing this answer. Check back soon for full details.";

export type FaqEntry = {
  /** Stable id for `Accordion.Item` (`value`). */
  id: string;
  question: string;
  /** Omit or leave empty to show placeholder until content exists. */
  answer?: string | null;
};

const FAQ_ITEMS: FaqEntry[] = [
  { id: "bet", question: "What do I bet with?" },
  { id: "risk", question: "Is this 'risk-free'?" },
];

type FrequencyQuestionsSectionProps = {
  className?: string;
  /** Override default FAQ list (e.g. from CMS later). */
  items?: FaqEntry[];
};

export function FrequencyQuestionsSection({
  className,
  items = FAQ_ITEMS,
}: FrequencyQuestionsSectionProps) {
  return (
    <section
      id="faq"
      className={cn(
        "mx-auto w-full max-w-screen-2xl px-4 py-10 sm:px-6 sm:py-12 lg:px-10 lg:py-16",
        className
      )}
    >
      <h2 className="mb-8 text-center font-bold tracking-tight text-brand-black sm:mb-10 lg:mb-12">
        <WaveRevealHeadlineLines
          lines={[HEADLINE]}
          className="block text-center"
          lineClassName="text-[clamp(1.75rem,6.5vw,110px)] leading-[1.05]"
        />
      </h2>

      <WaveRevealFadeUp delay={contentDelayBase} className="mx-auto w-full max-w-3xl">
        <Accordion defaultValue={[]} className="gap-0">
          {items.map((item) => {
            const body =
              item.answer && item.answer.trim().length > 0 ? item.answer : ANSWER_PLACEHOLDER;

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
                <AccordionContent className="px-4 pt-0 pb-4 text-pretty text-sm leading-relaxed text-brand-black/80 sm:px-5 sm:pb-5 sm:text-[0.9375rem]">
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
