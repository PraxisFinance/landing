"use client";

import { motion } from "framer-motion";

import type { JoinGetStartedCommunityLink } from "@/components/constants/join-get-started-section";
import { useIsMobile } from "@/components/providers/mobile-context";
import { SocialMediaCloudLinkButton } from "@/components/sections/social-media-join/SocialMediaCloudLinkButton";
import { cn } from "@/lib/utils";

type SocialMediaCloudPanelProps = {
  links: JoinGetStartedCommunityLink[];
  revealDelay: number;
  className?: string;
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
  Twitter: "left-[9%] top-[-4%] z-30",
  Discord: "right-[9%] top-[-5%] z-20",
  Telegram: "left-[25%] bottom-[-5%] z-10",
  Reddit: "right-[3%] bottom-[-4%] z-40",
};

export function SocialMediaCloudPanel({ links, revealDelay, className }: SocialMediaCloudPanelProps) {
  const isMobile = useIsMobile();

  const linkButtons = links.map((item) => {
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
        disabled={item.href === "#"}
        baseRotateDeg={floatConfig.rotate}
        floatDurationSec={floatConfig.duration}
        floatDelaySec={floatConfig.delay}
        className={isMobile ? undefined : positionClassName}
        rowLayout={isMobile}
      />
    );
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: revealDelay, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "relative flex h-full min-h-[14rem] w-full min-w-0 items-center justify-center p-2 lg:min-h-[min(20rem,45vh)]",
        "max-md:min-h-0 max-md:items-start max-md:justify-center max-md:overflow-visible max-md:p-0",
        "max-md:-mb-[15px]",
        className
      )}
    >
      {isMobile ? (
        <div
          className={cn(
            "flex min-w-0 justify-center overflow-hidden",
            "-mx-[15px] w-[calc(100%+30px)]",
            "h-[6rem] items-start"
          )}
        >
          <div
            className={cn(
              "flex w-full min-w-0 flex-row flex-nowrap items-start justify-center gap-0 py-0",
              "[&>*:nth-child(1)]:z-10 [&>*:nth-child(2)]:z-20 [&>*:nth-child(3)]:z-30 [&>*:nth-child(4)]:z-40 [&>*+*]:-ml-8"
            )}
          >
            {linkButtons}
          </div>
        </div>
      ) : (
        <div className="relative h-full min-h-[18.5rem] w-full max-w-[44rem]">{linkButtons}</div>
      )}
    </motion.div>
  );
}
