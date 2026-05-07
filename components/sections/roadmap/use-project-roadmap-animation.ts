"use client";

import { useEffect, useRef, useState } from "react";

import { PROJECT_ROADMAP_ITEMS } from "@/components/constants/project-roadmap-section";
import {
  ROADMAP_CARD_STAGGER,
  ROADMAP_PROGRESS_APPEAR_DELAY,
  ROADMAP_PROGRESS_FILL_DURATION_MS,
  ROADMAP_PROGRESS_FILL_GAP_MS,
  ROADMAP_VIEWPORT_EPSILON,
} from "@/components/sections/roadmap/project-roadmap-section-shared";

export function useProjectRoadmapAnimation() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [progressValues, setProgressValues] = useState<number[]>(
    PROJECT_ROADMAP_ITEMS.map(() => 0)
  );

  useEffect(() => {
    if (hasStarted) return;

    const checkFullyVisible = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const fullyVisible =
        rect.top >= -ROADMAP_VIEWPORT_EPSILON &&
        rect.bottom <= window.innerHeight + ROADMAP_VIEWPORT_EPSILON;
      if (fullyVisible) {
        setHasStarted(true);
      }
    };

    checkFullyVisible();
    window.addEventListener("scroll", checkFullyVisible, { passive: true });
    window.addEventListener("resize", checkFullyVisible);
    return () => {
      window.removeEventListener("scroll", checkFullyVisible);
      window.removeEventListener("resize", checkFullyVisible);
    };
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    const initialDelayMs =
      (PROJECT_ROADMAP_ITEMS.length - 1) * ROADMAP_CARD_STAGGER * 1000 +
      ROADMAP_PROGRESS_APPEAR_DELAY * 1000;
    const timers: number[] = [];

    const showId = window.setTimeout(() => {
      setShowProgress(true);
      PROJECT_ROADMAP_ITEMS.forEach((item, index) => {
        const fillDelay = index * (ROADMAP_PROGRESS_FILL_DURATION_MS + ROADMAP_PROGRESS_FILL_GAP_MS);
        const fillId = window.setTimeout(() => {
          setProgressValues((prev) => {
            const next = [...prev];
            next[index] = item.value;
            return next;
          });
        }, fillDelay);
        timers.push(fillId);
      });
    }, initialDelayMs);
    timers.push(showId);

    return () => {
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, [hasStarted]);

  return {
    sectionRef,
    hasStarted,
    showProgress,
    progressValues,
  };
}

export type ProjectRoadmapAnimationBag = ReturnType<typeof useProjectRoadmapAnimation>;
