import { cn } from "@/lib/utils";

export type FirstPredictionCardProps = {
  title: string;
  body: string;
  backgroundImage: string;
  fallbackClassName: string;
  titleClassName: string;
  bodyClassName: string;
  className?: string;
};

/** Portrait card from design: 345×400px */
export function FirstPredictionCard({
  title,
  body,
  backgroundImage,
  fallbackClassName,
  titleClassName,
  bodyClassName,
  className,
}: FirstPredictionCardProps) {
  return (
    <article
      className={cn(
        "relative flex h-[430px] w-[345px] max-w-full flex-col overflow-hidden rounded-[1.25rem] sm:rounded-3xl",
        "shadow-sm ring-1 ring-black/[0.04]",
        fallbackClassName,
        className
      )}
    >
      <div
        aria-hidden
        className={cn(
          "absolute inset-0 z-0 bg-cover bg-center bg-no-repeat",
          "pointer-events-none select-none"
        )}
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className="relative z-10 flex h-full min-h-0 flex-col justify-between p-6 sm:p-7">
        <h3 className={cn("ui-text-2 max-w-[95%] shrink-0 tracking-tight", titleClassName)}>
          {title}
        </h3>
        <p
          className={cn(
            "ui-text-6 max-h-[52%] min-h-0 w-full overflow-y-auto text-pretty",
            bodyClassName
          )}
        >
          {body}
        </p>
      </div>
    </article>
  );
}
