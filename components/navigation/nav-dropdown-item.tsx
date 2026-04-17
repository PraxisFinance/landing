import type { MouseEventHandler } from "react";
import type { NavDropdownEntry } from "@/components/navigation/nav-data";
import { NavMenuIconWrapper } from "@/components/navigation/nav-menu-icon-wrapper";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

type NavDropdownItemProps = {
  item: NavDropdownEntry;
};

export function NavDropdownItem({ item }: NavDropdownItemProps) {
  const Icon = item.Icon;
  const handleClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
    if (!item.href.startsWith("#")) {
      return;
    }

    const targetId = item.href.slice(1);
    if (!targetId) {
      return;
    }

    const targetElement = document.getElementById(targetId);
    if (!targetElement) {
      return;
    }

    event.preventDefault();
    targetElement.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest",
    });
  };

  return (
    <NavigationMenuLink
      href={item.href}
      onClick={handleClick}
      closeOnClick
      className={cn(
        "items-start gap-3 rounded-sm border border-brand-gray p-3 shadow-none",
        "hover:bg-brand-white focus:bg-brand-white focus-visible:bg-brand-white",
        "focus-visible:ring-0 focus-visible:outline-none",
        "data-active:bg-brand-white data-active:hover:bg-brand-white data-active:focus:bg-brand-white"
      )}
    >
      <NavMenuIconWrapper>
        <Icon />
      </NavMenuIconWrapper>
      <span className="min-w-0 flex-1 text-left justify-between">
        <span className="block font-semibold text-brand-black">{item.title}</span>
        <span className="mt-0.5 block text-sm font-normal leading-snug text-brand-black/55">
          {item.description}
        </span>
      </span>
    </NavigationMenuLink>
  );
}
