"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import {
  PROJECT_ROADMAP_HEADLINE,
  PROJECT_ROADMAP_ITEMS,
} from "@/components/constants/project-roadmap-section";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

type ProjectRoadmapSectionProps = {
  className?: string;
};

const WAVE_STAGGER = 0.045;
const WAVE_ITEM_DURATION = 0.48;
const CARD_STAGGER = 0.11;
const PROGRESS_APPEAR_DELAY = 0.8;
const PROGRESS_FILL_DURATION_MS = 2200;
const PROGRESS_FILL_GAP_MS = 180;
const VIEWPORT_EPSILON = 1;

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
                delay: lineIndex * 0.32 + wordIndex * WAVE_STAGGER,
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

export function ProjectRoadmapSection({ className }: ProjectRoadmapSectionProps) {
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
        rect.top >= -VIEWPORT_EPSILON &&
        rect.bottom <= window.innerHeight + VIEWPORT_EPSILON;
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
      (PROJECT_ROADMAP_ITEMS.length - 1) * CARD_STAGGER * 1000 + PROGRESS_APPEAR_DELAY * 1000;
    const timers: number[] = [];

    const showId = window.setTimeout(() => {
      setShowProgress(true);
      PROJECT_ROADMAP_ITEMS.forEach((item, index) => {
        const fillDelay =
          index * (PROGRESS_FILL_DURATION_MS + PROGRESS_FILL_GAP_MS);
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

  return (
    <section
      ref={sectionRef}
      id="project-roadmap"
      className={cn(
        "mx-auto w-full max-w-screen-2xl px-4 py-10 sm:px-6 sm:py-12 lg:px-10 lg:py-16",
        "bg-brand-white",
        className
      )}
    >
      <h2 className="mb-8 text-center text-brand-black sm:mb-10 lg:mb-12">
        <WaveText text={PROJECT_ROADMAP_HEADLINE} className="ui-headline-1" start={hasStarted} />
      </h2>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3.5 lg:grid-cols-4 lg:gap-3">
        {PROJECT_ROADMAP_ITEMS.map((item, index) => (
          <motion.div
            key={item.quarter}
            initial={{ opacity: 0, y: 26 }}
            animate={hasStarted ? { opacity: 1, y: 0 } : { opacity: 0, y: 26 }}
            transition={{
              duration: 0.5,
              delay: index * CARD_STAGGER,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex min-h-0 flex-col gap-2"
          >
            <div
              className={cn(
                "flex min-h-[5.75rem] flex-col gap-2 rounded-lg p-3 shadow-sm ring-1 ring-black/[0.06] sm:min-h-[6rem] sm:p-3.5",
                item.cardClass
              )}
            >
              <Badge
                className={cn(
                  "h-6 w-fit border-0 px-2.5 py-0 text-xs font-semibold sm:text-sm",
                  item.badgeClass
                )}
              >
                {item.quarter}
              </Badge>
              <p
                className={cn(
                  "text-pretty text-sm font-medium leading-snug sm:text-[0.9375rem]",
                  item.bodyClass
                )}
              >
                {item.body}
              </p>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={showProgress ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <Progress
                value={progressValues[index]}
                className={cn(
                  "w-full flex-col gap-0 [&_[data-slot=progress-indicator]]:transition-all [&_[data-slot=progress-indicator]]:duration-[2200ms] [&_[data-slot=progress-indicator]]:ease-out",
                  item.progressClass
                )}
              />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
