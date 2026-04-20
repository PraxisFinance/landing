"use client";

import { memo } from "react";
import { Minus, Plus } from "lucide-react";

import type { FaqEntry } from "@/components/constants/frequency-questions-section";
import { FREQUENCY_QUESTIONS_ANSWER_PLACEHOLDER } from "@/components/constants/frequency-questions-section";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

type FAQAccordionPanelProps = {
  item: FaqEntry;
};

export const FAQAccordionPanel = memo(function FAQAccordionPanel({
  item,
}: FAQAccordionPanelProps) {
  const body = item.answer ?? FREQUENCY_QUESTIONS_ANSWER_PLACEHOLDER;

  return (
    <AccordionItem
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
});
