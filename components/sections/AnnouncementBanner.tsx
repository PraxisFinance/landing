"use client";

import Link from "next/link";
import { useState } from "react";

const SOCIAL_LINKS = [
  {
    label: "Farcaster",
    href: "https://farcaster.xyz/praxisprotocol",
  },
  {
    label: "Bluesky",
    href: "https://bsky.app/profile/praxis-base.bsky.social",
  },
  {
    label: "Telegram",
    href: "https://t.me/+vdS6R9Kr5xE5MTRi",
  },
] as const;

export function AnnouncementBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="relative bg-yellow-400 px-5 py-2.5 sm:px-6 lg:px-10">
      <p className="text-center text-sm leading-snug font-semibold text-brand-black [font-family:var(--font-helvetica-bold)] pr-8">
        <span className="mr-1.5">⚠</span>
        <span>Stay Updated: Follow Praxis on </span>
        {SOCIAL_LINKS.map((link, i) => (
          <span key={link.label}>
            <Link
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:opacity-70 transition-opacity"
            >
              {link.label}
            </Link>
            {i < SOCIAL_LINKS.length - 2 && <span>, </span>}
            {i === SOCIAL_LINKS.length - 2 && <span>, and </span>}
          </span>
        ))}
        <span> for recent news, announcements, and testnet updates.</span>
      </p>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        aria-label="Dismiss announcement"
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-brand-black/60 hover:text-brand-black transition-colors"
      >
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-4" aria-hidden>
          <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}
