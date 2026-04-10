import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type ExpertCarouselTrackProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Horizontal scroll container for expert cards. Scrolling is fully user-controlled
 * (touch, trackpad, scrollbar); no programmatic scroll alignment.
 */
export function ExpertCarouselTrack({ children, className }: ExpertCarouselTrackProps) {
  return (
    <div
      role="group"
      aria-label="Team members"
      className={cn(
        "flex w-full min-w-0 gap-4",
        "pt-14 pb-5",
        "snap-x snap-mandatory overflow-x-auto overscroll-x-contain",
        "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        className
      )}
    >
      {children}
    </div>
  );
}
