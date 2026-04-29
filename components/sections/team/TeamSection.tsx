"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useInView } from "framer-motion";

import {
  EXPERTS_SECTION_HEADLINE,
  EXPERTS_SECTION_ITEMS,
} from "@/components/constants/experts-section";
import { SECTION_TEXT_SIZES } from "@/components/constants/text-sizes";
import { useIsMobile } from "@/components/providers/mobile-context";
import { TeamCarouselTrack } from "@/components/sections/team/team-carousel-track";
import { TeamCard } from "@/components/sections/team/team-card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const WAVE_STAGGER = 0.045;
const WAVE_ITEM_DURATION = 0.48;
const WAVE_LINE_DELAY = 0.34;
const STACK_START_DELAY = 0.28;
const STACK_STAGGER = 0.14;
const TEAM_CARD_WIDTH_DESKTOP_PX = 345;
const TEAM_CARD_WIDTH_MOBILE_PX = 260;
const CARD_GAP_PX = 16;
const SCROLL_STEP_PX = TEAM_CARD_WIDTH_DESKTOP_PX + CARD_GAP_PX;
const SCROLL_EDGE_EPS = 0.1;

type TeamSectionProps = {
  className?: string;
};

function WaveText({ text, className, start }: { text: string; className: string; start: boolean }) {
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
  const isMobile = useIsMobile();
  const teamTextSizes = SECTION_TEXT_SIZES.team;
  const titleTextClass = isMobile ? teamTextSizes.title.mobile : teamTextSizes.title.desktop;
  const cardNameTextClass = isMobile ? teamTextSizes.cardName.mobile : teamTextSizes.cardName.desktop;
  const cardBioTextClass = isMobile ? teamTextSizes.cardBio.mobile : teamTextSizes.cardBio.desktop;
  const roleBadgeTextClass = isMobile ? teamTextSizes.roleBadge.mobile : teamTextSizes.roleBadge.desktop;

  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const sectionInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const [scrollPercent, setScrollPercent] = useState(0);
  const [trackWidth, setTrackWidth] = useState(0);
  const [hasMeasuredTrack, setHasMeasuredTrack] = useState(false);
  const totalCards = EXPERTS_SECTION_ITEMS.length;

  useEffect(() => {
    const measure = () => {
      const node = trackRef.current;
      if (!node) return;
      setTrackWidth(node.clientWidth);
      setHasMeasuredTrack(true);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    if (!hasMeasuredTrack) return;
    const node = trackRef.current;
    if (!node) return;
    // Ensure stacked initial state is centered relative to section viewport.
    node.scrollLeft = 0;
    setScrollPercent(0);
  }, [hasMeasuredTrack, isMobile]);

  const cardWidthPx = isMobile ? TEAM_CARD_WIDTH_MOBILE_PX : TEAM_CARD_WIDTH_DESKTOP_PX;

  const stackOffsets = useMemo(() => {
    if (!trackWidth) {
      return EXPERTS_SECTION_ITEMS.map(() => ({ x: 0, scale: 1 }));
    }
    const stackCenterX = (trackWidth - cardWidthPx) / 2;
    return EXPERTS_SECTION_ITEMS.map((_, index) => {
      const centerIndex = (totalCards - 1) / 2;
      const delta = index - centerIndex;
      const naturalX = index * (cardWidthPx + CARD_GAP_PX);
      const collapseToCenterX = stackCenterX - naturalX;
      return {
        x: collapseToCenterX + delta * 10,
        scale: 1 - Math.abs(delta) * 0.025,
      };
    });
  }, [totalCards, trackWidth, cardWidthPx]);

  const shouldSpreadCards = sectionInView && hasMeasuredTrack;

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

  const canScrollPrev = scrollPercent > SCROLL_EDGE_EPS;
  const canScrollNext = scrollPercent < 100 - SCROLL_EDGE_EPS;

  return (
    <section
      ref={sectionRef}
      id="team-section"
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
              className={cn(titleTextClass, "block text-center")}
              start={sectionInView}
            />
          </h2>
          {!isMobile ? (
            <div className="mt-4 flex justify-end gap-2">
              <Button
                onClick={() => scrollTrackBy(-SCROLL_STEP_PX)}
                disabled={!canScrollPrev}
                variant="landing-dark-purple"
                size="landing-icon-sm"
                className="w-10 disabled:cursor-not-allowed"
                aria-label="Scroll team cards left"
              >
                <ChevronLeft className="size-5" strokeWidth={2} aria-hidden />
              </Button>
              <Button
                onClick={() => scrollTrackBy(SCROLL_STEP_PX)}
                disabled={!canScrollNext}
                variant="landing-dark-purple"
                size="landing-icon-sm"
                className="w-20 justify-end pr-3 disabled:cursor-not-allowed"
                aria-label="Scroll team cards right"
              >
                <ChevronRight className="size-5" strokeWidth={2} aria-hidden />
              </Button>
            </div>
          ) : null}
        </div>
      </div>

      <div className="w-full min-w-0">
        <TeamCarouselTrack ref={trackRef} onScroll={handleTrackScroll} className="max-w-full">
          {hasMeasuredTrack
            ? EXPERTS_SECTION_ITEMS.map((expert, i) => (
                <motion.div
                  key={expert.name}
                  initial={{ opacity: 1, x: stackOffsets[i].x, scale: stackOffsets[i].scale }}
                  animate={shouldSpreadCards ? { opacity: 1, x: 0, scale: 1 } : undefined}
                  transition={{
                    duration: 1.2,
                    delay: STACK_START_DELAY + i * STACK_STAGGER,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="shrink-0 will-change-transform"
                  style={{ zIndex: EXPERTS_SECTION_ITEMS.length - i }}
                >
                  <TeamCard
                    memberIndex={i}
                    name={expert.name}
                    role={expert.role}
                    image={expert.image}
                    bio={expert.bio}
                    socials={expert.socials}
                    priority={i < 4}
                    compact={isMobile}
                    nameTextClassName={cardNameTextClass}
                    bioTextClassName={cardBioTextClass}
                    roleBadgeTextClassName={roleBadgeTextClass}
                  />
                </motion.div>
              ))
            : null}
        </TeamCarouselTrack>
      </div>
    </section>
  );
}
