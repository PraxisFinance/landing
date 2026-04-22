import { forwardRef, type ReactNode } from "react";

import { cn } from "@/lib/utils";

type TeamCarouselTrackProps = {
  children: ReactNode;
  className?: string;
  onScroll?: React.UIEventHandler<HTMLDivElement>;
};

export const TeamCarouselTrack = forwardRef<HTMLDivElement, TeamCarouselTrackProps>(
  function TeamCarouselTrack({ children, className, onScroll }, ref) {
    return (
      <div
        ref={ref}
        role="group"
        aria-label="Team members"
        onScroll={onScroll}
        className={cn(
          "flex w-full min-w-0 gap-4",
          "pb-5 pt-2 md:pt-14",
          "snap-x snap-mandatory overflow-x-auto overscroll-x-contain",
          "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          className
        )}
      >
        {children}
      </div>
    );
  }
);
