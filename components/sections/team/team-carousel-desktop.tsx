import { forwardRef, type ReactNode } from "react";

import { cn } from "@/lib/utils";

type TeamCarouselDesktopProps = {
  children: ReactNode;
  className?: string;
  onScroll?: React.UIEventHandler<HTMLDivElement>;
};

/** Horizontal scroll track for desktop team cards (stack → spread animation). */
export const TeamCarouselDesktop = forwardRef<HTMLDivElement, TeamCarouselDesktopProps>(
  function TeamCarouselDesktop({ children, className, onScroll }, ref) {
    return (
      <div
        ref={ref}
        role="group"
        aria-label="Team members"
        onScroll={onScroll}
        className={cn(
          "flex w-full min-w-0 flex-nowrap gap-4",
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
