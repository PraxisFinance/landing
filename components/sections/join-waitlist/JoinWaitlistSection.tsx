"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRightIcon, CircleHelp } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

import {
  JOIN_WAITLIST_BASEAPP_APP_TEXT,
  JOIN_WAITLIST_BASEAPP_BASE_TEXT,
  JOIN_WAITLIST_BG_CIRCLE_COUNT_DESKTOP,
  JOIN_WAITLIST_BG_CIRCLE_COUNT_MOBILE,
  JOIN_WAITLIST_BG_CIRCLE_PX_DESKTOP,
  JOIN_WAITLIST_BG_CIRCLE_PX_MOBILE,
  JOIN_WAITLIST_BUTTON_TEXT,
  JOIN_WAITLIST_HEADLINE_LINES,
  JOIN_WAITLIST_HELP_LABEL,
  JOIN_WAITLIST_IMAGE,
  JOIN_WAITLIST_INPUT_PLACEHOLDER,
  JOIN_WAITLIST_SUBTEXT,
} from "@/components/constants/join-waitlist-section";
import { SECTION_TEXT_SIZES } from "@/components/constants/text-sizes";
import { useIsMobile } from "@/components/providers/mobile-context";
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
  const isMobile = useIsMobile();
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [shouldAnimateIn, setShouldAnimateIn] = useState(false);
  const joinWaitlistTextSizes = SECTION_TEXT_SIZES.joinWaitlist;
  const backgroundCircleCount = isMobile
    ? JOIN_WAITLIST_BG_CIRCLE_COUNT_MOBILE
    : JOIN_WAITLIST_BG_CIRCLE_COUNT_DESKTOP;
  const backgroundCirclePx = isMobile
    ? JOIN_WAITLIST_BG_CIRCLE_PX_MOBILE
    : JOIN_WAITLIST_BG_CIRCLE_PX_DESKTOP;

  const handleJoinWaitlist = () => {
    if (!walletAddress.trim()) return;
    setIsAddressAccepted(true);
  };

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
        "mx-auto w-full max-w-screen-2xl p-5 md:p-10",
        className
      )}
    >
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 46 }}
        animate={shouldAnimateIn ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
        transition={{ delay: 0.34, duration: 1.25, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "relative flex min-h-[450px] flex-col overflow-hidden rounded-[1.75rem] sm:rounded-[2rem] md:h-[450px]",
          "bg-brand-gray shadow-sm ring-1 ring-black/[0.06]"
        )}
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <div
            className={cn(
              "absolute inset-0 flex",
              isMobile ? "items-center justify-center" : "items-center justify-end"
            )}
          >
            <div
              className={cn(
                "grid shrink-0 gap-4 sm:gap-5",
                isMobile ? "grid-cols-3 grid-rows-2" : "grid-cols-5 grid-rows-2"
              )}
            >
              {Array.from({ length: backgroundCircleCount }, (_, i) => (
                <div
                  key={i}
                  className="shrink-0 rounded-full bg-white opacity-25 sm:opacity-30"
                  style={{ width: backgroundCirclePx, height: backgroundCirclePx }}
                />
              ))}
            </div>
          </div>
        </div>

        <div
          className={cn(
            "relative z-10 flex min-h-0 flex-1 flex-col gap-0 overflow-y-auto overflow-x-hidden px-5 py-6 md:gap-6 md:overflow-hidden md:p-[50px]",
            "md:flex-row md:items-stretch md:gap-6"
          )}
        >
          <div className="flex min-w-0 flex-col text-center md:max-w-xl md:flex-1 md:py-1 md:text-left">
            <h2
              className={cn(
                "text-balance text-brand-black",
                isMobile ? joinWaitlistTextSizes.title.mobile : joinWaitlistTextSizes.title.desktop
              )}
            >
              {JOIN_WAITLIST_HEADLINE_LINES.join(" ")}
            </h2>

            <p
              className={cn(
                "mt-3 max-w-lg text-pretty text-brand-black/70 md:mt-4",
                isMobile
                  ? joinWaitlistTextSizes.description.mobile
                  : joinWaitlistTextSizes.description.desktop
              )}
            >
              {JOIN_WAITLIST_SUBTEXT}
            </p>

            <div className="mt-4 mb-2 w-full max-w-md text-left sm:mt-5 md:mb-0">
              {isAddressAccepted ? (
                <JoinWaitlistAcceptedState />
              ) : (
                <form
                  className="flex flex-col gap-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleJoinWaitlist();
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
                      "hidden h-11 w-full gap-2 rounded-lg px-7 text-base font-semibold shadow-none md:inline-flex md:w-auto md:self-start",
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

            <div className="mt-auto hidden items-end gap-2 pt-5 md:flex md:pt-6">
              <span className="size-7 shrink-0 rounded-xs bg-[#0052FF]" aria-hidden />
              <span className="flex flex lowercase tracking-tight text-brand-black leading-none">
                <span className="ui-text-2">{JOIN_WAITLIST_BASEAPP_BASE_TEXT}</span>
                <span className="ui-text-3">{JOIN_WAITLIST_BASEAPP_APP_TEXT}</span>
              </span>
            </div>
          </div>

          <div
            className={cn(
              "relative flex min-h-0 w-full flex-col",
              "md:flex-[1.15] md:self-stretch"
            )}
          >
            {isMobile ? (
              <div className="flex h-[315px] w-full items-center justify-center">
                <Image
                  src={JOIN_WAITLIST_IMAGE}
                  alt="Praxis app on a handheld device"
                  width={315}
                  height={315}
                  className="h-[315px] w-[315px] max-w-full object-contain"
                  priority={false}
                />
              </div>
            ) : (
              <div className="relative h-full w-full min-h-0 flex-1">
                <Image
                  src={JOIN_WAITLIST_IMAGE}
                  alt="Praxis app on a handheld device"
                  fill
                  className="object-contain object-left"
                  sizes="45vw"
                  priority={false}
                />
              </div>
            )}
          </div>

          {!isAddressAccepted && (
            <Button
              type="button"
              size="lg"
              className={cn(
                "h-11 w-full gap-2 rounded-lg px-7 text-base font-semibold shadow-none md:hidden",
                "bg-brand-black text-white hover:bg-brand-black/90",
                "focus-visible:ring-brand-dark-purple/40"
              )}
              onClick={handleJoinWaitlist}
            >
              {JOIN_WAITLIST_BUTTON_TEXT}
              <ArrowRightIcon className="size-5 shrink-0" strokeWidth={1.75} aria-hidden />
            </Button>
          )}

          <div className="flex items-end justify-center gap-2 pt-2 text-center md:hidden">
            <span className="size-7 shrink-0 rounded-xs bg-[#0052FF]" aria-hidden />
            <span className="flex flex lowercase leading-none tracking-tight text-brand-black">
              <span className="ui-text-2">{JOIN_WAITLIST_BASEAPP_BASE_TEXT}</span>
              <span className="ui-text-3">{JOIN_WAITLIST_BASEAPP_APP_TEXT}</span>
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
