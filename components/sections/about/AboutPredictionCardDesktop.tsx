import { cn } from "@/lib/utils";

import type { AboutCardDatum } from "@/components/sections/about/about-card-data";

type AboutPredictionCardDesktopProps = {
  card: AboutCardDatum;
  titleTextSizeClassName: string;
  bodyTextSizeClassName: string;
  className?: string;
};

/** Portrait card from design: 345×430px on sm+ (stack animation uses measured size). */
export function AboutPredictionCardDesktop({
  card,
  titleTextSizeClassName,
  bodyTextSizeClassName,
  className,
}: AboutPredictionCardDesktopProps) {
  return (
    <article
      className={cn(
        "relative flex h-[430px] w-[345px] max-w-full flex-col overflow-hidden rounded-[1.25rem] sm:rounded-3xl",
        "shadow-sm ring-1 ring-black/[0.04]",
        card.fallbackClassName,
        className
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 select-none bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${card.backgroundImage})` }}
      />
      <div className="relative z-10 flex h-full min-h-0 flex-col justify-between p-6 sm:p-7">
        <h3
          className={cn(
            "max-w-[95%] shrink-0 tracking-tight",
            titleTextSizeClassName,
            card.titleClassName
          )}
        >
          {card.title}
        </h3>
        <p
          className={cn(
            "max-h-[52%] min-h-0 w-full overflow-y-auto text-pretty",
            bodyTextSizeClassName,
            card.bodyClassName
          )}
        >
          {card.body}
        </p>
      </div>
    </article>
  );
}
