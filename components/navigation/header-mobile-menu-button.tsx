import { Button } from "@/components/ui/button";

export function HeaderMobileMenuButton() {
  return (
    <Button
      type="button"
      variant="landing-white-dark-text"
      size="default"
      className="bg-brand-gray px-4 md:hidden"
    >
      Menu
    </Button>
  );
}
