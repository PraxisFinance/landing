import { AppWindow } from "lucide-react";

import type { NavMenuIconProps } from "@/components/navigation/icons/nav-menu-icon-props";

export function DevDocumentationIcon(props: NavMenuIconProps) {
  return <AppWindow strokeWidth={1.75} {...props} />;
}
