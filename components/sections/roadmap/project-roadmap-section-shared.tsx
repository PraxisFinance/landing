"use client";

import { motion } from "framer-motion";

export const ROADMAP_WAVE_STAGGER = 0.045;
export const ROADMAP_WAVE_ITEM_DURATION = 0.48;
export const ROADMAP_CARD_STAGGER = 0.11;
export const ROADMAP_PROGRESS_APPEAR_DELAY = 0.8;
export const ROADMAP_PROGRESS_FILL_DURATION_MS = 2200;
export const ROADMAP_PROGRESS_FILL_GAP_MS = 180;
export const ROADMAP_VIEWPORT_EPSILON = 1;

export function ProjectRoadmapWaveText({
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
                duration: ROADMAP_WAVE_ITEM_DURATION,
                delay: lineIndex * 0.32 + wordIndex * ROADMAP_WAVE_STAGGER,
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
