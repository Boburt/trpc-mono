"use client";

import { apiClient } from "@frontend_next/lib/eden";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

async function fetchChats(token: string) {
  const { data } = await apiClient.api.conversations.get({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}

export default function ChatListClient() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { data, error, isLoading } = useQuery({
    queryKey: ["profile_chats", session?.accessToken],
    queryFn: () => fetchChats(session!.accessToken!),
    enabled: !!session?.accessToken,
  });

  if (isLoading) return <div>Loading chats...</div>;
  if (error) return <div>Error loading chats</div>;

  if (data && Array.isArray(data) && data.length > 0) {
    return (
      <>
        <div className="p-4 font-bold text-lg">Список диалогов</div>
        <ul className="divide-y divide-gray-200">
          {data.map((conversation) => (
            <li
              key={conversation.id}
              className={`p-4 cursor-pointer ${
                pathname == "/profile/messages/" + conversation.id
                  ? "bg-blue-100 border-l-4 border-blue-500"
                  : "hover:bg-gray-200"
              }`}
            >
              <Link
                className="flex flex-row items-center"
                href={`/profile/messages/${conversation.id}`}
              >
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700">
                    {conversation.name}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </>
    );
  } else {
    return <></>;
  }
}
