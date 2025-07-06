import { cva } from "class-variance-authority";
import clsx from "clsx";
import type { ComponentProps } from "react";
import { Link } from "react-router";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer",
  {
    variants: {
      variant: {
        primary: "bg-black text-white",
        secondary: "bg-grey text-black hover:bg-gray-300",
        outline: "border border-black text-black hover:bg-gray-100",
        naked: "text-black hover:bg-gray-100",
      },
      size: {
        sm: "px-3 py-1 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-5 py-3 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

type Props = {
  variant?: "primary" | "secondary" | "outline" | "naked";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
};

export const Button = ({
  variant,
  size,
  children,
  className,
  ...props
}: Props & ComponentProps<"button">) => {
  return (
    <button
      className={clsx(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </button>
  );
};

export const LinkButton = ({
  variant,
  size,
  children,
  className,
  ...props
}: Props & ComponentProps<typeof Link>) => {
  return (
    <Link
      className={clsx(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </Link>
  );
};
