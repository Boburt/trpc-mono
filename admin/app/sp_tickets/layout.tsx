"use client";
import { buttonVariants } from "@admin/components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@admin/components/ui/resizable";
import { cn } from "@admin/lib/utils";
import Link from "next/link";
import React, { FC, ReactNode } from "react";
import { usePathname } from "next/navigation";

interface SpTicketLayoutProps {
  children: ReactNode;
}

const SpTicketLayout: FC<SpTicketLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  return pathname == "/sp_tickets" ? (
    <>{children}</>
  ) : (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-[200px] rounded-lg border"
    >
      <ResizablePanel defaultSize={10} minSize={10}>
        <div className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2">
          <nav className="grid gap-1 px-2">
            <Link
              href="/sp_tickets/sp_ticket_categories"
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                pathname == "/sp_tickets/sp_ticket_categories" &&
                  "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                "justify-start"
              )}
            >
              Категории обращений
            </Link>
            <Link
              href="/sp_tickets/sp_ticket_statuses"
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                pathname == "/sp_tickets/sp_ticket_statuses" &&
                  "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                "justify-start"
              )}
            >
              Статусы обращений
            </Link>
          </nav>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={90}>
        <div className="flex h-full items-center p-6">{children}</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default SpTicketLayout;
