"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useInView } from "framer-motion";

import {
  EXPERTS_SECTION_HEADLINE,
  EXPERTS_SECTION_ITEMS,
} from "@/components/constants/experts-section";
import { TeamCarouselTrack } from "@/components/sections/team/team-carousel-track";
import { TeamCard } from "@/components/sections/team/team-card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const WAVE_STAGGER = 0.045;
const WAVE_ITEM_DURATION = 0.48;
const WAVE_LINE_DELAY = 0.34;
const STACK_STAGGER = 0.08;
const CARD_WIDTH_PX = 345;
const CARD_GAP_PX = 16;
const SCROLL_STEP_PX = CARD_WIDTH_PX + CARD_GAP_PX;
const SCROLL_EDGE_EPS = 1;

type TeamSectionProps = {
  className?: string;
};

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

export function TeamSection({ className }: TeamSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const sectionInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const [scrollPercent, setScrollPercent] = useState(0);
  const [trackWidth, setTrackWidth] = useState(0);
  const totalCards = EXPERTS_SECTION_ITEMS.length;

  useEffect(() => {
    const measure = () => {
      const node = trackRef.current;
      if (!node) return;
      setTrackWidth(node.clientWidth);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const stackOffsets = useMemo(
    () => {
      if (!trackWidth) {
        return EXPERTS_SECTION_ITEMS.map(() => ({ x: 0, scale: 1 }));
      }
      const stackCenterX = (trackWidth - CARD_WIDTH_PX) / 2;
      return EXPERTS_SECTION_ITEMS.map((_, index) => {
        const centerIndex = (totalCards - 1) / 2;
        const delta = index - centerIndex;
        const naturalX = index * (CARD_WIDTH_PX + CARD_GAP_PX);
        const collapseToCenterX = stackCenterX - naturalX;
        return {
          x: collapseToCenterX + delta * 18,
          scale: 1 - Math.abs(delta) * 0.025,
        };
      });
    },
    [totalCards, trackWidth]
  );

  const handleTrackScroll: React.UIEventHandler<HTMLDivElement> = (event) => {
    const node = event.currentTarget;
    const max = Math.max(1, node.scrollWidth - node.clientWidth);
    setScrollPercent((node.scrollLeft / max) * 100);
  };

  const scrollTrackBy = (delta: number) => {
    const node = trackRef.current;
    if (!node) return;
    node.scrollBy({ left: delta, behavior: "smooth" });
  };

  const handleSliderChange = (value: number) => {
    const node = trackRef.current;
    if (!node) return;
    const max = Math.max(0, node.scrollWidth - node.clientWidth);
    node.scrollLeft = (value / 100) * max;
    setScrollPercent(value);
  };

  const trackNode = trackRef.current;
  const maxScrollLeft = trackNode ? Math.max(0, trackNode.scrollWidth - trackNode.clientWidth) : 0;
  const canScrollPrev = !trackNode || trackNode.scrollLeft > SCROLL_EDGE_EPS;
  const canScrollNext =
    !trackNode || trackNode.scrollLeft < maxScrollLeft - SCROLL_EDGE_EPS;

  return (
    <section
      ref={sectionRef}
      id="experts"
      className={cn(
        "mx-auto w-full max-w-screen-2xl px-4 py-10 sm:px-6 sm:py-12 lg:px-10 lg:py-16",
        className
      )}
    >
      <div>
        <div className="relative mx-auto w-full max-w-[min(100%,85rem)] px-2">
          <h2 className="text-center font-bold tracking-tight text-brand-black">
            <WaveText
              text={EXPERTS_SECTION_HEADLINE}
              className="ui-headline-1 block text-center"
              start={sectionInView}
            />
          </h2>
          <div className="mt-4 flex justify-end gap-2">
            <Button
              onClick={() => scrollTrackBy(-SCROLL_STEP_PX)}
              disabled={!canScrollPrev}
              variant="landing-light-purple"
              size="landing-icon-sm"
              className="rounded-xl disabled:cursor-not-allowed"
              aria-label="Scroll team cards left"
            >
              <ChevronLeft className="size-5" strokeWidth={2} aria-hidden />
            </Button>
            <Button
              onClick={() => scrollTrackBy(SCROLL_STEP_PX)}
              disabled={!canScrollNext}
              variant="landing-light-purple"
              size="landing-icon-sm"
              className="rounded-xl disabled:cursor-not-allowed"
              aria-label="Scroll team cards right"
            >
              <ChevronRight className="size-5" strokeWidth={2} aria-hidden />
            </Button>
          </div>
        </div>
      </div>

      <div className="w-full min-w-0">
        <TeamCarouselTrack ref={trackRef} onScroll={handleTrackScroll} className="max-w-full">
          {EXPERTS_SECTION_ITEMS.map((expert, i) => (
            <motion.div
              key={expert.name}
              initial={{ opacity: 1, x: stackOffsets[i].x, scale: stackOffsets[i].scale }}
              animate={sectionInView ? { opacity: 1, x: 0, scale: 1 } : undefined}
              transition={{
                duration: 0.8,
                delay: i * STACK_STAGGER,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="shrink-0 will-change-transform"
            >
              <TeamCard
                memberIndex={i}
                name={expert.name}
                role={expert.role}
                image={expert.image}
                bio={expert.bio}
                socials={expert.socials}
                priority={i < 4}
              />
            </motion.div>
          ))}
        </TeamCarouselTrack>

        <div className="mt-3 w-full px-1">
          <input
            type="range"
            min={0}
            max={100}
            step={0.1}
            value={scrollPercent}
            onChange={(e) => handleSliderChange(Number(e.target.value))}
            aria-label="Team cards horizontal scroll"
            className={cn(
              "h-1.5 w-full cursor-pointer appearance-none rounded-full bg-brand-gray",
              "[&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-10 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand-dark-purple",
              "[&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:w-10 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-brand-dark-purple"
            )}
          />
        </div>
      </div>
    </section>
  );
}
