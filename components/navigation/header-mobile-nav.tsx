import Link from "next/link";

import { mobileProductNavItems, mobileSectionNavItems } from "@/components/navigation/nav-data";
import { Button } from "@/components/ui/button";

type HeaderMobileNavProps = {
  isOpen: boolean;
  onNavigate: (href: string) => void;
  onWaitlistClick: () => void;
  waitlistLabel: string;
};

export function HeaderMobileNav({
  isOpen,
  onNavigate,
  onWaitlistClick,
  waitlistLabel,
}: HeaderMobileNavProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      id="landing-mobile-menu"
      className="absolute top-full right-0 left-0 z-50 rounded-2xl bg-brand-gray p-3 lg:hidden"
    >
      <div className="grid grid-cols-2 gap-2">
        {mobileProductNavItems.map(({ href, title, Icon }) => (
          <Link
            key={title}
            href={href}
            onClick={() => onNavigate(href)}
            className="inline-flex min-h-14 items-center justify-center gap-2 rounded-md bg-brand-white px-3 ui-text-8 text-brand-black"
          >
            <Icon />
            <span>{title}</span>
          </Link>
        ))}
      </div>

      <div className="mt-3 flex flex-col gap-2">
        {mobileSectionNavItems.map(({ href, title, Icon }) => (
          <Link
            key={title}
            href={href}
            onClick={() => onNavigate(href)}
            className="inline-flex min-h-14 items-center gap-2 rounded-md bg-brand-white px-3 ui-text-8 text-brand-black"
          >
            <Icon />
            <span>{title}</span>
          </Link>
        ))}
      </div>

      <Button
        type="button"
        variant="landing-black"
        size="landing-sm"
        className="mt-3 flex h-11 w-full rounded-md ui-text-8"
        onClick={onWaitlistClick}
      >
        {waitlistLabel}
      </Button>
    </div>
  );
}
