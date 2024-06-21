"use client";
import { ChatSendForm } from "./chat-send-form";
import { useInfiniteQuery } from "@tanstack/react-query";
import { apiClient } from "@frontend_next/lib/eden";
import { Spinner } from "@nextui-org/spinner";
import { useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ru";

dayjs.locale("ru");
dayjs.extend(relativeTime);

export const ChatBubbles = ({ ticket_id }: { ticket_id: string }) => {
  const { data: session } = useSession();
  const accessToken = session?.accessToken;

  const [page, setPage] = useState(1);

  const {
    data: spTicketComments,
    isLoading,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: [
      "sp_ticket_comments",
      {
        ticket_id,
        limit: "300",
      },
    ],
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await apiClient.api
        .sp_ticket_comments({ id: ticket_id })
        .get({
          query: {
            limit: "300",
            offset: ((pageParam - 1) * 300).toString(),
          },
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      return data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => page + 1,
    // refetchOnMount: false,
    // refetchOnReconnect: false,
    // refetchOnWindowFocus: false,
  });

  const loadNextPage = () => {
    setPage((page) => page + 1);
    fetchNextPage({});
  };

  const isShowMore = useMemo(() => {
    let res = false;

    if (
      spTicketComments &&
      spTicketComments.pages &&
      Array.isArray(spTicketComments.pages) &&
      spTicketComments.pages.length > 0
    ) {
      let total = spTicketComments.pages[0]?.total ?? 0;
      res = total > page * 3;
    }
    return res;
  }, [page, spTicketComments]);

  return (
    <div>
      <div className="space-y-5">
        {isLoading && <Spinner label="Загрузка..." />}
        {!isLoading &&
          spTicketComments &&
          spTicketComments.pages &&
          spTicketComments.pages.map(
            (page) =>
              page &&
              page.data &&
              Array.isArray(page.data) &&
              page.data.map((comment) => (
                <div
                  className="max-w-lg flex gap-x-2 sm:gap-x-4 me-11"
                  key={comment.id}
                >
                  <img
                    className="inline-block h-9 w-9 rounded-full"
                    src="https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&&auto=format&fit=facearea&facepad=3&w=300&h=300&q=80"
                    alt="Image Description"
                  />

                  <div>
                    <div className="bg-white border text-left border-gray-200 rounded-2xl p-4 space-y-3 dark:bg-slate-900 dark:border-gray-700">
                      <div className="flex space-x-3 items-baseline">
                        <h2 className="font-medium text-gray-800 dark:text-gray-400 ">
                          {comment.user?.first_name} {comment.user?.last_name}
                        </h2>
                        <span className="text-xs text-gray-700 dark:text-gray-500 text-">
                          {dayjs(comment.created_at).fromNow()}
                        </span>
                      </div>

                      <div className="space-y-1.5">
                        <p className="mb-1.5 text-sm text-gray-800 dark:text-white">
                          {comment.comment}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
          )}
      </div>
      {isShowMore && (
        <button
          onClick={() => loadNextPage()}
          className="flex-shrink-0 bg-blue-600 hover:bg-blue-700 rounded-lg text-white px-6 mt-6 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-500 dark:focus:ring-offset-2 dark:focus:ring-offset-slate-900 dark:focus:ring-white"
        >
          Load more
        </button>
      )}
    </div>
  );
};

export const ChatBubblesProviders = ({ ticket_id }: { ticket_id: string }) => {
  return (
    <>
      <ChatBubbles ticket_id={ticket_id} />
      <div className="pt-6">
        <ChatSendForm ticket_id={ticket_id} />
      </div>
    </>
  );
};
