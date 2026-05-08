"use client";

import { NavDropdownItem } from "@/components/navigation/nav-dropdown-item";
import { navSections } from "@/components/navigation/nav-data";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const triggerClassName = cn(
  "h-auto min-h-9 rounded-sm border-0 bg-brand-gray px-4 py-2 shadow-none",
  "text-sm font-semibold text-brand-black",
  "hover:bg-brand-gray/80 focus:bg-brand-gray/80 focus-visible:ring-2 focus-visible:ring-brand-dark-purple/30",
  "data-open:bg-brand-black data-open:text-brand-white data-open:hover:bg-brand-black data-open:focus:bg-brand-black",
  "data-popup-open:bg-brand-black data-popup-open:text-brand-white data-popup-open:hover:bg-brand-black",
  "[&_svg]:ml-0.5 [&_svg]:text-brand-black/55 data-open:[&_svg]:text-white data-popup-open:[&_svg]:text-white"
);

type HeaderDesktopNavProps = {
  /** When the header mounts only on desktop (`md+`), show nav without the `md:flex` breakpoint gate. */
  forceVisible?: boolean;
};

export function HeaderDesktopNav({ forceVisible = false }: HeaderDesktopNavProps = {}) {
  return (
    <NavigationMenu
      className={cn(
        "relative z-50 max-w-none justify-center",
        forceVisible ? "flex" : "hidden md:flex"
      )}
      align="center"
    >
      <NavigationMenuList className="flex-wrap justify-center gap-2">
        {navSections.map((section) => (
          <NavigationMenuItem key={section.id} value={section.id}>
            <NavigationMenuTrigger className={triggerClassName}>
              {section.label}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[min(calc(100vw-2rem),22rem)] gap-2 p-2 sm:w-[22rem]">
                {section.items.map((item) => (
                  <li key={item.title}>
                    <NavDropdownItem item={item} />
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
