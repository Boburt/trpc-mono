import { auth } from "@frontend_next/auth";
import { apiClient } from "@frontend_next/lib/eden";
import dynamic from "next/dynamic";
const ChatListClient = dynamic(() => import("./chat-list"), {
  ssr: false,
});
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const { data } = await apiClient.api.conversations.get({
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });
  console.log("messages layout");
  return (
    <div className="">
      {!data ||
        (data && Array.isArray(data) && data.length == 0 && (
          <main id="content" role="main">
            <div className="text-center py-10 px-4 sm:px-6 lg:px-8">
              <h1 className="block text-2xl font-bold text-white sm:text-4xl">
                Список диалогов пуст
              </h1>
              <p className="mt-3 text-lg text-gray-300">
                Начните новый диалог, чтобы продолжить
              </p>
            </div>
          </main>
        ))}
      {data && Array.isArray(data) && data.length > 0 && (
        <div className="h-[80vh] flex">
          <div className="flex flex-row h-full w-full space-x-5">
            <div className="w-1/4 bg-white overflow-y-auto rounded-xl shadow-lg">
              <ChatListClient />
            </div>

            <div className="flex-1 bg-gray-50 p-4 rounded-xl shadow-lg">
              {children}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
