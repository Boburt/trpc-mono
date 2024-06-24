"use client";

import { usePathname } from "next/navigation";

export default function Container({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return pathname !== "/" ? (
    <div className="container mx-auto">{children}</div>
  ) : (
    <>{children}</>
  );
}
