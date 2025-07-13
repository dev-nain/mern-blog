import { cva } from "class-variance-authority";
import clsx from "clsx";
import { Link } from "react-router";
import { Loader } from "lucide-react";
import type { ComponentProps } from "react";
import type { VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex font-inter items-center justify-center rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary: "bg-black text-white",
        green:
          "bg-green-700 text-white hover:bg-green-800 focus:ring-green-800 disabled:bg-green-700/80",
        secondary:
          "bg-grey text-zinc-800 hover:bg-gray-300 focus:ring-dark-grey",
        outline: "border border-black text-black hover:bg-gray-100",
        naked: "text-dark-grey hover:bg-gray-100",
      },
      size: {
        sm: "px-3 py-1 text-xs",
        md: "px-4 py-1.5 text-sm",
        lg: "px-5 py-2.5 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

type Props = {
  children: React.ReactNode;
  className?: string;
  loading?: boolean;
} & VariantProps<typeof buttonVariants>;

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
