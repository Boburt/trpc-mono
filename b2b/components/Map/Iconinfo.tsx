"use client";
import React from "react";
import Image from "next/image";

export default function Iconinfo({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <div className="flex">
      {icon}
      <h6 className="font-medium">{text}</h6>
    </div>
  );
}
