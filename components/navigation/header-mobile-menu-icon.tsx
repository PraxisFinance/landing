import type { SVGProps } from "react";

type HeaderMobileMenuIconProps = SVGProps<SVGSVGElement> & {
  isOpen: boolean;
};

function MenuIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden {...props}>
      <path
        d="M3.333 5.833h13.334M3.333 10h13.334M3.333 14.167h13.334"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden {...props}>
      <path d="m5 5 10 10M15 5 5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function HeaderMobileMenuIcon({ isOpen, ...props }: HeaderMobileMenuIconProps) {
  return isOpen ? <CloseIcon {...props} /> : <MenuIcon {...props} />;
}
