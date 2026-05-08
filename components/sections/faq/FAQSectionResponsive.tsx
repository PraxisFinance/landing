"use client";

import type { FaqEntry } from "@/components/constants/frequency-questions-section";
import { SECTION_TEXT_SIZES } from "@/components/constants/text-sizes";
import { useIsMobile } from "@/components/providers/mobile-context";
import { FAQSectionDesktop } from "@/components/sections/faq/FAQSectionDesktop";
import { FAQSectionMobile } from "@/components/sections/faq/FAQSectionMobile";
import { useFaqSection } from "@/components/sections/faq/use-faq-section";

export type FAQSectionProps = {
  className?: string;
  items?: FaqEntry[];
};

/** Single FAQ state (show more / refs); separate mobile vs desktop typography branches. */
export function FAQSectionResponsive({ className, items }: FAQSectionProps) {
  const isMobile = useIsMobile();
  const faqState = useFaqSection();
  const faqTextSizes = SECTION_TEXT_SIZES.faq;

  const textClasses = {
    titleTextClass: isMobile ? faqTextSizes.title.mobile : faqTextSizes.title.desktop,
    questionTextClass: isMobile ? faqTextSizes.question.mobile : faqTextSizes.question.desktop,
    answerTextClass: isMobile ? faqTextSizes.answer.mobile : faqTextSizes.answer.desktop,
  };

  return isMobile ? (
    <FAQSectionMobile className={className} items={items} {...faqState} {...textClasses} />
  ) : (
    <FAQSectionDesktop className={className} items={items} {...faqState} {...textClasses} />
  );
}
