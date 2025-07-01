import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:cursor-pointer",
  {
    variants: {
      variant: {
        default: "border-0 bg-black text-white shadow-sm hover:!bg-black/80",
        destructive:
          "border-0 bg-red-600 text-white shadow-sm hover:bg-red-700",
        outline:
          "border border-gray-200 bg-white text-black shadow-sm hover:border-gray-300 hover:shadow-md",
        secondary:
          "border-0 bg-gray-100 text-gray-900 shadow-sm hover:bg-gray-200",
        ghost: "border-0 bg-transparent text-gray-900 hover:bg-gray-100",
        link: "border-0 bg-transparent text-black underline-offset-4 hover:underline",
        disabled:
          "cursor-not-allowed border border-gray-200 bg-gray-50 text-gray-400 shadow-sm",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
