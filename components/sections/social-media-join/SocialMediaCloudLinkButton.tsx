"use client";

import { useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SocialMediaCloudLinkButtonProps = {
  label: string;
  href: string;
  imageSrc: string;
  disabled?: boolean;
  baseRotateDeg: number;
  floatDurationSec: number;
  floatDelaySec?: number;
  className?: string;
};

export function SocialMediaCloudLinkButton({
  label,
  href,
  imageSrc,
  disabled = false,
  baseRotateDeg,
  floatDurationSec,
  floatDelaySec = 0,
  className,
}: SocialMediaCloudLinkButtonProps) {
  const floatingTransition = useMemo(
    () => ({
      duration: floatDurationSec,
      repeat: Infinity,
      repeatType: "mirror" as const,
      ease: "easeInOut" as const,
      delay: floatDelaySec,
    }),
    [floatDelaySec, floatDurationSec]
  );

  return (
    <motion.div
      animate={{
        x: [0, 5, -3, 0],
        y: [0, -8, 4, 0],
        rotate: [baseRotateDeg, baseRotateDeg + 2.5, baseRotateDeg - 2, baseRotateDeg],
      }}
      whileHover={{ scale: 1.14 }}
      transition={{
        x: floatingTransition,
        y: floatingTransition,
        rotate: floatingTransition,
        scale: { type: "spring", stiffness: 210, damping: 20, mass: 0.7 },
      }}
      className={cn("absolute transform-gpu will-change-transform", className)}
    >
      <Button
        type="button"
        variant="ghost"
        size="default"
        disabled={disabled}
        onClick={
          disabled
            ? undefined
            : () => {
                window.open(href, "_blank", "noopener,noreferrer");
              }
        }
        className={cn(
          "relative h-[200px] w-[200px] overflow-hidden rounded-full p-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          "!bg-transparent hover:!bg-transparent",
          disabled && "cursor-not-allowed"
        )}
        aria-label={label}
      >
        <Image src={imageSrc} alt={label} fill className="object-cover" sizes="200px" />
      </Button>
    </motion.div>
  );
}
