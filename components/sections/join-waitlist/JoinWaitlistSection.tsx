"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRightIcon, CircleHelp } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

import {
  JOIN_WAITLIST_BASEAPP_APP_TEXT,
  JOIN_WAITLIST_BASEAPP_BASE_TEXT,
  JOIN_WAITLIST_BG_CIRCLE_COUNT,
  JOIN_WAITLIST_BG_CIRCLE_PX,
  JOIN_WAITLIST_BUTTON_TEXT,
  JOIN_WAITLIST_HEADLINE_LINES,
  JOIN_WAITLIST_HELP_LABEL,
  JOIN_WAITLIST_IMAGE,
  JOIN_WAITLIST_INPUT_PLACEHOLDER,
  JOIN_WAITLIST_SUBTEXT,
} from "@/components/constants/join-waitlist-section";
import { JoinWaitlistAcceptedState } from "@/components/sections/join-waitlist/JoinWaitlistAcceptedState";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type JoinWaitlistSectionProps = {
  className?: string;
};

export function JoinWaitlistSection({ className }: JoinWaitlistSectionProps) {
  const [walletAddress, setWalletAddress] = useState("");
  const [isAddressAccepted, setIsAddressAccepted] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [shouldAnimateIn, setShouldAnimateIn] = useState(false);

  useEffect(() => {
    const checkVisibility = () => {
      const node = cardRef.current;
      if (!node || shouldAnimateIn) return;
      const rect = node.getBoundingClientRect();
      const isVisible = rect.top <= window.innerHeight * 0.78 && rect.bottom >= 0;
      if (isVisible) {
        setShouldAnimateIn(true);
      }
    };

    checkVisibility();
    window.addEventListener("scroll", checkVisibility, { passive: true });
    return () => window.removeEventListener("scroll", checkVisibility);
  }, [shouldAnimateIn]);

  return (
    <section
      id="join-waitlist"
      className={cn(
        "mx-auto w-full max-w-screen-2xl px-4 pb-5 pt-3 sm:px-6 sm:pb-6 sm:pt-4 lg:px-10 lg:pb-8 lg:pt-5",
        className
      )}
    >
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 46 }}
        animate={shouldAnimateIn ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
        transition={{ delay: 0.34, duration: 1.25, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "relative flex h-[450px] flex-col overflow-hidden rounded-[1.75rem] sm:rounded-[2rem]",
          "bg-brand-gray shadow-sm ring-1 ring-black/[0.06]"
        )}
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <div
            className={cn(
              "absolute right-0 top-1/2 grid shrink-0 -translate-y-1/2 grid-cols-5 grid-rows-2 gap-3 sm:gap-4",
              "max-[1050px]:scale-[0.55] max-sm:scale-[0.32] max-sm:origin-right"
            )}
          >
            {Array.from({ length: JOIN_WAITLIST_BG_CIRCLE_COUNT }, (_, i) => (
              <div
                key={i}
                className="shrink-0 rounded-full bg-white opacity-25 sm:opacity-30"
                style={{ width: JOIN_WAITLIST_BG_CIRCLE_PX, height: JOIN_WAITLIST_BG_CIRCLE_PX }}
              />
            ))}
          </div>
        </div>

        <div
          className={cn(
            "relative z-10 flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto overflow-x-hidden p-[50px]",
            "lg:flex-row lg:items-stretch lg:gap-6 lg:overflow-hidden"
          )}
        >
          <div className="flex min-w-0 flex-1 flex-col lg:max-w-xl lg:py-1">
            <h2 className="ui-headline-2 text-balance text-brand-black">
              {JOIN_WAITLIST_HEADLINE_LINES.join(" ")}
            </h2>

            <p className="ui-text-3 mt-3 max-w-lg text-pretty text-brand-black/70 sm:mt-4">
              {JOIN_WAITLIST_SUBTEXT}
            </p>

            <div className="mt-4 w-full max-w-md sm:mt-5">
              {isAddressAccepted ? (
                <JoinWaitlistAcceptedState />
              ) : (
                <form
                  className="flex flex-col gap-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!walletAddress.trim()) return;
                    setIsAddressAccepted(true);
                  }}
                >
                  <div className="relative w-full">
                    <Input
                      type="text"
                      name="walletAddress"
                      autoComplete="off"
                      value={walletAddress}
                      onChange={(e) => setWalletAddress(e.target.value)}
                      placeholder={JOIN_WAITLIST_INPUT_PLACEHOLDER}
                      className={cn(
                        "h-11 rounded-lg border-0 bg-white px-4 pr-11 text-base shadow-sm ring-1 ring-black/[0.06]",
                        "placeholder:text-brand-black/35",
                        "focus-visible:ring-2 focus-visible:ring-brand-dark-purple/35"
                      )}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      className={cn(
                        "absolute right-3 top-1/2 -translate-y-1/2 rounded-full text-brand-black/40",
                        "transition hover:text-brand-black/60",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-dark-purple/40"
                      )}
                      aria-label={JOIN_WAITLIST_HELP_LABEL}
                    >
                      <CircleHelp className="size-5" strokeWidth={1.75} />
                    </Button>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className={cn(
                      "h-11 w-full gap-2 rounded-lg px-7 text-base font-semibold shadow-none sm:w-auto sm:self-start",
                      "bg-brand-black text-white hover:bg-brand-black/90",
                      "focus-visible:ring-brand-dark-purple/40"
                    )}
                  >
                    {JOIN_WAITLIST_BUTTON_TEXT}
                    <ArrowRightIcon className="size-5 shrink-0" strokeWidth={1.75} aria-hidden />
                  </Button>
                </form>
              )}
            </div>

            <div className="mt-auto flex items-end gap-2 pt-5 sm:pt-6">
              <span className="size-7 shrink-0 rounded-xs bg-[#0052FF]" aria-hidden />
              <span className="flex flex lowercase tracking-tight text-brand-black leading-none">
                <span className="ui-text-2">{JOIN_WAITLIST_BASEAPP_BASE_TEXT}</span>
                <span className="ui-text-3">{JOIN_WAITLIST_BASEAPP_APP_TEXT}</span>
              </span>
            </div>
          </div>

          <div
            className={cn(
              "relative flex min-h-0 w-full flex-1 flex-col",
              "lg:flex-[1.15] lg:self-stretch"
            )}
          >
            <div className="relative h-full w-full min-h-0 flex-1">
              <Image
                src={JOIN_WAITLIST_IMAGE}
                alt="Praxis app on a handheld device"
                fill
                className="object-contain object-left"
                sizes="(max-width: 1024px) 100vw, 45vw"
                priority={false}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
