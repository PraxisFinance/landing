import { ArrowRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const JOIN_BG = "/main/join-section.png";

type JoinSectionProps = {
  className?: string;
};

export function JoinSection({ className }: JoinSectionProps) {
  return (
    <section
      className={cn(
        "mx-auto w-full max-w-screen-2xl px-4 pb-2 pt-6 sm:px-6 sm:pb-3 sm:pt-8 lg:px-10 lg:pt-10",
        className
      )}
    >
      <div
        className={cn(
          "relative min-h-[28rem] overflow-hidden rounded-[2rem] sm:min-h-[32rem] sm:rounded-[2.25rem] md:min-h-[36rem] lg:min-h-[40rem]"
        )}
      >
        <div
          aria-hidden
          className="absolute inset-0 z-0 bg-cover bg-bottom bg-no-repeat pointer-events-none select-none"
          style={{ backgroundImage: `url(${JOIN_BG})` }}
        />

        <div
          aria-hidden
          className={cn(
            "absolute inset-0 z-[1] bg-gradient-to-b from-transparent to-brand-light-purple",
            "pointer-events-none"
          )}
        />

        <div className="relative z-10 flex flex-col items-center px-5 pt-7 text-center sm:px-8 sm:pt-9 md:pt-10 lg:pt-12 pb-16 sm:pb-20 md:pb-24">
          <h1 className="max-w-5xl text-balance font-bold leading-[1.05] tracking-tight text-brand-black">
            <span className="block text-4xl sm:text-5xl lg:text-6xl xl:text-[3.5rem]">
              Predict with yield.
            </span>
            <span className="mt-1 block text-4xl sm:text-5xl lg:text-6xl xl:text-[3.5rem]">
              Keep your principal.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-base leading-snug text-brand-black sm:text-lg md:mt-8">
            Praxis lets you deposit to a vault, earn yield, and place predictions using yield.
          </p>

          <Button
            nativeButton={false}
            render={<a href="#" />}
            size="lg"
            className={cn(
              "mt-8 h-12 gap-2 rounded-xl px-8 text-base font-semibold shadow-none sm:mt-10",
              "bg-brand-black text-white hover:bg-brand-black/90",
              "focus-visible:ring-brand-dark-purple/40"
            )}
          >
            Join Waitlist
            <ArrowRightIcon className="size-4 shrink-0" strokeWidth={1.75} aria-hidden />
          </Button>
        </div>
      </div>
    </section>
  );
}
