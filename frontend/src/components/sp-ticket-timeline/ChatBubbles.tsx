import Providers from "@frontend/src/store/provider";
import { ChatCard } from "./ChatBubblesTextCard";
import { ChatSendForm } from "./ChatSendForm";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@frontend/src/utils/eden";
import { useStore } from "@nanostores/react";
import { $accessToken } from "@frontend/src/store/auth";

export const ChatBubbles = ({ ticket_id }: { ticket_id: string }) => {
  console.log("ticket_id", ticket_id);
  const accessToken = useStore($accessToken);
  const { data: spTicketComments, isLoading } = useQuery({
    queryKey: ["sp_ticket_comments"],
    queryFn: async () => {
      console.log("started queryFn");
      const { data } = await apiClient.api.sp_ticket_comments[ticket_id].get({
        $headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return data;
    },
    // refetchOnMount: false,
    // refetchOnReconnect: false,
    // refetchOnWindowFocus: false,
  });

  console.log(spTicketComments);

  return (
    <div>
      <div className="space-y-5">
        <ChatCard comments={spTicketComments} />
      </div>
      <button className="flex-shrink-0 bg-blue-600 hover:bg-blue-700 rounded-lg text-white px-6 mt-6 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-500 dark:focus:ring-offset-2 dark:focus:ring-offset-slate-900 dark:focus:ring-white">
        Load more
      </button>
    </div>
  );
};

export const ChatBubblesProviders = ({ ticket_id }: { ticket_id: string }) => {
  return (
    <Providers>
      <ChatBubbles ticket_id={ticket_id} />
      <div className="pt-6">
        <ChatSendForm ticket_id={ticket_id} />
      </div>
    </Providers>
  );
};
