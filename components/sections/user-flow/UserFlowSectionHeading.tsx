"use client";

import { motion } from "framer-motion";

import { SECTION_TEXT_SIZES } from "@/components/constants/text-sizes";
import { useIsMobile } from "@/components/providers/mobile-context";
import { cn } from "@/lib/utils";

type UserFlowSectionHeadingProps = {
  title: string;
  show: boolean;
};

export function UserFlowSectionHeading({ title, show }: UserFlowSectionHeadingProps) {
  const isMobile = useIsMobile();
  const userFlowTextSizes = SECTION_TEXT_SIZES.userFlow;

  return (
    <motion.h2
      initial={{ opacity: 0, y: 36 }}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
      transition={{ duration: 0.55, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "relative z-30 mb-6 text-center font-bold leading-[1.02] tracking-tight text-brand-black sm:mb-8 lg:mb-10",
        isMobile ? userFlowTextSizes.heading.mobile : userFlowTextSizes.heading.desktop
      )}
    >
      {title}
    </motion.h2>
  );
}
