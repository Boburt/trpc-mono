"use client";

import React from "react";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

export default function Logo({
  logos,
  logoWidth,
  logoHeight,
}: {
  logos: string;
  logoWidth: number;
  logoHeight: number;
}) {
  return (
    <div className="">
      <Image
        className="rounded-md"
        src={logos}
        width={logoWidth}
        height={logoHeight}
        alt="Logo"
      />
    </div>
  );
}
