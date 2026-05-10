"use client";

import { motion } from "framer-motion";

import { SECTION_TEXT_SIZES } from "@/components/constants/text-sizes";
import { cn } from "@/lib/utils";

type UserFlowSectionHeadingProps = {
  title: string;
  show: boolean;
  /** Typography branch matches parent section (mobile vs desktop layout). */
  textSizeVariant: "mobile" | "desktop";
};

export function UserFlowSectionHeading({ title, show, textSizeVariant }: UserFlowSectionHeadingProps) {
  const userFlowTextSizes = SECTION_TEXT_SIZES.userFlow;
  const headingSizeClass =
    textSizeVariant === "mobile" ? userFlowTextSizes.heading.mobile : userFlowTextSizes.heading.desktop;

  return (
    <motion.h2
      initial={{ opacity: 0, y: 36 }}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
      transition={{ duration: 0.55, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "relative z-30 mb-6 text-center font-bold leading-[1.02] tracking-tight text-brand-black sm:mb-8 lg:mb-10",
        headingSizeClass
      )}
    >
      {title}
    </motion.h2>
  );
}
