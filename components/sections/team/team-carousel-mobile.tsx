import { forwardRef, type ReactNode } from "react";

import { cn } from "@/lib/utils";

type TeamCarouselMobileProps = {
  children: ReactNode;
  className?: string;
  onScroll?: React.UIEventHandler<HTMLDivElement>;
};

/** Horizontal snap carousel for mobile — explicit row + touch scrolling. */
export const TeamCarouselMobile = forwardRef<HTMLDivElement, TeamCarouselMobileProps>(
  function TeamCarouselMobile({ children, className, onScroll }, ref) {
    return (
      <div
        ref={ref}
        role="group"
        aria-label="Team members"
        onScroll={onScroll}
        className={cn(
          "flex w-full min-w-0 flex-row flex-nowrap items-stretch gap-4",
          "touch-pan-x overflow-x-auto overscroll-x-contain",
          "snap-x snap-mandatory scroll-smooth",
          "scroll-px-4 pb-5 pt-2 sm:scroll-px-6",
          "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          className
        )}
      >
        {children}
      </div>
    );
  }
);
