import { Button } from "@/components/ui/button";
import { HeaderMobileMenuIcon } from "@/components/navigation/header-mobile-menu-icon";

type HeaderMobileMenuButtonProps = {
  isOpen: boolean;
  onClick: () => void;
};

export function HeaderMobileMenuButton({ isOpen, onClick }: HeaderMobileMenuButtonProps) {
  return (
    <Button
      type="button"
      variant="landing-white-dark-text"
      size="landing-icon-sm"
      className="bg-brand-gray md:hidden"
      onClick={onClick}
      aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
      aria-expanded={isOpen}
      aria-controls="landing-mobile-menu"
    >
      <HeaderMobileMenuIcon isOpen={isOpen} className="size-5" />
    </Button>
  );
}
