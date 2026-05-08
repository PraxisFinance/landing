"use client";

import type { FaqEntry } from "@/components/constants/frequency-questions-section";
import { SECTION_TEXT_SIZES } from "@/components/constants/text-sizes";
import { useMobileViewport } from "@/components/providers/mobile-context";
import { FAQSectionDesktop } from "@/components/sections/faq/FAQSectionDesktop";
import { FAQSectionMobile } from "@/components/sections/faq/FAQSectionMobile";
import { useFaqSection } from "@/components/sections/faq/use-faq-section";
import { SectionViewportPlaceholder } from "@/components/viewport/viewport-skeletons";

export type FAQSectionProps = {
  className?: string;
  items?: FaqEntry[];
};

/** FAQ branches after viewport snapshot. */
export function FAQSectionResponsive({ className, items }: FAQSectionProps) {
  const { isMobile, isViewportReady } = useMobileViewport();
  const faqState = useFaqSection();
  const faqTextSizes = SECTION_TEXT_SIZES.faq;

  const textClasses = {
    titleTextClass: isMobile ? faqTextSizes.title.mobile : faqTextSizes.title.desktop,
    questionTextClass: isMobile ? faqTextSizes.question.mobile : faqTextSizes.question.desktop,
    answerTextClass: isMobile ? faqTextSizes.answer.mobile : faqTextSizes.answer.desktop,
  };

  if (!isViewportReady) {
    return <SectionViewportPlaceholder className={className} minHeightClass="min-h-[560px]" />;
  }

  return isMobile ? (
    <FAQSectionMobile className={className} items={items} {...faqState} {...textClasses} />
  ) : (
    <FAQSectionDesktop className={className} items={items} {...faqState} {...textClasses} />
  );
}
