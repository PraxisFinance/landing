"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { ExpertCarouselTrack } from "@/components/sections/expert-carousel-track";
import { ExpertCard } from "@/components/sections/expert-card";
import type { ExpertSocialLink } from "@/components/sections/expert-social-links";
import {
  WaveRevealFadeUp,
  WaveRevealHeadlineLines,
  waveRevealTiming,
} from "@/components/motion/wave-reveal";
import { cn } from "@/lib/utils";

const HEADLINE = "Experts in DeFi Product Development" as const;

const headlineWordCount = HEADLINE.trim().split(/\s+/).length;

const cardsDelayBase =
  waveRevealTiming.initialDelay +
  headlineWordCount * waveRevealTiming.wordStagger +
  waveRevealTiming.wordDuration * 0.3;

type ExpertEntry = {
  name: string;
  role: string;
  image: string;
  bio: string;
  socials?: ExpertSocialLink[];
};

const AUTO_ADVANCE_MS = 3000;

const EXPERTS: ExpertEntry[] = [
  {
    name: "Alex Ivlev",
    role: "Co-founder, CEO",
    image: "/team/alex-ivlev.png",
    bio: "Sets product direction and partnerships, bringing years of experience scaling DeFi teams and go-to-market.",
  },
  {
    name: "Mizori Shirouki",
    role: "Co-founder, CPO",
    image: "/team/mizori-shirouki.png",
    bio: "Product, marketing, and design. DeFi and gaming background with focus on UX and growth.",
    socials: [
      { label: "X (Twitter)", href: "#", kind: "x" },
      { label: "Telegram", href: "#", kind: "telegram" },
      { label: "Discord", href: "#", kind: "discord" },
    ],
  },
  {
    name: "Alexander Scherbatuk",
    role: "Backend & Smart Contracts",
    image: "/team/alex-sherbatuk.png",
    bio: "Architects on-chain logic and backend services with a focus on security, gas efficiency, and reliability.",
  },
  {
    name: "Anton Solover",
    role: "Content & Community Lead",
    image: "/team/anton-solover.png",
    bio: "Owns narrative, community programs, and ecosystem communications across channels.",
  },
  {
    name: "Ivan Kireev",
    role: "Frontend Engineer",
    image: "/team/ivan-kireev.png",
    bio: "Builds fast, accessible interfaces and design systems for the Praxis web experience.",
  },
];

type ExpertsSectionProps = {
  className?: string;
};

export function ExpertsSection({ className }: ExpertsSectionProps) {
  const [activeIndex, setActiveIndex] = useState(1);
  /** When false: interval + ping-pong scroll run. When true: frozen until user clicks the same card again. */
  const [manualPaused, setManualPaused] = useState(false);

  useEffect(() => {
    if (manualPaused) return;
    const id = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % EXPERTS.length);
    }, AUTO_ADVANCE_MS);
    return () => window.clearInterval(id);
  }, [manualPaused]);

  const goPrev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + EXPERTS.length) % EXPERTS.length);
  }, []);

  const goNext = useCallback(() => {
    setActiveIndex((i) => (i + 1) % EXPERTS.length);
  }, []);

  const handleCardActivate = useCallback(
    (index: number) => {
      if (manualPaused && activeIndex === index) {
        setManualPaused(false);
        return;
      }
      setManualPaused(true);
      setActiveIndex(index);
    },
    [manualPaused, activeIndex]
  );

  return (
    <section
      id="experts"
      className={cn(
        "mx-auto w-full max-w-screen-2xl px-4 py-10 sm:px-6 sm:py-12 lg:px-10 lg:py-16",
        className
      )}
    >
      <div>
        <div className="relative mx-auto w-full max-w-[min(100%,85rem)] px-2 sm:px-14">
          <h2 className="pr-24 text-center font-bold tracking-tight text-brand-black sm:pr-28">
            <WaveRevealHeadlineLines
              lines={[HEADLINE]}
              className="block text-center"
              lineClassName="text-[clamp(1.75rem,6.5vw,110px)] leading-[1.05]"
            />
          </h2>

          <WaveRevealFadeUp
            delay={cardsDelayBase}
            className="absolute right-2 top-1/2 flex -translate-y-1/2 gap-2 sm:right-4 lg:right-6"
          >
            <button
              type="button"
              onClick={goPrev}
              className={cn(
                "inline-flex size-10 items-center justify-center rounded-xl transition",
              "bg-brand-dark-purple text-white hover:bg-brand-dark-purple/85",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark-purple/50"
              )}
              aria-label="Previous expert"
            >
              <ChevronLeft className="size-5" strokeWidth={2} aria-hidden />
            </button>
            <button
              type="button"
              onClick={goNext}
              className={cn(
                "inline-flex size-10 items-center justify-center rounded-xl transition",
              "bg-brand-dark-purple text-white hover:bg-brand-dark-purple/85",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark-purple/50"
              )}
              aria-label="Next expert"
            >
              <ChevronRight className="size-5" strokeWidth={2} aria-hidden />
            </button>
          </WaveRevealFadeUp>
        </div>
      </div>

      <WaveRevealFadeUp delay={cardsDelayBase + 0.08} className="min-w-0 max-w-full">
        <ExpertCarouselTrack activeIndex={activeIndex} className="max-w-full">
          {EXPERTS.map((expert, i) => (
            <ExpertCard
              key={expert.name}
              expertIndex={i}
              name={expert.name}
              role={expert.role}
              image={expert.image}
              bio={expert.bio}
              socials={expert.socials}
              selected={i === activeIndex}
              onSelect={() => handleCardActivate(i)}
              priority={i <= 1}
            />
          ))}
        </ExpertCarouselTrack>
      </WaveRevealFadeUp>
    </section>
  );
}
