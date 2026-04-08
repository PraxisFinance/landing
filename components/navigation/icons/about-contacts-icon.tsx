import { MessagesSquare } from "lucide-react";

import type { NavMenuIconProps } from "@/components/navigation/icons/nav-menu-icon-props";

export function AboutContactsIcon(props: NavMenuIconProps) {
  return <MessagesSquare strokeWidth={1.75} {...props} />;
}
