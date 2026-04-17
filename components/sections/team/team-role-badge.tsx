import { cn } from "@/lib/utils";

type TeamRoleBadgeProps = {
  children: string;
  className?: string;
};

export function TeamRoleBadge({ children, className }: TeamRoleBadgeProps) {
  return (
    <span
      className={cn(
        "pointer-events-none absolute left-4 top-4 z-10 max-w-[calc(100%-2rem)] rounded-full px-3 py-1.5 text-xs font-semibold leading-tight text-brand-black",
        "bg-white/90 shadow-sm ring-1 ring-black/[0.06] backdrop-blur-sm",
        className
      )}
    >
      {children}
    </span>
  );
}
