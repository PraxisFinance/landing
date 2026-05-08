"use client";

import {
  FREQUENCY_QUESTIONS_HEADLINE,
  FREQUENCY_QUESTIONS_ITEMS,
} from "@/components/constants/frequency-questions-section";
import type { FaqEntry } from "@/components/constants/frequency-questions-section";
import { WaveRevealFadeUp } from "@/components/motion/wave-reveal";
import {
  FAQ_CONTENT_DELAY_BASE,
  FAQSectionWaveText,
  INITIAL_VISIBLE_FAQ_ITEMS,
  type FAQSectionTextClasses,
} from "@/components/sections/faq/faq-section-shared";
import type { FaqSectionStateBag } from "@/components/sections/faq/use-faq-section";
import { FAQAccordionPanel } from "@/components/sections/faq/FAQAccordionPanel";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type FAQSectionMobileProps = FaqSectionStateBag &
  FAQSectionTextClasses & {
    className?: string;
    items?: FaqEntry[];
  };

export function FAQSectionMobile({
  className,
  items = FREQUENCY_QUESTIONS_ITEMS,
  sectionRef,
  showAllItems,
  setShowAllItems,
  titleTextClass,
  questionTextClass,
  answerTextClass,
}: FAQSectionMobileProps) {
  const visibleItems = showAllItems ? items : items.slice(0, INITIAL_VISIBLE_FAQ_ITEMS);
  const shouldShowToggleButton = items.length > INITIAL_VISIBLE_FAQ_ITEMS;

  return (
    <section
      ref={sectionRef}
      id="faqSection"
      className={cn(
        "mx-auto w-full max-w-screen-2xl px-4 py-10 sm:px-6 sm:py-12 lg:px-10 lg:py-16",
        className
      )}
    >
      <h2 className="mb-5 text-center text-brand-black md:mb-10 lg:mb-12">
        <FAQSectionWaveText
          text={FREQUENCY_QUESTIONS_HEADLINE}
          className={cn(titleTextClass, "block text-center")}
        />
      </h2>

      <WaveRevealFadeUp delay={FAQ_CONTENT_DELAY_BASE} className="mx-auto w-full max-w-3xl">
        <Accordion defaultValue={[]} className="gap-0">
          {visibleItems.map((item) => (
            <FAQAccordionPanel
              key={item.id}
              item={item}
              questionTextClassName={questionTextClass}
              answerTextClassName={answerTextClass}
            />
          ))}
        </Accordion>

        {shouldShowToggleButton ? (
          <div className="mt-6 flex justify-center sm:mt-7">
            <Button
              type="button"
              variant="landing-dark-purple"
              size="landing-sm"
              onClick={() => setShowAllItems((prev) => !prev)}
            >
              {showAllItems ? "Show less" : "Show more"}
            </Button>
          </div>
        ) : null}
      </WaveRevealFadeUp>
    </section>
  );
}
