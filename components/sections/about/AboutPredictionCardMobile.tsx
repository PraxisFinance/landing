import { cn } from "@/lib/utils";

import type { AboutCardDatum } from "@/components/sections/about/about-card-data";

type AboutPredictionCardMobileProps = {
  card: AboutCardDatum;
  titleTextSizeClassName: string;
  bodyTextSizeClassName: string;
  className?: string;
};

const DEFAULT_MOBILE_BG_SIZE = "62% auto";
const DEFAULT_MOBILE_BG_POSITION = "right -64% center";

/** Portrait stack: fixed height row in About section (mobile). */
export function AboutPredictionCardMobile({
  card,
  titleTextSizeClassName,
  bodyTextSizeClassName,
  className,
}: AboutPredictionCardMobileProps) {
  const mobileBackgroundSize = card.mobileBackgroundSize ?? DEFAULT_MOBILE_BG_SIZE;
  const mobileBackgroundPosition = card.mobileBackgroundPosition ?? DEFAULT_MOBILE_BG_POSITION;

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
        className="pointer-events-none absolute inset-0 z-0 select-none bg-no-repeat"
        style={{
          backgroundImage: `url(${card.backgroundImage})`,
          backgroundSize: mobileBackgroundSize,
          backgroundPosition: mobileBackgroundPosition,
        }}
      />
      <div className="relative z-10 flex h-full min-h-0 flex-col justify-start gap-[9px] pt-[17px] pl-[17px] pr-0 pb-0">
        <h3
          className={cn(
            "max-w-full shrink-0 tracking-tight",
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
