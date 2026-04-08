import { Smartphone } from "lucide-react";

import type { NavMenuIconProps } from "@/components/navigation/icons/nav-menu-icon-props";

export function ProductBaseAppIcon(props: NavMenuIconProps) {
  return <Smartphone strokeWidth={1.75} {...props} />;
}
