"use client";

import { motion } from "framer-motion";

export const TEAM_WAVE_STAGGER = 0.045;
export const TEAM_WAVE_ITEM_DURATION = 0.48;
export const TEAM_WAVE_LINE_DELAY = 0.34;
export const TEAM_STACK_START_DELAY = 0.28;
export const TEAM_STACK_STAGGER = 0.14;
export const TEAM_CARD_WIDTH_DESKTOP_PX = 345;
export const TEAM_CARD_WIDTH_MOBILE_PX = 260;
export const TEAM_CARD_GAP_PX = 16;
export const TEAM_SCROLL_STEP_PX = TEAM_CARD_WIDTH_DESKTOP_PX + TEAM_CARD_GAP_PX;
export const TEAM_SCROLL_EDGE_EPS = 0.1;

export function TeamSectionWaveText({
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
                duration: TEAM_WAVE_ITEM_DURATION,
                delay: lineIndex * TEAM_WAVE_LINE_DELAY + wordIndex * TEAM_WAVE_STAGGER,
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
