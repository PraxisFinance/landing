"use client";

import { motion } from "framer-motion";

import type { JoinGetStartedCommunityLink } from "@/components/constants/join-get-started-section";
import { SocialMediaCloudLinkButton } from "@/components/sections/social-media-join/SocialMediaCloudLinkButton";
import { cn } from "@/lib/utils";

type SocialMediaCloudPanelProps = {
  links: JoinGetStartedCommunityLink[];
  revealDelay: number;
};

const SOCIAL_IMAGE_BY_LABEL: Record<string, string> = {
  Twitter: "/social-media/x.png",
  Discord: "/social-media/discord.png",
  Telegram: "/social-media/tg.png",
  Reddit: "/social-media/reddit.png",
};

const FLOAT_BY_LABEL: Record<string, { rotate: number; duration: number; delay: number }> = {
  Twitter: { rotate: -4, duration: 4.6, delay: 0 },
  Discord: { rotate: 5, duration: 4.2, delay: 0.25 },
  Telegram: { rotate: -3, duration: 4.9, delay: 0.15 },
  Reddit: { rotate: 4, duration: 5.2, delay: 0.35 },
};

const POSITION_BY_LABEL: Record<string, string> = {
  Twitter: "left-[14%] top-[2%] z-30",
  Discord: "right-[14%] top-[1%] z-20",
  Telegram: "left-[30%] bottom-[0%] z-10",
  Reddit: "right-[8%] bottom-[1%] z-40",
};

export function SocialMediaCloudPanel({ links, revealDelay }: SocialMediaCloudPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: revealDelay, ease: [0.22, 1, 0.36, 1] }}
      className={cn("relative flex h-full min-h-[14rem] w-full items-center justify-center p-2 lg:min-h-[min(20rem,45vh)]")}
    >
      <div className="relative h-full min-h-[18.5rem] w-full max-w-[44rem]">
        {links.map((item) => {
          const floatConfig = FLOAT_BY_LABEL[item.label] ?? { rotate: 0, duration: 4.8, delay: 0 };
          const positionClassName = POSITION_BY_LABEL[item.label] ?? "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2";
          const imageSrc = SOCIAL_IMAGE_BY_LABEL[item.label];
          if (!imageSrc) return null;

          return (
            <SocialMediaCloudLinkButton
              key={item.label}
              label={item.label}
              href={item.href}
              imageSrc={imageSrc}
              disabled={item.label !== "Twitter"}
              baseRotateDeg={floatConfig.rotate}
              floatDurationSec={floatConfig.duration}
              floatDelaySec={floatConfig.delay}
              className={positionClassName}
            />
          );
        })}
      </div>
    </motion.div>
  );
}
