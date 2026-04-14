"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

/** Aave-like hero easing: quick settle, soft overshoot feel */
const WAVE_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const WORD_DURATION = 0.5;
const WORD_STAGGER = 0.05;
const INITIAL_DELAY = 0.08;

/** For sequencing copy after the headline wave */
export const waveRevealTiming = {
  wordStagger: WORD_STAGGER,
  initialDelay: INITIAL_DELAY,
  wordDuration: WORD_DURATION,
} as const;

type WaveRevealHeadlineLinesProps = {
  lines: string[];
  lineClassName?: string;
  className?: string;
};

export function WaveRevealHeadlineLines({
  lines,
  lineClassName,
  className,
}: WaveRevealHeadlineLinesProps) {
  const reduced = useReducedMotion();
  const rootRef = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(rootRef, { once: true, amount: 0.25 });
  const shouldAnimate = reduced ? true : inView;
  let wordIndex = 0;

  return (
    <span ref={rootRef} className={cn(className)}>
      {lines.map((line, lineIdx) => {
        const words = line.trim().split(/\s+/);
        return (
          <span key={lineIdx} className={cn("block", lineIdx > 0 && "mt-1", lineClassName)}>
            {words.map((word, i) => {
              const idx = wordIndex++;
              return (
                <motion.span
                  key={`${lineIdx}-${i}`}
                  className="inline-block"
                  initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: "0.36em" }}
                  animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: "0.36em" }}
                  transition={{
                    duration: WORD_DURATION,
                    delay: INITIAL_DELAY + idx * WORD_STAGGER,
                    ease: WAVE_EASE,
                  }}
                >
                  {word}
                  {i < words.length - 1 ? "\u00A0" : null}
                </motion.span>
              );
            })}
          </span>
        );
      })}
    </span>
  );
}

type WaveRevealWordsProps = {
  text: string;
  className?: string;
  delayStart?: number;
  as?: "p" | "span";
};

export function WaveRevealWords({ text, className, delayStart = 0, as = "p" }: WaveRevealWordsProps) {
  const reduced = useReducedMotion();
  const rootRef = useRef<HTMLElement | null>(null);
  const inView = useInView(rootRef, { once: true, amount: 0.25 });
  const shouldAnimate = reduced ? true : inView;
  const words = text.trim().split(/\s+/);
  const MotionTag = as === "p" ? motion.p : motion.span;

  return (
    <MotionTag ref={rootRef} className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: "0.32em" }}
          animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: "0.32em" }}
          transition={{
            duration: WORD_DURATION,
            delay: delayStart + i * WORD_STAGGER,
            ease: WAVE_EASE,
          }}
        >
          {word}
          {i < words.length - 1 ? "\u00A0" : null}
        </motion.span>
      ))}
    </MotionTag>
  );
}

type WaveRevealFadeUpProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function WaveRevealFadeUp({ children, className, delay = 0 }: WaveRevealFadeUpProps) {
  const reduced = useReducedMotion();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(rootRef, { once: true, amount: 0.2 });
  const shouldAnimate = reduced ? true : inView;

  return (
    <motion.div
      ref={rootRef}
      className={cn(className)}
      initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
      animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
      transition={{
        duration: 0.55,
        delay,
        ease: WAVE_EASE,
      }}
    >
      {children}
    </motion.div>
  );
}
