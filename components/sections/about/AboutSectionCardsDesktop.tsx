"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import { ABOUT_SECTION_CARDS } from "@/components/constants/about-section";
import { AboutPredictionCardDesktop } from "@/components/sections/about/AboutPredictionCardDesktop";

const CARDS_IN_VIEW_AMOUNT = 0.1;
const CARD_STAGGER = 0.11;

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

type AboutSectionCardsDesktopProps = {
  titleTextSizeClassName: string;
  bodyTextSizeClassName: string;
  cardsStartDelay: number;
};

/** Desktop-only: hidden measure row + animated stack (depends on layout measurement). */
export function AboutSectionCardsDesktop({
  titleTextSizeClassName,
  bodyTextSizeClassName,
  cardsStartDelay,
}: AboutSectionCardsDesktopProps) {
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

  const desktopCardVariants = {
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

  return (
    <>
      <div className="invisible flex flex-wrap justify-end gap-4 sm:gap-5" aria-hidden>
        {ABOUT_SECTION_CARDS.map((card, index) => (
          <div
            key={`measure-${card.title}`}
            ref={(node) => {
              measureCardsRef.current[index] = node;
            }}
          >
            <AboutPredictionCardDesktop
              card={card}
              titleTextSizeClassName={titleTextSizeClassName}
              bodyTextSizeClassName={bodyTextSizeClassName}
            />
          </div>
        ))}
      </div>

      {cardTargets.length === ABOUT_SECTION_CARDS.length && (
        <motion.div
          className="absolute inset-0"
          style={{ height: cardsHeight }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: CARDS_IN_VIEW_AMOUNT }}
        >
          {ABOUT_SECTION_CARDS.map((card, index) => (
            <motion.div
              key={card.title}
              custom={{ index, stackOffset: stackOffsets[index] }}
              variants={desktopCardVariants}
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
              <AboutPredictionCardDesktop
                card={card}
                titleTextSizeClassName={titleTextSizeClassName}
                bodyTextSizeClassName={bodyTextSizeClassName}
                className="!h-full !w-full"
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </>
  );
}
