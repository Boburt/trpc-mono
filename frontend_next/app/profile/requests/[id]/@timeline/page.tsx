import { auth } from "@frontend_next/auth";
import { apiClient } from "@frontend_next/lib/eden";
import dayjs from "dayjs";
import { MoveRight } from "lucide-react";

const timelineType = {
  status: { name: "Стадия изменена", color: "bg-blue-500" },
};
export default async function ProfileRequestsTimelinePage({
  params: { id },
}: {
  params: { id: string };
}) {
  const session = await auth();
  const accessToken = session?.accessToken;
  const { data: spTicketTimeline } = await apiClient.api
    .sp_ticket_timeline({
      id,
    })
    .get({
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  if (
    spTicketTimeline &&
    Array.isArray(spTicketTimeline) &&
    spTicketTimeline.length > 0
  ) {
    return (
      <div>
        {spTicketTimeline.map((ticket) => (
          <div className="flex gap-x-3" key={ticket.id}>
            <div className="text-end">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {dayjs(ticket.created_at).format("DD-MM-YYYY, HH-MM")}
              </span>
            </div>
            <div className="relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-200 dark:after:bg-gray-700">
              <div className="relative z-10 w-7 h-7 flex justify-center items-center">
                <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-600" />
              </div>
            </div>
            <div className="grow pt-0.5 pb-8">
              <h3 className="flex gap-x-1.5 font-semibold text-gray-800 dark:text-white">
                <svg
                  className="flex-shrink-0 w-4 h-4 mt-1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <svg>
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" x2="8" y1="13" y2="13" />
                    <line x1="16" x2="8" y1="17" y2="17" />
                    <line x1="10" x2="8" y1="9" y2="9" />
                  </svg>
                </svg>
                <span>
                  {
                    timelineType[
                      ticket.timeline_type as keyof typeof timelineType
                    ].name
                  }
                </span>
              </h3>
              <div className="mt-1 text-sm text-gray-600 dark:text-gray-400 flex">
                <span className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-gray-50 text-gray-500 dark:bg-white/[.05] dark:text-white min-w-24">
                  {ticket.before_value}
                </span>
                <div className="px-2">
                  <MoveRight />
                </div>
                <span className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-gray-50 text-gray-500 dark:bg-white/[.05] dark:text-white min-w-24">
                  {ticket.after_value}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  } else {
    // show there is no any events in timeline
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <div className="w-full max-w-md">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold">Отсутствуют события</h1>
          </div>
        </div>
      </div>
    );
  }
}
