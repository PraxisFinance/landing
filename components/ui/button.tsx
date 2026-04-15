import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-sm border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
        "landing-dark-purple":
          "bg-brand-dark-purple text-white hover:bg-brand-dark-purple/90 focus-visible:ring-brand-dark-purple/35",
        "landing-light-purple":
          "bg-brand-light-purple text-brand-black hover:bg-brand-light-purple/90 focus-visible:ring-brand-dark-purple/30",
        "landing-dark-purple-70":
          "bg-brand-dark-purple/70 text-white hover:bg-brand-dark-purple/80 focus-visible:ring-brand-dark-purple/35",
        "landing-white-70":
          "bg-brand-white/70 text-brand-dark-purple hover:bg-brand-white/85 focus-visible:ring-brand-dark-purple/25",
        "landing-white-dark-text":
          "bg-brand-white text-brand-black hover:bg-brand-white/92 focus-visible:ring-brand-dark-purple/25",
        "landing-white-light-text":
          "bg-brand-white text-brand-dark-purple hover:bg-brand-white/92 focus-visible:ring-brand-dark-purple/25",
        "landing-black":
          "bg-brand-black text-white hover:bg-brand-black/92 focus-visible:ring-brand-dark-purple/35",
        "landing-black-50":
          "bg-brand-black/50 text-white hover:bg-brand-black/60 focus-visible:ring-brand-dark-purple/30",
        "landing-light-green":
          "bg-brand-light-green text-brand-black hover:bg-brand-light-green/90 focus-visible:ring-brand-dark-green/25",
        outline:
          "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        landing: "h-12 gap-2 px-5 ui-button-1",
        "landing-sm": "h-10 gap-2 px-4 ui-button-2",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        icon: "size-8",
        "landing-icon": "size-12 [&_svg:not([class*='size-'])]:size-5",
        "landing-icon-sm": "size-10 [&_svg:not([class*='size-'])]:size-[1.125rem]",
        "icon-xs":
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
        "icon-lg": "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
