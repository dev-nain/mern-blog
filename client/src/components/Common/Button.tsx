import { cva } from "class-variance-authority";
import clsx from "clsx";
import type { ComponentProps } from "react";
import { Link } from "react-router";
import { Loader } from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer",
  {
    variants: {
      variant: {
        primary: "bg-black text-white",
        secondary: "bg-grey text-dark-grey hover:bg-gray-300",
        outline: "border border-black text-black hover:bg-gray-100",
        naked: "text-dark-grey hover:bg-gray-100",
      },
      size: {
        sm: "px-3 py-1 text-xs",
        md: "px-4 py-2 text-sm",
        lg: "px-5 py-3 text-base",
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
  loading?: boolean;
};

export const Button = ({
  variant,
  size,
  children,
  className,
  loading = false,
  ...props
}: Props & ComponentProps<"button">) => {
  return (
    <button
      className={clsx(
        buttonVariants({ variant, size }),
        className,
        loading && "opacity-70 cursor-not-allowed"
      )}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && <Loader className="animate-spin w-4 h-4 mr-2" />}
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
