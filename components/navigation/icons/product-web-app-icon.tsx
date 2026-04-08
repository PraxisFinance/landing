import { Globe } from "lucide-react";

import type { NavMenuIconProps } from "@/components/navigation/icons/nav-menu-icon-props";

export function ProductWebAppIcon(props: NavMenuIconProps) {
  return <Globe strokeWidth={1.75} {...props} />;
}
