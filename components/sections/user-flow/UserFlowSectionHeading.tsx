"use client";

import { motion } from "framer-motion";

type UserFlowSectionHeadingProps = {
  title: string;
  show: boolean;
};

export function UserFlowSectionHeading({ title, show }: UserFlowSectionHeadingProps) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 36 }}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
      transition={{ duration: 0.55, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-30 mb-8 text-center text-[clamp(2rem,6vw,6rem)] font-bold leading-[1.02] tracking-tight text-brand-black sm:mb-10"
    >
      {title}
    </motion.h2>
  );
}
