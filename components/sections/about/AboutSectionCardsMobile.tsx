import { ABOUT_SECTION_CARDS } from "@/components/constants/about-section";
import { AboutPredictionCardMobile } from "@/components/sections/about/AboutPredictionCardMobile";

const MOBILE_CARD_ORDER = [0, 2, 1] as const;

type AboutSectionCardsMobileProps = {
  titleTextSizeClassName: string;
  bodyTextSizeClassName: string;
};

export function AboutSectionCardsMobile({
  titleTextSizeClassName,
  bodyTextSizeClassName,
}: AboutSectionCardsMobileProps) {
  const cards = MOBILE_CARD_ORDER.map((index) => ABOUT_SECTION_CARDS[index]);

  return (
    <div className="flex flex-col gap-3 sm:hidden">
      {cards.map((card) => (
        <AboutPredictionCardMobile
          key={`mobile-${card.title}`}
          card={card}
          titleTextSizeClassName={titleTextSizeClassName}
          bodyTextSizeClassName={bodyTextSizeClassName}
          className="!h-[160px] !w-full"
        />
      ))}
    </div>
  );
}
