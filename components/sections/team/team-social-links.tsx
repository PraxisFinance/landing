import { SocialDiscordIcon } from "@/components/assets/social-discord-icon";
import { SocialTelegramIcon } from "@/components/assets/social-telegram-icon";
import { SocialXIcon } from "@/components/assets/social-x-icon";
import { cn } from "@/lib/utils";

export type TeamSocialKind = "x" | "telegram" | "discord";

export type TeamSocialLink = {
  label: string;
  href: string;
  kind: TeamSocialKind;
};

const ICONS: Record<TeamSocialKind, typeof SocialXIcon> = {
  x: SocialXIcon,
  telegram: SocialTelegramIcon,
  discord: SocialDiscordIcon,
};

type TeamSocialLinksProps = {
  links: TeamSocialLink[];
  className?: string;
  /** Narrow team cards: smaller hit targets */
  compact?: boolean;
};

export function TeamSocialLinks({ links, className, compact }: TeamSocialLinksProps) {
  if (links.length === 0) return null;

  return (
    <div className={cn("flex flex-wrap gap-2", compact && "flex-nowrap gap-1.5", className)}>
      {links.map(({ label, href, kind }) => {
        const Icon = ICONS[kind];
        return (
          <a
            key={`${kind}-${label}`}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex shrink-0 items-center justify-center rounded-lg",
              compact ? "size-8" : "size-10",
              "bg-brand-dark-purple text-white transition hover:bg-brand-dark-purple/90",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark-purple/40"
            )}
            aria-label={label}
          >
            <Icon className={compact ? "size-4" : "size-[1.125rem]"} />
          </a>
        );
      })}
    </div>
  );
}
