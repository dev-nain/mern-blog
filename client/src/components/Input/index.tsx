"use client";

import type React from "react";
import { useState, type ComponentProps } from "react";
import { Eye, EyeOff } from "lucide-react";
import { DynamicIcon } from "lucide-react/dynamic";
import clsx from "clsx";

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  type?: "text" | "email" | "password" | "number" | "tel" | "url" | "search";
  placeholder?: string;
  value?: string;
  icon?: ComponentProps<typeof DynamicIcon>["name"];
  className?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  type = "text",
  onChange,
  icon,
  className = "",
  error,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative">
      <input
        type={inputType}
        onChange={onChange}
        className={clsx(
          "input-field",
          {
            "pl-10": icon,
            "pl-4": !icon,
            "pr-10": isPassword,
            "pr-4": !isPassword,
          },
          className
        )}
        {...props}
      />

      {icon && (
        <div className="input-icon">
          <DynamicIcon name={icon} size={16} className="text-black" />
        </div>
      )}

      {isPassword && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className={clsx(
            "absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center",
            "text-gray-400 hover:text-gray-600"
          )}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      )}

      {error && (
        <p className="mt-2 text-sm text-red-600 flex items-center">{error}</p>
      )}
    </div>
  );
};
