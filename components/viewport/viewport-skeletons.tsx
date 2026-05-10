import { cn } from "@/lib/utils";

/** Reserve chrome height before viewport branch resolves (avoids desktop flash on mobile). */
export function LandingHeaderViewportSkeleton() {
  return (
    <header className="bg-brand-white px-5 sm:px-6 lg:px-10" aria-busy="true">
      <div className="relative z-40 mx-auto w-full max-w-screen-2xl py-4">
        <div className="flex items-center justify-between gap-3 md:grid md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:items-center">
          <div className="h-8 w-28 shrink-0 animate-pulse rounded-md bg-brand-gray/70 sm:h-9" />
          <div className="hidden h-9 animate-pulse rounded-md bg-brand-gray/60 md:col-start-2 md:block md:w-48 lg:w-56" />
          <div className="flex items-center justify-end gap-2 md:col-start-3">
            <div className="h-9 w-[9.5rem] animate-pulse rounded-md bg-brand-gray/70 md:h-10 md:w-40" />
            <div className="h-9 w-9 shrink-0 animate-pulse rounded-md bg-brand-gray md:hidden" />
          </div>
        </div>
      </div>
    </header>
  );
}

/** Matches Cover outer sizing so the hero slot doesn’t jump before branch resolves. */
export function CoverSectionViewportSkeleton({ className }: { className?: string }) {
  return (
    <section
      id="cover"
      className={cn("w-full px-0 pb-2 pt-6 sm:pb-3 sm:pt-8 lg:pt-10", className)}
      aria-busy="true"
    >
      <div className="relative min-h-[515px] overflow-hidden rounded-[2rem] bg-brand-gray/45 animate-pulse sm:rounded-[2.25rem] md:min-h-[36rem] lg:min-h-[40rem]" />
    </section>
  );
}

/** Footer shell matches flex layout; inner block reserves gray panel height. */
export function LandingFooterViewportSkeleton() {
  return (
    <footer className="mt-auto flex flex-col bg-brand-white lg:min-h-0 lg:flex-1" aria-busy="true">
      <div className="mx-auto flex w-full max-w-screen-2xl flex-1 flex-col px-0 md:px-[20px] sm:px-6 lg:min-h-0 lg:px-10">
        <div className="min-h-[260px] flex-1 rounded-t-[2rem] bg-brand-gray/45 animate-pulse lg:min-h-[416px]" />
      </div>
    </footer>
  );
}

type SectionViewportPlaceholderProps = {
  className?: string;
  /** Tailwind min-height utility */
  minHeightClass?: string;
};

/** Generic block while viewport is resolving (below-the-fold sections). */
export function SectionViewportPlaceholder({
  className,
  minHeightClass = "min-h-[280px]",
}: SectionViewportPlaceholderProps) {
  return (
    <div
      className={cn("w-full animate-pulse rounded-3xl bg-brand-gray/35", minHeightClass, className)}
      aria-busy="true"
    />
  );
}
