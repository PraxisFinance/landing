import { Bug } from "lucide-react";

import type { NavMenuIconProps } from "@/components/navigation/icons/nav-menu-icon-props";

export function DevBugBountyIcon(props: NavMenuIconProps) {
  return <Bug strokeWidth={1.75} {...props} />;
}
