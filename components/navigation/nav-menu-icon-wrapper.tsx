import type { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

type NavMenuIconWrapperProps = PropsWithChildren<{
  className?: string;
}>;

export function NavMenuIconWrapper({ className, children }: NavMenuIconWrapperProps) {
  return (
    <span
      className={cn(
        "box-border grid size-12 shrink-0 place-items-center overflow-visible p-1",
        /* SVG с width/height в разметке — фиксируем размер; меньше контентной области из‑за p-1 */
        "[&>svg]:block [&>svg]:!size-10 [&>svg]:min-h-0 [&>svg]:min-w-0 [&>svg]:max-h-10 [&>svg]:max-w-10",
        className
      )}
    >
      {children}
    </span>
  );
}
