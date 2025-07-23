import { cn } from "@/lib/class-name";
import type { PropsWithClassname } from "@/types";
import React, { type ComponentProps, type PropsWithChildren } from "react";

export function PageLayout({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("flex h-full w-full", className)}>{children}</div>;
}

export function MainContent({
  children,
  className,
  ...rest
}: PropsWithChildren & PropsWithClassname & ComponentProps<"div">) {
  return (
    <div
      className={cn("p-20 overflow-y-scroll hide-scrollbar flex-1", className)}
      {...rest}
    >
      {children}
    </div>
  );
}

export function RightSidebar({ children }: { children?: React.ReactNode }) {
  return (
    <div className="w-[25vw] border-l border-gray-200 ml-auto hidden lg:block">
      {children}
    </div>
  );
}
