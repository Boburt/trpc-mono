"use client";
import { cn } from "@frontend_next/lib/utils";
import React, { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <main>
      <div
        className={cn(
          "relative flex flex-col  h-[60vh] items-center justify-center bg-zinc-50 dark:bg-zinc-900  text-slate-950 transition-bg overflow-hidden",
          className
        )}
        {...props}
      >
        <div
          className={cn(
            "absolute -top-32 left-1/3 transform -translate-x-1/2 -translate-y-1/2 h-96 w-80 md:w-96 animate-pop-blob rounded-full bg-blue-400 p-8 opacity-45 mix-blend-multiply blur-2xl filter",
            "opacity-45",
            "bg-purple-400"
          )}
        ></div>
        <div
          className={cn(
            "absolute -top-28 left-1/2 transform -translate-x-1/2 -translate-y-1/2  h-72 w-72 md:w-96 animate-pop-blob rounded-full bg-purple-400 p-8 opacity-45 mix-blend-multiply blur-2xl filter",
            "opacity-45",
            "bg-blue-400"
          )}
        ></div>
        {children}
      </div>
    </main>
  );
};
