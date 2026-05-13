"use client";

import { motion } from "framer-motion";

import {
  JOIN_GET_STARTED_COMMUNITY_DESCRIPTION,
  JOIN_GET_STARTED_COMMUNITY_TITLE,
  JOIN_GET_STARTED_MOBILE_DESCRIPTION,
  JOIN_GET_STARTED_MOBILE_TITLE,
  JOIN_GET_STARTED_SECTION_TITLE,
  JOIN_GET_STARTED_WEB_TITLE,
} from "@/components/constants/join-get-started-section";
import { landingLenientMotionViewport } from "@/components/motion/lenient-in-view";
import { waveRevealTiming } from "@/components/motion/wave-reveal";

export const SMJ_WAVE_STAGGER = 0.045;
export const SMJ_WAVE_ITEM_DURATION = 0.48;
export const SMJ_WAVE_LINE_DELAY = 0.34;
export const SMJ_CARD_FLOAT_DURATION = 1.25;
export const SMJ_CARD_FLOAT_STAGGER = 0.42;
export const SMJ_CARD_FLOAT_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const webTitleWordCount = JOIN_GET_STARTED_WEB_TITLE.trim().split(/\s+/).length;
const sectionTitleWordCount = JOIN_GET_STARTED_SECTION_TITLE.trim().split(/\s+/).length;

export const SMJ_CARDS_DELAY_BASE =
  waveRevealTiming.initialDelay +
  sectionTitleWordCount * waveRevealTiming.wordStagger +
  waveRevealTiming.wordDuration * 0.25;

export const SMJ_WEB_DESCRIPTION_DELAY =
  waveRevealTiming.initialDelay +
  webTitleWordCount * waveRevealTiming.wordStagger +
  waveRevealTiming.wordDuration * 0.2;

const mobileTitleWordCount = JOIN_GET_STARTED_MOBILE_TITLE.trim().split(/\s+/).length;
const mobileDescriptionWordCount = JOIN_GET_STARTED_MOBILE_DESCRIPTION.trim().split(/\s+/).length;

export const SMJ_MOBILE_DESCRIPTION_DELAY =
  waveRevealTiming.initialDelay +
  mobileTitleWordCount * waveRevealTiming.wordStagger +
  waveRevealTiming.wordDuration * 0.2;

export const SMJ_MOBILE_BUTTON_DELAY =
  SMJ_MOBILE_DESCRIPTION_DELAY +
  mobileDescriptionWordCount * waveRevealTiming.wordStagger +
  waveRevealTiming.wordDuration * 0.2;

const communityTitleWordCount = JOIN_GET_STARTED_COMMUNITY_TITLE.trim().split(/\s+/).length;
const communityDescriptionWordCount = JOIN_GET_STARTED_COMMUNITY_DESCRIPTION.trim().split(/\s+/).length;

export const SMJ_COMMUNITY_DESCRIPTION_DELAY =
  waveRevealTiming.initialDelay +
  communityTitleWordCount * waveRevealTiming.wordStagger +
  waveRevealTiming.wordDuration * 0.2;

export const SMJ_COMMUNITY_LINKS_DELAY =
  SMJ_COMMUNITY_DESCRIPTION_DELAY +
  communityDescriptionWordCount * waveRevealTiming.wordStagger +
  waveRevealTiming.wordDuration * 0.15;

export type SocialMediaJoinTextClasses = {
  sectionTitleClass: string;
  productCardTitleClass: string;
  productCardDescriptionClass: string;
  statusPillClass: string;
  communityCardTitleClass: string;
  communityCardDescriptionClass: string;
  productCtaButtonClass: string;
};

export function scrollSocialMediaJoinToWaitlist() {
  const waitlistSection = document.getElementById("join-waitlist");
  if (!waitlistSection) {
    return;
  }
  waitlistSection.scrollIntoView({
    behavior: "smooth",
    block: "center",
    inline: "nearest",
  });
}

/** Section title wave — viewport-based reveal so mobile isn’t stuck invisible vs section-level inView. */
export function SocialMediaJoinWaveText({ text, className }: { text: string; className: string }) {
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
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={landingLenientMotionViewport}
              transition={{
                duration: SMJ_WAVE_ITEM_DURATION,
                delay: lineIndex * SMJ_WAVE_LINE_DELAY + wordIndex * SMJ_WAVE_STAGGER,
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
