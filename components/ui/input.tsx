import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const inputVariants = cva(
  "w-full min-w-0 rounded-sm border-0 transition-colors outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-60 focus-visible:ring-2 focus-visible:ring-brand-dark-purple/35 aria-invalid:ring-2 aria-invalid:ring-destructive/40",
  {
    variants: {
      variant: {
        default:
          "h-16 bg-brand-white px-6 text-[2.1875rem] leading-none font-medium text-brand-black placeholder:text-brand-black/40",
        filled:
          "h-16 bg-brand-white px-6 text-[2.1875rem] leading-none font-medium text-brand-black placeholder:text-brand-black/30",
        success:
          "h-16 bg-brand-gray px-6 text-[2.1875rem] leading-none font-medium text-brand-dark-green placeholder:text-brand-dark-green/45",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

type InputProps = React.ComponentProps<"input"> & VariantProps<typeof inputVariants>

function Input({ className, type, variant, ...props }: InputProps) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(inputVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Input, inputVariants }
