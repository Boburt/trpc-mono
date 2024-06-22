"use client";

import Link from "next/link";
import { UserDropDown } from "./UserDropDown";
import { useSession } from "next-auth/react";

export const SignInButton = () => {
  const { data: session } = useSession();

  return session?.user ? (
    <UserDropDown session={session} />
  ) : (
    <Link
      href="/login"
      className="flex items-center gap-x-2 font-medium text-gray-500 hover:text-blue-600 md:border-s md:border-gray-300 md:my-6 md:ps-6 dark:border-gray-700 dark:text-gray-400 dark:hover:text-blue-500"
    >
      <svg
        className="flex-shrink-0 w-4 h-4"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
      Войти
    </Link>
  );
};
