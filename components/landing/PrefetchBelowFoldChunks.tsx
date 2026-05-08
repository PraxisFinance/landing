"use client";

import { useEffect } from "react";

import { prefetchLandingBelowFoldChunksInOrder } from "@/lib/landing-below-fold-imports";

/** Triggers background prefetch of below-fold landing chunks (see `lib/landing-below-fold-imports.ts`). */
export function PrefetchBelowFoldChunks() {
  useEffect(() => {
    prefetchLandingBelowFoldChunksInOrder();
  }, []);

  return null;
}
