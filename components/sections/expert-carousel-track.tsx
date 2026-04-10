"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, type ReactNode } from "react";

import { cn } from "@/lib/utils";

const SCROLL_PAD_PX = 12;

/** Horizontal scroll duration when aligning the active card (ease-in-out). */
const SMOOTH_SCROLL_MS = 780;
/** Extra time to ignore IntersectionObserver while scroll animation runs. */
const IO_SUPPRESS_BUFFER_MS = 120;

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
}

function getScrollDeltaToRevealCard(container: HTMLElement, card: HTMLElement): number {
  const cr = container.getBoundingClientRect();
  const kr = card.getBoundingClientRect();

  if (kr.width <= 0) return 0;

  const inner = cr.width - 2 * SCROLL_PAD_PX;
  if (kr.width >= inner) {
    return kr.left - cr.left - SCROLL_PAD_PX;
  }

  if (kr.left >= cr.left + SCROLL_PAD_PX && kr.right <= cr.right - SCROLL_PAD_PX) {
    return 0;
  }

  if (kr.left < cr.left + SCROLL_PAD_PX) {
    return kr.left - cr.left - SCROLL_PAD_PX;
  }
  if (kr.right > cr.right - SCROLL_PAD_PX) {
    return kr.right - cr.right + SCROLL_PAD_PX;
  }
  return 0;
}

type ExpertCarouselTrackProps = {
  activeIndex: number;
  children: ReactNode;
  className?: string;
};

/**
 * Horizontal row. Scroll moves only when the active card is not fully visible
 * inside the scrollport (after index change, resize, or when it scrolls out of view).
 */
export function ExpertCarouselTrack({ activeIndex, children, className }: ExpertCarouselTrackProps) {
  const ref = useRef<HTMLDivElement>(null);
  /** Skip IO reactions briefly after we scroll due to activeIndex (avoid fighting smooth scroll). */
  const suppressIoUntilRef = useRef(0);
  const scrollRafRef = useRef<number>(0);

  const cancelScrollAnimation = useCallback(() => {
    if (scrollRafRef.current !== 0) {
      cancelAnimationFrame(scrollRafRef.current);
      scrollRafRef.current = 0;
    }
  }, []);

  const applyScrollDelta = useCallback(
    (delta: number, mode: "smooth" | "instant") => {
      const container = ref.current;
      if (!container || delta === 0) return;

      cancelScrollAnimation();

      if (mode === "instant") {
        const max = container.scrollWidth - container.clientWidth;
        container.scrollLeft = Math.max(0, Math.min(max, container.scrollLeft + delta));
        return;
      }

      const start = container.scrollLeft;
      const maxScroll = container.scrollWidth - container.clientWidth;
      const target = Math.max(0, Math.min(maxScroll, start + delta));
      const travel = target - start;
      if (Math.abs(travel) < 0.5) return;

      const t0 = performance.now();

      const tick = (now: number) => {
        const t = Math.min(1, (now - t0) / SMOOTH_SCROLL_MS);
        const eased = easeInOutCubic(t);
        if (!ref.current) return;
        ref.current.scrollLeft = start + travel * eased;
        if (t < 1) {
          scrollRafRef.current = requestAnimationFrame(tick);
        } else {
          scrollRafRef.current = 0;
        }
      };

      scrollRafRef.current = requestAnimationFrame(tick);
    },
    [cancelScrollAnimation]
  );

  const scrollActiveIntoViewIfNeeded = useCallback(
    (mode: "smooth" | "instant") => {
      const container = ref.current;
      if (!container) return;
      const card = container.querySelector<HTMLElement>(`[data-expert-index="${activeIndex}"]`);
      if (!card) return;

      const delta = getScrollDeltaToRevealCard(container, card);
      applyScrollDelta(delta, mode);
    },
    [activeIndex, applyScrollDelta]
  );

  useLayoutEffect(() => {
    suppressIoUntilRef.current = performance.now() + SMOOTH_SCROLL_MS + IO_SUPPRESS_BUFFER_MS;
    scrollActiveIntoViewIfNeeded("smooth");
  }, [activeIndex, scrollActiveIntoViewIfNeeded]);

  useEffect(() => {
    return () => cancelScrollAnimation();
  }, [cancelScrollAnimation]);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    let resizeTick: number | null = null;
    const onResize = () => {
      if (resizeTick !== null) cancelAnimationFrame(resizeTick);
      resizeTick = requestAnimationFrame(() => {
        resizeTick = null;
        scrollActiveIntoViewIfNeeded("instant");
      });
    };

    const ro = new ResizeObserver(onResize);
    ro.observe(container);
    window.addEventListener("resize", onResize);

    let io: IntersectionObserver | null = null;

    const attachIo = () => {
      io?.disconnect();
      const card = container.querySelector<HTMLElement>(`[data-expert-index="${activeIndex}"]`);
      if (!card) return;

      io = new IntersectionObserver(
        (entries) => {
          if (performance.now() < suppressIoUntilRef.current) return;
          const e = entries[0];
          if (!e) return;
          if (e.isIntersecting && e.intersectionRatio >= 1 - 1e-4) return;

          const delta = getScrollDeltaToRevealCard(container, card);
          if (delta === 0) return;

          suppressIoUntilRef.current = performance.now() + SMOOTH_SCROLL_MS + IO_SUPPRESS_BUFFER_MS;
          applyScrollDelta(delta, "smooth");
        },
        { root: container, threshold: [1] }
      );
      io.observe(card);
    };

    attachIo();

    return () => {
      if (resizeTick !== null) cancelAnimationFrame(resizeTick);
      ro.disconnect();
      window.removeEventListener("resize", onResize);
      io?.disconnect();
    };
  }, [activeIndex, applyScrollDelta, scrollActiveIntoViewIfNeeded]);

  return (
    <div
      ref={ref}
      role="group"
      aria-label="Team members"
      className={cn(
        "flex w-full min-w-0 gap-4",
        /* Space for lifted cards (-translate-y-12) + shadow */
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
