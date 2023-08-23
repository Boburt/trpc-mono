"use client";
import { Button } from "@admin/components/ui/button";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function ForbiddenPage() {
  return (
    <div className="flex flex-col text-center">
      <h3 className="font-bold text-[10rem] text-white">403</h3>
      <h4 className="font-bold text-4xl uppercase">
        Access denied for current page
      </h4>
      <div className="space-x-3 mt-6">
        <Link href="/">
          <Button size="lg" className="uppercase font-bold">
            Go home
          </Button>
        </Link>
        <Button
          size="lg"
          className="uppercase font-bold"
          onClick={() =>
            signOut({
              callbackUrl: "/api/auth/signin",
            })
          }
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
