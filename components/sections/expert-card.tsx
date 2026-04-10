"use client";

import { useState } from "react";
import Image from "next/image";

import { ExpertRoleBadge } from "@/components/sections/expert-role-badge";
import { ExpertSocialLinks, type ExpertSocialLink } from "@/components/sections/expert-social-links";
import { cn } from "@/lib/utils";

type ExpertCardProps = {
  expertIndex: number;
  name: string;
  role: string;
  image: string;
  bio: string;
  socials?: ExpertSocialLink[];
  selected: boolean;
  onSelect: () => void;
  priority?: boolean;
  className?: string;
};

export function ExpertCard({
  expertIndex,
  name,
  role,
  image,
  bio,
  socials,
  selected,
  onSelect,
  priority,
  className,
}: ExpertCardProps) {
  const [hovered, setHovered] = useState(false);
  const expanded = selected || hovered;

  return (
    <div
      data-expert-index={expertIndex}
      tabIndex={0}
      aria-label={`${name}, ${role}${selected ? ", current" : ""}`}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setHovered(false);
      }}
      className={cn(
        "relative top-0 shrink-0 snap-center cursor-pointer overflow-hidden rounded-[28px] text-left shadow-md ring-1 ring-black/[0.08]",
        /* `top` instead of translate: avoids compositor/snap fights that feel like “jumping” */
        "transition-[top,box-shadow] duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark-purple/50",
        !expanded && "hover:shadow-lg",
        expanded ? "-top-12 z-10 shadow-xl" : "z-0",
        "h-[min(450px,85vh)] w-[min(100%,345px)] max-w-full",
        className
      )}
    >
      <div className="absolute inset-0">
        <Image
          src={image}
          alt=""
          fill
          sizes="(max-width: 380px) 100vw, 345px"
          className="object-cover object-top"
          priority={priority}
          loading={priority ? "eager" : "lazy"}
        />
      </div>

      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent"
        aria-hidden
      />

      <ExpertRoleBadge>{role}</ExpertRoleBadge>

      <div className="absolute inset-x-0 bottom-0 z-[2] flex flex-col justify-end p-4 pt-24">
        <div className="flex flex-col gap-2">
          <p className="text-xl font-bold leading-tight tracking-tight text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]">
            {name}
          </p>

          <div
            className={cn(
              "grid transition-[grid-template-rows,opacity] duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
              expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            )}
          >
            <div className="min-h-0 overflow-hidden">
              <p className="text-pretty pb-2 text-sm font-normal leading-snug text-white/95">{bio}</p>
              {socials && socials.length > 0 ? (
                <div onClick={(e) => e.stopPropagation()} className="pt-0.5">
                  <ExpertSocialLinks links={socials} />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
