import { SocialDiscordIcon } from "@/components/assets/social-discord-icon";
import { SocialTelegramIcon } from "@/components/assets/social-telegram-icon";
import { SocialXIcon } from "@/components/assets/social-x-icon";
import { cn } from "@/lib/utils";

export type ExpertSocialKind = "x" | "telegram" | "discord";

export type ExpertSocialLink = {
  label: string;
  href: string;
  kind: ExpertSocialKind;
};

const ICONS: Record<ExpertSocialKind, typeof SocialXIcon> = {
  x: SocialXIcon,
  telegram: SocialTelegramIcon,
  discord: SocialDiscordIcon,
};

type ExpertSocialLinksProps = {
  links: ExpertSocialLink[];
  className?: string;
};

export function ExpertSocialLinks({ links, className }: ExpertSocialLinksProps) {
  if (links.length === 0) return null;

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {links.map(({ label, href, kind }) => {
        const Icon = ICONS[kind];
        return (
          <a
            key={`${kind}-${label}`}
            href={href}
            className={cn(
              "inline-flex size-10 shrink-0 items-center justify-center rounded-lg",
              "bg-brand-light-purple text-white transition hover:bg-brand-light-purple/90",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark-purple/40"
            )}
            aria-label={label}
          >
            <Icon className="size-[1.125rem]" />
          </a>
        );
      })}
    </div>
  );
}
