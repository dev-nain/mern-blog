import { cn } from "@/lib/class-name";
import type { PropsWithClassname } from "@/types";
import React, { type PropsWithChildren } from "react";

export function PageLayout({ children }: { children: React.ReactNode }) {
  return <div className="flex h-full w-full">{children}</div>;
}

export function MainContent({
  children,
  className,
}: PropsWithChildren & PropsWithClassname) {
  return (
    <div
      className={cn("p-20 overflow-y-scroll hide-scrollbar flex-1", className)}
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
