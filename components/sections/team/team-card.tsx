"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { TeamRoleBadge } from "@/components/sections/team/team-role-badge";
import { TeamSocialLinks, type TeamSocialLink } from "@/components/sections/team/team-social-links";
import { cn } from "@/lib/utils";

type TeamCardProps = {
  memberIndex: number;
  name: string;
  role: string;
  image: string;
  bio: string;
  socials?: TeamSocialLink[];
  priority?: boolean;
  nameTextClassName?: string;
  bioTextClassName?: string;
  roleBadgeTextClassName?: string;
  /** Mobile layout: 260×350; default desktop: 345×450 */
  compact?: boolean;
  className?: string;
};

export function TeamCard({
  memberIndex,
  name,
  role,
  image,
  bio,
  socials,
  priority,
  nameTextClassName,
  bioTextClassName,
  roleBadgeTextClassName,
  compact,
  className,
}: TeamCardProps) {
  const [hovered, setHovered] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!compact) setMobileOpen(false);
  }, [compact]);

  const showDetails = compact ? mobileOpen : hovered;
  const liftOnExpand = showDetails && !compact;

  return (
    <div
      data-member-index={memberIndex}
      aria-label={`${name}, ${role}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => {
        if (compact) setMobileOpen((open) => !open);
      }}
      className={cn(
        "relative top-0 shrink-0 flex-none snap-center overflow-hidden rounded-[28px] text-left shadow-md ring-1 ring-black/[0.08]",
        "cursor-pointer",
        "transition-[top,box-shadow] duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
        !showDetails && "hover:shadow-lg",
        liftOnExpand && "-top-12 z-10 shadow-xl",
        !liftOnExpand && "z-0",
        compact ? "h-[350px] w-[260px]" : "h-[450px] w-[345px]",
        className
      )}
    >
      <div className="absolute inset-0">
        <Image
          src={image}
          alt=""
          fill
          sizes={compact ? "(max-width: 767px) 260px, 260px" : "(max-width: 380px) 100vw, 345px"}
          className="object-cover object-top"
          priority={priority}
          loading={priority ? "eager" : "lazy"}
        />
      </div>

      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent"
        aria-hidden
      />

      <TeamRoleBadge textClassName={roleBadgeTextClassName}>{role}</TeamRoleBadge>

      {compact && mobileOpen && socials && socials.length > 0 ? (
        <div
          className="absolute right-4 top-4 z-20 flex justify-end pt-0.5"
          onClick={(e) => e.stopPropagation()}
        >
          <TeamSocialLinks links={socials} compact className="justify-end" />
        </div>
      ) : null}

      <div className="absolute inset-x-0 bottom-0 z-[2] flex flex-col justify-end p-4 pt-24">
        <div className="flex flex-col gap-2">
          <p
            className={cn(
              "font-bold leading-tight tracking-tight text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]",
              nameTextClassName ?? "text-xl"
            )}
          >
            {name}
          </p>

          <div
            className={cn(
              "grid transition-[grid-template-rows,opacity] duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
              showDetails ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            )}
          >
            <div className="min-h-0 overflow-hidden">
              <p
                className={cn(
                  "text-pretty pb-2 font-normal leading-snug text-white/95",
                  bioTextClassName ?? "text-sm"
                )}
              >
                {bio}
              </p>
              {!compact && socials && socials.length > 0 ? (
                <div onClick={(e) => e.stopPropagation()} className="pt-0.5">
                  <TeamSocialLinks links={socials} />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
