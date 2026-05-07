"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "framer-motion";

import { EXPERTS_SECTION_ITEMS } from "@/components/constants/experts-section";
import {
  TEAM_CARD_GAP_PX,
  TEAM_CARD_WIDTH_DESKTOP_PX,
  TEAM_SCROLL_EDGE_EPS,
} from "@/components/sections/team/team-section-shared";

/**
 * Single hook for team carousel: only one Team section mounts at a time, so refs must live here.
 * Desktop: measure track + stack → spread offsets + scroll buttons.
 * Mobile: horizontal row only — no stack animation, cards render immediately.
 */
export function useTeamCarousel(isMobile: boolean) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const sectionInView = useInView(sectionRef, {
    once: true,
    amount: isMobile ? 0.12 : 0.3,
  });

  const [scrollPercent, setScrollPercent] = useState(0);
  const [trackWidth, setTrackWidth] = useState(0);
  const [hasMeasuredTrack, setHasMeasuredTrack] = useState(false);
  const totalCards = EXPERTS_SECTION_ITEMS.length;

  useEffect(() => {
    if (isMobile) {
      setTrackWidth(0);
      setHasMeasuredTrack(false);
      return;
    }

    const measure = () => {
      const node = trackRef.current;
      if (!node) return;
      setTrackWidth(node.clientWidth);
      setHasMeasuredTrack(true);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) return;
    if (!hasMeasuredTrack) return;
    const node = trackRef.current;
    if (!node) return;
    node.scrollLeft = 0;
    const id = requestAnimationFrame(() => setScrollPercent(0));
    return () => cancelAnimationFrame(id);
  }, [isMobile, hasMeasuredTrack]);

  const stackOffsets = useMemo(() => {
    if (isMobile || !trackWidth) {
      return EXPERTS_SECTION_ITEMS.map(() => ({ x: 0, scale: 1 }));
    }
    const cardWidthPx = TEAM_CARD_WIDTH_DESKTOP_PX;
    const stackCenterX = (trackWidth - cardWidthPx) / 2;
    return EXPERTS_SECTION_ITEMS.map((_, index) => {
      const centerIndex = (totalCards - 1) / 2;
      const delta = index - centerIndex;
      const naturalX = index * (cardWidthPx + TEAM_CARD_GAP_PX);
      const collapseToCenterX = stackCenterX - naturalX;
      return {
        x: collapseToCenterX + delta * 10,
        scale: 1 - Math.abs(delta) * 0.025,
      };
    });
  }, [isMobile, totalCards, trackWidth]);

  const shouldSpreadCards = !isMobile && sectionInView && hasMeasuredTrack;

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

  const canScrollPrev = scrollPercent > TEAM_SCROLL_EDGE_EPS;
  const canScrollNext = scrollPercent < 100 - TEAM_SCROLL_EDGE_EPS;

  return {
    sectionRef,
    trackRef,
    sectionInView,
    scrollPercent,
    hasMeasuredTrack: isMobile ? true : hasMeasuredTrack,
    stackOffsets,
    shouldSpreadCards,
    handleTrackScroll,
    scrollTrackBy,
    canScrollPrev,
    canScrollNext,
  };
}

export type TeamCarouselBag = ReturnType<typeof useTeamCarousel>;
