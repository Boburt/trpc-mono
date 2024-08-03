"use client";

import React from "react";
import {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineHeader,
  TimelineTitle,
  TimelineIcon,
  TimelineDescription,
  TimelineContent,
  TimelineTime,
} from "@frontend_next/components/timeline/timeline";

interface TimelineLayoutProps {
  items: {
    date: string;
    title: string;
    description?: string;
  }[]; // Replace any[] with the actual type of items.
}
export const TimelineLayout = ({ items }: TimelineLayoutProps) => {
  return items.length > 0 ? (
    <div className="p-6 sm:p-10">
      <div className="flex flex-col gap-8">
        <div className="relative pl-6 after:absolute after:inset-y-0 after:w-px after:bg-primary grid gap-10">
          {items.map((item, index) => (
            <div className="grid gap-1 text-sm relative" key={index}>
              <div className="aspect-square w-3 bg-primary rounded-full absolute left-0 translate-x-[-29.5px] z-10 top-1" />
              <div className="font-medium">{item.date}</div>
              <div className="text-muted-foreground">{item.title}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <div>Нет событий</div>
  );
};
