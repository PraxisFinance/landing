import { Lock } from "lucide-react";

import type { NavMenuIconProps } from "@/components/navigation/icons/nav-menu-icon-props";

export function DevSecurityIcon(props: NavMenuIconProps) {
  return <Lock strokeWidth={1.75} {...props} />;
}
