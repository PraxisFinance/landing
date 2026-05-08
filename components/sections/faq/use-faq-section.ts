"use client";

import { useRef, useState } from "react";

export function useFaqSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [showAllItems, setShowAllItems] = useState(false);

  return {
    sectionRef,
    showAllItems,
    setShowAllItems,
  };
}

export type FaqSectionStateBag = ReturnType<typeof useFaqSection>;
