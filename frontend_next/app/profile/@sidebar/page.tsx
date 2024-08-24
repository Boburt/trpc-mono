"use client";
import { usePathname } from "next/navigation";
import ProfileNavbar from "./profile-navbar";

export default function SidebarPage() {
  const pathname = usePathname();
  if (pathname.startsWith("/profile/messages")) {
    return <></>;
  }
  return <ProfileNavbar />;
}
